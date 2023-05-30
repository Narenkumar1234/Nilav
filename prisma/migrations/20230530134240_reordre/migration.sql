-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "instruction" DROP NOT NULL,
ALTER COLUMN "storage" DROP NOT NULL,
ALTER COLUMN "specialNote" DROP NOT NULL,
ALTER COLUMN "benefits" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "orderId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "address" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "products" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderId_key" ON "Order"("orderId");
