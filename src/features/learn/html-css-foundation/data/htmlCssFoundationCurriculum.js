// PolyCode — HTML & CSS Foundation course

import { quiz, callout, text, table, objectives } from "../../js-fundamentals/data/jsCurriculumHelpers";

const ACCENT = "#0ea5e9";

export const HTML_CSS_FOUNDATION_CHAPTERS = [
  {
    id: "html-basics",
    title: "HTML Basics",
    icon: "file-text",
    color: ACCENT,
    lessons: [
      { id: "html-0", title: "HTML basics, text, links, images" },
      { id: "html-1", title: "Tables, lists, layouts, semantic HTML, multimedia" },
      { id: "html-5", title: "Forms, input types, graphics, APIs, modern HTML" },
    ],
  },
  ...buildCssFoundationCurriculum().chapters,
];

export const HTML_CSS_FOUNDATION_LESSONS = [
  {
    id: "html-0",
    title: "HTML basics, text, links, images",
    xp: 10,
    chapterTitle: "HTML Basics",
    chapterColor: ACCENT,
    theory: [
      objectives([
        "1.1 Introduction to HTML: explain the role of HTML in web pages",
        "1.2 Basic HTML Elements: use headings, paragraphs, and links correctly",
        "1.3 Text Formatting: apply semantic formatting tags for readable content",
        "1.4 Images: add accessible images with meaningful alt text",
      ]),
      text(
        "1.1 Introduction to HTML: HTML (HyperText Markup Language) gives structure to a webpage. Browsers read HTML tags to render titles, paragraphs, links, and images in a meaningful order.",
        {
          lang: "html",
          label: "1.1 Basic HTML page structure",
          content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Introduction to HTML</title>
  </head>
  <body>
    <h1>Welcome to HTML</h1>
    <p>
      HTML builds the structure of your page before CSS styles and JavaScript behavior.
    </p>
  </body>
</html>`,
        },
      ),
      text(
        "1.2 Basic HTML Elements: Headings (`<h1>` to `<h6>`) define content hierarchy, paragraphs (`<p>`) group text, and anchor tags (`<a>`) create navigation between pages.",
      ),
      text(
        "1.3 Text Formatting: Use semantic tags such as `<strong>`, `<em>`, `<mark>`, and `<code>` so both users and assistive tools understand meaning, not just visual style.",
      ),
      text(
        "1.4 Images: Use `<img src=\"...\" alt=\"...\">` and write alt text that describes the image purpose. Decorative images should use empty alt (`alt=\"\"`).",
      ),
      table("Core beginner HTML elements", ["Element", "Purpose", "Example use"], [
        ["<h1>-<h6>", "Headings", "Page title, subtitles, section labels"],
        ["<p>", "Paragraphs", "Body text and explanations"],
        ["<a>", "Hyperlinks", "Navigation and references"],
        ["<img>", "Images", "Illustrations and screenshots with alt text"],
      ]),
      callout(
        "tip",
        "Sequence map: 1.1 Introduction to HTML, 1.2 Basic HTML Elements, 1.3 Text Formatting, 1.4 Images. Practice in this exact order for faster learning.",
      ),
      quiz(
        "Which tag should you use for a clickable web link?",
        ["<img>", "<a>", "<p>", "<strong>"],
        1,
        "`<a>` creates hyperlinks users can click to navigate.",
      ),
    ],
    challenge: {
      title: "Challenge 1: Build HTML basics block",
      description:
        "Write `buildIntroCard()` that returns HTML containing an `<h1>`, a paragraph, one link, one formatted text (`<strong>`), and one image with alt text.",
      starterCode: `function buildPage() {
  // Return HTML basics block
}

console.log(buildPage());
`,
      solutionCode: `function buildPage() {
  return '<section>\n  <h1>HTML Basics</h1>\n  <p>Learn structure and meaning with HTML.</p>\n  <p><strong>Important:</strong> Start with semantic tags.</p>\n  <a href="https://polycode.example">Open PolyCode</a>\n  <img src="https://via.placeholder.com/120" alt="HTML basics icon" />\n</section>';
}

console.log(buildPage());`,
      tests: [
        {
          id: 1,
          label: "Defines buildPage function",
          keywords: [{ pattern: "function\\s+buildPage" }],
        },
        {
          id: 2,
          label: "Includes heading, link, and image",
          keywords: [{ pattern: "<h1>" }, { pattern: "<a" }, { pattern: "<img" }],
        },
        {
          id: 3,
          label: "Includes alt text on image",
          keywords: [{ pattern: "alt=\"" }],
        },
      ],
    },
  },
  {
    id: "html-1",
    title: "Tables, lists, layouts, semantic HTML, multimedia",
    xp: 10,
    chapterTitle: "HTML Basics",
    chapterColor: ACCENT,
    theory: [
      objectives([
        "2.1 Lists: build ordered, unordered, and description lists",
        "2.2 Tables: structure tabular data with caption, head, and body",
        "2.3 Containers: organize layout using sectioning and semantic blocks",
        "Use semantic HTML and multimedia tags in practical layouts",
      ]),
      text(
        "2.1 Lists: Use `<ul>` for unordered items, `<ol>` for sequences, and `<dl>` for term-definition pairs. Lists improve readability and scanning.",
        {
          lang: "html",
          label: "2.1 and 2.2 Lists + Tables",
          content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Lists and Tables</title>
  </head>
  <body>
    <section>
      <h2>Learning roadmap</h2>
      <ol>
        <li>Plan content</li>
        <li>Group related ideas</li>
        <li>Collect user input</li>
      </ol>
    </section>
    <table>
      <caption>Example data table</caption>
      <thead>
        <tr><th scope="col">Topic</th><th scope="col">Why it matters</th></tr>
      </thead>
      <tbody>
        <tr><td>Lists</td><td>Structure grouped information</td></tr>
        <tr><td>Forms</td><td>Capture user data</td></tr>
      </tbody>
    </table>
  </body>
</html>`,
        },
      ),
      text(
        "2.2 Tables: Use `<caption>` to describe the table, `<th>` for headers, and `<tbody>` for row groups. This improves accessibility and data clarity.",
      ),
      text(
        "2.3 Containers and semantic layout: Use `<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>` to describe page regions clearly instead of generic wrappers everywhere.",
      ),
      text(
        "Multimedia: Use `<audio>`, `<video>`, and `<source>` for media, and always provide controls, captions, and fallbacks where possible.",
      ),
      table("HTML growth path", ["Topic", "Core tags", "What you learn"], [
        ["Lists", "<ul>, <ol>, <li>, <dl>, <dt>, <dd>", "How to group related items"],
        ["Tables", "<table>, <thead>, <tbody>, <th>, <td>", "How to present data clearly"],
        ["Containers", "<div>, <section>, <article>, <aside>", "How to organize page regions"],
        ["Multimedia", "<video>, <audio>, <source>", "How to embed media content"],
      ]),
      callout(
        "info",
        "Sequence map: 2.1 Lists, 2.2 Tables, 2.3 Containers, then semantic HTML and multimedia for real layouts.",
      ),
      quiz(
        "Which element is best for a list where order matters?",
        ["<ul>", "<ol>", "<table>", "<section>"],
        1,
        "`<ol>` is used when the order of items is meaningful.",
      ),
    ],
    challenge: {
      title: "Challenge 2: Build structure with lists and tables",
      description:
        "Implement `buildStructuredSection()` to return HTML with one ordered list, one table with header row, and one semantic container (`<section>` or `<article>`).",
      starterCode: `function buildList() {
  // Return structured HTML string
}

console.log(buildList());
`,
      solutionCode: `function buildList() {
  return '<section>\n  <h2>Course Plan</h2>\n  <ol>\n    <li>Learn lists</li>\n    <li>Learn tables</li>\n    <li>Build layout</li>\n  </ol>\n  <table>\n    <thead><tr><th>Topic</th><th>Status</th></tr></thead>\n    <tbody><tr><td>Lists</td><td>Done</td></tr></tbody>\n  </table>\n</section>';
}

console.log(buildList());`,
      tests: [
        {
          id: 1,
          label: "Includes ordered list",
          keywords: [{ pattern: "<ol>" }],
        },
        {
          id: 2,
          label: "Includes table with header",
          keywords: [{ pattern: "<table>" }, { pattern: "<th>" }],
        },
        {
          id: 3,
          label: "Includes semantic container",
          keywords: [{ pattern: "<section>|<article>" }],
        },
      ],
    },
  },
  {
    id: "html-5",
    title: "Forms, input types, graphics, APIs, modern HTML", 
    xp: 10,
    chapterTitle: "HTML Basics",
    chapterColor: ACCENT,
    theory: [
      objectives([
        "3.1 HTML Forms: create forms with labels and submit actions",
        "3.2 Input Elements: apply text, email, password, number, date, and checkbox fields",
        "3.4 HTML APIs: understand modern browser APIs used by HTML apps",
        "Use graphics elements like SVG and canvas in modern interfaces",
      ]),
      text(
        "3.1 HTML Forms: Forms collect user information and send it for processing. Pair each input with a `<label>` and keep field names meaningful.",
        {
          lang: "html",
          label: "3.1 and 3.2 Forms + Input elements",
          content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Forms and Inputs</title>
  </head>
  <body>
    <form action="/submit" method="post">
      <label for="name">Name</label>
      <input id="name" name="name" type="text" required />

      <label for="email">Email</label>
      <input id="email" name="email" type="email" required />

      <label for="startDate">Start date</label>
      <input id="startDate" name="startDate" type="date" />

      <button type="submit">Submit</button>
    </form>
  </body>
</html>`,
        },
      ),
      text(
        "3.2 Input Elements: Use the right `type` to improve validation and mobile keyboards. Common types include `text`, `email`, `password`, `number`, `date`, `checkbox`, `radio`, and `file`.",
      ),
      text(
        "Graphics and modern HTML: Use `<svg>` for scalable icons and diagrams, and `<canvas>` for custom drawings and visualizations when needed.",
      ),
      text(
        "3.4 HTML APIs: Modern pages often use `fetch` for network requests, `localStorage` for small local persistence, and Geolocation for location-aware experiences.",
      ),
      table("Forms to modern HTML map", ["Area", "Main tags/APIs", "Use case"], [
        ["Forms", "<form>, <label>, <button>", "Collect user input"],
        ["Input types", "<input type=...>", "Validation and better UX"],
        ["Graphics", "<svg>, <canvas>", "Icons, charts, drawings"],
        ["HTML APIs", "fetch, localStorage, geolocation", "Data and browser features"],
      ]),
      callout(
        "tip",
        "Sequence map: 3.1 HTML Forms, 3.2 Input Elements, 3.4 HTML APIs. Always keep form markup accessible with labels and clear validation messages.",
      ),
      quiz(
        "Which input type is best for validating email format in HTML forms?",
        ["text", "number", "email", "password"],
        2,
        "`type=\"email\"` gives built-in browser validation for email patterns.",
      ),
    ],
    challenge: {
      title: "Challenge 3: Build a modern HTML form section",
      description:
        "Implement `buildFormSection()` that returns HTML with a form, at least two input types (`text` and `email`), one SVG or canvas element, and a script snippet using `fetch`.",
      starterCode: `function buildFormSection() {
  // Return modern HTML form section
}

console.log(buildFormSection());
`,
      solutionCode: `function buildFormSection() {
  return '<section>\n  <form>\n    <label for="name">Name</label>\n    <input id="name" type="text" />\n    <label for="email">Email</label>\n    <input id="email" type="email" />\n    <button type="submit">Send</button>\n  </form>\n  <svg width="80" height="20" role="img" aria-label="line"><line x1="0" y1="10" x2="80" y2="10" stroke="black" /></svg>\n  <script>fetch("/api/ping").then(() => {});</script>\n</section>';
}

console.log(buildFormSection());`,
      tests: [
        {
          id: 1,
          label: "Includes form and labels",
          keywords: [{ pattern: "<form>" }, { pattern: "<label" }],
        },
        {
          id: 2,
          label: "Includes text and email inputs",
          keywords: [{ pattern: "type=\"text\"" }, { pattern: "type=\"email\"" }],
        },
        {
          id: 3,
          label: "Includes graphics and API usage",
          keywords: [{ pattern: "<svg|<canvas" }, { pattern: "fetch\\(" }],
        },
      ],
    },
  },
  ...buildCssFoundationCurriculum().lessons,
];

function buildCssFoundationCurriculum() {
  const sections = [
    {
      id: "css-fundamentals",
      title: "CSS Fundamentals",
      icon: "braces",
      color: "#22c55e",
      lessons: [
        { id: "css-0", title: "Introduction to CSS" },
        { id: "css-1", title: "CSS Syntax" },
        { id: "css-2", title: "CSS Selectors" },
        { id: "css-3", title: "Colors & Backgrounds" },
        { id: "css-4", title: "The Box Model" },
        { id: "css-5", title: "Text & Fonts" },
        { id: "css-6", title: "Basic Styling" },
      ],
    },
    {
      id: "css-layout",
      title: "CSS Layout & Positioning",
      icon: "layout-grid",
      color: "#0ea5e9",
      lessons: [
        { id: "css-7", title: "Display & Visibility" },
        { id: "css-8", title: "Positioning Elements" },
        { id: "css-9", title: "Alignment & Spacing" },
        { id: "css-10", title: "Lists & Tables" },
        { id: "css-11", title: "Navigation & Forms" },
        { id: "css-12", title: "Flexbox" },
        { id: "css-13", title: "CSS Grid" },
        { id: "css-14", title: "Website Layout" },
      ],
    },
    {
      id: "css-advanced",
      title: "Advanced CSS",
      icon: "sparkles",
      color: "#8b5cf6",
      lessons: [
        { id: "css-15", title: "Visual Effects" },
        { id: "css-16", title: "Images & Media" },
        { id: "css-17", title: "Transforms" },
        { id: "css-18", title: "Transitions" },
        { id: "css-19", title: "Animations" },
        { id: "css-20", title: "CSS Variables" },
        { id: "css-21", title: "Advanced Selectors & Rules" },
      ],
    },
    {
      id: "css-responsive",
      title: "Responsive Design & Best Practices",
      icon: "shield-check",
      color: "#f59e0b",
      lessons: [
        { id: "css-22", title: "Responsive Web Design" },
        { id: "css-23", title: "Media Queries" },
        { id: "css-24", title: "Responsive Images & Videos" },
        { id: "css-25", title: "CSS Optimization" },
        { id: "css-26", title: "Accessibility" },
        { id: "css-27", title: "CSS Best Practices" },
      ],
    },
    {
      id: "bootstrap-basics",
      title: "Bootstrap Basics",
      icon: "package",
      color: "#0ea5e9",
      lessons: [
        { id: "bs-0", title: "Introduction to Bootstrap" },
        { id: "bs-1", title: "Installation & Setup" },
        { id: "bs-2", title: "Containers" },
        { id: "bs-3", title: "Typography" },
        { id: "bs-4", title: "Colors & Utilities" },
      ],
    },
    {
      id: "bootstrap-layout",
      title: "Bootstrap Layout",
      icon: "blocks",
      color: "#22c55e",
      lessons: [
        { id: "bs-5", title: "Grid System" },
        { id: "bs-6", title: "Flexbox" },
        { id: "bs-7", title: "Responsive Design" },
        { id: "bs-8", title: "Spacing & Positioning" },
      ],
    },
    {
      id: "bootstrap-components",
      title: "Bootstrap Components",
      icon: "library",
      color: "#14b8a6",
      lessons: [
        { id: "bs-9", title: "Buttons" },
        { id: "bs-10", title: "Cards" },
        { id: "bs-11", title: "Navigation" },
        { id: "bs-12", title: "Forms" },
        { id: "bs-13", title: "Tables" },
        { id: "bs-14", title: "Common Components" },
      ],
    },
    {
      id: "bootstrap-advanced",
      title: "Bootstrap Advanced",
      icon: "target",
      color: "#f97316",
      lessons: [
        { id: "bs-15", title: "Utilities" },
        { id: "bs-16", title: "Icons" },
        { id: "bs-17", title: "Customization" },
        { id: "bs-18", title: "Building Responsive Pages" },
      ],
    },
  ];

  function makeLesson(chapter, lesson) {
    switch (chapter.title) {
      case "CSS Fundamentals":
        return buildCssFundamentalsLesson(chapter, lesson);
      case "CSS Layout & Positioning":
        return buildCssLayoutLesson(chapter, lesson);
      case "Advanced CSS":
        return buildCssAdvancedLesson(chapter, lesson);
      case "Responsive Design & Best Practices":
        return buildCssResponsiveLesson(chapter, lesson);
      case "Bootstrap Basics":
        return buildBootstrapBasicsLesson(chapter, lesson);
      case "Bootstrap Layout":
        return buildBootstrapLayoutLesson(chapter, lesson);
      case "Bootstrap Components":
        return buildBootstrapComponentsLesson(chapter, lesson);
      case "Bootstrap Advanced":
        return buildBootstrapAdvancedLesson(chapter, lesson);
      default:
        return buildSimpleLesson(chapter, lesson, "Learn the topic with practical CSS and HTML examples.");
    }
  }

  function buildSimpleLesson(chapter, lesson, summary) {
    const exampleCode = buildLessonExampleCode(chapter.title, lesson.title, summary);
    return {
      id: lesson.id,
      title: lesson.title,
      xp: 10,
      chapterTitle: chapter.title,
      chapterColor: chapter.color,
      theory: [
        objectives([`Understand ${lesson.title.toLowerCase()}`, `Apply ${lesson.title.toLowerCase()} in real pages`, `Practice the topic with a small example`]),
        text(summary, {
          lang: "html",
          label: lesson.title,
          content: exampleCode,
        }),
        table("Quick guide", ["Item", "Focus", "What to remember"], [["Topic", lesson.title, chapter.title]]),
        callout("tip", `Use ${lesson.title.toLowerCase()} to make the page more polished and consistent.`),
        quiz(
          `What is the main goal of ${lesson.title.toLowerCase()}?`,
          ["Ignore structure", "Improve page styling", "Remove HTML", "Break accessibility"],
          1,
          "CSS and Bootstrap lessons focus on visual design, layout, and user experience.",
        ),
      ],
      challenge: {
        title: `Challenge: ${lesson.title}`,
        description: `Create a small example that practices ${lesson.title.toLowerCase()} in a real page.`,
        starterCode: `function solve() {\n  // Build a small example\n}\n\nconsole.log(solve());`,
        solutionCode: `function solve() {\n  return ${JSON.stringify(exampleCode)};\n}\n\nconsole.log(solve());`,
        tests: [
          { id: 1, label: "Defines solve function", keywords: [{ pattern: "function\\s+solve" }] },
          { id: 2, label: "Returns the lesson title", keywords: [{ pattern: lesson.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") }] },
        ],
      },
    };
  }

  function buildLessonExampleCode(chapterTitle, lessonTitle, summary) {
    const htmlPage = (title, styles, body) => `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>${title}</title>\n    <style>\n${styles}\n    </style>\n  </head>\n  <body>\n${body}\n  </body>\n</html>`;

    const bootstrapPage = (title, styles, body) => `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>${title}</title>\n    <style>\n      :root { color-scheme: light; }\n      body { margin: 0; font-family: system-ui, sans-serif; background: #f8fafc; color: #0f172a; }\n      .container { max-width: 960px; margin: 0 auto; padding: 24px; }\n      .row { display: flex; flex-wrap: wrap; gap: 16px; }\n      .col, .col-md-6 { flex: 1 1 280px; }\n      .btn { display: inline-flex; align-items: center; justify-content: center; gap: .5rem; border: 0; border-radius: .65rem; padding: .8rem 1.1rem; font-weight: 700; cursor: pointer; text-decoration: none; }\n      .btn-primary { background: #0d6efd; color: #fff; }\n      .btn-outline { background: #fff; color: #0f172a; border: 1px solid #cbd5e1; }\n      .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 1rem; overflow: hidden; box-shadow: 0 8px 30px rgba(15,23,42,.08); }\n      .card-body { padding: 1rem; }\n      .nav { display: flex; gap: 1rem; list-style: none; padding: 0; margin: 0; }\n      .nav a { color: inherit; text-decoration: none; }\n      .form-control { width: 100%; padding: .75rem .9rem; border: 1px solid #cbd5e1; border-radius: .7rem; }\n      .table { width: 100%; border-collapse: collapse; background: #fff; }\n      .table th, .table td { padding: .75rem .9rem; border-bottom: 1px solid #e2e8f0; text-align: left; }\n      .badge { display: inline-block; padding: .25rem .55rem; border-radius: 999px; background: #dbeafe; color: #1d4ed8; font-size: .8rem; font-weight: 700; }\n      .text-center { text-align: center; }\n      .text-muted { color: #64748b; }\n      .shadow { box-shadow: 0 10px 25px rgba(15,23,42,.12); }\n      ${styles}\n    </style>\n  </head>\n  <body>\n${body}\n  </body>\n</html>`;

    const cssSnippet = (selector, declaration) => `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <title>${lessonTitle}</title>\n    <style>\n      ${selector} { ${declaration} }\n      body { margin: 0; font-family: system-ui, sans-serif; background: #f8fafc; color: #0f172a; padding: 2rem; }\n    </style>\n  </head>\n  <body>\n    <main>\n      <h1>${lessonTitle}</h1>\n      <p>${summary}</p>\n      <div class="demo">Topic demo</div>\n    </main>\n  </body>\n</html>`;

    switch (chapterTitle) {
      case "CSS Fundamentals":
        switch (lessonTitle) {
          case "Introduction to CSS":
            return htmlPage("Introduction to CSS", `      body {\n        font-family: system-ui, sans-serif;\n        background: #f8fafc;\n        color: #0f172a;\n        padding: 2rem;\n      }\n      h1 { color: #16a34a; }\n      p { max-width: 42rem; line-height: 1.7; }`, `    <main>\n      <h1>CSS adds style to HTML</h1>\n      <p>${summary}</p>\n    </main>`);
          case "CSS Syntax":
            return cssSnippet("p", "color: #0f172a; background: #e2e8f0; padding: 1rem; border-radius: .75rem; /* selector, property, value */");
          case "CSS Selectors":
            return htmlPage("CSS Selectors", `      body { font-family: system-ui, sans-serif; padding: 2rem; background: #f8fafc; }\n      #featured { border-left: 6px solid #22c55e; padding-left: 1rem; }\n      .card { background: white; border: 1px solid #cbd5e1; padding: 1rem; border-radius: 1rem; }\n      article p { color: #334155; }`, `    <main>\n      <section id="featured" class="card">\n        <h1>Selector demo</h1>\n        <article><p>${summary}</p></article>\n      </section>\n    </main>`);
          case "Colors & Backgrounds":
            return htmlPage("Colors & Backgrounds", `      body { margin: 0; font-family: system-ui, sans-serif; background: linear-gradient(135deg, #0f172a, #1d4ed8); color: white; padding: 2rem; }\n      .panel { background: rgba(255,255,255,.12); backdrop-filter: blur(8px); padding: 1.25rem; border-radius: 1rem; }`, `    <main class="panel">\n      <h1>Color contrast and backgrounds</h1>\n      <p>${summary}</p>\n    </main>`);
          case "The Box Model":
            return htmlPage("The Box Model", `      body { font-family: system-ui, sans-serif; padding: 2rem; background: #f8fafc; }\n      .box { margin: 24px auto; border: 2px solid #0f172a; padding: 24px; width: min(100%, 420px); background: white; border-radius: 1rem; }`, `    <main class="box">\n      <h1>Box model demo</h1>\n      <p>${summary}</p>\n    </main>`);
          case "Text & Fonts":
            return htmlPage("Text & Fonts", `      body { font-family: Inter, system-ui, sans-serif; line-height: 1.7; padding: 2rem; background: #f8fafc; color: #111827; }\n      h1 { font-size: 2.5rem; letter-spacing: -.04em; }\n      .lead { max-width: 42rem; }`, `    <main>\n      <h1>Readable typography</h1>\n      <p class="lead">${summary}</p>\n    </main>`);
          case "Basic Styling":
            return htmlPage("Basic Styling", `      body { font-family: system-ui, sans-serif; padding: 2rem; background: #f8fafc; }\n      .btn { display: inline-block; background: #2563eb; color: white; padding: .8rem 1.1rem; border-radius: .75rem; text-decoration: none; box-shadow: 0 8px 20px rgba(37,99,235,.25); }\n      .btn:hover { background: #1d4ed8; }`, `    <main>\n      <h1>Basic styling example</h1>\n      <a class="btn" href="#">Click me</a>\n    </main>`);
          default:
            return cssSnippet("body", "font-family: system-ui, sans-serif;");
        }
      case "CSS Layout & Positioning":
        switch (lessonTitle) {
          case "Display & Visibility":
            return htmlPage("Display & Visibility", `      body { font-family: system-ui, sans-serif; padding: 2rem; background: #f8fafc; }\n      .inline { display: inline-block; background: #dbeafe; padding: .5rem .8rem; margin: .25rem; }\n      .hidden { visibility: hidden; }`, `    <main>\n      <span class="inline">Inline block</span>\n      <span class="inline hidden">Hidden text</span>\n      <p>${summary}</p>\n    </main>`);
          case "Positioning Elements":
            return htmlPage("Positioning Elements", `      body { font-family: system-ui, sans-serif; padding: 2rem; background: #f8fafc; }\n      .badge { position: absolute; top: -10px; right: -10px; background: #ef4444; color: white; padding: .3rem .55rem; border-radius: 999px; }\n      .card { position: relative; background: white; border: 1px solid #e2e8f0; padding: 1.25rem; border-radius: 1rem; width: min(100%, 420px); }`, `    <main class="card">\n      <span class="badge">New</span>\n      <h1>Positioning demo</h1>\n      <p>${summary}</p>\n    </main>`);
          case "Alignment & Spacing":
            return htmlPage("Alignment & Spacing", `      body { font-family: system-ui, sans-serif; padding: 2rem; background: #f8fafc; }\n      .bar { display: flex; align-items: center; justify-content: space-between; gap: 1rem; background: white; border: 1px solid #e2e8f0; padding: 1rem 1.25rem; border-radius: 1rem; }`, `    <main class="bar">\n      <strong>Aligned items</strong>\n      <span>${summary}</span>\n    </main>`);
          case "Lists & Tables":
            return htmlPage("Lists & Tables", `      body { font-family: system-ui, sans-serif; padding: 2rem; background: #f8fafc; }\n      ul, table { background: white; border: 1px solid #e2e8f0; border-radius: 1rem; padding: 1rem; }\n      table { border-collapse: collapse; width: 100%; }\n      th, td { border-bottom: 1px solid #e2e8f0; padding: .75rem; text-align: left; }`, `    <main>\n      <ul><li>Item one</li><li>Item two</li></ul>\n      <table>\n        <thead><tr><th>Label</th><th>Value</th></tr></thead>\n        <tbody><tr><td>Rows</td><td>Styled</td></tr></tbody>\n      </table>\n    </main>`);
          case "Navigation & Forms":
            return htmlPage("Navigation & Forms", `      body { font-family: system-ui, sans-serif; padding: 2rem; background: #f8fafc; }\n      nav { display: flex; gap: 1rem; padding: 1rem; background: white; border: 1px solid #e2e8f0; border-radius: 1rem; margin-bottom: 1rem; }\n      input, button { padding: .75rem .9rem; border-radius: .7rem; border: 1px solid #cbd5e1; }`, `    <main>\n      <nav><a href="#">Home</a><a href="#">Docs</a></nav>\n      <form>\n        <input type="text" placeholder="Your name" />\n        <button type="submit">Send</button>\n      </form>\n    </main>`);
          case "Flexbox":
            return htmlPage("Flexbox", `      body { font-family: system-ui, sans-serif; padding: 2rem; background: #f8fafc; }\n      .row { display: flex; gap: 1rem; }\n      .card { flex: 1; background: white; border: 1px solid #e2e8f0; padding: 1rem; border-radius: 1rem; }`, `    <main class="row">\n      <div class="card"><h1>Left</h1></div>\n      <div class="card"><h1>Right</h1></div>\n    </main>`);
          case "CSS Grid":
            return htmlPage("CSS Grid", `      body { font-family: system-ui, sans-serif; padding: 2rem; background: #f8fafc; }\n      .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }\n      .tile { background: white; border: 1px solid #e2e8f0; padding: 1rem; border-radius: 1rem; }`, `    <main class="grid">\n      <div class="tile">1</div>\n      <div class="tile">2</div>\n      <div class="tile">3</div>\n      <div class="tile">4</div>\n    </main>`);
          case "Website Layout":
            return htmlPage("Website Layout", `      body { margin: 0; font-family: system-ui, sans-serif; background: #f8fafc; }\n      .layout { min-height: 100vh; display: grid; grid-template-columns: 220px 1fr; grid-template-rows: auto 1fr auto; }\n      header, aside, main, footer { padding: 1rem; }\n      header, footer { grid-column: 1 / -1; background: #0f172a; color: white; }\n      aside { background: #e2e8f0; }\n      main { background: white; }`, `    <div class="layout">\n      <header>Header</header>\n      <aside>Sidebar</aside>\n      <main>${summary}</main>\n      <footer>Footer</footer>\n    </div>`);
          default:
            return cssSnippet("main", "display: grid; gap: 1rem;");
        }
      case "Advanced CSS":
        switch (lessonTitle) {
          case "Visual Effects":
            return htmlPage("Visual Effects", `      body { font-family: system-ui, sans-serif; padding: 2rem; background: #f8fafc; }\n      .card { background: white; box-shadow: 0 20px 40px rgba(15,23,42,.15); filter: saturate(1.05); border-radius: 1rem; padding: 1.25rem; }`, `    <main class="card">\n      <h1>Depth and shadow</h1>\n      <p>${summary}</p>\n    </main>`);
          case "Images & Media":
            return htmlPage("Images & Media", `      body { font-family: system-ui, sans-serif; padding: 2rem; background: #f8fafc; }\n      img, video { width: 100%; max-width: 640px; height: auto; border-radius: 1rem; object-fit: cover; }`, `    <main>\n      <img src="https://via.placeholder.com/640x360" alt="Responsive sample" />\n      <p>${summary}</p>\n    </main>`);
          case "Transforms":
            return htmlPage("Transforms", `      body { font-family: system-ui, sans-serif; padding: 2rem; background: #f8fafc; }\n      .tile { width: 180px; height: 180px; background: linear-gradient(135deg, #22c55e, #0ea5e9); color: white; display: grid; place-items: center; border-radius: 1rem; transform: rotate(-3deg) scale(1); }\n      .tile:hover { transform: rotate(0deg) scale(1.03); }`, `    <main class="tile">Transform</main>`);
          case "Transitions":
            return htmlPage("Transitions", `      body { font-family: system-ui, sans-serif; padding: 2rem; background: #f8fafc; }\n      .btn { display: inline-block; background: #1d4ed8; color: white; padding: .9rem 1.1rem; border-radius: .75rem; transition: transform .2s ease, background .2s ease; }\n      .btn:hover { transform: translateY(-2px); background: #2563eb; }`, `    <main>\n      <a class="btn" href="#">Hover me</a>\n    </main>`);
          case "Animations":
            return htmlPage("Animations", `      body { font-family: system-ui, sans-serif; padding: 2rem; background: #f8fafc; }\n      .spinner { width: 48px; height: 48px; border: 4px solid #cbd5e1; border-top-color: #0ea5e9; border-radius: 50%; animation: spin 1s linear infinite; }\n      @keyframes spin { to { transform: rotate(360deg); } }`, `    <main>\n      <div class="spinner"></div>\n      <p>${summary}</p>\n    </main>`);
          case "CSS Variables":
            return htmlPage("CSS Variables", `      :root { --brand: #0ea5e9; --surface: #eff6ff; --text: #0f172a; }\n      body { font-family: system-ui, sans-serif; padding: 2rem; background: var(--surface); color: var(--text); }\n      .card { background: white; border: 1px solid #dbeafe; border-left: 6px solid var(--brand); padding: 1rem; border-radius: 1rem; }`, `    <main class="card">\n      <h1>Theme variables</h1>\n      <p>${summary}</p>\n    </main>`);
          case "Advanced Selectors & Rules":
            return htmlPage("Advanced Selectors & Rules", `      body { font-family: system-ui, sans-serif; padding: 2rem; background: #f8fafc; }\n      .list li:nth-child(odd) { background: #dbeafe; }\n      .list li:not(:last-child) { margin-bottom: .5rem; }\n      .list li:focus-visible { outline: 3px solid #0ea5e9; }`, `    <main>\n      <ul class="list">\n        <li>First</li>\n        <li>Second</li>\n        <li>Third</li>\n      </ul>\n    </main>`);
          default:
            return cssSnippet(".demo", "box-shadow: 0 20px 40px rgba(15,23,42,.12);");
        }
      case "Responsive Design & Best Practices":
        switch (lessonTitle) {
          case "Responsive Web Design":
            return htmlPage("Responsive Web Design", `      body { font-family: system-ui, sans-serif; margin: 0; padding: 2rem; background: #f8fafc; }\n      .container { width: min(100%, 960px); margin: 0 auto; }\n      .card { background: white; border: 1px solid #e2e8f0; padding: 1rem; border-radius: 1rem; }`, `    <main class="container">\n      <div class="card">${summary}</div>\n    </main>`);
          case "Media Queries":
            return htmlPage("Media Queries", `      body { font-family: system-ui, sans-serif; margin: 0; padding: 2rem; background: #f8fafc; }\n      .grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }\n      @media (min-width: 768px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }\n      .card { background: white; border: 1px solid #e2e8f0; padding: 1rem; border-radius: 1rem; }`, `    <main class="grid">\n      <div class="card">Mobile first</div>\n      <div class="card">Two columns on larger screens</div>\n    </main>`);
          case "Responsive Images & Videos":
            return htmlPage("Responsive Images & Videos", `      body { font-family: system-ui, sans-serif; padding: 2rem; background: #f8fafc; }\n      img, video { width: 100%; max-width: 100%; height: auto; border-radius: 1rem; display: block; }`, `    <main>\n      <img src="https://via.placeholder.com/960x540" alt="Responsive media" />\n      <p>${summary}</p>\n    </main>`);
          case "CSS Optimization":
            return htmlPage("CSS Optimization", `      body { font-family: system-ui, sans-serif; padding: 2rem; background: #f8fafc; }\n      .btn, .chip { display: inline-flex; align-items: center; gap: .5rem; border-radius: 999px; }\n      .btn { padding: .75rem 1rem; background: #0ea5e9; color: white; }\n      .chip { padding: .35rem .65rem; background: #dbeafe; color: #1d4ed8; }`, `    <main>\n      <span class="chip">Reusable utility</span>\n      <a class="btn" href="#">Optimized CSS</a>\n    </main>`);
          case "Accessibility":
            return htmlPage("Accessibility", `      body { font-family: system-ui, sans-serif; padding: 2rem; background: #fff; color: #111827; }\n      a:focus-visible, button:focus-visible, input:focus-visible { outline: 3px solid #0ea5e9; outline-offset: 2px; }\n      .panel { background: #f8fafc; border: 1px solid #cbd5e1; padding: 1rem; border-radius: 1rem; }`, `    <main class="panel">\n      <h1>Accessible styles</h1>\n      <p>${summary}</p>\n    </main>`);
          case "CSS Best Practices":
            return htmlPage("CSS Best Practices", `      body { font-family: system-ui, sans-serif; padding: 2rem; background: #f8fafc; }\n      .section { max-width: 720px; margin: 0 auto; }\n      .section h2 { margin-top: 0; }`, `    <main class="section">\n      <h1>Clean CSS structure</h1>\n      <p>${summary}</p>\n    </main>`);
          default:
            return cssSnippet("main", "max-width: 720px;");
        }
      case "Bootstrap Basics":
        switch (lessonTitle) {
          case "Introduction to Bootstrap":
            return bootstrapPage("Introduction to Bootstrap", `      .btn-primary { background: #0d6efd; color: white; }`, `    <div class="container">\n      <span class="badge">BOOTSTRAP</span>\n      <h1>Bootstrap adds ready-made UI helpers</h1>\n      <p>${summary}</p>\n      <a class="btn btn-primary" href="#">Get started</a>\n    </div>`);
          case "Installation & Setup":
            return bootstrapPage("Installation & Setup", `      .code { background: #0f172a; color: #e2e8f0; padding: 1rem; border-radius: 1rem; overflow-x: auto; }`, `    <div class="container">\n      <h1>Bootstrap setup</h1>\n      <p>Add the Bootstrap CDN in the head and then use the framework classes.</p>\n      <pre class="code">&lt;link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" /&gt;</pre>\n    </div>`);
          case "Containers":
            return bootstrapPage("Containers", `      .container { max-width: 720px; }\n      .surface { background: white; border: 1px solid #e2e8f0; padding: 1.25rem; border-radius: 1rem; }`, `    <div class="container">\n      <div class="surface">\n        <h1>Bootstrap container</h1>\n        <p>${summary}</p>\n      </div>\n    </div>`);
          case "Typography":
            return bootstrapPage("Typography", `      .display-6 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; }\n      .lead { font-size: 1.1rem; color: #475569; }`, `    <div class="container">\n      <h1 class="display-6">Bootstrap typography</h1>\n      <p class="lead">${summary}</p>\n    </div>`);
          case "Colors & Utilities":
            return bootstrapPage("Colors & Utilities", `      .bg-primary { background: #0d6efd; color: white; }\n      .bg-success { background: #198754; color: white; }\n      .p-3 { padding: 1rem; }\n      .rounded { border-radius: 1rem; }`, `    <div class="container row">\n      <div class="col card p-3 bg-primary rounded">Primary utility</div>\n      <div class="col card p-3 bg-success rounded">Success utility</div>\n    </div>`);
          default:
            return bootstrapPage(lessonTitle, "", `    <div class="container">\n      <h1>${lessonTitle}</h1>\n      <p>${summary}</p>\n    </div>`);
        }
      case "Bootstrap Layout":
        switch (lessonTitle) {
          case "Grid System":
            return bootstrapPage("Grid System", `      .row { display: flex; flex-wrap: wrap; gap: 1rem; }\n      .col-md-6 { flex: 1 1 320px; }\n      .panel { background: white; border: 1px solid #e2e8f0; padding: 1rem; border-radius: 1rem; }`, `    <div class="container">\n      <div class="row">\n        <div class="col-md-6 panel">Left column</div>\n        <div class="col-md-6 panel">Right column</div>\n      </div>\n    </div>`);
          case "Flexbox":
            return bootstrapPage("Flexbox", `      .d-flex { display: flex; }\n      .justify-content-between { justify-content: space-between; }\n      .align-items-center { align-items: center; }\n      .bar { background: white; border: 1px solid #e2e8f0; padding: 1rem; border-radius: 1rem; }`, `    <div class="container">\n      <div class="bar d-flex justify-content-between align-items-center">\n        <strong>Flex row</strong>\n        <span>${summary}</span>\n      </div>\n    </div>`);
          case "Responsive Design":
            return bootstrapPage("Responsive Design", `      .row { display: flex; flex-wrap: wrap; gap: 1rem; }\n      .col-12 { flex: 1 1 100%; }\n      @media (min-width: 768px) { .col-md-6 { flex: 1 1 calc(50% - .5rem); } }\n      .panel { background: white; border: 1px solid #e2e8f0; padding: 1rem; border-radius: 1rem; }`, `    <div class="container">\n      <div class="row">\n        <div class="col-12 col-md-6 panel">Mobile first</div>\n        <div class="col-12 col-md-6 panel">Responsive column</div>\n      </div>\n    </div>`);
          case "Spacing & Positioning":
            return bootstrapPage("Spacing & Positioning", `      .position-relative { position: relative; }\n      .position-absolute { position: absolute; }\n      .mt-4 { margin-top: 1.5rem; }\n      .badge { top: -10px; right: -10px; }`, `    <div class="container mt-4">\n      <div class="card position-relative">\n        <span class="badge position-absolute">New</span>\n        <div class="card-body">${summary}</div>\n      </div>\n    </div>`);
          default:
            return bootstrapPage(lessonTitle, "", `    <div class="container"><p>${summary}</p></div>`);
        }
      case "Bootstrap Components":
        switch (lessonTitle) {
          case "Buttons":
            return bootstrapPage("Buttons", `      .btn-success { background: #198754; color: white; }\n      .btn-warning { background: #ffc107; color: #111827; }`, `    <div class="container">\n      <button class="btn btn-primary">Primary</button>\n      <button class="btn btn-success">Success</button>\n      <button class="btn btn-warning">Warning</button>\n    </div>`);
          case "Cards":
            return bootstrapPage("Cards", `      .card-title { margin: 0 0 .5rem; font-size: 1.15rem; }\n      .card-text { color: #475569; }`, `    <div class="container">\n      <div class="card">\n        <div class="card-body">\n          <h2 class="card-title">Bootstrap card</h2>\n          <p class="card-text">${summary}</p>\n        </div>\n      </div>\n    </div>`);
          case "Navigation":
            return bootstrapPage("Navigation", `      .navbar { display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #0f172a; color: white; border-radius: 1rem; }\n      .nav { list-style: none; }`, `    <div class="container">\n      <nav class="navbar">\n        <strong>Brand</strong>\n        <ul class="nav">\n          <li><a href="#">Home</a></li>\n          <li><a href="#">Docs</a></li>\n        </ul>\n      </nav>\n    </div>`);
          case "Forms":
            return bootstrapPage("Forms", `      .form-label { display: block; margin-bottom: .35rem; font-weight: 700; }`, `    <div class="container">\n      <form class="card card-body">\n        <label class="form-label" for="email">Email</label>\n        <input class="form-control" id="email" type="email" placeholder="name@example.com" />\n        <div style="height: .75rem"></div>\n        <button class="btn btn-primary" type="submit">Submit</button>\n      </form>\n    </div>`);
          case "Tables":
            return bootstrapPage("Tables", `      .table-striped tbody tr:nth-child(odd) { background: #f8fafc; }`, `    <div class="container">\n      <table class="table table-striped">\n        <thead><tr><th>Topic</th><th>Status</th></tr></thead>\n        <tbody><tr><td>${summary}</td><td>Styled</td></tr></tbody>\n      </table>\n    </div>`);
          case "Common Components":
            return bootstrapPage("Common Components", `      .alert { padding: 1rem; border-radius: 1rem; }\n      .alert-info { background: #dbeafe; color: #1d4ed8; }`, `    <div class="container">\n      <div class="alert alert-info">Alert and badge demo</div>\n      <span class="badge">Badge</span>\n    </div>`);
          default:
            return bootstrapPage(lessonTitle, "", `    <div class="container"><p>${summary}</p></div>`);
        }
      case "Bootstrap Advanced":
        switch (lessonTitle) {
          case "Utilities":
            return bootstrapPage("Utilities", `      .text-center { text-align: center; }\n      .shadow { box-shadow: 0 10px 30px rgba(15,23,42,.14); }\n      .rounded { border-radius: 1rem; }`, `    <div class="container text-center">\n      <div class="card shadow rounded">\n        <div class="card-body">${summary}</div>\n      </div>\n    </div>`);
          case "Icons":
            return bootstrapPage("Icons", `      .bi { display: inline-grid; place-items: center; width: 2rem; height: 2rem; border-radius: 999px; background: #dbeafe; color: #1d4ed8; font-weight: 900; }`, `    <div class="container">\n      <h1><span class="bi" aria-hidden="true">★</span> Bootstrap icons</h1>\n      <p>${summary}</p>\n    </div>`);
          case "Customization":
            return bootstrapPage("Customization", `      :root { --bs-primary: #7c3aed; }\n      .btn-primary { background: var(--bs-primary); color: white; }`, `    <div class="container">\n      <button class="btn btn-primary">Custom theme</button>\n      <p>${summary}</p>\n    </div>`);
          case "Building Responsive Pages":
            return bootstrapPage("Building Responsive Pages", `      .row { display: flex; flex-wrap: wrap; gap: 1rem; }\n      .col-lg-4 { flex: 1 1 280px; }\n      .card-body { min-height: 120px; }`, `    <div class="container">\n      <div class="row">\n        <div class="col-lg-4 card"><div class="card-body">Hero</div></div>\n        <div class="col-lg-4 card"><div class="card-body">Content</div></div>\n        <div class="col-lg-4 card"><div class="card-body">Footer</div></div>\n      </div>\n    </div>`);
          default:
            return bootstrapPage(lessonTitle, "", `    <div class="container"><p>${summary}</p></div>`);
        }
      default:
        return htmlPage(lessonTitle, `      body { font-family: system-ui, sans-serif; padding: 2rem; }`, `    <main>\n      <h1>${lessonTitle}</h1>\n      <p>${summary}</p>\n    </main>`);
    }
  }

  function buildCssFundamentalsLesson(chapter, lesson) {
    switch (lesson.title) {
      case "Introduction to CSS":
        return {
          id: lesson.id,
          title: lesson.title,
          xp: 10,
          chapterTitle: chapter.title,
          chapterColor: chapter.color,
          theory: [
            objectives(["Explain what CSS does", "Link CSS to HTML", "Understand the cascade and style rules"]),
            text(
              "CSS separates presentation from structure. You can place styles in an external file, a `<style>` tag, or inline when needed.",
              {
                lang: "html",
                label: "CSS in a page",
                content: `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <style>\n      body { font-family: system-ui; }\n    </style>\n  </head>\n  <body>\n    <h1>CSS Basics</h1>\n  </body>\n</html>`,
              },
            ),
            table("Core idea", ["Part", "Meaning", "Example"], [["Selector", "Target", "body"] , ["Property", "Style name", "color"], ["Value", "Assigned style", "#111"]]),
            callout("tip", "Start with a small stylesheet and grow it as the page becomes more complex."),
            quiz("Which file extension is used for a stylesheet?", [".html", ".css", ".js", ".json"], 1, "CSS files usually use the .css extension."),
          ],
          challenge: {
            title: "Challenge: Add a stylesheet",
            description: "Create a CSS rule for the body that sets a font family and text color.",
            starterCode: `function buildCss() {\n  // Return CSS text\n}\n\nconsole.log(buildCss());`,
            solutionCode: `function buildCss() {\n  return 'body {\n  font-family: system-ui;\n  color: #111827;\n}';\n}\n\nconsole.log(buildCss());`,
            tests: [{ id: 1, label: "Uses body selector", keywords: [{ pattern: "body" }] }, { id: 2, label: "Sets color", keywords: [{ pattern: "color: #111827;" }] }],
          },
        };
      case "CSS Syntax":
        return buildSimpleLesson(chapter, lesson, "CSS syntax uses selectors, braces, properties, and values to define how elements should look.");
      case "CSS Selectors":
        return buildSimpleLesson(chapter, lesson, "Selectors choose which HTML elements receive styles, including tags, classes, ids, and relationships.");
      case "Colors & Backgrounds":
        return buildSimpleLesson(chapter, lesson, "Colors and backgrounds make surfaces readable, branded, and visually clear.");
      case "The Box Model":
        return buildSimpleLesson(chapter, lesson, "The box model explains how content, padding, border, and margin work together.");
      case "Text & Fonts":
        return buildSimpleLesson(chapter, lesson, "Text and fonts control readability through size, weight, line height, and family choices.");
      case "Basic Styling":
        return buildSimpleLesson(chapter, lesson, "Basic styling combines simple rules to make components feel polished and consistent.");
      default:
        return buildSimpleLesson(chapter, lesson, "Practice the fundamentals with a small styling exercise.");
    }
  }

  function buildCssLayoutLesson(chapter, lesson) {
    switch (lesson.title) {
      case "Display & Visibility":
        return buildSimpleLesson(chapter, lesson, "Display and visibility control whether elements flow inline, block, flex, grid, or disappear from layout.");
      case "Positioning Elements":
        return buildSimpleLesson(chapter, lesson, "Positioning determines how elements are placed relative to the normal flow.");
      case "Alignment & Spacing":
        return buildSimpleLesson(chapter, lesson, "Alignment and spacing keep sections balanced with margins, padding, and gaps.");
      case "Lists & Tables":
        return buildSimpleLesson(chapter, lesson, "Styled lists and tables improve readability for structured data.");
      case "Navigation & Forms":
        return buildSimpleLesson(chapter, lesson, "Navigation and forms need clear spacing, states, and usable touch targets.");
      case "Flexbox":
        return buildSimpleLesson(chapter, lesson, "Flexbox is ideal for one-dimensional alignment and distribution.");
      case "CSS Grid":
        return buildSimpleLesson(chapter, lesson, "CSS Grid is ideal for two-dimensional layouts with rows and columns.");
      case "Website Layout":
        return buildSimpleLesson(chapter, lesson, "Website layout combines sections, containers, and responsive areas into a full page.");
      default:
        return buildSimpleLesson(chapter, lesson, "Use layout and positioning tools to place content where it belongs.");
    }
  }

  function buildCssAdvancedLesson(chapter, lesson) {
    switch (lesson.title) {
      case "Visual Effects":
        return buildSimpleLesson(chapter, lesson, "Visual effects use shadows, filters, and gradients to add depth.");
      case "Images & Media":
        return buildSimpleLesson(chapter, lesson, "Images and media should scale cleanly and preserve aspect ratio.");
      case "Transforms":
        return buildSimpleLesson(chapter, lesson, "Transforms move, rotate, scale, and skew elements in 2D or 3D space.");
      case "Transitions":
        return buildSimpleLesson(chapter, lesson, "Transitions smooth changes between states such as hover and focus.");
      case "Animations":
        return buildSimpleLesson(chapter, lesson, "Animations let you create motion with keyframes and timing controls.");
      case "CSS Variables":
        return buildSimpleLesson(chapter, lesson, "CSS variables keep theme values reusable and easy to update.");
      case "Advanced Selectors & Rules":
        return buildSimpleLesson(chapter, lesson, "Advanced selectors and rules help target complex patterns cleanly.");
      default:
        return buildSimpleLesson(chapter, lesson, "Advanced CSS builds richer interfaces with more control and polish.");
    }
  }

  function buildCssResponsiveLesson(chapter, lesson) {
    switch (lesson.title) {
      case "Responsive Web Design":
        return buildSimpleLesson(chapter, lesson, "Responsive design makes layouts adapt to different screen sizes.");
      case "Media Queries":
        return buildSimpleLesson(chapter, lesson, "Media queries let styles change at different viewport widths.");
      case "Responsive Images & Videos":
        return buildSimpleLesson(chapter, lesson, "Responsive media keeps images and videos flexible and fast.");
      case "CSS Optimization":
        return buildSimpleLesson(chapter, lesson, "Optimization removes duplication and keeps styles easier to maintain.");
      case "Accessibility":
        return buildSimpleLesson(chapter, lesson, "Accessible CSS supports contrast, focus states, and readable interactions.");
      case "CSS Best Practices":
        return buildSimpleLesson(chapter, lesson, "Best practices keep styles organized, scalable, and easy to debug.");
      default:
        return buildSimpleLesson(chapter, lesson, "Use responsive and maintainable CSS for long-term quality.");
    }
  }

  function buildBootstrapBasicsLesson(chapter, lesson) {
    switch (lesson.title) {
      case "Introduction to Bootstrap":
        return buildSimpleLesson(chapter, lesson, "Bootstrap provides ready-made layout and component classes for faster development.");
      case "Installation & Setup":
        return buildSimpleLesson(chapter, lesson, "Bootstrap setup means loading the framework assets in your project.");
      case "Containers":
        return buildSimpleLesson(chapter, lesson, "Bootstrap containers set the page width and center content.");
      case "Typography":
        return buildSimpleLesson(chapter, lesson, "Bootstrap typography helpers improve spacing, scale, and emphasis.");
      case "Colors & Utilities":
        return buildSimpleLesson(chapter, lesson, "Bootstrap utilities speed up layout, color, and spacing work.");
      default:
        return buildSimpleLesson(chapter, lesson, "Bootstrap basics cover setup, containers, type, and utility classes.");
    }
  }

  function buildBootstrapLayoutLesson(chapter, lesson) {
    switch (lesson.title) {
      case "Grid System":
        return buildSimpleLesson(chapter, lesson, "The Bootstrap grid uses rows and columns to create responsive structures.");
      case "Flexbox":
        return buildSimpleLesson(chapter, lesson, "Bootstrap flex utilities align items without custom CSS.");
      case "Responsive Design":
        return buildSimpleLesson(chapter, lesson, "Bootstrap responsive classes adapt layouts across breakpoints.");
      case "Spacing & Positioning":
        return buildSimpleLesson(chapter, lesson, "Spacing and positioning utilities fine-tune the layout quickly.");
      default:
        return buildSimpleLesson(chapter, lesson, "Bootstrap layout keeps pages structured and adaptive.");
    }
  }

  function buildBootstrapComponentsLesson(chapter, lesson) {
    switch (lesson.title) {
      case "Buttons":
        return buildSimpleLesson(chapter, lesson, "Bootstrap buttons standardize actions and states.");
      case "Cards":
        return buildSimpleLesson(chapter, lesson, "Cards present grouped content with a consistent visual frame.");
      case "Navigation":
        return buildSimpleLesson(chapter, lesson, "Bootstrap navigation components create menus and headers quickly.");
      case "Forms":
        return buildSimpleLesson(chapter, lesson, "Bootstrap form classes improve spacing, labels, and controls.");
      case "Tables":
        return buildSimpleLesson(chapter, lesson, "Bootstrap tables make tabular data easier to read.");
      case "Common Components":
        return buildSimpleLesson(chapter, lesson, "Common Bootstrap components include alerts, badges, and accordions.");
      default:
        return buildSimpleLesson(chapter, lesson, "Bootstrap components speed up interface building.");
    }
  }

  function buildBootstrapAdvancedLesson(chapter, lesson) {
    switch (lesson.title) {
      case "Utilities":
        return buildSimpleLesson(chapter, lesson, "Bootstrap utilities provide small reusable helpers for spacing, display, and more.");
      case "Icons":
        return buildSimpleLesson(chapter, lesson, "Bootstrap icons add visual meaning to actions and labels.");
      case "Customization":
        return buildSimpleLesson(chapter, lesson, "Customization lets you adapt Bootstrap to your own design system.");
      case "Building Responsive Pages":
        return buildSimpleLesson(chapter, lesson, "Building responsive pages combines grid, components, and utilities into one design.");
      default:
        return buildSimpleLesson(chapter, lesson, "Bootstrap advanced techniques help turn a framework into a polished product.");
    }
  }

  return {
    chapters: sections.map((section) => ({
      id: section.id,
      title: section.title,
      icon: section.icon,
      color: section.color,
      lessons: section.lessons.map((lesson) => ({ id: lesson.id, title: lesson.title })),
    })),
    lessons: sections.flatMap((section) => section.lessons.map((lesson) => makeLesson(section, lesson))),
  };
}

export const HTML_CSS_FOUNDATION_TOTAL_XP = HTML_CSS_FOUNDATION_LESSONS.reduce(
  (sum, lesson) => sum + lesson.xp,
  0,
);

export function getHtmlCssFoundationLessons() {
  return HTML_CSS_FOUNDATION_LESSONS;
}
