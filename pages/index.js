import Navbar from "../components/Navbar";
import { PlusSmIcon, MinusSmIcon } from "@heroicons/react/solid";
import Link from "next/link";
import PromptMobile from "@/components/PromptMobile";
import { useState, useEffect } from "react";
import { PrismaClient } from "@prisma/client";
import Loading from "@/components/loading";

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
  faceCount,
  setFaceCount,
  bathCount,
  setBathCount,
  formattedProducts,
  productOnePrice: productOnePriceList,
  productTwoPrice: productTwoPriceList,
  selectedPriceOne,
  setSelectedPriceOne,
  selectedPriceTwo,
  setSelectedPriceTwo,
  setSelectedQtyOne,
  setSelectedQtyTwo,
  theme,
  setTheme
}) {
  var id1 = 0;
  var id2 = 0;
  const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
      const darkThemeMediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );

      const handleDarkThemeChange = (event) => {
        if(event.matches){
          setTheme("darktheme")
        }
        else{
          setTheme("theme")
        }
      };

      darkThemeMediaQuery.addEventListener("change", handleDarkThemeChange);
      if (darkThemeMediaQuery.matches) {
        setTheme("darktheme");
      } else {
        setTheme("theme");
      }
      return () => {
        darkThemeMediaQuery.removeEventListener(
          "change",
          handleDarkThemeChange
        );
      };
    }, []);
  return (
    <>
      {isLoading ? <Loading /> : <div></div>}
      <PromptMobile />
      <div className="lg:hidden">
        <Navbar page="1" setIsLoading={setIsLoading}></Navbar>
        <div className="bg-subtheme h-screen w-full paddingBody">
          <h1 className="font-bold items-center justify-center flex text-lg py-10">
            Our Products!
          </h1>
          {formattedProducts && formattedProducts[0] ? (
            <div>
              <div className="space-y-10">
                <div className=" bg-white h-full mx-10 rounded-xl">
                  <div className=" grid grid-rows-4">
                    <div className=" row-span-3 ">
                      <div className=" grid grid-cols-2 py-3 ">
                        <div className=" col-span-1 ">
                          <div className="flex relative items-center justify-center ">
                            <div className="w-24 h-24 rounded-xl overflow-hidden ">
                              <img
                                src={formattedProducts[0].image}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </div>
                        <div className=" col-span-1">
                          <h1 className="text-sm">
                            {formattedProducts[0].name}
                          </h1>
                          <select
                            value={selectedPriceOne}
                            onChange={(e) => {
                              const selectedOption =
                                e.target.options[e.target.selectedIndex];
                              setSelectedQtyOne(
                                selectedOption.getAttribute("data-qty-per-gram")
                              );
                              setSelectedPriceOne(e.target.value);
                            }}
                            className="mt-3 bg-gray-50 border border-gray-300 text-gray-400  text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-max p-1.5"
                          >
                            {productOnePriceList.map(({ key = id1++ }) => (
                              <option
                                key={key}
                                className="text-black"
                                value={productOnePriceList[key].price}
                                data-qty-per-gram={
                                  productOnePriceList[key].qtyPerGram
                                }
                              >
                                {productOnePriceList[key].qtyPerGram}g
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row-span-1 px-7">
                      <div className="flex justify-between items-center">
                        {formattedProducts[0].qty === 0 ? (
                          <div className="outline outline-offset-2 outline-1 rounded-md text-center p-1 text-xs">
                            Out of Stock
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-center">
                              <button
                                className="p-0.5 border border-green-800 rounded-full"
                                onClick={() =>
                                  bathCount && setBathCount(bathCount - 1)
                                }
                              >
                                <MinusSmIcon className="h-5 w-5 text-black" />
                              </button>
                              <span className="mx-2">{bathCount}</span>
                              <button
                                className="p-0.5 border  border-green-800 rounded-full"
                                onClick={() =>
                                  bathCount < formattedProducts[0].qty &&
                                  setBathCount(bathCount + 1)
                                }
                              >
                                <PlusSmIcon className="h-5 w-5 text-black" />
                              </button>
                            </div>
                          </div>
                        )}
                        <div className="font-bold">
                          {selectedPriceOne
                            ? "₹" + selectedPriceOne
                            : "₹" + productOnePriceList[0].price}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" bg-white h-full mx-10 rounded-xl pb-4">
                  <div className=" grid grid-rows-4">
                    <div className=" row-span-3">
                      <div className=" grid grid-cols-2 py-3 ">
                        <div className=" col-span-1 ">
                          <div className=" flex items-center justify-center">
                            <div className=" w-24 h-24 relative rounded-lg overflow-hidden">
                              <img
                                src={formattedProducts[1].image}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-span-1">
                          <div className="col-span-1">
                            <h1 className="text-sm">
                              {formattedProducts[1].name}
                            </h1>
                            <select
                              defaultValue={selectedPriceTwo}
                              onChange={(e) => {
                                const selectedOption =
                                  e.target.options[e.target.selectedIndex];
                                setSelectedPriceTwo(e.target.value);
                                setSelectedQtyTwo(
                                  selectedOption.getAttribute(
                                    "data-qty-per-gram"
                                  )
                                );
                              }}
                              className="mt-3 bg-gray-50 border border-gray-300 text-gray-400 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-max p-1.5"
                            >
                              {productTwoPriceList.map(({ key = id2++ }) => (
                                <option
                                  key={key}
                                  className="text-black "
                                  value={productTwoPriceList[key].price}
                                  data-qty-per-gram={
                                    productTwoPriceList[key].qtyPerGram
                                  }
                                >
                                  {productTwoPriceList[key].qtyPerGram}ml
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row-span-1 px-7">
                      <div className="flex justify-between items-center">
                        {formattedProducts[1].qty === 0 ? (
                          <div className="outline outline-offset-2 outline-1 rounded-md text-center p-1 text-xs">
                            Out of Stock
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-center">
                              <button
                                className="p-0.5 border border-green-800 rounded-full"
                                onClick={() =>
                                  faceCount && setFaceCount(faceCount - 1)
                                }
                              >
                                <MinusSmIcon className="h-5 w-5 text-black" />
                              </button>
                              <span className="mx-2">{faceCount}</span>
                              <button
                                className="p-0.5 border  border-green-800 rounded-full"
                                onClick={() =>
                                  faceCount < formattedProducts[1].qty &&
                                  setFaceCount(faceCount + 1)
                                }
                              >
                                <PlusSmIcon className="h-5 w-5 text-black" />
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="font-bold">
                          {selectedPriceTwo
                            ? "₹" + selectedPriceTwo
                            : "₹" + productTwoPriceList[0].price}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-white font-bold justify-center flex absolute right-0 bottom-0 left-0 mb-10">
                {formattedProducts[0].qty || formattedProducts[1].qty ? (
                  <Link
                    href="/myCart"
                    className={"bg-theme py-1 px-2 rounded-lg"}                    onClick={() => {
                      selectedPriceOne ??
                        setSelectedPriceOne(productOnePriceList[0].price);
                      selectedPriceTwo ??
                        setSelectedPriceTwo(productTwoPriceList[0].price);
                      setIsLoading(true);
                    }}
                  >
                    Proceed
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 inline-block ml-2 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </Link>
                ) : (
                  <button className="bg-theme py-1 px-2 rounded-lg">
                    Sorry! Come back later!
                  </button>
                )}
              </div>
            </div>
          ) : (
            <center>
              Oops Something Went Wrong ! <br />
              We are Facing Some Issues <br />
              Try again after Somethime
            </center>
          )}
        </div>
      </div>
    </>
  );
}
