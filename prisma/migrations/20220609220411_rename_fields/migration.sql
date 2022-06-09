/*
  Warnings:

  - You are about to drop the column `createdAt` on the `liked_posts` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `liked_posts` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - The primary key for the `users_follows` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `users_follows` table. All the data in the column will be lost.
  - You are about to drop the column `followerId` on the `users_follows` table. All the data in the column will be lost.
  - You are about to drop the column `followingId` on the `users_follows` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users_follows` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `users_follows` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `liked_posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `follower_id` to the `users_follows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `following_id` to the `users_follows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users_follows` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users_follows" DROP CONSTRAINT "users_follows_followerId_fkey";

-- DropForeignKey
ALTER TABLE "users_follows" DROP CONSTRAINT "users_follows_followingId_fkey";

-- DropForeignKey
ALTER TABLE "users_follows" DROP CONSTRAINT "users_follows_userId_fkey";

-- AlterTable
ALTER TABLE "liked_posts" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users_follows" DROP CONSTRAINT "users_follows_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "followerId",
DROP COLUMN "followingId",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "follower_id" INTEGER NOT NULL,
ADD COLUMN     "following_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" INTEGER,
ADD CONSTRAINT "users_follows_pkey" PRIMARY KEY ("follower_id", "following_id");

-- AddForeignKey
ALTER TABLE "users_follows" ADD CONSTRAINT "users_follows_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_follows" ADD CONSTRAINT "users_follows_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_follows" ADD CONSTRAINT "users_follows_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
