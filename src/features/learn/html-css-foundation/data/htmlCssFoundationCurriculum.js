// PolyCode — HTML & CSS Foundation course

import {
  quiz,
  callout,
  text,
  diagram,
  table,
  objectives,
} from "../../js-fundamentals/data/jsCurriculumHelpers";

const ACCENT = "#0ea5e9";
const CSS_ACCENT = "#22c55e";

/** Lightweight Bootstrap-like styles for local previews (no CDN / no cross-origin). */
const BOOTSTRAP_PREVIEW_CSS = `/* polycode-bootstrap-preview */
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; color: #212529; background: #fff; }
  .p-3 { padding: 1rem !important; }
  .p-4 { padding: 1.5rem !important; }
  .mb-4 { margin-bottom: 1.5rem !important; }
  .g-3 { --bs-gutter-x: 1rem; --bs-gutter-y: 1rem; }
  .text-center { text-align: center !important; }
  .border { border: 1px solid #dee2e6 !important; }
  .rounded { border-radius: 0.375rem !important; }
  .bg-light { background-color: #f8f9fa !important; }
  .container { width: 100%; max-width: 960px; margin-left: auto; margin-right: auto; padding-left: 12px; padding-right: 12px; }
  .row { display: flex; flex-wrap: wrap; margin-left: -12px; margin-right: -12px; }
  .row > * { padding-left: 12px; padding-right: 12px; }
  .col-md-6 { flex: 0 0 auto; width: 100%; }
  @media (min-width: 768px) { .col-md-6 { width: 50%; } }
  .btn { display: inline-block; font-weight: 500; line-height: 1.5; text-align: center; text-decoration: none; vertical-align: middle; cursor: pointer; border: 1px solid transparent; padding: 0.375rem 0.75rem; font-size: 1rem; border-radius: 0.375rem; }
  .btn-primary { color: #fff; background-color: #0d6efd; border-color: #0d6efd; }
  .btn-primary:hover { background-color: #0b5ed7; border-color: #0a58ca; }
  .card { position: relative; display: flex; flex-direction: column; min-width: 0; word-wrap: break-word; background-color: #fff; background-clip: border-box; border: 1px solid rgba(0,0,0,.125); border-radius: 0.375rem; }
  .card-body { flex: 1 1 auto; padding: 1rem; }
  .card-title { margin-bottom: 0.5rem; font-size: 1.25rem; font-weight: 500; }
  .card-text { margin-top: 0; margin-bottom: 0; }
`;

function withBootstrapPreviewStyles(html) {
  const styleTag = `<style id="polycode-bootstrap-preview">${BOOTSTRAP_PREVIEW_CSS}</style>`;
  if (/<\/head>/i.test(html)) {
    return html.replace(/<\/head>/i, `${styleTag}</head>`);
  }
  return `<!DOCTYPE html><html><head>${styleTag}</head><body>${html}</body></html>`;
}

