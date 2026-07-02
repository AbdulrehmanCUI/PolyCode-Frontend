const LEARN_PROGRESS_BASE_KEYS = [
  "oops_progress",
  "oops_saved_code",
  "oops_bookmarks",
  "oops_last_lesson",
  "pointers_cpp_progress",
  "pointers_cpp_saved_code",
  "pointers_cpp_bookmarks",
  "pointers_cpp_last_lesson",
  "numpy_py_progress",
  "numpy_py_saved_code",
  "numpy_py_bookmarks",
  "numpy_py_last_lesson",
  "pandas_py_progress",
  "pandas_py_saved_code",
  "pandas_py_bookmarks",
  "pandas_py_last_lesson",
  "fastapi_py_progress",
  "fastapi_py_saved_code",
  "fastapi_py_bookmarks",
  "fastapi_py_last_lesson",
];

function decodeUserIdFromToken(token) {
  if (!token || typeof token !== "string") return null;
  try {
    const segment = token.split(".")[1];
    if (!segment) return null;
    const payload = JSON.parse(atob(segment.replace(/-/g, "+").replace(/_/g, "/")));
    const id = payload.id || payload.userId || payload.sub;
    return id ? String(id) : null;
  } catch {
    return null;
  }
}

/**
 * Returns a stable user id for learn progress keys.
 * - Signed-out visitors use "guest".
 * - Signed-in users must never share the guest bucket; when id is not ready yet, returns null.
 */
function resolveLearnUserScope(user, token) {
  const fromUser = user?._id || user?.id;
  if (fromUser) return String(fromUser);

  if (token) {
    const fromToken = decodeUserIdFromToken(token);
    return fromToken || null;
  }

  return "guest";
}

function getLearnUserScope(user, token) {
  return resolveLearnUserScope(user, token);
}

function scopedLearnKey(baseKey, user, token) {
  const scope = resolveLearnUserScope(user, token);
  if (!scope) return null;
  return `${baseKey}:${scope}`;
}

function readScopedJson(baseKey, user, fallback, token) {
  const key = scopedLearnKey(baseKey, user, token);
  if (!key) return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeScopedJson(baseKey, user, value, token) {
  const key = scopedLearnKey(baseKey, user, token);
  if (!key) return;
  localStorage.setItem(key, JSON.stringify(value));
}

function readScopedString(baseKey, user, token) {
  const key = scopedLearnKey(baseKey, user, token);
  if (!key) return null;
  return localStorage.getItem(key);
}

function writeScopedString(baseKey, user, value, token) {
  const key = scopedLearnKey(baseKey, user, token);
  if (!key) return;
  localStorage.setItem(key, value);
}

/**
 * Remove legacy unscoped keys and shared guest buckets so a new account
 * on the same browser cannot inherit another session's progress.
 */
function isolateLearnProgressForUser(userId) {
  if (!userId) return;

  LEARN_PROGRESS_BASE_KEYS.forEach((baseKey) => {
    localStorage.removeItem(baseKey);
    localStorage.removeItem(`${baseKey}:guest`);
  });
}

export {
  LEARN_PROGRESS_BASE_KEYS,
  decodeUserIdFromToken,
  resolveLearnUserScope,
  getLearnUserScope,
  scopedLearnKey,
  readScopedJson,
  writeScopedJson,
  readScopedString,
  writeScopedString,
  isolateLearnProgressForUser,
};
