export const SQLSUBQUERIES_CHAPTERS = [
  {
    id: "chapter-1",
    title: "Intro to Subqueries",
    icon: "🪆",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-1",
        title: "What is a Subquery?",
        chapterTitle: "Intro to Subqueries",
        xp: 20,
        theory: [
          {
            type: "text",
            content: "A Subquery (or Inner Query) is a query nested inside another SQL query. It is usually embedded within the `WHERE` clause of the main query (Outer Query).",
          },
          {
            type: "callout",
            variant: "info",
            title: "Execution Order",
            content: "The subquery executes *first*. Its result is then passed to the outer query, which uses that result to evaluate its own `WHERE` condition."
          },
          {
            type: "code",
            lang: "sql",
            label: "Basic Subquery",
            content: "SELECT * FROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees);"
          }
        ],
        challenge: {
          id: "challenge-1",
          title: "Above Average",
          description: "Write a query to find all `products` whose `price` is greater than the average price of all products. Return all columns.",
          starter: "SELECT * \nFROM products\nWHERE price > (\n  -- Write subquery here\n);",
          tests: [
            {
              id: "test-1",
              description: "Must use a subquery to find items above average price",
              dbState: {
                products: [
                  { id: 1, name: "Pen", price: 2 },
                  { id: 2, name: "Notebook", price: 5 },
                  { id: 3, name: "Backpack", price: 50 }
                ]
              },
              expected: [
                { id: 3, name: "Backpack", price: 50 }
              ]
            }
          ],
          keywords: ["SELECT", "FROM", "WHERE", "price", ">", "AVG"]
        }
      },
      {
        id: "lesson-2",
        title: "Single Value vs Multiple Values",
        chapterTitle: "Intro to Subqueries",
        xp: 25,
        theory: [
          {
            type: "text",
            content: "If you use a comparison operator like `=`, `>`, or `<`, the subquery **must** return exactly one single value (one column, one row). If it returns multiple rows, the query will crash."
          }
        ],
        challenge: {
          id: "challenge-2",
          title: "Find the Youngest",
          description: "Find the employee(s) who have the minimum `age` in the `employees` table. Return their `name` and `age`.",
          starter: "-- Write your query here\n",
          tests: [
            {
              id: "test-1",
              description: "Must find minimum age via subquery",
              dbState: {
                employees: [
                  { id: 1, name: "Alice", age: 30 },
                  { id: 2, name: "Bob", age: 22 },
                  { id: 3, name: "Charlie", age: 22 }
                ]
              },
              expected: [
                { name: "Bob", age: 22 },
                { name: "Charlie", age: 22 }
              ]
            }
          ],
          keywords: ["SELECT", "WHERE", "age", "=", "MIN"]
        }
      }
    ]
  },
  {
    id: "chapter-2",
    title: "Subqueries with IN",
    icon: "📥",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-3",
        title: "The IN Operator",
        chapterTitle: "Subqueries with IN",
        xp: 25,
        theory: [
          {
            type: "text",
            content: "If a subquery returns a column with *multiple rows*, you cannot use `=`. Instead, you use the `IN` operator in the outer query."
          },
          {
            type: "code",
            lang: "sql",
            label: "IN with Subquery",
            content: "SELECT name FROM customers\nWHERE id IN (SELECT customer_id FROM orders WHERE amount > 100);"
          }
        ],
        challenge: {
          id: "challenge-3",
          title: "Find Active Users",
          description: "Select the `name` of all `users` who have made at least one post. Use a subquery with `IN` on the `posts` table (which has a `user_id` column).",
          starter: "SELECT name\nFROM users\nWHERE id IN (\n  -- Select user_id from posts\n);",
          tests: [
            {
              id: "test-1",
              description: "Must use IN with a subquery",
              dbState: {
                users: [
                  { id: 1, name: "Alice" },
                  { id: 2, name: "Bob" },
                  { id: 3, name: "Charlie" }
                ],
                posts: [
                  { id: 101, user_id: 1, text: "Hello" },
                  { id: 102, user_id: 1, text: "World" },
                  { id: 103, user_id: 3, text: "Test" }
                ]
              },
              expected: [
                { name: "Alice" },
                { name: "Charlie" }
              ]
            }
          ],
          keywords: ["SELECT", "FROM", "WHERE", "IN", "posts"]
        }
      },
      {
        id: "lesson-4",
        title: "The NOT IN Operator",
        chapterTitle: "Subqueries with IN",
        xp: 30,
        theory: [
          {
            type: "text",
            content: "Conversely, `NOT IN` is used to find rows in the outer query that do *not* have a match in the subquery's result list."
          }
        ],
        challenge: {
          id: "challenge-4",
          title: "Find Inactive Users",
          description: "Using the same tables, write a query to find all `users` who have **never** made a post. Return their `name`.",
          starter: "-- Write your query here\n",
          tests: [
            {
              id: "test-1",
              description: "Must use NOT IN with a subquery",
              dbState: {
                users: [
                  { id: 1, name: "Alice" },
                  { id: 2, name: "Bob" },
                  { id: 3, name: "Charlie" }
                ],
                posts: [
                  { id: 101, user_id: 1, text: "Hello" }
                ]
              },
              expected: [
                { name: "Bob" },
                { name: "Charlie" }
              ]
            }
          ],
          keywords: ["NOT IN", "user_id", "posts"]
        }
      }
    ]
  },
  {
    id: "chapter-3",
    title: "Derived Tables",
    icon: "📦",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-5",
        title: "Subqueries in FROM",
        chapterTitle: "Derived Tables",
        xp: 35,
        theory: [
          {
            type: "text",
            content: "You can place a subquery inside the `FROM` clause. When you do this, the result of the subquery acts like a temporary table (called a derived table) that the outer query can select from."
          },
          {
            type: "callout",
            variant: "warning",
            title: "Alias Required",
            content: "In most SQL dialects, a derived table MUST be given an alias."
          },
          {
            type: "code",
            lang: "sql",
            label: "Derived Table",
            content: "SELECT MAX(avg_salary)\nFROM (\n  SELECT department, AVG(salary) AS avg_salary\n  FROM employees\n  GROUP BY department\n) AS dept_averages;"
          }
        ],
        challenge: {
          id: "challenge-5",
          title: "Highest Average Score",
          description: "Find the highest average score across all classes. First, write a subquery to calculate the average `score` (as `avg_score`) grouped by `class_id` in the `student_scores` table. Then, select the `MAX()` of that `avg_score` from the derived table. Alias the derived table as `class_averages`.",
          starter: "SELECT -- Select max here\nFROM (\n  -- Write group by subquery here\n) AS class_averages;",
          tests: [
            {
              id: "test-1",
              description: "Must use a derived table",
              dbState: {
                student_scores: [
                  { id: 1, class_id: 10, score: 80 },
                  { id: 2, class_id: 10, score: 90 }, // avg 85
                  { id: 3, class_id: 20, score: 90 },
                  { id: 4, class_id: 20, score: 100 } // avg 95
                ]
              },
              expected: [
                { max_avg: 95 }
              ]
            }
          ],
          keywords: ["MAX", "FROM", "SELECT", "AVG", "GROUP BY", "AS"]
        }
      }
    ]
  },
  {
    id: "chapter-4",
    title: "Correlated Subqueries",
    icon: "🔄",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-6",
        title: "What is Correlation?",
        chapterTitle: "Correlated Subqueries",
        xp: 35,
        theory: [
          {
            type: "text",
            content: "A correlated subquery is a subquery that uses values from the outer query. Because of this dependency, it cannot be executed independently. Instead, it is evaluated once for *each row* processed by the outer query."
          },
          {
            type: "code",
            lang: "sql",
            label: "Correlated Example",
            content: "SELECT e1.name, e1.salary\nFROM employees e1\nWHERE e1.salary > (\n  SELECT AVG(salary)\n  FROM employees e2\n  WHERE e1.department = e2.department\n);"
          }
        ],
        challenge: {
          id: "challenge-6",
          title: "Above Department Average",
          description: "Find employees whose `salary` is greater than the average salary of their specific `department`.",
          starter: "SELECT name\nFROM employees e1\nWHERE salary > (\n  SELECT AVG(salary)\n  FROM employees e2\n  -- Link the departments here\n);",
          tests: [
            {
              id: "test-1",
              description: "Must correlate the subquery",
              dbState: {
                employees: [
                  { id: 1, name: "Alice", department: "IT", salary: 80000 },
                  { id: 2, name: "Bob", department: "IT", salary: 60000 },
                  { id: 3, name: "Charlie", department: "HR", salary: 50000 }
                ]
              },
              expected: [
                { name: "Alice" }
              ]
            }
          ],
          keywords: ["SELECT", "FROM", "WHERE", "AVG", "department", "="]
        }
      },
      {
        id: "lesson-7",
        title: "The EXISTS Operator",
        chapterTitle: "Correlated Subqueries",
        xp: 40,
        theory: [
          {
            type: "text",
            content: "The `EXISTS` operator is used to test for the existence of any record in a subquery. It returns TRUE if the subquery returns one or more records."
          },
          {
            type: "text",
            content: "`EXISTS` is almost always used with a correlated subquery, because you are checking if a related record exists for the current row."
          },
          {
            type: "code",
            lang: "sql",
            label: "EXISTS Syntax",
            content: "SELECT name\nFROM suppliers s\nWHERE EXISTS (\n  SELECT 1 FROM products p \n  WHERE p.supplier_id = s.id AND p.price > 100\n);"
          }
        ],
        challenge: {
          id: "challenge-7",
          title: "Find Suppliers",
          description: "Use the `EXISTS` operator to find the `name` of all `suppliers` who supply at least one product with a `price` strictly less than 10.",
          starter: "-- Write your EXISTS query here\n",
          tests: [
            {
              id: "test-1",
              description: "Must use EXISTS",
              dbState: {
                suppliers: [
                  { id: 1, name: "Cheap Co" },
                  { id: 2, name: "Luxury Inc" }
                ],
                products: [
                  { id: 101, supplier_id: 1, price: 5 },
                  { id: 102, supplier_id: 2, price: 500 }
                ]
              },
              expected: [
                { name: "Cheap Co" }
              ]
            }
          ],
          keywords: ["EXISTS", "SELECT", "FROM", "WHERE", "<", "10", "supplier_id"]
        }
      }
    ]
  }
];

export const SQLSUBQUERIES_LESSONS = SQLSUBQUERIES_CHAPTERS.flatMap((chapter) =>
  chapter.lessons.map((lesson) => ({
    ...lesson,
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    chapterColor: chapter.color,
    chapterIcon: chapter.icon,
  }))
);

export const SQLSUBQUERIES_TOTAL_XP = SQLSUBQUERIES_LESSONS.reduce(
  (total, lesson) => total + (lesson.xp || 0),
  0
);
