/*
  Warnings:

  - You are about to drop the column `winner` on the `Tournament` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tournamentWinnerId]` on the table `Tournament` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Tournament" DROP COLUMN "winner",
ADD COLUMN     "tournamentWinnerId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Tournament_tournamentWinnerId_key" ON "Tournament"("tournamentWinnerId");

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_tournamentWinnerId_fkey" FOREIGN KEY ("tournamentWinnerId") REFERENCES "Participant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
