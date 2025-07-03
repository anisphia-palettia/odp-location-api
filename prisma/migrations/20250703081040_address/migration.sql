/*
  Warnings:

  - Added the required column `address` to the `Coordinate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coordinate" ADD COLUMN     "address" TEXT NOT NULL;
