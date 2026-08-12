// PolyCode — C# Collections Interactive Course
// 3 chapters · 7 lessons · Browser sandbox validation
// Follows the exact same content shape as csharp-oop/data/csharpOopCurriculum.js

const ACCENT = "#179c24"; // Distinct .NET Green branding color

function quiz(question, options, answer, explanation) {
  return { type: "quiz", question, options, answer, explanation };
}

function callout(variant, content) {
  return { type: "callout", variant, content };
}

function text(content, codeBlock = null) {
  if (codeBlock) {
    return {
      type: "text",
      content,
      code: { lang: "csharp", ...codeBlock },
    };
  }
  return { type: "text", content };
}

function diagram(title, nodes) {
  return { type: "diagram", title, nodes };
}

const RAW_CSHARP_COLLECTIONS_CHAPTERS = [
  {
    id: "arrays-lists",
    title: "Arrays & Lists",
    icon: "📦",
    color: ACCENT,
    lessons: [
      {
        id: "cs-col-0",
        title: "Arrays",
        xp: 12,
        theory: [
          text(
            "An **array** is a fixed-size, ordered collection of elements of the same type. Once created, its length can't change — you index into it with square brackets starting at `0`.",
            {
              label: "Declaring and using an array",
              content: `int[] scores = { 90, 85, 77 };
Console.WriteLine(scores[0]);   // 90
scores[1] = 88;
Console.WriteLine(scores.Length); // 3`,
            },
          ),
          text(
            "You can also create an array with a fixed size and fill it in later using `new int[5]`, or loop over every element with a `foreach` loop.",
            {
              label: "Sizing and looping",
              content: `int[] nums = new int[3];
nums[0] = 1;
nums[1] = 2;
nums[2] = 3;

foreach (int n in nums) {
    Console.WriteLine(n);
}`,
            },
          ),
          callout(
            "warn",
            "Arrays have a **fixed length**. If you need a collection that grows and shrinks, reach for `List<T>` instead — covered next.",
          ),
          quiz(
            "What happens if you try to add a 4th element to an array declared as `int[3]`?",
            [
              "It silently grows to fit",
              "A compile-time or runtime error occurs — arrays can't resize",
              "The first element is overwritten",
              "Nothing, C# arrays are unbounded",
            ],
            1,
            "Array length is fixed at creation. Accessing or assigning an out-of-range index throws an `IndexOutOfRangeException`.",
          ),
        ],
        challenge: {
          title: "Sum an Array",
          description:
            "Create an `int[]` named `nums` containing `2, 4, 6, 8`. Loop over it with `foreach` and print the running total after each element is added, ending with the full sum.",
          starterCode: `using System;

class Program {
    static void Main() {
        // Declare the nums array


        // Loop and print the running total

    }
}`,
          solutionCode: `using System;

class Program {
    static void Main() {
        int[] nums = { 2, 4, 6, 8 };
        int total = 0;
        foreach (int n in nums) {
            total += n;
            Console.WriteLine(total);
        }
    }
}`,
          tests: [
            {
              id: 1,
              label: "Declares an int array",
              keywords: [{ pattern: "int\\[\\]\\s+nums" }],
            },
            {
              id: 2,
              label: "Uses foreach to iterate",
              keywords: [{ pattern: "foreach" }],
            },
            {
              id: 3,
              label: "Prints a running total",
              keywords: [{ pattern: "total\\s*\\+=" }],
            },
          ],
        },
      },
      {
        id: "cs-col-1",
        title: "List<T>",
        xp: 14,
        theory: [
          text(
            "`List<T>` is a **resizable** collection from `System.Collections.Generic`. Unlike arrays, you can `Add`, `Remove`, and `Insert` elements at any time.",
            {
              label: "Working with List<T>",
              content: `using System.Collections.Generic;

List<string> names = new List<string>();
names.Add("Alice");
names.Add("Bob");
names.Remove("Alice");
Console.WriteLine(names.Count); // 1
Console.WriteLine(names[0]);    // Bob`,
            },
          ),
          diagram("Array vs. List<T>", [
            {
              id: "array",
              label: "Array",
              color: "#f59e0b",
              items: ["Fixed size", "Fast index access"],
            },
            {
              id: "list",
              label: "List<T>",
              color: ACCENT,
              items: ["Grows/shrinks", "Add(), Remove(), Insert()"],
            },
          ]),
          callout(
            "tip",
            "`List<T>` is generic — `T` is a placeholder for the element type. `List<int>`, `List<string>`, and `List<Car>` are all valid.",
          ),
          quiz(
            "Which method removes an element by value from a `List<T>`?",
            ["Delete()", "Pop()", "Remove()", "Clear()"],
            2,
            "`Remove(value)` finds the first matching element and removes it. `Clear()` empties the whole list instead.",
          ),
        ],
        challenge: {
          title: "Build a Todo List",
          description:
            "Create a `List<string>` named `todos`. Add `\"Buy milk\"` and `\"Walk dog\"`, then remove `\"Buy milk\"` and print the remaining count and the first item.",
          starterCode: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        // Create and populate the todos list


        // Remove "Buy milk"


        // Print Count and todos[0]

    }
}`,
          solutionCode: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        List<string> todos = new List<string>();
        todos.Add("Buy milk");
        todos.Add("Walk dog");
        todos.Remove("Buy milk");
        Console.WriteLine(todos.Count);
        Console.WriteLine(todos[0]);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Declares List<string> todos",
              keywords: [{ pattern: "List<string>\\s+todos" }],
            },
            {
              id: 2,
              label: "Adds two items",
              keywords: [{ pattern: "todos\\.Add" }],
            },
            {
              id: 3,
              label: "Removes an item",
              keywords: [{ pattern: "todos\\.Remove" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "dictionaries-sets",
    title: "Dictionaries & Sets",
    icon: "🔑",
    color: ACCENT,
    lessons: [
      {
        id: "cs-col-2",
        title: "Dictionary<TKey, TValue>",
        xp: 15,
        theory: [
          text(
            "A **`Dictionary<TKey, TValue>`** stores key-value pairs. Keys must be unique, and lookups by key are very fast — much faster than searching a list.",
            {
              label: "Using a Dictionary",
              content: `using System.Collections.Generic;

Dictionary<string, int> ages = new Dictionary<string, int>();
ages["Alice"] = 30;
ages["Bob"] = 25;

Console.WriteLine(ages["Alice"]); // 30
Console.WriteLine(ages.ContainsKey("Bob")); // True`,
            },
          ),
          text(
            "Use `TryGetValue` to safely look up a key without risking a `KeyNotFoundException` if it's missing.",
            {
              label: "Safe lookups",
              content: `if (ages.TryGetValue("Charlie", out int age)) {
    Console.WriteLine(age);
} else {
    Console.WriteLine("Not found");
}`,
            },
          ),
          callout(
            "warn",
            "Accessing a missing key with `ages[\"Charlie\"]` throws an exception. Always check `ContainsKey` or use `TryGetValue` first.",
          ),
          quiz(
            "What must be true of every key in a `Dictionary<TKey, TValue>`?",
            [
              "Keys must be sorted",
              "Keys must be unique",
              "Keys must be strings",
              "Keys must be numeric",
            ],
            1,
            "Dictionary keys must be unique — assigning to an existing key overwrites its value rather than adding a new entry.",
          ),
        ],
        challenge: {
          title: "Word Counter",
          description:
            "Create a `Dictionary<string, int>` named `counts`. Add `\"cat\" -> 2` and `\"dog\" -> 5`. Then print the value for `\"dog\"`.",
          starterCode: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        // Create the dictionary and add entries


        // Print counts["dog"]

    }
}`,
          solutionCode: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        Dictionary<string, int> counts = new Dictionary<string, int>();
        counts["cat"] = 2;
        counts["dog"] = 5;
        Console.WriteLine(counts["dog"]);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Declares Dictionary<string, int>",
              keywords: [{ pattern: "Dictionary<string,\\s*int>" }],
            },
            {
              id: 2,
              label: "Adds a dog entry",
              keywords: [{ pattern: "counts\\[\"dog\"\\]" }],
            },
            {
              id: 3,
              label: "Prints counts[\"dog\"]",
              keywords: [{ pattern: "Console\\.WriteLine\\(counts\\[\"dog\"\\]\\)" }],
            },
          ],
        },
      },
      {
        id: "cs-col-3",
        title: "HashSet<T>",
        xp: 13,
        theory: [
          text(
            "A **`HashSet<T>`** stores only **unique** values with no guaranteed order. It's ideal for membership checks (\"have I seen this before?\") and removing duplicates.",
            {
              label: "Using a HashSet",
              content: `using System.Collections.Generic;

