import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import { PlusSmIcon, MinusSmIcon } from "@heroicons/react/solid";
import Layout from "./layout/layout";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import "public/Shopping bag-amico-darkgreen.png";

// export async function getServerSideProps() {
//   try {
//     const prisma = new PrismaClient();

//     const products = await prisma.Products.findMany({
//       orderBy: {
//         id: "asc",
//       },
//     });
//     await prisma.$disconnect();

//     const formattedProducts = products.map((product) => ({
//       ...product,
//       createdAt: product.createdAt.toISOString(),
//     }));

//     return {
//       props: {
//         formattedProducts,
//       },
//     };
//   } catch (error) {
//     console.log(error);
//   }
//   return {
//     props: {
//       formattedProducts: [],
//     },
//   };
// }

export default function Cart({
  price,
  setPrice,
  count,
  setCount,
  cartGrams,
  handleOutsideClick,
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [emptyCart, setEmptyCart] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceStored, setPriceStored] = useState({});
  const [countStored, setCountStored] = useState({});
  const [cartGramsStored, setcartGramsStored] = useState({});
  const [formattedProducts, setFormattedProducts] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/products");
        const formattedProduct = response.data;
        // console.log(formattedProduct);
        setFormattedProducts(formattedProduct);
        setIsLoading(false);
        // Do something with the fetched data
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    setCount(JSON.parse(localStorage.getItem("count")));
    setPrice(JSON.parse(localStorage.getItem("price")));
  }, [emptyCart]);

  useEffect(() => {
    //fetch cartGrams from local storage
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
      setcartGramsStored(JSON.parse(localStorage.getItem("cartGrams")));
    } catch (error) {
      setFilteredProducts([]);
    }
  }, [cartGrams, count, price, formattedProducts, emptyCart]);

  return (
    <>
      <Layout>
        {isLoading ? <Loading /> : <div></div>}
        <div className="overflow-hidden mx-auto ">
          <div className=""></div>
          <div className="bg-subtheme h-screen w-full ">
            <h1 className="font-bold relative items-center justify-center flex text-2xl pt-10 ">
              My Cart!
            </h1>

            {filteredProducts.length > 0 ? (
              <div className="lg:flex justify-between items-center">
                <div className="flex  items-center text-lg justify-center space-x-1 rounded-2xl py-3 px-3 bg-gray-200 text-center mx-10 my-5  text-gray-700 font-normal">
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
                  <span className="text-sm lg:text-sm">
                    You have {filteredProducts.length} items in your cart
                  </span>
                </div>

                <div
                  onClick={() => {
                    localStorage.clear();
                    setEmptyCart(!emptyCart);
                  }}
                  className=" m-2  mx-10 lg:block flex items-center justify-center border border-black p-2 rounded-xl hover:text-white hover:bg-theme hover:cursor-pointer"
                >
                  <div className="font-bold text-lg mr-1 lg:hidden ">
                    Empty Cart
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className=" w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center text-lg justify-center space-x-1 rounded-2xl py-3 bg-gray-200 text-center mx-10 my-5  text-gray-700 font-normal">
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
                  <span>Your Cart is Empty !</span>
                </div>
                <div>
                  <img
                    className="mx-auto w-8/12 lg:w-6/12"
                    src="/Shopping bag-amico-darkgreen.png"
                    width={"100"}
                    height={100}
                    alt="Shopping Bag"
                  />
                  <div className="flex justify-center">
                    <Link
                      href="/"
                      onClick={() => {
                        if (router.pathname !== "/") {
                          handleOutsideClick(true);
                        } else {
                          handleOutsideClick(false);
                        }
                      }}
                      className="bg-button mt-5 text-white font-semibold px-4 py-2 mr-4 rounded"
                    >
                      Shop Now!
                    </Link>
                  </div>
                </div>
              </div>
            )}
            <div className="">
              {filteredProducts.map((product) =>
                count?.[product.id] ? (
                  <div key={product.id} className="col-span-1 ">
                    <div className="flex relative p-4 lg:p-6 ">
                      <div className="w-24 h-24 overflow-hidden">
                        <img
                          className="rounded-xl object-cover h-full w-full"
                          src={product.image}
                          width={"100%"}
                          alt="Product Image"
                        />
                      </div>
                      <div className="grid grid-rows-3 ml-2">
                        <span className="text-lg font-bold">
                          {product.name}
                        </span>
                        <span className="text-lg text-gray-500 ">
                          {cartGramsStored[product.id]}
                          {product.id == 1 ? "ml" : "g"}
                        </span>
                        <span className="flex justify-between items-center">
                          <span>
                            ₹{priceStored[product.id] * countStored[product.id]}
                          </span>
                        </span>
                      </div>
                      {product.qty === 0 ? (
                        <div className="outline outline-offset-2 outline-1 rounded-md text-center p-1 text-lg">
                          Out of Stock
                        </div>
                      ) : (
                        <div className="absolute bottom-6 right-5 ">
                          <div className="flex items-center">
                            <button
                              className="p-0.5 border border-black rounded-full"
                              onClick={() => {
                                count[product.id] > 0 &&
                                  setCount((prevCounts) => {
                                    const existingCount =
                                      JSON.parse(
                                        localStorage.getItem("count")
                                      ) || {};
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
                              }}
                            >
                              <MinusSmIcon className="lg:h-5 lg:w-5 w-4 h-4  text-black" />
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
                                      JSON.parse(
                                        localStorage.getItem("count")
                                      ) || {};
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
                              <PlusSmIcon className="lg:h-5 lg:w-5 h-4 w-4 text-black" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <hr className="mx-5 border-gray-300 shadow-sm border-0.5 rounded-full"></hr>
                  </div>
                ) : (
                  <div key={product.id}></div>
                )
              )}
              {filteredProducts.length ? (
                <>
                  <div className=" fixed left-0 bottom-20 lg:bottom-0 w-full">
                    <div className="">
                      <div className="text-center mx-10">
                        <Link
                          onClick={() => {
                            if (router.pathname !== "/customerDetails") {
                              handleOutsideClick(true);
                            } else {
                              handleOutsideClick(false);
                            }
                          }}
                          href="/customerDetails"
                        >
                          <div className="bg-button text-lg text-white font-semibold px-4 py-2  rounded">
                            Checkout !
                          </div>
                        </Link>
                      </div>
                    </div>

                    <div className="m-2 mx-10">
                      <div className="text-center">
                        <Link
                          onClick={() => {
                            if (router.pathname !== "/") {
                              handleOutsideClick(true);
                            } else {
                              handleOutsideClick(false);
                            }
                          }}
                          href="/"
                        >
                          <div className="bg-theme w-full text-lg text-white font-semibold px-4 py-2  rounded">
                            Shop More !
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
