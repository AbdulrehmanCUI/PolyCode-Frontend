import { analyzeCodeLocally } from "../lib/analyzeLocally";
import { enrichPolyGuardAnalysis } from "../lib/enrichAnalysis";
import { getPolyGuardAnalyzeUrl } from "../config";
import { toPolyGuardLanguage } from "../lib/mapLanguage";

/**
 * Primary analyzer: local rules engine + lesson context (accurate for learning code).
 * Optional remote ML augment when REACT_APP_POLYGUARD_REMOTE_AUGMENT=true.
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
  const local = analyzeCodeLocally(trimmed, lang, options.context || {});

  const useRemote = process.env.REACT_APP_POLYGUARD_REMOTE_AUGMENT === "true";
  if (!useRemote) {
    return local;
  }

  try {
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
      return local;
    }

    return enrichPolyGuardAnalysis(payload, {
      code: trimmed,
      language: lang,
      context: options.context || {},
      baseLocal: local,
    });
  } catch {
    return local;
  }
}
