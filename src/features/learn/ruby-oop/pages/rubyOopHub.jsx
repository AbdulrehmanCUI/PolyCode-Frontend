import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  RUBY_OOP_CHAPTERS,
  RUBY_OOP_LESSONS,
  RUBY_OOP_TOTAL_XP,
} from "../data/rubyOopCurriculum";
import useRubyOopProgress from "../hooks/useRubyOopProgress";
import LearnChapterPathOverview from "../../shared/LearnChapterPathOverview";
import LearnChapterGrid from "../../shared/LearnChapterGrid";

const BASE_PATH = "/learn/ruby-oop";

function lessonPlainText(lesson) {
  return lesson.theory
    .filter((block) => block.type === "text" || block.type === "callout")
    .map((block) => block.content.replace(/\*\*/g, "").replace(/`/g, ""))
    .join(" ");
}

export default function RubyOopHub() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("beginner");
  const [filter, setFilter] = useState("all");
  const { isAuthenticated, completedMap: progress, bookmarks, lastLessonId } = useRubyOopProgress();

  const completedCount = Object.keys(progress).length;
  const earnedXP = RUBY_OOP_LESSONS.filter((lesson) => progress[lesson.id]).reduce(
    (sum, lesson) => sum + lesson.xp,
    0,
  );
  const pct = Math.round((completedCount / RUBY_OOP_LESSONS.length) * 100) || 0;
  const nextLesson = RUBY_OOP_LESSONS.find((lesson) => !progress[lesson.id]) || RUBY_OOP_LESSONS[0];
  const resumeLesson = RUBY_OOP_LESSONS.find((lesson) => lesson.id === lastLessonId) || nextLesson;
  const chaptersForStage = RUBY_OOP_CHAPTERS.filter((c) => (c.stage || "beginner") === stage);
  const completedChapters = chaptersForStage.filter((chapter) =>
    chapter.lessons.every((lesson) => progress[lesson.id]),
  ).length;
  const bookmarkedLessons = bookmarks
    .map((id) => RUBY_OOP_LESSONS.find((lesson) => lesson.id === id))
    .filter(Boolean);

  const filteredLessons = useMemo(() => {
    const query = search.trim().toLowerCase();
    return RUBY_OOP_LESSONS.filter((lesson) => {
      // only match lessons in the selected stage
      const ch = RUBY_OOP_CHAPTERS.find((c) => c.id === lesson.chapterId);
      if (((ch && (ch.stage || "beginner")) || "beginner") !== stage) return false;

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
  }, [bookmarks, filter, progress, search, stage]);

  return (
    <div className="oops-hub ruby-oop-hub">
      <div className="oops-hero ruby-oop-hero">
        <Link to="/language/Ruby" className="oops-back-btn" style={{ marginBottom: "0.75rem", display: "inline-flex" }}>
          ← Ruby courses
        </Link>
        <div className="oops-hero-badge">Ruby · OOP TRACK</div>
        <h1 className="oops-hero-title">
          Ruby
          <br />
          <span className="oops-hero-accent">Object-Oriented</span>
        </h1>
        <p className="oops-hero-sub">
          A complete Ruby OOP path from beginner classes and encapsulation to mixins,
          polymorphism, and metaprogramming. Hands-on examples and runnable challenges.
        </p>

        <div className="oops-hero-grid">
          <div className="oops-xp-bar-wrap">
            <div className="oops-xp-meta">
              <span>
                {isAuthenticated
                  ? `${completedCount}/${RUBY_OOP_LESSONS.length} lessons · ${earnedXP}/${RUBY_OOP_TOTAL_XP} XP`
                  : `Sign in to track progress · ${RUBY_OOP_LESSONS.length} lessons`}
              </span>
              <span>{isAuthenticated ? `${pct}%` : "—"}</span>
            </div>
            <div className="oops-xp-track">
              <div className="oops-xp-fill" style={{ width: isAuthenticated ? `${pct}%` : "0%" }} />
            </div>
          </div>

          {!isAuthenticated && (
            <div className="oops-auth-gate oops-auth-gate-hub">
              <p>
                Create a free account to run Ruby challenges, earn XP, and save your place in the course.
              </p>
              <div className="oops-auth-gate-actions">
                <Link to="/login" className="oops-auth-gate-btn">Sign in</Link>
                <Link to="/signup" className="oops-auth-gate-btn oops-auth-gate-btn-primary">Sign up</Link>
              </div>
            </div>
          )}

          <div className="oops-resume-panel">
            <span className="oops-sync-pill">
              {isAuthenticated ? "Progress saved to your account" : "Browse lessons — sign in to save progress"}
            </span>
            <h2>{resumeLesson.title}</h2>
            <p>{resumeLesson.chapterTitle} · {resumeLesson.xp} XP</p>
            <button type="button" onClick={() => navigate(`${BASE_PATH}/lesson/${resumeLesson.id}`)}>
              {completedCount > 0 ? "Resume OOP" : "Start OOP"}
            </button>
          </div>
        </div>
      </div>

      <div className="oops-stage-tabs" style={{ padding: "0 1.5rem", marginTop: "0.5rem" }}>
        {[["beginner","Beginner"],["intermediate","Intermediate"],["advanced","Advanced"]].map(([id,label])=> (
          <button key={id} type="button" className={stage===id?"active stage-tab":"stage-tab"} onClick={()=>setStage(id)} style={{ marginRight: 8 }}>
            {label}
          </button>
        ))}
      </div>

      <div className="oops-guide-tools">
        <div className="oops-tool-panel oops-tool-panel-main">
          <span className="oops-interactive-label">Find an OOP topic</span>
          <div className="oops-search-row">
            <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search classes, mixins, metaprogramming..." aria-label="Search Ruby OOP lessons" />
            <div className="oops-filter-tabs" aria-label="Filter Ruby OOP lessons">
              {[ ["all", "All"], ["todo", "To do"], ["done", "Done"], ["bookmarked", "Saved"] ].map(([value, label]) => (
                <button key={value} type="button" className={filter === value ? "active" : ""} onClick={() => setFilter(value)}>{label}</button>
              ))}
            </div>
          </div>
          <div className="oops-search-results">
            {filteredLessons.slice(0, 6).map((lesson) => (
              <button key={lesson.id} type="button" className="oops-search-result" onClick={() => navigate(`${BASE_PATH}/lesson/${lesson.id}`)}>
                <span>{progress[lesson.id] ? "✓" : "○"}</span>
                <strong>{lesson.title}</strong>
                <small>{lesson.chapterTitle}</small>
              </button>
            ))}
            {filteredLessons.length === 0 && <p className="oops-empty-copy">No lessons match that search.</p>}
          </div>
        </div>

        <div className="oops-tool-panel">
          <span className="oops-interactive-label">Recommended</span>
          <h2>{nextLesson.title}</h2>
          <p>Next in {nextLesson.chapterTitle}. Earn {nextLesson.xp} XP.</p>
          <button type="button" onClick={() => navigate(`${BASE_PATH}/lesson/${nextLesson.id}`)}>Open next lesson</button>
        </div>

        <div className="oops-tool-panel">
          <span className="oops-interactive-label">Bookmarks</span>
          {bookmarkedLessons.length > 0 ? (
            <div className="oops-bookmark-list">
              {bookmarkedLessons.slice(0, 3).map((lesson) => (
                <button key={lesson.id} type="button" onClick={() => navigate(`${BASE_PATH}/lesson/${lesson.id}`)}>
                  <strong>{lesson.title}</strong>
                  <small>{lesson.chapterTitle}</small>
                </button>
              ))}
            </div>
          ) : (
            <p>Bookmark lessons to review them here.</p>
          )}
        </div>
      </div>

      <div className="oops-dashboard-strip">
        <div className="oops-stat-tile"><span>Lessons</span><strong>{completedCount}/{RUBY_OOP_LESSONS.length}</strong></div>
        <div className="oops-stat-tile"><span>Chapters</span><strong>{completedChapters}/{RUBY_OOP_CHAPTERS.length}</strong></div>
        <div className="oops-stat-tile"><span>XP</span><strong>{earnedXP}/{RUBY_OOP_TOTAL_XP}</strong></div>
        <div className="oops-stat-tile"><span>Bookmarks</span><strong>{bookmarks.length}</strong></div>
      </div>

      <LearnChapterPathOverview chapters={chaptersForStage} progress={progress} onChapterSelect={(chapter) => navigate(`${BASE_PATH}/lesson/${chapter.lessons[0].id}`)} />

      <LearnChapterGrid chapters={chaptersForStage} progress={progress} basePath={BASE_PATH} navigate={navigate} />
    </div>
  );
}
