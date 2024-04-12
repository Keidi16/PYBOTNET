/*
  Warnings:

  - Added the required column `username` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "username" TEXT NOT NULL;
