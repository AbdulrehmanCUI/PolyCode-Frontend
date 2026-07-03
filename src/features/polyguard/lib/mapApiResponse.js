/**
 * Map PolyGuard FastAPI /analyze response → dashboard shape (PolyGuardReport).
 */
function gradeFromScore(score) {
  if (score >= 9) return "A";
  if (score >= 8) return "B";
  if (score >= 7) return "C";
  if (score >= 5) return "D";
  return "F";
}

function riskLabel(risk = "") {
  const value = String(risk).toLowerCase();
  if (value === "safe") return "SECURE";
  if (value === "low") return "LOW RISK";
  if (value === "medium") return "REVIEW";
  if (value === "high") return "AT RISK";
  return "REVIEW";
}

export function mapPolyGuardApiResponse(payload = {}, language = "python") {
  const score = Number(payload.score) || 0;
  const risk = String(payload.risk || "medium").toLowerCase();
  const verdict = payload.verdict || "REVIEW";
  const tips = Array.isArray(payload.tips) ? payload.tips.filter(Boolean) : [];
  const cleanConfidence =
    payload.clean_confidence != null
      ? Number(payload.clean_confidence)
      : Math.round(score * 10 * 10) / 10;
  const vulnConfidence =
    payload.vuln_confidence != null
      ? Number(payload.vuln_confidence)
      : Math.round((100 - cleanConfidence) * 10) / 10;

  const headline =
    tips.length > 1
      ? `${tips.length} issues found — fix each line below.`
      : tips.length === 1
        ? "1 issue to fix."
        : score >= 8
          ? "No issues detected for this snippet."
          : "Review your code against the lesson objective.";

  return {
    score,
    grade: payload.grade || gradeFromScore(score),
    risk,
    verdict,
    language: payload.language || language,
    lines_analyzed: payload.lines_analyzed || 0,
    analyzer: payload.analyzer || "polyguard-api",
    enriched: {
      headline,
      summary: headline,
      risk: risk.toUpperCase(),
      verdict,
      securityLabel: riskLabel(risk),
      actions: tips,
      findings: payload.structured_findings || [],
      metrics: {
        score,
        grade: payload.grade || gradeFromScore(score),
        linesAnalyzed: payload.lines_analyzed || 0,
        language: payload.language || language,
        cleanConfidence,
        vulnConfidence,
        riskLevel: risk.toUpperCase(),
      },
    },
  };
}
