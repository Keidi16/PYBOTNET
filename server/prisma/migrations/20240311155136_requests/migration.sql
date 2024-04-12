/*
  Warnings:

  - You are about to drop the column `status` on the `requests` table. All the data in the column will be lost.
  - Added the required column `statusCode` to the `requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "requests" DROP COLUMN "status",
ADD COLUMN     "statusCode" INTEGER NOT NULL;
