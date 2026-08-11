// PolyCode — C# OOP Interactive Course
// 4 chapters · 8 lessons · Browser sandbox validation
// Follows the exact same content shape as csharp-fundamentals/data/csharpCurriculum.js

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

const RAW_CSHARP_OOP_CHAPTERS = [
  {
    id: "classes-objects",
    title: "Classes & Objects",
    icon: "🏗️",
    color: ACCENT,
    lessons: [
      {
        id: "cs-oop-0",
        title: "Classes, Fields, and Methods",
        xp: 12,
        theory: [
          text(
            "A **class** is a blueprint for creating objects. It groups related data (**fields**) and behavior (**methods**) into a single reusable unit — the foundation of object-oriented programming in C#.",
            {
              label: "Defining and using a class",
              content: `class Dog {
    public string Name;
    public int Age;

    public void Bark() {
        Console.WriteLine(Name + " says woof!");
    }
}

Dog rex = new Dog();
rex.Name = "Rex";
rex.Age = 3;
rex.Bark();`,
            },
          ),
          text(
            "Each `Dog` you create with `new Dog()` is a separate **object** (an instance of the class). Every instance gets its own copy of the fields, so `rex.Name` and another dog's `Name` don't interfere with each other.",
          ),
          diagram("Class vs. Object", [
            {
              id: "class",
              label: "class Dog",
              color: ACCENT,
              items: ["Blueprint", "Defines Name, Age, Bark()"],
            },
            {
              id: "obj1",
              label: "rex (object)",
              color: "#3b82f6",
              items: ["Name = \"Rex\"", "Age = 3"],
            },
            {
              id: "obj2",
              label: "buddy (object)",
              color: "#f59e0b",
              items: ["Name = \"Buddy\"", "Age = 5"],
            },
          ]),
          callout(
            "tip",
            "By convention, C# class names use **PascalCase** (e.g. `Dog`, `BankAccount`), while local variables use **camelCase** (e.g. `rex`, `bankAccount`).",
          ),
          quiz(
            "What does `new Dog()` create?",
            [
              "A copy of the class definition itself",
              "A new object (instance) of the Dog class",
              "A static field",
              "A method",
            ],
            1,
            "`new` allocates memory for a fresh object based on the class blueprint and returns a reference to it.",
          ),
        ],
        challenge: {
          title: "Build a Car Class",
          description:
            "Create a `Car` class with a public string field `Model` and a method `Honk()` that prints `\"Beep beep!\"`. Then create an instance, set its `Model` to `\"Civic\"`, and call `Honk()`.",
          starterCode: `using System;

class Car {
    // Declare a public string field named Model


    // Add a Honk method that prints "Beep beep!"

}

class Program {
    static void Main() {
        // Create a Car, set its Model, and call Honk()

    }
}`,
          solutionCode: `using System;

class Car {
    public string Model;

    public void Honk() {
        Console.WriteLine("Beep beep!");
    }
}

class Program {
    static void Main() {
        Car myCar = new Car();
        myCar.Model = "Civic";
        myCar.Honk();
    }
}`,
          tests: [
            {
              id: 1,
              label: "Declares a public Model field",
              keywords: [{ pattern: "public\\s+string\\s+Model" }],
            },
            {
              id: 2,
              label: "Defines a Honk method",
              keywords: [{ pattern: "void\\s+Honk\\s*\\(" }],
            },
            {
              id: 3,
              label: "Creates a Car instance",
              keywords: [{ pattern: "new\\s+Car\\s*\\(" }],
            },
            {
              id: 4,
              label: "Calls Honk()",
              keywords: [{ pattern: "\\.Honk\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "cs-oop-1",
        title: "Constructors & this",
        xp: 14,
        theory: [
          text(
            "A **constructor** is a special method that runs automatically when an object is created with `new`. It has the same name as the class and no return type — its job is to set up the object's initial state.",
            {
              label: "A constructor in action",
              content: `class Dog {
    public string Name;

    public Dog(string name) {
        Name = name;
    }
}

Dog rex = new Dog("Rex"); // constructor runs immediately`,
            },
          ),
          text(
            "The **`this`** keyword refers to the current instance. It's especially useful when a constructor parameter has the same name as a field — `this.Name` clearly means \"the field\", not the parameter.",
            {
              label: "Resolving a naming clash with this",
              content: `class Dog {
    public string Name;

    public Dog(string name) {
        this.Name = name; // this.Name = field, name = parameter
    }
}`,
            },
          ),
          callout(
            "info",
            "If you don't write any constructor, C# silently provides a free **default constructor** that takes no arguments. As soon as you write your own constructor, that free one disappears.",
          ),
          quiz(
            "What is the main purpose of a constructor?",
            [
              "To destroy an object",
              "To initialize an object's state when it's created",
              "To define a static field",
              "To print output to the console",
            ],
            1,
            "Constructors run once, right when `new` creates the object, to set it up with valid starting values.",
          ),
        ],
        challenge: {
          title: "Add a Constructor",
          description:
            "Give the `Car` class a constructor that takes a `string model` parameter and assigns it to the `Model` field using `this.Model`. Create a car with model `\"Tesla\"` in one line.",
          starterCode: `using System;

class Car {
    public string Model;

    // Add a constructor here

}

class Program {
    static void Main() {
        // Create a Car passing "Tesla" directly to the constructor
        Console.WriteLine(myCar.Model);
    }
}`,
          solutionCode: `using System;

class Car {
    public string Model;

    public Car(string model) {
        this.Model = model;
    }
}

class Program {
    static void Main() {
        Car myCar = new Car("Tesla");
        Console.WriteLine(myCar.Model);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Defines a Car constructor",
              keywords: [{ pattern: "public\\s+Car\\s*\\(" }],
            },
            {
              id: 2,
              label: "Uses this.Model to assign",
              keywords: [{ pattern: "this\\.Model\\s*=" }],
            },
            {
              id: 3,
              label: "Constructs Car with \"Tesla\"",
              keywords: [{ pattern: "new\\s+Car\\s*\\(\\s*\"Tesla\"\\s*\\)" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "encapsulation",
    title: "Encapsulation",
    icon: "🔒",
    color: "#0ea5e9",
    lessons: [
      {
        id: "cs-oop-2",
        title: "Access Modifiers & Properties",
        xp: 14,
        theory: [
          text(
            "**Encapsulation** means hiding an object's internal data and only exposing controlled ways to interact with it. `public` members are accessible from anywhere; `private` members are only accessible inside the class itself.",
            {
              label: "private field + public property",
              content: `class BankAccount {
    private double balance; // hidden from outside

    public double Balance {
        get { return balance; }
        set {
            if (value >= 0) balance = value;
        }
    }
}`,
            },
          ),
          text(
            "A **property** looks like a field from the outside (`account.Balance`) but is backed by `get` and `set` blocks you control. This lets you validate data — like rejecting a negative balance — without the caller ever seeing the raw field.",
          ),
          callout(
            "warning",
            "Making every field `public` defeats the purpose of encapsulation — any code anywhere could set `Balance = -9999` with no validation. Keep fields `private` and expose safe `public` properties instead.",
          ),
          quiz(
            "Why use a private field with a public property instead of just a public field?",
            [
              "Properties run faster than fields",
              "It lets you validate or control access to the data",
              "Private fields use less memory",
              "There is no real difference",
            ],
            1,
            "Properties give you a controlled gateway — you can validate, log, or transform values on the way in or out.",
          ),
        ],
        challenge: {
          title: "Protect the Balance",
          description:
            "Create a `BankAccount` class with a `private double balance` field and a `public Balance` property. The setter should only update `balance` if the incoming `value` is `>= 0`.",
          starterCode: `using System;

class BankAccount {
    // private field


    // public Balance property with get/set

}

class Program {
    static void Main() {
        BankAccount acc = new BankAccount();
        acc.Balance = 500;
        Console.WriteLine(acc.Balance);
    }
}`,
          solutionCode: `using System;

class BankAccount {
    private double balance;

    public double Balance {
        get { return balance; }
        set {
            if (value >= 0) balance = value;
        }
    }
}

class Program {
    static void Main() {
        BankAccount acc = new BankAccount();
        acc.Balance = 500;
        Console.WriteLine(acc.Balance);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Declares a private balance field",
              keywords: [{ pattern: "private\\s+double\\s+balance" }],
            },
            {
              id: 2,
              label: "Defines a public Balance property",
              keywords: [{ pattern: "public\\s+double\\s+Balance" }],
            },
            {
              id: 3,
              label: "Has a get accessor",
              keywords: [{ pattern: "get\\s*{" }],
            },
            {
              id: 4,
              label: "Setter checks value >= 0",
              keywords: [{ pattern: "value\\s*>=\\s*0" }],
            },
          ],
        },
      },
      {
        id: "cs-oop-3",
        title: "Auto-Properties & readonly",
        xp: 12,
        theory: [
          text(
            "When a property doesn't need custom validation logic, C# lets you skip the manual backing field entirely with an **auto-property** — the compiler generates the hidden field for you.",
            {
              label: "Auto-property shorthand",
              content: `class Book {
    public string Title { get; set; }
    public string Author { get; set; }
}

Book b = new Book();
b.Title = "Dune";`,
            },
          ),
          text(
            "Adding **`readonly`** to a field (or using `{ get; }` with no setter on a property) means it can only be assigned once — typically inside the constructor. This is great for values that should never change after an object is created, like an `Id`.",
            {
              label: "A read-only property set only in the constructor",
              content: `class Book {
    public string Title { get; }

    public Book(string title) {
        Title = title;
    }
}`,
            },
          ),
          callout(
            "tip",
            "Auto-properties with `{ get; set; }` are the C# default for simple data-holding classes — you only need a full manual property when you need custom logic in the getter or setter.",
          ),
          quiz(
            "What does `public string Title { get; }` (no setter) mean?",
            [
              "Title can be changed anywhere in the program",
              "Title can only be set once, typically in the constructor",
              "Title is a private field",
              "This is invalid C# syntax",
            ],
            1,
            "A get-only auto-property can be assigned in the constructor (or as an initializer) but not modified afterward — making the object immutable for that value.",
          ),
        ],
        challenge: {
          title: "Immutable Book",
          description:
            "Create a `Book` class with a get-only auto-property `Title` (type `string`). Add a constructor that takes a `title` parameter and assigns it to `Title`.",
          starterCode: `using System;

class Book {
    // get-only auto-property Title


    // constructor

}

class Program {
    static void Main() {
        Book b = new Book("Dune");
        Console.WriteLine(b.Title);
    }
}`,
          solutionCode: `using System;

class Book {
    public string Title { get; }

    public Book(string title) {
        Title = title;
    }
}

class Program {
    static void Main() {
        Book b = new Book("Dune");
        Console.WriteLine(b.Title);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Declares get-only Title property",
              keywords: [{ pattern: "public\\s+string\\s+Title\\s*{\\s*get;\\s*}" }],
            },
            {
              id: 2,
              label: "Defines a Book constructor",
              keywords: [{ pattern: "public\\s+Book\\s*\\(" }],
            },
            {
              id: 3,
              label: "Assigns Title in constructor",
              keywords: [{ pattern: "Title\\s*=\\s*title" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "inheritance-polymorphism",
    title: "Inheritance & Polymorphism",
    icon: "🧬",
    color: "#a855f7",
    lessons: [
      {
        id: "cs-oop-4",
        title: "Inheritance & base",
        xp: 16,
        theory: [
          text(
            "**Inheritance** lets one class (the derived/child class) reuse and extend the members of another (the base/parent class), using the `:` symbol. This models \"is-a\" relationships — a `Cat` **is an** `Animal`.",
            {
              label: "A derived class",
              content: `class Animal {
    public string Name;
    public void Eat() {
        Console.WriteLine(Name + " is eating.");
    }
}

class Cat : Animal {
    public void Meow() {
        Console.WriteLine(Name + " says meow!");
    }
}

Cat c = new Cat();
c.Name = "Whiskers";
c.Eat();  // inherited from Animal
c.Meow(); // defined in Cat`,
            },
          ),
          text(
            "Use **`base(...)`** inside a derived class's constructor to call the parent class's constructor and let it handle setting up inherited fields.",
            {
              label: "Calling the base constructor",
              content: `class Animal {
    public string Name;
    public Animal(string name) { Name = name; }
}

class Cat : Animal {
    public Cat(string name) : base(name) { }
}`,
            },
          ),
          diagram("Inheritance hierarchy", [
            {
              id: "animal",
              label: "Animal (base)",
              color: "#f59e0b",
              items: ["Name", "Eat()"],
            },
            {
              id: "cat",
              label: "Cat : Animal",
              color: "#a855f7",
              items: ["Inherits Name, Eat()", "Adds Meow()"],
            },
          ]),
          quiz(
            "What does `class Cat : Animal` mean?",
            [
              "Cat and Animal are unrelated",
              "Cat inherits from (extends) Animal",
              "Animal inherits from Cat",
              "Cat implements an interface called Animal",
            ],
            1,
            "The colon `:` after a class name means \"inherits from\" — Cat gets all of Animal's public/protected members plus whatever it adds itself.",
          ),
        ],
        challenge: {
          title: "Extend the Animal Class",
          description:
            "Create a base `Animal` class with a public string `Name` and a method `Eat()` that prints `Name + \" is eating.\"`. Then create a `Cat` class that inherits from `Animal` and adds a `Meow()` method that prints `Name + \" says meow!\"`.",
          starterCode: `using System;

class Animal {
    public string Name;
    public void Eat() {
        Console.WriteLine(Name + " is eating.");
    }
}

// Create class Cat that inherits from Animal


class Program {
    static void Main() {
        Cat c = new Cat();
        c.Name = "Whiskers";
        c.Eat();
        c.Meow();
    }
}`,
          solutionCode: `using System;

class Animal {
    public string Name;
    public void Eat() {
        Console.WriteLine(Name + " is eating.");
    }
}

class Cat : Animal {
    public void Meow() {
        Console.WriteLine(Name + " says meow!");
    }
}

class Program {
    static void Main() {
        Cat c = new Cat();
        c.Name = "Whiskers";
        c.Eat();
        c.Meow();
    }
}`,
          tests: [
            {
              id: 1,
              label: "Cat inherits from Animal",
              keywords: [{ pattern: "class\\s+Cat\\s*:\\s*Animal" }],
            },
            {
              id: 2,
              label: "Cat defines Meow()",
              keywords: [{ pattern: "void\\s+Meow\\s*\\(" }],
            },
            {
              id: 3,
              label: "Meow prints \"says meow!\"",
              keywords: [{ pattern: "says meow!" }],
            },
          ],
        },
      },
      {
        id: "cs-oop-5",
        title: "Overriding with virtual & override",
        xp: 16,
        theory: [
          text(
            "By default, a derived class can't change how an inherited method behaves. Marking a base method **`virtual`** allows a derived class to replace it using **`override`** — this is the core of **polymorphism**.",
            {
              label: "virtual + override",
              content: `class Animal {
    public virtual void Speak() {
        Console.WriteLine("Some generic animal sound");
    }
}

class Dog : Animal {
    public override void Speak() {
        Console.WriteLine("Woof!");
    }
}`,
            },
          ),
          text(
            "Polymorphism means you can treat a `Dog` as an `Animal` and still get dog-specific behavior. `Animal a = new Dog(); a.Speak();` prints `\"Woof!\"`, not the generic sound — C# calls the *actual* object's overridden method, not the variable's declared type.",
          ),
          callout(
            "tip",
            "Inside an override, you can still call the original base behavior with `base.MethodName()` if you want to extend it rather than fully replace it.",
          ),
          quiz(
            "Given `Animal a = new Dog();` where Dog overrides Speak(), what does `a.Speak()` print?",
            [
              "The Animal base version, since a is typed as Animal",
              "The Dog override, since that's the actual object",
              "A compile error",
              "Nothing — Speak() is never called",
            ],
            1,
            "Polymorphism resolves the call based on the object's real type at runtime, not the variable's declared type — this is called 'dynamic dispatch'.",
          ),
        ],
        challenge: {
          title: "Override Speak()",
          description:
            "Make `Speak()` on `Animal` virtual, printing `\"...\"`. Create a `Dog` class inheriting from `Animal` that overrides `Speak()` to print `\"Woof!\"`.",
          starterCode: `using System;

class Animal {
    // make Speak virtual, printing "..."

}

// Create Dog : Animal, overriding Speak() to print "Woof!"


class Program {
    static void Main() {
        Animal a = new Dog();
        a.Speak();
    }
}`,
          solutionCode: `using System;

class Animal {
    public virtual void Speak() {
        Console.WriteLine("...");
    }
}

class Dog : Animal {
    public override void Speak() {
        Console.WriteLine("Woof!");
    }
}

class Program {
    static void Main() {
        Animal a = new Dog();
        a.Speak();
    }
}`,
          tests: [
            {
              id: 1,
              label: "Speak() is virtual on Animal",
              keywords: [{ pattern: "virtual\\s+void\\s+Speak" }],
            },
            {
              id: 2,
              label: "Dog overrides Speak()",
              keywords: [{ pattern: "override\\s+void\\s+Speak" }],
            },
            {
              id: 3,
              label: "Override prints Woof!",
              keywords: [{ pattern: "Woof!" }],
            },
          ],
        },
      },
      {
        id: "cs-oop-6",
        title: "Abstract Classes & Interfaces",
        xp: 18,
        theory: [
          text(
            "An **abstract class** can't be instantiated directly (`new Shape()` is illegal) and can declare **abstract methods** with no body — every non-abstract derived class *must* implement them.",
            {
              label: "An abstract base class",
              content: `abstract class Shape {
    public abstract double Area();
}

class Circle : Shape {
    public double Radius;
    public override double Area() {
        return Math.PI * Radius * Radius;
    }
}`,
            },
          ),
          text(
            "An **interface** (declared with `interface`) is a pure contract — it only lists method signatures, no implementation at all. A class can inherit from only *one* base class, but can implement *many* interfaces.",
            {
              label: "Implementing an interface",
              content: `interface IShape {
    double Area();
}

class Square : IShape {
    public double Side;
    public double Area() {
        return Side * Side;
    }
}`,
            },
          ),
          callout(
            "info",
            "Rule of thumb: use an **abstract class** when related classes share common code and state; use an **interface** when unrelated classes just need to guarantee the same capability (like `IComparable` or `IDisposable`).",
          ),
          quiz(
            "How many interfaces can a single C# class implement?",
            [
              "Zero",
              "Exactly one",
              "As many as it needs",
              "Only if it's abstract",
            ],
            2,
            "Unlike single class inheritance, a class can implement any number of interfaces, since interfaces only define contracts, not shared state.",
          ),
        ],
        challenge: {
          title: "Shape Interface",
          description:
            "Define an `IShape` interface with a method `Area()` returning `double`. Create a `Square` class implementing `IShape`, with a public `double Side` field, where `Area()` returns `Side * Side`.",
          starterCode: `using System;

// Define interface IShape with Area() returning double


// Create class Square : IShape


class Program {
    static void Main() {
        Square sq = new Square();
        sq.Side = 4;
        Console.WriteLine(sq.Area());
    }
}`,
          solutionCode: `using System;

interface IShape {
    double Area();
}

class Square : IShape {
    public double Side;
    public double Area() {
        return Side * Side;
    }
}

class Program {
    static void Main() {
        Square sq = new Square();
        sq.Side = 4;
        Console.WriteLine(sq.Area());
    }
}`,
          tests: [
            {
              id: 1,
              label: "Defines IShape interface",
              keywords: [{ pattern: "interface\\s+IShape" }],
            },
            {
              id: 2,
              label: "Square implements IShape",
              keywords: [{ pattern: "class\\s+Square\\s*:\\s*IShape" }],
            },
            {
              id: 3,
              label: "Area returns Side * Side",
              keywords: [{ pattern: "Side\\s*\\*\\s*Side" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "static-members",
    title: "Static Members",
    icon: "📌",
    color: "#dc2626",
    lessons: [
      {
        id: "cs-oop-7",
        title: "Static Fields & Methods",
        xp: 14,
        theory: [
          text(
            "A **`static`** member belongs to the class itself, not to any individual object. Every instance shares the exact same static field — change it through one object, and every reference sees the update.",
            {
              label: "A static counter shared by all instances",
              content: `class Dog {
    public static int Count = 0;

    public Dog() {
        Count++; // every new Dog increments the shared counter
    }
}

Dog a = new Dog();
Dog b = new Dog();
Console.WriteLine(Dog.Count); // 2`,
            },
          ),
          text(
            "You call a static member through the **class name**, not an instance — `Dog.Count`, never `a.Count`. Static methods can only directly access other static members, since they don't run in the context of any particular object.",
          ),
          callout(
            "warning",
            "Overusing static state can make code harder to test and reason about, since it's essentially global. Use it deliberately — for things like shared counters, constants, or utility methods — not as a default.",
          ),
          quiz(
            "If `Dog.Count` is static and two Dog objects are created, how many separate copies of Count exist?",
            [
              "Two — one per object",
              "One — shared across all Dog instances",
              "Zero, until accessed",
              "It depends on the constructor",
            ],
            1,
            "Static fields exist exactly once per class, no matter how many instances you create — that's what makes them useful as shared counters.",
          ),
        ],
        challenge: {
          title: "Track Instance Count",
          description:
            "Add a `public static int Count` field to `Dog`, starting at 0. In the constructor, increment `Count` each time a new `Dog` is created. Print `Dog.Count` after creating two dogs.",
          starterCode: `using System;

class Dog {
    // static Count field


    public Dog() {
        // increment Count

    }
}

class Program {
    static void Main() {
        Dog a = new Dog();
        Dog b = new Dog();
        Console.WriteLine(Dog.Count);
    }
}`,
          solutionCode: `using System;

class Dog {
    public static int Count = 0;

    public Dog() {
        Count++;
    }
}

class Program {
    static void Main() {
        Dog a = new Dog();
        Dog b = new Dog();
        Console.WriteLine(Dog.Count);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Declares static int Count",
              keywords: [{ pattern: "static\\s+int\\s+Count" }],
            },
            {
              id: 2,
              label: "Constructor increments Count",
              keywords: [{ pattern: "Count\\+\\+" }],
            },
            {
              id: 3,
              label: "Prints Dog.Count",
              keywords: [{ pattern: "Dog\\.Count" }],
            },
          ],
        },
      },
    ],
  },
];

export const CSHARP_OOP_CHAPTERS = RAW_CSHARP_OOP_CHAPTERS;

export const CSHARP_OOP_LESSONS = CSHARP_OOP_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const CSHARP_OOP_TOTAL_XP = CSHARP_OOP_LESSONS.reduce(
  (s, l) => s + l.xp,
  0,
);
