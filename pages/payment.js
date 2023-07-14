import Navbar from "@/components/Navbar";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import Loading from "@/components/loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Layout from "./layout/layout";

export async function getServerSideProps() {
  try {
    const prisma = new PrismaClient();

    const products = await prisma.products.findMany({
      orderBy: { id: "asc" },
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
    console.error(error);
    return {
      props: {
        formattedProducts: [],
      },
    };
  }
}
export default function Payment({ formattedProducts, isTN, setPaymentId1 }) {
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipment, setShipment] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [totalPayableAmount, setTotalPayableAmount] = useState(0);
  const [countStored, setCountStored] = useState({});
  const [priceStored, setPriceStored] = useState({});
  const [cartGramsStored, setcartGramsStored] = useState({});
  const [filtercartGrams, setFiltercartGrams] = useState({});
  var paymentId;
  useEffect(() => {
    const cartGramsStored = JSON.parse(localStorage.getItem("cartGrams"));
    const countStored = JSON.parse(localStorage.getItem("count"));
    const priceStored = JSON.parse(localStorage.getItem("price"));
    // console.log(countStored?.[1]);

    setcartGramsStored(cartGramsStored);
    setCountStored(countStored);
    setPriceStored(priceStored);

    const countKey = Object.keys(countStored).filter(
      (key) => countStored[key] > 0
    );
    const filtercartGrams = formattedProducts.filter((cart) =>
      countKey.includes(String(cart.id))
    );
    setFiltercartGrams(filtercartGrams);
  }, []);

  useEffect(() => {
    if (filtercartGrams && priceStored && countStored) {
      let total = 0;

      Object.keys(filtercartGrams).forEach((key) => {
        const cartItem = filtercartGrams[key];
        const count = countStored[cartItem.id];
        const price = priceStored[cartItem.id];
        const itemTotal = price * count;
        total += itemTotal;
      });

      const discount = ((total * 10) / 100) * 0;
      const shipment = total ? (isTN ? 40 : 45) : 0;
      const couponDiscount = total ? 0 : 0;
      const totalPayableAmount = parseFloat(
        (total - discount + shipment - couponDiscount).toFixed(2)
      );

      setTotal(total);
      setDiscount(discount);
      setShipment(shipment);
      setCouponDiscount(couponDiscount);
      setTotalPayableAmount(totalPayableAmount);
    }
  }, [filtercartGrams, priceStored, countStored, isTN]);

  const { push } = useRouter();

  // Razor Pay Initialize
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  // Trigger Razorpay on click payment
  const makePayment = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    const { data } = await axios.post("/api/razorpay", { totalPayableAmount });
    var options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: "Narumugai Herbals",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thanks for shopping with us",
      theme: "#000000",
      handler: function (response) {
        // Validate payment at server - using webhooks is a better idea.
        if (
          response.razorpay_payment_id &&
          response.razorpay_order_id &&
          response.razorpay_signature
        ) {
          paymentId = response.razorpay_payment_id;
          setPaymentId1(response.razorpay_payment_id);
          // console.log(paymentId);
          // sendOrderMessage();
          push("/successPage");
        } else {
          push("/paymentFailed");
        }
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Layout>
        {isLoading ? <Loading /> : <div></div>}

        <div className="overflow-hidden">
          <Navbar page="4" setIsLoading={setIsLoading} />

          <div className="lg:flex lg:justify-center lg:mt-10 lg:py-10">
            <div className="bg-subtheme lg:bg-white lg:max-w-md lg:w-1/2 lg:py-4 rounded-xl">
              <div className=" w-full">
                <h1 className="font-bold items-center justify-center flex text-2xl py-10">
                  Payment!
                </h1>

                <div className="p-3 flex items-center text-lg justify-center space-x-1 rounded-2xl py-3 bg-gray-200 text-center mx-10 my-5 text-gray-700 font-normal">
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
                    Your order will be delivered within 2 days of dispatching
                  </span>
                </div>

                <div className="bg-gray-300 rounded-sm p-3 m-5 bg-opacity-50">
                  <div className="grid grid-rows-3 space-y-2">
                    <div className="row-span-1">
                      <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-medium">Total</h1>
                        <h1 className="text-gray-900 text-2xl">₹{total}</h1>
                      </div>
                    </div>
                    {/* <div className="row-span-1 text-gray-950 flex justify-between items-center">
                    <h1>Discount</h1>
                    <h1 className="text-gray-500">-10%</h1>
                  </div> */}
                    <div className="row-span-1 flex justify-between items-center">
                      <h1 className="text-2xl">Shipping Charges</h1>
                      <h1 className="text-gray-500 text-2xl">+₹{shipment}</h1>
                    </div>
                    {/* <div className="row-span-1 flex justify-between items-center">
                    <h1>Coupon Discount</h1>
                    <h1 className="text-gray-500">
                      {couponDiscout ? "-₹" + couponDiscout : "-"}
                    </h1>
                  </div> */}
                    <div className="row-span-1 flex justify-between items-center">
                      <h1 className="text-2xl">Total Payable Amount</h1>
                      <h1 className="text-gray-900 text-2xl">
                        ₹{totalPayableAmount}
                      </h1>
                    </div>
                  </div>
                </div>

                <div className="justify-center flex items-center mt-10">
                  {totalPayableAmount ? (
                    <div className="space-y-5 ">
                      <button
                        onClick={makePayment}
                        className="z-10 w-72 text-white bg-theme py-3 px-5 rounded-lg hover:bg-opacity-80 transition-all"
                      >
                        Pay with BHIM/UPI ID
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
                      </button>
                      <br></br>
                      <Link href="/checkoutForm">
                        <button className="z-10 w-72 mt-4 text-white bg-theme py-3 px-5 rounded-lg hover:bg-opacity-80 transition-all">
                          Pay with Card
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
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <Link
                      href="/"
                      className="bg-theme py-1 px-2 text-white rounded-lg hover:bg-opacity-80 transition-all"
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
        </div>
      </Layout>
    </>
  );
}
