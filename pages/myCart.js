import Navbar from "../components/Navbar";
import Link from "next/link";
import PromptMobile from "@/components/PromptMobile";
import { PrismaClient } from "@prisma/client";
import { useState } from "react";
import Loading from "@/components/loading";

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
    cofsole.log(error);
    setIsLoading(false);
  }
  return {
    props: {
      formattedProducts: [],
    },
  };
}

export default function Cart({
  bathCount,
  faceCount,
  formattedProducts,
  selectedPriceOne,
  selectedPriceTwo,
  isTN,
  setIsTN,
}) {
  var bathPrice = formattedProducts[0].qty
    ? parseFloat((bathCount * selectedPriceOne).toFixed(2))
    : 0;

  var facePrice = formattedProducts[1].qty
    ? parseFloat((faceCount * selectedPriceTwo).toFixed(2))
    : 0;
  var total = parseFloat((bathPrice + facePrice).toFixed(2));
  var discout = (total * 10) / 100;
  var shipment = total ? (isTN ? 40 : 45) : 0;
  var couponDiscout = total ? 0 : 0;
  var totalPayableAmount = parseFloat(
    (total - discout + shipment - couponDiscout).toFixed(2)
  );
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading ? <Loading /> : <div></div>}
      <PromptMobile />
      <div className="overflow-hidden mx-auto ">
        <Navbar page="2" setIsLoading={setIsLoading}></Navbar>

        <div className="bg-subtheme h-screen w-full  ">
          <h1 className="font-bold items-center justify-center flex text-lg py-10">
            My Cart!
          </h1>
          {(faceCount || bathCount) && (
            <div className="space-y-4">
              {formattedProducts[0].qty ? (
                <div className="px-5 flex">
                  <img
                    className=" rounded-xl"
                    src={formattedProducts[0].image}
                    width={"20%"}
                  ></img>
                  <div className="grid grid-rows-3 ml-2">
                    <span className="text-sm font-bold">
                      {formattedProducts[0].name}
                    </span>
                    <span className="text-sm text-gray-500 ">
                      Qnt: {bathCount}
                    </span>
                  </div>
                  <div className="absolute right-5"> ₹{bathPrice}</div>
                </div>
              ) : (
                <div></div>
              )}
              {formattedProducts[1].qty ? (
                <div className="px-5 flex">
                  <img
                    className=" rounded-xl"
                    src={formattedProducts[1].image}
                    width={"20%"}
                  ></img>
                  <div className="grid grid-rows-3 ml-2">
                    <span className="text-sm font-bold">
                      {formattedProducts[1].name}
                    </span>
                    <span className="text-sm text-gray-500 ">
                      Qnt: {faceCount}
                    </span>
                  </div>
                  <div className="absolute right-5"> ₹{facePrice}</div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          )}
          {/* <div className='text-white  text-sm font-bold justify-end flex '> 
      <button className='bg-theme py-1 px-4 rounded-lg mr-5'>
      Apply Coupon
      </button>
      </div> */}
          <div className="px-5  items-center m-5 z-50">
            <div className="text-center">
              <h1 className="mb-3">Are you located Within TamilNadu? </h1>
            </div>
            <div className="flex items-center justify-center">
              <div class="flex items-center mr-4">
                <input
                  id="Yes"
                  type="radio"
                  value=""
                  name="inline-radio-group"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onClick={() => setIsTN(true)}
                />
                <label
                  for="Yes"
                  className="ml-2 text-sm font-medium text-black"
                >
                  Yes
                </label>
              </div>
              <div className="flex items-center mr-4">
                <input
                  id="No"
                  type="radio"
                  value=""
                  name="inline-radio-group"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onClick={() => setIsTN(false)}
                />
                <label for="No" className="ml-2 text-sm font-medium text-black">
                  No
                </label>
              </div>
            </div>
          </div>

          <div className="bg-gray-300 rounded-2xl p-3 m-5 h-max bg-opacity-50">
            <div className="grid grid-rows-4 space-y-2">
              <div className=" row-span-1">
                <div className="flex justify-between items-center">
                  <h1>Total</h1>
                  <h1 className="text-gray-900">₹{total}</h1>
                </div>
              </div>
              <div className=" row-span-1 text-gray-950 flex justify-between items-center">
                <h1>Discount</h1>
                <h1 className="text-gray-500">-10%</h1>
              </div>
              <div className=" row-span-1 flex justify-between items-center">
                <h1>Shipping Charges</h1>
                <h1 className="text-gray-500">+₹{shipment}</h1>
              </div>
              {/* <div className=" row-span-1 flex justify-between items-center">
                <h1>Coupon Discount</h1>
                <h1 className="text-gray-500 ">
                  {couponDiscout ? "-₹" + couponDiscout : "-"}
                </h1>
              </div> */}
              <div className=" row-span-1 text-lg flex justify-between items-center">
                <h1>Total Payable Amount</h1>
                <h1 className="text-gray-900 ">₹{totalPayableAmount}</h1>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <div className="text-white font-bold justify-center flex absolute right-0 bottom-0 left-0 mb-10">
              {totalPayableAmount ? (
                <Link
                  href="/customerDetails"
                  className="bg-theme py-1 px-2  rounded-lg"
                  onClick={() => setIsLoading(true)}
                >
                  Checkout
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
                <Link
                  href="/"
                  className="bg-theme py-1 px-2 text-white  rounded-lg"
                >
                  Return Home
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
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
