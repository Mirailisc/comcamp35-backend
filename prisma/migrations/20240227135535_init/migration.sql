/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Question` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Question_userId_key" ON "Question"("userId");
