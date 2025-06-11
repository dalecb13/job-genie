-- CreateEnum
CREATE TYPE "WorkType" AS ENUM ('Office', 'Remote', 'Hybrid');

-- CreateTable
CREATE TABLE "JobDescription" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "link" VARCHAR(255) NOT NULL,
    "rawText" TEXT NOT NULL,
    "workType" "WorkType" NOT NULL,
    "jobTitleId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "JobDescription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JobDescription" ADD CONSTRAINT "JobDescription_jobTitleId_fkey" FOREIGN KEY ("jobTitleId") REFERENCES "JobTitle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobDescription" ADD CONSTRAINT "JobDescription_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
