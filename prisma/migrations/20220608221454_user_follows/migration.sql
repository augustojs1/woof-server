/*
  Warnings:

  - You are about to drop the column `followers` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `following` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "followers",
DROP COLUMN "following",
ADD COLUMN     "followers_ammount" INTEGER DEFAULT 0,
ADD COLUMN     "following_ammount" INTEGER DEFAULT 0;

-- CreateTable
CREATE TABLE "users_follows" (
    "followerId" INTEGER NOT NULL,
    "followingId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "users_follows_pkey" PRIMARY KEY ("followerId","followingId")
);

-- AddForeignKey
ALTER TABLE "users_follows" ADD CONSTRAINT "users_follows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_follows" ADD CONSTRAINT "users_follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_follows" ADD CONSTRAINT "users_follows_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
