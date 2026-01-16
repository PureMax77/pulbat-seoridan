/*
  Warnings:

  - Made the column `keyword` on table `ProductPrice` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ProductPrice" ADD COLUMN     "discountRate" DOUBLE PRECISION,
ADD COLUMN     "quantity" INTEGER,
ADD COLUMN     "unitPrice" DOUBLE PRECISION,
ADD COLUMN     "weight" DOUBLE PRECISION,
ALTER COLUMN "keyword" SET NOT NULL;
