/*
  Warnings:

  - You are about to drop the column `isSuperAdmin` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'super';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "isSuperAdmin",
DROP COLUMN "role",
ADD COLUMN     "roles" "Role"[];
