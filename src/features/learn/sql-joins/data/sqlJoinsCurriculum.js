export const SQLJOINS_CHAPTERS = [
  {
    id: "chapter-1",
    title: "Relational Concepts",
    icon: "🔗",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-1",
        title: "Primary and Foreign Keys",
        chapterTitle: "Relational Concepts",
        xp: 15,
        theory: [
          {
            type: "text",
            content: "Before joining tables, you must understand how they relate. A **Primary Key** uniquely identifies each record in a table. A **Foreign Key** is a field (or collection of fields) in one table that refers to the Primary Key in another table.",
          },
          {
            type: "callout",
            variant: "info",
            title: "Relational Example",
            content: "In a `customers` table, `customer_id` is the Primary Key. In an `orders` table, the `customer_id` column is a Foreign Key that links back to the `customers` table."
          }
        ],
        challenge: {
          id: "challenge-1",
          title: "Identify the Keys",
          description: "Write a simple query to retrieve the primary key `id` and the foreign key `department_id` from the `employees` table for the employee named 'Alice'.",
          starter: "SELECT \n  -- Select columns here\nFROM employees\nWHERE name = 'Alice';",
          tests: [
            {
              id: "test-1",
              description: "Must select id and department_id",
              dbState: {
                employees: [
                  { id: 1, name: "Alice", department_id: 101 },
                  { id: 2, name: "Bob", department_id: 102 }
                ]
              },
              expected: [
                { id: 1, department_id: 101 }
              ]
            }
          ],
          keywords: ["SELECT", "id", "department_id", "FROM", "employees"]
        }
      },
      {
        id: "lesson-2",
        title: "Introduction to JOINs",
        chapterTitle: "Relational Concepts",
        xp: 20,
        theory: [
          {
            type: "text",
            content: "A `JOIN` clause is used to combine rows from two or more tables, based on a related column between them."
          },
          {
            type: "text",
            content: "There are different types of JOINs in SQL:\n• `INNER JOIN` (Default): Returns records that have matching values in both tables.\n• `LEFT JOIN`: Returns all records from the left table, and the matched records from the right table.\n• `RIGHT JOIN`: Returns all records from the right table, and the matched records from the left table.\n• `FULL OUTER JOIN`: Returns all records when there is a match in either left or right table."
          }
        ],
        challenge: {
          id: "challenge-2",
          title: "The ON Clause",
          description: "When using a JOIN, you must specify the linking condition using the `ON` keyword. Write an `INNER JOIN` that links `orders` and `customers` where `orders.customer_id = customers.id`.",
          starter: "SELECT orders.id, customers.name\nFROM orders\nINNER JOIN customers ON -- Add link here;",
          tests: [
            {
              id: "test-1",
              description: "Must link using ON",
              dbState: {
                orders: [{ id: 1, customer_id: 1 }],
                customers: [{ id: 1, name: "Alice" }]
              },
              expected: [
                { id: 1, name: "Alice" }
              ]
            }
          ],
          keywords: ["INNER JOIN", "ON", "orders.customer_id", "=", "customers.id"]
        }
      }
    ]
  },
  {
    id: "chapter-2",
    title: "Inner Joins",
    icon: "🤝",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-3",
        title: "Basic INNER JOIN",
        chapterTitle: "Inner Joins",
        xp: 25,
        theory: [
          {
            type: "text",
            content: "The `INNER JOIN` keyword selects records that have matching values in both tables. If there is a record in the 'left' table that does not have a match in the 'right' table, that record will NOT be shown."
          },
          {
            type: "code",
            lang: "sql",
            label: "Inner Join Syntax",
            content: "SELECT orders.order_id, customers.customer_name\nFROM orders\nINNER JOIN customers ON orders.customer_id = customers.customer_id;"
          }
        ],
        challenge: {
          id: "challenge-3",
          title: "Join Movies and Directors",
          description: "Write an `INNER JOIN` query to select `movies.title` and `directors.name`. Join the `movies` and `directors` tables where `movies.director_id = directors.id`.",
          starter: "-- Write your INNER JOIN query here\n",
          tests: [
            {
              id: "test-1",
              description: "Must return matching movies and directors",
              dbState: {
                directors: [
                  { id: 1, name: "Nolan" },
                  { id: 2, name: "Spielberg" }
                ],
                movies: [
                  { id: 101, title: "Inception", director_id: 1 },
                  { id: 102, title: "Jurassic Park", director_id: 2 },
                  { id: 103, title: "Unknown", director_id: 99 } // Will not match
                ]
              },
              expected: [
                { title: "Inception", name: "Nolan" },
                { title: "Jurassic Park", name: "Spielberg" }
              ]
            }
          ],
          keywords: ["SELECT", "FROM", "INNER JOIN", "ON", "movies", "directors"]
        }
      },
      {
        id: "lesson-4",
        title: "Table Aliasing",
        chapterTitle: "Inner Joins",
        xp: 20,
        theory: [
          {
            type: "text",
            content: "When joining tables, typing out the full table name repeatedly can get tedious. You can use Table Aliases (like Column Aliases) to assign a short temporary name to a table."
          },
          {
            type: "code",
            lang: "sql",
            label: "Table Alias Example",
            content: "SELECT o.order_id, c.customer_name\nFROM orders o\nINNER JOIN customers c ON o.customer_id = c.customer_id;"
          }
        ],
        challenge: {
          id: "challenge-4",
          title: "Use Table Aliases",
          description: "Rewrite the previous query using `m` as the alias for `movies` and `d` as the alias for `directors`. Return `m.title` and `d.name`.",
          starter: "SELECT -- Use aliases here\nFROM movies m\nINNER JOIN directors d ON m.director_id = d.id;",
          tests: [
            {
              id: "test-1",
              description: "Must use table aliases",
              dbState: {
                directors: [{ id: 1, name: "Nolan" }],
                movies: [{ id: 101, title: "Inception", director_id: 1 }]
              },
              expected: [
                { title: "Inception", name: "Nolan" }
              ]
            }
          ],
          keywords: ["m.title", "d.name", "m.director_id", "d.id"]
        }
      },
      {
        id: "lesson-5",
        title: "Joining Three Tables",
        chapterTitle: "Inner Joins",
        xp: 35,
        theory: [
          {
            type: "text",
            content: "You can chain multiple `JOIN` clauses to join three, four, or even more tables in a single query."
          },
          {
            type: "code",
            lang: "sql",
            label: "Three Table Join",
            content: "SELECT o.order_id, c.customer_name, s.shipper_name\nFROM ((orders o\nINNER JOIN customers c ON o.customer_id = c.customer_id)\nINNER JOIN shippers s ON o.shipper_id = s.shipper_id);"
          }
        ],
        challenge: {
          id: "challenge-5",
          title: "Join Three Tables",
          description: "Join `students`, `enrollments`, and `courses`. Return `students.name` and `courses.title`. The `enrollments` table has `student_id` and `course_id`.",
          starter: "-- Use aliases s, e, and c\n",
          tests: [
            {
              id: "test-1",
              description: "Must join three tables",
              dbState: {
                students: [{ id: 1, name: "Alice" }],
                courses: [{ id: 101, title: "Math 101" }],
                enrollments: [{ student_id: 1, course_id: 101 }]
              },
              expected: [
                { name: "Alice", title: "Math 101" }
              ]
            }
          ],
          keywords: ["INNER JOIN", "enrollments", "courses", "students"]
        }
      }
    ]
  },
  {
    id: "chapter-3",
    title: "Outer Joins",
    icon: "🧩",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-6",
        title: "LEFT JOIN",
        chapterTitle: "Outer Joins",
        xp: 30,
        theory: [
          {
            type: "text",
            content: "The `LEFT JOIN` keyword returns all records from the left table (table1), and the matched records from the right table (table2). The result is NULL from the right side, if there is no match."
          },
          {
            type: "code",
            lang: "sql",
            label: "Left Join Syntax",
            content: "SELECT customers.customer_name, orders.order_id\nFROM customers\nLEFT JOIN orders ON customers.customer_id = orders.customer_id;"
          }
        ],
        challenge: {
          id: "challenge-6",
          title: "Find Unassigned Projects",
          description: "List ALL `projects` and the `employees` assigned to them. Use a `LEFT JOIN` so that projects with no employees still show up (with NULL for employee). Return `projects.name` and `employees.name`.",
          starter: "SELECT p.name, e.name\nFROM projects p\n-- Add LEFT JOIN here;\n",
          tests: [
            {
              id: "test-1",
              description: "Must return projects even without employees",
              dbState: {
                projects: [
                  { id: 1, name: "Project Alpha" },
                  { id: 2, name: "Project Beta" }
                ],
                employees: [
                  { id: 101, name: "Dave", project_id: 1 }
                ]
              },
              expected: [
                { project: "Project Alpha", employee: "Dave" },
                { project: "Project Beta", employee: null }
              ]
            }
          ],
          keywords: ["LEFT JOIN", "employees", "ON"]
        }
      },
      {
        id: "lesson-7",
        title: "RIGHT JOIN",
        chapterTitle: "Outer Joins",
        xp: 30,
        theory: [
          {
            type: "text",
            content: "The `RIGHT JOIN` keyword returns all records from the right table, and the matched records from the left table. It is the exact mirror image of the LEFT JOIN."
          }
        ],
        challenge: {
          id: "challenge-7",
          title: "Right Join the Tables",
          description: "Use a `RIGHT JOIN` to list all `employees` and their assigned `projects`. Return `projects.name` and `employees.name`. If an employee has no project, they should still appear.",
          starter: "-- Write your RIGHT JOIN query here\n",
          tests: [
            {
              id: "test-1",
              description: "Must use RIGHT JOIN",
              dbState: {
                projects: [
                  { id: 1, name: "Project Alpha" }
                ],
                employees: [
                  { id: 101, name: "Dave", project_id: 1 },
                  { id: 102, name: "Eve", project_id: null }
                ]
              },
              expected: [
                { project: "Project Alpha", employee: "Dave" },
                { project: null, employee: "Eve" }
              ]
            }
          ],
          keywords: ["RIGHT JOIN", "projects", "employees"]
        }
      },
      {
        id: "lesson-8",
        title: "FULL OUTER JOIN",
        chapterTitle: "Outer Joins",
        xp: 35,
        theory: [
          {
            type: "text",
            content: "The `FULL OUTER JOIN` keyword returns all matching records from both tables whether the other table matches or not."
          },
          {
            type: "callout",
            variant: "warning",
            title: "Performance",
            content: "FULL OUTER JOINs can return very large result-sets and should be used cautiously!"
          }
        ],
        challenge: {
          id: "challenge-8",
          title: "Full Outer Join",
          description: "Write a `FULL OUTER JOIN` to select `customers.name` and `orders.amount`. Return all customers and all orders, regardless of whether they have a match.",
          starter: "-- Write your FULL OUTER JOIN query here\n",
          tests: [
            {
              id: "test-1",
              description: "Must return all from both sides",
              dbState: {
                customers: [{ id: 1, name: "Alice" }],
                orders: [{ id: 101, amount: 50, customer_id: 1 }, { id: 102, amount: 20, customer_id: 99 }]
              },
              expected: [
                { name: "Alice", amount: 50 },
                { name: null, amount: 20 }
              ]
            }
          ],
          keywords: ["FULL OUTER JOIN", "ON"]
        }
      }
    ]
  },
  {
    id: "chapter-4",
    title: "Advanced Joins",
    icon: "🪢",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-9",
        title: "Self JOIN",
        chapterTitle: "Advanced Joins",
        xp: 40,
        theory: [
          {
            type: "text",
            content: "A self JOIN is a regular join, but the table is joined with itself. This is particularly useful for hierarchical data, such as a table of employees where each employee has a manager who is also an employee."
          },
          {
            type: "code",
            lang: "sql",
            label: "Self Join Syntax",
            content: "SELECT A.CustomerName AS CustomerName1, B.CustomerName AS CustomerName2\nFROM Customers A, Customers B\nWHERE A.CustomerID <> B.CustomerID;"
          }
        ],
        challenge: {
          id: "challenge-9",
          title: "Find Managers",
          description: "Write a Self Join on the `employees` table. The table has `id`, `name`, and `manager_id`. Return the employee's `name` (alias `employee_name`) and their manager's `name` (alias `manager_name`). Use `LEFT JOIN` so the CEO (no manager) is included.",
          starter: "SELECT e.name AS employee_name, m.name AS manager_name\nFROM employees e\n-- Join the table to itself\n",
          tests: [
            {
              id: "test-1",
              description: "Must perform a self join",
              dbState: {
                employees: [
                  { id: 1, name: "Boss", manager_id: null },
                  { id: 2, name: "Worker", manager_id: 1 }
                ]
              },
              expected: [
                { employee_name: "Boss", manager_name: null },
                { employee_name: "Worker", manager_name: "Boss" }
              ]
            }
          ],
          keywords: ["LEFT JOIN", "employees m", "ON e.manager_id = m.id"]
        }
      },
      {
        id: "lesson-10",
        title: "CROSS JOIN",
        chapterTitle: "Advanced Joins",
        xp: 35,
        theory: [
          {
            type: "text",
            content: "The `CROSS JOIN` keyword returns all records from both tables (Cartesian product). If you cross join a table of 5 rows with a table of 10 rows, you get 50 rows!"
          },
          {
            type: "callout",
            variant: "warning",
            title: "No ON Clause",
            content: "Unlike other JOINs, CROSS JOIN does not use an ON clause because it matches every row to every row."
          }
        ],
        challenge: {
          id: "challenge-10",
          title: "Cartesian Product",
          description: "Create a list of all possible combinations of `colors` and `sizes`. Return `colors.color` and `sizes.size`.",
          starter: "SELECT colors.color, sizes.size\nFROM colors\n-- Add CROSS JOIN here;\n",
          tests: [
            {
              id: "test-1",
              description: "Must return cartesian product",
              dbState: {
                colors: [{ color: "Red" }, { color: "Blue" }],
                sizes: [{ size: "Small" }, { size: "Large" }]
              },
              expected: [
                { color: "Red", size: "Small" },
                { color: "Red", size: "Large" },
                { color: "Blue", size: "Small" },
                { color: "Blue", size: "Large" }
              ]
            }
          ],
          keywords: ["CROSS JOIN", "sizes"]
        }
      }
    ]
  }
];

export const SQLJOINS_LESSONS = SQLJOINS_CHAPTERS.flatMap((chapter) =>
  chapter.lessons.map((lesson) => ({
    ...lesson,
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    chapterColor: chapter.color,
    chapterIcon: chapter.icon,
  }))
);

export const SQLJOINS_TOTAL_XP = SQLJOINS_LESSONS.reduce(
  (total, lesson) => total + (lesson.xp || 0),
  0
);
