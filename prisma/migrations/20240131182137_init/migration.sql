/*
  Warnings:

  - Added the required column `emergency_name` to the `Guardian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergency_relation` to the `Guardian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergency_tel` to the `Guardian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guardian" ADD COLUMN     "emergency_email" TEXT,
ADD COLUMN     "emergency_name" TEXT NOT NULL,
ADD COLUMN     "emergency_relation" TEXT NOT NULL,
ADD COLUMN     "emergency_tel" TEXT NOT NULL;
