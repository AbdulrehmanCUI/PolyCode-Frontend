import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CHAPTERS, TOTAL_XP, ALL_LESSONS } from "../data/oopsCurriculum";
import useOopsProgress from "../hooks/useOopsProgress";

function lessonPlainText(lesson) {
  return lesson.theory
    .filter((block) => block.type === "text" || block.type === "callout")
    .map((block) => block.content.replace(/\*\*/g, "").replace(/`/g, ""))
    .join(" ");
}

export default function OopsHub() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
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
  const bookmarkedLessons = bookmarks
    .map((id) => ALL_LESSONS.find((lesson) => lesson.id === id))
    .filter(Boolean);
  const filteredLessons = useMemo(() => {
    const query = search.trim().toLowerCase();

    return ALL_LESSONS.filter((lesson) => {
      const matchesQuery =
        !query ||
        lesson.title.toLowerCase().includes(query) ||
        lesson.chapterTitle.toLowerCase().includes(query) ||
        lessonPlainText(lesson).toLowerCase().includes(query);
      const matchesFilter =
        filter === "all" ||
        (filter === "todo" && !progress[lesson.id]) ||
        (filter === "done" && progress[lesson.id]) ||
        (filter === "bookmarked" && bookmarks.includes(lesson.id));

      return matchesQuery && matchesFilter;
    });
  }, [bookmarks, filter, progress, search]);
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

      <div className="oops-guide-tools">
        <div className="oops-tool-panel oops-tool-panel-main">
          <span className="oops-interactive-label">Find a concept</span>
          <div className="oops-search-row">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search constructors, inheritance, virtual..."
              aria-label="Search OOP lessons"
            />
            <div className="oops-filter-tabs" aria-label="Filter lessons">
              {[
                ["all", "All"],
                ["todo", "To do"],
                ["done", "Done"],
                ["bookmarked", "Saved"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  className={filter === value ? "active" : ""}
                  onClick={() => setFilter(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="oops-search-results">
            {filteredLessons.slice(0, 6).map((lesson) => (
              <button
                key={lesson.id}
                type="button"
                className="oops-search-result"
                style={{ "--ch-color": lesson.chapterColor }}
                onClick={() => navigate(`/learn/oops-cpp/lesson/${lesson.id}`)}
              >
                <span>{progress[lesson.id] ? "✓" : "○"}</span>
                <strong>{lesson.title}</strong>
                <small>{lesson.chapterTitle}</small>
              </button>
            ))}
            {filteredLessons.length === 0 && (
              <p className="oops-empty-copy">No lessons match that search yet.</p>
            )}
          </div>
        </div>

        <div className="oops-tool-panel">
          <span className="oops-interactive-label">Recommended</span>
          <h2>{nextLesson.title}</h2>
          <p>
            Next up in {nextLesson.chapterTitle}. Finish it to earn{" "}
            {nextLesson.xp} XP and keep your path moving.
          </p>
          <button
            type="button"
            onClick={() => navigate(`/learn/oops-cpp/lesson/${nextLesson.id}`)}
          >
            Open next lesson
          </button>
        </div>

        <div className="oops-tool-panel">
          <span className="oops-interactive-label">Bookmarks</span>
          {bookmarkedLessons.length > 0 ? (
            <div className="oops-bookmark-list">
              {bookmarkedLessons.slice(0, 3).map((lesson) => (
                <button
                  key={lesson.id}
                  type="button"
                  onClick={() =>
                    navigate(`/learn/oops-cpp/lesson/${lesson.id}`)
                  }
                >
                  <strong>{lesson.title}</strong>
                  <small>{lesson.chapterTitle}</small>
                </button>
              ))}
            </div>
          ) : (
            <p>Bookmark hard lessons and they will show up here for review.</p>
          )}
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
