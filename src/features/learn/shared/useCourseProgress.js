import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "../../auth/context/AuthContext";
import { recordLessonXp } from "./recordLessonXp";
import {
  readScopedJson,
  readScopedString,
  resolveLearnUserScope,
  writeScopedJson,
  writeScopedString,
} from "./scopedProgressStorage";
import {
  addCourseTime,
  completeCourseLesson,
  getCourseProgress,
  notesToMap,
  progressToMap,
  saveCourseCode,
  saveCourseNote,
  savedCodeToMap,
  setLastCourseLesson,
  toggleCourseBookmark,
  upsertLessonEngagement,
} from "./courseProgressApi";
import { storageKeysForPrefix } from "./courseRegistry";
import useLessonTimeTracking from "./useLessonTimeTracking";

function readUnscopedJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeUnscopedJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Shared course progress hook: MongoDB when signed in, localStorage for guests.
 */
export default function useCourseProgress({
  courseId,
  storagePrefix,
  scoped = false,
  supportsNotes = false,
}) {
  const { user, isAuthenticated, token, loading } = useAuth();
  const [remoteProgress, setRemoteProgress] = useState(null);
  const [syncState, setSyncState] = useState(token ? "syncing" : "local");
  const [localVersion, setLocalVersion] = useState(0);
  const [activeLessonId, setActiveLessonId] = useState(null);
  const refreshLocal = useCallback(() => setLocalVersion((v) => v + 1), []);
  const scopeReady = scoped
    ? Boolean(resolveLearnUserScope(user, token))
    : true;
  const keys = useMemo(
    () => storageKeysForPrefix(storagePrefix),
    [storagePrefix],
  );

  const readProgressLocal = useCallback(() => {
    if (scoped) {
      if (!scopeReady) return {};
      return readScopedJson(keys.progress, user, {}, token);
    }
    return readUnscopedJson(keys.progress, {});
  }, [keys.progress, scopeReady, scoped, token, user]);

  const readCodeLocal = useCallback(() => {
    if (scoped) {
      if (!scopeReady) return {};
      return readScopedJson(keys.savedCode, user, {}, token);
    }
    return readUnscopedJson(keys.savedCode, {});
  }, [keys.savedCode, scopeReady, scoped, token, user]);

  const readBookmarksLocal = useCallback(() => {
    if (scoped) {
      if (!scopeReady) return [];
      return readScopedJson(keys.bookmarks, user, [], token);
    }
    return readUnscopedJson(keys.bookmarks, []);
  }, [keys.bookmarks, scopeReady, scoped, token, user]);

  const readNotesLocal = useCallback(() => {
    if (!supportsNotes) return {};
    if (scoped) {
      if (!scopeReady) return {};
      return readScopedJson(keys.notes, user, {}, token);
    }
    return readUnscopedJson(keys.notes, {});
  }, [keys.notes, scopeReady, scoped, supportsNotes, token, user]);

  const readLastLocal = useCallback(() => {
    if (scoped) {
      if (!scopeReady) return null;
      return readScopedString(keys.lastLesson, user, token);
    }
    return localStorage.getItem(keys.lastLesson);
  }, [keys.lastLesson, scopeReady, scoped, token, user]);

  const writeProgressLocal = useCallback(
    (value) => {
      if (scoped) writeScopedJson(keys.progress, user, value, token);
      else writeUnscopedJson(keys.progress, value);
    },
    [keys.progress, scoped, token, user],
  );

  const writeCodeLocal = useCallback(
    (value) => {
      if (scoped) writeScopedJson(keys.savedCode, user, value, token);
      else writeUnscopedJson(keys.savedCode, value);
    },
    [keys.savedCode, scoped, token, user],
  );

  const writeBookmarksLocal = useCallback(
    (value) => {
      if (scoped) writeScopedJson(keys.bookmarks, user, value, token);
      else writeUnscopedJson(keys.bookmarks, value);
    },
    [keys.bookmarks, scoped, token, user],
  );

  const writeNotesLocal = useCallback(
    (value) => {
      if (!supportsNotes) return;
      if (scoped) writeScopedJson(keys.notes, user, value, token);
      else writeUnscopedJson(keys.notes, value);
    },
    [keys.notes, scoped, supportsNotes, token, user],
  );

  const writeLastLocal = useCallback(
    (lessonId) => {
      if (scoped) writeScopedString(keys.lastLesson, user, lessonId, token);
      else localStorage.setItem(keys.lastLesson, lessonId);
    },
    [keys.lastLesson, scoped, token, user],
  );

  const mirrorRemoteToLocal = useCallback(
    (progress) => {
      if (!progress || !token) return;
      writeProgressLocal(progressToMap(progress));
      writeCodeLocal(savedCodeToMap(progress));
      writeBookmarksLocal(progress.bookmarks || []);
      if (supportsNotes) writeNotesLocal(notesToMap(progress));
      if (progress.lastLessonId) writeLastLocal(progress.lastLessonId);
    },
    [
      supportsNotes,
      token,
      writeBookmarksLocal,
      writeCodeLocal,
      writeLastLocal,
      writeNotesLocal,
      writeProgressLocal,
    ],
  );

  useEffect(() => {
    let cancelled = false;
    if (!token) {
      setRemoteProgress(null);
      setSyncState("guest");
      return undefined;
    }

    setSyncState("syncing");
    getCourseProgress(token, courseId)
      .then((progress) => {
        if (cancelled) return;
        setRemoteProgress(progress);
        mirrorRemoteToLocal(progress);
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
  }, [courseId, token]); // eslint-disable-line react-hooks/exhaustive-deps -- load once per course/session

  const completedMap = useMemo(() => {
    void localVersion;
    if (remoteProgress) return progressToMap(remoteProgress);
    if (token && (loading || (scoped && !scopeReady))) return {};
    if (!isAuthenticated && scoped) return {};
    // Guests get empty completed for gated courses; unscoped bookmarks still readable
    if (!isAuthenticated) return {};
    return readProgressLocal();
  }, [
    remoteProgress,
    localVersion,
    token,
    loading,
    scoped,
    scopeReady,
    isAuthenticated,
    readProgressLocal,
  ]);

  const savedCodeMap = useMemo(() => {
    void localVersion;
    if (remoteProgress) return savedCodeToMap(remoteProgress);
    if (token && (loading || (scoped && !scopeReady))) return {};
    if (!isAuthenticated) return {};
    return readCodeLocal();
  }, [
    remoteProgress,
    localVersion,
    token,
    loading,
    scoped,
    scopeReady,
    isAuthenticated,
    readCodeLocal,
  ]);

  const notesMap = useMemo(() => {
    void localVersion;
    if (!supportsNotes) return {};
    if (remoteProgress) return notesToMap(remoteProgress);
    return readNotesLocal();
  }, [remoteProgress, localVersion, supportsNotes, readNotesLocal]);

  const bookmarks = useMemo(() => {
    void localVersion;
    if (remoteProgress) return remoteProgress.bookmarks || [];
    if (scoped && !scopeReady) return [];
    return readBookmarksLocal();
  }, [remoteProgress, localVersion, scoped, scopeReady, readBookmarksLocal]);

  const lastLessonId = remoteProgress
    ? remoteProgress.lastLessonId
    : scoped && !scopeReady
      ? null
      : readLastLocal();

  const completeLesson = useCallback(
    async (lesson) => {
      const lessonId = lesson.id || lesson.lessonId;
      if (!lessonId) return;

      if (token) {
        // #region agent log
        fetch("http://127.0.0.1:7715/ingest/7db3ce00-8987-41d1-83fe-f090f7ed3b4c", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Debug-Session-Id": "807e54",
          },
          body: JSON.stringify({
            sessionId: "807e54",
            location: "useCourseProgress.js:completeLesson",
            message: "completeLesson api start",
            data: {
              courseId,
              lessonId,
              lessonXp: Number(lesson.xp) || 0,
              hasToken: Boolean(token),
            },
            hypothesisId: "H1",
            runId: "pre-fix",
            timestamp: Date.now(),
          }),
        }).catch(() => {});
        // #endregion
        try {
          const progress = await completeCourseLesson(token, courseId, {
            lessonId,
            title: lesson.title || "",
            chapterId: lesson.chapterId || "",
            chapterTitle: lesson.chapterTitle || "",
            xp: lesson.xp || 0,
          });
          // #region agent log
          fetch("http://127.0.0.1:7715/ingest/7db3ce00-8987-41d1-83fe-f090f7ed3b4c", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Debug-Session-Id": "807e54",
            },
            body: JSON.stringify({
              sessionId: "807e54",
              location: "useCourseProgress.js:completeLesson",
              message: "completeLesson api ok",
              data: {
                courseId,
                lessonId,
                totalXp: progress?.totalXp,
                completedCount: progress?.completedLessons?.length,
              },
              hypothesisId: "H1",
              runId: "pre-fix",
              timestamp: Date.now(),
            }),
          }).catch(() => {});
          // #endregion
          setRemoteProgress(progress);
          mirrorRemoteToLocal(progress);
          setSyncState("synced");
          recordLessonXp(token, courseId, lesson);
          upsertLessonEngagement(token, courseId, {
            lessonId,
            challengeLastResult: "pass",
          }).catch(() => {});
        } catch (error) {
          // #region agent log
          fetch("http://127.0.0.1:7715/ingest/7db3ce00-8987-41d1-83fe-f090f7ed3b4c", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Debug-Session-Id": "807e54",
            },
            body: JSON.stringify({
              sessionId: "807e54",
              location: "useCourseProgress.js:completeLesson",
              message: "completeLesson api error",
              data: {
                courseId,
                lessonId,
                error: error?.message || String(error),
              },
              hypothesisId: "H1",
              runId: "pre-fix",
              timestamp: Date.now(),
            }),
          }).catch(() => {});
          // #endregion
          throw error;
        }
        return;
      }

      // #region agent log
      fetch("http://127.0.0.1:7715/ingest/7db3ce00-8987-41d1-83fe-f090f7ed3b4c", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Debug-Session-Id": "807e54",
        },
        body: JSON.stringify({
          sessionId: "807e54",
          location: "useCourseProgress.js:completeLesson",
          message: "completeLesson local only",
          data: {
            courseId,
            lessonId,
            scoped,
            scopeReady,
            isAuthenticated,
          },
          hypothesisId: "H4",
          runId: "pre-fix",
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion

      if (scoped && !scopeReady) return;
      if (!isAuthenticated && !token) {
        // Allow guest local-only completion cache for future merge
      }
      const current = readProgressLocal();
      current[lessonId] = { xp: lesson.xp, at: Date.now() };
      writeProgressLocal(current);
      writeLastLocal(lessonId);
      refreshLocal();
      recordLessonXp(token, courseId, lesson);
    },
    [
      courseId,
      isAuthenticated,
      mirrorRemoteToLocal,
      readProgressLocal,
      refreshLocal,
      scopeReady,
      scoped,
      token,
      writeLastLocal,
      writeProgressLocal,
    ],
  );

  const rememberLesson = useCallback(
    async (lessonId) => {
      setActiveLessonId(lessonId || null);
      if (token) {
        try {
          const progress = await setLastCourseLesson(token, courseId, lessonId);
          setRemoteProgress(progress);
          mirrorRemoteToLocal(progress);
          setSyncState("synced");
        } catch {
          setSyncState("error");
        }
        return;
      }
      if (scoped && !scopeReady) return;
      writeLastLocal(lessonId);
      refreshLocal();
    },
    [
      courseId,
      mirrorRemoteToLocal,
      refreshLocal,
      scopeReady,
      scoped,
      token,
      writeLastLocal,
    ],
  );

  const saveCode = useCallback(
    async (lessonId, code) => {
      if (token) {
        const progress = await saveCourseCode(token, courseId, lessonId, code);
        setRemoteProgress(progress);
        mirrorRemoteToLocal(progress);
        setSyncState("synced");
        return;
      }
      if (!isAuthenticated) return;
      if (scoped && !scopeReady) return;
      const current = readCodeLocal();
      current[lessonId] = code;
      writeCodeLocal(current);
      refreshLocal();
    },
    [
      courseId,
      isAuthenticated,
      mirrorRemoteToLocal,
      readCodeLocal,
      refreshLocal,
      scopeReady,
      scoped,
      token,
      writeCodeLocal,
    ],
  );

  const saveNote = useCallback(
    async (lessonId, note) => {
      if (!supportsNotes) return;
      if (token) {
        const progress = await saveCourseNote(token, courseId, lessonId, note);
        setRemoteProgress(progress);
        mirrorRemoteToLocal(progress);
        setSyncState("synced");
        return;
      }
      if (scoped && !scopeReady) return;
      const current = readNotesLocal();
      current[lessonId] = note;
      writeNotesLocal(current);
      refreshLocal();
    },
    [
      courseId,
      mirrorRemoteToLocal,
      readNotesLocal,
      refreshLocal,
      scopeReady,
      scoped,
      supportsNotes,
      token,
      writeNotesLocal,
    ],
  );

  const getLessonNote = useCallback(
    (lessonId) => {
      if (!supportsNotes || !lessonId) return "";
      return notesMap[lessonId] || "";
    },
    [notesMap, supportsNotes],
  );

  const toggleBookmark = useCallback(
    async (lessonId) => {
      if (token) {
        const progress = await toggleCourseBookmark(token, courseId, lessonId);
        setRemoteProgress(progress);
        mirrorRemoteToLocal(progress);
        setSyncState("synced");
        return;
      }
      if (scoped && !scopeReady) return;
      const current = readBookmarksLocal();
      const next = current.includes(lessonId)
        ? current.filter((id) => id !== lessonId)
        : [...current, lessonId];
      writeBookmarksLocal(next);
      refreshLocal();
    },
    [
      courseId,
      mirrorRemoteToLocal,
      readBookmarksLocal,
      refreshLocal,
      scopeReady,
      scoped,
      token,
      writeBookmarksLocal,
    ],
  );

  const addTime = useCallback(
    async (minutes) => {
      if (!token) return;
      try {
        const progress = await addCourseTime(token, courseId, minutes);
        setRemoteProgress(progress);
        mirrorRemoteToLocal(progress);
        setSyncState("synced");
      } catch {
        setSyncState("error");
      }
    },
    [courseId, mirrorRemoteToLocal, token],
  );

  useLessonTimeTracking(addTime, activeLessonId);

  const recordChallengeResult = useCallback(
    async (lessonId, passed) => {
      if (!lessonId) return;
      if (!token) return;
      try {
        const progress = await upsertLessonEngagement(token, courseId, {
          lessonId,
          challengeLastResult: passed ? "pass" : "fail",
          incrementChallengeAttempts: !passed,
        });
        setRemoteProgress(progress);
        mirrorRemoteToLocal(progress);
        setSyncState("synced");
      } catch (error) {
        console.warn("Challenge engagement sync failed:", error.message);
      }
    },
    [courseId, mirrorRemoteToLocal, token],
  );

  const recordLastTab = useCallback(
    async (lessonId, lastTab) => {
      if (!lessonId || !lastTab || !token) return;
      try {
        const progress = await upsertLessonEngagement(token, courseId, {
          lessonId,
          lastTab,
        });
        setRemoteProgress(progress);
        mirrorRemoteToLocal(progress);
      } catch {
        /* non-blocking */
      }
    },
    [courseId, mirrorRemoteToLocal, token],
  );

  return {
    user,
    isAuthenticated,
    syncState,
    remoteProgress,
    completedMap,
    savedCodeMap,
    notesMap,
    bookmarks,
    lastLessonId,
    completeLesson,
    rememberLesson,
    saveCode,
    saveNote,
    getLessonNote,
    toggleBookmark,
    addTime,
    recordChallengeResult,
    recordLastTab,
  };
}
