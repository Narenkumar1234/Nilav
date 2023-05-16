-- CreateTable
CREATE TABLE "Price" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL,
    "qtyPerGram" INTEGER NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_price_fkey" FOREIGN KEY ("price") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
