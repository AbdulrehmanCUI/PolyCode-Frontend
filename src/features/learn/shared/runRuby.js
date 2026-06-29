import { DefaultRubyVM } from "@ruby/wasm-wasi/dist/browser";

let rubyVM = null;

/**
 * Initializes the Ruby WebAssembly Virtual Machine.
 * Fetches the binary from the local public folder to bypass CORS in production.
 */
export async function initRubyVM() {
  if (rubyVM) return;
  
  try {
    const response = await fetch("/ruby.wasm");
    
    if (!response.ok) {
      throw new Error(`Download failed with status: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    const module = await WebAssembly.compile(buffer);
    
    const { vm } = await DefaultRubyVM(module);
    rubyVM = vm;
    
    console.log("💎 PolyCode Ruby WASM Engine loaded successfully!");
  } catch (error) {
    console.error("Failed to start the Ruby Engine in initRubyVM:", error);
    throw error; 
  }
}

/**
 * Appends display lines so learners see computed values.
 */
export function prepareRubyLearnCode(code = "") {
  if (/\b(puts|print|pp)\b/.test(code)) {
    return code;
  }

  const names = [];
  const re = /^\s*([A-Za-z_][\w]*)\s*=/gm;
  let match;
  while ((match = re.exec(code)) !== null) {
    names.push(match[1]);
  }

  const unique = [...new Set(names)];
  if (!unique.length) return code;

  const trailer = unique.map((name) => `puts "${name} = #{${name}}"`).join("\n");
  return `${code.replace(/\s*$/, "")}\n\n${trailer}\n`;
}

/**
 * Runs Ruby code flawlessly in the browser using the WASM VM.
 */
export async function runRubyCode(code, { learn = false } = {}) {
  const source = learn ? prepareRubyLearnCode(code) : code;

  try {
    if (!rubyVM) await initRubyVM();
    if (!rubyVM) throw new Error("Ruby WebAssembly environment was not initialized.");

    const wrapperCode = `
      require 'stringio'
      $stdout = StringIO.new
      $stderr = StringIO.new
      
      begin
        eval(<<~'POLYCODE_USER_SCRIPT')
          ${source}
        POLYCODE_USER_SCRIPT
      rescue Exception => e
        $stderr.puts e.message
      ensure
        $polycode_stdout = $stdout.string
        $polycode_stderr = $stderr.string
        $stdout = STDOUT
        $stderr = STDERR
      end
    `;

    rubyVM.eval(wrapperCode);

    const stdoutBuffer = rubyVM.eval("$polycode_stdout").toString();
    const stderrBuffer = rubyVM.eval("$polycode_stderr").toString();
    const codeStatus = stderrBuffer.length > 0 ? 1 : 0;

    return {
      result: {
        stdout: stdoutBuffer.trim(),
        stderr: stderrBuffer.trim(),
        code: codeStatus
      },
      runtime: "browser"
    };

  } catch (err) {
    return {
      result: {
        stdout: "",
        stderr: `Initialization/Syntax Error: ${err.message}`,
        code: 1
      },
      runtime: "browser"
    };
  }
}

export function formatRubyOutput(result = {}) {
  if (!result) return "";
  return [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
}

export function getRubyRuntimeError(runResult) {
  if (!runResult) return "Unknown execution error.";
  
  if (runResult.code !== 0 || runResult.stderr) {
    return runResult.stderr.trim() || `Process exited with code ${runResult.code}.`;
  }
  
  return null;
}