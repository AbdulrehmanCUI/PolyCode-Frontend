import { useCallback, useMemo, useState } from "react";
import { useAuth } from "../../../auth/context/AuthContext";
import { recordLessonXp } from "../../shared/recordLessonXp";

const LOCAL_KEY = "ruby_blocks_modules_progress";
const LOCAL_CODE_KEY = "ruby_blocks_modules_saved_code";
const LOCAL_BOOKMARKS_KEY = "ruby_blocks_modules_bookmarks";
const LOCAL_LAST_KEY = "ruby_blocks_modules_last_lesson";

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

export default function useRubyBlocksModulesProgress() {
  const { user, isAuthenticated, token } = useAuth();
  const [localVersion, setLocalVersion] = useState(0);
  const refreshLocal = useCallback(() => setLocalVersion((v) => v + 1), []);

  const localSnapshot = useMemo(() => {
    void localVersion;
    return {
      completed: readJson(LOCAL_KEY, {}),
      savedCode: readJson(LOCAL_CODE_KEY, {}),
      bookmarks: readJson(LOCAL_BOOKMARKS_KEY, []),
    };
  }, [localVersion]);

  const completedMap = isAuthenticated ? localSnapshot.completed : {};
  const savedCodeMap = isAuthenticated ? localSnapshot.savedCode : {};
  const bookmarks = localSnapshot.bookmarks;
  const lastLessonId = localStorage.getItem(LOCAL_LAST_KEY);

  const completeLesson = useCallback(
    async (lesson) => {
      if (!isAuthenticated) return;
      const current = readJson(LOCAL_KEY, {});
      current[lesson.id] = { xp: lesson.xp, at: Date.now() };
      localStorage.setItem(LOCAL_KEY, JSON.stringify(current));
      localStorage.setItem(LOCAL_LAST_KEY, lesson.id);
      refreshLocal();
      recordLessonXp(token, "ruby-blocks-modules", lesson);
    },
    [isAuthenticated, refreshLocal, token]
  );

  const rememberLesson = useCallback((lessonId) => {
    if (lessonId) localStorage.setItem(LOCAL_LAST_KEY, lessonId);
  }, []);

  const saveCode = useCallback((lessonId, code) => {
    if (!isAuthenticated) return;
    const current = readJson(LOCAL_CODE_KEY, {});
    current[lessonId] = code;
    localStorage.setItem(LOCAL_CODE_KEY, JSON.stringify(current));
    refreshLocal();
  }, [isAuthenticated, refreshLocal]);

  const toggleBookmark = useCallback((lessonId) => {
    if (!isAuthenticated) return;
    const current = readJson(LOCAL_BOOKMARKS_KEY, []);
    const idx = current.indexOf(lessonId);
    if (idx >= 0) current.splice(idx, 1);
    else current.push(lessonId);
    localStorage.setItem(LOCAL_BOOKMARKS_KEY, JSON.stringify(current));
    refreshLocal();
  }, [isAuthenticated, refreshLocal]);

  return {
    user,
    isAuthenticated,
    completedMap,
    savedCodeMap,
    bookmarks,
    lastLessonId,
    completeLesson,
    rememberLesson,
    saveCode,
    toggleBookmark,
  };
}
