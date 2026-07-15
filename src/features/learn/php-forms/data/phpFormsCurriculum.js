// PolyCode — PHP Forms interactive course
// 4 chapters · 12 lessons · server/browser PHP challenges
// We simulate incoming request data the same way PHP Fundamentals does:
// assigning directly into $_GET / $_POST / $_FILES at the top of the script,
// since there's no real HTTP server in the sandbox.

const ACCENT = "#f97316";

function quiz(question, options, answer, explanation) {
  return { type: "quiz", question, options, answer, explanation };
}
function callout(variant, content) {
  return { type: "callout", variant, content };
}
function text(content, codeBlock = null) {
  if (codeBlock) {
    return { type: "text", content, code: { lang: "php", ...codeBlock } };
  }
  return { type: "text", content };
}
function diagram(title, nodes) {
  return { type: "diagram", title, nodes };
}

const PHP_MAIN = `<?php\n`;

export const PHP_FORMS_CHAPTERS = [
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 1 — Handling Form Data
  // ─────────────────────────────────────────────────────────────
  {
    id: "handling-form-data",
    title: "Handling Form Data",
    icon: "📝",
    color: "#06b6d4",
    lessons: [
      {
        id: "forms-0",
        title: "GET vs POST",
        xp: 15,
        theory: [
          text(
            "HTML forms submit data using one of two HTTP methods. `method=\"get\"` appends data to the URL (visible, bookmarkable, limited size) — `method=\"post\"` sends it in the request body (hidden, no size limit, used for logins/uploads).",
            {
              label: "A form's method attribute",
              content: `<form method="post" action="/submit.php">
    <input type="text" name="username">
    <button type="submit">Send</button>
</form>
<!-- On submit.php: $_POST['username'] holds the value -->`,
            },
          ),
          diagram("GET vs POST", [
            { id: "get", label: "GET", color: "#3b82f6", items: ["Data in the URL", "?search=cats", "Good for searches, links"] },
            { id: "post", label: "POST", color: ACCENT, items: ["Data in the request body", "Not shown in URL", "Good for logins, uploads, sensitive data"] },
          ]),
          quiz(
            "Which HTTP method should a login form use?",
            ["GET, so the URL is bookmarkable", "POST, so credentials aren't exposed in the URL", "Either one works the same", "PUT"],
            1,
            "POST keeps form data out of the URL and browser history — critical for passwords and other sensitive fields. GET is fine for non-sensitive things like search queries.",
          ),
        ],
        challenge: {
          title: "Simulate a POST Submission",
          description: "We'll simulate an incoming POST request. Assign `$_POST['username'] = 'ada';` then echo it.",
          starterCode: `${PHP_MAIN}\n// Simulate the POST and echo it`,
          solutionCode: `${PHP_MAIN}$_POST['username'] = 'ada';\necho $_POST['username'];`,
          tests: [
            { id: 1, label: "Assigns $_POST['username']", keywords: [{ pattern: "\\$_POST\\['username'\\]\\s*=\\s*'ada'" }] },
            { id: 2, label: "Echoes it", keywords: [{ pattern: "echo\\s*\\$_POST" }] },
          ],
        },
      },
      {
        id: "forms-1",
        title: "Reading Input Safely with isset()",
        xp: 20,
        theory: [
          text(
            "Reading a missing form field directly (`$_POST['email']`) triggers a warning if the key doesn't exist. Always check with `isset()` first, or use the null coalescing operator `??`.",
            {
              label: "Safe reads",
              content: `if (isset($_POST['email'])) {
    echo $_POST['email'];
} else {
    echo "No email submitted";
}

// Shorter, equivalent form:
echo $_POST['email'] ?? "No email submitted";`,
            },
          ),
          callout("warning", "Never assume a field is present just because your HTML form has it — the request could come from anywhere, not just your form."),
          quiz(
            "Why check isset($_POST['field']) before reading it?",
            ["It makes the script run faster", "Reading a missing array key triggers a warning; isset() avoids that safely", "isset() is required by PHP syntax", "It validates the data type"],
            1,
            "isset() returns false for a missing or null key without triggering a warning, letting you handle the missing-field case gracefully.",
          ),
        ],
        challenge: {
          title: "Handle a Missing Field",
          description: "$_POST is empty (no 'email' key). Use `??` to echo $_POST['email'] with a fallback of \"No email submitted\".",
          starterCode: `${PHP_MAIN}\n// $_POST is empty here\n// echo email with a fallback`,
          solutionCode: `${PHP_MAIN}echo $_POST['email'] ?? "No email submitted";`,
          tests: [
            { id: 1, label: "Uses ??", keywords: [{ pattern: "\\?\\?" }] },
            { id: 2, label: "Fallback text present", keywords: [{ pattern: "No email submitted" }] },
          ],
        },
      },
      {
        id: "forms-2",
        title: "The $_REQUEST Superglobal",
        xp: 15,
        theory: [
          text(
            "`$_REQUEST` merges `$_GET`, `$_POST`, and `$_COOKIE` into one array — convenient, but it makes it unclear where data actually came from. Prefer `$_GET`/`$_POST` explicitly in real applications.",
            {
              label: "$_REQUEST merges everything",
              content: `$_GET['a'] = 1;
$_POST['b'] = 2;

echo $_REQUEST['a']; // 1 — from $_GET
echo $_REQUEST['b']; // 2 — from $_POST`,
            },
          ),
          quiz(
            "Why is $_POST/$_GET usually preferred over $_REQUEST in production code?",
            [
              "$_REQUEST is deprecated and removed in PHP 8",
              "$_REQUEST doesn't reveal which method (GET/POST/COOKIE) the data actually came from, which matters for security decisions",
              "$_REQUEST is slower",
              "$_REQUEST can only hold strings",
            ],
            1,
            "Being explicit about $_GET vs $_POST makes it clear whether data is a bookmarkable query param or should have come from a POST-only form — important context for validating and trusting the data correctly.",
          ),
        ],
        challenge: {
          title: "Merge GET and POST",
          description: "Assign `$_GET['a'] = 1;` and `$_POST['b'] = 2;`, then echo `$_REQUEST['a']` and `$_REQUEST['b']` separated by a comma.",
          starterCode: `${PHP_MAIN}\n// Assign both, then echo $_REQUEST['a'] . "," . $_REQUEST['b']`,
          solutionCode: `${PHP_MAIN}$_GET['a'] = 1;\n$_POST['b'] = 2;\necho $_REQUEST['a'] . "," . $_REQUEST['b'];`,
          tests: [
            { id: 1, label: "Reads via $_REQUEST", keywords: [{ pattern: "\\$_REQUEST" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 2 — Validation & Sanitization
  // ─────────────────────────────────────────────────────────────
  {
    id: "validation-sanitization",
    title: "Validation & Sanitization",
    icon: "🛡️",
    color: "#3b82f6",
    lessons: [
      {
        id: "forms-3",
        title: "Validating Required Fields",
        xp: 20,
        theory: [
          text(
            "Before processing a form, check that required fields exist AND aren't just empty strings. `empty()` catches both missing keys and blank values in one check.",
            {
              label: "Checking required fields",
              content: `$errors = [];
if (empty($_POST['name'])) {
    $errors[] = "Name is required";
}
if (empty($_POST['email'])) {
    $errors[] = "Email is required";
}

if (empty($errors)) {
    echo "Form is valid!";
} else {
    echo implode(", ", $errors);
}`,
            },
          ),
          quiz(
            "What does empty($_POST['name']) return if $_POST['name'] is an empty string \"\"?",
            ["false", "true", "null", "It throws an error"],
            1,
            "empty() returns true for missing keys, null, empty strings, and other 'falsy' values — exactly what you want when checking a required field was actually filled in.",
          ),
        ],
        challenge: {
          title: "Collect Validation Errors",
          description: "$_POST['name'] is set to \"Amy\" but $_POST['email'] is not set. Build an $errors array checking both fields, then echo them joined by \", \".",
          starterCode: `${PHP_MAIN}$_POST['name'] = 'Amy';\n\n$errors = [];\n// check name and email, add messages to $errors\n\necho implode(", ", $errors);`,
          solutionCode: `${PHP_MAIN}$_POST['name'] = 'Amy';\n\n$errors = [];\nif (empty($_POST['name'])) {\n    $errors[] = "Name is required";\n}\nif (empty($_POST['email'])) {\n    $errors[] = "Email is required";\n}\n\necho implode(", ", $errors);`,
          tests: [
            { id: 1, label: "Uses empty() to validate", hint: "empty($_POST['name'])", keywords: [{ pattern: "empty\\s*\\(" }] },
            { id: 2, label: "Collects into $errors", keywords: [{ pattern: "\\$errors\\[\\]" }] },
          ],
        },
      },
      {
        id: "forms-4",
        title: "Validating with filter_var()",
        xp: 25,
        theory: [
          text(
            "PHP's built-in `filter_var()` validates common formats — emails, URLs, integers — without writing your own regex. It returns the value if valid, or `false` if not.",
            {
              label: "filter_var for email validation",
              content: `$email = "not-an-email";
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Valid email";
} else {
    echo "Invalid email";
}

// Also works for integers, URLs, floats, etc.
$age = filter_var("25", FILTER_VALIDATE_INT); // 25
$bad = filter_var("abc", FILTER_VALIDATE_INT); // false`,
            },
          ),
          quiz(
            "What does filter_var($value, FILTER_VALIDATE_EMAIL) return for an invalid email?",
            ["An empty string", "null", "false", "Throws an exception"],
            2,
            "filter_var() returns false when validation fails, letting you check the result directly in an if statement.",
          ),
        ],
        challenge: {
          title: "Validate an Email Field",
          description: "$_POST['email'] is set to \"not-an-email\". Use filter_var with FILTER_VALIDATE_EMAIL to check it, and echo \"Valid\" or \"Invalid\".",
          starterCode: `${PHP_MAIN}$_POST['email'] = 'not-an-email';\n\n// validate and echo "Valid" or "Invalid"`,
          solutionCode: `${PHP_MAIN}$_POST['email'] = 'not-an-email';\n\nif (filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {\n    echo "Valid";\n} else {\n    echo "Invalid";\n}`,
          tests: [
            { id: 1, label: "Uses filter_var with FILTER_VALIDATE_EMAIL", keywords: [{ pattern: "FILTER_VALIDATE_EMAIL" }] },
          ],
        },
      },
      {
        id: "forms-5",
        title: "Sanitizing Output",
        xp: 20,
        theory: [
          text(
            "If you ever echo user input back into HTML, you must escape it with `htmlspecialchars()` — otherwise a malicious `<script>` tag in a form field becomes real, executable HTML (a **Cross-Site Scripting / XSS** attack).",
            {
              label: "Escaping before output",
              content: `$comment = "<script>alert('hacked')</script>";

// DANGEROUS — the script tag actually runs in the browser:
echo $comment;

// SAFE — special characters are escaped to harmless text:
echo htmlspecialchars($comment);
// Outputs: &lt;script&gt;alert('hacked')&lt;/script&gt;`,
            },
          ),
          callout("warning", "This is one of the most common real-world web vulnerabilities. Any time user input reaches HTML output, escape it with htmlspecialchars()."),
          quiz(
            "What attack does htmlspecialchars() protect against when echoing user input?",
            ["SQL injection", "Cross-Site Scripting (XSS)", "CSRF", "Denial of Service"],
            1,
            "htmlspecialchars() converts characters like < and > into HTML entities so injected <script> tags render as harmless text instead of executing — preventing XSS.",
          ),
        ],
        challenge: {
          title: "Escape Before Echoing",
          description: "$_POST['comment'] contains a script tag. Echo it safely using htmlspecialchars().",
          starterCode: `${PHP_MAIN}$_POST['comment'] = "<b>hi</b>";\n\n// echo it safely`,
          solutionCode: `${PHP_MAIN}$_POST['comment'] = "<b>hi</b>";\n\necho htmlspecialchars($_POST['comment']);`,
          tests: [
            { id: 1, label: "Uses htmlspecialchars", keywords: [{ pattern: "htmlspecialchars\\s*\\(" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 3 — File Uploads
  // ─────────────────────────────────────────────────────────────
  {
    id: "file-uploads",
    title: "File Uploads",
    icon: "📤",
    color: "#f59e0b",
    lessons: [
      {
        id: "forms-6",
        title: "The $_FILES Superglobal",
        xp: 20,
        theory: [
          text(
            "When a form has `enctype=\"multipart/form-data\"` and a `<input type=\"file\">`, uploaded file info lands in `$_FILES` — an array with the field name, temp path, size, and any upload error code.",
            {
              label: "Structure of $_FILES",
              content: `<form method="post" enctype="multipart/form-data">
    <input type="file" name="avatar">
</form>

// On the server:
$_FILES['avatar'] = [
    'name'     => 'photo.jpg',
    'type'     => 'image/jpeg',
    'tmp_name' => '/tmp/phpXXXXXX',
    'error'    => 0,   // 0 means success
    'size'     => 204800,
];`,
            },
          ),
          quiz(
            "What does an 'error' value of 0 in $_FILES mean?",
            ["The upload failed", "The upload succeeded with no errors", "The file is empty", "The file type is invalid"],
            1,
            "PHP's UPLOAD_ERR_OK constant is 0 — meaning the file uploaded without any error. Any nonzero value indicates a specific failure (too large, partial upload, etc.).",
          ),
        ],
        challenge: {
          title: "Read Upload Info",
          description: "Simulate an upload by assigning $_FILES['avatar'] with name \"photo.jpg\", error 0. Echo \"OK: photo.jpg\" if error is 0.",
          starterCode: `${PHP_MAIN}$_FILES['avatar'] = [\n    'name' => 'photo.jpg',\n    'error' => 0,\n];\n\n// check error === 0, echo "OK: <name>"`,
          solutionCode: `${PHP_MAIN}$_FILES['avatar'] = [\n    'name' => 'photo.jpg',\n    'error' => 0,\n];\n\nif ($_FILES['avatar']['error'] === 0) {\n    echo "OK: " . $_FILES['avatar']['name'];\n}`,
          tests: [
            { id: 1, label: "Checks the error field", keywords: [{ pattern: "\\$_FILES\\['avatar'\\]\\['error'\\]" }] },
          ],
        },
      },
      {
        id: "forms-7",
        title: "Validating Type & Size",
        xp: 25,
        theory: [
          text(
            "Never trust `$_FILES['file']['type']` alone — it's client-supplied and easy to fake. Always also check the file **size** against a limit, and ideally verify the actual content type server-side.",
            {
              label: "Validating an upload",
              content: `$file = $_FILES['avatar'];
$maxSize = 2 * 1024 * 1024; // 2MB
$allowedTypes = ['image/jpeg', 'image/png'];

if ($file['size'] > $maxSize) {
    echo "File too large";
} elseif (!in_array($file['type'], $allowedTypes)) {
    echo "Invalid file type";
} else {
    echo "File accepted";
}`,
            },
          ),
          quiz(
            "Why shouldn't you fully trust $_FILES['file']['type']?",
            [
              "It's always empty",
              "It's supplied by the client's browser and can be spoofed by an attacker",
              "PHP doesn't support checking file type",
              "It's only available for images",
            ],
            1,
            "The 'type' field comes from the upload request itself, which a malicious user can manipulate — real applications should verify content server-side (e.g. checking file signatures) for anything security-sensitive.",
          ),
        ],
        challenge: {
          title: "Validate Size and Type",
          description: "$_FILES['avatar'] has size 3000000 (3MB) and type 'image/png'. Max allowed size is 2MB (2*1024*1024). Echo \"File too large\", \"Invalid file type\", or \"File accepted\".",
          starterCode: `${PHP_MAIN}$_FILES['avatar'] = [\n    'size' => 3000000,\n    'type' => 'image/png',\n];\n$maxSize = 2 * 1024 * 1024;\n$allowedTypes = ['image/jpeg', 'image/png'];\n\n// validate and echo the right message`,
          solutionCode: `${PHP_MAIN}$_FILES['avatar'] = [\n    'size' => 3000000,\n    'type' => 'image/png',\n];\n$maxSize = 2 * 1024 * 1024;\n$allowedTypes = ['image/jpeg', 'image/png'];\n\nif ($_FILES['avatar']['size'] > $maxSize) {\n    echo "File too large";\n} elseif (!in_array($_FILES['avatar']['type'], $allowedTypes)) {\n    echo "Invalid file type";\n} else {\n    echo "File accepted";\n}`,
          tests: [
            { id: 1, label: "Checks size against maxSize", keywords: [{ pattern: "\\$maxSize" }] },
            { id: 2, label: "Checks type via in_array", keywords: [{ pattern: "in_array" }] },
          ],
        },
      },
      {
        id: "forms-8",
        title: "Storing the Uploaded File",
        xp: 20,
        theory: [
          text(
            "Once validated, `move_uploaded_file()` moves the file from PHP's temporary location to a permanent path. It's the only safe way to relocate an uploaded file — it also verifies the file really came from an upload.",
            {
              label: "Moving the file",
              content: `$destination = "uploads/" . basename($_FILES['avatar']['name']);

if (move_uploaded_file($_FILES['avatar']['tmp_name'], $destination)) {
    echo "Saved to $destination";
} else {
    echo "Upload failed";
}`,
            },
          ),
          callout("info", "basename() strips any directory info from the filename, preventing a malicious filename like '../../etc/passwd' from writing outside the intended folder."),
          quiz(
            "Why use basename() on the uploaded filename before building the destination path?",
            [
              "It's required by move_uploaded_file()",
              "It prevents a crafted filename containing '../' from writing files outside the intended upload folder",
              "It converts the filename to lowercase",
              "It removes the file extension",
            ],
            1,
            "A malicious filename like '../../config.php' could overwrite arbitrary files if used directly. basename() strips any path components, leaving just the safe filename.",
          ),
        ],
        challenge: {
          title: "Build a Safe Destination Path",
          description: "Given $_FILES['avatar']['name'] = \"../../evil.php\", build a safe destination path \"uploads/\" + basename(name), then echo it.",
          starterCode: `${PHP_MAIN}$_FILES['avatar'] = ['name' => '../../evil.php'];\n\n// build and echo the safe destination path`,
          solutionCode: `${PHP_MAIN}$_FILES['avatar'] = ['name' => '../../evil.php'];\n\n$destination = "uploads/" . basename($_FILES['avatar']['name']);\necho $destination;`,
          tests: [
            { id: 1, label: "Uses basename()", keywords: [{ pattern: "basename\\s*\\(" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 4 — CSRF Protection & Best Practices
  // ─────────────────────────────────────────────────────────────
  {
    id: "csrf-best-practices",
    title: "CSRF Protection & Best Practices",
    icon: "🔒",
    color: "#8b5cf6",
    lessons: [
      {
        id: "forms-9",
        title: "Understanding CSRF Attacks",
        xp: 20,
        theory: [
          text(
            "**Cross-Site Request Forgery (CSRF)** tricks a logged-in user's browser into submitting a request to your site from a different, malicious site — since cookies are sent automatically, the request looks legitimate.",
            {
              label: "The attack shape",
              content: `<!-- On evil-site.com, while you're logged into bank.com: -->
<form action="https://bank.com/transfer" method="post">
    <input type="hidden" name="amount" value="1000">
    <input type="hidden" name="to" value="attacker">
</form>
<script>document.forms[0].submit();</script>
<!-- Your browser sends your bank.com cookies automatically! -->`,
            },
          ),
          quiz(
            "Why does a CSRF attack succeed even though the request comes from a different website?",
            [
              "The attacker knows your password",
              "Browsers automatically attach cookies (including session cookies) to requests, regardless of which site initiated them",
              "CSRF only works if you're logged out",
              "It exploits a bug in PHP itself",
            ],
            1,
            "Cookies are sent based on the destination domain, not the origin page — so a form on any website can trigger an authenticated request to your site as long as your browser holds a valid session cookie for it.",
          ),
        ],
        challenge: {
          title: "Spot the Vulnerable Endpoint",
          description: "A transfer endpoint only checks if the user is logged in, not where the request came from. Assign $vulnerable = true; if it lacks a CSRF token check, then echo the result.",
          starterCode: `${PHP_MAIN}$hasCSRFCheck = false;\n\n// set $vulnerable based on whether hasCSRFCheck is false, echo it as "true" or "false"`,
          solutionCode: `${PHP_MAIN}$hasCSRFCheck = false;\n\n$vulnerable = !$hasCSRFCheck;\necho $vulnerable ? "true" : "false";`,
          tests: [
            { id: 1, label: "Derives vulnerability from hasCSRFCheck", keywords: [{ pattern: "\\$hasCSRFCheck" }] },
          ],
        },
      },
      {
        id: "forms-10",
        title: "CSRF Tokens",
        xp: 25,
        theory: [
          text(
            "The fix: generate a random, secret **CSRF token**, embed it as a hidden field in your form, and verify it matches on submission. An attacker's external form can't know this token.",
            {
              label: "Generating and checking a token",
              content: `// When rendering the form:
$_SESSION['csrf_token'] = bin2hex(random_bytes(32));
// <input type="hidden" name="csrf_token" value="<?= $_SESSION['csrf_token'] ?>">

// When processing the submission:
if (!hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'] ?? '')) {
    die("Invalid CSRF token");
}`,
            },
          ),
          callout("info", "hash_equals() compares strings in constant time, preventing timing attacks that could be used to guess the token character by character."),
          quiz(
            "Why use hash_equals() instead of == to compare the CSRF token?",
            [
              "== doesn't work on strings",
              "hash_equals() runs in constant time, preventing timing-attack-based guessing of the correct token",
              "hash_equals() is faster",
              "There's no real difference",
            ],
            1,
            "A naive == comparison can leak timing information about how many leading characters match, letting an attacker guess the token byte by byte. hash_equals() avoids this by taking the same amount of time regardless of where a mismatch occurs.",
          ),
        ],
        challenge: {
          title: "Verify a CSRF Token",
          description: "Session token is \"abc123\", submitted token is \"abc123\". Use hash_equals() to check them match and echo \"Valid\" or \"Invalid\".",
          starterCode: `${PHP_MAIN}$sessionToken = "abc123";\n$submittedToken = "abc123";\n\n// compare with hash_equals, echo "Valid" or "Invalid"`,
          solutionCode: `${PHP_MAIN}$sessionToken = "abc123";\n$submittedToken = "abc123";\n\nif (hash_equals($sessionToken, $submittedToken)) {\n    echo "Valid";\n} else {\n    echo "Invalid";\n}`,
          tests: [
            { id: 1, label: "Uses hash_equals()", keywords: [{ pattern: "hash_equals\\s*\\(" }] },
          ],
        },
      },
      {
        id: "forms-11",
        title: "Putting It Together: A Safe Contact Form",
        xp: 30,
        theory: [
          text(
            "Final lesson: combine everything from this course into one handler — validate required fields, sanitize output, and only proceed if the CSRF token matches.",
            {
              label: "A complete, safe handler shape",
              content: `if (!hash_equals($sessionToken, $_POST['csrf_token'] ?? '')) {
    die("Invalid CSRF token");
}
if (empty($_POST['name']) || empty($_POST['message'])) {
    die("Missing required fields");
}
$safeName = htmlspecialchars($_POST['name']);
$safeMessage = htmlspecialchars($_POST['message']);
echo "Thanks, $safeName! Message received.";`,
            },
          ),
          quiz(
            "In what order should these checks generally happen: CSRF check, required-field validation, sanitization?",
            [
              "Sanitize, then validate, then CSRF",
              "CSRF check first, then required-field validation, then sanitize before using the data",
              "Order doesn't matter at all",
              "Validation must always come before CSRF",
            ],
            1,
            "Reject forged requests (CSRF) before doing any other work, then confirm the data is actually present (validation), and finally sanitize it right before it's used or displayed.",
          ),
        ],
        challenge: {
          title: "Build the Full Handler",
          description: "Given sessionToken=\"tok1\", $_POST with csrf_token=\"tok1\", name=\"Amy\", message=\"Hello\": verify the CSRF token, validate name and message aren't empty, then echo \"Thanks, Amy! Message received.\" using the sanitized name.",
          starterCode: `${PHP_MAIN}$sessionToken = "tok1";\n$_POST['csrf_token'] = "tok1";\n$_POST['name'] = "Amy";\n$_POST['message'] = "Hello";\n\n// verify CSRF, validate fields, echo the thank-you message`,
          solutionCode: `${PHP_MAIN}$sessionToken = "tok1";\n$_POST['csrf_token'] = "tok1";\n$_POST['name'] = "Amy";\n$_POST['message'] = "Hello";\n\nif (!hash_equals($sessionToken, $_POST['csrf_token'] ?? '')) {\n    die("Invalid CSRF token");\n}\nif (empty($_POST['name']) || empty($_POST['message'])) {\n    die("Missing required fields");\n}\n$safeName = htmlspecialchars($_POST['name']);\necho "Thanks, $safeName! Message received.";`,
          tests: [
            { id: 1, label: "Checks CSRF with hash_equals", keywords: [{ pattern: "hash_equals" }] },
            { id: 2, label: "Validates required fields", keywords: [{ pattern: "empty\\s*\\(" }] },
            { id: 3, label: "Sanitizes before output", keywords: [{ pattern: "htmlspecialchars" }] },
          ],
        },
      },
    ],
  },
];

export const PHP_FORMS_LESSONS = PHP_FORMS_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const PHP_FORMS_TOTAL_XP = PHP_FORMS_LESSONS.reduce(
  (sum, l) => sum + (l.xp || 0),
  0,
);
