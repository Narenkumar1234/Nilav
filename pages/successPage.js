import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState } from "react";
import Loading from "@/components/loading";

export default function SuccessPage({ setFaceCount, setBathCount }) {
  setFaceCount(1);
  setBathCount(1);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      {isLoading ? <Loading /> : <div></div>}

      <div className="overflow-hidden ">
        <Navbar page="5" setIsLoading={setIsLoading}></Navbar>
        <div className="bg-subtheme h-screen pt-20 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#539032"
            className="mx-auto w-6/12 animate-bounce"
          >
            <path
              fill-rule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clip-rule="evenodd"
            />
          </svg>
          <div className="text-center">
            <h1 className="font-bold ">Whoo! Order Placed </h1>
            <br />
            <h1 className="font-bold ">Thank you for </h1>
            <h1 className="font-bold ">Shopping With us </h1>
          </div>
          <div className="flex items-center justify-center mt-10">
            <Link
              onClick={()=>setIsLoading(true)}
              href="/"
              className="bg-theme  py-2 px-5 text-white  rounded-lg"
            >
              Contine Shopping
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
    </>
  );
}
