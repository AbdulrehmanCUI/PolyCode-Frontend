function formatConsoleArgs(args) {
  return args
    .map((value) => {
      try {
        if (value === undefined) return "undefined";
        if (value === null) return "null";
        if (typeof value === "object") return JSON.stringify(value, null, 2);
        return String(value);
      } catch {
        return String(value);
      }
    })
    .join(" ");
}

const DOM_BOOTSTRAP_HTML = `<!DOCTYPE html>
<html>
  <head><meta charset="utf-8" /></head>
  <body>
    <h1 id="title">Hello</h1>
    <p class="card">Item one</p>
    <p class="card">Item two</p>
    <button class="btn">Click me</button>
    <input id="email" type="text" value="demo@example.com" />
    <input id="subscribed" type="checkbox" checked />
    <form id="demo-form"></form>
    <ul id="list"><li id="a">A</li><li id="b">B</li></ul>
  </body>
</html>`;

export function needsDomRuntime(source = "") {
  return /\bdocument\b/.test(source) || /\bwindow\b/.test(source);
}

export function runJavaScriptWithDom(source = "") {
  return new Promise((resolve) => {
    const iframe = document.createElement("iframe");
    iframe.setAttribute("sandbox", "allow-scripts");
    iframe.style.cssText =
      "position:fixed;width:0;height:0;border:0;opacity:0;pointer-events:none";

    const cleanup = () => {
      iframe.remove();
    };

    iframe.onload = () => {
      const win = iframe.contentWindow;
      const logs = [];
      const errors = [];

      win.console = {
        log: (...args) => logs.push(formatConsoleArgs(args)),
        info: (...args) => logs.push(formatConsoleArgs(args)),
        warn: (...args) => logs.push(`⚠ ${formatConsoleArgs(args)}`),
        error: (...args) => errors.push(formatConsoleArgs(args)),
        debug: (...args) => logs.push(formatConsoleArgs(args)),
        table: (...args) => logs.push(formatConsoleArgs(args)),
      };

      try {
        win.eval(`"use strict";\n${source}`);
        resolve({
          stdout: logs.join("\n"),
          stderr: errors.join("\n"),
          error: errors[0] || null,
        });
      } catch (error) {
        resolve({
          stdout: logs.join("\n"),
          stderr: error?.message || String(error),
          error: error?.message || String(error),
        });
      } finally {
        cleanup();
      }
    };

    iframe.onerror = () => {
      cleanup();
      resolve({
        stdout: "",
        stderr: "Could not initialize DOM sandbox.",
        error: "Could not initialize DOM sandbox.",
      });
    };

    document.body.appendChild(iframe);
    iframe.srcdoc = DOM_BOOTSTRAP_HTML;
  });
}
