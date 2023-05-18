import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState } from "react";
import Loading from "@/components/loading";
export default function Details({
  setPhoneNumber,
  setAddress,
  setName,
  phoneNumber,
  address,
  name,
}) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      {isLoading ? <Loading /> : <div></div>}
      <Navbar page="3" setIsLoading={setIsLoading}></Navbar>
      <div className="bg-subtheme h-screen w-full mx-auto">
        <h1 className="font-bold items-center justify-center flex text-lg py-10">
          Delivery Details!
        </h1>
        <div className="space-y-5  ">
          <div className="px-5 grid grid-cols-12 items-center space-x-4">
            <div className="col-span-2">
              <h1>Name: </h1>
            </div>
            <div className="col-span-10 ">
              <input
                required
                type="text"
                placeholder={name}
                pattern="[A-Za-z]*"
                className=" px-2 py-0.5 w-10/12  text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="px-5 grid grid-cols-12 items-center space-x-4">
            <div className="col-span-2">
              <h1>Mobile: </h1>
            </div>
            <div className="col-span-10 ">
              <input
                maxLength={10}
                pattern="[0-9]*"
                inputMode="numeric"
                type="text"
                placeholder={phoneNumber}
                className=" px-2 py-0.5 w-10/12  text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="px-5  items-center ">
            <div className="">
              <h1 className="mb-3">Address: </h1>
            </div>
            <div className="">
              <textarea
                id="message"
                rows="4"
                className="block p-2.5 w-11/12 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                placeholder={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <div className="flex justify-center items-center ">
            <img
              src="https://i.postimg.cc/wM3NHV0h/image.png"
              alt=""
              width={"60%"}
            />
          </div>
          <div className="">
            <div className="text-white font-bold flex justify-center items-center">
              {phoneNumber && name && address && (
                <Link
                  onClick={() => setIsLoading(true)}
                  href="/payment"
                  className="bg-theme py-2 px-3 rounded-lg absolute"
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
    </>
  );
}
