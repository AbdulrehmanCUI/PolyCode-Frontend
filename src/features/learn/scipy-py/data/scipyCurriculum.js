// PolyCode — SciPy (Python) full curriculum
// 8 chapters · 25 lessons · Python coding challenges
// YouTube links: edit scipyVideoLinks.js (not this file).

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { SCIPY_VIDEO_LINKS } from "./scipyVideoLinks";
import { SCIPY_LESSON_OUTCOMES } from "./scipyLessonOutcomes";

function quiz(question, options, answer, explanation) {
  return { type: "quiz", question, options, answer, explanation };
}

function challenge(title, description, starterCode, solutionCode, tests) {
  return { title, description, starterCode, solutionCode, tests };
}

function kw(id, label, hint, pattern) {
  return { id, label, hint, keywords: [{ pattern }] };
}

export const SCIPY_CHAPTERS = [
  {
    id: "intro",
    title: "Welcome to SciPy",
    icon: "microscope",
    color: "#0d9488",
    lessons: [
      {
        id: "scipy-0",
        title: "What is SciPy?",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "**Definition:** **SciPy** is a free Python library for **scientific computing**. It gives you ready-made tools for hard math jobs — integrating curves, finding best values, statistics, signals, and more — all built to work with **NumPy arrays**.\n\n**Real-life example:** A weather team has hourly rainfall numbers. They want the *total water* for the day (area under the rain curve). Writing that math from scratch is slow. SciPy has integration tools that do it in a few lines.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• What SciPy is for\n• Why it sits next to NumPy\n• The big tool groups you will meet in this course",
          },
          {
            type: "diagram",
            title: "SciPy’s purpose",
            nodes: [
              {
                id: "numpy",
                label: "NumPy arrays",
                color: "#0d9488",
                items: ["Fast number grids", "Your raw data"],
              },
              {
                id: "scipy",
                label: "SciPy tools",
                color: "#14b8a6",
                items: ["Integrate", "Optimize", "Stats & signals"],
              },
              {
                id: "out",
                label: "Answers",
                color: "#06b6d4",
                items: ["Totals", "Best values", "Reports"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Say hello to SciPy",
            content: `import scipy
import numpy as np

print("SciPy version:", scipy.__version__)
print("NumPy ready:", np.array([1, 2, 3]))`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Tip:** Think of NumPy as the **notebook paper** and SciPy as the **calculator apps** that write on that paper.",
          },
          quiz(
            "SciPy is mainly used for…",
            [
              "Building websites",
              "Scientific computing on top of NumPy",
              "Editing photos only",
              "Sending emails",
            ],
            1,
            "SciPy is a scientific toolkit that works with NumPy arrays.",
          ),
        ],
        challenge: challenge(
          "Meet SciPy",
          "Import scipy and numpy as np. Print scipy.__version__ and print the sum of np.array([10, 20, 30]).",
          `import scipy
import numpy as np
# print version and array sum
`,
          `import scipy
import numpy as np
print(scipy.__version__)
print(np.array([10, 20, 30]).sum())`,
          [
            kw(1, "Imports scipy", "import scipy", "import\\s+scipy"),
            kw(2, "Imports numpy", "import numpy as np", "import\\s+numpy\\s+as\\s+np"),
            kw(3, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-1",
        title: "Why Scientists Love SciPy",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "**Definition:** People use SciPy because it saves time. Instead of inventing every formula, you call **battle-tested functions** written by scientists and engineers.\n\n**Real-life example:** A pharmacy models how a medicine level rises and falls in the blood. They need curves, integrals, and fits. SciPy already has those building blocks.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• Why SciPy is popular in labs and industry\n• Common problem types SciPy solves\n• How this course is sequenced",
          },
          {
            type: "table",
            title: "Everyday SciPy jobs",
            columns: ["Need", "SciPy area", "Example"],
            rows: [
              {
                label: "area",
                values: ["Total under a curve", "integrate", "Rainfall total"],
              },
              {
                label: "best",
                values: ["Best setting", "optimize", "Lowest delivery cost"],
              },
              {
                label: "gaps",
                values: ["Fill missing points", "interpolate", "GPS track gaps"],
              },
              {
                label: "chance",
                values: ["Chance & tests", "stats", "Exam score patterns"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "A tiny science-style calculation",
            content: `import numpy as np
from scipy import special

# erf appears in probability & heat problems
print("erf(0) =", special.erf(0))
print("erf(1) ≈", round(float(special.erf(1)), 4))`,
          },
          quiz(
            "Which reason best explains SciPy’s popularity?",
            [
              "It replaces Python completely",
              "It offers trusted science tools on NumPy data",
              "It only draws charts",
              "It cannot work with arrays",
            ],
            1,
            "SciPy is loved because it gives reliable scientific tools that use NumPy arrays.",
          ),
        ],
        challenge: challenge(
          "Special hello",
          "From scipy import special. Print special.erf(0).",
          `from scipy import special
# print erf(0)
`,
          `from scipy import special
print(special.erf(0))`,
          [
            kw(1, "Imports special", "from scipy import special", "from\\s+scipy\\s+import\\s+special"),
            kw(2, "Uses erf", "special.erf", "special\\.erf\\s*\\("),
            kw(3, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-2",
        title: "SciPy and NumPy Together",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "**Definition:** **NumPy** stores and computes on arrays. **SciPy** adds higher-level science algorithms that take those arrays as input.\n\n**Real-life example:** NumPy holds temperature readings for a week. SciPy can help you integrate, fit, or test ideas on that same array.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• The teamwork between NumPy and SciPy\n• A simple pattern: create array → call SciPy\n• When NumPy alone is enough",
          },
          {
            type: "diagram",
            title: "Team pattern",
            nodes: [
              {
                id: "make",
                label: "1. Make data",
                color: "#0d9488",
                items: ["np.array(...)", "Clean numbers"],
              },
              {
                id: "call",
                label: "2. Call SciPy",
                color: "#14b8a6",
                items: ["integrate", "optimize", "stats"],
              },
              {
                id: "read",
                label: "3. Read result",
                color: "#06b6d4",
                items: ["Print", "Compare", "Decide"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "NumPy data → SciPy helper",
            content: `import numpy as np
from scipy import stats

scores = np.array([70, 82, 88, 95, 76])
print("Mean:", scores.mean())
print("SciPy describe nobs:", stats.describe(scores).nobs)`,
          },
          quiz(
            "A good workflow is…",
            [
              "Avoid NumPy when using SciPy",
              "Build arrays with NumPy, then call SciPy tools",
              "Only use SciPy for strings",
              "Never print results",
            ],
            1,
            "NumPy prepares the data; SciPy solves the science step.",
          ),
        ],
        challenge: challenge(
          "Describe scores",
          "Make scores = np.array([10, 20, 30, 40]). Print stats.describe(scores).nobs using scipy.stats.",
          `import numpy as np
from scipy import stats
# create scores and print nobs
`,
          `import numpy as np
from scipy import stats
scores = np.array([10, 20, 30, 40])
print(stats.describe(scores).nobs)`,
          [
            kw(1, "Uses stats", "scipy.stats", "stats\\.describe\\s*\\("),
            kw(2, "Uses np.array", "np.array", "np\\.array\\s*\\("),
            kw(3, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-3",
        title: "Your First SciPy Import",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "**Definition:** You usually import **one SciPy module** at a time, such as `from scipy import integrate`, instead of loading everything.\n\n**Real-life example:** A toolbox has many drawers. You open only the *integrate* drawer when you need area under a curve.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• Clean import style\n• How to try a first function safely\n• How the later chapters map to modules",
          },
          {
            type: "table",
            title: "Course map → modules",
            columns: ["Chapter idea", "Import style"],
            rows: [
              { label: "1", values: ["Special functions", "`from scipy import special`"] },
              { label: "2", values: ["Integration", "`from scipy import integrate`"] },
              { label: "3", values: ["Optimization", "`from scipy import optimize`"] },
              { label: "4", values: ["Statistics", "`from scipy import stats`"] },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "First integrate import",
            content: `from scipy import integrate
import numpy as np

def f(x):
    return x

area, err = integrate.quad(f, 0, 1)
print("Area of y=x from 0 to 1:", area)
print("Error estimate:", err)`,
          },
          {
            type: "callout",
            variant: "success",
            content:
              "**You are ready.** Next chapters go deeper — always starting with a definition and a real example.",
          },
          quiz(
            "Preferred SciPy import style is…",
            [
              "Always import every module at once",
              "Import the module you need, e.g. from scipy import integrate",
              "Never import NumPy",
              "Only use import *",
            ],
            1,
            "Import the SciPy submodule you need for the job.",
          ),
        ],
        challenge: challenge(
          "First quad",
          "Import integrate from scipy. Define f(x)=x. Print integrate.quad(f, 0, 2)[0].",
          `from scipy import integrate
# define f and print quad result [0]
`,
          `from scipy import integrate

def f(x):
    return x

print(integrate.quad(f, 0, 2)[0])`,
          [
            kw(1, "Imports integrate", "from scipy import integrate", "from\\s+scipy\\s+import\\s+integrate"),
            kw(2, "Uses quad", "integrate.quad", "integrate\\.quad\\s*\\("),
            kw(3, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
    ],
  },
  {
    id: "special",
    title: "Special Functions",
    icon: "sparkles",
    color: "#14b8a6",
    lessons: [
      {
        id: "scipy-4",
        title: "What Are Special Functions?",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "**Definition:** **Special functions** are famous math helpers that appear so often in science that libraries give them their own names — like gamma, erf, and Bessel.\n\n**Real-life example:** Heat moving through a wall, or probabilities in a bell curve, often need the **error function** `erf`. SciPy computes it for you.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• What “special” means here\n• Where to find them: `scipy.special`\n• Why not reinvent them",
          },
          {
            type: "scenario",
            title: "Think of it like this",
            content:
              "A chef keeps a spice rack of common flavors. Special functions are the spice rack of math — ready when a formula calls for them.",
          },
          {
            type: "code",
            lang: "python",
            label: "Peek at special",
            content: `from scipy import special
print("gamma(5) =", special.gamma(5))
print("factorial flavor: 4! related to gamma(5)")`,
          },
          quiz(
            "scipy.special is for…",
            [
              "Drawing maps",
              "Well-known scientific helper functions",
              "Only sorting lists",
              "HTML pages",
            ],
            1,
            "scipy.special provides classic mathematical special functions.",
          ),
        ],
        challenge: challenge(
          "Gamma check",
          "From scipy import special. Print special.gamma(6).",
          `from scipy import special
`,
          `from scipy import special
print(special.gamma(6))`,
          [
            kw(1, "Imports special", "from scipy import special", "from\\s+scipy\\s+import\\s+special"),
            kw(2, "Uses gamma", "special.gamma", "special\\.gamma\\s*\\("),
            kw(3, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-5",
        title: "Gamma, erf, and Everyday Helpers",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "**Introduction:** SciPy gives you ready-made math helpers so you do not have to invent hard formulas yourself.\n\nTwo useful ones are **`gamma`** and **`erf`**:\n\n• **`gamma`** is connected to the **factorial** idea. For example, `gamma(5)` equals `4!`, which is **24**. When a formula needs a factorial-style value, call `gamma` instead of writing the math by hand.\n• **`erf`** (short for *error function*) shows up in everyday science work — probability, measurement error, heat, and diffusion. You do not need every detail of the formula. SciPy already knows how to compute it.\n• SciPy provides these helpers so beginners can use them without building complicated math from scratch.\n\n**Real-life example:** In a lab, the same measurement is rarely identical every time — small errors appear again and again. Tools like `erf` help scientists work with those small variations.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• Call `special.gamma` and `special.erf`\n• Read simple outputs\n• Use them on single numbers first",
          },
          {
            type: "table",
            title: "Quick helper sheet",
            columns: ["Function", "Plain idea", "Try"],
            rows: [
              { label: "g", values: ["`gamma(n)`", "Factorial-related", "`gamma(5)` → 24"] },
              { label: "e", values: ["`erf(x)`", "Error function", "`erf(0)` → 0"] },
              { label: "x", values: ["`expit(x)`", "Smooth 0–1 curve", "Useful in ML stories"] },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "gamma and erf",
            content: `from scipy import special
print("gamma(5) =", special.gamma(5))
print("erf(0) =", special.erf(0))
print("erf(1) ≈", round(float(special.erf(1)), 4))`,
          },
          quiz(
            "What does erf(0) return?",
            ["1", "0", "Infinity", "5"],
            1,
            "erf(0) is 0.",
          ),
        ],
        challenge: challenge(
          "Two helpers",
          "Print special.gamma(4) and special.erf(0) on separate lines.",
          `from scipy import special
`,
          `from scipy import special
print(special.gamma(4))
print(special.erf(0))`,
          [
            kw(1, "Uses gamma", "special.gamma", "special\\.gamma\\s*\\("),
            kw(2, "Uses erf", "special.erf", "special\\.erf\\s*\\("),
            kw(3, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-6",
        title: "Using Special Functions in Practice",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "**Definition:** In practice, you pass **arrays** of values into special functions so every item is transformed at once.\n\n**Real-life example:** A teacher converts a list of z-scores through a smooth curve to show relative standing. Array-friendly helpers keep the code short.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• Apply special functions to NumPy arrays\n• Combine `np` + `special`\n• Print a small report",
          },
          {
            type: "code",
            lang: "python",
            label: "Array in, array out",
            content: `import numpy as np
from scipy import special

x = np.array([0.0, 0.5, 1.0])
print("erf(x) =", special.erf(x))
print("expit(x) =", special.expit(x))`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Tip:** Start with one number. When that works, pass a whole array.",
          },
          quiz(
            "Special functions in SciPy can…",
            [
              "Only accept strings",
              "Work on NumPy arrays of numbers",
              "Only run offline on paper",
              "Replace the Python language",
            ],
            1,
            "They accept arrays and return transformed values.",
          ),
        ],
        challenge: challenge(
          "erf on an array",
          "Create x = np.array([0.0, 1.0]). Print special.erf(x).",
          `import numpy as np
from scipy import special
`,
          `import numpy as np
from scipy import special
x = np.array([0.0, 1.0])
print(special.erf(x))`,
          [
            kw(1, "Uses np.array", "np.array", "np\\.array\\s*\\("),
            kw(2, "Uses erf", "special.erf", "special\\.erf\\s*\\("),
            kw(3, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
    ],
  },
  {
    id: "integrate",
    title: "Integration",
    icon: "function-square",
    color: "#06b6d4",
    lessons: [
      {
        id: "scipy-7",
        title: "What is Numerical Integration?",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "**Definition:** **Numerical integration** means estimating the **area under a curve** using computer-friendly steps when a neat pencil-and-paper antiderivative is hard.\n\n**Real-life example:** A river sensor records flow every hour. Total water for the day is the area under that flow curve.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• What “area under the curve” means\n• Why SciPy helps\n• The idea behind `quad`",
          },
          {
            type: "diagram",
            title: "Integration idea",
            nodes: [
              {
                id: "curve",
                label: "Curve y = f(x)",
                color: "#06b6d4",
                items: ["Height at each x"],
              },
              {
                id: "area",
                label: "Area between limits",
                color: "#0d9488",
                items: ["From a to b", "Total quantity"],
              },
              {
                id: "quad",
                label: "SciPy quad",
                color: "#14b8a6",
                items: ["Estimate", "Error size"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Area of a constant",
            content: `from scipy import integrate

def flat(x):
    return 2

area, err = integrate.quad(flat, 0, 3)
print("Area:", area)  # 2 * 3 = 6
print("Err:", err)`,
          },
          quiz(
            "Numerical integration estimates…",
            [
              "File sizes",
              "Area under a curve between limits",
              "Only integer factorials",
              "Website traffic only",
            ],
            1,
            "It estimates area (or total) under a function between limits.",
          ),
        ],
        challenge: challenge(
          "Flat area",
          "Define f(x)=5. Print integrate.quad(f, 0, 2)[0].",
          `from scipy import integrate
`,
          `from scipy import integrate

def f(x):
    return 5

print(integrate.quad(f, 0, 2)[0])`,
          [
            kw(1, "Uses quad", "integrate.quad", "integrate\\.quad\\s*\\("),
            kw(2, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-8",
        title: "Area Under a Curve with quad",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "**Definition:** **`integrate.quad(f, a, b)`** estimates the integral of `f` from `a` to `b`. It returns `(result, error_estimate)`.\n\n**Real-life example:** Power usage over 8 hours — integrate the power curve to get energy.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• Write a Python function for f(x)\n• Call `quad` with limits\n• Print the area",
          },
          {
            type: "code",
            lang: "python",
            label: "Integrate x squared",
            content: `from scipy import integrate

def f(x):
    return x ** 2

area, err = integrate.quad(f, 0, 1)
print("∫ x² dx from 0 to 1 ≈", area)
print("True value is 1/3 ≈", 1 / 3)`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**Remember:** `quad` returns two values. Use `[0]` when you only need the area.",
          },
          quiz(
            "integrate.quad(f, 0, 1) returns…",
            [
              "Only a string",
              "A (result, error) pair",
              "A plot image only",
              "A dictionary of colors",
            ],
            1,
            "quad returns the estimated integral and an error estimate.",
          ),
        ],
        challenge: challenge(
          "Quad x²",
          "Integrate x**2 from 0 to 2 with quad and print the result (index 0).",
          `from scipy import integrate
`,
          `from scipy import integrate

def f(x):
    return x ** 2

print(integrate.quad(f, 0, 2)[0])`,
          [
            kw(1, "Defines power", "x ** 2 or x**2", "\\*\\*\\s*2"),
            kw(2, "Uses quad", "integrate.quad", "integrate\\.quad\\s*\\("),
            kw(3, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-9",
        title: "Tips for Reliable Integrals",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "**Definition:** A **reliable integral** uses the right limits, a clear function, and a quick sanity check (rough mental estimate or known answer).\n\n**Real-life example:** If rainfall is about 2 mm/hour for 5 hours, the total near 10 mm should match your integral — if SciPy says 10,000, you swapped units or limits.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• Check limits a < b intentionally\n• Read the error estimate\n• Compare with a simple known case",
          },
          {
            type: "table",
            title: "Sanity checklist",
            columns: ["Check", "Why"],
            rows: [
              { label: "1", values: ["Limits correct?", "Wrong window → wrong total"] },
              { label: "2", values: ["Function units clear?", "Hours vs minutes mix-ups"] },
              { label: "3", values: ["Error tiny?", "Huge error → investigate"] },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Check error too",
            content: `from scipy import integrate

def f(x):
    return x

area, err = integrate.quad(f, 0, 4)
print("Area:", area)
print("Error estimate:", err)
print("Expected:", 8.0)`,
          },
          quiz(
            "If the error estimate is huge, you should…",
            [
              "Ignore it always",
              "Investigate limits/function carefully",
              "Delete SciPy",
              "Only use strings",
            ],
            1,
            "A large error estimate is a warning to double-check your setup.",
          ),
        ],
        challenge: challenge(
          "Print area and err",
          "For f(x)=x from 1 to 3, unpack area, err = integrate.quad(...). Print both.",
          `from scipy import integrate
`,
          `from scipy import integrate

def f(x):
    return x

area, err = integrate.quad(f, 1, 3)
print(area)
print(err)`,
          [
            kw(1, "Uses quad", "integrate.quad", "integrate\\.quad\\s*\\("),
            kw(2, "Prints twice", "print", "print\\s*\\("),
          ],
        ),
      },
    ],
  },
  {
    id: "optimize",
    title: "Optimization",
    icon: "target",
    color: "#8b5cf6",
    lessons: [
      {
        id: "scipy-10",
        title: "What is Optimization?",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "**Definition:** **Optimization** means searching for the **best** value of something — often the lowest cost or highest score — by adjusting inputs.\n\n**Real-life example:** A delivery app wants the cheapest route fuel cost. It tries settings until the cost function is as small as possible.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• What minimize means\n• Why we give a starting guess\n• Where `scipy.optimize` fits",
          },
          {
            type: "scenario",
            title: "Valley hike",
            content:
              "Imagine standing on a hilly path in fog. Optimization is carefully stepping downhill until you reach the valley floor — the minimum.",
          },
          {
            type: "code",
            lang: "python",
            label: "Import the toolbox",
            content: `from scipy import optimize
import numpy as np

def cost(x):
    return (x - 3) ** 2

print("Cost at 0:", cost(0))
print("Cost at 3:", cost(3))`,
          },
          quiz(
            "Optimization often means…",
            [
              "Making files larger",
              "Finding best inputs for a goal (min/max)",
              "Only sorting names",
              "Drawing icons",
            ],
            1,
            "You search for inputs that make a goal as good as possible.",
          ),
        ],
        challenge: challenge(
          "Cost at a point",
          "Define cost(x)=(x-2)**2. Print cost(5).",
          `import numpy as np
`,
          `def cost(x):
    return (x - 2) ** 2

print(cost(5))`,
          [
            kw(1, "Defines cost", "def cost", "def\\s+cost\\s*\\("),
            kw(2, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-11",
        title: "Find a Minimum with minimize",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "**Definition:** **`optimize.minimize(fun, x0)`** starts at guess `x0` and searches for an input that makes `fun` small.\n\n**Real-life example:** Set thermostat-related energy cost `fun`, start near today’s setting, let SciPy walk toward a cheaper point.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• Call `minimize`\n• Read `.x` (best input) and `.fun` (best value)\n• Use a 1D example first",
          },
          {
            type: "code",
            lang: "python",
            label: "Minimize a parabola",
            content: `from scipy import optimize

def cost(x):
    return (x - 3) ** 2

result = optimize.minimize(cost, x0=0.0)
print("Best x ≈", result.x[0])
print("Best cost ≈", result.fun)`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Tip:** A bad starting guess can land in the wrong valley. Try a sensible `x0`.",
          },
          quiz(
            "After minimize, result.x is…",
            [
              "The best input found",
              "Always None",
              "A plot only",
              "The error message",
            ],
            0,
            "result.x holds the optimizing input values.",
          ),
        ],
        challenge: challenge(
          "Minimize (x-4)**2",
          "Minimize (x-4)**2 starting at x0=0. Print result.x[0].",
          `from scipy import optimize
`,
          `from scipy import optimize

def cost(x):
    return (x - 4) ** 2

result = optimize.minimize(cost, x0=0.0)
print(result.x[0])`,
          [
            kw(1, "Uses minimize", "optimize.minimize", "optimize\\.minimize\\s*\\("),
            kw(2, "Uses result.x", "result.x", "result\\.x"),
            kw(3, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-12",
        title: "Roots and Curve Fitting Basics",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "**Definition:** A **root** is where a function crosses zero. **Curve fitting** finds parameters so a model curve matches data points.\n\n**Real-life example:** Find when a cooling drink reaches room temperature (root of temperature − room). Or fit a growth curve to plant height data.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• Find a root with `root_scalar`\n• Meet `curve_fit` at a gentle level\n• Keep examples tiny and printable",
          },
          {
            type: "code",
            lang: "python",
            label: "Find a root",
            content: `from scipy import optimize

def f(x):
    return x ** 2 - 4

sol = optimize.root_scalar(f, bracket=[0, 3])
print("Root ≈", sol.root)`,
          },
          quiz(
            "A root of f is a value where…",
            ["f(x) is huge", "f(x) = 0", "x is always 100", "SciPy crashes"],
            1,
            "Roots are solutions to f(x) = 0.",
          ),
        ],
        challenge: challenge(
          "Root of x**2 - 9",
          "Use optimize.root_scalar on f(x)=x**2-9 with bracket=[0, 5]. Print sol.root.",
          `from scipy import optimize
`,
          `from scipy import optimize

def f(x):
    return x ** 2 - 9

sol = optimize.root_scalar(f, bracket=[0, 5])
print(sol.root)`,
          [
            kw(1, "Uses root_scalar", "root_scalar", "root_scalar\\s*\\("),
            kw(2, "Prints root", "sol.root", "\\.root"),
          ],
        ),
      },
    ],
  },
  {
    id: "interpolate",
    title: "Interpolation",
    icon: "trending-up",
    color: "#a855f7",
    lessons: [
      {
        id: "scipy-13",
        title: "What is Interpolation?",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "**Definition:** **Interpolation** estimates values **between** known data points.\n\n**Real-life example:** A GPS records a location every 10 seconds. Interpolation estimates where you were at 10.5 seconds.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• Why gaps appear in data\n• What interpolation does (and does not invent beyond the ends)\n• The module `scipy.interpolate`",
          },
          {
            type: "diagram",
            title: "Known points → estimate between",
            nodes: [
              {
                id: "known",
                label: "Known samples",
                color: "#a855f7",
                items: ["(1, 2)", "(3, 6)"],
              },
              {
                id: "fill",
                label: "Interpolate",
                color: "#8b5cf6",
                items: ["Estimate at x=2"],
              },
              {
                id: "out",
                label: "Filled value",
                color: "#6366f1",
                items: ["Smooth enough guess"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Idea with numbers",
            content: `import numpy as np
x = np.array([0, 2, 4])
y = np.array([0, 4, 8])
print("At x=2 we already know y=", 4)
print("Interpolation will help for x=1 or x=3")`,
          },
          quiz(
            "Interpolation estimates values…",
            [
              "Only far outside the data",
              "Between known points",
              "Only for text files",
              "Never from sensors",
            ],
            1,
            "Interpolation fills values between measured points.",
          ),
        ],
        challenge: challenge(
          "State the idea",
          "Create x=np.array([0,1,2]) and y=np.array([0,10,20]). Print y[1].",
          `import numpy as np
`,
          `import numpy as np
x = np.array([0, 1, 2])
y = np.array([0, 10, 20])
print(y[1])`,
          [
            kw(1, "Uses np.array", "np.array", "np\\.array\\s*\\("),
            kw(2, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-14",
        title: "Fill Gaps with interp1d",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "**Definition:** **`interp1d(x, y)`** builds a callable that estimates `y` for new `x` values between your samples.\n\n**Real-life example:** Temperature logged every hour — estimate the temperature at 2:30.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• Build an interpolator\n• Call it like a function\n• Start with `kind='linear'`",
          },
          {
            type: "code",
            lang: "python",
            label: "Linear interp1d",
            content: `import numpy as np
from scipy.interpolate import interp1d

x = np.array([0, 2, 4])
y = np.array([0, 4, 8])
f = interp1d(x, y, kind="linear")
print("Estimate at 1:", float(f(1)))
print("Estimate at 3:", float(f(3)))`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "**Note:** Basic interp1d estimates *between* points. Asking far outside the range needs special settings.",
          },
          quiz(
            "interp1d returns…",
            [
              "A callable that estimates y for new x",
              "Only a PNG image",
              "A SQL database",
              "A random password",
            ],
            0,
            "You get a function-like object to evaluate new x values.",
          ),
        ],
        challenge: challenge(
          "Estimate middle",
          "With x=[0,10], y=[0,100], build interp1d and print float(f(5)).",
          `import numpy as np
from scipy.interpolate import interp1d
`,
          `import numpy as np
from scipy.interpolate import interp1d
x = np.array([0, 10])
y = np.array([0, 100])
f = interp1d(x, y, kind="linear")
print(float(f(5)))`,
          [
            kw(1, "Uses interp1d", "interp1d", "interp1d\\s*\\("),
            kw(2, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-15",
        title: "Smooth Paths with Splines",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "**Definition:** A **spline** interpolator draws a smoother curve through points than a plain zigzag of straight lines.\n\n**Real-life example:** Animation paths or soft sensor curves often look better with cubic splines (`kind='cubic'` when you have enough points).",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• Try cubic interpolation\n• Compare the idea to linear\n• Keep enough sample points",
          },
          {
            type: "code",
            lang: "python",
            label: "Cubic interp1d",
            content: `import numpy as np
from scipy.interpolate import interp1d

x = np.array([0, 1, 2, 3, 4])
y = np.array([0, 1, 0, 1, 0])
f = interp1d(x, y, kind="cubic")
print("Smooth estimate at 1.5:", round(float(f(1.5)), 4))`,
          },
          quiz(
            "Cubic interpolation is used to…",
            [
              "Delete all data",
              "Make a smoother path through points",
              "Only sort integers",
              "Compile C++",
            ],
            1,
            "Cubic splines create smoother interpolations when you have enough points.",
          ),
        ],
        challenge: challenge(
          "Cubic at 1.5",
          "Use interp1d with kind='cubic' on x=0..4 and y=[0,1,0,1,0]. Print float(f(2.5)).",
          `import numpy as np
from scipy.interpolate import interp1d
`,
          `import numpy as np
from scipy.interpolate import interp1d
x = np.array([0, 1, 2, 3, 4])
y = np.array([0, 1, 0, 1, 0])
f = interp1d(x, y, kind="cubic")
print(float(f(2.5)))`,
          [
            kw(1, "Uses cubic", "kind cubic", "kind\\s*=\\s*[\"']cubic[\"']"),
            kw(2, "Uses interp1d", "interp1d", "interp1d\\s*\\("),
            kw(3, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
    ],
  },
  {
    id: "stats",
    title: "Statistics",
    icon: "bar-chart",
    color: "#6366f1",
    lessons: [
      {
        id: "scipy-16",
        title: "Distributions in Plain Words",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "**Definition:** A **distribution** describes how likely different outcomes are — the pattern of chance.\n\n**Real-life example:** Bus arrival delays often cluster near a typical value with fewer extreme waits — a distribution idea.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• What a distribution is\n• Meet a normal distribution helper\n• Sample or evaluate simple values",
          },
          {
            type: "code",
            lang: "python",
            label: "Normal distribution helper",
            content: `from scipy import stats

norm = stats.norm(loc=0, scale=1)
print("PDF at 0:", norm.pdf(0))
print("CDF at 0:", norm.cdf(0))`,
          },
          quiz(
            "A distribution describes…",
            [
              "Only file folders",
              "The pattern of chance for outcomes",
              "HTML colors",
              "Keyboard shortcuts",
            ],
            1,
            "Distributions model how probable different values are.",
          ),
        ],
        challenge: challenge(
          "Normal pdf",
          "Create stats.norm(loc=0, scale=1) and print its pdf(0).",
          `from scipy import stats
`,
          `from scipy import stats
norm = stats.norm(loc=0, scale=1)
print(norm.pdf(0))`,
          [
            kw(1, "Uses norm", "stats.norm", "stats\\.norm\\s*\\("),
            kw(2, "Uses pdf", ".pdf", "\\.pdf\\s*\\("),
            kw(3, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-17",
        title: "Describe Your Data",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "**Definition:** **Descriptive stats** summarize a list of numbers — count, mean, variance, min, max — so you see the story quickly.\n\n**Real-life example:** Class quiz scores: what is typical? How spread out are they?",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• Use `stats.describe`\n• Read nobs and mean\n• Pair with NumPy arrays",
          },
          {
            type: "table",
            title: "Useful fields",
            columns: ["Field", "Meaning"],
            rows: [
              { label: "n", values: ["nobs", "How many values"] },
              { label: "m", values: ["mean", "Typical center"] },
              { label: "v", values: ["variance", "Spread"] },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Describe scores",
            content: `import numpy as np
from scipy import stats

scores = np.array([88, 92, 76, 95, 84])
d = stats.describe(scores)
print("nobs:", d.nobs)
print("mean:", d.mean)`,
          },
          quiz(
            "stats.describe is best for…",
            [
              "Summarizing a numeric sample",
              "Training deep nets only",
              "Editing videos",
              "DNS lookups",
            ],
            0,
            "describe summarizes count, mean, variance, and more.",
          ),
        ],
        challenge: challenge(
          "Describe mean",
          "For scores = np.array([10, 20, 30]), print stats.describe(scores).mean.",
          `import numpy as np
from scipy import stats
`,
          `import numpy as np
from scipy import stats
scores = np.array([10, 20, 30])
print(stats.describe(scores).mean)`,
          [
            kw(1, "Uses describe", "stats.describe", "stats\\.describe\\s*\\("),
            kw(2, "Uses mean", ".mean", "\\.mean"),
            kw(3, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-18",
        title: "A Gentle Hypothesis Test",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "**Definition:** A **hypothesis test** asks whether data look surprising under a simple assumption. A **p-value** helps judge that surprise (carefully!).\n\n**Real-life example:** Did a new study method change average scores, or could the difference be random luck?",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• Run a simple t-test style example\n• Read a p-value gently\n• Stay humble — context matters",
          },
          {
            type: "code",
            lang: "python",
            label: "One-sample t-test idea",
            content: `import numpy as np
from scipy import stats

sample = np.array([20, 22, 19, 21, 23])
stat, p = stats.ttest_1samp(sample, popmean=20)
print("statistic:", stat)
print("p-value:", p)`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "**Careful:** A p-value is not “proof.” It is one clue. Always think about the question and the data quality.",
          },
          quiz(
            "A p-value helps you…",
            [
              "Judge how surprising data are under an assumption",
              "Compile Java",
              "Resize images",
              "Name variables",
            ],
            0,
            "p-values help interpret evidence against a simple assumption.",
          ),
        ],
        challenge: challenge(
          "ttest_1samp",
          "Run stats.ttest_1samp on np.array([10,12,11,13,12]) with popmean=10. Print the p-value (second return).",
          `import numpy as np
from scipy import stats
`,
          `import numpy as np
from scipy import stats
sample = np.array([10, 12, 11, 13, 12])
stat, p = stats.ttest_1samp(sample, popmean=10)
print(p)`,
          [
            kw(1, "Uses ttest_1samp", "ttest_1samp", "ttest_1samp\\s*\\("),
            kw(2, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
    ],
  },
  {
    id: "linalg",
    title: "Linear Algebra",
    icon: "hash",
    color: "#4f46e5",
    lessons: [
      {
        id: "scipy-19",
        title: "SciPy linalg vs NumPy",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "**Definition:** Both NumPy and SciPy offer linear algebra. **`scipy.linalg`** adds more solvers and routines on top of the same matrix ideas.\n\n**Real-life example:** Balancing ingredients in recipes scaled as equations — matrices and solvers find amounts that fit constraints.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• When to open `scipy.linalg`\n• Import style\n• A tiny det example",
          },
          {
            type: "code",
            lang: "python",
            label: "Determinant with SciPy",
            content: `import numpy as np
from scipy import linalg

A = np.array([[1.0, 2.0], [3.0, 4.0]])
print("det:", linalg.det(A))`,
          },
          quiz(
            "scipy.linalg is mainly for…",
            [
              "Matrix and linear-algebra routines",
              "CSS styling",
              "Email servers",
              "Only plotting pies",
            ],
            0,
            "It focuses on linear algebra tools.",
          ),
        ],
        challenge: challenge(
          "Matrix det",
          "For A = [[2,0],[0,3]], print linalg.det(A).",
          `import numpy as np
from scipy import linalg
`,
          `import numpy as np
from scipy import linalg
A = np.array([[2.0, 0.0], [0.0, 3.0]])
print(linalg.det(A))`,
          [
            kw(1, "Uses linalg.det", "linalg.det", "linalg\\.det\\s*\\("),
            kw(2, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-20",
        title: "Solve Equations & Inverses",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "**Definition:** **`linalg.solve(A, b)`** finds `x` in `A x = b`. An **inverse** undoes a matrix multiply when it exists.\n\n**Real-life example:** Two shop deals with unknown item prices — two equations, two unknowns — solve the system.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• Solve a 2×2 system\n• Compute an inverse\n• Check `A @ x` ≈ `b`",
          },
          {
            type: "code",
            lang: "python",
            label: "Solve Ax = b",
            content: `import numpy as np
from scipy import linalg

A = np.array([[3.0, 1.0], [1.0, 2.0]])
b = np.array([9.0, 8.0])
x = linalg.solve(A, b)
print("x =", x)
print("Check A@x =", A @ x)`,
          },
          quiz(
            "linalg.solve(A, b) finds…",
            ["x in A x = b", "Only file paths", "HTML tags", "Random colors"],
            0,
            "It solves the linear system for x.",
          ),
        ],
        challenge: challenge(
          "Solve system",
          "Solve A=[[1,0],[0,2]], b=[4,10] with linalg.solve. Print x.",
          `import numpy as np
from scipy import linalg
`,
          `import numpy as np
from scipy import linalg
A = np.array([[1.0, 0.0], [0.0, 2.0]])
b = np.array([4.0, 10.0])
x = linalg.solve(A, b)
print(x)`,
          [
            kw(1, "Uses solve", "linalg.solve", "linalg\\.solve\\s*\\("),
            kw(2, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-21",
        title: "Eigenvalues Made Simple",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "**Definition:** **Eigenvalues** describe special stretch factors of a matrix — directions that only scale, not twist.\n\n**Real-life example:** Vibration modes of a bridge or guitar string relate to eigen-ideas: natural frequencies.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• Compute eigenvalues with SciPy\n• Read the printed numbers\n• Keep the story intuitive",
          },
          {
            type: "code",
            lang: "python",
            label: "Eigenvalues",
            content: `import numpy as np
from scipy import linalg

A = np.array([[2.0, 0.0], [0.0, 5.0]])
vals = linalg.eigvals(A)
print("Eigenvalues:", vals)`,
          },
          quiz(
            "Eigenvalues are related to…",
            [
              "Special stretch factors of a matrix",
              "Only JSON parsing",
              "Font sizes",
              "Wi-Fi passwords",
            ],
            0,
            "They are characteristic stretch factors along special directions.",
          ),
        ],
        challenge: challenge(
          "eigvals",
          "For diagonal A=[[4,0],[0,9]], print linalg.eigvals(A).",
          `import numpy as np
from scipy import linalg
`,
          `import numpy as np
from scipy import linalg
A = np.array([[4.0, 0.0], [0.0, 9.0]])
print(linalg.eigvals(A))`,
          [
            kw(1, "Uses eigvals", "linalg.eigvals", "linalg\\.eigvals\\s*\\("),
            kw(2, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
    ],
  },
  {
    id: "signal",
    title: "Signal, FFT & Capstone",
    icon: "radio",
    color: "#7c3aed",
    lessons: [
      {
        id: "scipy-22",
        title: "FFT — Hearing the Frequencies",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "**Definition:** An **FFT** (Fast Fourier Transform) splits a signal into **frequency pieces** — like hearing which notes are inside a sound.\n\n**Real-life example:** A tuning app shows which pitch a guitar string is playing. FFT ideas power that view.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• Build a simple sine signal\n• Run an FFT\n• Spot a strong frequency bin",
          },
          {
            type: "code",
            lang: "python",
            label: "Tiny FFT demo",
            content: `import numpy as np
from scipy.fft import fft, fftfreq

n = 64
t = np.arange(n)
sig = np.sin(2 * np.pi * 3 * t / n)
spec = np.abs(fft(sig))
freqs = fftfreq(n, d=1)
peak = np.argmax(spec[: n // 2])
print("Peak bin:", peak)
print("Peak freq:", freqs[peak])`,
          },
          quiz(
            "FFT helps you see…",
            [
              "Frequency content of a signal",
              "Only file permissions",
              "CSS grids",
              "Git commits",
            ],
            0,
            "FFT reveals frequency components.",
          ),
        ],
        challenge: challenge(
          "FFT magnitude",
          "Create sig = np.array([0,1,0,-1]). Print np.abs(fft(sig)) using scipy.fft.fft.",
          `import numpy as np
from scipy.fft import fft
`,
          `import numpy as np
from scipy.fft import fft
sig = np.array([0.0, 1.0, 0.0, -1.0])
print(np.abs(fft(sig)))`,
          [
            kw(1, "Uses fft", "fft(", "fft\\s*\\("),
            kw(2, "Uses abs", "np.abs", "np\\.abs\\s*\\("),
            kw(3, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-23",
        title: "Simple Signal Peaks",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "**Definition:** **Peak finding** locates local highs in a signal — heartbeats, drum hits, or sensor spikes.\n\n**Real-life example:** A fitness watch finds pulse peaks in a noisy light sensor signal.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• Use `find_peaks`\n• Print peak indexes\n• Keep signals short for practice",
          },
          {
            type: "code",
            lang: "python",
            label: "Find peaks",
            content: `import numpy as np
from scipy.signal import find_peaks

sig = np.array([0, 1, 0, 2, 0, 3, 0])
peaks, _ = find_peaks(sig)
print("Peak indexes:", peaks)
print("Peak values:", sig[peaks])`,
          },
          quiz(
            "find_peaks returns…",
            [
              "Indexes of local highs",
              "Only average rain",
              "SQL rows",
              "Font names",
            ],
            0,
            "It returns the positions of peaks in the signal.",
          ),
        ],
        challenge: challenge(
          "Peak indexes",
          "On sig = np.array([1,3,1,4,1]), print find_peaks(sig)[0].",
          `import numpy as np
from scipy.signal import find_peaks
`,
          `import numpy as np
from scipy.signal import find_peaks
sig = np.array([1, 3, 1, 4, 1])
print(find_peaks(sig)[0])`,
          [
            kw(1, "Uses find_peaks", "find_peaks", "find_peaks\\s*\\("),
            kw(2, "Prints", "print(...)", "print\\s*\\("),
          ],
        ),
      },
      {
        id: "scipy-24",
        title: "Capstone Lab — Science Toolkit",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "**Definition:** This **capstone** combines skills: describe data, integrate a curve, and minimize a cost — a mini science report.\n\n**Real-life example:** A lab notebook page: summarize measurements, total a quantity under a curve, then find a best setting.",
          },
          {
            type: "text",
            content:
              "**In this topic you will learn:**\n\n• Chain stats + integrate + optimize\n• Print a tiny report\n• Celebrate finishing SciPy Mastery",
          },
          {
            type: "diagram",
            title: "Capstone pipeline",
            nodes: [
              {
                id: "data",
                label: "Describe data",
                color: "#6366f1",
                items: ["stats.describe"],
              },
              {
                id: "area",
                label: "Integrate",
                color: "#06b6d4",
                items: ["integrate.quad"],
              },
              {
                id: "best",
                label: "Optimize",
                color: "#8b5cf6",
                items: ["optimize.minimize"],
              },
              {
                id: "report",
                label: "Report",
                color: "#0d9488",
                items: ["Print results"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Mini science toolkit",
            content: `import numpy as np
from scipy import stats, integrate, optimize

data = np.array([2.0, 3.0, 4.0, 5.0])
print("Mean:", stats.describe(data).mean)

def f(x):
    return x
area, _ = integrate.quad(f, 0, 2)
print("Area:", area)

def cost(x):
    return (x - 1) ** 2
best = optimize.minimize(cost, x0=0.0)
print("Best x:", best.x[0])`,
          },
          {
            type: "callout",
            variant: "success",
            content:
              "**Key takeaways:** SciPy extends NumPy with integrate, optimize, interpolate, stats, linalg, and signal/FFT tools. Start from a definition, try a tiny example, then combine tools into pipelines.",
          },
          quiz(
            "A strong SciPy habit is…",
            [
              "Skip checking results",
              "Use NumPy data + the right SciPy module + print checks",
              "Never use arrays",
              "Only memorize theory with no code",
            ],
            1,
            "Combine clear data, the right tool, and readable checks.",
          ),
        ],
        challenge: challenge(
          "Toolkit trio",
          "Print stats.describe(np.array([1.0,2.0,3.0])).mean, then integrate.quad(lambda x: x, 0, 1)[0], then optimize.minimize(lambda x: (x-2)**2, x0=0).x[0].",
          `import numpy as np
from scipy import stats, integrate, optimize
`,
          `import numpy as np
from scipy import stats, integrate, optimize
print(stats.describe(np.array([1.0, 2.0, 3.0])).mean)
print(integrate.quad(lambda x: x, 0, 1)[0])
print(optimize.minimize(lambda x: (x - 2) ** 2, x0=0.0).x[0])`,
          [
            kw(1, "Uses describe", "stats.describe", "stats\\.describe\\s*\\("),
            kw(2, "Uses quad", "integrate.quad", "integrate\\.quad\\s*\\("),
            kw(3, "Uses minimize", "optimize.minimize", "optimize\\.minimize\\s*\\("),
          ],
        ),
      },
    ],
  },
];

export const SCIPY_LESSONS = applyLessonVideoLinks(
  SCIPY_CHAPTERS.flatMap((ch) =>
    ch.lessons.map((l) => ({
      ...l,
      challenge: l.challenge
        ? { ...l.challenge, id: l.challenge.id || l.id }
        : l.challenge,
      outcomes: l.outcomes ?? SCIPY_LESSON_OUTCOMES[l.id] ?? [],
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
  ),
  SCIPY_VIDEO_LINKS,
);

export const SCIPY_TOTAL_XP = SCIPY_LESSONS.reduce((s, l) => s + l.xp, 0);
