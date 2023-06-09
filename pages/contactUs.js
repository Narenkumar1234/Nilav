import Navbar from "@/components/Navbar";
import Loading from "@/components/loading";
import { useState } from "react";
import Layout from "./layout/layout";

export default function ContactDetails() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Layout>
        <div className="lg:relative  z-0">
          {isLoading ? <Loading /> : <div></div>}
          <Navbar page="8" setIsLoading={setIsLoading}></Navbar>
          <div className="flex  z-0 relative mt-10 mb-10 items-center justify-center">
            <div className="bg-white rounded-lg lg:p-10 md:p-10 p-5">
              <h1 className="text-center font-bold">Contact Us</h1>

              <div className="my-6 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>

              <p className="font-semibold">Email:</p>
              <a
                href="mailto:narumugaiherbals2023@gmail.com"
                className="text-blue-500"
              >
                narumugaiherbals2023@gmail.com
              </a>

              <div className="my-6">
                <p className="font-semibold">Phone:</p>
                <p>+918122779620</p>
              </div>

              <div className="my-6">
                <p className="font-semibold">Instagram:</p>
                <a
                  href="https://www.instagram.com/_.narumugai"
                  className="text-purple-500"
                >
                  @_.narumugai
                </a>
              </div>
              <div className="my-6">
                <p className="font-semibold">Whatsapp:</p>
                <a
                  href="https://wa.me/+918122779620"
                  className="text-green-500"
                >
                  +91 8122779620
                </a>
              </div>
              <div className="my-6">
                <p className="font-semibold">Company Location</p>
                <a href="" className="text-gray-500 text-lg">
                  No.19e/2, NarumugaiHerbals,
                  <br />
                  Gramachavadi street,
                  <br />
                  Maniraja Aravamill,
                  <br />
                  Kamayagoundanpatti, Theni dt.,
                  <br />
                  TamilNadu - 625521
                </a>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
