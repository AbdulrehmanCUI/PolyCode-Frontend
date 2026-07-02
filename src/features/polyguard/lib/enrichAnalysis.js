import { analyzeCodeLocally } from "./analyzeLocally";

export function enrichPolyGuardAnalysis(
  result,
  { code = "", language = "python", context = {}, baseLocal = null } = {},
) {
  if (!result) return baseLocal;
  if (result.analyzer === "polyguard-hybrid") return result;
  return analyzeCodeLocally(code, language, context);
}
