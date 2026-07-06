// PolyCode — HTML & CSS Foundation course

import { quiz, callout, text, diagram, table, objectives } from "../../js-fundamentals/data/jsCurriculumHelpers";

const ACCENT = "#0ea5e9";

export const HTML_CSS_FOUNDATION_CHAPTERS = [
  {
    id: "html-basics",
    title: "HTML Basics",
    icon: "file-text",
    color: ACCENT,
    lessons: [
      { id: "html-0", title: "HTML structure & semantic tags" },
      { id: "html-1", title: "Text, links, lists, and images" },
    ],
  },
  {
    id: "css-bootstrap",
    title: "CSS & Bootstrap",
    icon: "layers",
    color: "#22c55e",
    lessons: [
      { id: "html-2", title: "Selectors, box model, and layout" },
      { id: "html-3", title: "Color, typography, and responsive design" },
      { id: "html-4", title: "Bootstrap quickstart and utility classes" },
    ],
  },
];

export const HTML_CSS_FOUNDATION_LESSONS = [
  {
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
        { id: "header", label: "header", color: ACCENT, items: ["Brand", "Title", "Navigation"] },
        { id: "main", label: "main", color: "#3b82f6", items: ["Primary content", "Articles", "Forms"] },
        { id: "footer", label: "footer", color: "#22c55e", items: ["Links", "Copyright", "Contact"] },
      ]),
      callout(
        "tip",
        "Always include `<!DOCTYPE html>` and `<meta charset=\"UTF-8\">` to ensure consistent browser rendering and correct text encoding.",
      ),
      quiz(
        "Which HTML element is best for the main content of a page?",
        ["<div>", "<main>", "<span>", "<section>"],
        1,
        "`<main>` identifies the page's primary content area, which benefits accessibility and structure.",
      ),
    ],
    challenge: {
      title: "Build a basic page shell",
      description:
        "Write a function `buildPage()` that returns a string containing the main HTML skeleton with `<!DOCTYPE html>`, `<html>`, `<head>`, and `<body>`.",
      starterCode: `function buildPage() {
  // Return a simple HTML page string
}

console.log(buildPage());
`,
      solutionCode: `function buildPage() {
  return '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <title>HTML & CSS Foundation</title>\n  </head>\n  <body>\n    <h1>HTML & CSS Foundation</h1>\n  </body>\n</html>';
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
          label: "Includes DOCTYPE declaration",
          keywords: [{ pattern: "<!DOCTYPE html>" }],
        },
        {
          id: 3,
          label: "Includes <title> in the head",
          keywords: [{ pattern: "<title>HTML & CSS Foundation</title>" }],
        },
      ],
    },
  },
  {
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
    <img src="https://via.placeholder.com/150" alt="PolyCode logo" />
  </body>
</html>`,
        },
      ),
      table("When to use each element", ["Element", "Use for", "Example"], [
        ["<h1>-<h6>", "Section headings", "Page title and subtitles"],
        ["<p>", "Paragraph text", "Intro copy and descriptions"],
        ["<a>", "Links", "Navigation and references"],
      ]),
      callout(
        "info",
        "Always use `alt` on images. Screen readers read alt text, so describe what the image conveys." ,
      ),
      quiz(
        "Which element should wrap a website navigation link?",
        ["<img>", "<ul>", "<a>", "<header>"],
        2,
        "`<a>` is the anchor element that creates a clickable hyperlink.",
      ),
    ],
    challenge: {
      title: "Create a HTML snippet",
      description:
        "Implement `buildList()` to return a string with an unordered list of three items: Apple, Banana, Cherry. Log the result.",
      starterCode: `function buildList() {
  // Return HTML list string
}

console.log(buildList());
`,
      solutionCode: `function buildList() {
  return '<ul>\n  <li>Apple</li>\n  <li>Banana</li>\n  <li>Cherry</li>\n</ul>';
}

console.log(buildList());`,
      tests: [
        {
          id: 1,
          label: "Returns an unordered list string",
          keywords: [{ pattern: "<ul>" }],
        },
        {
          id: 2,
          label: "Includes three list items",
          keywords: [{ pattern: "<li>Apple<\\/li>" }, { pattern: "<li>Banana<\\/li>" }, { pattern: "<li>Cherry<\\/li>" }],
        },
      ],
    },
  },
  {
    id: "html-2",
    title: "Selectors, box model, and layout",
    xp: 10,
    chapterTitle: "CSS & Bootstrap",
    chapterColor: "#22c55e",
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
        { id: "margin", label: "margin", color: "#f59e0b", items: ["Space outside the element"] },
        { id: "border", label: "border", color: "#0ea5e9", items: ["Visible edge around content"] },
        { id: "padding", label: "padding", color: "#22c55e", items: ["Space inside border"] },
        { id: "content", label: "content", color: "#7c3aed", items: ["Text, image, or layout"] },
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
      title: "Write a CSS declaration",
      description:
        "Create `cardCss()` that returns a CSS rule string for a class `.card` with `padding: 16px;` and `border-radius: 8px;`.",
      starterCode: `function cardCss() {
  // Return CSS rule string
}

console.log(cardCss());
`,
      solutionCode: `function cardCss() {
  return '.card {\n  padding: 16px;\n  border-radius: 8px;\n}';
}

console.log(cardCss());`,
      tests: [
        {
          id: 1,
          label: "Returns .card selector",
          keywords: [{ pattern: "\\.card" }],
        },
        {
          id: 2,
          label: "Includes padding and border-radius",
          keywords: [{ pattern: "padding: 16px;" }, { pattern: "border-radius: 8px;" }],
        },
      ],
    },
  },
  {
    id: "html-3",
    title: "Color, typography, and responsive design",
    xp: 10,
    chapterTitle: "CSS & Bootstrap",
    chapterColor: "#22c55e",
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
      title: "Build a responsive container rule",
      description:
        "Implement `containerRule()` to return a CSS string for `.container` with `width: 100%;`, `max-width: 960px;`, and `margin: 0 auto;`.",
      starterCode: `function containerRule() {
  // Return responsive CSS rule string
}

console.log(containerRule());
`,
      solutionCode: `function containerRule() {
  return '.container {\n  width: 100%;\n  max-width: 960px;\n  margin: 0 auto;\n}';
}

console.log(containerRule());`,
      tests: [
        {
          id: 1,
          label: "Returns .container selector",
          keywords: [{ pattern: "\\.container" }],
        },
        {
          id: 2,
          label: "Includes max-width and margin rules",
          keywords: [{ pattern: "max-width: 960px;" }, { pattern: "margin: 0 auto;" }],
        },
      ],
    },
  },
  {
    id: "html-4",
    title: "Bootstrap quickstart and utility classes",
    xp: 10,
    chapterTitle: "CSS & Bootstrap",
    chapterColor: "#22c55e",
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
          content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Button Example</title>
  </head>
  <body>
    <button class="btn btn-primary">Get started</button>
  </body>
</html>`,
        },
      ),
      text(
        "The Bootstrap grid uses containers, rows, and columns. A common pattern is `row` with children like `col-md-6`, which creates two columns on medium screens and above.",
        {
          lang: "html",
          label: "Bootstrap grid skeleton",
          content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bootstrap Grid Skeleton</title>
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col-md-6">Left column</div>
        <div class="col-md-6">Right column</div>
      </div>
    </div>
  </body>
</html>`,
        },
      ),
      table("Helpful Bootstrap utilities", ["Class", "Purpose", "Example"], [
        [".mb-4", "Add bottom margin", "Spacing between sections"],
        [".text-center", "Center text", "Hero headings"],
        [".d-flex", "Enable flex layout", "Align card items"],
      ]),
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
      title: "Generate a Bootstrap card snippet",
      description:
        "Write `bootstrapCard(title, body)` that returns a string using Bootstrap classes `card`, `card-body`, `card-title`, and `card-text`.",
      starterCode: `function bootstrapCard(title, body) {
  // Return Bootstrap card HTML string
}

console.log(bootstrapCard("Hello", "This is a card."));
`,
      solutionCode: `function bootstrapCard(title, body) {
  return '<div class="card">\n  <div class="card-body">\n    <h5 class="card-title">' + title + '</h5>\n    <p class="card-text">' + body + '</p>\n  </div>\n</div>';
}

console.log(bootstrapCard("Hello", "This is a card."));`,
      tests: [
        {
          id: 1,
          label: "Uses Bootstrap card classes",
          keywords: [{ pattern: "card-body" }, { pattern: "card-title" }, { pattern: "card-text" }],
        },
        {
          id: 2,
          label: "Inserts title and body text",
          keywords: [{ pattern: ">Hello<" }, { pattern: ">This is a card.<" }],
        },
      ],
    },
  },
];

export const HTML_CSS_FOUNDATION_TOTAL_XP = HTML_CSS_FOUNDATION_LESSONS.reduce(
  (sum, lesson) => sum + lesson.xp,
  0,
);

export function getHtmlCssFoundationLessons() {
  return HTML_CSS_FOUNDATION_LESSONS;
}
