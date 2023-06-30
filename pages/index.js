import Navbar from "../components/Navbar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { PrismaClient } from "@prisma/client";
import Loading from "@/components/loading";
import Layout from "./layout/layout";
export async function getServerSideProps() {
  try {
    const prisma = new PrismaClient();

    const products = await prisma.products.findMany({
      orderBy: { id: "asc" },
    });

    const productOnePrice = await prisma.price.findMany({
      where: {
        id: 1,
      },
      orderBy: {
        qtyPerGram: "asc",
      },
    });

    const productTwoPrice = await prisma.price.findMany({
      where: {
        id: 2,
      },
    });

    await prisma.$disconnect();

    const formattedProducts = products.map((product) => ({
      ...product,
      createdAt: product.createdAt.toISOString(),
    }));
    return {
      props: {
        formattedProducts,
        productOnePrice,
        productTwoPrice,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        formattedProducts: [],
      },
    };
  }
}

export default function Home({ formattedProducts }) {
  const [isLoading, setIsLoading] = useState(false);


  return (
    <>
    <Layout>
      {isLoading ? <Loading /> : <div></div>}
          <Navbar page="1" setIsLoading={setIsLoading}></Navbar>
          <h1 className="font-bold items-center justify-center flex text-lg pt-10">
            Our Products!
          </h1>
          <div>
            <div className="">
              {formattedProducts.map((formattedProduct) => (
                <div key={formattedProduct.id} className="mt-5 ">
                  <div className="product-div col-span-1">
                    <div className="pb-10 ">
                      <div className=" mx-10 rounded-xl bg-white">
                        <div className="px-3 pt-3">
                          <div className="rounded-xl home-page-image-div overflow-hidden ">
                            <img
                              alt=""
                              width={"100%"}
                              src={formattedProduct.image}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="p-3 mx-auto text-justify">
                          <h1 className="text-center font-semibold">
                            {formattedProduct.name}
                          </h1>
                          <p className=" text-gray-400 text-sm ">
                            {formattedProduct.description}
                          </p>
                        </div>
                        <div className="text-center p-3 pb-10">
                          <Link
                            onClick={() => setIsLoading(true)}
                            href={`/products/${formattedProduct.id}`}
                            className="bg-button text-white font-semibold px-4 py-2 mr-4 rounded"
                          >
                            Buy Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

    </Layout>
    </>
  );
}
