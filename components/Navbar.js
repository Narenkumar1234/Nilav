import { useState } from "react";
import Link from "next/link";
import { useRef, useEffect } from "react";
import Cart from "@/pages/myCart";

export default function Navbar({ page, setIsLoading, isNavOpen = false, setIsNavOpen = setIsLoading }) {

  const [isSliderOpen, setIsSliderOpen] = useState(isNavOpen);
  const sliderRef = useRef(null);

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
    setIsNavOpen(false);

    }
  }

  const [cartItems, setCartItems] = useState({});
  const [count, setCount] = useState({});
  const [price, setPrice] = useState({});

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
          <div className="flex items-center justify-center w-12">
            <img src="https://i.postimg.cc/y6vpbZzB/image.png" alt="" />
          </div>
        </button>
      </div>
      {isSliderOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30">
          <div
            ref={sliderRef}
            className=" slider-panel flex flex-col h-screen bg-subtheme w-10/12 lg:w-4/12 lg:px-8 lg:py-16 space-y-10 absolute top-0 right-0 "
          >
            <div className="text-black">
              <Cart count={count} setCount={setCount} setPrice={setPrice} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

