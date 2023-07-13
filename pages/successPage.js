import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState, useEffect } from "react";
import Loading from "@/components/loading";
import Layout from "./layout/layout";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";

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

export default function SuccessPage({
  paymentId1,
  formattedProducts,
  isTN,
  setPaymentId1,
}) {
  const router = useRouter();
  const { payment_intent } = router.query;
  // console.log(payment_intent);
  const [isLoading, setIsLoading] = useState(false);
  var messageToSend;

  useEffect(() => {
    const cartGramsStored = JSON.parse(localStorage.getItem("cartGrams"));
    const countStored = JSON.parse(localStorage.getItem("count"));
    const priceStored = JSON.parse(localStorage.getItem("price"));

    var address = localStorage.getItem("address");
    var mobile = localStorage.getItem("phoneNumber");
    var name = localStorage.getItem("name");

    const countKey = Object.keys(countStored).filter(
      (key) => countStored[key] > 0
    );
    const filtercartGrams = formattedProducts.filter((cart) =>
      countKey.includes(String(cart.id))
    );

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

      var messageToBeSent =
        `Hey! New Order from ${name}` +
        `\nThe Order List : \n ` +
        `${
          formattedProducts[0].qty > countStored?.[1]
            ? `\n${formattedProducts[0].name}:  ${countStored?.[1] || 0} -  ${
                cartGramsStored?.[1] || 0
              }ml\n`
            : ``
        }` +
        `${
          formattedProducts[1].qty > countStored?.[2]
            ? `\n${formattedProducts[1].name}:  ${countStored?.[2] || 0}\n -  ${
                cartGramsStored?.[2] || 0
              }g\n`
            : ``
        } ` +
        "\nThe Address You have to deliver is \n" +
        address +
        ` \n \nPayment Done : ₹ ${totalPayableAmount} \n \n Customer Mobile Number ${mobile}`;

      const orderData = {
        name: name,
        mobile: mobile,
        price: totalPayableAmount,
        address: address,
        paymentId: paymentId1 ? paymentId1 : payment_intent,
        products:
          `${
            formattedProducts[0].qty > countStored?.[1]
              ? `\n${formattedProducts[0].name}:  ${countStored?.[1] || 0}\n`
              : ``
          }` +
          `${
            formattedProducts[1].qty > countStored?.[2]
              ? `\n${formattedProducts[1].name}:  ${countStored?.[2] || 0}\n`
              : ``
          } `,
      };
      // console.log(orderData, messageToBeSent);

      messageToSend = messageToBeSent;
      insertOrder(orderData);
    }
  }, []);

  const sendOrderMessage = async (message) => {
    // console.log(message);
    try {
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

  const insertOrder = async (orderData) => {
    try {
      const countStored = JSON.parse(localStorage.getItem("count"));

      var stockOne =
        formattedProducts[0].qty - (countStored?.[1] ? countStored[1] : 0);

      var stockTwo =
        formattedProducts[1].qty - (countStored?.[2] ? countStored[2] : 0);

      // Send a POST request to the createOrder endpoint
      const response = await fetch("/api/insertOrder", {
        method: "POST",
        body: JSON.stringify(orderData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Handle the response
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        const { data } = await axios.post("/api/products", {
          stockOne,
          stockTwo,
        });
        // console.log(messageToSend);
        sendOrderMessage(messageToSend);
      } else {
        console.error(response.statusText);
      }
    } catch (error) {
      console.log(message);

      console.error(error);
    }
  };

  return (
    <>
      <Layout>
        {isLoading ? <Loading /> : <div></div>}

        <div className="lg:relative ">
          <div className="overflow-hidden mobile-view ">
            <Navbar page="5" setIsLoading={setIsLoading}></Navbar>

            <div className="lg:flex lg:justify-center lg:mt-10 lg:py-10">
              <div className="bg-subtheme lg:bg-white lg:max-w-md lg:w-1/2  lg:pb-10 rounded-xl">
                <div className="  pt-20 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#3B8C3A"
                    className="mx-auto w-6/12 animate-bounce "
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="text-center">
                    <h1 className="font-bold ">Whoo! Order Placed </h1>
                    <br />
                    <h1 className="font-bold italic text-lg">Thank you for </h1>
                    <h1 className="font-bold italic mb-3 text-lg">
                      Shopping With us{" "}
                    </h1>
                    <h1 className="font-bold">
                      Your PaymentID is :
                      <span className="text-green-500">
                        {" "}
                        {paymentId1 ? paymentId1 : payment_intent}{" "}
                      </span>
                    </h1>
                  </div>
                  <div className="flex items-center justify-center mt-10">
                    <Link
                      onClick={() => setIsLoading(true)}
                      href="/"
                      className="bg-button  py-2 px-5 text-white  rounded-lg"
                    >
                      Contine Shopping
                    </Link>
                  </div>
                  <div className="text-lg mt-10 text-center font-bold m-3">
                    You should take a screenshot of the payment ID for reference
                    in case of order cancellation.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
