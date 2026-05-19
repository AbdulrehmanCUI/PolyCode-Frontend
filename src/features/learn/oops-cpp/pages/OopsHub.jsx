import React from "react";
import { useNavigate } from "react-router-dom";
import { CHAPTERS, TOTAL_XP, ALL_LESSONS } from "../data/oopsCurriculum";
import useOopsProgress from "../hooks/useOopsProgress";

export default function OopsHub() {
  const navigate = useNavigate();
  const {
    user,
    syncState,
    remoteProgress,
    completedMap: progress,
    bookmarks,
    lastLessonId,
  } = useOopsProgress();
  const completedCount = Object.keys(progress).length;
  const earnedXP = ALL_LESSONS.filter((l) => progress[l.id]).reduce(
    (s, l) => s + l.xp,
    0,
  );
  const pct = Math.round((completedCount / ALL_LESSONS.length) * 100) || 0;
  const nextLesson =
    ALL_LESSONS.find((l) => !progress[l.id]) || ALL_LESSONS[0];
  const resumeLesson =
    ALL_LESSONS.find((l) => l.id === lastLessonId) || nextLesson;
  const completedChapters = CHAPTERS.filter((ch) =>
    ch.lessons.every((lesson) => progress[lesson.id]),
  ).length;
  const syncLabel = user
    ? syncState === "synced"
      ? "MongoDB sync active"
      : syncState === "syncing"
        ? "Syncing progress..."
        : "Signed in, sync pending"
    : "Guest progress on this device";

  return (
    <div className="oops-hub">
      {/* Hero */}
      <div className="oops-hero">
        <div className="oops-hero-badge">FREECODECAMP-STYLE C++ TRACK</div>
        <h1 className="oops-hero-title">
          Object-Oriented
          <br />
          <span className="oops-hero-accent">Programming</span>
        </h1>
        <p className="oops-hero-sub">
          Learn OOP by reading short concepts, stepping through diagrams,
          solving quizzes, and writing C++ in focused coding challenges.
        </p>

        <div className="oops-hero-grid">
          <div className="oops-xp-bar-wrap">
            <div className="oops-xp-meta">
              <span>
                {completedCount}/{ALL_LESSONS.length} lessons · {earnedXP}/
                {TOTAL_XP} XP
              </span>
              <span>{pct}%</span>
            </div>
            <div className="oops-xp-track">
              <div className="oops-xp-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>

          <div className="oops-resume-panel">
            <span className="oops-sync-pill">{syncLabel}</span>
            <h2>{resumeLesson ? resumeLesson.title : "Start the guide"}</h2>
            <p>
              {resumeLesson
                ? `${resumeLesson.chapterTitle} · ${resumeLesson.xp} XP`
                : "Begin with the first OOP concept."}
            </p>
            <button
              type="button"
              onClick={() =>
                navigate(`/learn/oops-cpp/lesson/${resumeLesson.id}`)
              }
            >
              {completedCount > 0 ? "Resume Learning" : "Start Learning"}
            </button>
          </div>
        </div>
      </div>

      <div className="oops-dashboard-strip">
        <div className="oops-stat-tile">
          <span>Lessons</span>
          <strong>
            {completedCount}/{ALL_LESSONS.length}
          </strong>
        </div>
        <div className="oops-stat-tile">
          <span>Chapters</span>
          <strong>
            {completedChapters}/{CHAPTERS.length}
          </strong>
        </div>
        <div className="oops-stat-tile">
          <span>Streak</span>
          <strong>{remoteProgress?.currentStreak || 0} days</strong>
        </div>
        <div className="oops-stat-tile">
          <span>Bookmarks</span>
          <strong>{bookmarks.length}</strong>
        </div>
      </div>

      <div className="oops-path-overview">
        {CHAPTERS.map((ch, index) => {
          const done = ch.lessons.filter((l) => progress[l.id]).length;
          const active = done > 0 && done < ch.lessons.length;
          return (
            <button
              key={ch.id}
              className={`oops-path-step ${active ? "active" : ""} ${
                done === ch.lessons.length ? "done" : ""
              }`}
              style={{ "--ch-color": ch.color }}
              onClick={() =>
                navigate(`/learn/oops-cpp/lesson/${ch.lessons[0].id}`)
              }
              type="button"
            >
              <span>{index + 1}</span>
              <strong>{ch.title}</strong>
              <small>
                {done}/{ch.lessons.length}
              </small>
            </button>
          );
        })}
      </div>

      {/* Chapter Grid */}
      <div className="oops-chapters">
        {CHAPTERS.map((ch, i) => {
          const chLessons = ch.lessons;
          const done = chLessons.filter((l) => progress[l.id]).length;
          const chPct = Math.round((done / chLessons.length) * 100) || 0;
          const firstUnfinished = chLessons.find((l) => !progress[l.id]);
          const allDone = done === chLessons.length;

          return (
            <div
              key={ch.id}
              className={`oops-chapter-card ${allDone ? "oops-chapter-done" : ""}`}
              style={{ "--ch-color": ch.color }}
            >
              <div className="oops-chapter-header">
                <span className="oops-chapter-icon">{ch.icon}</span>
                <div>
                  <div className="oops-chapter-num">Chapter {i + 1}</div>
                  <div className="oops-chapter-title">{ch.title}</div>
                </div>
                {allDone && <span className="oops-done-badge">✓ Done</span>}
              </div>

              <div className="oops-chapter-progress-track">
                <div
                  className="oops-chapter-progress-fill"
                  style={{ width: `${chPct}%` }}
                />
              </div>
              <div className="oops-chapter-meta">
                {done}/{chLessons.length} lessons · {chPct}%
              </div>

              <ul className="oops-lesson-list">
                {chLessons.map((l) => {
                  const isDone = !!progress[l.id];
                  return (
                    <li
                      key={l.id}
                      className={`oops-lesson-item ${isDone ? "done" : ""}`}
                      onClick={() => navigate(`/learn/oops-cpp/lesson/${l.id}`)}
                    >
                      <span className="oops-lesson-status">
                        {isDone ? "✓" : "○"}
                      </span>
                      <span className="oops-lesson-name">{l.title}</span>
                      <span className="oops-lesson-xp">+{l.xp} XP</span>
                    </li>
                  );
                })}
              </ul>

              <button
                className="oops-chapter-cta"
                onClick={() =>
                  navigate(
                    `/learn/oops-cpp/lesson/${firstUnfinished ? firstUnfinished.id : ch.lessons[0].id}`,
                  )
                }
              >
                {allDone
                  ? "Review Chapter →"
                  : done > 0
                    ? "Continue →"
                    : "Start →"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
