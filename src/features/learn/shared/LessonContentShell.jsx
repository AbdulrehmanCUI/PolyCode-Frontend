import React, { useMemo } from "react";
import LessonAnnotator from "./LessonAnnotator";
import LessonVideo from "./LessonVideo";

/**
 * Wraps theory/challenge content with optional YouTube video + markup tools.
 * storageKey should be unique per lesson (e.g. course:lessonId).
 * Pass tab ("theory" | "challenge") so notes/drawings stay on that tab only.
 */
export default function LessonContentShell({
  storageKey,
  tab,
  videoUrl,
  videoTitle,
  children,
}) {
  const annotationKey = useMemo(() => {
    const base = String(storageKey || "").trim();
    if (!base) return tab ? `tab:${tab}` : "";
    const scope = String(tab || "").trim();
    return scope ? `${base}:${scope}` : base;
  }, [storageKey, tab]);

  return (
    <div className={`oops-lesson-content${videoUrl ? " has-lesson-video" : ""}`}>
      <LessonAnnotator storageKey={annotationKey}>{children}</LessonAnnotator>
      {videoUrl ? (
        <LessonVideo url={videoUrl} title={videoTitle} placement="end" />
      ) : null}
    </div>
  );
}
