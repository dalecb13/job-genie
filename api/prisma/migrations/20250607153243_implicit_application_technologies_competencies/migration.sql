/*
  Warnings:

  - You are about to drop the `ApplicationCompetencies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ApplicationTechnologies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ApplicationCompetencies" DROP CONSTRAINT "ApplicationCompetencies_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "ApplicationCompetencies" DROP CONSTRAINT "ApplicationCompetencies_competencyId_fkey";

-- DropForeignKey
ALTER TABLE "ApplicationTechnologies" DROP CONSTRAINT "ApplicationTechnologies_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "ApplicationTechnologies" DROP CONSTRAINT "ApplicationTechnologies_technologyId_fkey";

-- DropTable
DROP TABLE "ApplicationCompetencies";

-- DropTable
DROP TABLE "ApplicationTechnologies";

-- CreateTable
CREATE TABLE "_ApplicationToTechnology" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ApplicationToTechnology_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ApplicationToCompetency" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ApplicationToCompetency_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ApplicationToTechnology_B_index" ON "_ApplicationToTechnology"("B");

-- CreateIndex
CREATE INDEX "_ApplicationToCompetency_B_index" ON "_ApplicationToCompetency"("B");

-- AddForeignKey
ALTER TABLE "_ApplicationToTechnology" ADD CONSTRAINT "_ApplicationToTechnology_A_fkey" FOREIGN KEY ("A") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApplicationToTechnology" ADD CONSTRAINT "_ApplicationToTechnology_B_fkey" FOREIGN KEY ("B") REFERENCES "Technology"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApplicationToCompetency" ADD CONSTRAINT "_ApplicationToCompetency_A_fkey" FOREIGN KEY ("A") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApplicationToCompetency" ADD CONSTRAINT "_ApplicationToCompetency_B_fkey" FOREIGN KEY ("B") REFERENCES "Competency"("id") ON DELETE CASCADE ON UPDATE CASCADE;
