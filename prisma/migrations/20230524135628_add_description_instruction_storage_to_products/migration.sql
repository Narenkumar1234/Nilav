/*
  Warnings:

  - Added the required column `description` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instruction` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storage` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "instruction" TEXT NOT NULL,
ADD COLUMN     "storage" TEXT NOT NULL;
