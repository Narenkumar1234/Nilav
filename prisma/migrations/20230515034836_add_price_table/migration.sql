/*
  Warnings:

  - You are about to drop the column `priceID` on the `Price` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[priceId]` on the table `Price` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `Price` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_priceId_fkey";

-- DropIndex
DROP INDEX "Price_priceID_key";

-- AlterTable
CREATE SEQUENCE price_priceid_seq;
ALTER TABLE "Price" DROP COLUMN "priceID",
ADD COLUMN     "id" INTEGER NOT NULL,
ALTER COLUMN "priceId" SET DEFAULT nextval('price_priceid_seq');
ALTER SEQUENCE price_priceid_seq OWNED BY "Price"."priceId";

-- CreateIndex
CREATE UNIQUE INDEX "Price_priceId_key" ON "Price"("priceId");

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_id_fkey" FOREIGN KEY ("id") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
