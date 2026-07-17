// PolyCode — PHP OOP interactive course
// 4 chapters · 16 lessons · server/browser PHP challenges

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

export const PHP_OOP_CHAPTERS = [
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 1 — Classes & Objects
  // ─────────────────────────────────────────────────────────────
  {
    id: "classes-objects",
    title: "Classes & Objects",
    icon: "🏛️",
    color: "#06b6d4",
    lessons: [
      {
        id: "oop-0",
        title: "Defining a Class & Creating Objects",
        xp: 20,
        theory: [
          text(
            "A **class** is a blueprint; an **object** is a specific instance built from that blueprint. Classes bundle related data (properties) and behavior (methods) together.",
            {
              label: "A first class",
              content: `class Book {
    public string $title;
    public string $author;

    public function describe(): string {
        return "{$this->title} by {$this->author}";
    }
}

$book = new Book();
$book->title = "Clean Code";
$book->author = "Robert Martin";
echo $book->describe(); // Clean Code by Robert Martin`,
            },
          ),
          diagram("Class vs Object", [
            { id: "class", label: "Class", color: "#06b6d4", items: ["The blueprint", "Defined once", "class Book { ... }"] },
            { id: "object", label: "Object", color: "#3b82f6", items: ["An instance of the class", "Created with new", "Has its own data"] },
          ]),
          quiz(
            "What's the relationship between a class and an object?",
            [
              "They're the same thing",
              "A class is the blueprint/template; an object is a specific instance created from it",
              "An object defines the class",
              "A class can only ever produce one object",
            ],
            1,
            "You define a class once, then create as many independent objects (instances) from it as you need, each with its own copy of the properties.",
          ),
        ],
        challenge: {
          title: "Define and Use a Class",
          description: "Complete the Book class's describe() method, then create a Book, set its title and author, and echo describe().",
          starterCode: `${PHP_MAIN}class Book {\n    public string $title;\n    public string $author;\n\n    public function describe(): string {\n        // return "<title> by <author>"\n\n    }\n}\n\n$book = new Book();\n$book->title = "Clean Code";\n$book->author = "Robert Martin";\necho $book->describe();`,
          solutionCode: `${PHP_MAIN}class Book {\n    public string $title;\n    public string $author;\n\n    public function describe(): string {\n        return "{$this->title} by {$this->author}";\n    }\n}\n\n$book = new Book();\n$book->title = "Clean Code";\n$book->author = "Robert Martin";\necho $book->describe();`,
          tests: [
            { id: 1, label: "Defines the describe() method", keywords: [{ pattern: "function\\s+describe" }] },
            { id: 2, label: "Uses $this to access properties", keywords: [{ pattern: "\\$this->title" }] },
          ],
        },
      },
      {
        id: "oop-1",
        title: "Constructors & Property Promotion",
        xp: 25,
        theory: [
          text(
            "A **constructor** (`__construct`) runs automatically when an object is created, letting you require and assign properties immediately. PHP 8's **constructor property promotion** lets you declare and assign properties in one step.",
            {
              label: "Constructor property promotion",
              content: `// The old way:
class Book {
    public string $title;
    public string $author;
    public function __construct(string $title, string $author) {
        $this->title = $title;
        $this->author = $author;
    }
}

// PHP 8+ promoted constructor — identical behavior, less code:
class Book {
    public function __construct(
        public string $title,
        public string $author,
    ) {}
}

$book = new Book("Clean Code", "Robert Martin");`,
            },
          ),
          callout("info", "Promoted properties can still have visibility modifiers (public/protected/private) right in the constructor signature — this is the modern, idiomatic PHP style."),
          quiz(
            "What does constructor property promotion eliminate?",
            [
              "The need for a constructor entirely",
              "The need to separately declare a property AND assign it in the constructor body",
              "The need for type hints",
              "The ability to have private properties",
            ],
            1,
            "Instead of declaring 'public string $title;' and then writing '$this->title = $title;' in the constructor body, promotion does both in the parameter list itself.",
          ),
        ],
        challenge: {
          title: "Use Property Promotion",
          description: "Rewrite the Book class to use constructor property promotion for title and author, then create one and echo \"$title by $author\".",
          starterCode: `${PHP_MAIN}class Book {\n    // use constructor property promotion for title and author\n\n}\n\n$book = new Book("Dune", "Frank Herbert");\necho "{$book->title} by {$book->author}";`,
          solutionCode: `${PHP_MAIN}class Book {\n    public function __construct(\n        public string $title,\n        public string $author,\n    ) {}\n}\n\n$book = new Book("Dune", "Frank Herbert");\necho "{$book->title} by {$book->author}";`,
          tests: [
            { id: 1, label: "Uses promoted constructor parameters", keywords: [{ pattern: "public\\s+string\\s+\\$title" }] },
          ],
        },
      },
      {
        id: "oop-2",
        title: "Visibility: public, protected, private",
        xp: 25,
        theory: [
          text(
            "**Visibility** controls where a property or method can be accessed from. `public` is open to everyone, `private` is only accessible inside the class itself, and `protected` is accessible in the class and its subclasses.",
            {
              label: "Visibility levels",
              content: `class Account {
    public string $owner;       // accessible from anywhere
    protected float $balance;   // accessible here + subclasses
    private string $pin;        // accessible only inside Account

    public function __construct(string $owner, float $balance, string $pin) {
        $this->owner = $owner;
        $this->balance = $balance;
        $this->pin = $pin;
    }

    public function getBalance(): float {
        return $this->balance; // OK — inside the class
    }
}

$acc = new Account("Amy", 100, "1234");
echo $acc->owner;        // OK — public
echo $acc->getBalance(); // OK — via a public method
// echo $acc->pin;       // FATAL ERROR — private, inaccessible from outside`,
            },
          ),
          diagram("Visibility levels", [
            { id: "public", label: "public", color: "#22c55e", items: ["Accessible everywhere"] },
            { id: "protected", label: "protected", color: "#f59e0b", items: ["Class + subclasses only"] },
            { id: "private", label: "private", color: "#ef4444", items: ["This class only"] },
          ]),
          quiz(
            "Why make a property private instead of public?",
            [
              "private properties are faster to access",
              "It hides internal implementation details and forces access through controlled public methods, protecting invariants",
              "PHP requires at least one private property per class",
              "private properties use less memory",
            ],
            1,
            "This is encapsulation — keeping internal state private and exposing only intentional methods (like getBalance()) prevents external code from putting the object into an invalid state directly.",
          ),
        ],
        challenge: {
          title: "Encapsulate a Balance",
          description: "Make $balance private with a public getBalance() method. Create an Account with balance 500, then echo getBalance().",
          starterCode: `${PHP_MAIN}class Account {\n    // make balance private, add a constructor and getBalance()\n\n}\n\n$acc = new Account(500);\necho $acc->getBalance();`,
          solutionCode: `${PHP_MAIN}class Account {\n    private float $balance;\n\n    public function __construct(float $balance) {\n        $this->balance = $balance;\n    }\n\n    public function getBalance(): float {\n        return $this->balance;\n    }\n}\n\n$acc = new Account(500);\necho $acc->getBalance();`,
          tests: [
            { id: 1, label: "Declares balance as private", keywords: [{ pattern: "private\\s+float\\s+\\$balance" }] },
            { id: 2, label: "Provides a public getBalance()", keywords: [{ pattern: "public\\s+function\\s+getBalance" }] },
          ],
        },
      },
      {
        id: "oop-3",
        title: "Static Properties & Methods",
        xp: 20,
        theory: [
          text(
            "`static` members belong to the **class itself**, not to any one instance — shared across every object, and callable without creating an instance at all, using `ClassName::method()`.",
            {
              label: "Static members",
              content: `class Counter {
    public static int $count = 0;

    public static function increment(): void {
        self::$count++;
    }
}

Counter::increment();
Counter::increment();
echo Counter::$count; // 2 — shared, no object was even created`,
            },
          ),
          callout("info", "Use static sparingly — it's useful for counters, factories, and utility functions, but overusing it makes code harder to test since static state is global."),
          quiz(
            "How do static properties differ from regular (instance) properties?",
            [
              "Static properties are faster",
              "Static properties belong to the class itself and are shared across ALL instances, rather than each object having its own copy",
              "Static properties can't hold numbers",
              "There's no real difference",
            ],
            1,
            "Every object has its own copy of a regular property, but there's only ONE copy of a static property, shared by the whole class — changing it from one place affects everyone.",
          ),
        ],
        challenge: {
          title: "Build a Static Counter",
          description: "Implement a Counter class with a static $count and a static increment() method. Call increment() 3 times, then echo Counter::$count.",
          starterCode: `${PHP_MAIN}class Counter {\n    // static $count, static increment()\n\n}\n\nCounter::increment();\nCounter::increment();\nCounter::increment();\necho Counter::$count;`,
          solutionCode: `${PHP_MAIN}class Counter {\n    public static int $count = 0;\n\n    public static function increment(): void {\n        self::$count++;\n    }\n}\n\nCounter::increment();\nCounter::increment();\nCounter::increment();\necho Counter::$count;`,
          tests: [
            { id: 1, label: "Declares a static $count", keywords: [{ pattern: "static\\s+int\\s+\\$count" }] },
            { id: 2, label: "increment() uses self::$count", keywords: [{ pattern: "self::\\$count" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 2 — Inheritance & Interfaces
  // ─────────────────────────────────────────────────────────────
  {
    id: "inheritance-interfaces",
    title: "Inheritance & Interfaces",
    icon: "🔗",
    color: "#3b82f6",
    lessons: [
      {
        id: "oop-4",
        title: "Extending Classes with Inheritance",
        xp: 25,
        theory: [
          text(
            "A class can `extend` another, inheriting its properties and methods while adding or overriding its own. `parent::` calls the parent class's version of a method.",
            {
              label: "Basic inheritance",
              content: `class Animal {
    public function __construct(protected string $name) {}
    public function speak(): string {
        return "{$this->name} makes a sound";
    }
}

class Dog extends Animal {
    public function speak(): string {
        return parent::speak() . " — specifically, a bark!";
    }
}

$dog = new Dog("Rex");
echo $dog->speak(); // Rex makes a sound — specifically, a bark!`,
            },
          ),
          quiz(
            "What does parent::speak() do inside Dog's overridden speak() method?",
            [
              "Deletes the parent's method",
              "Calls Animal's original speak() implementation, letting Dog build on top of it instead of fully replacing it",
              "Creates a new Animal object",
              "Causes an infinite loop",
            ],
            1,
            "parent:: lets a subclass reuse and extend the parent's behavior instead of duplicating it — a common pattern when you want to add to, not fully replace, inherited logic.",
          ),
        ],
        challenge: {
          title: "Extend a Base Class",
          description: "Make Dog extend Animal, override speak() to call parent::speak() and append \" — woof!\". Create a Dog named \"Rex\" and echo speak().",
          starterCode: `${PHP_MAIN}class Animal {\n    public function __construct(protected string $name) {}\n    public function speak(): string {\n        return "{$this->name} makes a sound";\n    }\n}\n\nclass Dog {\n    // extend Animal, override speak()\n\n}\n\n$dog = new Dog("Rex");\necho $dog->speak();`,
          solutionCode: `${PHP_MAIN}class Animal {\n    public function __construct(protected string $name) {}\n    public function speak(): string {\n        return "{$this->name} makes a sound";\n    }\n}\n\nclass Dog extends Animal {\n    public function speak(): string {\n        return parent::speak() . " — woof!";\n    }\n}\n\n$dog = new Dog("Rex");\necho $dog->speak();`,
          tests: [
            { id: 1, label: "Dog extends Animal", keywords: [{ pattern: "class\\s+Dog\\s+extends\\s+Animal" }] },
            { id: 2, label: "Calls parent::speak()", keywords: [{ pattern: "parent::speak" }] },
          ],
        },
      },
      {
        id: "oop-5",
        title: "Abstract Classes",
        xp: 25,
        theory: [
          text(
            "An `abstract` class can't be instantiated directly — it exists to be extended. It can declare `abstract` methods that every subclass **must** implement, while still providing shared, concrete methods too.",
            {
              label: "An abstract base class",
              content: `abstract class Shape {
    abstract public function area(): float; // no body — subclasses MUST implement

    public function describe(): string { // shared, concrete method
        return "This shape has an area of " . $this->area();
    }
}

class Circle extends Shape {
    public function __construct(private float $radius) {}
    public function area(): float {
        return pi() * $this->radius ** 2;
    }
}

// $shape = new Shape(); // FATAL ERROR — can't instantiate abstract class
$circle = new Circle(3);
echo $circle->describe();`,
            },
          ),
          quiz(
            "What happens if a class extends an abstract class but doesn't implement one of its abstract methods?",
            [
              "Nothing — abstract methods are optional",
              "A fatal error — the subclass must implement every abstract method, or also be declared abstract",
              "The method just does nothing at runtime",
              "PHP automatically generates a default implementation",
            ],
            1,
            "Abstract methods are a contract: PHP enforces that every concrete (non-abstract) subclass provides a real implementation, or the whole subclass must itself be abstract.",
          ),
        ],
        challenge: {
          title: "Implement an Abstract Method",
          description: "Complete Circle's area() method (π × r²) as a subclass of the abstract Shape class, then create a Circle with radius 2 and echo describe().",
          starterCode: `${PHP_MAIN}abstract class Shape {\n    abstract public function area(): float;\n    public function describe(): string {\n        return "This shape has an area of " . $this->area();\n    }\n}\n\nclass Circle extends Shape {\n    public function __construct(private float $radius) {}\n    public function area(): float {\n        // return pi() * radius^2\n\n    }\n}\n\n$circle = new Circle(2);\necho $circle->describe();`,
          solutionCode: `${PHP_MAIN}abstract class Shape {\n    abstract public function area(): float;\n    public function describe(): string {\n        return "This shape has an area of " . $this->area();\n    }\n}\n\nclass Circle extends Shape {\n    public function __construct(private float $radius) {}\n    public function area(): float {\n        return pi() * $this->radius ** 2;\n    }\n}\n\n$circle = new Circle(2);\necho $circle->describe();`,
          tests: [
            { id: 1, label: "Implements area()", keywords: [{ pattern: "function\\s+area\\s*\\(" }] },
            { id: 2, label: "Uses pi() and the radius", keywords: [{ pattern: "pi\\s*\\(\\s*\\)" }] },
          ],
        },
      },
      {
        id: "oop-6",
        title: "Interfaces",
        xp: 25,
        theory: [
          text(
            "An `interface` defines a **contract** — a list of method signatures with no implementation at all. A class `implements` an interface to promise it provides those methods. Unlike single inheritance, a class can implement multiple interfaces.",
            {
              label: "Defining and implementing an interface",
              content: `interface Payable {
    public function pay(float $amount): string;
}

class CreditCard implements Payable {
    public function pay(float $amount): string {
        return "Charged \\$$amount to credit card";
    }
}

class PayPal implements Payable {
    public function pay(float $amount): string {
        return "Sent \\$$amount via PayPal";
    }
}

function checkout(Payable $method, float $amount): string {
    return $method->pay($amount); // works with ANY Payable implementation
}`,
            },
          ),
          diagram("Interface vs Abstract Class", [
            { id: "interface", label: "Interface", color: "#3b82f6", items: ["Pure contract, no implementation", "A class can implement many"] },
            { id: "abstract", label: "Abstract Class", color: "#f59e0b", items: ["Can share real code too", "A class can extend only one"] },
          ]),
          quiz(
            "What's the key advantage of coding against a Payable interface rather than a specific class like CreditCard?",
            [
              "Interfaces run faster",
              "Any class implementing Payable can be used interchangeably — the checkout() function doesn't care which payment method it is",
              "Interfaces are required by PHP",
              "There's no real benefit",
            ],
            1,
            "This is the same principle as Java's Comparator or PaymentGateway examples — programming to an interface means your code works with any current or future implementation without modification.",
          ),
        ],
        challenge: {
          title: "Implement a Payable Interface",
          description: "Complete PayPal to implement the Payable interface's pay() method, returning \"Sent $<amount> via PayPal\". Call it with 50.",
          starterCode: `${PHP_MAIN}interface Payable {\n    public function pay(float $amount): string;\n}\n\nclass PayPal {\n    // implement Payable\n\n}\n\n$method = new PayPal();\necho $method->pay(50);`,
          solutionCode: `${PHP_MAIN}interface Payable {\n    public function pay(float $amount): string;\n}\n\nclass PayPal implements Payable {\n    public function pay(float $amount): string {\n        return "Sent \\$$amount via PayPal";\n    }\n}\n\n$method = new PayPal();\necho $method->pay(50);`,
          tests: [
            { id: 1, label: "PayPal implements Payable", keywords: [{ pattern: "class\\s+PayPal\\s+implements\\s+Payable" }] },
            { id: 2, label: "Implements pay()", keywords: [{ pattern: "function\\s+pay\\s*\\(" }] },
          ],
        },
      },
      {
        id: "oop-7",
        title: "Traits: Reusing Code Without Inheritance",
        xp: 25,
        theory: [
          text(
            "PHP allows only single inheritance (one `extends`), but often you want to share behavior across unrelated classes. A **trait** is a chunk of reusable methods you `use` inside any class, like copy-pasting code without the duplication.",
            {
              label: "A trait in action",
              content: `trait Loggable {
    public function log(string $message): string {
        return "[LOG] " . static::class . ": $message";
    }
}

class Order {
    use Loggable;
}

class User {
    use Loggable; // completely unrelated class, same shared behavior
}

$order = new Order();
echo $order->log("created"); // [LOG] Order: created`,
            },
          ),
          quiz(
            "Why use a trait instead of putting log() in a shared parent class?",
            [
              "Traits are faster than inheritance",
              "Order and User aren't related by an 'is-a' relationship — a trait lets them share behavior without forcing an artificial inheritance hierarchy",
              "PHP doesn't allow shared methods in parent classes",
              "Traits are required for logging specifically",
            ],
            1,
            "Inheritance should model genuine 'is-a' relationships. Order and User share a capability (logging), not an identity — a trait lets unrelated classes mix in the same behavior without a forced, awkward class hierarchy.",
          ),
        ],
        challenge: {
          title: "Share Behavior with a Trait",
          description: "Complete the Loggable trait's log() method returning \"[LOG] <message>\". Use it in an Order class, then call log(\"created\") and echo the result.",
          starterCode: `${PHP_MAIN}trait Loggable {\n    public function log(string $message): string {\n        // return "[LOG] <message>"\n\n    }\n}\n\nclass Order {\n    use Loggable;\n}\n\n$order = new Order();\necho $order->log("created");`,
          solutionCode: `${PHP_MAIN}trait Loggable {\n    public function log(string $message): string {\n        return "[LOG] $message";\n    }\n}\n\nclass Order {\n    use Loggable;\n}\n\n$order = new Order();\necho $order->log("created");`,
          tests: [
            { id: 1, label: "Order uses the Loggable trait", keywords: [{ pattern: "use\\s+Loggable" }] },
            { id: 2, label: "log() returns the formatted message", keywords: [{ pattern: "\\[LOG\\]" }] },
          ],
        },
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 3 — Magic Methods & Polymorphism
  // ─────────────────────────────────────────────────────────────
  {
    id: "magic-methods-polymorphism",
    title: "Magic Methods & Polymorphism",
    icon: "✨",
    color: "#f59e0b",
    lessons: [
      {
        id: "oop-8",
        title: "__toString and __get/__set",
        xp: 25,
        theory: [
          text(
            "**Magic methods** (prefixed with `__`) let PHP call your code automatically in special situations. `__toString()` runs whenever an object is used as a string; `__get`/`__set` intercept access to undefined or private properties.",
            {
              label: "__toString in action",
              content: `class Money {
    public function __construct(private int $cents) {}

    public function __toString(): string {
        return "$" . number_format($this->cents / 100, 2);
    }
}

$price = new Money(1999);
echo $price; // automatically calls __toString(): $19.99
echo "Price: $price"; // works in string interpolation too!`,
            },
          ),
          quiz(
            "When does PHP automatically call __toString()?",
            [
              "Only when you explicitly call it",
              "Whenever an object is used in a context expecting a string, like echo or string concatenation",
              "Only inside the class itself",
              "Never — it must be called manually",
            ],
            1,
            "__toString() is PHP's hook for 'what should this object look like as text' — echo, string concatenation, and interpolation all trigger it automatically.",
          ),
        ],
        challenge: {
          title: "Implement __toString",
          description: "Complete Money's __toString() to format cents as a dollar string like \"$19.99\". Create Money(1999) and echo it directly.",
          starterCode: `${PHP_MAIN}class Money {\n    public function __construct(private int $cents) {}\n\n    public function __toString(): string {\n        // format as "$X.XX"\n\n    }\n}\n\n$price = new Money(1999);\necho $price;`,
          solutionCode: `${PHP_MAIN}class Money {\n    public function __construct(private int $cents) {}\n\n    public function __toString(): string {\n        return "$" . number_format($this->cents / 100, 2);\n    }\n}\n\n$price = new Money(1999);\necho $price;`,
          tests: [
            { id: 1, label: "Implements __toString()", keywords: [{ pattern: "function\\s+__toString" }] },
            { id: 2, label: "Uses number_format", keywords: [{ pattern: "number_format" }] },
          ],
        },
      },
      {
        id: "oop-9",
        title: "__call and __invoke",
        xp: 25,
        theory: [
          text(
            "`__call()` intercepts calls to methods that don't exist — useful for proxies and dynamic APIs. `__invoke()` lets an object be **called like a function** directly.",
            {
              label: "__call and __invoke",
              content: `class Api {
    public function __call(string $name, array $args): string {
        return "Calling undefined method '$name' with " . count($args) . " args";
    }
}
$api = new Api();
echo $api->getUser(5); // Calling undefined method 'getUser' with 1 args

class Multiplier {
    public function __construct(private int $factor) {}
    public function __invoke(int $n): int {
        return $n * $this->factor;
    }
}
$double = new Multiplier(2);
echo $double(21); // 42 — the object is called like a function!`,
            },
          ),
          quiz(
            "What does __invoke() enable?",
            [
              "Calling a static method without an instance",
              "Calling an object directly as if it were a function, e.g. $obj(5)",
              "Automatically invoking the constructor",
              "Serializing an object to JSON",
            ],
            1,
            "__invoke() is triggered when you use an object with function-call syntax — $obj(...) — letting objects behave like callable functions, useful for things like configurable transformer objects.",
          ),
        ],
        challenge: {
          title: "Make an Object Callable",
          description: "Implement Multiplier with a constructor taking $factor and an __invoke(int $n) that returns $n * $factor. Create Multiplier(3) and call it with 10.",
          starterCode: `${PHP_MAIN}class Multiplier {\n    // constructor with $factor, __invoke(int $n)\n\n}\n\n$triple = new Multiplier(3);\necho $triple(10);`,
          solutionCode: `${PHP_MAIN}class Multiplier {\n    public function __construct(private int $factor) {}\n\n    public function __invoke(int $n): int {\n        return $n * $this->factor;\n    }\n}\n\n$triple = new Multiplier(3);\necho $triple(10);`,
          tests: [
            { id: 1, label: "Implements __invoke()", keywords: [{ pattern: "function\\s+__invoke" }] },
          ],
        },
      },
      {
        id: "oop-10",
        title: "Polymorphism in Practice",
        xp: 25,
        theory: [
          text(
            "**Polymorphism** means treating different classes uniformly through a shared type (interface or parent class), while each one behaves in its own way when called — the payoff of interfaces and inheritance combined.",
            {
              label: "Polymorphism with a shared interface",
              content: `interface Shape {
    public function area(): float;
}

class Circle implements Shape {
    public function __construct(private float $r) {}
    public function area(): float { return pi() * $this->r ** 2; }
}

class Square implements Shape {
    public function __construct(private float $side) {}
    public function area(): float { return $this->side ** 2; }
}

$shapes = [new Circle(2), new Square(3)];
foreach ($shapes as $shape) {
    echo $shape->area() . "\\n"; // each calls its OWN area(), same call site
}`,
            },
          ),
          quiz(
            "What makes the foreach loop over $shapes an example of polymorphism?",
            [
              "It loops through an array",
              "The same $shape->area() call invokes different actual code depending on whether $shape is a Circle or Square, without the loop needing to know which",
              "Circle and Square are the same class",
              "PHP requires foreach for polymorphism",
            ],
            1,
            "Polymorphism means one interface, many implementations — the loop treats every Shape uniformly, and PHP dispatches to the correct area() implementation for each object automatically.",
          ),
        ],
        challenge: {
          title: "Sum Areas Polymorphically",
          description: "Given Circle and Square both implementing Shape's area(), sum the areas of [new Circle(1), new Square(2)] using a loop, and echo the total.",
          starterCode: `${PHP_MAIN}interface Shape {\n    public function area(): float;\n}\n\nclass Circle implements Shape {\n    public function __construct(private float $r) {}\n    public function area(): float { return pi() * $this->r ** 2; }\n}\n\nclass Square implements Shape {\n    public function __construct(private float $side) {}\n    public function area(): float { return $this->side ** 2; }\n}\n\n$shapes = [new Circle(1), new Square(2)];\n// sum all areas, echo the total\n`,
          solutionCode: `${PHP_MAIN}interface Shape {\n    public function area(): float;\n}\n\nclass Circle implements Shape {\n    public function __construct(private float $r) {}\n    public function area(): float { return pi() * $this->r ** 2; }\n}\n\nclass Square implements Shape {\n    public function __construct(private float $side) {}\n    public function area(): float { return $this->side ** 2; }\n}\n\n$shapes = [new Circle(1), new Square(2)];\n$total = 0;\nforeach ($shapes as $shape) {\n    $total += $shape->area();\n}\necho $total;`,
          tests: [
            { id: 1, label: "Loops over the shapes", keywords: [{ pattern: "foreach\\s*\\(\\s*\\$shapes" }] },
            { id: 2, label: "Calls area() polymorphically", keywords: [{ pattern: "\\$shape->area\\s*\\(" }] },
          ],
        },
      },
      {
        id: "oop-11",
        title: "Type Declarations & Return Types",
        xp: 20,
        theory: [
          text(
            "PHP lets you declare parameter and return types, catching mismatched types at call time instead of causing confusing bugs later. `?Type` marks a nullable type, and `void` means a method returns nothing.",
            {
              label: "Type declarations",
              content: `class UserRepository {
    public function findById(int $id): ?string {
        // returns a string, or null if not found
        return $id === 1 ? "Amy" : null;
    }

    public function logAccess(int $id): void {
        // returns nothing
        echo "Accessed user $id\\n";
    }
}

$repo = new UserRepository();
$repo->findById("abc"); // TypeError — "abc" isn't an int`,
            },
          ),
          quiz(
            "What does a return type of ?string mean?",
            [
              "The method must return a non-empty string",
              "The method returns either a string or null",
              "The parameter is optional",
              "The method is deprecated",
            ],
            1,
            "The ? prefix on a type makes it nullable — ?string means 'a string, or null' — commonly used for lookups that might not find anything.",
          ),
        ],
        challenge: {
          title: "Add Type Declarations",
          description: "Add proper type declarations to findById(int $id): ?string, returning \"Amy\" for id 1, else null. Call it for id 1 and id 2, echoing each result (use 'null' as text for the null case).",
          starterCode: `${PHP_MAIN}class UserRepository {\n    public function findById($id) {\n        // add types, return "Amy" for id===1, else null\n\n    }\n}\n\n$repo = new UserRepository();\necho $repo->findById(1) ?? "null";\necho " ";\necho $repo->findById(2) ?? "null";`,
          solutionCode: `${PHP_MAIN}class UserRepository {\n    public function findById(int $id): ?string {\n        return $id === 1 ? "Amy" : null;\n    }\n}\n\n$repo = new UserRepository();\necho $repo->findById(1) ?? "null";\necho " ";\necho $repo->findById(2) ?? "null";`,
          tests: [
            { id: 1, label: "Uses ?string return type", keywords: [{ pattern: "\\?string" }] },
            { id: 2, label: "Uses int $id parameter type", keywords: [{ pattern: "int\\s+\\$id" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 4 — Namespaces & Modern OOP
  // ─────────────────────────────────────────────────────────────
  {
    id: "namespaces-modern-oop",
    title: "Namespaces & Modern OOP",
    icon: "📦",
    color: "#8b5cf6",
    lessons: [
      {
        id: "oop-12",
        title: "Namespaces",
        xp: 20,
        theory: [
          text(
            "**Namespaces** prevent naming collisions between classes from different parts of an app (or different libraries) that happen to share a name, like two different `User` classes.",
            {
              label: "Namespacing classes",
              content: `namespace App\\Models;

class User {
    public function __construct(public string $name) {}
}

// Elsewhere:
namespace App\\Legacy;

class User { // a completely different class, no conflict!
    public string $username;
}

// Using them together:
$modern = new \\App\\Models\\User("Amy");
$legacy = new \\App\\Legacy\\User();`,
            },
          ),
          callout("info", "Composer's autoloader (PSR-4) maps namespaces directly to folder structure — App\\Models\\User lives in src/Models/User.php."),
          quiz(
            "What problem do namespaces solve?",
            [
              "They make code run faster",
              "They let two classes share the same short name (like User) without conflicting, by giving each a distinct full, qualified name",
              "They replace the need for classes",
              "They're required for every PHP file",
            ],
            1,
            "Without namespaces, including two libraries that both define a 'User' class would cause a fatal redeclaration error — namespaces give each its own distinct address.",
          ),
        ],
        challenge: {
          title: "Reference a Namespaced Class",
          description: "Given a User class inside namespace App\\Models, create an instance using its fully-qualified name and echo its name property.",
          starterCode: `${PHP_MAIN}namespace App\\Models;\n\nclass User {\n    public function __construct(public string $name) {}\n}\n\nnamespace App;\n\n// create a \\\\App\\\\Models\\\\User named "Amy" and echo its name\n`,
          solutionCode: `${PHP_MAIN}namespace App\\Models;\n\nclass User {\n    public function __construct(public string $name) {}\n}\n\nnamespace App;\n\n$user = new \\App\\Models\\User("Amy");\necho $user->name;`,
          tests: [
            { id: 1, label: "Uses the fully-qualified class name", keywords: [{ pattern: "App\\\\\\\\Models\\\\\\\\User" }] },
          ],
        },
      },
      {
        id: "oop-13",
        title: "Enums",
        xp: 25,
        theory: [
          text(
            "PHP 8.1 added **enums** — a fixed set of named values, safer than using raw strings or constants for things like status codes. `match` pairs naturally with enums for exhaustive, type-safe branching.",
            {
              label: "A backed enum",
              content: `enum OrderStatus: string {
    case Pending = 'pending';
    case Shipped = 'shipped';
    case Delivered = 'delivered';

    public function label(): string {
        return match($this) {
            OrderStatus::Pending => 'Awaiting shipment',
            OrderStatus::Shipped => 'On its way',
            OrderStatus::Delivered => 'Arrived!',
        };
    }
}

$status = OrderStatus::Shipped;
echo $status->label(); // On its way
echo $status->value;   // shipped`,
            },
          ),
          quiz(
            "Why use an enum instead of plain string constants like 'pending', 'shipped', 'delivered'?",
            [
              "Enums are always faster",
              "Enums restrict values to a fixed, known set at the type level, so typos like 'shiped' become impossible instead of a silent bug",
              "Enums don't need to be typed",
              "There's no real difference",
            ],
            1,
            "With plain strings, a typo like 'shiped' compiles fine and fails silently at runtime. An enum's fixed set of cases means the compiler/IDE can catch invalid values before the code even runs.",
          ),
        ],
        challenge: {
          title: "Build an Enum with a Method",
          description: "Complete OrderStatus's label() using match. Get OrderStatus::Shipped and echo its label().",
          starterCode: `${PHP_MAIN}enum OrderStatus: string {\n    case Pending = 'pending';\n    case Shipped = 'shipped';\n    case Delivered = 'delivered';\n\n    public function label(): string {\n        // match($this) over the 3 cases\n\n    }\n}\n\n$status = OrderStatus::Shipped;\necho $status->label();`,
          solutionCode: `${PHP_MAIN}enum OrderStatus: string {\n    case Pending = 'pending';\n    case Shipped = 'shipped';\n    case Delivered = 'delivered';\n\n    public function label(): string {\n        return match($this) {\n            OrderStatus::Pending => 'Awaiting shipment',\n            OrderStatus::Shipped => 'On its way',\n            OrderStatus::Delivered => 'Arrived!',\n        };\n    }\n}\n\n$status = OrderStatus::Shipped;\necho $status->label();`,
          tests: [
            { id: 1, label: "Uses match($this) in label()", keywords: [{ pattern: "match\\s*\\(\\s*\\$this\\s*\\)" }] },
          ],
        },
      },
      {
        id: "oop-14",
        title: "Readonly Properties",
        xp: 20,
        theory: [
          text(
            "A `readonly` property can be set **once** — typically in the constructor — and never changed afterward. This makes objects immutable, preventing accidental (or malicious) mutation after creation.",
            {
              label: "Readonly properties",
              content: `class Coordinate {
    public function __construct(
        public readonly float $lat,
        public readonly float $lng,
    ) {}
}

$point = new Coordinate(40.7128, -74.0060);
echo $point->lat; // fine, reading is always allowed

$point->lat = 0; // FATAL ERROR — cannot modify a readonly property`,
            },
          ),
          callout("info", "Immutable objects are easier to reason about — once created, you know a Coordinate's lat/lng can never silently change somewhere else in the code."),
          quiz(
            "What happens if you try to reassign a readonly property after construction?",
            [
              "It silently does nothing",
              "PHP throws a fatal Error",
              "It works fine, just like a normal property",
              "It only works inside the class",
            ],
            1,
            "readonly properties can be initialized once (typically in the constructor) — any later attempt to write to them throws an Error, enforcing true immutability.",
          ),
        ],
        challenge: {
          title: "Build an Immutable Value Object",
          description: "Make Coordinate's lat and lng readonly via promoted constructor properties. Create Coordinate(40.7128, -74.0060) and echo \"lat,lng\".",
          starterCode: `${PHP_MAIN}class Coordinate {\n    // readonly promoted properties lat and lng\n\n}\n\n$point = new Coordinate(40.7128, -74.0060);\necho "{$point->lat},{$point->lng}";`,
          solutionCode: `${PHP_MAIN}class Coordinate {\n    public function __construct(\n        public readonly float $lat,\n        public readonly float $lng,\n    ) {}\n}\n\n$point = new Coordinate(40.7128, -74.0060);\necho "{$point->lat},{$point->lng}";`,
          tests: [
            { id: 1, label: "Declares readonly properties", keywords: [{ pattern: "readonly\\s+float" }] },
          ],
        },
      },
      {
        id: "oop-15",
        title: "Putting It Together: A Small Domain Model",
        xp: 30,
        theory: [
          text(
            "Final lesson: combine everything from this course into one small, realistic model — a `Product` with a readonly id, an enum for category, encapsulated pricing, and a `__toString()` for display.",
            {
              label: "A complete domain object",
              content: `enum Category: string {
    case Electronics = 'electronics';
    case Books = 'books';
}

class Product {
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        private float $price,
        public readonly Category $category,
    ) {}

    public function applyDiscount(float $percent): void {
        $this->price -= $this->price * ($percent / 100);
    }

    public function __toString(): string {
        return "{$this->name} ({$this->category->value}) — $" . number_format($this->price, 2);
    }
}`,
            },
          ),
          quiz(
            "Why is 'price' private (not readonly) while 'id', 'name', and 'category' are readonly in this Product model?",
            [
              "It's arbitrary, there's no reason",
              "price is expected to change (e.g. via discounts) over the object's lifetime, while id/name/category should never change after creation",
              "readonly only works on strings",
              "private and readonly can't be combined",
            ],
            1,
            "This models real behavior: a product's identity (id, name, category) is fixed once created, but its price is mutable business state that legitimately changes — the design should reflect which properties are truly immutable.",
          ),
        ],
        challenge: {
          title: "Build the Full Product Model",
          description: "Complete Product with a private $price, applyDiscount(percent) that reduces price, and __toString() returning \"<name> — $<price>\". Create Product(1,\"Mouse\",25,...), apply a 20% discount, then echo it.",
          starterCode: `${PHP_MAIN}class Product {\n    public function __construct(\n        public readonly int $id,\n        public readonly string $name,\n        private float $price,\n    ) {}\n\n    public function applyDiscount(float $percent): void {\n        // reduce price by percent%\n\n    }\n\n    public function __toString(): string {\n        // return "<name> — $<price>"\n\n    }\n}\n\n$p = new Product(1, "Mouse", 25);\n$p->applyDiscount(20);\necho $p;`,
          solutionCode: `${PHP_MAIN}class Product {\n    public function __construct(\n        public readonly int $id,\n        public readonly string $name,\n        private float $price,\n    ) {}\n\n    public function applyDiscount(float $percent): void {\n        $this->price -= $this->price * ($percent / 100);\n    }\n\n    public function __toString(): string {\n        return "{$this->name} — $" . number_format($this->price, 2);\n    }\n}\n\n$p = new Product(1, "Mouse", 25);\n$p->applyDiscount(20);\necho $p;`,
          tests: [
            { id: 1, label: "applyDiscount reduces price", keywords: [{ pattern: "\\$this->price\\s*-=" }] },
            { id: 2, label: "Implements __toString()", keywords: [{ pattern: "function\\s+__toString" }] },
          ],
        },
      },
    ],
  },
];

export const PHP_OOP_LESSONS = PHP_OOP_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const PHP_OOP_TOTAL_XP = PHP_OOP_LESSONS.reduce(
  (sum, l) => sum + (l.xp || 0),
  0,
);
