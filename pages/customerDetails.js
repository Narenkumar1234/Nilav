import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState, useEffect } from "react";
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
  useEffect(() => {
    localStorage.setItem("phoneNumber", phoneNumber);
    localStorage.setItem("address", address);
    localStorage.setItem("name", name);
  }, [phoneNumber, name, address]);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Layout>
        <div className="lg:relative">
          {isLoading ? <Loading /> : <div></div>}
          <Navbar page="3" setIsLoading={setIsLoading}></Navbar>
          <div className="bg-subtheme w-full mx-auto ">
            <div className="lg:flex lg:justify-center lg:mt-10 lg:  py-10">
              <div className="bg-subtheme lg:bg-white lg:max-w-md lg:w-1/2 lg:py-4 rounded-xl">
                <h1 className="font-bold text-2xl py-10 text-center">
                  Delivery Details!
                </h1>
                <div className="space-y-5 mx-5 ">
                  <div className=" space-y-2 ">
                    <div className="text-lg font-normal">
                      <p>Name: </p>
                    </div>
                    <div className="text-lg">
                      <input
                        required
                        type="text"
                        placeholder={name}
                        pattern="[A-Za-z]*"
                        className="px-2 py-2 w-full text-gray-900 border border-gray-300 rounded-sm bg-gray-50"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-lg font-normal">
                      <h1>Mobile: </h1>
                    </div>
                    <div className="text-lg">
                      <input
                        maxLength={10}
                        pattern="[0-9]*"
                        inputMode="numeric"
                        type="text"
                        placeholder={phoneNumber}
                        className="px-2 py-2 w-full text-gray-900 border border-gray-300 rounded-sm bg-gray-50"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-lg font-normal">
                      <h1 className="mb-3">Address: </h1>
                    </div>
                    <div className="">
                      <textarea
                        id="message"
                        rows="4"
                        className="block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder={address}
                        onChange={(e) => setAddress(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="my-10 flex items-center justify-between  mx-5 ">
                  <div className="">
                    <h1 className="text-lg ">
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
                        className="ml-2 text-lg font-medium text-black"
                      >
                        {isTN ? "Yes" : "No"}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mb-4 text-center  ">
                  {phoneNumber && name && address && (
                    <Link
                      onClick={() => setIsLoading(true)}
                      href="/payment"
                      className="bg-button text-white  font-semibold px-4 py-2 rounded"
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
      </Layout>
    </>
  );
}
