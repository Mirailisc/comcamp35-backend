/*
  Warnings:

  - You are about to drop the column `certificate` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `cirizenship` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `parential` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `transcript` on the `File` table. All the data in the column will be lost.
  - Added the required column `type` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "certificate",
DROP COLUMN "cirizenship",
DROP COLUMN "image",
DROP COLUMN "parential",
DROP COLUMN "transcript",
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
