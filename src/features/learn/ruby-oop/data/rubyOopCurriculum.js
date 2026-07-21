// PolyCode — Ruby OOP course (Beginner → Advanced)
// 6 chapters · 16 lessons · runnable Ruby examples and challenges

const ACCENT = "#6b21a8";

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
      code: { lang: "ruby", ...codeBlock },
    };
  }
  return { type: "text", content };
}

export const RUBY_OOP_CHAPTERS = [
  {
    id: "oop-welcome",
    title: "Ruby OOP — Beginner",
    stage: "beginner",
    icon: "💠",
    color: ACCENT,
    lessons: [
      {
        id: "ruby-oop-0",
        title: "Why Object-Oriented Ruby?",
        xp: 10,
        theory: [
          text(
            "Object-Oriented Programming (OOP) models programs as interacting objects. In Ruby, everything is an object — OOP is idiomatic and expressive across beginner to advanced code."
          ),
          text(
            "Beginner → Advanced: this course starts with classes and instances, then moves to inheritance, mixins, encapsulation, and finishes with useful metaprogramming patterns."
          ),
          callout(
            "info",
            "Course level: Beginner to Advanced — each chapter builds on the previous. Examples are runnable Ruby code suitable for the browser-backed interpreter."
          ),
        ],
        challenge: {
          title: "Object Greeting",
          description: "Create a class `Greeter` with an instance method `greet` that returns `\"Hello OOP\"`. Instantiate and `puts` the result.",
          starterCode: `# Define a simple Greeter class
class Greeter
  # def greet
  #   ...
  # end
end

# Create an instance and call greet
g = Greeter.new
puts g.greet`,
          solutionCode: `class Greeter
  def greet
    "Hello OOP"
  end
end

g = Greeter.new
puts g.greet`,
          tests: [
            { id: 1, label: "Defines Greeter class", keywords: [{ pattern: "class\\s+Greeter" }] },
            { id: 2, label: "Defines greet method", keywords: [{ pattern: "def\\s+greet" }] },
            { id: 3, label: "Prints Hello OOP", keywords: [{ pattern: "Hello\\s*OOP" }] },
          ],
        },
      },
      {
        id: "ruby-oop-1",
        title: "Classes, Instances & initialize",
        xp: 12,
        theory: [
          text(
            "`class` defines a blueprint. `initialize` is the constructor called when `new` is used. Instance variables start with `@` and are unique per object.",
            {
              label: "Basic class with initialize",
              content: `class Cat
  def initialize(name)
    @name = name
  end

  def speak
    "Meow, I am #{@name}"
  end
end

kitty = Cat.new("Kitty")
puts kitty.speak`,
            },
          ),
          quiz(
            "What method does Ruby call after `Class.new`?",
            ["start", "initialize", "construct", "create"],
            1,
            "Ruby calls `initialize` on the newly allocated object when you call `.new`."
          ),
        ],
        challenge: {
          title: "Person Intro",
          description: "Create `Person` with `initialize(name, age)` and a method `info` that returns `\"<name> is <age>\"`. Instantiate and print.",
          starterCode: `# Implement Person with initialize and info
class Person
  def initialize(name, age)
    # set @name and @age
  end

  def info
    # return formatted string
  end
end

# Example: puts Person.new("Ava", 30).info`,
          solutionCode: `class Person
  def initialize(name, age)
    @name = name
    @age = age
  end

  def info
    "#{@name} is #{@age}"
  end
end

puts Person.new("Ava", 30).info`,
          tests: [
            { id: 1, label: "Uses initialize", keywords: [{ pattern: "def\\s+initialize" }] },
            { id: 2, label: "Creates instance", keywords: [{ pattern: "Person\\.new" }] },
            { id: 3, label: "Prints info", keywords: [{ pattern: "is\\s*\\d+" }] },
          ],
        },
      },
    ],
  },

  {
    id: "oop-core",
    title: "Encapsulation & Accessors",
    stage: "beginner",
    icon: "🔐",
    color: "#db2777",
    lessons: [
      {
        id: "ruby-oop-2",
        title: "attr_reader / writer / accessor",
        xp: 14,
        theory: [
          text(
            "Ruby provides `attr_reader`, `attr_writer`, and `attr_accessor` macros to avoid boilerplate getters and setters.",
            {
              label: "Accessor example",
              content: `class Book
  attr_accessor :title, :author

  def initialize(title, author)
    @title = title
    @author = author
  end
end

book = Book.new("1984", "Orwell")
puts book.title`,
            },
          ),
          callout("tip", "Prefer `attr_reader` when you only need read access — it keeps invariants intact."),
        ],
        challenge: {
          title: "Immutable Record",
          description: "Define `Config` with `attr_reader :env` and initialize `env` to `'production'`. Print `env`.",
          starterCode: `# Implement Config with an env reader
class Config
  # attr_reader :env

  def initialize
    # @env = ...
  end
end

puts Config.new.env`,
          solutionCode: `class Config
  attr_reader :env

  def initialize
    @env = "production"
  end
end

puts Config.new.env`,
          tests: [
            { id: 1, label: "Uses attr_reader", keywords: [{ pattern: "attr_reader" }] },
            { id: 2, label: "Initializes env", keywords: [{ pattern: "@env" }] },
          ],
        },
      },
      {
        id: "ruby-oop-3",
        title: "Encapsulation & private methods",
        xp: 14,
        theory: [
          text(
            "Use `private` to hide internal helper methods. Private methods cannot be called with an explicit receiver from outside the object.",
            {
              label: "Private example",
              content: `class Wallet
  def initialize
    @balance = 0
  end

  def deposit(n)
    add(n)
  end

  def total
    @balance
  end

  private

  def add(n)
    @balance += n
  end
end

w = Wallet.new
w.deposit(25)
puts w.total`,
            },
          ),
        ],
        challenge: {
          title: "Protected Helper",
          description: "Create class `Counter` where `increment` calls a private method `step` to add 1. Print the value after one increment.",
          starterCode: `# Implement Counter using a private step helper
class Counter
  # def initialize; end
  # def increment; end
  # def value; end
  private
  # def step; end
end

c = Counter.new
c.increment
puts c.value`,
          solutionCode: `class Counter
  def initialize
    @v = 0
  end

  def increment
    step
  end

  def value
    @v
  end

  private

  def step
    @v += 1
  end
end

c = Counter.new
c.increment
puts c.value`,
          tests: [
            { id: 1, label: "Private step", keywords: [{ pattern: "private" }] },
            { id: 2, label: "Calls step from increment", keywords: [{ pattern: "step" }] },
          ],
        },
      },
    ],
  },

  {
    id: "inheritance",
    title: "Inheritance & Polymorphism",
    stage: "intermediate",
    icon: "🧬",
    color: "#f97316",
    lessons: [
      {
        id: "ruby-oop-4",
        title: "Subclassing & super",
        xp: 16,
        theory: [
          text(
            "Subclassing allows specialized behavior. Use `super` to call the parent implementation (often used inside `initialize`).",
            {
              label: "Subclass example",
              content: `class Animal
  def speak
    "..."
  end
end

class Dog < Animal
  def speak
    super + " Woof"
  end
end

puts Dog.new.speak`,
            },
          ),
          quiz(
            "What does `super` do when used inside a method?",
            ["Calls sibling method", "Calls the same method on the superclass", "Creates a new object", "Raises an exception"],
            1,
            "`super` invokes the parent's implementation of the current method." 
          ),
        ],
        challenge: {
          title: "Shape Area",
          description: "Create `class Shape` with `area` returning 0. Subclass `Square` with `initialize(side)` and override `area` to return `side*side`. Print Square.new(3).area.",
          starterCode: `# Implement Shape and Square
class Shape
  def area
    0
  end
end

class Square < Shape
  def initialize(side)
    # store side
  end

  def area
    # compute side*side
  end
end

puts Square.new(3).area`,
          solutionCode: `class Shape
  def area
    0
  end
end

class Square < Shape
  def initialize(side)
    @side = side
  end

  def area
    @side * @side
  end
end

puts Square.new(3).area`,
          tests: [
            { id: 1, label: "Defines subclass", keywords: [{ pattern: "class\\s+Square\\s+<\\s+Shape" }] },
            { id: 2, label: "Calculates area", keywords: [{ pattern: "area" }] },
          ],
        },
      },
      {
        id: "ruby-oop-5",
        title: "Polymorphism via duck-typing",
        xp: 14,
        theory: [
          text(
            "Ruby favors duck-typing: if an object responds to the required methods, it can be used even if it doesn't share a common ancestor. This enables flexible polymorphism.",
            {
              label: "Duck example",
              content: `def speak_twice(obj)
  puts obj.speak
  puts obj.speak
end

class Parrot
  def speak
    "Squawk"
  end
end

s = Parrot.new
speak_twice(s)`,
            },
          ),
        ],
        challenge: {
          title: "Duck Runner",
          description: "Write `run_all(things)` that calls `run` on each object in `things`. Given objects that implement `run`, print the results via `puts`.",
          starterCode: `# Implement run_all to call run on each object
def run_all(things)
  # return an array of results
end

class Car
  def run
    "vroom"
  end
end

puts run_all([Car.new]).inspect`,
          solutionCode: `def run_all(things)
  things.map { |t| t.run }
end

class Car
  def run
    "vroom"
  end
end

puts run_all([Car.new]).inspect`,
          tests: [
            { id: 1, label: "Implements run_all", keywords: [{ pattern: "def\\s+run_all" }] },
            { id: 2, label: "Calls run on objects", keywords: [{ pattern: "t.run" }] },
          ],
        },
      },
    ],
  },

  {
    id: "mixins",
    title: "Modules & Mixins — Intermediate",
    stage: "intermediate",
    icon: "🔀",
    color: "#7e22ce",
    lessons: [
      {
        id: "ruby-oop-6",
        title: "Modules as Mixins",
        xp: 16,
        theory: [
          text(
            "Modules provide shared behavior without classical multiple inheritance. Use `include` to mix instance methods and `extend` to add class methods.",
            {
              label: "Mixin example",
              content: `module Walkable
  def walk
    "walking"
  end
end

class Person
  include Walkable
end

puts Person.new.walk`,
            },
          ),
        ],
        challenge: {
          title: "Logger Mixin",
          description: "Create `module Logger` with `log(msg)` that prints `Log: <msg>`. Include it in `App` and call `App.new.log('Hi')`.",
          starterCode: `# Implement Logger mixin and include it into App
module Logger
  # def log(msg); end
end

class App
  # include Logger
end

App.new.log("Hi")`,
          solutionCode: `module Logger
  def log(msg)
    puts "Log: #{msg}"
  end
end

class App
  include Logger
end

App.new.log("Hi")`,
          tests: [
            { id: 1, label: "Defines module Logger", keywords: [{ pattern: "module\\s+Logger" }] },
            { id: 2, label: "Includes Logger", keywords: [{ pattern: "include\\s+Logger" }] },
          ],
        },
      },
    ],
  },

  {
    id: "advanced",
    title: "Advanced OOP Patterns",
    stage: "advanced",
    icon: "⚙️",
    color: "#1d4ed8",
    lessons: [
      {
        id: "ruby-oop-7",
        title: "Metaprogramming Basics",
        xp: 18,
        theory: [
          text(
            "Ruby's metaprogramming lets you define methods dynamically. Use `define_method` and `send` carefully — they enable powerful DSLs but can reduce readability if overused.",
            {
              label: "define_method example",
              content: `class Config
  %w[host port].each do |name|
    define_method(name) { @values ||= {}; @values[name] }
  end
end

cfg = Config.new
puts cfg.host.inspect`,
            },
          ),
        ],
        challenge: {
          title: "Dynamic Accessors",
          description: "Write `class Dyn` which creates reader methods for keys passed into `initialize(keys)` using `define_method`. Create Dyn.new([:a]).a and print `nil` (no error).",
          starterCode: `# Implement Dyn so instances respond to dynamic readers
class Dyn
  def initialize(keys)
    # create reader methods for keys
  end
end

puts Dyn.new([:a]).a.inspect`,
          solutionCode: `class Dyn
  def initialize(keys)
    keys.each do |k|
      self.class.send(:define_method, k) { nil }
    end
  end
end

puts Dyn.new([:a]).a.inspect`,
          tests: [
            { id: 1, label: "Uses define_singleton_method", keywords: [{ pattern: "define_singleton_method" }] },
            { id: 2, label: "Returns nil for missing value", keywords: [{ pattern: "nil" }] },
          ],
        },
      },
      {
        id: "ruby-oop-8",
        title: "Design Patterns & SOLID Notes",
        xp: 20,
        theory: [
          text(
            "A quick tour of common OOP patterns in Ruby: factories, decorators, and simple dependency injection. Focus on single responsibility and small, testable objects."
          ),
          callout("tip", "Prefer composition over inheritance when objects have loosely related behavior."),
        ],
        challenge: {
          title: "Factory Simple",
          description: "Implement `class AnimalFactory.build(type)` that returns `Dog.new` when `type == :dog` else `Animal.new`. Print the class name of the built object.",
          starterCode: `# Implement a simple factory method
class Animal; end
class Dog < Animal; end

class AnimalFactory
  def self.build(type)
    # return appropriate instance
  end
end

puts AnimalFactory.build(:dog).class`,
          solutionCode: `class Animal
end

class Dog < Animal
end

class AnimalFactory
  def self.build(type)
    return Dog.new if type == :dog
    Animal.new
  end
end

puts AnimalFactory.build(:dog).class`,
          tests: [
            { id: 1, label: "Defines AnimalFactory.build", keywords: [{ pattern: "def\\s+self\\.build" }] },
            { id: 2, label: "Returns Dog for :dog", keywords: [{ pattern: "Dog\\.new" }] },
          ],
        },
      },
    ],
  },
  // New Pro-level chapters added for deeper mastery
  {
    id: "concurrency",
    title: "Concurrency & Parallelism — Pro",
    stage: "pro",
    icon: "⚡",
    color: "#0ea5e9",
    lessons: [
      {
        id: "ruby-oop-9",
        title: "Threads Basics",
        xp: 18,
        theory: [
          text(
            "Ruby's `Thread` class allows concurrent execution. Threads share memory, so synchronization may be needed.",
            {
              label: "Thread example",
              content: `# Create a runnable block instead of a system thread
thread_mock = -> { puts "Hello from thread" }

# Execute it sequentially
thread_mock.call`
            }
          ),
        ],
        challenge: {
          title: "Thread Counter",
          description: "Create a shared counter variable. Spawn 5 threads, each incrementing the counter 10 times using a mutex. Print final counter value (should be 50).",
          starterCode: `require 'thread'\ncounter = 0\nmutex = Mutex.new\nthreads = 5.times.map do\n  Thread.new do\n    10.times do\n      # increment counter safely\n    end\n  end\nend\nthreads.each(&:join)\nputs counter`,
          solutionCode: `require 'thread'\ncounter = 0\nmutex = Mutex.new\nthreads = 5.times.map do\n  Thread.new do\n    10.times do\n      mutex.synchronize { counter += 1 }\n    end\n  end\nend\nthreads.each(&:join)\nputs counter`,
          tests: [
            { id: 1, label: "Uses Thread", keywords: [{ pattern: "Thread\\.new" }] },
            { id: 2, label: "Uses Mutex", keywords: [{ pattern: "Mutex" }] },
          ],
        },
      },
      {
        id: "ruby-oop-10",
        title: "Fiber Cooperative Scheduling",
        xp: 16,
        theory: [
          text(
            "Fibers provide lightweight cooperative concurrency. They must be resumed manually.",
            {
              label: "Fiber example",
              content: `fiber = Fiber.new { puts "inside fiber" }\nputs "before"\nfiber.resume\nputs "after"`
            }
          ),
        ],
        challenge: {
          title: "Fiber Sequence",
          description: "Create two fibers that each yield a number (1 and 2). Resume them alternately to produce output `1 2`. Print the numbers separated by space.",
          starterCode: `# Implement two fibers that yield numbers\nfib1 = Fiber.new { /* yield 1 */ }\nfib2 = Fiber.new { /* yield 2 */ }\n# resume alternately and collect results\nresult = []\n# ...\nputs result.join(' ')`,
          solutionCode: `fib1 = Fiber.new { Fiber.yield 1 }\nfib2 = Fiber.new { Fiber.yield 2 }\nresult = []\nresult << fib1.resume\nresult << fib2.resume\nputs result.join(' ')`,
          tests: [
            { id: 1, label: "Uses Fiber", keywords: [{ pattern: "Fiber\\.new" }] },
            { id: 2, label: "Yields values", keywords: [{ pattern: "Fiber\\.yield" }] },
          ],
        },
      },
    ],
  },
  {
    id: "gems",
    title: "Ruby Gems & Packaging — Pro",
    stage: "pro",
    icon: "📦",
    color: "#6d28d9",
    lessons: [
      {
        id: "ruby-oop-11",
        title: "Creating a Gem",
        xp: 20,
        theory: [
          text(
            "A gem is a packaged Ruby library. Use `bundle gem <name>` to scaffold. Include a version file and a simple class.",
            {
              label: "Gemfile example",
              content: `# my_gem.gemspec
spec = Gem::Specification.new do |spec|
  spec.name = "my_gem"
  spec.version = "0.1.0"
  spec.summary = "Example gem"
  spec.files = Dir["lib/**/*.rb"]
  
  # Note: RubyGems usually requires an author and email to fully validate!
  spec.author = "Your Name"
  spec.email = "you@example.com"
end

# Print the name and files list to verify it works in your browser terminal
puts "Gem Name: #{spec.name}"
puts "Included Files: #{spec.files.inspect}"`
            }
          ),
        ],
        challenge: {
          title: "Simple Gem Skeleton",
          description: "Write a minimal gemspec string for a gem named `awesome_gem` version `0.0.1` with summary `Awesome gem`. Return the gemspec content as a string.",
          starterCode: `def gemspec(name, version, summary)\n  # return gemspec string\nend\nputs gemspec('awesome_gem', '0.0.1', 'Awesome gem')`,
          solutionCode: `def gemspec(name, version, summary)\n  <<~GEMSPEC\n    Gem::Specification.new do |spec|\n      spec.name = "#{name}"\n      spec.version = "#{version}"\n      spec.summary = "#{summary}"\n      spec.files = []\n    end\n  GEMSPEC\nend\nputs gemspec('awesome_gem', '0.0.1', 'Awesome gem')`,
          tests: [
            { id: 1, label: "Returns Gem::Specification", keywords: [{ pattern: "Gem::Specification" }] },
          ],
        },
      },
      {
        id: "ruby-oop-12",
        title: "Using Bundler & Gemfile",
        xp: 14,
        theory: [
          text(
            "Bundler manages gem dependencies via a `Gemfile`. Use `bundle install` to install and `require` gems in code.",
            {
              label: "Gemfile example",
              content: `# A lightweight simulation of Bundler's DSL for restricted environments
class SandboxBundler
  def self.inline(&block)
    puts "=== [Bundler] Resolving dependencies... ==="
    context = new
    context.instance_eval(&block)
    puts "=== [Bundler] Environment locked and loaded! ===\n\n"
  end

  def source(url)
    puts "  -> Checking registry: #{url}"
  end

  def gem(name, version = nil)
    puts "  -> Loading dependency: '#{name}' #{version ? "(#{version})" : '(latest)'}"
    # Safely require the library (json is built-into the browser's Ruby)
    require name
  end
end

# --- RUNNABLE CODE ---
# This mimics the exact structure of your Gemfile inline code!
SandboxBundler.inline do
  source 'https://rubygems.org'
  gem 'json'
end

# Now you can use the loaded gem safely!
data = { 
  status: "success", 
  message: "Run successful! This simulation bypassed the browser's disk restrictions." 
}

puts JSON.pretty_generate(data)`
            }
          ),
        ],
        challenge: {
          title: "Gemfile Parser",
          description: "Write a method `list_gems(gemfile_content)` that returns an array of gem names defined in a Gemfile string (ignore version specs). Example input `'gem \"rails\", \"~>6.0\"\n gem \"puma\"'` should output `['rails','puma']`.",
          starterCode: `def list_gems(content)\n  # parse gem lines\nend\nputs list_gems("gem 'rails', '~>6.0'\n gem 'puma'").inspect`,
          solutionCode: `def list_gems(content)\n  content.lines.map do |line|\n    if line.strip.start_with?('gem')\n      line[/['"]([^'\\"]+)['"]/,1]\n    end\n  end.compact\nend\nputs list_gems("gem 'rails', '~>6.0'\n gem 'puma'").inspect`,
          tests: [
            { id: 1, label: "Parses gem names", keywords: [{ pattern: "gem'" }] },
          ],
        },
      },
    ],
  },

  // Chapter: Advanced Class Features
  {
    id: "oop-advanced-class",
    title: "Advanced Class Features — Pro",
    stage: "pro",
    icon: "🔧",
    color: "#7c3aed",
    lessons: [
      {
        id: "ruby-oop-13",
        title: "Class Variables & Constants",
        xp: 18,
        theory: [
          text(
            "Class variables (prefixed with `@@`) are shared across all instances of a class. Class constants (UPPERCASE) are defined at class level and shouldn't change.",
            {
              label: "Class variables and constants",
              content: `class BankAccount
  INTEREST_RATE = 0.05  # Class constant
  @@bank_name = "Ruby Bank"  # Class variable
  @@total_accounts = 0  # Tracks all accounts
  
  def initialize(owner)
    @owner = owner
    @balance = 0
    @@total_accounts += 1
  end
  
  def deposit(amount)
    @balance += amount
  end
  
  def self.total_accounts
    @@total_accounts
  end
  
  def self.bank_name
    @@bank_name
  end
end

# Create accounts
account1 = BankAccount.new("Alice")
account2 = BankAccount.new("Bob")

puts "Total accounts: #{BankAccount.total_accounts}"
puts "Bank: #{BankAccount.bank_name}"
puts "Interest rate: #{BankAccount::INTEREST_RATE}"`,
            }
          ),
          text(
            "Class variables have a key limitation: they're shared with subclasses, which can cause unexpected behavior.",
            {
              label: "Inheritance gotcha",
              content: `class Parent
  @@value = "parent"
  
  def self.value
    @@value
  end
end

class Child < Parent
  @@value = "child"
end

puts Parent.value  # "child" - unexpected!
puts Child.value   # "child"

# Better approach: use class instance variables
class BetterParent
  @value = "parent"
  
  class << self
    attr_accessor :value
  end
end

class BetterChild < BetterParent
  @value = "child"
end

puts BetterParent.value  # "parent" - correct!
puts BetterChild.value   # "child"`,
            }
          ),
          callout(
            "warning",
            "Class variables are shared between parent and child classes. Prefer class instance variables (@value in class context) for safer behavior."
          ),
        ],
        challenge: {
          title: "Counter Class",
          description: "Create a Counter class with a class variable @@count that tracks total instances created. Include a class method total to get the count.",
          starterCode: `class Counter
  # Add class variable and methods here
end

c1 = Counter.new
c2 = Counter.new
c3 = Counter.new
puts Counter.total  # Should print 3`,
          solutionCode: `class Counter
  @@count = 0
  
  def initialize
    @@count += 1
  end
  
  def self.total
    @@count
  end
end

c1 = Counter.new
c2 = Counter.new
c3 = Counter.new
puts Counter.total  # Should print 3`,
          tests: [
            { id: 1, label: "Has class variable", keywords: [{ pattern: "@@count" }] },
            { id: 2, label: "Increments in initialize", keywords: [{ pattern: "@@count +=" }] },
            { id: 3, label: "Has class method", keywords: [{ pattern: "def self.total" }] },
          ],
        },
      },
      {
        id: "ruby-oop-14",
        title: "Singleton Methods & Eigenclass",
        xp: 22,
        theory: [
          text(
            "Every object in Ruby has a singleton class (eigenclass) where you can define methods specific to that instance.",
            {
              label: "Singleton methods",
              content: `class Dog
  def bark
    "Woof!"
  end
end

fido = Dog.new
rex = Dog.new

# Add singleton method to fido only
def fido.play_fetch
  "Fido fetches the ball!"
end

puts fido.play_fetch  # Works
# puts rex.play_fetch  # NoMethodError!

# Define in eigenclass
class << fido
  def guard
    "Fido is guarding!"
  end
end

puts fido.guard`,
            }
          ),
          text(
            "Singleton methods are powerful for adding behavior to specific instances without subclassing.",
            {
              label: "Practical singleton usage",
              content: `class Config
  def initialize(data)
    @data = data
  end
  
  def get(key)
    @data[key]
  end
end

# Create different configs for different environments
dev_config = Config.new({ debug: true, log_level: "debug" })
prod_config = Config.new({ debug: false, log_level: "error" })

# Add environment-specific method to prod
def prod_config.validate!
  !@data[:debug]  # Production must not be in debug mode
end

puts dev_config.get(:debug)      # true
puts prod_config.validate!       # true (not in debug mode)`,
            }
          ),
          callout(
            "info",
            "Singleton methods are commonly used for configuration objects, test doubles, and adding one-off behavior to specific instances."
          ),
        ],
        challenge: {
          title: "Singleton Logger",
          description: "Create a Logger class where you can add singleton methods to enable different log levels (debug, info, warn) to specific instances.",
          starterCode: `# Create a Logger class
class Logger
  def initialize(name)
    @name = name
  end
  
  def log(message)
    puts "[#{@name}] #{message}"
  end
end

# Create two loggers
logger1 = Logger.new("App")
logger2 = Logger.new("DB")

# Add debug method only to logger1
# Add warn method only to logger2

# Test:
logger1.log("Info message")
logger1.debug("Debug message") rescue puts "No debug"
logger2.log("Info message")
logger2.warn("Warning!") rescue puts "No warn"`,
          solutionCode: `class Logger
  def initialize(name)
    @name = name
  end
  
  def log(message)
    puts "[#{@name}] #{message}"
  end
end

logger1 = Logger.new("App")
logger2 = Logger.new("DB")

# Add debug method only to logger1
def logger1.debug(message)
  puts "[#{@name}] DEBUG: #{message}"
end

# Add warn method only to logger2
def logger2.warn(message)
  puts "[#{@name}] WARN: #{message}"
end

logger1.log("Info message")
logger1.debug("Debug message")
logger2.log("Info message")
logger2.warn("Warning!")`,
          tests: [
            { id: 1, label: "Defines Logger class", keywords: [{ pattern: "class Logger" }] },
            { id: 2, label: "Adds singleton method to logger1", keywords: [{ pattern: "def logger1\\.debug" }] },
            { id: 3, label: "Adds singleton method to logger2", keywords: [{ pattern: "def logger2\\.warn" }] },
          ],
        },
      },
      {
        id: "ruby-oop-15",
        title: "Class Methods Deep Dive",
        xp: 16,
        theory: [
          text(
            "Class methods are methods called on the class itself, not on instances. They're useful for factory methods, alternative constructors, and utility functions.",
            {
              label: "Defining class methods",
              content: `class Point
  attr_accessor :x, :y
  
  def initialize(x, y)
    @x = x
    @y = y
  end
  
  # Class method using self
  def self.from_array(arr)
    new(arr[0], arr[1])
  end
  
  # Class method using class name
  def Point.origin
    new(0, 0)
  end
  
  # Class method with block
  def self.create_batch(count, &block)
    count.times.map { |i| block.call(i) }
  end
end

# Using class methods
p1 = Point.from_array([3, 4])
p2 = Point.origin
points = Point.create_batch(3) { |i| new(i, i * 2) }

puts "Point from array: (#{p1.x}, #{p1.y})"
puts "Origin: (#{p2.x}, #{p2.y})"`,
            }
          ),
          text(
            "Class methods can also be defined using the class << self idiom for cleaner organization.",
            {
              label: "Alternative syntax",
              content: `class MathUtils
  class << self
    def factorial(n)
      return 1 if n <= 1
      n * factorial(n - 1)
    end
    
    def fibonacci(n)
      return n if n <= 1
      fibonacci(n - 1) + fibonacci(n - 2)
    end
    
    def prime?(n)
      return false if n < 2
      (2..Math.sqrt(n)).none? { |i| n % i == 0 }
    end
  end
end

puts MathUtils.factorial(5)    # 120
puts MathUtils.fibonacci(10)  # 55
puts MathUtils.prime?(17)     # true`,
            }
          ),
          callout(
            "info",
            "Use class methods for operations that don't need instance state, like factory methods, conversions, and utility functions."
          ),
        ],
        challenge: {
          title: "Date Factory",
          description: "Create a DateFormatter class with class methods: from_iso(date_string), from_us(date_string), and today that return formatted date strings.",
          starterCode: `class DateFormatter
  # Add class methods here:
  # - from_iso("2024-01-15") => "January 15, 2024"
  # - from_us("01/15/2024") => "January 15, 2024"
  # - today => current date formatted
  
  def initialize(date)
    @date = date
  end
  
  def format
    @date.strftime("%B %d, %Y")
  end
end

puts DateFormatter.from_iso("2024-01-15")
puts DateFormatter.from_us("01/15/2024")
puts DateFormatter.today`,
          solutionCode: `require 'date'

class DateFormatter
  def self.from_iso(date_string)
    date = Date.parse(date_string)
    date.strftime("%B %d, %Y")
  end
  
  def self.from_us(date_string)
    parts = date_string.split('/')
    date = Date.new(parts[2].to_i, parts[0].to_i, parts[1].to_i)
    date.strftime("%B %d, %Y")
  end
  
  def self.today
    Date.today.strftime("%B %d, %Y")
  end
end

puts DateFormatter.from_iso("2024-01-15")
puts DateFormatter.from_us("01/15/2024")
puts DateFormatter.today`,
          tests: [
            { id: 1, label: "Defines from_iso", keywords: [{ pattern: "def self.from_iso" }] },
            { id: 2, label: "Defines from_us", keywords: [{ pattern: "def self.from_us" }] },
            { id: 3, label: "Defines today", keywords: [{ pattern: "def self.today" }] },
          ],
        },
      },
    ],
  },

  // Chapter: Composition & Design Patterns
  {
    id: "oop-composition",
    title: "Composition & Design Patterns — Pro",
    stage: "pro",
    icon: "🎨",
    color: "#8b5cf6",
    lessons: [
      {
        id: "ruby-oop-16",
        title: "Composition Over Inheritance",
        xp: 20,
        theory: [
          text(
            "Composition means composing objects to build complex functionality, rather than relying on inheritance hierarchies. It's often more flexible.",
            {
              label: "Composition example",
              content: `class Engine
  def start
    "Engine starting..."
  end
  
  def stop
    "Engine stopping..."
  end
end

class Wheels
  def rotate
    "Wheels rotating..."
  end
end

class Car
  def initialize
    @engine = Engine.new
    @wheels = Wheels.new
  end
  
  def drive
    "#{@engine.start}, #{@wheels.rotate}"
  end
  
  def park
    "#{@wheels.rotate}, #{@engine.stop}"
  end
end

car = Car.new
puts car.drive
puts car.park`,
            }
          ),
          text(
            "Composition allows you to change behavior at runtime by swapping components.",
            {
              label: "Dynamic composition",
              content: `class Text
  def render
    "Plain text"
  end
end

class BoldDecorator
  def initialize(component)
    @component = component
  end
  
  def render
    "<b>#{@component.render}</b>"
  end
end

class ItalicDecorator
  def initialize(component)
    @component = component
  end
  
  def render
    "<i>#{@component.render}</i>"
  end
end

# Compose at runtime
text = Text.new
bold_text = BoldDecorator.new(text)
italic_bold = ItalicDecorator.new(bold_text)

puts text.render          # Plain text
puts bold_text.render     # <b>Plain text</b>
puts italic_bold.render   # <i><b>Plain text</b></i>`,
            }
          ),
          callout(
            "info",
            "Favor composition when you need flexibility and runtime behavior changes. Use inheritance for stable, fixed hierarchies."
          ),
        ],
        challenge: {
          title: "Stack Builder",
          description: "Create a Stack class that uses composition to hold items. Add a History class that can undo/redo operations by storing stack states.",
          starterCode: `class Stack
  def initialize
    @items = []
  end
  
  def push(item)
    @items.push(item)
  end
  
  def pop
    @items.pop
  end
  
  def to_a
    @items.dup
  end
end

class History
  def initialize
    @past = []
    @future = []
  end
  
  def save(state)
    # Save current state
  end
  
  def undo
    # Restore previous state
  end
  
  def redo
    # Restore next state
  end
end

# Test it
stack = Stack.new
history = History.new
history.save(stack.to_a)

stack.push(1)
history.save(stack.to_a)
stack.push(2)
history.save(stack.to_a)

puts "Current: #{stack.to_a.inspect}"
stack.pop
puts "After pop: #{stack.to_a.inspect}"
history.undo
puts "After undo: #{stack.to_a.inspect}"`,
          solutionCode: `class Stack
  def initialize
    @items = []
  end
  
  def push(item)
    @items.push(item)
  end
  
  def pop
    @items.pop
  end
  
  def to_a
    @items.dup
  end
end

class History
  def initialize
    @past = []
    @future = []
  end
  
  def save(state)
    @past << state.dup
    @future.clear
  end
  
  def undo
    return nil if @past.empty?
    @future << @past.pop
    @past.last || []
  end
  
  def redo
    return nil if @future.empty?
    @past << @future.pop
    @past.last
  end
end

stack = Stack.new
history = History.new
history.save(stack.to_a)

stack.push(1)
history.save(stack.to_a)
stack.push(2)
history.save(stack.to_a)

puts "Current: #{stack.to_a.inspect}"
stack.pop
puts "After pop: #{stack.to_a.inspect}"
history.undo
puts "After undo: #{stack.to_a.inspect}"`,
          tests: [
            { id: 1, label: "Has save method", keywords: [{ pattern: "def save" }] },
            { id: 2, label: "Has undo method", keywords: [{ pattern: "def undo" }] },
            { id: 3, label: "Has redo method", keywords: [{ pattern: "def redo" }] },
          ],
        },
      },
      {
        id: "ruby-oop-17",
        title: "Common Design Patterns",
        xp: 22,
        theory: [
          text(
            "Design patterns are reusable solutions to common problems. Here are some essential patterns in Ruby.",
            {
              label: "Singleton pattern",
              content: `class Singleton
  private_class_method new
  
  def self.instance
    @instance ||= new
  end
end

a = Singleton.instance
b = Singleton.instance

puts a.equal?(b)  # true - same object!

# Practical example: Logger
class Logger
  private_class_method new
  
  def initialize
    @log = []
  end
  
  def log(message)
    @log << message
  end
  
  def self.instance
    @instance ||= new
  end
end

Logger.instance.log("Started")
Logger.instance.log("Processing")
puts Logger.instance`,
            }
          ),
          text(
            "Factory pattern provides an interface for creating objects without specifying exact classes.",
            {
              label: "Factory pattern",
              content: `class Document
  attr_reader :content
  
  def initialize(content = "")
    @content = content
  end
end

class PDF < Document
  def render
    "Rendering PDF: #{@content}"
  end
end

class Word < Document
  def render
    "Rendering Word: #{@content}"
  end
end

class HTML < Document
  def render
    "<html>#{@content}</html>"
  end
end

class DocumentFactory
  def self.create(type, content = "")
    case type
    when :pdf then PDF.new(content)
    when :word then Word.new(content)
    when :html then HTML.new(content)
    else raise "Unknown type: #{type}"
    end
  end
end

doc = DocumentFactory.create(:pdf, "Hello")
puts doc.render`,
            }
          ),
          callout(
            "info",
            "These patterns are starting points. Ruby idioms may differ from classical patterns - favor Ruby's strengths like blocks and open classes."
          ),
        ],
        challenge: {
          title: "Observer Pattern",
          description: "Implement the Observer pattern: a Subject class with attach, detach, and notify methods. Observers should have an update method that receives notifications.",
          starterCode: `class Subject
  def initialize
    @observers = []
  end
  
  def attach(observer)
    # Add observer
  end
  
  def detach(observer)
    # Remove observer
  end
  
  def notify
    # Notify all observers
  end
end

class Observer
  def update(event)
    puts "Received: #{event}"
  end
end

# Test it
subject = Subject.new
obs1 = Observer.new
obs2 = Observer.new

subject.attach(obs1)
subject.attach(obs2)
subject.notify  # Both should receive notification

subject.detach(obs1)
subject.notify  # Only obs2 should receive`,
          solutionCode: `class Subject
  def initialize
    @observers = []
  end
  
  def attach(observer)
    @observers << observer
  end
  
  def detach(observer)
    @observers.delete(observer)
  end
  
  def notify
    @observers.each { |o| o.update(self) }
  end
end

class Observer
  def initialize(name)
    @name = name
  end
  
  def update(subject)
    puts "#{@name} received notification"
  end
end

subject = Subject.new
obs1 = Observer.new("Observer 1")
obs2 = Observer.new("Observer 2")

subject.attach(obs1)
subject.attach(obs2)
subject.notify

subject.detach(obs1)
subject.notify`,
          tests: [
            { id: 1, label: "Has attach method", keywords: [{ pattern: "def attach" }] },
            { id: 2, label: "Has detach method", keywords: [{ pattern: "def detach" }] },
            { id: 3, label: "Has notify method", keywords: [{ pattern: "def notify" }] },
          ],
        },
      },
      {
        id: "ruby-oop-18",
        title: "Practical OOP Patterns",
        xp: 18,
        theory: [
          text(
            "Real-world Ruby applications often combine multiple patterns. Here are practical examples.",
            {
              label: "Service object pattern",
              content: `class OrderProcessor
  def initialize(order)
    @order = order
    @errors = []
  end
  
  def process
    validate_inventory
    calculate_total
    charge_customer
    send_confirmation
    
    self
  end
  
  def success?
    @errors.empty?
  end
  
  def errors
    @errors
  end
  
  private
  
  def validate_inventory
    # Check stock
  end
  
  def calculate_total
    @order[:total] = @order[:items].sum { |i| i[:price] }
  end
  
  def charge_customer
    # Process payment
  end
  
  def send_confirmation
    # Send email
  end
end

order = { items: [{ name: "Book", price: 20 }] }
result = OrderProcessor.new(order).process
puts result.success? ? "Order processed!" : result.errors`,
            }
          ),
          text(
            "Value objects are immutable objects that represent simple values.",
            {
              label: "Value objects",
              content: `class Money
  attr_reader :amount, :currency
  
  def initialize(amount, currency = "USD")
    @amount = amount
    @currency = currency
    freeze  # Immutable!
  end
  
  def +(other)
    raise "Currency mismatch" unless @currency == other.currency
    Money.new(@amount + other.amount, @currency)
  end
  
  def *(multiplier)
    Money.new(@amount * multiplier, @currency)
  end
  
  def to_s
    "\#{@currency} \#{@amount}"
  end
  
  def ==(other)
    @amount == other.amount && @currency == other.currency
  end
end

price = Money.new(100, "USD")
tax = Money.new(8, "USD")
total = price + tax

puts total  # USD 108`,
            }
          ),
          callout(
            "info",
            "Service objects, value objects, and other patterns help keep your domain logic clean and testable."
          ),
        ],
        challenge: {
          title: "Pipeline Pattern",
          description: "Create a Pipeline class that accepts a list of processing steps (lambdas/procs) and executes them in sequence on an initial value.",
          starterCode: `class Pipeline
  def initialize(initial_value)
    @value = initial_value
    @steps = []
  end
  
  def add_step(step)
    # Add a processing step
  end
  
  def execute
    # Run all steps in sequence
  end
end

# Test it
pipeline = Pipeline.new(10)
pipeline.add_step(->(x) { x * 2 })
pipeline.add_step(->(x) { x + 5 })
pipeline.add_step(->(x) { "Result: #{x}" })

puts pipeline.execute  # Should print "Result: 25"`,
          solutionCode: `class Pipeline
  def initialize(initial_value)
    @value = initial_value
    @steps = []
  end
  
  def add_step(step)
    @steps << step
    self
  end
  
  def execute
    @steps.reduce(@value) { |val, step| step.call(val) }
  end
end

pipeline = Pipeline.new(10)
pipeline.add_step(->(x) { x * 2 })
pipeline.add_step(->(x) { x + 5 })
pipeline.add_step(->(x) { "Result: #{x}" })

puts pipeline.execute`,
          tests: [
            { id: 1, label: "Stores steps", keywords: [{ pattern: "@steps" }] },
            { id: 2, label: "Adds steps", keywords: [{ pattern: "add_step" }] },
            { id: 3, label: "Executes pipeline", keywords: [{ pattern: "execute" }] },
          ],
        },
      },
    ],
  },
];

export const RUBY_OOP_LESSONS = RUBY_OOP_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const RUBY_OOP_TOTAL_XP = RUBY_OOP_LESSONS.reduce((s, l) => s + l.xp, 0);
