import React, { useState } from "react";
import "../polyguard.css";

function scoreTone(score) {
  const value = Number(score);
  if (Number.isNaN(value)) return "neutral";
  if (value >= 8) return "pass";
  if (value >= 5) return "review";
  return "fail";
}

function ScoreRing({ score, tone, label, small = false }) {
  const radius = small ? 30 : 46;
  const stroke = small ? 5 : 7;
  const size = (radius + stroke) * 2;
  const center = radius + stroke;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(100, Math.max(0, (Number(score) / 10) * 100));
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className={`pg-score-ring pg-tone-${tone}${small ? " is-small" : ""}`}>
      <svg
        className="pg-score-ring-svg"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
      >
        <circle
          className="pg-score-ring-track"
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={stroke}
        />
        <circle
          className="pg-score-ring-progress"
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>
      <div className="pg-score-ring-center">
        <strong>{score != null ? Number(score).toFixed(1) : "—"}</strong>
        <span>/ 10</span>
      </div>
      <span className="pg-score-ring-label">{label}</span>
    </div>
  );
}

function MetricBar({ label, value, tone = "pass" }) {
  const pct = Math.min(100, Math.max(0, Number(value) || 0));
  return (
    <div className="pg-metric-row">
      <div className="pg-metric-row-head">
        <span className="pg-metric-label">{label}</span>
        <span className={`pg-metric-value pg-tone-text-${tone}`}>
          {pct.toFixed(1)}%
        </span>
      </div>
      <div className="pg-metric-bar-track">
        <div
          className={`pg-metric-bar-fill pg-tone-fill-${tone}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function RawJsonSection({ data, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const [copied, setCopied] = useState(false);
  const json = JSON.stringify(data, null, 2);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={`pg-raw-json${open ? " is-open" : ""}`}>
      <button
        type="button"
        className="pg-raw-json-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span>RAW JSON</span>
        <span className="pg-raw-json-actions">
          <span
            role="button"
            tabIndex={0}
            className="pg-raw-json-copy"
            onClick={(event) => {
              event.stopPropagation();
              handleCopy();
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                event.stopPropagation();
                handleCopy();
              }
            }}
          >
            {copied ? "COPIED" : "COPY"}
          </span>
          <span className={`pg-raw-json-chevron${open ? " is-open" : ""}`} />
        </span>
      </button>
      {open ? <pre className="pg-raw-json-body">{json}</pre> : null}
    </div>
  );
}

function LoadingState({ compact = false }) {
  return (
    <div
      className={`pg-report pg-report-loading${compact ? " is-compact" : ""}`}
      aria-live="polite"
    >
      <div className="pg-loading-ring" />
      <p>Analyzing…</p>
    </div>
  );
}

function TipsSection({ passed, actions, headline, compact = false }) {
  const [open, setOpen] = useState(true);
  const count = passed ? 0 : actions.length;

  return (
    <div className={`pg-tips-card${compact ? " is-compact" : ""}`}>
      <button
        type="button"
        className="pg-tips-header pg-tips-header-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span className="pg-tips-header-left">
          <span className="pg-tips-icon" aria-hidden="true" />
          <span>IMPROVEMENT TIPS</span>
          {count > 0 ? <span className="pg-tips-count">{count}</span> : null}
        </span>
        <span className={`pg-tips-chevron${open ? " is-open" : ""}`} />
      </button>
      {open ? (
        passed ? (
          <div className="pg-tip-item pg-tip-item-pass">
            <span className="pg-tip-arrow" aria-hidden="true" />
            <p>No fixes needed — your code meets the lesson requirements.</p>
          </div>
        ) : actions.length > 0 ? (
          <div className="pg-tips-list">
            {actions.map((action) => (
              <div key={action} className="pg-tip-item">
                <span className="pg-tip-arrow" aria-hidden="true" />
                <p>{action}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="pg-tip-item">
            <span className="pg-tip-arrow" aria-hidden="true" />
            <p>{headline || "Review your code against the lesson objective."}</p>
          </div>
        )
      ) : null}
    </div>
  );
}

export default function PolyGuardReport({
  result,
  error = "",
  loading = false,
  compact = false,
  showRawJson = false,
}) {
  if (loading) return <LoadingState compact={compact} />;

  if (error) {
    return (
      <div className={`pg-report pg-report-error${compact ? " is-compact" : ""}`}>
        <p>{error}</p>
      </div>
    );
  }

  if (!result) return null;

  const enriched = result.enriched || {};
  const metrics = enriched.metrics || {};
  const actions = enriched.actions || [];
  const tone = scoreTone(metrics.score);
  const passed = metrics.score >= 8 && actions.length === 0;
  const securityLabel = enriched.securityLabel || "REVIEW";

  return (
    <div className={`pg-report pg-report-dashboard${compact ? " is-compact" : ""}`}>
      <div className="pg-overview-card">
        <ScoreRing
          score={metrics.score}
          tone={tone}
          label={securityLabel}
          small={compact}
        />
        <div className="pg-overview-metrics">
          <div className="pg-overview-stat">
            <span className="pg-metric-label">VERDICT</span>
            <span className={`pg-overview-stat-value pg-tone-text-${tone}`}>
              {enriched.verdict || "—"}
            </span>
          </div>
          <div className="pg-overview-stat">
            <span className="pg-metric-label">RISK LEVEL</span>
            <span className={`pg-overview-stat-value pg-tone-text-${tone}`}>
              {metrics.riskLevel || enriched.risk || "—"}
            </span>
          </div>
          {!compact ? (
            <>
              <MetricBar
                label="CLEAN CONFIDENCE"
                value={metrics.cleanConfidence ?? metrics.score * 10}
                tone="pass"
              />
              <MetricBar
                label="VULN CONFIDENCE"
                value={metrics.vulnConfidence ?? 100 - metrics.score * 10}
                tone="fail"
              />
            </>
          ) : null}
        </div>
      </div>

      <TipsSection
        passed={passed}
        actions={actions}
        headline={enriched.headline || enriched.summary}
        compact={compact}
      />

      {showRawJson ? <RawJsonSection data={result} /> : null}
    </div>
  );
}
