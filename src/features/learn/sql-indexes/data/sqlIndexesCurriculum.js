export const SQLINDEXES_CHAPTERS = [
  {
    id: "chapter-1",
    title: "Intro to Indexes",
    icon: "📇",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-1",
        title: "What is an Index?",
        chapterTitle: "Intro to Indexes",
        xp: 20,
        theory: [
          {
            type: "text",
            content: "Indexes are used to retrieve data from the database very fast. An index is like an index in the back of a book. It helps the database find data without scanning every single row in a table (a full table scan).",
          },
          {
            type: "callout",
            variant: "warning",
            title: "Performance Cost",
            content: "While indexes speed up SELECT queries drastically, they slow down UPDATE, INSERT, and DELETE statements because the index must be updated every time data is changed. Don't index every column!"
          }
        ],
        challenge: {
          id: "challenge-1",
          title: "Create an Index",
          description: "Write a statement to create an index named `idx_lastname` on the `last_name` column of the `persons` table.",
          starter: "CREATE INDEX idx_lastname\n-- specify the table and column here\n",
          tests: [
            {
              id: "test-1",
              description: "Must use CREATE INDEX",
              dbState: {},
              expected: []
            }
          ],
          keywords: ["CREATE", "INDEX", "idx_lastname", "ON", "persons", "last_name"]
        }
      },
      {
        id: "lesson-2",
        title: "Unique Indexes",
        chapterTitle: "Intro to Indexes",
        xp: 25,
        theory: [
          {
            type: "text",
            content: "A Unique Index is exactly like a regular index, but it adds a constraint: it does not allow duplicate values to be inserted into the indexed column(s)."
          },
          {
            type: "code",
            lang: "sql",
            label: "Unique Index Example",
            content: "CREATE UNIQUE INDEX idx_email\nON users (email);"
          }
        ],
        challenge: {
          id: "challenge-2",
          title: "Enforce Unique Emails",
          description: "Create a unique index named `uq_email` on the `email` column in the `employees` table.",
          starter: "-- Write your CREATE UNIQUE INDEX query here\n",
          tests: [
            {
              id: "test-1",
              description: "Must create a unique index",
              dbState: {},
              expected: []
            }
          ],
          keywords: ["CREATE", "UNIQUE", "INDEX", "uq_email", "ON", "employees", "email"]
        }
      }
    ]
  },
  {
    id: "chapter-2",
    title: "Multi-Column Indexes",
    icon: "📑",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-3",
        title: "Composite Indexes",
        chapterTitle: "Multi-Column Indexes",
        xp: 30,
        theory: [
          {
            type: "text",
            content: "An index can be created on a combination of columns. This is known as a composite index. It is useful for queries that frequently filter or sort by those specific columns together."
          },
          {
            type: "code",
            lang: "sql",
            label: "Composite Index Syntax",
            content: "CREATE INDEX idx_name\nON persons (last_name, first_name);"
          }
        ],
        challenge: {
          id: "challenge-3",
          title: "Create a Composite Index",
          description: "Create an index named `idx_fullname` on the `first_name` and `last_name` columns of the `customers` table.",
          starter: "-- Write your composite index query here\n",
          tests: [
            {
              id: "test-1",
              description: "Must create a composite index",
              dbState: {},
              expected: []
            }
          ],
          keywords: ["CREATE", "INDEX", "idx_fullname", "ON", "customers", "first_name", "last_name"]
        }
      }
    ]
  },
  {
    id: "chapter-3",
    title: "Managing Indexes",
    icon: "🧹",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-4",
        title: "Dropping Indexes",
        chapterTitle: "Managing Indexes",
        xp: 20,
        theory: [
          {
            type: "text",
            content: "If an index is no longer used, or if it is slowing down writes too much, you can drop it. The syntax varies depending on the database."
          },
          {
            type: "code",
            lang: "sql",
            label: "Drop Index Syntax (PostgreSQL/MySQL)",
            content: "DROP INDEX index_name;"
          },
          {
            type: "code",
            lang: "sql",
            label: "Drop Index Syntax (SQL Server)",
            content: "DROP INDEX table_name.index_name;"
          }
        ],
        challenge: {
          id: "challenge-4",
          title: "Drop an Old Index",
          description: "Write a standard SQL statement to drop the index named `idx_old_data`.",
          starter: "-- Write your DROP query here\n",
          tests: [
            {
              id: "test-1",
              description: "Must drop the index",
              dbState: {},
              expected: []
            }
          ],
          keywords: ["DROP", "INDEX", "idx_old_data"]
        }
      }
    ]
  }
];

export const SQLINDEXES_LESSONS = SQLINDEXES_CHAPTERS.flatMap((chapter) =>
  chapter.lessons.map((lesson) => ({
    ...lesson,
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    chapterColor: chapter.color,
    chapterIcon: chapter.icon,
  }))
);

export const SQLINDEXES_TOTAL_XP = SQLINDEXES_LESSONS.reduce(
  (total, lesson) => total + (lesson.xp || 0),
  0
);
