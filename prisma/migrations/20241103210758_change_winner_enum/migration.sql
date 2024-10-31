/*
  Warnings:

  - The values [OpponentA,OpponentB] on the enum `Winner` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Winner_new" AS ENUM ('opponentA', 'opponentB', 'Draw');
ALTER TABLE "Match" ALTER COLUMN "winner" TYPE "Winner_new" USING ("winner"::text::"Winner_new");
ALTER TYPE "Winner" RENAME TO "Winner_old";
ALTER TYPE "Winner_new" RENAME TO "Winner";
DROP TYPE "Winner_old";
COMMIT;
