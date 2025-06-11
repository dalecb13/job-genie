/*
  Warnings:

  - You are about to drop the column `competencies` on the `Keywords` table. All the data in the column will be lost.
  - You are about to drop the column `technologies` on the `Keywords` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Keywords" DROP COLUMN "competencies",
DROP COLUMN "technologies";

-- CreateTable
CREATE TABLE "Technology" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Technology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Competency" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Competency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechnologiesOnKeywords" (
    "technologyId" TEXT NOT NULL,
    "keywordsId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TechnologiesOnKeywords_pkey" PRIMARY KEY ("technologyId","keywordsId")
);

-- CreateTable
CREATE TABLE "CompetenciesOnKeywords" (
    "competencyId" TEXT NOT NULL,
    "keywordsId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompetenciesOnKeywords_pkey" PRIMARY KEY ("competencyId","keywordsId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Technology_name_key" ON "Technology"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Competency_name_key" ON "Competency"("name");

-- AddForeignKey
ALTER TABLE "TechnologiesOnKeywords" ADD CONSTRAINT "TechnologiesOnKeywords_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "Technology"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologiesOnKeywords" ADD CONSTRAINT "TechnologiesOnKeywords_keywordsId_fkey" FOREIGN KEY ("keywordsId") REFERENCES "Keywords"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetenciesOnKeywords" ADD CONSTRAINT "CompetenciesOnKeywords_competencyId_fkey" FOREIGN KEY ("competencyId") REFERENCES "Competency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetenciesOnKeywords" ADD CONSTRAINT "CompetenciesOnKeywords_keywordsId_fkey" FOREIGN KEY ("keywordsId") REFERENCES "Keywords"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
