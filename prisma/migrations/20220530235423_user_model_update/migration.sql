/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "profile_name" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");
