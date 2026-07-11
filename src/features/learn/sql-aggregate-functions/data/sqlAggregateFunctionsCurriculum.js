export const SQLAGGREGATEFUNCTIONS_CHAPTERS = [
  {
    id: "chapter-1",
    title: "Basic Math Functions",
    icon: "🧮",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-1",
        title: "The COUNT Function",
        chapterTitle: "Basic Math Functions",
        xp: 15,
        theory: [
          {
            type: "text",
            content: "Aggregate functions perform a calculation on a set of values and return a single value. The `COUNT()` function returns the number of rows that matches a specified criterion.",
          },
          {
            type: "code",
            lang: "sql",
            label: "Count Example",
            content: "SELECT COUNT(product_id)\nFROM products;"
          },
          {
            type: "callout",
            variant: "info",
            title: "COUNT(*)",
            content: "Using `COUNT(*)` returns the total number of rows in the table, including rows with NULL values."
          }
        ],
        challenge: {
          id: "challenge-1",
          title: "Count the Users",
          description: "Write a query to count the total number of records in the `users` table. Alias the result as `total_users`.",
          starter: "SELECT COUNT(*) AS -- Add alias\nFROM users;",
          tests: [
            {
              id: "test-1",
              description: "Must count total users",
              dbState: {
                users: [
                  { id: 1, name: "Alice" },
                  { id: 2, name: "Bob" },
                  { id: 3, name: "Charlie" }
                ]
              },
              expected: [
                { total_users: 3 }
              ]
            }
          ],
          keywords: ["SELECT", "COUNT", "*", "AS", "total_users", "FROM", "users"]
        }
      },
      {
        id: "lesson-2",
        title: "The SUM Function",
        chapterTitle: "Basic Math Functions",
        xp: 20,
        theory: [
          {
            type: "text",
            content: "The `SUM()` function calculates the total sum of a numeric column."
          },
          {
            type: "code",
            lang: "sql",
            label: "Sum Example",
            content: "SELECT SUM(quantity)\nFROM order_details;"
          }
        ],
        challenge: {
          id: "challenge-2",
          title: "Calculate Total Revenue",
          description: "Find the total sum of the `amount` column in the `sales` table. Alias it as `total_revenue`.",
          starter: "-- Write your SUM query here\n",
          tests: [
            {
              id: "test-1",
              description: "Must sum the amount",
              dbState: {
                sales: [
                  { id: 1, amount: 150 },
                  { id: 2, amount: 200 },
                  { id: 3, amount: 50 }
                ]
              },
              expected: [
                { total_revenue: 400 }
              ]
            }
          ],
          keywords: ["SELECT", "SUM", "amount", "AS", "total_revenue", "FROM", "sales"]
        }
      },
      {
        id: "lesson-3",
        title: "The AVG Function",
        chapterTitle: "Basic Math Functions",
        xp: 20,
        theory: [
          {
            type: "text",
            content: "The `AVG()` function returns the average value of a numeric column. Note that NULL values are ignored by the AVG function."
          },
          {
            type: "code",
            lang: "sql",
            label: "Average Example",
            content: "SELECT AVG(price)\nFROM products;"
          }
        ],
        challenge: {
          id: "challenge-3",
          title: "Find the Average Rating",
          description: "Calculate the average `rating` of all movies in the `movies` table. Alias the result as `avg_rating`.",
          starter: "-- Write your AVG query here\n",
          tests: [
            {
              id: "test-1",
              description: "Must calculate the average rating",
              dbState: {
                movies: [
                  { id: 1, rating: 8.0 },
                  { id: 2, rating: 9.0 },
                  { id: 3, rating: 10.0 }
                ]
              },
              expected: [
                { avg_rating: 9.0 }
              ]
            }
          ],
          keywords: ["SELECT", "AVG", "rating", "AS", "avg_rating", "FROM", "movies"]
        }
      }
    ]
  },
  {
    id: "chapter-2",
    title: "Min, Max, and Round",
    icon: "📈",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-4",
        title: "MIN and MAX",
        chapterTitle: "Min, Max, and Round",
        xp: 20,
        theory: [
          {
            type: "text",
            content: "The `MIN()` function returns the smallest value of the selected column. The `MAX()` function returns the largest value."
          },
          {
            type: "text",
            content: "These functions can be used on numeric, text, and date columns. For text, MIN returns the first value alphabetically."
          },
          {
            type: "code",
            lang: "sql",
            label: "Min and Max Example",
            content: "SELECT MIN(price) AS cheapest, MAX(price) AS most_expensive\nFROM products;"
          }
        ],
        challenge: {
          id: "challenge-4",
          title: "Find Salary Extremes",
          description: "Write a query to find the minimum `salary` (as `lowest_salary`) and maximum `salary` (as `highest_salary`) in the `employees` table.",
          starter: "-- Write your query here\n",
          tests: [
            {
              id: "test-1",
              description: "Must return lowest and highest salary",
              dbState: {
                employees: [
                  { id: 1, salary: 45000 },
                  { id: 2, salary: 92000 },
                  { id: 3, salary: 50000 }
                ]
              },
              expected: [
                { lowest_salary: 45000, highest_salary: 92000 }
              ]
            }
          ],
          keywords: ["SELECT", "MIN", "salary", "lowest_salary", "MAX", "highest_salary", "FROM", "employees"]
        }
      },
      {
        id: "lesson-5",
        title: "The ROUND Function",
        chapterTitle: "Min, Max, and Round",
        xp: 25,
        theory: [
          {
            type: "text",
            content: "When using functions like `AVG()`, you often get long decimal values. The `ROUND()` function is used to round a numeric field to the number of decimals specified."
          },
          {
            type: "code",
            lang: "sql",
            label: "Round Example",
            content: "SELECT ROUND(AVG(price), 2)\nFROM products;"
          }
        ],
        challenge: {
          id: "challenge-5",
          title: "Round the Average",
          description: "Calculate the average `score` from the `exams` table, and round the result to 1 decimal place. Alias it as `rounded_avg`.",
          starter: "SELECT -- Use ROUND and AVG together\nFROM exams;",
          tests: [
            {
              id: "test-1",
              description: "Must round the average to 1 decimal",
              dbState: {
                exams: [
                  { id: 1, score: 85.333 },
                  { id: 2, score: 92.111 },
                  { id: 3, score: 78.777 }
                ]
              },
              expected: [
                { rounded_avg: 85.4 }
              ]
            }
          ],
          keywords: ["SELECT", "ROUND", "AVG", "score", "1", "AS", "rounded_avg", "FROM", "exams"]
        }
      }
    ]
  },
  {
    id: "chapter-3",
    title: "Grouping Data",
    icon: "🗂️",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-6",
        title: "The GROUP BY Clause",
        chapterTitle: "Grouping Data",
        xp: 30,
        theory: [
          {
            type: "text",
            content: "The `GROUP BY` statement groups rows that have the same values into summary rows. It is often used with aggregate functions (COUNT, MAX, MIN, SUM, AVG) to group the result-set by one or more columns."
          },
          {
            type: "code",
            lang: "sql",
            label: "Group By Syntax",
            content: "SELECT country, COUNT(customer_id)\nFROM customers\nGROUP BY country;"
          },
          {
            type: "callout",
            variant: "warning",
            title: "Rule of Thumb",
            content: "Any column in your SELECT clause that is NOT inside an aggregate function MUST be included in the GROUP BY clause."
          }
        ],
        challenge: {
          id: "challenge-6",
          title: "Count Employees by Department",
          description: "Count the number of employees in each `department`. Return `department` and the count (as `employee_count`).",
          starter: "SELECT department, -- Add count here\nFROM employees\n-- Add group by here;",
          tests: [
            {
              id: "test-1",
              description: "Must return counts grouped by department",
              dbState: {
                employees: [
                  { id: 1, department: "IT", name: "Alice" },
                  { id: 2, department: "IT", name: "Bob" },
                  { id: 3, department: "HR", name: "Charlie" }
                ]
              },
              expected: [
                { department: "IT", employee_count: 2 },
                { department: "HR", employee_count: 1 }
              ]
            }
          ],
          keywords: ["SELECT", "department", "COUNT", "id", "employee_count", "FROM", "employees", "GROUP BY", "department"]
        }
      },
      {
        id: "lesson-7",
        title: "Grouping by Multiple Columns",
        chapterTitle: "Grouping Data",
        xp: 35,
        theory: [
          {
            type: "text",
            content: "You can group by multiple columns to create more granular summaries. For example, grouping by `country` and then by `city`."
          },
          {
            type: "code",
            lang: "sql",
            label: "Multiple Group By",
            content: "SELECT country, city, COUNT(id)\nFROM customers\nGROUP BY country, city;"
          }
        ],
        challenge: {
          id: "challenge-7",
          title: "Granular Grouping",
          description: "Group the `sales` table by both `year` and `region`. Return `year`, `region`, and the sum of `amount` (as `total_sales`).",
          starter: "-- Write your multi-column GROUP BY query here\n",
          tests: [
            {
              id: "test-1",
              description: "Must group by year and region",
              dbState: {
                sales: [
                  { id: 1, year: 2022, region: "North", amount: 100 },
                  { id: 2, year: 2022, region: "North", amount: 150 },
                  { id: 3, year: 2022, region: "South", amount: 200 },
                  { id: 4, year: 2023, region: "North", amount: 300 }
                ]
              },
              expected: [
                { year: 2022, region: "North", total_sales: 250 },
                { year: 2022, region: "South", total_sales: 200 },
                { year: 2023, region: "North", total_sales: 300 }
              ]
            }
          ],
          keywords: ["GROUP BY", "year", "region", "SUM"]
        }
      }
    ]
  },
  {
    id: "chapter-4",
    title: "Filtering Groups",
    icon: "🚰",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-8",
        title: "The HAVING Clause",
        chapterTitle: "Filtering Groups",
        xp: 35,
        theory: [
          {
            type: "text",
            content: "The `HAVING` clause was added to SQL because the `WHERE` keyword cannot be used with aggregate functions."
          },
          {
            type: "code",
            lang: "sql",
            label: "Having Example",
            content: "SELECT country, COUNT(customer_id)\nFROM customers\nGROUP BY country\nHAVING COUNT(customer_id) > 5;"
          },
          {
            type: "callout",
            variant: "info",
            title: "WHERE vs HAVING",
            content: "`WHERE` filters individual rows BEFORE they are grouped. `HAVING` filters the summary groups AFTER they are grouped."
          }
        ],
        challenge: {
          id: "challenge-8",
          title: "Filter the Groups",
          description: "Group `employees` by `department` and count them. Only return departments `HAVING` more than 1 employee.",
          starter: "SELECT department, COUNT(id) AS emp_count\nFROM employees\nGROUP BY department\n-- Add having here;\n",
          tests: [
            {
              id: "test-1",
              description: "Must use HAVING to filter aggregated results",
              dbState: {
                employees: [
                  { id: 1, department: "IT" },
                  { id: 2, department: "IT" },
                  { id: 3, department: "HR" },
                  { id: 4, department: "Sales" },
                  { id: 5, department: "Sales" }
                ]
              },
              expected: [
                { department: "IT", emp_count: 2 },
                { department: "Sales", emp_count: 2 }
              ]
            }
          ],
          keywords: ["HAVING", "COUNT", "department", ">", "1"]
        }
      },
      {
        id: "lesson-9",
        title: "Combining WHERE and HAVING",
        chapterTitle: "Filtering Groups",
        xp: 40,
        theory: [
          {
            type: "text",
            content: "You can use both `WHERE` and `HAVING` in the same query. The `WHERE` clause filters rows before grouping, and the `HAVING` clause filters the resulting groups."
          },
          {
            type: "code",
            lang: "sql",
            label: "Complex Example",
            content: "SELECT department, SUM(salary)\nFROM employees\nWHERE status = 'Active'\nGROUP BY department\nHAVING SUM(salary) > 100000;"
          }
        ],
        challenge: {
          id: "challenge-9",
          title: "Filter Rows, Then Groups",
          description: "Calculate the total `sales_amount` by `salesperson` for all sales made in '2023' (using `WHERE year = 2023`). Only show salespeople whose total sales exceed 500 (using `HAVING`).",
          starter: "-- Write your query here\n",
          tests: [
            {
              id: "test-1",
              description: "Must combine WHERE and HAVING",
              dbState: {
                sales: [
                  { id: 1, salesperson: "Alice", year: 2023, sales_amount: 300 },
                  { id: 2, salesperson: "Alice", year: 2023, sales_amount: 300 },
                  { id: 3, salesperson: "Bob", year: 2022, sales_amount: 1000 }, // Wrong year
                  { id: 4, salesperson: "Charlie", year: 2023, sales_amount: 400 } // Under 500
                ]
              },
              expected: [
                { salesperson: "Alice", total_sales: 600 }
              ]
            }
          ],
          keywords: ["WHERE", "year", "2023", "GROUP BY", "HAVING", "SUM", ">", "500"]
        }
      }
    ]
  }
];

export const SQLAGGREGATEFUNCTIONS_LESSONS = SQLAGGREGATEFUNCTIONS_CHAPTERS.flatMap((chapter) =>
  chapter.lessons.map((lesson) => ({
    ...lesson,
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    chapterColor: chapter.color,
    chapterIcon: chapter.icon,
  }))
);

export const SQLAGGREGATEFUNCTIONS_TOTAL_XP = SQLAGGREGATEFUNCTIONS_LESSONS.reduce(
  (total, lesson) => total + (lesson.xp || 0),
  0
);
