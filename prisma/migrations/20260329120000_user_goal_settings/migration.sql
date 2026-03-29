-- CreateTable
CREATE TABLE "UserGoalSettings" (
    "userId" TEXT NOT NULL,
    "goalsJson" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserGoalSettings_pkey" PRIMARY KEY ("userId")
);
