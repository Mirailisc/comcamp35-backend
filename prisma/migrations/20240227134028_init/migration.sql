-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "prefix" TEXT,
    "first_name" TEXT,
    "middle_name" TEXT,
    "last_name" TEXT,
    "nickname" TEXT,
    "profile_url" TEXT,
    "is_registered" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Form" (
    "id" SERIAL NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "tel" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "travel" TEXT NOT NULL,
    "shirt_size" TEXT NOT NULL,
    "can_bring_laptop" BOOLEAN NOT NULL,
    "food_allergy" TEXT,
    "special_food_needs" TEXT,
    "disease" TEXT,
    "personal_drug" TEXT,
    "drug_allergy" TEXT,
    "insurance" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guardian" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "relation" TEXT NOT NULL,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "emergency_email" TEXT,
    "emergency_name" TEXT NOT NULL,
    "emergency_relation" TEXT NOT NULL,
    "emergency_tel" TEXT NOT NULL,

    CONSTRAINT "Guardian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" SERIAL NOT NULL,
    "school_name" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "gpax" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "answer_1" TEXT NOT NULL,
    "answer_2" TEXT NOT NULL,
    "answer_3" TEXT NOT NULL,
    "answer_4" TEXT NOT NULL,
    "answer_5" TEXT NOT NULL,
    "answer_6" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Form_userId_key" ON "Form"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Guardian_userId_key" ON "Guardian"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Education_userId_key" ON "Education"("userId");

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guardian" ADD CONSTRAINT "Guardian_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
