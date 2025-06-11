-- CreateTable
CREATE TABLE "Keywords" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "technologies" TEXT[],
    "competencies" TEXT[],
    "applicationId" TEXT NOT NULL,

    CONSTRAINT "Keywords_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Keywords" ADD CONSTRAINT "Keywords_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
