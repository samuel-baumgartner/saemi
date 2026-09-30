-- Every course gets a weekly lecture (Vorlesung) row; lectures never have a deadline.
INSERT INTO "UniItem" ("id", "userId", "courseId", "week", "kind", "updatedAt")
SELECT md5(random()::text || clock_timestamp()::text || c."id" || w::text), c."userId", c."id", w, 'lecture', NOW()
FROM "UniCourse" c
CROSS JOIN generate_series(1, 14) AS w
ON CONFLICT ("courseId", "week", "kind") DO NOTHING;
