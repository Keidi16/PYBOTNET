-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deviceIP" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_id_key" ON "Session"("id");
