-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('PENDING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "Winner" AS ENUM ('OpponentA', 'OpponentB', 'Draw');

-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "status" "MatchStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "winner" "Winner";
