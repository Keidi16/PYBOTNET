-- CreateTable
CREATE TABLE "requests" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "deviceIP" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "requests_id_key" ON "requests"("id");

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
