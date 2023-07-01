import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState } from "react";
import Loading from "@/components/loading";
import Layout from "./layout/layout";

export default function SuccessPage({ paymentId1 }) {
  const [isLoading, setIsLoading] = useState(false);
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
                      clip-rule="evenodd"
                    />
                  </svg>
                  <div className="text-center">
                    <h1 className="font-bold ">Whoo! Order Placed </h1>
                    <br />
                    <h1 className="font-bold italic text-sm">Thank you for </h1>
                    <h1 className="font-bold italic mb-3 text-sm">
                      Shopping With us{" "}
                    </h1>
                    <h1 className="font-bold">
                      Your PaymentID is :
                      <span className="text-green-500"> {paymentId1} </span>
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
                  <div className="text-xs mt-10 text-center font-bold m-3">
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
