import Navbar from "../components/Navbar";
import Link from "next/link";
import PromptMobile from "@/components/PromptMobile";
import { useState } from "react";
import { PrismaClient } from "@prisma/client";
import Loading from "@/components/loading";
import Image from "next/image";

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

export default function Home({
  formattedProducts,
  productOnePrice: productOnePriceList,
  productTwoPrice: productTwoPriceList,
  theme,
  setTheme,
}) {
  var id1 = 0;
  var id2 = 0;
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading ? <Loading /> : <div></div>}
      <PromptMobile />
      <div className="">
        <Navbar page="1" setIsLoading={setIsLoading}></Navbar>
        <div className="bg-subtheme pt-3 h-full w-full">
          <h1 className="font-bold items-center justify-center flex text-lg pt-10">
            Our Products!
          </h1>
          {formattedProducts.map((formattedProduct) => (
            <div key={formattedProduct.id} className="mt-5">
              <div className="">
                <div className="pb-10">
                  <div className=" mx-10 rounded-xl bg-white">
                    <div className="px-3 pt-3">
                      <div className="rounded-xl product-page-image-div overflow-hidden ">
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
                        ut eleifend mi ante vitae nisl. Suspendisse dapibus in
                        felis ac ultricies. Cras eget commodo lacus. Integer non
                        consequat nulla. Proin scelerisque erat et ipsum
                        venenatis, sit amet hendrerit urna posuere. Aliquam
                        pharetra, enim tincidunt ullamcorper gravida, tortor
                        eros ultrices erat, in blandit ante nisi vel augue.
                      </p>
                    </div>
                    <div className="text-center p-3 pb-10">
                      <Link
                        onClick={() => setIsLoading(true)}
                        href={`/products/${formattedProduct.id}`}
                        className="bg-theme text-white font-semibold px-4 py-2 mr-4 rounded"
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

      {/* {formattedProducts ? ( */}
      {/* .0{ formattedProducts.map((formattedProduct) => {
              <div>{formattedProduct.image}</div>;
              <div className="space-y-10">
                <div>
                  <div className=" mx-10 rounded-xl bg-white">
                    <div className="px-3 pt-3">
                      <div className="rounded-xl product-page-image-div overflow-hidden ">
                        <img
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
                        ut eleifend mi ante vitae nisl. Suspendisse dapibus in
                        felis ac ultricies. Cras eget commodo lacus. Integer non
                        consequat nulla. Proin scelerisque erat et ipsum
                        venenatis, sit amet hendrerit urna posuere. Aliquam
                        pharetra, enim tincidunt ullamcorper gravida, tortor
                        eros ultrices erat, in blandit ante nisi vel augue.
                      </p>
                    </div>
                    <div className="text-center p-3">
                      <button className="bg-theme text-white font-semibold px-4 py-2 mr-4 rounded">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>;
            })} */}
    </>
  );
}
