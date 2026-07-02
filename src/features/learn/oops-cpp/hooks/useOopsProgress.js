import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../auth/context/AuthContext";
import { recordLessonXp } from "../../shared/recordLessonXp";
import {
  readScopedJson,
  readScopedString,
  resolveLearnUserScope,
  writeScopedJson,
  writeScopedString,
} from "../../shared/scopedProgressStorage";
import {
  addOopsTime,
  completeOopsLesson,
  getOopsProgress,
  progressToMap,
  savedCodeToMap,
  saveOopsCode,
  setLastOopsLesson,
  toggleOopsBookmark,
} from "../services/oopsProgressApi";

const LOCAL_KEY = "oops_progress";
const LOCAL_CODE_KEY = "oops_saved_code";
const LOCAL_BOOKMARKS_KEY = "oops_bookmarks";
const LOCAL_LAST_KEY = "oops_last_lesson";

export default function useOopsProgress() {
  const { user, token, loading } = useAuth();
  const [remoteProgress, setRemoteProgress] = useState(null);
  const [syncState, setSyncState] = useState("local");
  const [localVersion, setLocalVersion] = useState(0);
  const scopeReady = Boolean(resolveLearnUserScope(user, token));

  const refreshLocal = useCallback(() => setLocalVersion((v) => v + 1), []);

  useEffect(() => {
    let cancelled = false;
    if (!token) {
      setRemoteProgress(null);
      setSyncState("local");
      return undefined;
    }

    setSyncState("syncing");
    getOopsProgress(token)
      .then((progress) => {
        if (cancelled) return;
        setRemoteProgress(progress);
        setSyncState("synced");
      })
      .catch(() => {
        if (cancelled) return;
        setRemoteProgress(null);
        setSyncState("error");
      });

    return () => {
      cancelled = true;
    };
  }, [token, localVersion]);

  const completedMap = useMemo(() => {
    void localVersion;
    if (remoteProgress) return progressToMap(remoteProgress);
    if (!scopeReady || loading) return {};
    return readScopedJson(LOCAL_KEY, user, {}, token);
  }, [remoteProgress, localVersion, loading, scopeReady, token, user]);

  const savedCodeMap = useMemo(() => {
    void localVersion;
    if (remoteProgress) return savedCodeToMap(remoteProgress);
    if (!scopeReady) return {};
    return readScopedJson(LOCAL_CODE_KEY, user, {}, token);
  }, [remoteProgress, localVersion, scopeReady, token, user]);

  const bookmarks = useMemo(() => {
    void localVersion;
    if (remoteProgress) return remoteProgress.bookmarks || [];
    if (!scopeReady) return [];
    return readScopedJson(LOCAL_BOOKMARKS_KEY, user, [], token);
  }, [remoteProgress, localVersion, scopeReady, token, user]);

  const lastLessonId = remoteProgress
    ? remoteProgress.lastLessonId
    : scopeReady
      ? readScopedString(LOCAL_LAST_KEY, user, token)
      : null;

  const completeLesson = useCallback(
    async (lesson) => {
      if (token) {
        const progress = await completeOopsLesson(token, {
          lessonId: lesson.id,
          title: lesson.title,
          chapterId: lesson.chapterId,
          chapterTitle: lesson.chapterTitle,
          xp: lesson.xp,
        });
        setRemoteProgress(progress);
        setSyncState("synced");
        recordLessonXp(token, "oops-cpp", lesson);
        return;
      }

      if (!scopeReady) return;
      const current = readScopedJson(LOCAL_KEY, user, {}, token);
      current[lesson.id] = { xp: lesson.xp, at: Date.now() };
      writeScopedJson(LOCAL_KEY, user, current, token);
      writeScopedString(LOCAL_LAST_KEY, user, lesson.id, token);
      refreshLocal();
      recordLessonXp(token, "oops-cpp", lesson);
    },
    [refreshLocal, scopeReady, token, user],
  );

  const rememberLesson = useCallback(
    async (lessonId) => {
      if (token) {
        try {
          const progress = await setLastOopsLesson(token, lessonId);
          setRemoteProgress(progress);
          setSyncState("synced");
        } catch {
          setSyncState("error");
        }
        return;
      }

      if (!scopeReady) return;
      writeScopedString(LOCAL_LAST_KEY, user, lessonId, token);
      refreshLocal();
    },
    [refreshLocal, scopeReady, token, user],
  );

  const saveCode = useCallback(
    async (lessonId, code) => {
      if (token) {
        const progress = await saveOopsCode(token, lessonId, code);
        setRemoteProgress(progress);
        setSyncState("synced");
        return;
      }

      if (!scopeReady) return;
      const current = readScopedJson(LOCAL_CODE_KEY, user, {}, token);
      current[lessonId] = code;
      writeScopedJson(LOCAL_CODE_KEY, user, current, token);
      refreshLocal();
    },
    [refreshLocal, scopeReady, token, user],
  );

  const toggleBookmark = useCallback(
    async (lessonId) => {
      if (token) {
        const progress = await toggleOopsBookmark(token, lessonId);
        setRemoteProgress(progress);
        setSyncState("synced");
        return;
      }

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

  const addTime = useCallback(
    async (minutes) => {
      if (!token) return;
      try {
        const progress = await addOopsTime(token, minutes);
        setRemoteProgress(progress);
        setSyncState("synced");
      } catch {
        setSyncState("error");
      }
    },
    [token],
  );

  return {
    user,
    syncState,
    remoteProgress,
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
