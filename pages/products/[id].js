import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import { PlusSmIcon, MinusSmIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Loading from "@/components/loading";
import HTMLReactParser from "html-react-parser";
import Layout from "../layout/layout";

export async function getServerSideProps(context) {
  try {
    const id = context.query.id;
    const prisma = new PrismaClient();
    const product = await prisma.products.findFirst({
      where: { id: parseInt(id) },
    });

    const productOnePrice = await prisma.price.findMany({
      where: {
        id: parseInt(id),
      },
      orderBy: {
        qtyPerGram: "asc",
      },
    });
    await prisma.$disconnect();

    const formattedProduct = {
      ...product,
      createdAt: product.createdAt.toISOString(),
    };
    return {
      props: {
        formattedProduct,
        productOnePrice,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        formattedProduct: [],
      },
    };
  }
}

export default function Products({
  formattedProduct,
  count,
  setCount,
  productOnePrice: productOnePriceList,
  setCartItems,
  cartItems,
  price,
  setPrice,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [qty, setQty] = useState("");
  const [addOrGo, setAddOrGo] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  var id1 = 0;
  var [maxHeight, setMaxHeight] = useState(0);


  useEffect(() => {
    const buttonElement = document.getElementById("button");
    const priceContent = document.getElementById("priceContent");
    const quantityContent = document.getElementById("quantityContent");
    const imageContent = document.getElementById("imageContent");
    const navContent = document.getElementById("navContent");
    const viewportHeight = window.innerHeight;

    if (buttonElement && priceContent && quantityContent && imageContent) {
      const buttonHeight = buttonElement.offsetHeight;
      const topContentHeight =
        navContent.offsetHeight +
        priceContent.offsetHeight +
        quantityContent.offsetHeight +
        imageContent.offsetHeight;

      setMaxHeight(viewportHeight - (buttonHeight + topContentHeight));
    }
  }, []);

  function splitPara(paragraph) {
    return paragraph
      .split("\n")
      .map((val) => val.trim())
      .filter((val) => val.length > 0);
  }

  function handleAddToCart() {
    setAddOrGo(false);
    !addOrGo && setIsLoading(true);
    setCartItems((prevItems) => {
      //set the product quantity per gram

      return {
        ...prevItems,
        [formattedProduct.id]: qty ? qty : productOnePriceList[0].qtyPerGram,
      };
    });

    (count[formattedProduct.id] === undefined ||
      count[formattedProduct.id] == 0) &&
      setCount((prevCount) => {
        return {
          ...prevCount,
          [formattedProduct.id]: 1, // Set the count for the specific product ID
        };
      });

    (price[formattedProduct.id] === undefined ||
      price[formattedProduct.id] == 0) &&
      setPrice((prevCount) => {
        return {
          ...prevCount,
          [formattedProduct.id]: productOnePriceList[0].price, // Set the count for the specific product ID
        };
      });

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("price", JSON.stringify(price));
    localStorage.setItem("count", JSON.stringify(count));
  }
  function handleBuyNow() {
    setIsLoading(true);
    setCartItems((prevItems) => {
      //set the product quantity per gram
      const updatedCartItems = {
        [formattedProduct.id]: qty ? qty : productOnePriceList[0].qtyPerGram,
      };
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return updatedCartItems; // return the updated value
    });

    count[formattedProduct.id] === undefined || count[formattedProduct.id] == 0
      ? setCount((prevCount) => {
          const updatedCount = {
            [formattedProduct.id]: 1, // Set the count for the specific product ID
          };
          localStorage.setItem("count", JSON.stringify(updatedCount));
          return updatedCount;
        })
      : setCount((prevCount) => {
          const updatedCount = {
            [formattedProduct.id]: count[formattedProduct.id], // Set the count for the specific product ID
          };
          localStorage.setItem("count", JSON.stringify(updatedCount));
          return updatedCount;
        });

    price[formattedProduct.id] === undefined || price[formattedProduct.id] == 0
      ? setPrice((prevCount) => {
          const updatedPrice = {
            [formattedProduct.id]: productOnePriceList[0].price, // Set the count for the specific product ID
          };
          localStorage.setItem("price", JSON.stringify(updatedPrice));
          return updatedPrice;
        })
      : setPrice((prevCount) => {
          const updatedPrice = {
            [formattedProduct.id]: price[formattedProduct.id], // Set the count for the specific product ID
          };
          localStorage.setItem("price", JSON.stringify(updatedPrice));
          return updatedPrice;
        });
  }
  return (
    <>
      <Layout>
        {isLoading ? <Loading /> : <div></div>}

        {/* top content with nav bar  */}

        <div
          id="my-element"
          className="lg:h-screen md:h-screen lg:p-10 md:p-10"
        >
          <div className="bg-subtheme w-full mobile-view ">
            <div id="navContent">
              <Navbar page="5" setIsLoading={setIsLoading} />
            </div>

            <div className="bg-subtheme ">
              <div className="overflowHidden">
                <container className="">
                  <div
                    id="imageContent"
                    className="product-page-image-div p-5 py-5 "
                  >
                    <img
                      className="w-11/12 h-full mx-auto object-cover rounded-2xl"
                      src={formattedProduct.image}
                      alt="productImg"
                      width={"100%"}
                    />
                  </div>
                </container>
                <container className="">
                  <div
                    id="priceContent"
                    className="px-10 flex items-center font-bold justify-between"
                  >
                    <h1>{formattedProduct.name}</h1>
                    <h1>
                      ₹
                      {price[formattedProduct.id]
                        ? +price[formattedProduct.id]
                        : +productOnePriceList[0].price}
                    </h1>
                  </div>
                  <div
                    id="quantityContent"
                    className="px-10 flex items-center justify-between py-5"
                  >
                    <div className="flex items-center align-middle ">
                      <h1 className="pr-4">Qty: </h1>
                      <select
                        defaultValue={price[formattedProduct.id]}
                        onChange={(e) => {
                          const selectedOption =
                            e.target.options[e.target.selectedIndex];
                          setQty(
                            selectedOption.getAttribute("data-qty-per-gram")
                          );
                          setPrice((prevPrice) => ({
                            ...prevPrice,
                            [formattedProduct.id]: e.target.value,
                          }));
                        }}
                        className=" bg-gray-50 border border-gray-300 text-gray-400  text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-max p-1.5"
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
                            {productOnePriceList[key].qtyPerGram}
                            {id == 1 ? "ml" : "g"}
                          </option>
                        ))}
                      </select>
                    </div>
                    {formattedProduct.qty === 0 ? (
                      <div className="outline outline-offset-2 outline-1 rounded-md text-center p-1 text-xs">
                        Out of Stock
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center">
                          <button
                            className="p-0.5 border border-green-800 rounded-full"
                            onClick={() => {
                              count[formattedProduct.id] > 1 &&
                                setCount((prevCounts) => ({
                                  ...prevCounts,
                                  [formattedProduct.id]:
                                    (count[formattedProduct.id] || 1) - 1,
                                }));
                            }}
                          >
                            <MinusSmIcon className="h-5 w-5 text-black" />
                          </button>
                          <span className="mx-2">
                            {count[formattedProduct.id] || 1}
                          </span>
                          <button
                            className="p-0.5 border  border-green-800 rounded-full"
                            onClick={() => {
                              setCount((prevCounts) => ({
                                ...prevCounts,
                                [formattedProduct.id]:
                                  (count[formattedProduct.id] || 1) + 1,
                              }));
                            }}
                          >
                            <PlusSmIcon className="h-5 w-5 text-black" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* scrolabble content */}
                  <div
                    style={{ maxHeight: `${maxHeight}px` }}
                    className="px-10 space-y-2 pb-6 overflow-y-auto"
                  >
                    {formattedProduct.description ? (
                      <div className="text-gray-700">
                        <h1>Product Description:</h1>
                        <p className="text-gray-400 text-sm">
                          {formattedProduct.description}
                        </p>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    {formattedProduct.instruction ? (
                      <div className="text-gray-700">
                        <h1>Direction of Use:</h1>
                        <div id="steps" className="text-gray-400 text-sm ">
                          {splitPara(formattedProduct.instruction).map(
                            (key, index) => (
                              <div className="my-2" key={index}>
                                {HTMLReactParser(key)}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    {formattedProduct.storage ? (
                      <div className="text-gray-700">
                        <h1>Storage:</h1>
                        <p className="text-gray-400 text-sm">
                          {formattedProduct.storage}
                        </p>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    {formattedProduct.benefits ? (
                      <div className="text-gray-700">
                        <h1>Benefits:</h1>
                        <div className="text-gray-400 text-sm">
                          {splitPara(formattedProduct.benefits).map(
                            (key, index) => (
                              <li className="my-2" key={index}>
                                {key}
                              </li>
                            )
                          )}
                        </div>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    {formattedProduct.specialNote ? (
                      <div className="text-gray-700">
                        <h1>Special Note:</h1>
                        <i className="text-gray-400 text-sm">
                          {formattedProduct.specialNote}
                        </i>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </container>
              </div>
              {/* Add to cart and buy now content */}
              {count[formattedProduct.id] || 1 ? (
                <div
                  id="button"
                  className={`bottom-0 ${
                    formattedProduct.qty ? "visible" : "invisible"
                  }   bg-subtheme py-4 inset-x-0 flex justify-center `}
                >
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
                    <div className="flex justify-end">
                      <Link
                        href={"/myCart"}
                        onClick={handleBuyNow}
                        className="bg-black text-white font-semibold px-4 py-2 mr-4 rounded"
                      >
                        Buy Now
                      </Link>
                      <Link
                        href={addOrGo ? `/products/${id}` : "/myCart"}
                        onClick={handleAddToCart}
                        className="bg-button text-white font-semibold px-4 py-2 rounded"
                      >
                        {addOrGo ? "Add to Cart" : "Go to Cart !"}
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
      </Layout>
    </>
  );
}
