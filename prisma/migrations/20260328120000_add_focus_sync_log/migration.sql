-- CreateTable
CREATE TABLE "FocusSyncLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sessionCount" INTEGER NOT NULL,
    "message" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FocusSyncLog_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "FocusSyncLog_userId_createdAt_idx" ON "FocusSyncLog"("userId", "createdAt");
