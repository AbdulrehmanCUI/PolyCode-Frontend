// PolyCode — Ruby Blocks & Modules interactive course

const ACCENT = "#701516"; 

export function quiz(question, options, answer, explanation) {
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
      code: { lang: "ruby", ...codeBlock },
    };
  }
  return { type: "text", content };
}

export const RUBY_BLOCKS_MODULES_CHAPTERS = [
  // ---------------------------------------------------------------------
  // Chapter 1 – Blocks Foundations (Beginner)
  // ---------------------------------------------------------------------
  {
    id: "blocks-foundation",
    title: "Ruby Blocks – Beginner",
    icon: "🔹",
    color: ACCENT,
    lessons: [
      {
        id: "rbm-0",
        title: "What is a Block?",
        xp: 10,
        theory: [
          text(
            "A **block** is a chunk of code you can pass to a method. It is defined between `do…end` or curly braces `{}` and can be called with `yield` inside the method.",
            {
              label: "Simple block example",
              content: `def greet
  yield "World"
end

greet { |name| puts "Hello, #{name}!" }`
            }
          ),
          callout("info", "Blocks are the core of Ruby's internal iteration – they let you write concise, reusable code.")
        ],
        challenge: {
          title: "Yield Greeting",
          description: "Write a method `shout` that yields a string to a block. The block should receive the string and `puts` it in uppercase.",
          starterCode: `def shout
  # yield a string to the block
end

shout { |msg| puts msg.upcase }`
,
          solutionCode: `def shout
  yield "hello from block"
end

shout { |msg| puts msg.upcase }`
,
          tests: [
            { id: 1, label: "Defines shout method", keywords: [{ pattern: "def\\s+shout" }] },
            { id: 2, label: "Calls yield", keywords: [{ pattern: "yield" }] },
            { id: 3, label: "Prints uppercase", keywords: [{ pattern: "UPCASE" }] }
          ]
        }
      },
      {
        id: "rbm-1",
        title: "Block Parameters",
        xp: 12,
        theory: [
          text(
            "Blocks can accept parameters. The method passes arguments to the block via `yield(arg1, arg2…)` and the block receives them as parameters.",
            {
              label: "Block with parameters",
              content: `def repeat(times)
  yield(times)
end

repeat(3) { |n| puts "Repeating #{n} times" }`
            }
          ),
          callout("tip", "If a block expects no parameters, you can still call `yield` without arguments.")
        ],
        challenge: {
          title: "Sum with Block",
          description: "Create a method `calculate` that yields two numbers to a block. The block should return their sum. Print the result.",
          starterCode: `def calculate
  # yield two numbers
end

calculate { |a, b| puts a + b }`
,
          solutionCode: `def calculate
  yield 5, 7
end

calculate { |a, b| puts a + b }`
,
          tests: [
            { id: 1, label: "Defines calculate method", keywords: [{ pattern: "def\\s+calculate" }] },
            { id: 2, label: "Yields two arguments", keywords: [{ pattern: "yield\\s+5,\\s*7" }] },
            { id: 3, label: "Prints 12", keywords: [{ pattern: "12" }] }
          ]
        }
      }
    ]
  },
  // ---------------------------------------------------------------------
  // Chapter 2 – Procs & Lambdas (Intermediate)
  // ---------------------------------------------------------------------
  {
    id: "procs-lambdas",
    title: "Procs & Lambdas",
    icon: "⚡",
    color: ACCENT,
    lessons: [
      {
        id: "rbm-2",
        title: "Introducing Proc",
        xp: 14,
        theory: [
          text(
            "A **Proc** is an object that holds a block. You can store it, pass it around, and call it with `call`.",
            {
              label: "Proc example",
              content: `my_proc = Proc.new { |x| x * 2 }
puts my_proc.call(4) # => 8`
            }
          ),
          callout("info", "Procs are useful when you need a reusable block that can be stored in a variable.")
        ],
        challenge: {
          title: "Double with Proc",
          description: "Define a Proc that doubles a number and call it with 6. Print the result.",
          starterCode: `# Define a Proc that doubles a value
my_proc = Proc.new { |n| /* ... */ }

puts my_proc.call(6)`
,
          solutionCode: `my_proc = Proc.new { |n| n * 2 }
puts my_proc.call(6)`
,
          tests: [
            { id: 1, label: "Creates Proc", keywords: [{ pattern: "Proc\\\\.new" }] },
            { id: 2, label: "Doubles value", keywords: [{ pattern: "12" }] }
          ]
        }
      },
      {
        id: "rbm-3",
        title: "Lambda vs Proc",
        xp: 16,
        theory: [
          text(
            "A **lambda** is a special kind of Proc with stricter argument checking and its own `return` semantics.",
            {
              label: "Lambda example",
              content: `my_lambda = ->(x) { x * 3 }
puts my_lambda.call(3) # => 9`
            }
          ),
          callout("warning", "`return` inside a lambda only exits the lambda, not the surrounding method.")
        ],
        challenge: {
          title: "Lambda Return",
          description: "Write a method `outer` that defines a lambda returning `:inside`. Call the lambda and return its value from `outer`. Print the result.",
          starterCode: `def outer
  # define lambda here
end

puts outer`
,
          solutionCode: `def outer
  l = -> { :inside }
  l.call
end

puts outer`
,
          tests: [
            { id: 1, label: "Defines lambda with ->", keywords: [{ pattern: "->" }] },
            { id: 2, label: "Returns :inside", keywords: [{ pattern: ":inside" }] }
          ]
        }
      }
    ]
  },
  // ---------------------------------------------------------------------
  // Chapter 3 – Modules & Mixins (Intermediate → Advanced)
  // ---------------------------------------------------------------------
  {
    id: "modules-mixins",
    title: "Modules & Mixins",
    icon: "📦",
    color: ACCENT,
    lessons: [
      {
        id: "rbm-4",
        title: "Defining a Module",
        xp: 12,
        theory: [
          text(
            "A **module** groups related methods and constants. It cannot be instantiated, but can be mixed into classes.",
            {
              label: "Simple module",
              content: `module Greetings
  def hello
    "Hello!"
  end

  def goodbye
    "Goodbye!"
  end
end

class Person
  include Greetings
end

person = Person.new

puts person.hello
puts person.goodbye`
            }
          ),
          callout("info", "Modules are also a namespace, preventing name collisions.")
        ],
        challenge: {
          title: "Module Method",
          description: "Create a module `MathHelpers` with a method `square(x)` returning `x*x`. Include the module in a class `Calculator` and call `square(5)`.",
          starterCode: `module MathHelpers
  # define square method
end

class Calculator
  include MathHelpers
end

puts Calculator.new.square(5)`
,
          solutionCode: `module MathHelpers
  def square(x)
    x * x
  end
end

class Calculator
  include MathHelpers
end

puts Calculator.new.square(5)`
,
          tests: [
            { id: 1, label: "Defines module MathHelpers", keywords: [{ pattern: "module\\s+MathHelpers" }] },
            { id: 2, label: "Defines square method", keywords: [{ pattern: "def\\s+square" }] },
            { id: 3, label: "Prints 25", keywords: [{ pattern: "25" }] }
          ]
        }
      },
      {
        id: "rbm-5",
        title: "Mixins for Shared Behavior",
        xp: 14,
        theory: [
          text(
            "**Mixins** let you share behavior across unrelated classes by `include`‑ing a module.",
            {
              label: "Mixin example",
              content: `module Flyable
  def fly
    "Flying..."
  end
end

module Swimmable
  def swim
    "Swimming..."
  end
end

class Duck
  include Flyable
  include Swimmable
end

duck = Duck.new

puts duck.fly
puts duck.swim`
            }
          ),
          callout("tip", "A class can include multiple modules, stacking behaviors.")
        ],
        challenge: {
          title: "Flyable Mixin",
          description: "Define a module `Swimmable` with method `swim` returning \"I can swim!\". Include it in class `Fish` and print the result of `Fish.new.swim`.",
          starterCode: `module Swimmable
  # define swim method
end

class Fish
  include Swimmable
end

puts Fish.new.swim`
,
          solutionCode: `module Swimmable
  def swim
    "I can swim!"
  end
end

class Fish
  include Swimmable
end

puts Fish.new.swim`
,
          tests: [
            { id: 1, label: "Defines module Swimmable", keywords: [{ pattern: "module\\s+Swimmable" }] },
            { id: 2, label: "Defines swim method", keywords: [{ pattern: "def\\s+swim" }] },
            { id: 3, label: "Prints I can swim!", keywords: [{ pattern: "I can swim" }] }
          ]
        }
      }
    ]
  },
  // ---------------------------------------------------------------------
  // Chapter 4 – Advanced Patterns (Advanced)
  // ---------------------------------------------------------------------
  {
    id: "advanced-patterns",
    title: "Advanced Blocks & Modules",
    icon: "🚀",
    color: ACCENT,
    lessons: [
      {
        id: "rbm-6",
        title: "Method Lookup Chain",
        xp: 16,
        theory: [
          text(
            "Ruby resolves method calls by searching the **ancestors chain**: the class, its included modules (in reverse order), its superclass, and so on.",
            {
              label: "Lookup chain demo",
              content: `module A; def hello; "A"; end; end
module B; def hello; "B"; end; end
class Base; include A; include B; end
puts Base.new.hello # => "B"`
            }
          ),
          callout("info", "The last included module wins because Ruby inserts it at the front of the ancestors list.")
        ],
        challenge: {
          title: "Ancestor Override",
          description: "Create modules `First` and `Second` each defining `msg` returning different strings. Include them in class `Demo` with `Second` included after `First`. Call `Demo.new.msg` and print the result.",
          starterCode: `module First
  def msg
    "first"
  end
end

module Second
  def msg
    "second"
  end
end

class Demo
  include First
  # include Second here
end

puts Demo.new.msg`
,
          solutionCode: `module First
  def msg
    "first"
  end
end

module Second
  def msg
    "second"
  end
end

class Demo
  include First
  include Second
end

puts Demo.new.msg`
,
          tests: [
            { id: 1, label: "Includes both modules", keywords: [{ pattern: "include\\s+First" }, { pattern: "include\\s+Second" }] },
            { id: 2, label: "Prints second", keywords: [{ pattern: "second" }] }
          ]
        }
      },
      {
        id: "rbm-7",
        title: "Block Passing with `&`",
        xp: 14,
        theory: [
          text(
            "You can convert a Proc to a block with the `&` operator when calling a method, and vice‑versa.",
            {
              label: "& operator example",
              content: `def call_twice(&blk)
  blk.call
  blk.call
end

my_proc = Proc.new { puts "twice" }
call_twice(&my_proc)`
            }
          ),
          callout("tip", "`&` is handy for forwarding blocks to other methods.")
        ],
        challenge: {
          title: "Forward Block",
          description: "Write a method `repeat_three(&block)` that calls the given block three times. Use it to print \"ping\" three times.",
          starterCode: `def repeat_three(&block)
  # call block three times
end

repeat_three { puts "ping" }`
,
          solutionCode: `def repeat_three(&block)
  3.times { block.call }
end

repeat_three { puts "ping" }`
,
          tests: [
            { id: 1, label: "Calls block three times", keywords: [{ pattern: "3.times" }] },
            { id: 2, label: "Prints ping three times", keywords: [{ pattern: "ping" }] }
          ]
        }
      }
    ]
  }
];
// Export flattened lessons array and total XP for the course
export const RUBY_BLOCKS_MODULES_LESSONS = RUBY_BLOCKS_MODULES_CHAPTERS.flatMap(c => c.lessons);
export const RUBY_BLOCKS_MODULES_TOTAL_XP = RUBY_BLOCKS_MODULES_LESSONS.reduce((sum, l) => sum + l.xp, 0);
