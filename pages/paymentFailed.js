import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState } from "react";
import Loading from "@/components/loading";
import Layout from "./layout/layout";

export default function PaymentFailed() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Layout>
        <div className="lg:relative   ">
          {isLoading ? <Loading /> : <div></div>}

          <div className="overflow-hidden">
            <Navbar page="4" setIsLoading={setIsLoading}></Navbar>
            <div className="lg:flex lg:justify-center lg:mt-10 lg:py-10">
              <div className="bg-subtheme lg:bg-white lg:max-w-md lg:w-1/2  lg:pb-10 rounded-xl">
                <div className=" pt-10 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="black"
                    className="mx-auto w-6/12"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <div className="text-center">
                    <h1 className="font-bold ">Sorry! Seems there is a </h1>
                    <h1 className="font-bold ">
                      problem in your payment method
                    </h1>
                  </div>
                  <div className="flex items-center justify-center mt-10">
                    <Link
                      href="/payment"
                      className="bg-theme  py-2 px-5 text-white  rounded-lg"
                    >
                      Try Again
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
