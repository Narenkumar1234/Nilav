import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "POST":
      const { stockOne, stockTwo } = req.body;
      const updatedProducts = await prisma.$transaction([
        prisma.products.update({
          where: {
            id: 1,
          },
          data: {
            qty: stockOne,
          },
        }),
        prisma.products.update({
          where: {
            id: 2,
          },
          data: {
            qty: stockTwo,
          },
        }),
      ]);
      res.status(201).json(updatedProducts);
  }
}