HashSet<string> seen = new HashSet<string>();
seen.Add("apple");
seen.Add("apple"); // ignored, already present
Console.WriteLine(seen.Count); // 1
Console.WriteLine(seen.Contains("apple")); // True`,
            },
          ),
          callout(
            "tip",
            "`HashSet<T>.Contains()` runs in roughly constant time, making it much faster than `List<T>.Contains()` for large collections.",
          ),
          quiz(
            "What happens when you Add() a value that's already in a HashSet<T>?",
            [
              "An exception is thrown",
              "The set silently ignores it — Add() returns false",
              "The value is added twice",
              "The set clears itself",
            ],
            1,
            "`Add()` returns a bool indicating whether the item was newly added. Duplicates are simply ignored.",
          ),
        ],
        challenge: {
          title: "Deduplicate Tags",
          description:
            "Create a `HashSet<string>` named `tags`. Add `\"c#\"`, `\"dotnet\"`, and `\"c#\"` again. Print `tags.Count` (should be 2).",
          starterCode: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        // Create the set and add tags, including a duplicate


        // Print tags.Count

    }
}`,
          solutionCode: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        HashSet<string> tags = new HashSet<string>();
        tags.Add("c#");
        tags.Add("dotnet");
        tags.Add("c#");
        Console.WriteLine(tags.Count);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Declares HashSet<string> tags",
              keywords: [{ pattern: "HashSet<string>\\s+tags" }],
            },
            {
              id: 2,
              label: "Adds a duplicate value",
              keywords: [{ pattern: "tags\\.Add\\(\"c#\"\\)" }],
            },
            {
              id: 3,
              label: "Prints tags.Count",
              keywords: [{ pattern: "tags\\.Count" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "stacks-queues-iteration",
    title: "Stacks, Queues & Iteration",
    icon: "🔁",
    color: ACCENT,
    lessons: [
      {
        id: "cs-col-4",
        title: "Stack<T> and Queue<T>",
        xp: 14,
        theory: [
          text(
            "A **`Stack<T>`** is Last-In-First-Out (LIFO) — think of a stack of plates. A **`Queue<T>`** is First-In-First-Out (FIFO) — think of a line at a checkout.",
            {
              label: "Stack and Queue basics",
              content: `using System.Collections.Generic;

