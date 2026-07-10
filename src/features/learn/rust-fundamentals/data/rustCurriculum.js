// PolyCode — Rust Fundamentals interactive course
// 9 chapters · 31 lessons · server/browser Rust challenges
// YouTube links: edit Rust_fundamentalsVideoLinks.js

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { RUST_FUNDAMENTALS_VIDEO_LINKS } from "./rustVideoLinks";

const ACCENT = "#ce412b"; 

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
      code: { lang: "rust", ...codeBlock },
    };
  }
  return { type: "text", content };
}

function diagram(title, nodes) {
  return { type: "diagram", title, nodes };
}

const RUST_MAIN = `fn main() {
`;

const RUST_MAIN_END = `}`;

export const RUST_FUNDAMENTALS_CHAPTERS = [
  {
    id: "mindset",
    title: "The Rust Mindset",
    icon: "⚙️",
    color: ACCENT,
    lessons: [
      {
        id: "rust-1",
        title: "Safety Without Garbage Collection",
        xp: 10,
        theory: [
          text(
            "**Rust** is a systems programming language that guarantees memory safety and thread safety without needing a runtime garbage collector."
          ),
          text(
            "Unlike C++, where you must manually manage memory (and risk segmentation faults), Rust uses a strict compiler feature called the **Borrow Checker** to prove your code is safe before it ever runs."
          ),
          diagram("Where Rust shines", [
            { id: "sys", label: "Systems & CLIs", color: ACCENT, items: ["OS Dev", "High-performance tools", "WASM"] },
            { id: "web", label: "Web Backends", color: "#f97316", items: ["Actix/Axum", "Low latency APIs"] },
            { id: "embedded", label: "Embedded", color: "#22c55e", items: ["Microcontrollers", "No-OS environments"] },
          ]),
          callout("info", "If your Rust code compiles, it is practically guaranteed not to crash from memory bugs. The compiler is strict, but it is your best friend."),
          quiz(
            "How does Rust ensure memory safety?",
            ["A background Garbage Collector", "Strict compiler rules (Borrow Checker)", "Manual allocate/free calls", "It runs in a virtual machine"],
            1,
            "Rust proves memory safety at compile-time using the Borrow Checker."
          ),
        ],
        challenge: {
          title: "Your First Compiler Interaction",
          description: "Welcome to Rust! Just click run to see a successful compilation.",
          starterCode: `${RUST_MAIN}    // Print a welcome message
    println!("Safe and fast!");
${RUST_MAIN_END}`,
          solutionCode: `${RUST_MAIN}    println!("Safe and fast!");
${RUST_MAIN_END}`,
          tests: [
            { id: 1, label: "Compiles successfully", keywords: [] },
          ],
        },
      },
      {
        id: "rust-2",
        title: "Hello, Cargo & Macros",
        xp: 10,
        theory: [
          text(
            "Every Rust executable starts with `fn main()`. To print to the console, we use `println!`.",
            {
              label: "Hello World",
              content: `fn main() {
    println!("Hello, PolyCode!");
}`
            }
          ),
          text(
            "Notice the `!` at the end of `println!`. This means it is a **Macro**, not a standard function. Macros write other code for you at compile time, allowing them to take a variable number of arguments."
          ),
          callout("tip", "Rust code is managed by **Cargo**, its package manager and build system. You use `cargo build` to compile and `cargo run` to execute."),
        ],
        challenge: {
          title: "Print to Console",
          description: "Use the `println!` macro to print exactly: `Hello, PolyCode!`",
          starterCode: `${RUST_MAIN}    // Print Hello, PolyCode!
${RUST_MAIN_END}`,
          solutionCode: `${RUST_MAIN}    println!("Hello, PolyCode!");
${RUST_MAIN_END}`,
          tests: [
            { id: 1, label: "Uses println!", keywords: [{ pattern: "println!" }] },
            { id: 2, label: "Prints Hello, PolyCode!", keywords: [{ pattern: "Hello, PolyCode!" }] },
          ],
        },
      },
      {
        id: "rust-3",
        title: "Variables & Default Immutability",
        xp: 12,
        theory: [
          text(
            "By default, variables in Rust are **immutable**. Once a value is bound to a name, you can't change it. This prevents accidental state changes and data races.",
            {
              label: "Immutability",
              content: `let hp = 100;
// hp = 90; // ERROR: cannot assign twice to immutable variable`
            }
          ),
          text(
            "If you need to change a variable, you must explicitly declare it as mutable using the `mut` keyword.",
            {
              label: "Mutability",
              content: `let mut score = 0;
score = 10; // This is fine!`
            }
          ),
          quiz(
            "What keyword must you add to allow a variable to be changed later?",
            ["var", "change", "mut", "let"],
            2,
            "You must use 'let mut' to make a variable mutable."
          ),
        ],
        challenge: {
          title: "Make it Mutable",
          description: "The code below fails to compile because `level` is immutable. Fix it by adding the `mut` keyword.",
          starterCode: `${RUST_MAIN}    let level = 1;
    level = 2;
    println!("Level: {}", level);
${RUST_MAIN_END}`,
          solutionCode: `${RUST_MAIN}    let mut level = 1;
    level = 2;
    println!("Level: {}", level);
${RUST_MAIN_END}`,
          tests: [
            { id: 1, label: "Uses let mut", keywords: [{ pattern: "let\\s+mut\\s+level" }] },
            { id: 2, label: "Prints Level: 2", keywords: [{ pattern: "Level: 2" }] },
          ],
        },
      },
      {
        id: "rust-4",
        title: "Variable Shadowing",
        xp: 12,
        theory: [
          text(
            "Instead of making variables mutable, Rust allows you to **shadow** them. You can declare a new variable with the exact same name as a previous one using `let`."
          ),
          text(
            "Shadowing lets you perform transformations on a value (even changing its type!) while keeping it immutable afterward.",
            {
              label: "Shadowing",
              content: `let spaces = "   ";
// We shadow 'spaces' and change its type from string to integer!
let spaces = spaces.len(); 
println!("{}", spaces); // Prints 3`
            }
          ),
        ],
        challenge: {
          title: "Shadow the String",
          description: "You have a string `let data = \"123\";`. On the next line, shadow it by creating a new `let data = 123;` (as an integer). Print it.",
          starterCode: `${RUST_MAIN}    let data = "123";
    // shadow data here
    
${RUST_MAIN_END}`,
          solutionCode: `${RUST_MAIN}    let data = "123";
    let data = 123;
    println!("{}", data);
${RUST_MAIN_END}`,
          tests: [
            { id: 1, label: "Shadows data", keywords: [{ pattern: "let\\s+data\\s*=\\s*123" }] },
          ],
        },
      },
    ],
  },
  {
    id: "data-expressions",
    title: "Data Expressions & Collections",
    icon: "📦",
    color: "#e11d48",
    lessons: [
      {
        id: "rust-5",
        title: "Statements vs. Expressions",
        xp: 15,
        theory: [
          text(
            "Rust is an expression-based language. **Statements** perform actions but do not return a value. **Expressions** evaluate to a value."
          ),
          text(
            "A block of code `{}` evaluates to the last expression inside it. **Crucially: if you leave the semicolon off the last line, it returns that value.**",
            {
              label: "Block expression",
              content: `let y = {
    let x = 3;
    x + 1 // No semicolon! This is an expression.
};
println!("{}", y); // Prints 4`
            }
          ),
          callout("warning", "If you add a semicolon to `x + 1;`, it becomes a statement and returns the unit type `()`, essentially 'nothing'."),
        ],
        challenge: {
          title: "Return the Value",
          description: "We are defining `x` using a block. Inside the block, calculate `5 * 5` and return it as an expression (without a semicolon).",
          starterCode: `${RUST_MAIN}    let x = {
        // return 5 * 5 here
    };
    println!("{}", x);
${RUST_MAIN_END}`,
          solutionCode: `${RUST_MAIN}    let x = {
        5 * 5
    };
    println!("{}", x);
${RUST_MAIN_END}`,
          tests: [
            { id: 1, label: "No semicolon on return", keywords: [{ pattern: "5\\s*\\*\\s*5\\s*\\n" }] },
          ],
        },
      },
      {
        id: "rust-6",
        title: "Scalar & Compound Types",
        xp: 12,
        theory: [
          text(
            "Rust is statically typed. Scalar types include integers (`i32`, `u64`), floats (`f64`), booleans (`bool`), and characters (`char`)."
          ),
          text(
            "Compound types group multiple values. A **Tuple** can hold different types, while an **Array** holds a fixed number of the same type.",
            {
              label: "Tuples and Arrays",
              content: `let tup: (i32, f64, u8) = (500, 6.4, 1);
let (x, y, z) = tup; // Destructuring

let arr: [i32; 3] = [1, 2, 3];
println!("{}", arr[0]);`
            }
          ),
          callout("info", "Primitive types (like i32 and bool) live entirely on the Stack, making them extremely fast to access and copy."),
        ],
        challenge: {
          title: "Destructure a Tuple",
          description: "Given `let player = (\"Nova\", 99);`, destructure it into `let (name, level)` and print both.",
          starterCode: `${RUST_MAIN}    let player = ("Nova", 99);
    // destructure and print
${RUST_MAIN_END}`,
          solutionCode: `${RUST_MAIN}    let player = ("Nova", 99);
    let (name, level) = player;
    println!("{} {}", name, level);
${RUST_MAIN_END}`,
          tests: [
            { id: 1, label: "Destructures tuple", keywords: [{ pattern: "let\\s+\\(name,\\s*level\\)" }] },
          ],
        },
      },
      {
        id: "rust-7",
        title: "Intro to Dynamic Vectors (Vec<T>)",
        xp: 15,
        theory: [
          text(
            "Arrays have a fixed size. If you need a list that can grow or shrink, you use a **Vector** (`Vec<T>`). Vectors allocate memory on the **Heap**."
          ),
          text(
            "The easiest way to create a vector is using the `vec!` macro.",
            {
              label: "Creating a Vector",
              content: `let mut nums = vec![1, 2, 3];
nums.push(4); // Adds 4 to the end
println!("{:?}", nums); // Use :? to print collections`
            }
          ),
          quiz(
            "Where does a Vec<T> store its variable amount of data?",
            ["On the Stack", "On the Heap", "In the CPU cache"],
            1,
            "Because Vectors can grow, their data must be stored on the dynamically-sized Heap."
          ),
        ],
        challenge: {
          title: "Push to Vector",
          description: "Create a mutable vector `items` containing `10, 20`. Push `30` to it. Print it using `println!(\"{:?}\", items);`.",
          starterCode: `${RUST_MAIN}    // create mut vector
    // push 30
    // print with {:?}
${RUST_MAIN_END}`,
          solutionCode: `${RUST_MAIN}    let mut items = vec![10, 20];
    items.push(30);
    println!("{:?}", items);
${RUST_MAIN_END}`,
          tests: [
            { id: 1, label: "Creates mut vec", keywords: [{ pattern: "let\\s+mut\\s+items\\s*=\\s*vec!" }] },
            { id: 2, label: "Pushes 30", keywords: [{ pattern: "items\\.push\\(30\\)" }] },
          ],
        },
      },
      {
        id: "rust-8",
        title: "Functions & Signatures",
        xp: 15,
        theory: [
          text(
            "Functions use the `fn` keyword. You MUST declare the type of every parameter. You must also declare the return type using an arrow `->`.",
            {
              label: "Function signatures",
              content: `fn add(a: i32, b: i32) -> i32 {
    a + b // No semicolon means this is returned!
}`
            }
          ),
          callout("tip", "You can use the `return` keyword, but idiomatic Rust usually just leaves off the semicolon on the last expression."),
        ],
        challenge: {
          title: "Write a Function",
          description: "Create a function `fn square(x: i32) -> i32` outside of main. It should return `x * x` (no semicolon). Call it in main with `4` and print the result.",
          starterCode: `fn square(x: i32) -> i32 {
    // return square
}

fn main() {
    // call and print
}`,
          solutionCode: `fn square(x: i32) -> i32 {
    x * x
}

fn main() {
    println!("{}", square(4));
}`,
          tests: [
            { id: 1, label: "Defines square", keywords: [{ pattern: "fn\\s+square\\(x:\\s*i32\\)\\s*->\\s*i32" }] },
            { id: 2, label: "Implicit return", keywords: [{ pattern: "x\\s*\\*\\s*x\\s*\\n" }] },
          ],
        },
      },
    ],
  },
  {
    id: "control-flow",
    title: "Control Flow as Expressions",
    icon: "🔀",
    color: "#db2777",
    lessons: [
      {
        id: "rust-9",
        title: "Conditional if Expressions",
        xp: 12,
        theory: [
          text(
            "Because `if` is an expression in Rust, you can use it on the right side of a `let` statement to assign an outcome directly to a variable.",
            {
              label: "if expression",
              content: `let condition = true;
// Both arms must return the same type!
let number = if condition { 5 } else { 10 };
println!("{}", number);`
            }
          ),
          quiz(
            "Why will `let x = if true { 5 } else { \"six\" };` fail to compile?",
            ["Strings need quotes", "if blocks can't return values", "The if and else arms return different types"],
            2,
            "Rust is strictly typed; the variable x can't be an integer sometimes and a string other times."
          ),
        ],
        challenge: {
          title: "Assign with If",
          description: "Set `let speed = 80;`. Use an if expression to assign `\"Fast\"` to `let status` if speed > 60, else `\"Slow\"`. Print `status`.",
          starterCode: `${RUST_MAIN}    let speed = 80;
    // let status = if ...
${RUST_MAIN_END}`,
          solutionCode: `${RUST_MAIN}    let speed = 80;
    let status = if speed > 60 { "Fast" } else { "Slow" };
    println!("{}", status);
${RUST_MAIN_END}`,
          tests: [
            { id: 1, label: "Uses if expression", keywords: [{ pattern: "let\\s+status\\s*=\\s*if" }] },
          ],
        },
      },
      {
        id: "rust-10",
        title: "The Infinite loop",
        xp: 12,
        theory: [
          text(
            "The `loop` keyword tells Rust to execute a block of code forever until you explicitly hit a `break`."
          ),
          text(
            "Like `if`, `loop` is an expression. You can pass a value to `break` to return it out of the loop!",
            {
              label: "Breaking with a value",
              content: `let mut counter = 0;
let result = loop {
    counter += 1;
    if counter == 10 {
        break counter * 2; // Returns 20
    }
};`
            }
          ),
        ],
        challenge: {
          title: "Break a Value",
          description: "We have an infinite loop. Break out of it when `hp == 0`, and return the string `\"Dead\"` out of the loop into the `status` variable.",
          starterCode: `${RUST_MAIN}    let mut hp = 3;
    let status = loop {
        hp -= 1;
        // if hp == 0 ...
    };
    println!("{}", status);
${RUST_MAIN_END}`,
          solutionCode: `${RUST_MAIN}    let mut hp = 3;
    let status = loop {
        hp -= 1;
        if hp == 0 {
            break "Dead";
        }
    };
    println!("{}", status);
${RUST_MAIN_END}`,
          tests: [
            { id: 1, label: "Breaks with value", keywords: [{ pattern: "break\\s+\"Dead\"" }] },
          ],
        },
      },
      {
        id: "rust-12",
        title: "Iterating with for",
        xp: 15,
        theory: [
          text(
            "The safest and most common loop in Rust is the `for` loop. It iterates over elements in a collection or a range.",
            {
              label: "For loops",
              content: `// Ranges: 1..4 means 1, 2, 3 (exclusive)
for number in 1..4 {
    println!("Count: {}", number);
}

let items = vec![10, 20, 30];
for item in items {
    println!("{}", item);
}`
            }
          ),
          callout("tip", "To include the final number in a range, use an equals sign: `1..=3` yields 1, 2, 3."),
        ],
        challenge: {
          title: "Range Loop",
          description: "Use a `for` loop with a range `1..=3` to print the numbers 1, 2, and 3.",
          starterCode: `${RUST_MAIN}    // loop 1 to 3 inclusive
${RUST_MAIN_END}`,
          solutionCode: `${RUST_MAIN}    for i in 1..=3 {
        println!("{}", i);
    }
${RUST_MAIN_END}`,
          tests: [
            { id: 1, label: "Uses for in range", keywords: [{ pattern: "for\\s+.*in\\s+1\\.\\.=3" }] },
          ],
        },
      },
    ],
  },
  {
    id: "ownership",
    title: "The Core: Ownership & Borrowing",
    icon: "🧠",
    color: "#6366f1",
    lessons: [
      {
        id: "rust-13",
        title: "Stack vs. Heap Memory",
        xp: 18,
        theory: [
          text(
            "To understand Ownership, you must understand memory."
          ),
          diagram("Memory Allocation", [
            { id: "stack", label: "The Stack", color: ACCENT, items: ["Fast, fixed size", "Integers, bools", "Popped automatically"] },
            { id: "heap", label: "The Heap", color: "#f97316", items: ["Slower, dynamic size", "Strings, Vectors", "Manual cleanup required (usually)"] },
          ]),
          text(
            "In languages like C, you manually free Heap memory. In Java, a Garbage Collector cleans it up. **Rust uses Ownership:** when the variable that 'owns' heap data goes out of scope, Rust automatically inserts code to drop the memory."
          ),
        ],
        challenge: {
          title: "Acknowledge Memory",
          description: "Just a theory check! Print `Stack is fast`.",
          starterCode: `${RUST_MAIN}    // print
${RUST_MAIN_END}`,
          solutionCode: `${RUST_MAIN}    println!("Stack is fast");
${RUST_MAIN_END}`,
          tests: [
            { id: 1, label: "Prints target", keywords: [{ pattern: "Stack is fast" }] },
          ],
        },
      },
      {
        id: "rust-14",
        title: "The Rules of Ownership",
        xp: 25,
        theory: [
          text(
            "Rust enforces three rules:\n1. Each value has a variable called its **owner**.\n2. There can only be **one owner** at a time.\n3. When the owner goes out of scope, the value is dropped."
          ),
          text(
            "Because primitive integers live on the Stack, they are cheap to copy. But `String`s live on the Heap. When you assign one `String` to another, Rust **Moves** ownership to prevent double-free errors.",
            {
              label: "Move Semantics",
              content: `let s1 = String::from("hello");
let s2 = s1; // Ownership moves to s2!

// println!("{}", s1); // ERROR: value borrowed here after move`
            }
          ),
          quiz(
            "What happens to s1 when you do `let s2 = s1;` if s1 is a Heap-allocated String?",
            ["It is copied", "It becomes null", "Ownership moves to s2, and s1 becomes invalid"],
            2,
            "Rust invalidates s1 so that only s2 is responsible for freeing the memory later."
          ),
        ],
        challenge: {
          title: "Fix the Move",
          description: "The code tries to print `v1` after moving it to `v2`, which causes a compiler error. We actually want `v2` to be a deep copy. Use `.clone()` on `v1` so `v1` remains valid.",
          starterCode: `${RUST_MAIN}    let v1 = vec![1, 2, 3];
    let v2 = v1; // Change this to v1.clone()
    
    println!("{:?} {:?}", v1, v2);
${RUST_MAIN_END}`,
          solutionCode: `${RUST_MAIN}    let v1 = vec![1, 2, 3];
    let v2 = v1.clone();
    
    println!("{:?} {:?}", v1, v2);
${RUST_MAIN_END}`,
          tests: [
            { id: 1, label: "Uses clone()", keywords: [{ pattern: "v1\\.clone\\(\\)" }] },
          ],
        },
      },
      {
        id: "rust-15",
        title: "Immutable Borrowing (&T)",
        xp: 20,
        theory: [
          text(
            "If passing a variable to a function *moves* it, how do we let functions use data without losing ownership? We use **References**, also known as Borrowing."
          ),
          text(
            "An immutable reference `&T` lets you view data without owning it. The original owner retains control.",
            {
              label: "Borrowing",
              content: `fn calculate_length(s: &String) -> usize {
    s.len()
} // s goes out of scope, but since it doesn't own the string, it isn't dropped.

let s1 = String::from("hello");
let len = calculate_length(&s1); // Pass a reference
println!("{} length is {}", s1, len); // s1 is still valid!`
            }
          ),
        ],
        challenge: {
          title: "Borrow, Don't Move",
          description: "Change the function signature of `print_vec` to accept a reference `&Vec<i32>`. Then, in main, pass a reference `&v` instead of `v`.",
          starterCode: `fn print_vec(v: Vec<i32>) {
    println!("{:?}", v);
}

fn main() {
    let v = vec![1, 2, 3];
    print_vec(v);
    println!("Still own v: {:?}", v); // This line currently fails!
}`,
          solutionCode: `fn print_vec(v: &Vec<i32>) {
    println!("{:?}", v);
}

fn main() {
    let v = vec![1, 2, 3];
    print_vec(&v);
    println!("Still own v: {:?}", v);
}`,
          tests: [
            { id: 1, label: "Signature uses reference", keywords: [{ pattern: "v:\\s*&Vec<i32>" }] },
            { id: 2, label: "Passes reference", keywords: [{ pattern: "print_vec\\(&v\\)" }] },
          ],
        },
      },
      {
        id: "rust-16",
        title: "Mutable Borrowing (&mut T)",
        xp: 25,
        theory: [
          text(
            "If you want to modify a borrowed value, you need a **mutable reference**: `&mut T`. The variable itself must also be mutable (`let mut`)."
          ),
          text(
            "**The Golden Rule:** You can have *infinite* immutable references, OR exactly *one* mutable reference in a specific scope. This rule eliminates Data Races at compile time!",
            {
              label: "Mutable borrow",
              content: `fn change(text: &mut String) {
    text.push_str(", world");
}

let mut s = String::from("hello");
change(&mut s);`
            }
          ),
          quiz(
            "Can you have one mutable reference and one immutable reference to the same data at the same time?",
            ["Yes", "No"],
            1,
            "No. If someone has a mutable reference, nobody else is allowed to look at the data until the mutable borrow is done."
          ),
        ],
        challenge: {
          title: "Mutate via Reference",
          description: "Write `fn add_one(n: &mut i32) { *n += 1; }`. Note the `*` to dereference and modify the integer. In main, pass `&mut score` to it.",
          starterCode: `// fn add_one

fn main() {
    let mut score = 10;
    // call add_one
    println!("{}", score);
}`,
          solutionCode: `fn add_one(n: &mut i32) {
    *n += 1;
}

fn main() {
    let mut score = 10;
    add_one(&mut score);
    println!("{}", score);
}`,
          tests: [
            { id: 1, label: "Uses &mut", keywords: [{ pattern: "n:\\s*&mut\\s*i32" }] },
            { id: 2, label: "Dereferences and adds", keywords: [{ pattern: "\\*n\\s*\\+=\\s*1" }] },
            { id: 3, label: "Passes &mut score", keywords: [{ pattern: "add_one\\(&mut\\s*score\\)" }] },
          ],
        },
      },
    ],
  },
  {
    id: "structs-enums",
    title: "Modeling Custom Data",
    icon: "🏗️",
    color: "#a855f7",
    lessons: [
      {
        id: "rust-17",
        title: "Struct Basics",
        xp: 15,
        theory: [
          text(
            "A `struct` packages multiple related values together. It's similar to objects in other languages, but strictly holds data, not functions."
          ),
          text(
            "You create an instance using curly braces.",
            {
              label: "Defining a Struct",
              content: `struct User {
    username: String,
    active: bool,
}

let u = User {
    username: String::from("nova"),
    active: true,
};
println!("{}", u.username);`
            }
          ),
        ],
        challenge: {
          title: "Build a User",
          description: "Define `struct Point { x: i32, y: i32 }`. In main, instantiate it as `p` with x=10, y=20. Print `p.x`.",
          starterCode: `// define Point

fn main() {
    // create p, print p.x
}`,
          solutionCode: `struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let p = Point { x: 10, y: 20 };
    println!("{}", p.x);
}`,
          tests: [
            { id: 1, label: "Defines struct", keywords: [{ pattern: "struct\\s+Point" }] },
            { id: 2, label: "Prints p.x", keywords: [{ pattern: "p\\.x" }] },
          ],
        },
      },
      {
        id: "rust-18",
        title: "Methods & impl Blocks",
        xp: 18,
        theory: [
          text(
            "To attach functions to a struct, use an `impl` (implementation) block. Functions inside an `impl` block that take `self` as their first parameter are called **Methods**.",
            {
              label: "Methods",
              content: `struct Rect { w: u32, h: u32 }

impl Rect {
    // &self means it borrows the struct immutably
    fn area(&self) -> u32 {
        self.w * self.h
    }
}

let r = Rect { w: 10, h: 5 };
println!("{}", r.area());`
            }
          ),
          callout("tip", "Methods can take `&self` to read, `&mut self` to modify, or `self` to take total ownership of the struct."),
        ],
        challenge: {
          title: "Area Method",
          description: "We provided `Circle`. Write an `impl` block with `fn area(&self) -> i32`. (Just return `self.radius * self.radius`). Test it in main.",
          starterCode: `struct Circle {
    radius: i32,
}

// impl Circle

fn main() {
    let c = Circle { radius: 5 };
    // print c.area()
}`,
          solutionCode: `struct Circle {
    radius: i32,
}

impl Circle {
    fn area(&self) -> i32 {
        self.radius * self.radius
    }
}

fn main() {
    let c = Circle { radius: 5 };
    println!("{}", c.area());
}`,
          tests: [
            { id: 1, label: "Uses impl", keywords: [{ pattern: "impl\\s+Circle" }] },
            { id: 2, label: "Calls area()", keywords: [{ pattern: "c\\.area\\(\\)" }] },
          ],
        },
      },
      {
        id: "rust-20",
        title: "Pattern Matching with match",
        xp: 20,
        theory: [
          text(
            "Rust's `match` is like a super-powered `switch`. It allows you to compare a value against patterns. **Crucially, `match` is exhaustive**—you must handle every possible case, or the code will not compile."
          ),
          text(
            "Enums (which hold variations of data) pair perfectly with `match`.",
            {
              label: "Match expression",
              content: `enum Coin { Penny, Nickel, Dime }

let coin = Coin::Penny;
let value = match coin {
    Coin::Penny => 1,
    Coin::Nickel => 5,
    Coin::Dime => 10,
};`
            }
          ),
          callout("info", "Use the `_` (underscore) pattern as a default catch-all if you don't want to list every remaining variant."),
        ],
        challenge: {
          title: "Match the Status",
          description: "Given `enum Status { Ok, Error }`, write a `match` on `s`. If `Status::Ok` return `200`. If `Status::Error` return `500`. Print the result.",
          starterCode: `enum Status { Ok, Error }

fn main() {
    let s = Status::Ok;
    // let code = match s ...
    // println code
}`,
          solutionCode: `enum Status { Ok, Error }

fn main() {
    let s = Status::Ok;
    let code = match s {
        Status::Ok => 200,
        Status::Error => 500,
    };
    println!("{}", code);
}`,
          tests: [
            { id: 1, label: "Uses match", keywords: [{ pattern: "match\\s+s" }] },
            { id: 2, label: "Handles Ok", keywords: [{ pattern: "Status::Ok\\s*=>\\s*200" }] },
          ],
        },
      },
    ],
  },
  {
    id: "errors",
    title: "Error Handling & Absence",
    icon: "🛡️",
    color: "#f59e0b",
    lessons: [
      {
        id: "rust-22",
        title: "The Option<T> Enum",
        xp: 20,
        theory: [
          text(
            "Rust **does not have null**. Trying to use a null value is a billion-dollar mistake in software engineering. Instead, Rust uses an enum called `Option<T>` to represent the concept of a value being present or absent."
          ),
          text(
            "`Option` is built into the standard library. It has two variants: `Some(value)` and `None`.",
            {
              label: "Option definition",
              content: `// How Option is defined under the hood:
enum Option<T> {
    None,
    Some(T),
}`
            }
          ),
          text(
            "Because `Option` is an enum, the compiler *forces* you to use a `match` (or similar) to handle the `None` case before it lets you touch the inner value."
          ),
        ],
        challenge: {
          title: "Handling Option",
          description: "We have `let age: Option<i32> = Some(25);`. Write a `match` expression. If `Some(val)`, print `val`. If `None`, print `\"Unknown\"`.",
          starterCode: `${RUST_MAIN}    let age: Option<i32> = Some(25);
    // match age
${RUST_MAIN_END}`,
          solutionCode: `${RUST_MAIN}    let age: Option<i32> = Some(25);
    match age {
        Some(val) => println!("{}", val),
        None => println!("Unknown"),
    }
${RUST_MAIN_END}`,
          tests: [
            { id: 1, label: "Matches Some", keywords: [{ pattern: "Some\\(val\\)\\s*=>" }] },
            { id: 2, label: "Matches None", keywords: [{ pattern: "None\\s*=>" }] },
          ],
        },
      },
      {
        id: "rust-23",
        title: "The Result<T, E> Enum",
        xp: 20,
        theory: [
          text(
            "For operations that can fail (like reading a file), Rust uses the `Result<T, E>` enum instead of throwing exceptions. It returns either `Ok(value)` for success, or `Err(error)` for failure."
          ),
          text(
            "This forces the caller to explicitly handle potential failures.",
            {
              label: "Result definition",
              content: `enum Result<T, E> {
    Ok(T),
    Err(E),
}`
            }
          ),
          quiz(
            "What happens if you ignore a Result returned by a function without matching or checking it?",
            ["The program crashes at runtime", "The compiler emits a warning", "It acts like a try/catch"],
            1,
            "Rust strongly encourages handling Result. If you ignore it, the compiler issues a #[warn(unused_must_use)] warning."
          ),
        ],
        challenge: {
          title: "Match the Result",
          description: "Given `let res: Result<i32, &str> = Err(\"Failed\");`, match on it. If `Ok(val)`, print `val`. If `Err(e)`, print `e`.",
          starterCode: `${RUST_MAIN}    let res: Result<i32, &str> = Err("Failed");
    // match res
${RUST_MAIN_END}`,
          solutionCode: `${RUST_MAIN}    let res: Result<i32, &str> = Err("Failed");
    match res {
        Ok(val) => println!("{}", val),
        Err(e) => println!("{}", e),
    }
${RUST_MAIN_END}`,
          tests: [
            { id: 1, label: "Matches Ok and Err", keywords: [{ pattern: "Err\\(e\\)" }] },
          ],
        },
      },
      {
        id: "rust-24",
        title: "Propagating Errors with ?",
        xp: 22,
        theory: [
          text(
            "Matching every single `Result` gets tedious. Rust provides the `?` operator to cleanly propagate errors up the call stack."
          ),
          text(
            "If you put `?` after a function call that returns a `Result`, it will unwrap the `Ok` value if successful. If it's an `Err`, it immediately returns from the *entire function*, passing the error upward.",
            {
              label: "The ? Operator",
              content: `fn do_work() -> Result<String, std::io::Error> {
    // If read_to_string fails, return the Err immediately.
    // If it succeeds, data gets the String.
    let data = std::fs::read_to_string("file.txt")?; 
    Ok(data)
}`
            }
          ),
        ],
        challenge: {
          title: "Clean Propagation",
          description: "Instead of a match, change `read_file()` to use `?` on the `fake_read()` call so that it returns `Ok(content)` or aborts early with `Err`.",
          starterCode: `fn fake_read() -> Result<i32, &'static str> {
    Err("IO Error")
}

fn read_file() -> Result<i32, &'static str> {
    // Add ? to the end of this call
    let data = fake_read(); 
    Ok(data) // Note: this currently fails type checking without ?
}

fn main() {
    println!("{:?}", read_file());
}`,
          solutionCode: `fn fake_read() -> Result<i32, &'static str> {
    Err("IO Error")
}

fn read_file() -> Result<i32, &'static str> {
    let data = fake_read()?; 
    Ok(data)
}

fn main() {
    println!("{:?}", read_file());
}`,
          tests: [
            { id: 1, label: "Uses ? operator", keywords: [{ pattern: "fake_read\\(\\)\\?" }] },
          ],
        },
      },
    ],
  },
  {
    id: "capstone",
    title: "Capstone & Summary",
    icon: "🏆",
    color: "#059669",
    lessons: [
      {
        id: "rust-31",
        title: "Course Recap",
        xp: 30,
        theory: [
          text(
            "Congratulations! You've survived the learning curve. You've tackled the core of **Rust**: from zero-cost abstractions and strict immutability, to the Borrow Checker's ownership rules, and exhaustive error handling with Enums."
          ),
          diagram("Your Rust Architecture Toolkit", [
            { id: "memory", label: "Memory", color: ACCENT, items: ["Stack vs Heap", "Ownership Moves", "Lifetimes & Borrowing"] },
            { id: "safety", label: "Safety", color: "#f97316", items: ["Result/Option (No nulls!)", "Exhaustive match"] },
            { id: "speed", label: "Speed", color: "#22c55e", items: ["Zero GC overhead", "Fearless Concurrency"] },
          ]),
          text(
            "**What to learn next in PolyCode:** Multithreading with `Arc` and `Mutex`, building REST APIs with `Actix-Web`, and writing fast WebAssembly (WASM)."
          ),
          callout("tip", "Keep fighting the Borrow Checker. Every time it rejects your code, it is teaching you how to architect software that won't fail in production."),
        ],
        challenge: {
          title: "Graduation Badge",
          description: "Print exactly two lines: `Rust Fundamentals` then `Complete!`",
          starterCode: `${RUST_MAIN}    // two-line graduation message
${RUST_MAIN_END}`,
          solutionCode: `${RUST_MAIN}    println!("Rust Fundamentals");
    println!("Complete!");
${RUST_MAIN_END}`,
          tests: [
            { id: 1, label: "Line 1 title", keywords: [{ pattern: "Rust Fundamentals" }] },
            { id: 2, label: "Line 2 Complete", keywords: [{ pattern: "Complete!" }] },
          ],
        },
      },
    ],
  },
];

export const RUST_FUNDAMENTALS_LESSONS = applyLessonVideoLinks(
  RUST_FUNDAMENTALS_CHAPTERS.flatMap((ch) =>
    ch.lessons.map((l) => ({
      ...l,
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    }))
  ),
  RUST_FUNDAMENTALS_VIDEO_LINKS
);

export const RUST_FUNDAMENTALS_TOTAL_XP = RUST_FUNDAMENTALS_LESSONS.reduce(
  (s, l) => s + l.xp,
  0
);