export const SQLPROJECTS_CHAPTERS = [
  {
    id: "chapter-1",
    title: "E-Commerce Database",
    icon: "🛒",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-1",
        title: "Top Selling Products",
        chapterTitle: "E-Commerce Database",
        xp: 50,
        theory: [
          {
            type: "text",
            content: "Welcome to the Capstone Projects! Here you will combine multiple concepts (JOINs, GROUP BY, aggregate functions) to solve real-world problems.",
          },
          {
            type: "text",
            content: "Our first database is an E-Commerce system with `users`, `products`, and `orders`. Each order contains a `product_id`, `user_id`, and `quantity`."
          }
        ],
        challenge: {
          id: "challenge-1",
          title: "Find the Best Sellers",
          description: "Write a query to find the top 2 best-selling `products`. Join `products` and `orders`, group by `products.name`, sum the `quantity` as `total_sold`, order by `total_sold` descending, and limit to 2.",
          starter: "-- Write your complex query here\n",
          tests: [
            {
              id: "test-1",
              description: "Must return top 2 products by total quantity sold",
              dbState: {
                products: [
                  { id: 1, name: "Laptop" },
                  { id: 2, name: "Mouse" },
                  { id: 3, name: "Keyboard" }
                ],
                orders: [
                  { id: 101, product_id: 1, quantity: 5 },
                  { id: 102, product_id: 2, quantity: 20 },
                  { id: 103, product_id: 3, quantity: 15 },
                  { id: 104, product_id: 1, quantity: 2 } // Laptop total 7
                ]
              },
              expected: [
                { name: "Mouse", total_sold: 20 },
                { name: "Keyboard", total_sold: 15 }
              ]
            }
          ],
          keywords: ["SELECT", "JOIN", "GROUP BY", "SUM", "ORDER BY", "DESC", "LIMIT"]
        }
      },
      {
        id: "lesson-2",
        title: "Whales (Big Spenders)",
        chapterTitle: "E-Commerce Database",
        xp: 50,
        theory: [
          {
            type: "text",
            content: "A common business request is to find your most valuable customers, often called 'whales'."
          }
        ],
        challenge: {
          id: "challenge-2",
          title: "Find the Whales",
          description: "Find the `users.name` and their total amount spent (sum of `products.price * orders.quantity` as `total_spent`). Only show users who spent more than $500 (using `HAVING`).",
          starter: "-- Write your query here\n",
          tests: [
            {
              id: "test-1",
              description: "Must calculate total spent and filter with HAVING",
              dbState: {
                users: [
                  { id: 1, name: "Alice" },
                  { id: 2, name: "Bob" }
                ],
                products: [
                  { id: 10, price: 100 },
                  { id: 20, price: 50 }
                ],
                orders: [
                  { id: 101, user_id: 1, product_id: 10, quantity: 6 }, // 600
                  { id: 102, user_id: 2, product_id: 20, quantity: 2 }  // 100
                ]
              },
              expected: [
                { name: "Alice", total_spent: 600 }
              ]
            }
          ],
          keywords: ["SUM", "price", "*", "quantity", "HAVING", ">", "500"]
        }
      }
    ]
  },
  {
    id: "chapter-2",
    title: "HR System Database",
    icon: "👔",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-3",
        title: "Department Salary Costs",
        chapterTitle: "HR System Database",
        xp: 50,
        theory: [
          {
            type: "text",
            content: "In our HR database, we have `departments` and `employees`. You often need to analyze payroll."
          }
        ],
        challenge: {
          id: "challenge-3",
          title: "Analyze Payroll",
          description: "List every `departments.name` and the average `salary` of its employees. Use a `LEFT JOIN` from departments to employees so that departments with 0 employees still show up (average will be NULL).",
          starter: "-- Write your query here\n",
          tests: [
            {
              id: "test-1",
              description: "Must use LEFT JOIN and AVG",
              dbState: {
                departments: [
                  { id: 1, name: "Engineering" },
                  { id: 2, name: "Janitorial" }
                ],
                employees: [
                  { id: 101, department_id: 1, salary: 100000 },
                  { id: 102, department_id: 1, salary: 120000 }
                ]
              },
              expected: [
                { name: "Engineering", avg_salary: 110000 },
                { name: "Janitorial", avg_salary: null }
              ]
            }
          ],
          keywords: ["LEFT JOIN", "AVG", "GROUP BY", "departments"]
        }
      },
      {
        id: "lesson-4",
        title: "The Ultimate Challenge",
        chapterTitle: "HR System Database",
        xp: 100,
        theory: [
          {
            type: "text",
            content: "This is it. The final challenge to prove your SQL mastery."
          }
        ],
        challenge: {
          id: "challenge-4",
          title: "Managers with High Earners",
          description: "Find the `name` of all managers (an employee whose `id` appears in the `manager_id` column of other employees) who manage at least one employee earning more than $100,000. Use `EXISTS` and a correlated subquery.",
          starter: "SELECT m.name\nFROM employees m\nWHERE EXISTS (\n  -- Write correlated subquery here\n);",
          tests: [
            {
              id: "test-1",
              description: "Must use EXISTS to find managers",
              dbState: {
                employees: [
                  { id: 1, name: "Boss", manager_id: null, salary: 200000 },
                  { id: 2, name: "Mid-Manager", manager_id: 1, salary: 90000 },
                  { id: 3, name: "Worker A", manager_id: 1, salary: 110000 }, // Boss manages A > 100k
                  { id: 4, name: "Worker B", manager_id: 2, salary: 50000 }
                ]
              },
              expected: [
                { name: "Boss" }
              ]
            }
          ],
          keywords: ["EXISTS", "SELECT", "FROM", "employees", "WHERE", "manager_id", ">", "100000"]
        }
      }
    ]
  }
];

export const SQLPROJECTS_LESSONS = SQLPROJECTS_CHAPTERS.flatMap((chapter) =>
  chapter.lessons.map((lesson) => ({
    ...lesson,
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    chapterColor: chapter.color,
    chapterIcon: chapter.icon,
  }))
);

export const SQLPROJECTS_TOTAL_XP = SQLPROJECTS_LESSONS.reduce(
  (total, lesson) => total + (lesson.xp || 0),
  0
);
