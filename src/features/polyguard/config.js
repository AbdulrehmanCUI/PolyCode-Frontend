const DEFAULT_POLYGUARD_API_URL =
  "https://muhammadsaadamin-polyguard-api.hf.space";

function normalizeBase(url = "") {
  return String(url).trim().replace(/\/+$/, "");
}

export function getPolyGuardApiBaseUrl() {
  return normalizeBase(
    process.env.REACT_APP_POLYGUARD_API_URL || DEFAULT_POLYGUARD_API_URL,
  );
}

export function getPolyGuardAnalyzeUrl() {
  return `${getPolyGuardApiBaseUrl()}/analyze`;
}
