import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export default async function createOrderHandler(req, res) {
  try {
    // Retrieve the order data from the request body
    const {
      name,
      mobile,
      price,
      address,
      paymentId,
      products,
    } = req.body;
    
    const orderId = uuidv4();
    // Insert the order data into the database using Prisma
    const order = await prisma.order.create({
      data: {
        orderId,
        name,
        mobile,
        price,
        address,
        paymentId,
        products,
      },
    });

    // Return the created order as the response
    res.status(201).json({ order });
  } catch (error) {
    console.error(error);
    // Return an error response
    res.status(500).json({ error: "Failed to create order" });
  }
}

