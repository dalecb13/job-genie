-- CreateTable
CREATE TABLE "_JobDescriptionToTechnology" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_JobDescriptionToTechnology_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CompetencyToJobDescription" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CompetencyToJobDescription_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_JobDescriptionToTechnology_B_index" ON "_JobDescriptionToTechnology"("B");

-- CreateIndex
CREATE INDEX "_CompetencyToJobDescription_B_index" ON "_CompetencyToJobDescription"("B");

-- AddForeignKey
ALTER TABLE "_JobDescriptionToTechnology" ADD CONSTRAINT "_JobDescriptionToTechnology_A_fkey" FOREIGN KEY ("A") REFERENCES "JobDescription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobDescriptionToTechnology" ADD CONSTRAINT "_JobDescriptionToTechnology_B_fkey" FOREIGN KEY ("B") REFERENCES "Technology"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompetencyToJobDescription" ADD CONSTRAINT "_CompetencyToJobDescription_A_fkey" FOREIGN KEY ("A") REFERENCES "Competency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompetencyToJobDescription" ADD CONSTRAINT "_CompetencyToJobDescription_B_fkey" FOREIGN KEY ("B") REFERENCES "JobDescription"("id") ON DELETE CASCADE ON UPDATE CASCADE;
