import React from "react";
import { buildLessonTopicOverview } from "./lessonTopicOverviewUtils";
import { THEME_OVERVIEW_ACCENT } from "./learnAccent";

function InlineText({ text, codeClassName = "numpy-inline-code" }) {
  const parts = String(text ?? "").split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={index} className={codeClassName}>
              {part.slice(1, -1)}
            </code>
          );
        }
        return part;
      })}
    </>
  );
}

function W3ReferenceTable({ rows, codeClass }) {
  if (!rows?.length) return null;
  return (
    <div className="lesson-topic-w3-reference">
      <h3 className="lesson-topic-w3-section-title">Reference</h3>
      <table className="lesson-topic-w3-table">
        <thead>
          <tr>
            <th>Term / Command</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.term}>
              <td>
                <code className={codeClass}>{row.term}</code>
              </td>
              <td>
                <InlineText text={row.description} codeClassName={codeClass} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function W3StyleOverview({ overview, codeClass }) {
  return (
    <section
      className="lesson-topic-overview lesson-topic-overview--w3"
      style={{ "--lesson-overview-accent": THEME_OVERVIEW_ACCENT }}
      aria-labelledby="lesson-topic-overview-heading"
    >
      <header className="lesson-topic-w3-header">
        <div>
          {overview.chapterTitle ? (
            <span className="lesson-topic-w3-chapter">{overview.chapterTitle}</span>
          ) : null}
          <h2 id="lesson-topic-overview-heading" className="lesson-topic-w3-title">
            {overview.title}
          </h2>
        </div>
        {overview.xp ? (
          <span className="lesson-topic-w3-xp">{overview.xp} XP</span>
        ) : null}
      </header>

      {overview.definition ? (
        <div className="lesson-topic-w3-block">
          <h3 className="lesson-topic-w3-section-title">Definition</h3>
          <p className="lesson-topic-w3-definition">
            <InlineText text={overview.definition} codeClassName={codeClass} />
          </p>
        </div>
      ) : null}

      {overview.syntax ? (
        <div className="lesson-topic-w3-block">
          <h3 className="lesson-topic-w3-section-title">
            {overview.syntaxLabel || "Syntax"}
          </h3>
          <pre className="lesson-topic-w3-syntax">
            <code>{overview.syntax}</code>
          </pre>
          {overview.cliExample && overview.cliExample !== overview.syntax ? (
            <p className="lesson-topic-w3-cli">
              <span className="lesson-topic-w3-cli-label">Example</span>
              <code className={codeClass}>{overview.cliExample}</code>
            </p>
          ) : null}
          {overview.exampleNote ? (
            <p className="lesson-topic-w3-example-note">
              <InlineText text={overview.exampleNote} codeClassName={codeClass} />
            </p>
          ) : null}
        </div>
      ) : null}

      {overview.essentials?.length > 0 ? (
        <div className="lesson-topic-w3-block">
          <h3 className="lesson-topic-w3-section-title">Key points</h3>
          <ul className="lesson-topic-w3-list">
            {overview.essentials.map((item) => (
              <li key={item}>
                <InlineText text={item} codeClassName={codeClass} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <W3ReferenceTable rows={overview.reference} codeClass={codeClass} />

      {overview.note ? (
        <aside className="lesson-topic-w3-note" role="note">
          <strong>Note:</strong>{" "}
          <InlineText text={overview.note} codeClassName={codeClass} />
        </aside>
      ) : null}

      {overview.tip ? (
        <aside className="lesson-topic-w3-tip" role="note">
          <strong>Tip:</strong>{" "}
          <InlineText text={overview.tip} codeClassName={codeClass} />
        </aside>
      ) : null}

      {overview.practiceTitle ? (
        <p className="lesson-topic-w3-practice">
          <strong>Try it yourself →</strong>{" "}
          <InlineText text={overview.practiceTitle} codeClassName={codeClass} />
        </p>
      ) : null}
    </section>
  );
}

/**
 * Top-of-lesson overview — W3Schools-style reference when lesson.topicOverview.style === "w3".
 */
export default function LessonTopicOverview({ lesson, accentColor, variant = "numpy" }) {
  if (!lesson) return null;

  const built = buildLessonTopicOverview(lesson);
  const custom = lesson.topicOverview || {};
  const codeClass =
    variant === "oops" ? "oops-inline-code" : "numpy-inline-code";

  const overview = {
    ...built,
    ...custom,
    title: lesson.title || built.title,
    chapterTitle: lesson.chapterTitle || built.chapterTitle,
    practiceTitle: custom.practiceTitle || lesson.challenge?.title || built.practiceTitle,
    xp: lesson.xp || built.xp,
    essentials: custom.essentials?.length ? custom.essentials : built.essentials,
  };

  if (custom.style === "w3" || custom.definition) {
    return (
      <W3StyleOverview overview={overview} codeClass={codeClass} />
    );
  }

  return (
    <section
      className={`lesson-topic-overview lesson-topic-overview--${variant}`}
      style={{ "--lesson-overview-accent": accentColor }}
      aria-labelledby="lesson-topic-overview-heading"
    >
      <div className="lesson-topic-overview-head">
        <div className="lesson-topic-overview-meta">
          <span className="lesson-topic-overview-eyebrow">Topic overview</span>
          {overview.chapterTitle ? (
            <span className="lesson-topic-overview-chapter">{overview.chapterTitle}</span>
          ) : null}
        </div>
        {overview.xp ? (
          <span className="lesson-topic-overview-xp">{overview.xp} XP</span>
        ) : null}
      </div>

      <h2 id="lesson-topic-overview-heading" className="lesson-topic-overview-title">
        {overview.title}
      </h2>

      <p className="lesson-topic-overview-summary">
        <InlineText text={overview.summary} codeClassName={codeClass} />
      </p>

      {overview.essentials.length > 0 ? (
        <div className="lesson-topic-overview-essentials">
          <h3 className="lesson-topic-overview-essentials-title">Essential information</h3>
          <ul className="lesson-topic-overview-essentials-list">
            {overview.essentials.map((item) => (
              <li key={item}>
                <InlineText text={item} codeClassName={codeClass} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {overview.practiceTitle ? (
        <p className="lesson-topic-overview-practice">
          <strong>Practice:</strong>{" "}
          <InlineText text={overview.practiceTitle} codeClassName={codeClass} />
        </p>
      ) : null}
    </section>
  );
}
