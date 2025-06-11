/*
  Warnings:

  - You are about to drop the `CompetenciesOnKeywords` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Keywords` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TechnologiesOnKeywords` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CompetenciesOnKeywords" DROP CONSTRAINT "CompetenciesOnKeywords_competencyId_fkey";

-- DropForeignKey
ALTER TABLE "CompetenciesOnKeywords" DROP CONSTRAINT "CompetenciesOnKeywords_keywordsId_fkey";

-- DropForeignKey
ALTER TABLE "Keywords" DROP CONSTRAINT "Keywords_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "TechnologiesOnKeywords" DROP CONSTRAINT "TechnologiesOnKeywords_keywordsId_fkey";

-- DropForeignKey
ALTER TABLE "TechnologiesOnKeywords" DROP CONSTRAINT "TechnologiesOnKeywords_technologyId_fkey";

-- DropTable
DROP TABLE "CompetenciesOnKeywords";

-- DropTable
DROP TABLE "Keywords";

-- DropTable
DROP TABLE "TechnologiesOnKeywords";

-- CreateTable
CREATE TABLE "ApplicationTechnologies" (
    "technologyId" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApplicationTechnologies_pkey" PRIMARY KEY ("technologyId","applicationId")
);

-- CreateTable
CREATE TABLE "ApplicationCompetencies" (
    "competencyId" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApplicationCompetencies_pkey" PRIMARY KEY ("competencyId","applicationId")
);

-- AddForeignKey
ALTER TABLE "ApplicationTechnologies" ADD CONSTRAINT "ApplicationTechnologies_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "Technology"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationTechnologies" ADD CONSTRAINT "ApplicationTechnologies_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationCompetencies" ADD CONSTRAINT "ApplicationCompetencies_competencyId_fkey" FOREIGN KEY ("competencyId") REFERENCES "Competency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationCompetencies" ADD CONSTRAINT "ApplicationCompetencies_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
