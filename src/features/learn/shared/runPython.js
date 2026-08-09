import { executeCode } from "../../playground/services/BrowserExecutor";
import { getApiBase } from "../../../config/apiBase";
import {
  mergePythonRunResult,
  codeUsesMatplotlib,
} from "./pythonPlotOutput";
import { codeUsesTorch } from "./torchBrowserShim";

// Each hop must be bounded, otherwise a slow API or a stalled Pyodide download
// leaves the challenge stuck on "Running…" with no result.
const SERVER_TIMEOUT_MS = 15000;
const BROWSER_TIMEOUT_MS = 90000;

function withTimeout(promise, ms, message) {
  let timer = null;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(message)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

export function codeUsesScipy(source = "") {
  return /(?:^|\n)\s*(?:import|from)\s+scipy\b/m.test(source);
}

function friendlyPythonRuntimeMessage(message = "", { usesScipy = false } = {}) {
  const text = String(message || "");
  if (/Unexpected token\s*['"]?</i.test(text) || /received HTML/i.test(text)) {
    return usesScipy
      ? "Could not load SciPy in the browser (a download returned a web page instead of a package).\n\nFix: on the backend machine run\n  pip install -r requirements-learn-python.txt\nthen restart the server on port 5000."
      : "Could not load the in-browser Python runtime (received a web page instead of a script/package). Check your network, or start the backend on port 5000.";
  }
  if (/ModuleNotFoundError:\s*No module named ['"]scipy['"]/i.test(text)) {
    return "SciPy is not installed for the PolyCode backend Python.\n\nFix: run\n  pip install scipy\nor\n  pip install -r requirements-learn-python.txt\nthen restart the server.";
  }
  return text;
}

async function readJsonResponse(response) {
  const text = await response.text();
  const trimmed = text.trim();
  if (!trimmed) return {};
  if (trimmed.startsWith("<")) {
    throw new Error(
      "Server returned HTML instead of JSON. Start the PolyCode backend on port 5000.",
    );
  }
  try {
    return JSON.parse(trimmed);
  } catch {
    throw new Error("Python API returned invalid JSON.");
  }
}

async function runPythonOnServer(source) {
  const endpoints = ["/challenges/run-python", "/documents/run-python"];
  let lastError = null;

  for (const path of endpoints) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), SERVER_TIMEOUT_MS);

    try {
      const response = await fetch(`${getApiBase()}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: source }),
        signal: controller.signal,
      });

      const payload = await readJsonResponse(response);
      if (!response.ok) {
        lastError = new Error(
          payload.message || payload.error || `Python API failed (${path})`,
        );
        continue;
      }
      return mergePythonRunResult(payload);
    } catch (error) {
      if (error?.name === "AbortError") {
        clearTimeout(timeout);
        throw new Error(
          `Python API timed out after ${SERVER_TIMEOUT_MS / 1000}s.`,
        );
      }
      lastError = error;
    } finally {
      clearTimeout(timeout);
    }
  }

  throw lastError || new Error("Python API unavailable");
}

async function runPythonInBrowser(source) {
  try {
    const result = await withTimeout(
      executeCode(source, "python"),
      BROWSER_TIMEOUT_MS,
      "The in-browser Python runtime did not respond in time. Check your connection and run again.",
    );
    return mergePythonRunResult(result);
  } catch (error) {
    throw new Error(
      friendlyPythonRuntimeMessage(error?.message || String(error), {
        usesScipy: codeUsesScipy(source),
      }),
    );
  }
}

async function runPythonWithServerFirst(source) {
  const usesScipy = codeUsesScipy(source);
  try {
    const result = await runPythonOnServer(source);
    const runtimeError = getPythonRuntimeError(result);
    if (runtimeError) {
      throw new Error(runtimeError);
    }
    return { result, runtime: "server" };
  } catch (serverError) {
    const serverMessage = friendlyPythonRuntimeMessage(
      serverError?.message || String(serverError),
      { usesScipy },
    );

    // Missing server SciPy: prefer a clear install hint over a huge Pyodide
    // download that often fails with "Unexpected token '<'".
    if (
      usesScipy &&
      /No module named ['"]scipy['"]/i.test(serverError?.message || "")
    ) {
      throw new Error(serverMessage);
    }

    try {
      const browserResult = await runPythonInBrowser(source);
      const browserError = getPythonRuntimeError(browserResult);
      if (browserError) {
        throw new Error(
          friendlyPythonRuntimeMessage(browserError, { usesScipy }),
        );
      }
      return { result: browserResult, runtime: "browser" };
    } catch (browserError) {
      throw new Error(
        friendlyPythonRuntimeMessage(
          browserError.message || serverMessage,
          { usesScipy },
        ) ||
          "Could not run Python. Start the backend on port 5000 or check your network for Pyodide.",
      );
    }
  }
}

async function runPythonWithBrowserFirst(source) {
  const usesScipy = codeUsesScipy(source);
  try {
    return { result: await runPythonInBrowser(source), runtime: "browser" };
  } catch (browserError) {
    try {
      const result = await runPythonOnServer(source);
      const runtimeError = getPythonRuntimeError(result);
      if (runtimeError) {
        throw new Error(runtimeError);
      }
      return { result, runtime: "server" };
    } catch (serverError) {
      throw new Error(
        friendlyPythonRuntimeMessage(
          browserError.message || serverError.message,
          { usesScipy },
        ) ||
          "Could not run Python. Matplotlib needs the in-browser runtime (Pyodide) or matplotlib installed on the server.",
      );
    }
  }
}

export async function runPythonCode(source) {
  // Torch isn't on the server or real Pyodide wheels — use browser teaching shim.
  if (codeUsesTorch(source) || codeUsesMatplotlib(source)) {
    return runPythonWithBrowserFirst(source);
  }
  return runPythonWithServerFirst(source);
}

export function formatPythonOutput(result = {}) {
  return [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
}

export function getPythonRuntimeError(runResult) {
  return (
    runResult?.error ||
    (runResult?.exitCode != null && runResult.exitCode !== 0
      ? runResult.stderr || "Python exited with an error"
      : "")
  );
}
