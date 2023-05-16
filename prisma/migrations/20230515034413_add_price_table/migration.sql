/*
  Warnings:

  - You are about to drop the column `price` on the `Price` table. All the data in the column will be lost.
  - Added the required column `priceId` to the `Price` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_price_fkey";

-- AlterTable
ALTER TABLE "Price" DROP COLUMN "price",
ADD COLUMN     "priceId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
