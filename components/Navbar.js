import { useState } from "react";
import Link from "next/link";
import { useRef, useEffect } from "react";

export default function Navbar({ page, setIsLoading }) {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const sliderRef = useRef(null);

  function handleClick() {
    setIsLoading(true);
  }

  function toggleSlider() {
    setIsSliderOpen(!isSliderOpen);
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  function handleOutsideClick(event) {
    if (sliderRef.current && !sliderRef.current.contains(event.target)) {
      setIsSliderOpen(false);
    }
  }
  return (
    <div className="sticky bg-theme shadow-xl z-20 border-bg border-green-600 text-white px-2 flex justify-between items-center">
      <div className="font-bold flex items-center">
        <div className="flex items-center justify-center">
          <img
            src="https://i.postimg.cc/LsLDnCmq/IMG-20230530-113928-375.jpg"
            alt="Watermark"
            className="border-white w-10 m-3 rounded-md"
            width={"50%"}
          />
        </div>
        <Link href="/">Narumugai</Link>
      </div>
      <div className="flex items-center justify-center w-12">
        <button
          onClick={toggleSlider}
          className="text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M3 5h18v2H3zm0 4h18v2H3zm0 4h18v2H3zm0 4h18v2H3z"
            />
          </svg>
        </button>
      </div>
      {isSliderOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30">
          <div
            ref={sliderRef}
            className=" slider-panel flex flex-col h-screen bg-theme w-64 px-8 py-16 space-y-10 absolute top-0 right-0 "
          >
            <Link
              onClick={() =>
                page == "1" ? setIsLoading(false) : setIsLoading(true)
              }
              href="/"
              className="text-gray-100 hover:text-subtheme hover:underline mb-2"
            >
              Home
            </Link>
            <Link
              onClick={() =>
                page == "2" ? setIsLoading(false) : setIsLoading(true)
              }
              href="/myCart"
              className="text-gray-100 hover:text-subtheme hover:underline mb-2"
            >
              MyCart
            </Link>
            <Link
              onClick={() =>
                page == "6" ? setIsLoading(false) : setIsLoading(true)
              }
              href="/refundPolicy"
              className="text-gray-100 hover:text-subtheme hover:underline mb-2"
            >
              Cancellation & Refund
            </Link>
            <Link
              onClick={() =>
                page == "10" ? setIsLoading(false) : setIsLoading(true)
              }
              href="/shippingPolicy"
              className="text-gray-100 hover:text-subtheme hover:underline mb-2"
            >
              Shipping Policy
            </Link>
            <Link
              onClick={() =>
                page == "9" ? setIsLoading(false) : setIsLoading(true)
              }
              href="/privacyPolicy"
              className="text-gray-100 hover:text-subtheme hover:underline mb-2"
            >
              Privacy Policy
            </Link>
            <Link
              onClick={() =>
                page == "7" ? setIsLoading(false) : setIsLoading(true)
              }
              href="/termsAndConditions"
              className="text-gray-100 hover:text-subtheme hover:underline mb-2"
            >
              Terms and Conditions
            </Link>

            <Link
              onClick={() =>
                page == "8" ? setIsLoading(false) : setIsLoading(true)
              }
              href="/contactUs"
              className="text-gray-100 hover:text-subtheme hover:underline mb-2"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
