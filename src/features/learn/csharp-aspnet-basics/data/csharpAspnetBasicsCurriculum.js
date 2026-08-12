// PolyCode — C# ASP.NET Basics Interactive Course
// 3 chapters · 6 lessons · Pattern/theory-focused (ASP.NET needs a real web server,
// so this course follows the same un-runnable-content approach as Quantum Mechanics —
// challenges are graded on code patterns, not live execution)

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

const RAW_CSHARP_ASPNET_BASICS_CHAPTERS = [
  {
    id: "aspnet-fundamentals",
    title: "ASP.NET Core Fundamentals",
    icon: "🌐",
    color: ACCENT,
    lessons: [
      {
        id: "cs-aspnet-0",
        title: "What is ASP.NET Core?",
        xp: 12,
        theory: [
          text(
            "**ASP.NET Core** is Microsoft's open-source, cross-platform framework for building web apps and APIs in C#. A minimal ASP.NET Core app can be just a few lines using **Minimal APIs**.",
            {
              label: "A minimal ASP.NET Core app",
              content: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello, PolyCode!");

app.Run();`,
            },
          ),
          text(
            "`WebApplication.CreateBuilder` sets up configuration, logging, and dependency injection. `app.MapGet` registers a route. `app.Run()` starts listening for requests.",
          ),
          callout(
            "note",
            "This course covers the **patterns and syntax** of ASP.NET Core. Since it needs a real web server, challenges are checked by matching the shape of your code rather than running a live server in the browser.",
          ),
          quiz(
            "What does app.MapGet(\"/\", () => \"Hello\") do?",
            [
              "Defines a database migration",
              "Registers a route that responds to GET requests at \"/\"",
              "Starts the server immediately",
              "Configures logging",
            ],
            1,
            "MapGet registers an HTTP GET endpoint at the given route, with the lambda as its handler.",
          ),
        ],
        challenge: {
          title: "Hello World API",
          description:
            "Set up a minimal ASP.NET Core app: create the builder, build the app, map a GET route at `\"/\"` that returns `\"Hello, PolyCode!\"`, then call `app.Run()`.",
          starterCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Map a GET route at "/" returning "Hello, PolyCode!"


// Start the app
`,
          solutionCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello, PolyCode!");

app.Run();`,
          tests: [
            {
              id: 1,
              label: "Creates the builder",
              keywords: [{ pattern: "WebApplication\\.CreateBuilder" }],
            },
            {
              id: 2,
              label: "Maps a GET route",
              keywords: [{ pattern: "app\\.MapGet\\(\"/\"" }],
            },
            {
              id: 3,
              label: "Calls app.Run()",
              keywords: [{ pattern: "app\\.Run\\(\\)" }],
            },
          ],
        },
      },
      {
        id: "cs-aspnet-1",
        title: "Routing and HTTP Verbs",
        xp: 13,
        theory: [
          text(
            "ASP.NET Core maps each HTTP verb to its own method: `MapGet`, `MapPost`, `MapPut`, `MapDelete`. Route parameters are captured with `{curly braces}` in the path.",
            {
              label: "Routes for each HTTP verb",
              content: `app.MapGet("/products/{id}", (int id) => $"Product {id}");
app.MapPost("/products", (Product p) => Results.Created($"/products/{p.Id}", p));
app.MapPut("/products/{id}", (int id, Product p) => Results.Ok(p));
app.MapDelete("/products/{id}", (int id) => Results.NoContent());`,
            },
          ),
          diagram("REST Verbs", [
            {
              id: "get",
              label: "GET",
              color: ACCENT,
              items: ["Read data", "No body"],
            },
            {
              id: "post",
              label: "POST",
              color: "#3b82f6",
              items: ["Create data", "Has body"],
            },
            {
              id: "put",
              label: "PUT",
              color: "#f59e0b",
              items: ["Replace/update", "Has body"],
            },
            {
              id: "delete",
              label: "DELETE",
              color: "#ef4444",
              items: ["Remove data", "No body"],
            },
          ]),
          quiz(
            "In app.MapGet(\"/products/{id}\", (int id) => ...), what does {id} do?",
            [
              "Nothing, it's just documentation",
              "Captures a route segment and binds it to the id parameter",
              "Forces the route to require authentication",
              "Sets a default value for id",
            ],
            1,
            "Route parameters in {curly braces} are bound automatically to matching handler parameters by name and type.",
          ),
        ],
        challenge: {
          title: "CRUD Routes for /tasks",
          description:
            "Add four routes for a `/tasks` resource: `MapGet(\"/tasks/{id}\")`, `MapPost(\"/tasks\")`, `MapPut(\"/tasks/{id}\")`, and `MapDelete(\"/tasks/{id}\")`. Handler bodies can be simple placeholders.",
          starterCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Add MapGet, MapPost, MapPut, MapDelete for /tasks


app.Run();`,
          solutionCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/tasks/{id}", (int id) => $"Task {id}");
app.MapPost("/tasks", (Task t) => Results.Created($"/tasks/{t.Id}", t));
app.MapPut("/tasks/{id}", (int id, Task t) => Results.Ok(t));
app.MapDelete("/tasks/{id}", (int id) => Results.NoContent());

app.Run();`,
          tests: [
            {
              id: 1,
              label: "Maps GET /tasks/{id}",
              keywords: [{ pattern: "MapGet\\(\"/tasks/\\{id\\}\"" }],
            },
            {
              id: 2,
              label: "Maps POST /tasks",
              keywords: [{ pattern: "MapPost\\(\"/tasks\"" }],
            },
            {
              id: 3,
              label: "Maps DELETE /tasks/{id}",
              keywords: [{ pattern: "MapDelete\\(\"/tasks/\\{id\\}\"" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "building-apis",
    title: "Building APIs",
    icon: "🔌",
    color: ACCENT,
    lessons: [
      {
        id: "cs-aspnet-2",
        title: "Model Binding and DTOs",
        xp: 14,
        theory: [
          text(
            "A **DTO** (Data Transfer Object) is a plain class describing the shape of data sent to or from an endpoint. ASP.NET Core automatically deserializes JSON request bodies into a matching DTO — this is **model binding**.",
            {
              label: "Defining and using a DTO",
              content: `public class CreateProductRequest {
    public string Name { get; set; }
    public decimal Price { get; set; }
}

app.MapPost("/products", (CreateProductRequest req) => {
    return Results.Created("/products/1", new { req.Name, req.Price });
});`,
            },
          ),
          callout(
            "tip",
            "Properties use `{ get; set; }` — these are **auto-properties**, a shorthand for defining simple public fields with getters and setters.",
          ),
          quiz(
            "What is a DTO used for in a minimal API?",
            [
              "Connecting to the database directly",
              "Describing the shape of request/response data so it can be bound automatically",
              "Replacing the need for routes",
              "Handling authentication only",
            ],
            1,
            "A DTO defines the expected JSON shape. ASP.NET Core's model binding uses it to convert incoming JSON into a typed C# object automatically.",
          ),
        ],
        challenge: {
          title: "Create a Comment DTO",
          description:
            "Define a `CreateCommentRequest` class with `string Author` and `string Text` auto-properties. Then add a `MapPost(\"/comments\")` route that accepts a `CreateCommentRequest` and returns `Results.Created`.",
          starterCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Define CreateCommentRequest with Author and Text


// Add the POST /comments route


app.Run();`,
          solutionCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

public class CreateCommentRequest {
    public string Author { get; set; }
    public string Text { get; set; }
}

app.MapPost("/comments", (CreateCommentRequest req) => {
    return Results.Created("/comments/1", req);
});

app.Run();`,
          tests: [
            {
              id: 1,
              label: "Defines CreateCommentRequest class",
              keywords: [{ pattern: "class\\s+CreateCommentRequest" }],
            },
            {
              id: 2,
              label: "Has Author and Text auto-properties",
              keywords: [{ pattern: "Author\\s*\\{\\s*get;\\s*set;\\s*\\}" }],
            },
            {
              id: 3,
              label: "Maps POST /comments",
              keywords: [{ pattern: "MapPost\\(\"/comments\"" }],
            },
          ],
        },
      },
      {
        id: "cs-aspnet-3",
        title: "Returning Results and Status Codes",
        xp: 13,
        theory: [
          text(
            "The `Results` class provides helpers for returning proper HTTP responses with the right status code — instead of just returning raw data.",
            {
              label: "Common Results helpers",
              content: `app.MapGet("/products/{id}", (int id) => {
    var product = FindProduct(id);
    if (product == null) return Results.NotFound();
    return Results.Ok(product);
});

app.MapPost("/products", (Product p) =>
    Results.Created($"/products/{p.Id}", p));`,
            },
          ),
          diagram("Common Status Codes", [
            {
              id: "200",
              label: "200 OK",
              color: ACCENT,
              items: ["Results.Ok()", "Successful GET/PUT"],
            },
            {
              id: "201",
              label: "201 Created",
              color: "#3b82f6",
              items: ["Results.Created()", "Successful POST"],
            },
            {
              id: "404",
              label: "404 Not Found",
              color: "#f59e0b",
              items: ["Results.NotFound()", "Resource missing"],
            },
          ]),
          quiz(
            "Which Results helper should you return when a POST request successfully creates a new resource?",
            [
              "Results.Ok()",
              "Results.NotFound()",
              "Results.Created()",
              "Results.NoContent()",
            ],
            2,
            "Results.Created() returns a 201 status along with the location of the newly created resource — the conventional response for a successful POST.",
          ),
        ],
        challenge: {
          title: "Handle Missing Product",
          description:
            "Write a `MapGet(\"/products/{id}\")` handler. If `id` equals `0`, return `Results.NotFound()`. Otherwise, return `Results.Ok($\"Product {id}\")`.",
          starterCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Add the GET /products/{id} route with NotFound handling


app.Run();`,
          solutionCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/products/{id}", (int id) => {
    if (id == 0) return Results.NotFound();
    return Results.Ok($"Product {id}");
});

app.Run();`,
          tests: [
            {
              id: 1,
              label: "Maps GET /products/{id}",
              keywords: [{ pattern: "MapGet\\(\"/products/\\{id\\}\"" }],
            },
            {
              id: 2,
              label: "Returns Results.NotFound()",
              keywords: [{ pattern: "Results\\.NotFound\\(\\)" }],
            },
            {
              id: 3,
              label: "Returns Results.Ok()",
              keywords: [{ pattern: "Results\\.Ok\\(" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "di-middleware",
    title: "Dependency Injection & Middleware",
    icon: "🧱",
    color: ACCENT,
    lessons: [
      {
        id: "cs-aspnet-4",
        title: "Dependency Injection Basics",
        xp: 15,
        theory: [
          text(
            "ASP.NET Core has a built-in **dependency injection (DI)** container. You register a service once with `builder.Services`, and the framework automatically supplies it wherever it's needed — including directly in route handlers.",
            {
              label: "Registering and injecting a service",
              content: `public interface IGreeter {
    string Greet(string name);
}

public class Greeter : IGreeter {
    public string Greet(string name) => $"Hello, {name}!";
}

// Registration
builder.Services.AddSingleton<IGreeter, Greeter>();

// Injection — ASP.NET Core supplies IGreeter automatically
app.MapGet("/greet/{name}", (string name, IGreeter greeter) =>
    greeter.Greet(name));`,
            },
          ),
          callout(
            "tip",
            "`AddSingleton` creates one shared instance for the whole app's lifetime. `AddScoped` creates one per request, and `AddTransient` creates a new one every time it's injected.",
          ),
          quiz(
            "What does builder.Services.AddSingleton<IGreeter, Greeter>() do?",
            [
              "Deletes the Greeter class",
              "Registers Greeter as the implementation to inject wherever IGreeter is requested, shared app-wide",
              "Creates a new Greeter for every request",
              "Registers a new HTTP route",
            ],
            1,
            "AddSingleton registers Greeter as the concrete type ASP.NET Core provides whenever an IGreeter is requested, with exactly one shared instance for the app's lifetime.",
          ),
        ],
        challenge: {
          title: "Inject a Logger Service",
          description:
            "Define an `ILogger` interface with `void Log(string message)`, and a `ConsoleLogger` class implementing it. Register it with `builder.Services.AddSingleton<ILogger, ConsoleLogger>()`, then use it in a `MapGet(\"/ping\")` route that calls `logger.Log(\"ping\")` and returns `\"pong\"`.",
          starterCode: `var builder = WebApplication.CreateBuilder(args);

// Define ILogger and ConsoleLogger


// Register the service


var app = builder.Build();

// Add GET /ping that logs and returns "pong"


app.Run();`,
          solutionCode: `var builder = WebApplication.CreateBuilder(args);

public interface ILogger {
    void Log(string message);
}

public class ConsoleLogger : ILogger {
    public void Log(string message) => Console.WriteLine(message);
}

builder.Services.AddSingleton<ILogger, ConsoleLogger>();

var app = builder.Build();

app.MapGet("/ping", (ILogger logger) => {
    logger.Log("ping");
    return "pong";
});

app.Run();`,
          tests: [
            {
              id: 1,
              label: "Defines ILogger interface",
              keywords: [{ pattern: "interface\\s+ILogger" }],
            },
            {
              id: 2,
              label: "Registers the service with AddSingleton",
              keywords: [{ pattern: "AddSingleton<ILogger,\\s*ConsoleLogger>" }],
            },
            {
              id: 3,
              label: "Injects ILogger in the route handler",
              keywords: [{ pattern: "MapGet\\(\"/ping\",\\s*\\(ILogger\\s+logger\\)" }],
            },
          ],
        },
      },
      {
        id: "cs-aspnet-5",
        title: "The Middleware Pipeline",
        xp: 14,
        theory: [
          text(
            "Every request flows through a **middleware pipeline** — a chain of components that can inspect, modify, short-circuit, or log requests before they reach your route handlers. Order matters: middleware runs in the order it's added.",
            {
              label: "A simple logging middleware",
              content: `var app = builder.Build();

app.Use(async (context, next) => {
    Console.WriteLine($"Request: {context.Request.Path}");
    await next(); // pass control to the next middleware
    Console.WriteLine($"Response: {context.Response.StatusCode}");
});

app.MapGet("/", () => "Hello!");

app.Run();`,
            },
          ),
          diagram("Request Pipeline", [
            {
              id: "logging",
              label: "Logging middleware",
              color: ACCENT,
              items: ["Runs first", "Logs the request"],
            },
            {
              id: "auth",
              label: "Auth middleware",
              color: "#3b82f6",
              items: ["Runs next", "Checks credentials"],
            },
            {
              id: "handler",
              label: "Route handler",
              color: "#f59e0b",
              items: ["Runs last", "Produces the response"],
            },
          ]),
          callout(
            "warn",
            "Forgetting to call `await next()` inside a middleware **stops the pipeline** — the request never reaches later middleware or the route handler.",
          ),
          quiz(
            "What happens if a middleware doesn't call await next()?",
            [
              "Nothing changes, next() is optional",
              "The pipeline short-circuits — later middleware and the route handler never run",
              "It throws a compile error",
              "It automatically calls the route handler anyway",
            ],
            1,
            "Skipping next() stops the request from reaching anything registered after that middleware — this is sometimes intentional (e.g. to reject unauthorized requests early), but easy to do by accident.",
          ),
        ],
        challenge: {
          title: "Add a Logging Middleware",
          description:
            "Use `app.Use(async (context, next) => { ... })` to log the request path with `Console.WriteLine(context.Request.Path)` before calling `await next()`.",
          starterCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Add a logging middleware here


app.MapGet("/", () => "Hello!");

app.Run();`,
          solutionCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.Use(async (context, next) => {
    Console.WriteLine(context.Request.Path);
    await next();
});

app.MapGet("/", () => "Hello!");

app.Run();`,
          tests: [
            {
              id: 1,
              label: "Uses app.Use with async middleware",
              keywords: [{ pattern: "app\\.Use\\(async\\s*\\(context,\\s*next\\)" }],
            },
            {
              id: 2,
              label: "Logs the request path",
              keywords: [{ pattern: "context\\.Request\\.Path" }],
            },
            {
              id: 3,
              label: "Calls await next()",
              keywords: [{ pattern: "await\\s+next\\(\\)" }],
            },
          ],
        },
      },
    ],
  },
];

export const CSHARP_ASPNET_BASICS_CHAPTERS = RAW_CSHARP_ASPNET_BASICS_CHAPTERS;

export const CSHARP_ASPNET_BASICS_LESSONS = CSHARP_ASPNET_BASICS_CHAPTERS.flatMap(
  (ch) =>
    ch.lessons.map((l) => ({
      ...l,
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
);

export const CSHARP_ASPNET_BASICS_TOTAL_XP = CSHARP_ASPNET_BASICS_LESSONS.reduce(
  (s, l) => s + l.xp,
  0,
);
