/*
  Warnings:

  - You are about to drop the column `type` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `answer` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `question` on the `Question` table. All the data in the column will be lost.
  - Added the required column `certificate` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cirizenship` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parential` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transcript` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `answer_1` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `answer_2` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `answer_3` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `answer_4` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `answer_5` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `answer_6` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "type",
DROP COLUMN "url",
ADD COLUMN     "certificate" TEXT NOT NULL,
ADD COLUMN     "cirizenship" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "parential" TEXT NOT NULL,
ADD COLUMN     "transcript" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "answer",
DROP COLUMN "question",
ADD COLUMN     "answer_1" TEXT NOT NULL,
ADD COLUMN     "answer_2" TEXT NOT NULL,
ADD COLUMN     "answer_3" TEXT NOT NULL,
ADD COLUMN     "answer_4" TEXT NOT NULL,
ADD COLUMN     "answer_5" TEXT NOT NULL,
ADD COLUMN     "answer_6" TEXT NOT NULL;
