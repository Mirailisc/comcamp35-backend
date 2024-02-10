/*
  Warnings:

  - You are about to drop the column `favorite_food` on the `Form` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Form" DROP COLUMN "favorite_food",
ADD COLUMN     "special_food_needs" TEXT;
