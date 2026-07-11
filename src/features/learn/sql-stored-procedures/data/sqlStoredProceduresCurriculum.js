export const SQLSTOREDPROCEDURES_CHAPTERS = [
  {
    id: "chapter-1",
    title: "Intro to Stored Procedures",
    icon: "📦",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-1",
        title: "What is a Stored Procedure?",
        chapterTitle: "Intro to Stored Procedures",
        xp: 20,
        theory: [
          {
            type: "text",
            content: "A stored procedure is a prepared SQL code that you can save, so the code can be reused over and over again.",
          },
          {
            type: "text",
            content: "If you have an SQL query that you write over and over again, save it as a stored procedure, and then just call it to execute it."
          },
          {
            type: "callout",
            variant: "info",
            title: "Performance",
            content: "Stored procedures can improve performance because the database engine compiles them once and caches the execution plan."
          }
        ],
        challenge: {
          id: "challenge-1",
          title: "Create a Basic Procedure",
          description: "Write a SQL statement to create a stored procedure named `SelectAllCustomers` that selects everything from the `customers` table.",
          starter: "-- Write your CREATE PROCEDURE statement here\n",
          tests: [
            {
              id: "test-1",
              description: "Must create the procedure",
              dbState: {},
              expected: []
            }
          ],
          keywords: ["CREATE", "PROCEDURE", "SelectAllCustomers", "AS", "SELECT", "*", "FROM", "customers"]
        }
      },
      {
        id: "lesson-2",
        title: "Executing a Procedure",
        chapterTitle: "Intro to Stored Procedures",
        xp: 20,
        theory: [
          {
            type: "text",
            content: "Once a stored procedure is created, you can execute (or call) it."
          },
          {
            type: "code",
            lang: "sql",
            label: "Execution Syntax (SQL Server)",
            content: "EXEC SelectAllCustomers;"
          },
          {
            type: "code",
            lang: "sql",
            label: "Execution Syntax (MySQL)",
            content: "CALL SelectAllCustomers();"
          }
        ],
        challenge: {
          id: "challenge-2",
          title: "Call the Procedure",
          description: "Write a statement to execute the stored procedure `GetDailyReport` using the standard `EXEC` keyword.",
          starter: "-- Execute the procedure here\n",
          tests: [
            {
              id: "test-1",
              description: "Must execute the procedure",
              dbState: {},
              expected: []
            }
          ],
          keywords: ["EXEC", "GetDailyReport"]
        }
      }
    ]
  },
  {
    id: "chapter-2",
    title: "Parameters",
    icon: "🎛️",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-3",
        title: "Single Parameters",
        chapterTitle: "Parameters",
        xp: 30,
        theory: [
          {
            type: "text",
            content: "Stored procedures become much more powerful when you pass parameters to them. A parameter acts as a variable that the procedure can use in its queries."
          },
          {
            type: "code",
            lang: "sql",
            label: "Parameter Example",
            content: "CREATE PROCEDURE SelectCustomersByCity @City nvarchar(30)\nAS\nSELECT * FROM Customers WHERE City = @City;"
          }
        ],
        challenge: {
          id: "challenge-3",
          title: "Create Parameterized Procedure",
          description: "Create a stored procedure named `GetByStatus` that takes one parameter `@Status nvarchar(20)`. It should select all from `orders` where `status = @Status`.",
          starter: "-- Write your parameterized procedure here\n",
          tests: [
            {
              id: "test-1",
              description: "Must create parameterized procedure",
              dbState: {},
              expected: []
            }
          ],
          keywords: ["CREATE", "PROCEDURE", "GetByStatus", "@Status", "nvarchar(20)", "AS", "SELECT", "WHERE", "status", "=", "@Status"]
        }
      },
      {
        id: "lesson-4",
        title: "Executing with Parameters",
        chapterTitle: "Parameters",
        xp: 25,
        theory: [
          {
            type: "text",
            content: "To execute a stored procedure that requires parameters, you simply pass the values after the procedure name."
          },
          {
            type: "code",
            lang: "sql",
            label: "Execution with Params",
            content: "EXEC SelectCustomersByCity @City = 'London';"
          }
        ],
        challenge: {
          id: "challenge-4",
          title: "Call with Parameters",
          description: "Execute the `GetByStatus` procedure, passing the value `'Shipped'` into the `@Status` parameter.",
          starter: "-- Execute procedure here\n",
          tests: [
            {
              id: "test-1",
              description: "Must execute with parameter",
              dbState: {},
              expected: []
            }
          ],
          keywords: ["EXEC", "GetByStatus", "@Status", "=", "'Shipped'"]
        }
      },
      {
        id: "lesson-5",
        title: "Multiple Parameters",
        chapterTitle: "Parameters",
        xp: 30,
        theory: [
          {
            type: "text",
            content: "You can define multiple parameters by separating them with commas."
          },
          {
            type: "code",
            lang: "sql",
            label: "Multiple Params",
            content: "CREATE PROCEDURE GetUsers @City nvarchar(30), @PostalCode nvarchar(10)\nAS\nSELECT * FROM Customers WHERE City = @City AND PostalCode = @PostalCode;"
          }
        ],
        challenge: {
          id: "challenge-5",
          title: "Multiple Param Execution",
          description: "Execute the `GetUsers` procedure passing `@City = 'Paris'` and `@PostalCode = '75000'`.",
          starter: "-- Execute procedure here\n",
          tests: [
            {
              id: "test-1",
              description: "Must pass two parameters",
              dbState: {},
              expected: []
            }
          ],
          keywords: ["EXEC", "GetUsers", "@City", "=", "'Paris'", ",", "@PostalCode", "=", "'75000'"]
        }
      }
    ]
  },
  {
    id: "chapter-3",
    title: "Control Flow",
    icon: "🔀",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-6",
        title: "IF...ELSE",
        chapterTitle: "Control Flow",
        xp: 35,
        theory: [
          {
            type: "text",
            content: "Stored procedures can contain procedural code, including `IF...ELSE` blocks to control the flow of execution based on conditions."
          },
          {
            type: "code",
            lang: "sql",
            label: "IF ELSE Example",
            content: "IF @count > 10\nBEGIN\n  PRINT 'Too many'\nEND\nELSE\nBEGIN\n  PRINT 'Acceptable'\nEND"
          }
        ],
        challenge: {
          id: "challenge-6",
          title: "Write an IF Condition",
          description: "Write an `IF` statement checking if the variable `@stock` is less than `5`. If it is, `SELECT 'Low Stock'`. (You don't need to write the ELSE).",
          starter: "-- Write your IF block here\n",
          tests: [
            {
              id: "test-1",
              description: "Must use IF statement",
              dbState: {},
              expected: []
            }
          ],
          keywords: ["IF", "@stock", "<", "5", "BEGIN", "SELECT", "'Low Stock'", "END"]
        }
      }
    ]
  }
];

export const SQLSTOREDPROCEDURES_LESSONS = SQLSTOREDPROCEDURES_CHAPTERS.flatMap((chapter) =>
  chapter.lessons.map((lesson) => ({
    ...lesson,
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    chapterColor: chapter.color,
    chapterIcon: chapter.icon,
  }))
);

export const SQLSTOREDPROCEDURES_TOTAL_XP = SQLSTOREDPROCEDURES_LESSONS.reduce(
  (total, lesson) => total + (lesson.xp || 0),
  0
);
