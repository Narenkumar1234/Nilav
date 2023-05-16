/*
  Warnings:

  - The primary key for the `Price` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Price` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[priceID]` on the table `Price` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `priceID` to the `Price` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Price" DROP CONSTRAINT "Price_pkey",
DROP COLUMN "id",
ADD COLUMN     "priceID" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Price_priceID_key" ON "Price"("priceID");