const LESSON_HTML_0 = {
  id: "html-0",
  title: "HTML structure & semantic tags",
  xp: 10,
  chapterTitle: "HTML Basics",
  chapterColor: ACCENT,
  theory: [
    objectives([
      "Explain the role of HTML in a webpage",
      "Use semantic tags like <header>, <main>, and <footer>",
      "Write a simple HTML page structure with DOCTYPE and head",
    ]),
    text(
      "HTML is the skeleton of a website. It defines the headings, paragraphs, sections, and navigation that browsers display and search engines understand.",
      {
        lang: "html",
        label: "Basic page structure",
        content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>HTML & CSS Foundation</title>
  </head>
  <body>
    <header>
      <h1>Welcome to PolyCode</h1>
    </header>
    <main>
      <p>Learn HTML, CSS, and Bootstrap in a compact course.</p>
    </main>
    <footer>© 2026 PolyCode</footer>
  </body>
</html>`,
      },
    ),
    text(
      "Semantic tags help screen readers and search engines. Use `<header>` for page introductions, `<main>` for core content, and `<footer>` for contact or copyright details.",
    ),
    diagram("Semantic HTML structure", [
      {
        id: "header",
        label: "header",
        color: ACCENT,
        items: ["Brand", "Title", "Navigation"],
      },
      {
        id: "main",
        label: "main",
        color: "#3b82f6",
        items: ["Primary content", "Articles", "Forms"],
      },
      {
        id: "footer",
        label: "footer",
        color: "#22c55e",
        items: ["Links", "Copyright", "Contact"],
      },
    ]),
    callout(
      "tip",
      'Always include `<!DOCTYPE html>` and `<meta charset="UTF-8">` to ensure consistent browser rendering and correct text encoding.',
    ),
    quiz(
      "Which HTML element is best for the main content of a page?",
      ["<div>", "<main>", "<span>", "<section>"],
      1,
      "`<main>` identifies the page's primary content area, which benefits accessibility and structure.",
    ),
  ],
  challenge: {
    id: "html-0-challenge",
    language: "html",
    title: "Build a basic page shell",
    description:
      "Write a complete HTML page with `<!DOCTYPE html>`, `<html>`, `<head>` (with a title), and a `<body>` that includes `<header>`, `<main>`, and `<footer>`.",
    starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <!-- Add a title -->
  </head>
  <body>
    <!-- Add header, main, and footer -->
  </body>
</html>
`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>HTML & CSS Foundation</title>
  </head>
  <body>
    <header>
      <h1>Welcome</h1>
    </header>
    <main>
      <p>My first HTML page.</p>
    </main>
    <footer>© 2026 PolyCode</footer>
  </body>
</html>
`,
    tests: [
      {
        id: 1,
        label: "Includes DOCTYPE declaration",
        keywords: [{ pattern: "<!DOCTYPE\\s+html>", flags: "i" }],
        hint: "Start the file with <!DOCTYPE html>",
      },
      {
        id: 2,
        label: "Has a <title> in the head",
        keywords: [{ pattern: "<title>[^<]+</title>", flags: "i" }],
        hint: "Put a <title>...</title> inside <head>",
      },
      {
        id: 3,
        label: "Uses header, main, and footer",
        keywords: [
          { pattern: "<header[\\s>]", flags: "i" },
          { pattern: "<main[\\s>]", flags: "i" },
          { pattern: "<footer[\\s>]", flags: "i" },
        ],
        hint: "Add <header>, <main>, and <footer> inside <body>",
      },
    ],
  },
};

const LESSON_HTML_1 = {
  id: "html-1",
  title: "Text, links, lists, and images",
  xp: 10,
  chapterTitle: "HTML Basics",
  chapterColor: ACCENT,
  theory: [
    objectives([
      "Use headings, paragraphs, and links correctly",
      "Create ordered and unordered lists",
      "Add images with alt text for accessibility",
    ]),
    text(
      "Headings (`<h1>` through `<h6>`) create a content outline. Paragraphs (`<p>`) hold text. Use links (`<a>`) for navigation and images (`<img>`) with descriptive `alt` text.",
      {
        lang: "html",
        label: "Common HTML elements",
        content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Common HTML Elements</title>
  </head>
  <body>
    <h2>Section title</h2>
    <p>Write readable paragraphs, not one long block of text.</p>
    <a href="https://polycode.example">Visit PolyCode</a>
    <ul>
      <li>First item</li>
      <li>Second item</li>
    </ul>
    <img src="https://placehold.co/150x80" alt="PolyCode logo" />
  </body>
</html>`,
      },
    ),
    table(
      "When to use each element",
      ["Element", "Use for", "Example"],
      [
        ["<h1>-<h6>", "Section headings", "Page title and subtitles"],
        ["<p>", "Paragraph text", "Intro copy and descriptions"],
        ["<a>", "Links", "Navigation and references"],
      ],
    ),
    callout(
      "info",
      "Always use `alt` on images. Screen readers read alt text, so describe what the image conveys.",
    ),
    quiz(
      "Which element should wrap a website navigation link?",
      ["<img>", "<ul>", "<a>", "<header>"],
      2,
      "`<a>` is the anchor element that creates a clickable hyperlink.",
    ),
  ],
  challenge: {
    id: "html-1-challenge",
    language: "html",
    title: "Build a fruit list page",
    description:
      "Create a page with a heading, an unordered list of Apple, Banana, and Cherry, a link, and an image that has alt text.",
    starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Fruit List</title>
  </head>
  <body>
    <!-- Add h2, ul with 3 li items, an a link, and an img with alt -->
  </body>
</html>
`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Fruit List</title>
  </head>
  <body>
    <h2>Favorite fruits</h2>
    <ul>
      <li>Apple</li>
      <li>Banana</li>
      <li>Cherry</li>
    </ul>
    <a href="https://polycode.example">Visit PolyCode</a>
    <img src="https://placehold.co/150x80" alt="PolyCode logo" />
  </body>
</html>
`,
    tests: [
      {
        id: 1,
        label: "Uses an unordered list",
        keywords: [{ pattern: "<ul[\\s>]", flags: "i" }],
        hint: "Add a <ul>...</ul> list",
      },
      {
        id: 2,
        label: "Includes Apple, Banana, and Cherry items",
        keywords: [
          { pattern: "<li>\\s*Apple\\s*</li>", flags: "i" },
          { pattern: "<li>\\s*Banana\\s*</li>", flags: "i" },
          { pattern: "<li>\\s*Cherry\\s*</li>", flags: "i" },
        ],
        hint: "Add three <li> items: Apple, Banana, Cherry",
      },
      {
        id: 3,
        label: "Includes a link and image with alt",
        keywords: [
          { pattern: "<a\\s+[^>]*href=", flags: "i" },
          { pattern: "<img\\s+[^>]*alt=", flags: "i" },
        ],
        hint: "Add an <a href=\"...\"> and an <img ... alt=\"...\">",
      },
    ],
  },
};

