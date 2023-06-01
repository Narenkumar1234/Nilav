import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState } from "react";
import Loading from "@/components/loading";
import ReactSwitch from "react-switch";
import Layout from "./layout/layout";
export default function Details({
  setPhoneNumber,
  setAddress,
  setName,
  phoneNumber,
  address,
  name,
  isTN,
  setIsTN,
}) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Layout>
        <div id="my-element" className="  lg:p-10 md:p-10">
          <div className="lg:relative  bg-subtheme mobile-view ">
            {isLoading ? <Loading /> : <div></div>}
            <Navbar page="3" setIsLoading={setIsLoading}></Navbar>
            <div className="bg-subtheme h-screen w-full mx-auto">
              <h1 className="font-bold items-center justify-center flex text-lg py-10">
                Delivery Details!
              </h1>
              <div className="space-y-5  mx-5">
                <div className="px-5l space-y-2">
                  <div className="text-sm font-normal">
                    <p>Name: </p>
                  </div>
                  <div className="text-sm">
                    <input
                      required
                      type="text"
                      placeholder={name}
                      pattern="[A-Za-z]*"
                      className=" px-2 py-2 w-full  text-gray-900 border border-gray-300 rounded-sm bg-gray-50 "
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2  ">
                  <div className="text-sm font-normal">
                    <h1>Mobile: </h1>
                  </div>
                  <div className="text-sm ">
                    <input
                      maxLength={10}
                      pattern="[0-9]*"
                      inputMode="numeric"
                      type="text"
                      placeholder={phoneNumber}
                      className=" px-2 py-2 w-full  text-gray-900 border border-gray-300 rounded-sm bg-gray-50 "
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className=" space-y-2">
                  <div className="text-sm font-normal">
                    <h1 className="mb-3">Address: </h1>
                  </div>
                  <div className="">
                    <textarea
                      id="message"
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                      placeholder={address}
                      onChange={(e) => setAddress(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="flex items-center m-5 z-50">
                <div className="">
                  <h1 className="mb-3 text-sm">
                    Are you located Within TamilNadu?{" "}
                  </h1>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center mr-4">
                    <ReactSwitch
                      id="locationSwitch"
                      onChange={(checked) => setIsTN(checked)}
                      checked={isTN}
                      onColor="#4B5563"
                      offColor="#D1D5DB"
                      className="react-switch"
                      height={24}
                      width={48}
                      handleDiameter={20}
                    />
                    <label
                      htmlFor="locationSwitch"
                      className="ml-2 text-sm font-medium text-black"
                    >
                      {isTN ? "Yes" : "No"}
                    </label>
                  </div>
                </div>
              </div>
              <div className="fixed lg:absolute bottom-0 left-0 w-full  py-4 ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-center items-ceter">
                    {phoneNumber && name && address && (
                      <Link
                        onClick={() => setIsLoading(true)}
                        href="/payment"
                        className="bg-button text-white font-semibold px-4 py-2 mr-4 rounded"
                      >
                        Proceed to Payment
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
        </div>
      </Layout>
    </>
  );
}
