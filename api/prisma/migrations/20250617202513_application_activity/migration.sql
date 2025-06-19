-- CreateTable
CREATE TABLE "ExtractJob" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "inputText" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "extractedText" TEXT[],
    "extractionParameters" TEXT NOT NULL,

    CONSTRAINT "ExtractJob_pkey" PRIMARY KEY ("id")
);
