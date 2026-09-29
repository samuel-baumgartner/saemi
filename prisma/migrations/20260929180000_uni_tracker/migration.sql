-- CreateTable
CREATE TABLE "UniCourse" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#6366f1',
    "hasQuiz" BOOLEAN NOT NULL DEFAULT false,
    "position" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT NOT NULL DEFAULT '',
    "exerciseRule" JSONB,
    "quizRule" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UniCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UniItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "week" INTEGER NOT NULL,
    "kind" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "skipped" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT NOT NULL DEFAULT '',
    "dueAt" TIMESTAMP(3),
    "dueManual" BOOLEAN NOT NULL DEFAULT false,
    "points" TEXT NOT NULL DEFAULT '',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UniItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UniCourse_userId_idx" ON "UniCourse"("userId");

-- CreateIndex
CREATE INDEX "UniItem_userId_dueAt_idx" ON "UniItem"("userId", "dueAt");

-- CreateIndex
CREATE UNIQUE INDEX "UniItem_courseId_week_kind_key" ON "UniItem"("courseId", "week", "kind");

-- AddForeignKey
ALTER TABLE "UniItem" ADD CONSTRAINT "UniItem_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "UniCourse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

