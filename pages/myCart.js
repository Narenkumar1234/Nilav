import Navbar from "../components/Navbar";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import { PlusSmIcon, MinusSmIcon } from "@heroicons/react/solid";

export async function getServerSideProps() {
  try {
    const prisma = new PrismaClient();

    const products = await prisma.Products.findMany({
      orderBy: {
        id: "asc",
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
      },
    };
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      formattedProducts: [],
    },
  };
}

export default function Cart({
  price,
  setPrice,
  count,
  setCount,
  cartItems,
  setCartItems,
  formattedProducts,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceStored, setPriceStored] = useState({});
  const [countStored, setCountStored] = useState({});
  const [cartItemsStored, setCartItemsStored] = useState({});
  useEffect(() => {
    //fetch cartItems from local storage
    try {
      setCountStored(JSON.parse(localStorage.getItem("count")));

      var countKey = Object.keys(countStored).filter(
        (key) => countStored[key] > 0
      );
      setFilteredProducts(
        formattedProducts.filter(
          (formattedProduct) =>
            formattedProduct.qty > 0 &&
            countKey.includes(String(formattedProduct.id))
        )
      );
      setPriceStored(JSON.parse(localStorage.getItem("price")));
      setCartItemsStored(JSON.parse(localStorage.getItem("cartItems")));
    } catch (error) {
      console.log(error);
    }
  }, [cartItems, count, price]);

  useEffect(() => {
    setCount(JSON.parse(localStorage.getItem("count")));
    setPrice(JSON.parse(localStorage.getItem("price")));
  }, []);
  return (
    <>
      {isLoading ? <Loading /> : <div></div>}
      <div className="overflow-hidden mx-aut">
        <Navbar page="2" setIsLoading={setIsLoading}></Navbar>
        <div className="bg-subtheme h-screen w-full">
          <h1 className="font-bold items-center justify-center flex text-lg pt-10 ">
            My Cart!
          </h1>
          {filteredProducts.length > 0 ? (
            <div className="flex items-center text-xs justify-center space-x-1 rounded-2xl py-3 bg-gray-200 text-center mx-10 my-5  text-gray-700 font-normal">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 5v1H4.667a1.75 1.75 0 00-1.743 1.598l-.826 9.5A1.75 1.75 0 003.84 19H16.16a1.75 1.75 0 001.743-1.902l-.826-9.5A1.75 1.75 0 0015.333 6H14V5a4 4 0 00-8 0zm4-2.5A2.5 2.5 0 007.5 5v1h5V5A2.5 2.5 0 0010 2.5zM7.5 10a2.5 2.5 0 005 0V8.75a.75.75 0 011.5 0V10a4 4 0 01-8 0V8.75a.75.75 0 011.5 0V10z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span>You have {filteredProducts.length} items in your cart</span>
            </div>
          ) : (
            <div>
              <div className="flex items-center text-xs justify-center space-x-1 rounded-2xl py-3 bg-gray-200 text-center mx-10 my-5  text-gray-700 font-normal">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 5v1H4.667a1.75 1.75 0 00-1.743 1.598l-.826 9.5A1.75 1.75 0 003.84 19H16.16a1.75 1.75 0 001.743-1.902l-.826-9.5A1.75 1.75 0 0015.333 6H14V5a4 4 0 00-8 0zm4-2.5A2.5 2.5 0 007.5 5v1h5V5A2.5 2.5 0 0010 2.5zM7.5 10a2.5 2.5 0 005 0V8.75a.75.75 0 011.5 0V10a4 4 0 01-8 0V8.75a.75.75 0 011.5 0V10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span>
                  You have {filteredProducts.length} items in your cart
                </span>
              </div>
              <div>
                <div className="flex justify-center">
                  <Link
                    onClick={() => setIsLoading(true)}
                    href="/"
                    className="bg-theme text-white font-semibold px-4 py-2 mr-4 rounded"
                  >
                    Shop Now!
                  </Link>
                </div>
              </div>
            </div>
          )}
          <div className="">
            {filteredProducts.map((product) =>
              count[product.id] ? (
                <container key={product.id} className="col-span-1 ">
                  <div className="flex relative p-5 lg:w-3/12 md:w:3/12">
                    <div className="w-24 h-24 overflow-hidden">
                      <img
                        className="rounded-xl object-cover h-full w-full"
                        src={product.image}
                        width={"100%"}
                        alt="Product Image"
                      />
                    </div>
                    <div className="grid grid-rows-3 ml-2">
                      <span className="text-sm font-bold">{product.name}</span>
                      <span className="text-sm text-gray-500 ">
                        {cartItemsStored[product.id]}
                        {product.id == 1 ? "ml" : "g"}
                      </span>
                      <span className="flex justify-between items-center">
                        <span>
                          ₹{priceStored[product.id] * countStored[product.id]}
                        </span>
                      </span>
                    </div>
                    {product.qty === 0 ? (
                      <div className="outline outline-offset-2 outline-1 rounded-md text-center p-1 text-xs">
                        Out of Stock
                      </div>
                    ) : (
                      <div className="absolute bottom-6 right-5">
                        <div className="flex items-center">
                          <button
                            className="p-0.5 border border-black rounded-full"
                            onClick={() => {
                              count[product.id] > 0 &&
                                setCount((prevCounts) => {
                                  const existingCount =
                                    JSON.parse(localStorage.getItem("count")) ||
                                    {};
                                  const updatedCount =
                                    (prevCounts[product.id] || 0) - 1;
                                  localStorage.setItem(
                                    "count",
                                    JSON.stringify({
                                      ...existingCount,
                                      [product.id]: updatedCount,
                                    })
                                  );
                                  setCountStored(
                                    JSON.parse(localStorage.getItem("count"))
                                  );

                                  var countKey = Object.keys(
                                    countStored
                                  ).filter((key) => countStored[key] > 0);
                                  setFilteredProducts(
                                    formattedProducts.filter(
                                      (formattedProduct) =>
                                        countKey.includes(
                                          String(formattedProduct.id)
                                        )
                                    )
                                  );
                                  return {
                                    ...prevCounts,
                                    [product.id]: updatedCount,
                                  };
                                });
                              count[product.id] < 2 &&
                                localStorage.setItem(
                                  "cartItems",
                                  JSON.stringify(cartItems)
                                );
                            }}
                          >
                            <MinusSmIcon className="h-5 w-5 text-black" />
                          </button>
                          <span className="mx-2">
                            {countStored[product.id]}
                          </span>
                          <button
                            className="p-0.5 border  border-black rounded-full"
                            onClick={() => {
                              product.qty > count[product.id] &&
                                setCount((prevCounts) => {
                                  const existingCount =
                                    JSON.parse(localStorage.getItem("count")) ||
                                    {};
                                  const updatedCount =
                                    (prevCounts[product.id] || 0) + 1;
                                  localStorage.setItem(
                                    "count",
                                    JSON.stringify({
                                      ...existingCount,
                                      [product.id]: updatedCount,
                                    })
                                  );
                                  return {
                                    ...prevCounts,
                                    [product.id]: updatedCount,
                                  };
                                });
                            }}
                          >
                            <PlusSmIcon className="h-5 w-5 text-black" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <hr className="mx-5 border-gray-300 shadow-sm border-0.5 rounded-full"></hr>
                </container>
              ) : (
                <div key={product.id}></div>
              )
            )}
            {filteredProducts.length ? (
              <div className="fixed bottom-0 left-0 w-full py-4 shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-center">
                    <Link
                      onClick={() => setIsLoading(true)}
                      href="/"
                      className="bg-theme text-sm text-white font-semibold px-4 py-2 mr-4 rounded"
                    >
                      Continue Shopping
                    </Link>
                    <Link
                      onClick={() => setIsLoading(true)}
                      href="/customerDetails"
                      className="bg-black text-sm text-white font-semibold px-4 py-2 mr-4 rounded"
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
