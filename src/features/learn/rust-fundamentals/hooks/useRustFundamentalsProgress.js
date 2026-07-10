import { useCallback, useMemo, useState } from "react";
import { useAuth } from "../../../auth/context/AuthContext";
import { recordLessonXp } from "../../shared/recordLessonXp";

// Isolated prefix keys for the Rust fundamentals track
const LOCAL_KEY = "rust_fundamentals_progress";
const LOCAL_CODE_KEY = "rust_fundamentals_saved_code";
const LOCAL_BOOKMARKS_KEY = "rust_fundamentals_bookmarks";
const LOCAL_NOTES_KEY = "rust_fundamentals_notes"; 
const LOCAL_LAST_KEY = "rust_fundamentals_last_lesson";

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

export default function useRustFundamentalsProgress() {
  const { user, isAuthenticated, token } = useAuth();
  const [localVersion, setLocalVersion] = useState(0);
  const refreshLocal = useCallback(() => setLocalVersion((v) => v + 1), []);

  const localSnapshot = useMemo(() => {
    void localVersion;
    return {
      completed: readJson(LOCAL_KEY, {}),
      savedCode: readJson(LOCAL_CODE_KEY, {}),
      bookmarks: readJson(LOCAL_BOOKMARKS_KEY, []),
      notes: readJson(LOCAL_NOTES_KEY, {}), 
    };
  }, [localVersion]);

  const completedMap = isAuthenticated ? localSnapshot.completed : {};
  const savedCodeMap = isAuthenticated ? localSnapshot.savedCode : {};
  const bookmarks = localSnapshot.bookmarks;
  const lastLessonId = localStorage.getItem(LOCAL_LAST_KEY);

  const getLessonNote = useCallback(
    (lessonId) => {
      if (!lessonId) return "";
      return localSnapshot.notes[lessonId] || "";
    },
    [localSnapshot.notes]
  );

  const saveNote = useCallback(
    async (lessonId, noteText) => {
      if (!isAuthenticated || !lessonId) return;
      const current = readJson(LOCAL_NOTES_KEY, {});
      current[lessonId] = noteText;
      localStorage.setItem(LOCAL_NOTES_KEY, JSON.stringify(current));
      refreshLocal();
    },
    [isAuthenticated, refreshLocal]
  );

  const completeLesson = useCallback(
    async (lesson) => {
      if (!isAuthenticated) return;
      const current = readJson(LOCAL_KEY, {});
      current[lesson.id] = { xp: lesson.xp, at: Date.now() };
      localStorage.setItem(LOCAL_KEY, JSON.stringify(current));
      localStorage.setItem(LOCAL_LAST_KEY, lesson.id);
      refreshLocal();
      recordLessonXp(token, "rust-fundamentals", lesson);
    },
    [isAuthenticated, refreshLocal, token],
  );

  const rememberLesson = useCallback(
    async (lessonId) => {
      localStorage.setItem(LOCAL_LAST_KEY, lessonId);
      refreshLocal();
    },
    [refreshLocal],
  );

  const saveCode = useCallback(
    async (lessonId, code) => {
      if (!isAuthenticated) return;
      const current = readJson(LOCAL_CODE_KEY, {});
      current[lessonId] = code;
      localStorage.setItem(LOCAL_CODE_KEY, JSON.stringify(current));
      refreshLocal();
    },
    [isAuthenticated, refreshLocal],
  );

  const toggleBookmark = useCallback(
    async (lessonId) => {
      const current = readJson(LOCAL_BOOKMARKS_KEY, []);
      const next = current.includes(lessonId)
        ? current.filter((id) => id !== lessonId)
        : [...current, lessonId];
      localStorage.setItem(LOCAL_BOOKMARKS_KEY, JSON.stringify(next));
      refreshLocal();
    },
    [refreshLocal],
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
    getLessonNote, 
    saveNote,       
  };
}