export const SQLVIEWS_CHAPTERS = [
  {
    id: "chapter-1",
    title: "Intro to Views",
    icon: "🖼️",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-1",
        title: "What is a View?",
        chapterTitle: "Intro to Views",
        xp: 20,
        theory: [
          {
            type: "text",
            content: "In SQL, a view is a virtual table based on the result-set of an SQL statement. It contains rows and columns, just like a real table. The fields in a view are fields from one or more real tables in the database.",
          },
          {
            type: "callout",
            variant: "info",
            title: "Why use Views?",
            content: "Views can hide complex queries, restrict data access (showing only certain columns to certain users), and provide a consistent interface even if underlying tables change."
          }
        ],
        challenge: {
          id: "challenge-1",
          title: "Querying a View",
          description: "Once a view is created, you query it exactly like a normal table. Query the `active_users` view to get all columns.",
          starter: "-- Query the active_users view here\n",
          tests: [
            {
              id: "test-1",
              description: "Must query the view",
              dbState: {
                // Mocking the view as a table for the test runner
                active_users: [
                  { id: 1, name: "Alice", status: "active" },
                  { id: 2, name: "Bob", status: "active" }
                ]
              },
              expected: [
                { id: 1, name: "Alice", status: "active" },
                { id: 2, name: "Bob", status: "active" }
              ]
            }
          ],
          keywords: ["SELECT", "*", "FROM", "active_users"]
        }
      },
      {
        id: "lesson-2",
        title: "Creating a View",
        chapterTitle: "Intro to Views",
        xp: 25,
        theory: [
          {
            type: "text",
            content: "You create a view using the `CREATE VIEW` statement."
          },
          {
            type: "code",
            lang: "sql",
            label: "Create View Syntax",
            content: "CREATE VIEW Brazil_Customers AS\nSELECT CustomerName, ContactName\nFROM Customers\nWHERE Country = 'Brazil';"
          }
        ],
        challenge: {
          id: "challenge-2",
          title: "Create High Scores View",
          description: "Write a query to create a view called `high_scores` that selects `player_name` and `score` from the `game_scores` table where `score > 1000`.",
          starter: "-- Write your CREATE VIEW statement here\n",
          tests: [
            {
              id: "test-1",
              description: "Must use CREATE VIEW",
              dbState: {},
              expected: []
            }
          ],
          keywords: ["CREATE", "VIEW", "high_scores", "AS", "SELECT", "WHERE", "score", ">", "1000"]
        }
      }
    ]
  },
  {
    id: "chapter-2",
    title: "Managing Views",
    icon: "🛠️",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-3",
        title: "Updating a View Definition",
        chapterTitle: "Managing Views",
        xp: 25,
        theory: [
          {
            type: "text",
            content: "You can update the definition of an existing view by using the `CREATE OR REPLACE VIEW` statement (or `ALTER VIEW` depending on the database engine)."
          },
          {
            type: "code",
            lang: "sql",
            label: "Replace View Example",
            content: "CREATE OR REPLACE VIEW Brazil_Customers AS\nSELECT CustomerName, ContactName, City\nFROM Customers\nWHERE Country = 'Brazil';"
          }
        ],
        challenge: {
          id: "challenge-3",
          title: "Replace the View",
          description: "Update the `high_scores` view to also include the `game_date` column. (Assume the table is `game_scores` and condition is `score > 1000`).",
          starter: "-- Write your CREATE OR REPLACE VIEW statement here\n",
          tests: [
            {
              id: "test-1",
              description: "Must use CREATE OR REPLACE VIEW",
              dbState: {},
              expected: []
            }
          ],
          keywords: ["CREATE", "OR", "REPLACE", "VIEW", "high_scores", "AS", "SELECT", "game_date"]
        }
      },
      {
        id: "lesson-4",
        title: "Dropping a View",
        chapterTitle: "Managing Views",
        xp: 20,
        theory: [
          {
            type: "text",
            content: "A view is deleted with the `DROP VIEW` command."
          }
        ],
        challenge: {
          id: "challenge-4",
          title: "Drop the View",
          description: "Write a command to delete the view named `old_records`.",
          starter: "-- Drop the view here\n",
          tests: [
            {
              id: "test-1",
              description: "Must use DROP VIEW",
              dbState: {},
              expected: []
            }
          ],
          keywords: ["DROP", "VIEW", "old_records"]
        }
      }
    ]
  },
  {
    id: "chapter-3",
    title: "Updatable Views",
    icon: "🔄",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-5",
        title: "What makes a View Updatable?",
        chapterTitle: "Updatable Views",
        xp: 30,
        theory: [
          {
            type: "text",
            content: "In SQL, some views are 'updatable', meaning you can run `INSERT`, `UPDATE`, or `DELETE` statements on the view itself, and it will modify the underlying base table."
          },
          {
            type: "callout",
            variant: "warning",
            title: "Restrictions",
            content: "A view is generally updatable only if it maps directly to a single table without using aggregates (SUM, COUNT), DISTINCT, GROUP BY, or complex JOINs."
          }
        ],
        challenge: {
          id: "challenge-5",
          title: "Update via View",
          description: "Write an `UPDATE` statement that changes the `status` to 'premium' for the user with `id = 1` inside the `active_users` view.",
          starter: "-- Write your UPDATE statement here\n",
          tests: [
            {
              id: "test-1",
              description: "Must update the view",
              dbState: {},
              expected: []
            }
          ],
          keywords: ["UPDATE", "active_users", "SET", "status", "=", "'premium'", "WHERE", "id", "1"]
        }
      }
    ]
  },
  {
    id: "chapter-4",
    title: "Advanced View Features",
    icon: "🛡️",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-6",
        title: "WITH CHECK OPTION",
        chapterTitle: "Advanced View Features",
        xp: 40,
        theory: [
          {
            type: "text",
            content: "The `WITH CHECK OPTION` is a constraint applied to a view. It ensures that all `UPDATE` and `INSERT` statements executed against the view satisfy the condition in the view's `WHERE` clause."
          },
          {
            type: "code",
            lang: "sql",
            label: "Check Option Syntax",
            content: "CREATE VIEW USA_Customers AS\nSELECT * FROM Customers WHERE Country = 'USA'\nWITH CHECK OPTION;"
          },
          {
            type: "text",
            content: "If you try to insert a customer with `Country = 'Canada'` through this view, the database will throw an error."
          }
        ],
        challenge: {
          id: "challenge-6",
          title: "Create a Secure View",
          description: "Create a view named `teens` that selects all columns from `users` where `age BETWEEN 13 AND 19`. Add `WITH CHECK OPTION` at the end.",
          starter: "-- Write your query here\n",
          tests: [
            {
              id: "test-1",
              description: "Must use WITH CHECK OPTION",
              dbState: {},
              expected: []
            }
          ],
          keywords: ["CREATE", "VIEW", "teens", "AS", "SELECT", "WHERE", "age", "BETWEEN", "WITH CHECK OPTION"]
        }
      }
    ]
  }
];

export const SQLVIEWS_LESSONS = SQLVIEWS_CHAPTERS.flatMap((chapter) =>
  chapter.lessons.map((lesson) => ({
    ...lesson,
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    chapterColor: chapter.color,
    chapterIcon: chapter.icon,
  }))
);

export const SQLVIEWS_TOTAL_XP = SQLVIEWS_LESSONS.reduce(
  (total, lesson) => total + (lesson.xp || 0),
  0
);
