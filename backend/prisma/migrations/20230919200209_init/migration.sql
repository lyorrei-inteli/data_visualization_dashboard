/*
  Warnings:

  - A unique constraint covering the columns `[predictionId]` on the table `PredictionInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "PredictionInfo" DROP CONSTRAINT "PredictionInfo_predictionId_fkey";

-- AlterTable
ALTER TABLE "PredictionInfo" ALTER COLUMN "predictionId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PredictionInfo_predictionId_key" ON "PredictionInfo"("predictionId");

-- AddForeignKey
ALTER TABLE "PredictionInfo" ADD CONSTRAINT "PredictionInfo_predictionId_fkey" FOREIGN KEY ("predictionId") REFERENCES "Prediction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
