import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const resizeObserverLoopMessages = [
  "ResizeObserver loop completed with undelivered notifications.",
  "ResizeObserver loop limit exceeded",
];

function isBenignResourceError(event) {
  // Script/link load failures are ErrorEvents with an empty message. CRA's
  // overlay then prints "[object Event]" and blocks the UI even though the app
  // can recover (Monaco CDN, chunk retries, etc.).
  if (!event) return false;
  if (resizeObserverLoopMessages.includes(event.message)) return true;
  if (event.message && event.message !== "[object Event]") return false;
  const target = event.target;
  if (!target || typeof target.tagName !== "string") return false;
  const tag = target.tagName.toUpperCase();
  return tag === "SCRIPT" || tag === "LINK" || tag === "IMG";
}

window.addEventListener(
  "error",
  (event) => {
    if (isBenignResourceError(event)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      const src = event.target?.src || event.target?.href;
      if (src) {
        console.warn("Resource failed to load:", src);
      }
    }
  },
  true,
);

window.addEventListener("unhandledrejection", (event) => {
  const reason = event.reason;
  const message = reason?.message || String(reason || "");
  if (
    resizeObserverLoopMessages.includes(message) ||
    reason instanceof Event ||
    message === "[object Event]"
  ) {
    event.preventDefault();
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