Stack<int> stack = new Stack<int>();
stack.Push(1);
stack.Push(2);
Console.WriteLine(stack.Pop()); // 2

Queue<int> queue = new Queue<int>();
queue.Enqueue(1);
queue.Enqueue(2);
Console.WriteLine(queue.Dequeue()); // 1`,
            },
          ),
          diagram("Stack vs. Queue", [
            {
              id: "stack",
              label: "Stack<T>",
              color: ACCENT,
              items: ["Push() adds", "Pop() removes last added"],
            },
            {
              id: "queue",
              label: "Queue<T>",
              color: "#3b82f6",
              items: ["Enqueue() adds", "Dequeue() removes first added"],
            },
          ]),
          quiz(
            "After Push(1), Push(2), Push(3) on a Stack<int>, what does Pop() return?",
            ["1", "2", "3", "It's undefined"],
            2,
            "A stack is LIFO — the most recently pushed value (3) comes off first.",
          ),
        ],
        challenge: {
          title: "Undo Stack",
          description:
            "Create a `Stack<string>` named `undo`. Push `\"typed A\"`, then `\"typed B\"`. Pop once and print the result (should be `\"typed B\"`).",
          starterCode: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        // Create the stack, push two actions


        // Pop and print the result

    }
}`,
          solutionCode: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        Stack<string> undo = new Stack<string>();
        undo.Push("typed A");
        undo.Push("typed B");
        Console.WriteLine(undo.Pop());
    }
}`,
          tests: [
            {
              id: 1,
              label: "Declares Stack<string> undo",
              keywords: [{ pattern: "Stack<string>\\s+undo" }],
            },
            {
              id: 2,
              label: "Pushes two actions",
              keywords: [{ pattern: "undo\\.Push" }],
            },
            {
              id: 3,
              label: "Pops and prints",
              keywords: [{ pattern: "undo\\.Pop\\(\\)" }],
            },
          ],
        },
      },
      {
        id: "cs-col-5",
        title: "Iterating and Transforming Collections",
        xp: 16,
        theory: [
          text(
            "Beyond `foreach`, C# collections support useful built-in methods like `Sort()`, `Reverse()`, and `Contains()` directly on `List<T>`.",
            {
              label: "Sorting and searching a list",
              content: `List<int> nums = new List<int> { 5, 1, 4, 2 };
nums.Sort();
Console.WriteLine(string.Join(",", nums)); // 1,2,4,5
nums.Reverse();
Console.WriteLine(string.Join(",", nums)); // 5,4,2,1
Console.WriteLine(nums.Contains(4)); // True`,
            },
          ),
          callout(
            "tip",
            "`string.Join(separator, collection)` is a quick way to turn any collection into a printable string — handy for debugging.",
          ),
          quiz(
            "Which method sorts a List<T> in place, from smallest to largest by default?",
            ["Order()", "Sort()", "Arrange()", "ToSorted()"],
            1,
            "`List<T>.Sort()` sorts the list in place using the default comparer (ascending for numbers).",
          ),
        ],
        challenge: {
          title: "Sort and Report",
          description:
            "Create a `List<int>` named `scores` with `{ 42, 17, 99, 8 }`. Sort it, then print the smallest (`scores[0]`) and largest (`scores[scores.Count - 1]`) values.",
          starterCode: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        // Create the list, sort it, and print min/max

    }
}`,
          solutionCode: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        List<int> scores = new List<int> { 42, 17, 99, 8 };
        scores.Sort();
        Console.WriteLine(scores[0]);
        Console.WriteLine(scores[scores.Count - 1]);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Declares List<int> scores",
              keywords: [{ pattern: "List<int>\\s+scores" }],
            },
            {
              id: 2,
              label: "Sorts the list",
              keywords: [{ pattern: "scores\\.Sort\\(\\)" }],
            },
            {
              id: 3,
              label: "Prints the max via Count - 1",
              keywords: [{ pattern: "scores\\.Count\\s*-\\s*1" }],
            },
          ],
        },
      },
      {
        id: "cs-col-6",
        title: "Choosing the Right Collection",
        xp: 16,
        theory: [
          text(
            "Picking the right collection matters for both clarity and performance. Here's a quick mental model for C#'s most common collection types.",
          ),
          diagram("Collection Cheat Sheet", [
            {
              id: "array",
              label: "Array",
              color: "#f59e0b",
              items: ["Fixed size", "Fastest raw access"],
            },
            {
              id: "list",
              label: "List<T>",
              color: ACCENT,
              items: ["Ordered, resizable", "Default choice"],
            },
            {
              id: "dict",
              label: "Dictionary<K,V>",
              color: "#3b82f6",
              items: ["Key lookup", "No duplicate keys"],
            },
            {
              id: "set",
              label: "HashSet<T>",
              color: "#a855f7",
              items: ["Unique values", "Fast Contains()"],
            },
          ]),
          callout(
            "tip",
            "Default to `List<T>` unless you specifically need fast key lookup (`Dictionary`), guaranteed uniqueness (`HashSet`), or strict LIFO/FIFO order (`Stack`/`Queue`).",
          ),
          quiz(
            "You need to check 'has this username been used?' as fast as possible, for thousands of usernames. Best choice?",
            ["Array", "List<T>", "HashSet<T>", "Stack<T>"],
            2,
            "HashSet<T>.Contains() is near-constant time, far faster than scanning a List<T> or Array for large collections.",
          ),
        ],
        challenge: {
          title: "Unique Visitor Counter",
          description:
            "Create a `HashSet<string>` named `visitors`. Add `\"ip1\"`, `\"ip2\"`, `\"ip1\"`, `\"ip3\"`. Print the total unique visitor count.",
          starterCode: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        // Track unique visitors and print the count

    }
}`,
          solutionCode: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        HashSet<string> visitors = new HashSet<string>();
        visitors.Add("ip1");
        visitors.Add("ip2");
        visitors.Add("ip1");
        visitors.Add("ip3");
        Console.WriteLine(visitors.Count);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Declares HashSet<string> visitors",
              keywords: [{ pattern: "HashSet<string>\\s+visitors" }],
            },
            {
              id: 2,
              label: "Adds a repeated ip",
              keywords: [{ pattern: "visitors\\.Add\\(\"ip1\"\\)" }],
            },
            {
              id: 3,
              label: "Prints visitors.Count",
              keywords: [{ pattern: "visitors\\.Count" }],
            },
          ],
        },
      },
    ],
  },
];

export const CSHARP_COLLECTIONS_CHAPTERS = RAW_CSHARP_COLLECTIONS_CHAPTERS;

export const CSHARP_COLLECTIONS_LESSONS = CSHARP_COLLECTIONS_CHAPTERS.flatMap(
  (ch) =>
    ch.lessons.map((l) => ({
      ...l,
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
);

export const CSHARP_COLLECTIONS_TOTAL_XP = CSHARP_COLLECTIONS_LESSONS.reduce(
  (s, l) => s + l.xp,
  0,
);
