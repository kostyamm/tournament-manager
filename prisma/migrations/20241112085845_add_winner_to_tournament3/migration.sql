/*
  Warnings:

  - You are about to drop the column `tournamentWinnerId` on the `Tournament` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tournament" DROP CONSTRAINT "Tournament_tournamentWinnerId_fkey";

-- DropIndex
DROP INDEX "Tournament_tournamentWinnerId_key";

-- AlterTable
ALTER TABLE "Tournament" DROP COLUMN "tournamentWinnerId";
