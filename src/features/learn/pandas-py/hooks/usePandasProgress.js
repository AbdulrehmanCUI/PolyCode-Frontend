import { useCallback, useMemo, useState } from "react";
import { useAuth } from "../../../auth/context/AuthContext";
import { recordLessonXp } from "../../shared/recordLessonXp";
import {
  readScopedJson,
  readScopedString,
  resolveLearnUserScope,
  writeScopedJson,
  writeScopedString,
} from "../../shared/scopedProgressStorage";

const LOCAL_KEY = "pandas_py_progress";
const LOCAL_CODE_KEY = "pandas_py_saved_code";
const LOCAL_BOOKMARKS_KEY = "pandas_py_bookmarks";
const LOCAL_LAST_KEY = "pandas_py_last_lesson";

export default function usePandasProgress() {
  const { user, isAuthenticated, token, loading } = useAuth();
  const [localVersion, setLocalVersion] = useState(0);
  const refreshLocal = useCallback(() => setLocalVersion((v) => v + 1), []);
  const scopeReady = Boolean(resolveLearnUserScope(user, token));

  const localSnapshot = useMemo(() => {
    void localVersion;
    if (!scopeReady) {
      return { completed: {}, savedCode: {}, bookmarks: [] };
    }
    return {
      completed: readScopedJson(LOCAL_KEY, user, {}, token),
      savedCode: readScopedJson(LOCAL_CODE_KEY, user, {}, token),
      bookmarks: readScopedJson(LOCAL_BOOKMARKS_KEY, user, [], token),
    };
  }, [localVersion, scopeReady, token, user]);

  const completedMap =
    isAuthenticated && !loading && scopeReady ? localSnapshot.completed : {};
  const savedCodeMap =
    isAuthenticated && !loading && scopeReady ? localSnapshot.savedCode : {};
  const bookmarks = scopeReady ? localSnapshot.bookmarks : [];
  const lastLessonId = scopeReady
    ? readScopedString(LOCAL_LAST_KEY, user, token)
    : null;

  const completeLesson = useCallback(
    async (lesson) => {
      if (!isAuthenticated || !scopeReady) return;
      const current = readScopedJson(LOCAL_KEY, user, {}, token);
      current[lesson.id] = { xp: lesson.xp, at: Date.now() };
      writeScopedJson(LOCAL_KEY, user, current, token);
      writeScopedString(LOCAL_LAST_KEY, user, lesson.id, token);
      refreshLocal();
      recordLessonXp(token, "pandas-py", lesson);
    },
    [isAuthenticated, refreshLocal, scopeReady, token, user],
  );

  const rememberLesson = useCallback(
    async (lessonId) => {
      if (!scopeReady) return;
      writeScopedString(LOCAL_LAST_KEY, user, lessonId, token);
      refreshLocal();
    },
    [refreshLocal, scopeReady, token, user],
  );

  const saveCode = useCallback(
    async (lessonId, code) => {
      if (!isAuthenticated || !scopeReady) return;
      const current = readScopedJson(LOCAL_CODE_KEY, user, {}, token);
      current[lessonId] = code;
      writeScopedJson(LOCAL_CODE_KEY, user, current, token);
      refreshLocal();
    },
    [isAuthenticated, refreshLocal, scopeReady, token, user],
  );

  const toggleBookmark = useCallback(
    async (lessonId) => {
      if (!scopeReady) return;
      const current = readScopedJson(LOCAL_BOOKMARKS_KEY, user, [], token);
      const next = current.includes(lessonId)
        ? current.filter((id) => id !== lessonId)
        : [...current, lessonId];
      writeScopedJson(LOCAL_BOOKMARKS_KEY, user, next, token);
      refreshLocal();
    },
    [refreshLocal, scopeReady, token, user],
  );

  const addTime = useCallback(async () => {}, []);

  return {
    user,
    isAuthenticated,
    syncState: isAuthenticated ? "local" : "guest",
    remoteProgress: null,
    completedMap,
    savedCodeMap,
    bookmarks,
    lastLessonId,
    completeLesson,
    rememberLesson,
    saveCode,
    toggleBookmark,
    addTime,
  };
}
