-- CreateTable
CREATE TABLE "UnproductiveExtraGrant" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "minutes" INTEGER NOT NULL,
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UnproductiveExtraGrant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UnproductiveExtraGrant_userId_date_idx" ON "UnproductiveExtraGrant"("userId", "date");
