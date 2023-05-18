import Navbar from "@/components/Navbar";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import Loading from "@/components/loading";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
export default function Payment({
  bathCount,
  faceCount,
  phoneNumber,
  address,
  name,
  formattedProducts,
  selectedPriceOne,
  selectedPriceTwo,
}) {
  var bathPrice = formattedProducts[1].qty
    ? parseFloat((bathCount * selectedPriceOne).toFixed(2))
    : 0;
  var facePrice = formattedProducts[0].qty
    ? parseFloat((faceCount * selectedPriceTwo).toFixed(2))
    : 0;
  var total = parseFloat((bathPrice + facePrice).toFixed(2));
  var discout = (total * 10) / 100;
  var shipment = total ? 40 : 0;
  var couponDiscout = total ? 10 : 0;
  var totalPayableAmount = parseFloat(
    (total - discout + shipment - couponDiscout).toFixed(2)
  );
  const { push } = useRouter();

  var message =
    `Hey! New Order from ${name}` +
    `\nThe Order List : \n ` +
    `${
      formattedProducts[0].qty > bathCount
        ? `\n${formattedProducts[0].name}:  ${bathCount}\n`
        : ``
    }` +
    `${
      formattedProducts[1].qty > faceCount
        ? `\n${formattedProducts[1].name}:  ${faceCount}\n`
        : ``
    } ` +
    "\nThe Address You have to deliver is \n" +
    address +
    ` \n \nPayment Done : ₹ ${totalPayableAmount} \n \n Customer Mobile Number ${phoneNumber}`;

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
    const {data} = await axios.post("/api/razorpay",  {totalPayableAmount});
    console.log(data);
    var options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: "KanthamaNilav",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thankyou for your test donation",
      theme: "#539032",
      handler: function (response) {
        // Validate payment at server - using webhooks is a better idea.
        if(response.razorpay_payment_id &&
          response.razorpay_order_id &&
          response.razorpay_signature){
          sendOrderMessage();
          push("/successPage");
        }
        else{
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

  const sendOrderMessage  = async () => {
    try {
      var stockOne =
        formattedProducts[0].qty - bathCount <= 0
          ? 0
          : formattedProducts[0].qty - bathCount;

      var stockTwo =
        formattedProducts[1].qty - faceCount <= 0
          ? 0
          : formattedProducts[1].qty - faceCount;
      const { data } = await axios.post("/api/qty", {
        stockOne,
        stockTwo,
      });

      const response = await fetch("/api/whatsapp1", {
        method: "POST",
        body: JSON.stringify({ message }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        console.error(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading ? <Loading /> : <div></div>}

      <div className="overflow-hidden">
        <Navbar page="4" setIsLoading={setIsLoading}></Navbar>

        <div className="bg-subtheme h-screen w-full ">
          <h1 className="font-bold items-center justify-center flex text-lg py-10">
            Payment!
          </h1>

          <div className="bg-gray-300 rounded-2xl p-3 m-5  bg-opacity-50">
            <div className="grid grid-rows-5 space-y-2">
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
              <div className=" row-span-1 flex justify-between items-center">
                <h1>Coupon Discount</h1>
                <h1 className="text-gray-500 ">
                  {couponDiscout ? "-₹" + couponDiscout : "-"}
                </h1>
              </div>
              <div className=" row-span-1 text-lg flex justify-between items-center">
                <h1>Total Payable Amount</h1>
                <h1 className="text-gray-900 ">₹{totalPayableAmount}</h1>
              </div>
            </div>
          </div>
          <div className="justify-center flex items-center  mt-10">
            {totalPayableAmount ? (
              <button
                onClick={makePayment}
                className="z-10 text-white bg-theme py-3 px-5 rounded-lg"
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
            ) : (
              <Link href="/" className="bg-theme py-1 px-2 text-white rounded-lg">
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
          <div className="justify-center items-center flex">
            <img
              src="https://i.postimg.cc/Pr5ddQ0R/image.png"
              className="z-0 absolute bottom-0"
              width={"60%"}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
