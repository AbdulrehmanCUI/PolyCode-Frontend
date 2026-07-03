import { analyzeCodeLocally } from "../lib/analyzeLocally";
import { mapPolyGuardApiResponse } from "../lib/mapApiResponse";
import { getPolyGuardAnalyzeUrl } from "../config";
import { toPolyGuardLanguage } from "../lib/mapLanguage";

function isMlApiEnabled() {
  return process.env.REACT_APP_POLYGUARD_USE_ML === "true";
}

/**
 * ML API mode: POST /analyze on HuggingFace Space (REACT_APP_POLYGUARD_USE_ML=true).
 * Local mode: browser rules engine (default when USE_ML is not set).
 */
export async function analyzeCodeWithPolyGuard(
  code,
  language = "python",
  options = {},
) {
  const trimmed = String(code || "").trim();
  if (!trimmed) {
    throw new Error("Add some code before running PolyGuard analysis.");
  }

  const lang = toPolyGuardLanguage(language);

  if (isMlApiEnabled()) {
    const response = await fetch(getPolyGuardAnalyzeUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: trimmed, language: lang }),
    });

    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }

    if (!response.ok || !payload) {
      const detail =
        payload?.detail || `PolyGuard API error (${response.status})`;
      throw new Error(
        typeof detail === "string" ? detail : "PolyGuard API request failed.",
      );
    }

    return mapPolyGuardApiResponse(payload, lang);
  }

  return analyzeCodeLocally(trimmed, lang, options.context || {});
}