const LESSON_HTML_2 = {
  id: "html-2",
  title: "Selectors, box model, and layout",
  xp: 10,
  chapterTitle: "CSS & Bootstrap",
  chapterColor: CSS_ACCENT,
  theory: [
    objectives([
      "Use selectors to target elements with id, class, and tag names",
      "Explain how margin, border, padding, and content work together",
      "Build a layout with display and width rules",
    ]),
    text(
      "CSS styles HTML by selecting elements and assigning visual rules. The most common selectors are id (`#main`), class (`.card`), and tag (`button`).",
      {
        lang: "html",
        label: "CSS selector examples",
        content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>CSS Selector Example</title>
    <style>
      #hero { padding: 2rem; background: #eef2ff; border-radius: 16px; }
      .card { border: 1px solid #ccc; padding: 1rem; border-radius: 12px; background: #ffffff; }
      h1 { font-size: 2rem; margin: 0 0 0.5rem; }
    </style>
  </head>
  <body>
    <section id="hero">
      <h1>Hero section</h1>
      <p>Use id selectors like <code>#hero</code> to style this block.</p>
    </section>
    <div class="card">
      <h2>Card title</h2>
      <p>This card uses <code>.card</code> styling for borders and spacing.</p>
    </div>
  </body>
</html>`,
      },
    ),
    text(
      "The CSS box model controls how space is calculated. `margin` sits outside the element, `border` wraps the element, `padding` sits inside, and the `width`/`height` control the content area.",
      {
        lang: "html",
        label: "Box model anatomy",
        content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Box Model Anatomy</title>
    <style>
      .box {
        margin: 16px;
        border: 2px solid #333;
        padding: 12px;
        width: 320px;
        background: #f8fafc;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <h2>Box model example</h2>
      <p>Margin puts space outside this element. Padding adds space inside its border.</p>
    </div>
  </body>
</html>`,
      },
    ),
    diagram("CSS box model", [
      {
        id: "margin",
        label: "margin",
        color: "#f59e0b",
        items: ["Space outside the element"],
      },
      {
        id: "border",
        label: "border",
        color: "#0ea5e9",
        items: ["Visible edge around content"],
      },
      {
        id: "padding",
        label: "padding",
        color: "#22c55e",
        items: ["Space inside border"],
      },
      {
        id: "content",
        label: "content",
        color: "#7c3aed",
        items: ["Text, image, or layout"],
      },
    ]),
    callout(
      "tip",
      "Use classes for shared styles and ids only for unique page elements like navigation or hero sections.",
    ),
    quiz(
      "Which CSS property adds space inside an element's border?",
      ["margin", "padding", "display", "position"],
      1,
      "`padding` adds space between the border and the element's content.",
    ),
  ],
  challenge: {
    id: "html-2-challenge",
    language: "css",
    title: "Style a .card rule",
    description:
      "Write CSS for a `.card` class with `padding: 16px;` and `border-radius: 8px;`. The preview page already has a `.card` element so you can see your styles applied.",
    starterCode: `/* Style the .card class */
.card {
  /* padding and border-radius go here */
}
`,
    solutionCode: `.card {
  padding: 16px;
  border-radius: 8px;
}
`,
    tests: [
      {
        id: 1,
        label: "Defines a .card selector",
        keywords: [{ pattern: "\\.card\\s*\\{" }],
        hint: "Add a .card { ... } rule",
      },
      {
        id: 2,
        label: "Sets padding: 16px",
        keywords: [{ pattern: "padding:\\s*16px", flags: "i" }],
        hint: "Inside .card, set padding: 16px;",
      },
      {
        id: 3,
        label: "Sets border-radius: 8px",
        keywords: [{ pattern: "border-radius:\\s*8px", flags: "i" }],
        hint: "Inside .card, set border-radius: 8px;",
      },
    ],
  },
};

const LESSON_HTML_3 = {
  id: "html-3",
  title: "Color, typography, and responsive design",
  xp: 10,
  chapterTitle: "CSS & Bootstrap",
  chapterColor: CSS_ACCENT,
  theory: [
    objectives([
      "Use color and font rules to improve readability",
      "Apply responsive width and max-width for different screens",
      "Understand mobile-first design with CSS breakpoints",
    ]),
    text(
      "Good typography starts with readable line height and font sizes. Color contrast, spacing, and responsive widths make pages easy to scan on any device.",
      {
        lang: "html",
        label: "Typography example",
        content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Typography Example</title>
    <style>
      body {
        font-family: Inter, sans-serif;
        line-height: 1.6;
        color: #111;
        margin: 0;
        padding: 2rem;
        background: #f8fafc;
      }
      h1 {
        font-size: 2rem;
        margin-bottom: 0.5rem;
      }
      p { max-width: 720px; }
    </style>
  </head>
  <body>
    <h1>Readable typography</h1>
    <p>Use font family, line height, and color contrast to make text easy to scan across devices.</p>
  </body>
</html>`,
      },
    ),
    text(
      "Responsive design means the page adapts to different screen sizes. Use max-width and percentage-based widths so content remains comfortable on mobile and desktop.",
      {
        lang: "html",
        label: "Responsive container",
        content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Responsive Container</title>
    <style>
      .container {
        width: 100%;
        max-width: 960px;
        margin: 0 auto;
        display: grid;
        gap: 1rem;
      }
      .panel {
        background: white;
        border: 1px solid #d1d5db;
        border-radius: 14px;
        padding: 1rem;
      }
    </style>
  </head>
  <body style="background: #f1f5f9; margin: 0; padding: 2rem;">
    <div class="container">
      <div class="panel"><h2>Panel 1</h2><p>Responsive panels shrink and grow with the viewport.</p></div>
      <div class="panel"><h2>Panel 2</h2><p>This layout demonstrates container and card spacing on any screen.</p></div>
    </div>
  </body>
</html>`,
      },
    ),
    callout(
      "info",
      "A mobile-first layout starts with the smallest screen rules, then adds wider screen adjustments using `@media (min-width: ...)`.",
    ),
    quiz(
      "What CSS property keeps an element from becoming wider than its container?",
      ["min-width", "max-width", "width", "height"],
      1,
      "`max-width` caps the element's width while allowing it to shrink below that value.",
    ),
  ],
  challenge: {
    id: "html-3-challenge",
    language: "css",
    title: "Build a responsive .container rule",
    description:
      "Style `.container` with `width: 100%;`, `max-width: 960px;`, and `margin: 0 auto;` so the preview container stays centered and responsive.",
    starterCode: `/* Make .container responsive and centered */
.container {
  /* width, max-width, margin */
}
`,
    solutionCode: `.container {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
}
`,
    tests: [
      {
        id: 1,
        label: "Defines a .container selector",
        keywords: [{ pattern: "\\.container\\s*\\{" }],
        hint: "Add a .container { ... } rule",
      },
      {
        id: 2,
        label: "Sets width: 100%",
        keywords: [{ pattern: "width:\\s*100%", flags: "i" }],
        hint: "Set width: 100%;",
      },
      {
        id: 3,
        label: "Sets max-width and centered margin",
        keywords: [
          { pattern: "max-width:\\s*960px", flags: "i" },
          { pattern: "margin:\\s*0\\s+auto", flags: "i" },
        ],
        hint: "Set max-width: 960px; and margin: 0 auto;",
      },
    ],
  },
};

const LESSON_HTML_4 = {
  id: "html-4",
  title: "Bootstrap quickstart and utility classes",
  xp: 10,
  chapterTitle: "CSS & Bootstrap",
  chapterColor: CSS_ACCENT,
  theory: [
    objectives([
      "Describe how Bootstrap uses classes for layout and components",
      "Write HTML that uses Bootstrap's grid and button utilities",
      "Use helper classes for spacing and responsive design",
    ]),
    text(
      "Bootstrap is a CSS framework that uses ready-made utility classes for spacing, layout, and components. It helps you build polished pages quickly without writing every rule from scratch.",
      {
        lang: "html",
        label: "Bootstrap button example",
        content: withBootstrapPreviewStyles(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Button Example</title>
  </head>
  <body class="p-4">
    <button class="btn btn-primary">Get started</button>
  </body>
</html>`),
      },
    ),
    text(
      "The Bootstrap grid uses containers, rows, and columns. A common pattern is `row` with children like `col-md-6`, which creates two columns on medium screens and above.",
      {
        lang: "html",
        label: "Bootstrap grid skeleton",
        content: withBootstrapPreviewStyles(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Grid Skeleton</title>
  </head>
  <body class="p-4">
    <div class="container">
      <div class="row g-3">
        <div class="col-md-6">
          <div class="p-3 border rounded bg-light">Left column</div>
        </div>
        <div class="col-md-6">
          <div class="p-3 border rounded bg-light">Right column</div>
        </div>
      </div>
    </div>
  </body>
</html>`),
      },
    ),
    table(
      "Helpful Bootstrap utilities",
      ["Class", "Purpose", "Example"],
      [
        [".mb-4", "Add bottom margin", "Spacing between sections"],
        [".text-center", "Center text", "Hero headings"],
        [".d-flex", "Enable flex layout", "Align card items"],
      ],
    ),
    callout(
      "tip",
      "Bootstrap utilities are great for prototypes. For production, combine them with custom CSS to keep your design unique.",
    ),
    quiz(
      "Which Bootstrap class makes an element full-width on small screens and half-width on medium screens?",
      ["col-6", "col-sm-12 col-md-6", "row", "container"],
      1,
      "`col-sm-12 col-md-6` gives a full-width column on small devices and half-width on medium and larger screens.",
    ),
  ],
  challenge: {
    id: "html-4-challenge",
    language: "html",
    title: "Build a Bootstrap card",
    description:
      "Complete a Bootstrap-style card using classes `card`, `card-body`, `card-title`, and `card-text`. Keep the included preview stylesheet so the live preview stays styled.",
    starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Card</title>
    <style>
${BOOTSTRAP_PREVIEW_CSS}
    </style>
  </head>
  <body class="p-4">
    <!-- Build a Bootstrap card with title Hello and body text -->
  </body>
</html>
`,
    solutionCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Card</title>
    <style>
${BOOTSTRAP_PREVIEW_CSS}
    </style>
  </head>
  <body class="p-4">
    <div class="card" style="max-width: 28rem;">
      <div class="card-body">
        <h5 class="card-title">Hello</h5>
        <p class="card-text">This is a card.</p>
      </div>
    </div>
  </body>
</html>
`,
    tests: [
      {
        id: 1,
        label: "Keeps the Bootstrap preview stylesheet",
        keywords: [
          {
            pattern: "polycode-bootstrap-preview",
            flags: "i",
          },
        ],
        hint: "Keep the <style> block in <head> so classes render",
      },
      {
        id: 2,
        label: "Uses Bootstrap card classes",
        keywords: [
          { pattern: "class=\"[^\"]*card[^\"]*\"", flags: "i" },
          { pattern: "card-body", flags: "i" },
          { pattern: "card-title", flags: "i" },
          { pattern: "card-text", flags: "i" },
        ],
        hint: "Use card, card-body, card-title, and card-text classes",
      },
      {
        id: 3,
        label: "Shows Hello title and card body text",
        keywords: [
          { pattern: "card-title[^>]*>\\s*Hello\\s*<", flags: "i" },
          { pattern: "card-text[^>]*>\\s*This is a card\\.\\s*<", flags: "i" },
        ],
        hint: 'Put "Hello" in card-title and "This is a card." in card-text',
      },
    ],
  },
};

export const HTML_CSS_FOUNDATION_CHAPTERS = [
  {
    id: "html-basics",
    title: "HTML Basics",
    icon: "file-text",
    color: ACCENT,
    lessons: [LESSON_HTML_0, LESSON_HTML_1],
  },
  {
    id: "css-bootstrap",
    title: "CSS & Bootstrap",
    icon: "layers",
    color: CSS_ACCENT,
    lessons: [LESSON_HTML_2, LESSON_HTML_3, LESSON_HTML_4],
  },
];

export const HTML_CSS_FOUNDATION_LESSONS = HTML_CSS_FOUNDATION_CHAPTERS.flatMap(
  (chapter) => chapter.lessons,
);

export const HTML_CSS_FOUNDATION_TOTAL_XP = HTML_CSS_FOUNDATION_LESSONS.reduce(
  (sum, lesson) => sum + lesson.xp,
  0,
);

export function getHtmlCssFoundationLessons() {
  return HTML_CSS_FOUNDATION_LESSONS;
}
