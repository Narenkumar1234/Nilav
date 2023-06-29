import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState } from "react";
import Loading from "@/components/loading";
import Layout from "./layout/layout";
import feedBack from "./feedback.json";

export default function SuccessPage({}) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Layout>
        {isLoading ? <Loading /> : <div></div>}
        <div
          id="my-element"
          className=" lg:h-screen md:h-screen lg:p-10 md:p-10"
        >
          <div className="lg:relative  bg-subtheme w-full  mobile-view ">
            <div className="overflow-hidden mobile-view ">
              <Navbar page="9" setIsLoading={setIsLoading}></Navbar>
              <h1 className="font-bold items-center justify-center flex text-lg pt-10 ">
                Testimonials!
              </h1>
              {feedBack.feedback.map((feedback,index) => (
                <div key={index} className="flex flex-col items-center justify-center mx-10 py-8">
                  <div className="max-w-xl mx-auto">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                      <div className="px-6 py-4">
                        <div className="flex items-center justify-between">
                          <div className="">
                            <h3 className="text-lg font-bold text-gray-900">
                              {feedback.name}
                            </h3>
                            <span className="text-gray-600 text-sm">
                              IT employee
                            </span>
                          </div>
                          <div className="flex-shrink-0">
                            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-lg">
                              Trusted Buyer
                            </span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-gray-800 text-sm">
                            "{feedback.feedback}"
                          </p>
                        </div>
                      </div>
                      <div className="px-6 py-2 bg-gray-100">
                        <span className="text-xs leading-none text-gray-600">
                          June 25, 2023
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
