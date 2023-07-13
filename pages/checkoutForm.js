import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
import React from "react";
import { PrismaClient } from "@prisma/client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import Loading from "@/components/loading";
import Layout from "./layout/layout";
import Navbar from "@/components/Navbar";

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

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function CheckoutForm({ clientSecret, totalAmount }) {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          console.error("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/successPage",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage(error.type);
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <Layout>
      <div className="lg:relative  z-0">
        {isLoading ? <Loading /> : <div></div>}
        <Navbar page="8" setIsLoading={setIsLoading}></Navbar>
        <div className="flex  z-0 relative mt-10 mb-10 items-center justify-center">
          <div className="bg-white rounded-lg lg:p-10 md:p-10 p-5">
            <form id="payment-form" onSubmit={handleSubmit}>
              <LinkAuthenticationElement
                id="link-authentication-element"
                onChange={(e) => {
                  setEmail(e.value.email);
                }}
              />

              <PaymentElement
                id="payment-element"
                options={paymentElementOptions}
              />
              <div className="flex justify-center ">
                <button
                  id="submit"
                  className="flex items-center justify-center border  px-20  border-black hover:bg-button mt-5 rounded-lg hover:text-white"
                >
                  <div
                    disabled={isLoading || !stripe || !elements}
                    id="submit"
                    className=""
                  >
                    <div className="text-center p-3">
                      {isLoading ? (
                        <div className="spinner" id="spinner"></div>
                      ) : (
                        <div className="">{"Pay now ₹" + totalAmount}</div>
                      )}
                    </div>
                  </div>
                </button>
                {/* Show any error or success messages */}
              </div>
                {message && <div id="ayment-message" className="mx-auto text-center mt-3 text-red-500">{message}</div>}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function CheckoutPage({ formattedProducts, isTN }) {
  //to calc price
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipment, setShipment] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [totalPayableAmount, setTotalPayableAmount] = useState(0);
  const [countStored, setCountStored] = useState({});
  const [priceStored, setPriceStored] = useState({});
  const [cartGramsStored, setcartGramsStored] = useState({});
  const [filtercartGrams, setFiltercartGrams] = useState({});

  useEffect(() => {
    const cartGramsStored = JSON.parse(localStorage.getItem("cartGrams"));
    const countStored = JSON.parse(localStorage.getItem("count"));
    const priceStored = JSON.parse(localStorage.getItem("price"));

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

  //   useEffect(() => {
  //     if (filtercartGrams && priceStored && countStored) {
  //       let total = 0;

  //       Object.keys(filtercartGrams).forEach((key) => {
  //         const cartItem = filtercartGrams[key];
  //         const count = countStored[cartItem.id];
  //         const price = priceStored[cartItem.id];
  //         const itemTotal = price * count;
  //         total += itemTotal;
  //       });

  //       const discount = ((total * 10) / 100) * 0;
  //       const shipment = total ? (isTN ? 40 : 45) : 0;
  //       const couponDiscount = total ? 0 : 0;
  //       const totalPayableAmount = parseFloat(
  //         (total - discount + shipment - couponDiscount).toFixed(2)
  //       );

  //       setTotal(total);
  //       setDiscount(discount);
  //       setShipment(shipment);
  //       setCouponDiscount(couponDiscount);
  //       setTotalPayableAmount(totalPayableAmount);
  //     }
  //   }, [filtercartGrams, priceStored, countStored, isTN]);

  const [clientSecret, setClientSecret] = useState("");

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

      // Create PaymentIntent when totalPayableAmount is updated
      if (totalPayableAmount > 0) {
        fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: [{ id: "TotalPay", amount: totalPayableAmount }],
          }),
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret));
      }
    }
  }, [filtercartGrams, priceStored, countStored, isTN]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    appearance,
    clientSecret,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            clientSecret={clientSecret}
            formattedProducts={formattedProducts}
            totalAmount={totalPayableAmount}
          />
        </Elements>
      )}
    </div>
  );
}

export default CheckoutPage;
