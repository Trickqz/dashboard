/*
  Warnings:

  - You are about to drop the column `verification_code` on the `User` table. All the data in the column will be lost.
  - The `sex` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "verification_code",
ALTER COLUMN "name" DROP NOT NULL,
DROP COLUMN "sex",
ADD COLUMN     "sex" TEXT,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- DropEnum
DROP TYPE "Sex";
