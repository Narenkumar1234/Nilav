import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
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
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error updating products" });
      }
      break;

    case "GET":
      try {
        const products = await prisma.products.findMany({
          orderBy: {
            id: "asc",
          },
        });
        const formattedProducts = products.map((product) => ({
          ...product,
          createdAt: product.createdAt.toISOString(),
        }));
        res.status(200).json(formattedProducts);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error retrieving products" });
      }
      break;

    default:
      res.status(405).json({ error: "Method Not Allowed" });
  }
}
