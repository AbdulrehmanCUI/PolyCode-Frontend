// PolyCode — PHP Sessions & Cookies interactive course
// 4 chapters · 12 lessons · server/browser PHP challenges
// $_SESSION works normally via session_start() even in this sandbox.
// Cookies are simulated by assigning directly into $_COOKIE (the same way
// PHP Fundamentals/PHP Forms simulate $_GET/$_POST), since setcookie()'s
// real effect is an HTTP response header, not something testable via output.

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

export const PHP_SESSIONS_CHAPTERS = [
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 1 — Session Basics
  // ─────────────────────────────────────────────────────────────
  {
    id: "session-basics",
    title: "Session Basics",
    icon: "🔑",
    color: "#06b6d4",
    lessons: [
      {
        id: "sess-0",
        title: "Starting a Session & Storing Data",
        xp: 15,
        theory: [
          text(
            "HTTP is stateless — each request is independent, with no memory of previous ones. **Sessions** solve this: `session_start()` creates (or resumes) a per-visitor storage area on the server, accessible through the `$_SESSION` superglobal.",
            {
              label: "Starting a session",
              content: `session_start(); // must be called before any output

$_SESSION['username'] = 'ada';
$_SESSION['cart_count'] = 3;

echo $_SESSION['username']; // ada`,
            },
          ),
          callout("warning", "session_start() must run before any HTML or echo output — it needs to send a cookie header identifying the session."),
          quiz(
            "Why is $_SESSION useful when HTTP itself has no memory between requests?",
            [
              "It makes pages load faster",
              "It gives the server a place to persist data (like login state) tied to one visitor across multiple requests",
              "It replaces the need for a database entirely",
              "It's required by all PHP scripts",
            ],
            1,
            "Each request is normally independent, but session_start() links requests from the same browser to the same server-side storage bucket via a session ID cookie — letting you remember things like 'this user is logged in.'",
          ),
        ],
        challenge: {
          title: "Store Session Data",
          description: "Call session_start(), store $_SESSION['username'] = 'ada', then echo it back.",
          starterCode: `${PHP_MAIN}\n// start the session, store username, echo it`,
          solutionCode: `${PHP_MAIN}session_start();\n$_SESSION['username'] = 'ada';\necho $_SESSION['username'];`,
          tests: [
            { id: 1, label: "Calls session_start()", keywords: [{ pattern: "session_start\\s*\\(" }] },
            { id: 2, label: "Sets $_SESSION['username']", keywords: [{ pattern: "\\$_SESSION\\['username'\\]" }] },
          ],
        },
      },
      {
        id: "sess-1",
        title: "Reading Session Data Safely",
        xp: 20,
        theory: [
          text(
            "Just like `$_POST`, reading a session key that was never set triggers a warning. Use `isset()` or `??` — especially important for things like login state, where a missing key should mean 'not logged in', not an error.",
            {
              label: "Safe session reads",
              content: `session_start();

if (isset($_SESSION['user_id'])) {
    echo "Logged in as user " . $_SESSION['user_id'];
} else {
    echo "Not logged in";
}

// Equivalent shorthand:
echo $_SESSION['user_id'] ?? "Not logged in";`,
            },
          ),
          quiz(
            "What should isset($_SESSION['user_id']) return for a brand-new visitor who never logged in?",
            ["true", "false", "null", "It throws a fatal error"],
            1,
            "isset() returns false for a key that was never set, which is exactly the signal you want: 'this visitor has no user_id in their session, so they're not logged in.'",
          ),
        ],
        challenge: {
          title: "Check Login State Safely",
          description: "The session has no 'user_id' key set. Echo the logged-in message or \"Not logged in\" using ??.",
          starterCode: `${PHP_MAIN}session_start();\n\n// echo login status using ??`,
          solutionCode: `${PHP_MAIN}session_start();\n\necho $_SESSION['user_id'] ?? "Not logged in";`,
          tests: [
            { id: 1, label: "Uses ?? for a safe read", keywords: [{ pattern: "\\?\\?" }] },
          ],
        },
      },
      {
        id: "sess-2",
        title: "Removing Session Data",
        xp: 20,
        theory: [
          text(
            "To remove a single key, use `unset()`. To clear the entire session's data (but keep the session itself alive), use `session_unset()`. To end the session completely, use `session_destroy()`.",
            {
              label: "Removing session data",
              content: `session_start();
$_SESSION['cart_count'] = 3;

unset($_SESSION['cart_count']); // removes just this key

$_SESSION['a'] = 1;
$_SESSION['b'] = 2;
session_unset(); // clears ALL session variables, session stays active

session_destroy(); // ends the session entirely`,
            },
          ),
          quiz(
            "What's the difference between session_unset() and session_destroy()?",
            [
              "They do the same thing",
              "session_unset() clears session variables but keeps the session active; session_destroy() ends the session entirely",
              "session_destroy() only removes cookies",
              "session_unset() deletes the session file from disk",
            ],
            1,
            "session_unset() empties $_SESSION but the session ID stays valid — session_destroy() invalidates the session itself, which is what you want on logout.",
          ),
        ],
        challenge: {
          title: "Remove a Single Key",
          description: "Set $_SESSION['cart_count'] = 3 and $_SESSION['username'] = 'ada'. Unset only cart_count, then echo whether it's set (\"still set\" or \"removed\") and print username.",
          starterCode: `${PHP_MAIN}session_start();\n$_SESSION['cart_count'] = 3;\n$_SESSION['username'] = 'ada';\n\n// unset cart_count, then echo "removed" or "still set", plus username`,
          solutionCode: `${PHP_MAIN}session_start();\n$_SESSION['cart_count'] = 3;\n$_SESSION['username'] = 'ada';\n\nunset($_SESSION['cart_count']);\necho isset($_SESSION['cart_count']) ? "still set" : "removed";\necho " " . $_SESSION['username'];`,
          tests: [
            { id: 1, label: "Uses unset() on cart_count", keywords: [{ pattern: "unset\\s*\\(\\s*\\$_SESSION\\['cart_count'\\]" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 2 — Cookies
  // ─────────────────────────────────────────────────────────────
  {
    id: "cookies",
    title: "Cookies",
    icon: "🍪",
    color: "#3b82f6",
    lessons: [
      {
        id: "sess-3",
        title: "What is a Cookie?",
        xp: 15,
        theory: [
          text(
            "A **cookie** is a small piece of data the server asks the browser to store and send back on every future request. `setcookie()` sends it; on later requests, it shows up in `$_COOKIE`.",
            {
              label: "Setting a cookie",
              content: `// Sent to the browser (must be called before any output):
setcookie('theme', 'dark', time() + 3600); // expires in 1 hour

// On a LATER request, the browser sends it back automatically:
echo $_COOKIE['theme']; // "dark"`,
            },
          ),
          diagram("Sessions vs Cookies", [
            { id: "session", label: "Session", color: "#06b6d4", items: ["Stored on the SERVER", "Browser only holds a session ID", "Cleared when session ends"] },
            { id: "cookie", label: "Cookie", color: "#3b82f6", items: ["Stored in the BROWSER", "Sent back on every request", "Persists until it expires"] },
          ]),
          quiz(
            "Where is a cookie's actual data stored?",
            ["On the server, in a session file", "In the browser itself", "In the database", "In PHP's memory only"],
            1,
            "Unlike session data (which lives server-side), a cookie's value is stored by the browser and resent with every request to the site that set it.",
          ),
        ],
        challenge: {
          title: "Read a Simulated Cookie",
          description: "We simulate a returning visitor whose browser already has a cookie. Assign $_COOKIE['theme'] = 'dark', then echo it.",
          starterCode: `${PHP_MAIN}\n// simulate the cookie, echo it`,
          solutionCode: `${PHP_MAIN}$_COOKIE['theme'] = 'dark';\necho $_COOKIE['theme'];`,
          tests: [
            { id: 1, label: "Reads $_COOKIE", keywords: [{ pattern: "\\$_COOKIE\\['theme'\\]" }] },
          ],
        },
      },
      {
        id: "sess-4",
        title: "Cookie Expiration & Options",
        xp: 20,
        theory: [
          text(
            "`setcookie()` takes an expiration timestamp, a path, and more. Without an expiration, a cookie is a **session cookie** — it disappears when the browser closes. `time() + N` sets it to expire N seconds from now.",
            {
              label: "Common expiration patterns",
              content: `setcookie('session_pref', 'x'); // expires when browser closes

setcookie('remember_me', 'yes', time() + (86400 * 30)); // 30 days

setcookie('temp_flag', 'y', time() - 3600); // in the past = deletes the cookie`,
            },
          ),
          quiz(
            "How do you delete an existing cookie with setcookie()?",
            [
              "Call unset($_COOKIE['name'])",
              "Call setcookie() again with the same name and an expiration time in the past",
              "Cookies can't be deleted, only overwritten",
              "Set the value to an empty string only",
            ],
            1,
            "Since the browser (not PHP) actually owns the cookie storage, deleting one means telling the browser via a new setcookie() call with an already-past expiration time, so the browser discards it.",
          ),
        ],
        challenge: {
          title: "Compute a 30-Day Expiration",
          description: "Given a fixed 'now' of 1000000, compute the expiration timestamp for 30 days from now (86400 seconds/day) and echo it.",
          starterCode: `${PHP_MAIN}$now = 1000000;\n\n// compute expiration = now + 30 days, echo it`,
          solutionCode: `${PHP_MAIN}$now = 1000000;\n\n$expires = $now + (86400 * 30);\necho $expires;`,
          tests: [
            { id: 1, label: "Multiplies 86400 by 30", keywords: [{ pattern: "86400\\s*\\*\\s*30" }] },
          ],
        },
      },
      {
        id: "sess-5",
        title: "Reading Multiple Cookies",
        xp: 20,
        theory: [
          text(
            "`$_COOKIE` is a normal associative array — you can loop over it, check for specific keys, and combine cookie data with other logic, just like any other superglobal.",
            {
              label: "Looping over cookies",
              content: `$_COOKIE = ['theme' => 'dark', 'lang' => 'en'];

foreach ($_COOKIE as $name => $value) {
    echo "$name = $value\\n";
}`,
            },
          ),
          quiz(
            "What type of PHP value is $_COOKIE?",
            ["A string", "An associative array", "An object", "A boolean"],
            1,
            "Like $_GET, $_POST, and $_SESSION, $_COOKIE is a plain associative array mapping cookie names to their values.",
          ),
        ],
        challenge: {
          title: "Loop Over Cookies",
          description: "Given $_COOKIE with 'theme'=>'dark' and 'lang'=>'en', loop over it and echo each as \"name=value\" separated by a comma.",
          starterCode: `${PHP_MAIN}$_COOKIE = ['theme' => 'dark', 'lang' => 'en'];\n\n// loop and build "theme=dark,lang=en"`,
          solutionCode: `${PHP_MAIN}$_COOKIE = ['theme' => 'dark', 'lang' => 'en'];\n\n$parts = [];\nforeach ($_COOKIE as $name => $value) {\n    $parts[] = "$name=$value";\n}\necho implode(",", $parts);`,
          tests: [
            { id: 1, label: "Loops with foreach", keywords: [{ pattern: "foreach\\s*\\(\\s*\\$_COOKIE" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 3 — Login & Auth Patterns
  // ─────────────────────────────────────────────────────────────
  {
    id: "login-auth",
    title: "Login & Auth Patterns",
    icon: "🔐",
    color: "#f59e0b",
    lessons: [
      {
        id: "sess-6",
        title: "Storing Identity After Login",
        xp: 25,
        theory: [
          text(
            "The core login pattern: verify the submitted credentials, and if correct, store the user's identity in the session so future requests know who's logged in — never store the password itself.",
            {
              label: "A basic login handler",
              content: `session_start();
$validUsers = ['ada' => 'secret123'];

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

if (isset($validUsers[$username]) && $validUsers[$username] === $password) {
    $_SESSION['user_id'] = $username; // now "logged in"
    echo "Login successful";
} else {
    echo "Invalid credentials";
}`,
            },
          ),
          callout("warning", "Never store a plaintext password in $_SESSION or compare against one stored elsewhere in plaintext — always hash passwords with password_hash()/password_verify() in real applications."),
          quiz(
            "What should be stored in $_SESSION after a successful login?",
            [
              "The user's plaintext password, for convenience",
              "Just an identifier for who's logged in (like a user ID or username), never the password",
              "Nothing — sessions aren't used for login",
              "The entire user database row including sensitive fields",
            ],
            1,
            "The session should hold just enough to identify the user on future requests (e.g. user_id) — the password itself should never be stored in the session.",
          ),
        ],
        challenge: {
          title: "Log In a User",
          description: "$_POST has username='ada', password='secret123'. Given $validUsers=['ada'=>'secret123'], verify and set $_SESSION['user_id'] on success, echoing \"Login successful\" or \"Invalid credentials\".",
          starterCode: `${PHP_MAIN}session_start();\n$validUsers = ['ada' => 'secret123'];\n$_POST['username'] = 'ada';\n$_POST['password'] = 'secret123';\n\n// verify and set session, echo the result`,
          solutionCode: `${PHP_MAIN}session_start();\n$validUsers = ['ada' => 'secret123'];\n$_POST['username'] = 'ada';\n$_POST['password'] = 'secret123';\n\n$username = $_POST['username'] ?? '';\n$password = $_POST['password'] ?? '';\n\nif (isset($validUsers[$username]) && $validUsers[$username] === $password) {\n    $_SESSION['user_id'] = $username;\n    echo "Login successful";\n} else {\n    echo "Invalid credentials";\n}`,
          tests: [
            { id: 1, label: "Verifies against $validUsers", keywords: [{ pattern: "\\$validUsers\\[" }] },
            { id: 2, label: "Sets $_SESSION['user_id'] on success", keywords: [{ pattern: "\\$_SESSION\\['user_id'\\]" }] },
          ],
        },
      },
      {
        id: "sess-7",
        title: "Guarding Pages with requireLogin()",
        xp: 20,
        theory: [
          text(
            "Real apps have many pages that require login. Instead of repeating the same `isset($_SESSION['user_id'])` check everywhere, wrap it in a reusable guard function.",
            {
              label: "A reusable auth guard",
              content: `function requireLogin() {
    if (!isset($_SESSION['user_id'])) {
        echo "Access denied — please log in";
        return false;
    }
    return true;
}

session_start();
if (requireLogin()) {
    echo "Welcome, " . $_SESSION['user_id'];
}`,
            },
          ),
          quiz(
            "Why extract the login check into a requireLogin() function rather than repeating the isset() check on every page?",
            [
              "Functions run faster than inline code",
              "It avoids duplicating the same logic everywhere, and centralizes any future changes to how auth is checked",
              "PHP requires functions for session access",
              "It hides the check from other developers",
            ],
            1,
            "This is the DRY (Don't Repeat Yourself) principle — one function is the single source of truth for 'is this user logged in', so a future change (like adding role checks) only needs to happen in one place.",
          ),
        ],
        challenge: {
          title: "Guard an Unauthenticated Request",
          description: "No user_id is set in the session. Implement requireLogin() and call it — it should echo \"Access denied — please log in\".",
          starterCode: `${PHP_MAIN}session_start();\n\nfunction requireLogin() {\n    // return false and echo the denial message if not logged in\n\n}\n\nrequireLogin();`,
          solutionCode: `${PHP_MAIN}session_start();\n\nfunction requireLogin() {\n    if (!isset($_SESSION['user_id'])) {\n        echo "Access denied — please log in";\n        return false;\n    }\n    return true;\n}\n\nrequireLogin();`,
          tests: [
            { id: 1, label: "Defines requireLogin()", keywords: [{ pattern: "function\\s+requireLogin" }] },
            { id: 2, label: "Checks isset($_SESSION['user_id'])", keywords: [{ pattern: "isset\\s*\\(\\s*\\$_SESSION\\['user_id'\\]" }] },
          ],
        },
      },
      {
        id: "sess-8",
        title: "Logging Out",
        xp: 20,
        theory: [
          text(
            "A proper logout clears the session data AND destroys the session itself — leaving either step out can let stale data linger or the session be reused.",
            {
              label: "A complete logout",
              content: `session_start();
$_SESSION['user_id'] = 'ada'; // pretend they were logged in

session_unset();   // clear all session variables
session_destroy(); // invalidate the session itself

echo "Logged out";`,
            },
          ),
          quiz(
            "Why call both session_unset() AND session_destroy() on logout, not just one?",
            [
              "It's redundant — either alone is enough",
              "session_unset() clears the data, session_destroy() invalidates the session itself — doing both fully ends the login state",
              "session_destroy() alone would throw an error",
              "This is only needed in PHP CLI, not on a real server",
            ],
            1,
            "session_unset() empties the variables but the session ID could technically still be considered active; session_destroy() ends the session record entirely — together they're the standard, thorough logout pattern.",
          ),
        ],
        challenge: {
          title: "Implement Logout",
          description: "$_SESSION['user_id'] is 'ada'. Log the user out (clear session data and destroy the session), then echo \"Logged out\".",
          starterCode: `${PHP_MAIN}session_start();\n$_SESSION['user_id'] = 'ada';\n\n// log out fully, then echo "Logged out"`,
          solutionCode: `${PHP_MAIN}session_start();\n$_SESSION['user_id'] = 'ada';\n\nsession_unset();\nsession_destroy();\necho "Logged out";`,
          tests: [
            { id: 1, label: "Calls session_unset()", keywords: [{ pattern: "session_unset\\s*\\(" }] },
            { id: 2, label: "Calls session_destroy()", keywords: [{ pattern: "session_destroy\\s*\\(" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 4 — Session Security
  // ─────────────────────────────────────────────────────────────
  {
    id: "session-security",
    title: "Session Security",
    icon: "🛡️",
    color: "#8b5cf6",
    lessons: [
      {
        id: "sess-9",
        title: "Session Fixation & regenerate_id()",
        xp: 25,
        theory: [
          text(
            "**Session fixation** is an attack where an attacker tricks a victim into using a known session ID, then hijacks it once the victim logs in. The fix: call `session_regenerate_id()` immediately after a successful login, issuing a fresh ID.",
            {
              label: "Regenerating on login",
              content: `session_start();

// ... verify credentials ...

session_regenerate_id(true); // true = destroy the old session data too
$_SESSION['user_id'] = 'ada';
echo "Logged in with a fresh session ID";`,
            },
          ),
          callout("info", "Passing true to session_regenerate_id() deletes the old session file, closing the fixation window completely."),
          quiz(
            "When should you call session_regenerate_id()?",
            [
              "On every single page load",
              "Immediately after a successful login (and other privilege changes)",
              "Only when logging out",
              "It's not needed if you use HTTPS",
            ],
            1,
            "Regenerating the ID right after authentication ensures any session ID an attacker might have set before login becomes useless — the user is now operating under a brand-new, unguessable ID.",
          ),
        ],
        challenge: {
          title: "Regenerate on Login",
          description: "After verifying login succeeded, call session_regenerate_id(true), then set $_SESSION['user_id'] = 'ada' and echo \"Session regenerated\".",
          starterCode: `${PHP_MAIN}session_start();\n\n// regenerate session id, set user_id, echo confirmation`,
          solutionCode: `${PHP_MAIN}session_start();\n\nsession_regenerate_id(true);\n$_SESSION['user_id'] = 'ada';\necho "Session regenerated";`,
          tests: [
            { id: 1, label: "Calls session_regenerate_id(true)", keywords: [{ pattern: "session_regenerate_id\\s*\\(\\s*true\\s*\\)" }] },
          ],
        },
      },
      {
        id: "sess-10",
        title: "Secure Cookie Flags",
        xp: 20,
        theory: [
          text(
            "Cookies (including the session cookie) support security flags: `Secure` (only sent over HTTPS), `HttpOnly` (inaccessible to JavaScript, blocking many XSS-based theft attempts), and `SameSite` (restricts cross-site sending, helping prevent CSRF).",
            {
              label: "Setting flags on a cookie",
              content: `setcookie('session_id', 'abc123', [
    'expires' => time() + 3600,
    'path' => '/',
    'secure' => true,     // HTTPS only
    'httponly' => true,   // no JavaScript access
    'samesite' => 'Strict',
]);`,
            },
          ),
          quiz(
            "What does the HttpOnly flag protect against?",
            [
              "SQL injection",
              "JavaScript (e.g. from an XSS attack) reading the cookie's value",
              "The cookie expiring too soon",
              "CSRF attacks",
            ],
            1,
            "HttpOnly cookies are invisible to document.cookie in JavaScript — so even if an attacker manages to inject a script (XSS), they still can't steal the session cookie's value.",
          ),
        ],
        challenge: {
          title: "Build Secure Cookie Options",
          description: "Build an options array for a session cookie with secure=true, httponly=true, samesite='Strict', then echo the httponly value as \"true\" or \"false\".",
          starterCode: `${PHP_MAIN}\n// build the options array, echo httponly as "true"/"false"`,
          solutionCode: `${PHP_MAIN}$options = [\n    'secure' => true,\n    'httponly' => true,\n    'samesite' => 'Strict',\n];\necho $options['httponly'] ? "true" : "false";`,
          tests: [
            { id: 1, label: "Sets httponly to true", keywords: [{ pattern: "'httponly'\\s*=>\\s*true" }] },
            { id: 2, label: "Sets secure to true", keywords: [{ pattern: "'secure'\\s*=>\\s*true" }] },
          ],
        },
      },
      {
        id: "sess-11",
        title: "Putting It Together: A Secure Login Flow",
        xp: 30,
        theory: [
          text(
            "Final lesson: combine everything — verify credentials, regenerate the session ID, and store identity — into one complete, secure login handler.",
            {
              label: "The full secure flow",
              content: `session_start();
$validUsers = ['ada' => 'secret123'];
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

if (isset($validUsers[$username]) && $validUsers[$username] === $password) {
    session_regenerate_id(true);
    $_SESSION['user_id'] = $username;
    echo "Welcome, $username!";
} else {
    echo "Invalid credentials";
}`,
            },
          ),
          quiz(
            "In what order should credential verification and session_regenerate_id() happen?",
            [
              "Regenerate first, then verify credentials",
              "Verify credentials first — only regenerate the session ID after confirming the login is valid",
              "Order doesn't matter",
              "They should never be used together",
            ],
            1,
            "Regenerating the ID is a reward for a successful login, not something to do before you know the credentials are even valid — verify first, then regenerate.",
          ),
        ],
        challenge: {
          title: "Build the Complete Secure Login",
          description: "$_POST has username='ada', password='secret123'. Given $validUsers=['ada'=>'secret123'], verify, regenerate the session ID, store user_id, and echo \"Welcome, ada!\" or \"Invalid credentials\".",
          starterCode: `${PHP_MAIN}session_start();\n$validUsers = ['ada' => 'secret123'];\n$_POST['username'] = 'ada';\n$_POST['password'] = 'secret123';\n\n// full secure login flow`,
          solutionCode: `${PHP_MAIN}session_start();\n$validUsers = ['ada' => 'secret123'];\n$_POST['username'] = 'ada';\n$_POST['password'] = 'secret123';\n\n$username = $_POST['username'] ?? '';\n$password = $_POST['password'] ?? '';\n\nif (isset($validUsers[$username]) && $validUsers[$username] === $password) {\n    session_regenerate_id(true);\n    $_SESSION['user_id'] = $username;\n    echo "Welcome, $username!";\n} else {\n    echo "Invalid credentials";\n}`,
          tests: [
            { id: 1, label: "Verifies credentials", keywords: [{ pattern: "\\$validUsers\\[" }] },
            { id: 2, label: "Regenerates session id", keywords: [{ pattern: "session_regenerate_id" }] },
            { id: 3, label: "Stores user_id", keywords: [{ pattern: "\\$_SESSION\\['user_id'\\]" }] },
          ],
        },
      },
    ],
  },
];

export const PHP_SESSIONS_LESSONS = PHP_SESSIONS_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const PHP_SESSIONS_TOTAL_XP = PHP_SESSIONS_LESSONS.reduce(
  (sum, l) => sum + (l.xp || 0),
  0,
);
