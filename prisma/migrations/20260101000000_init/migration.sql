-- CreateTable
CREATE TABLE "TimeSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "activity" TEXT NOT NULL,
    "description" TEXT,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3),
    "date" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'tracked',
    "healthDataType" TEXT,
    "healthDataDetails" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimeSession_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "TimeSession_userId_date_idx" ON "TimeSession"("userId", "date");
CREATE INDEX "TimeSession_userId_startTime_idx" ON "TimeSession"("userId", "startTime");
