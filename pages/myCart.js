import Navbar from "../components/Navbar"
import Link from "next/link"
import PromptMobile from "@/components/PromptMobile"
export default function Cart( {bathCount, faceCount }) {
  var bathPrice = parseFloat((bathCount*150.33).toFixed(2))
  var facePrice = parseFloat((faceCount*250.33).toFixed(2))
  var total = parseFloat((bathPrice+facePrice).toFixed(2))
  var discout = total*10/100;
  var shipment = total ? 40 : 0;
  var couponDiscout = total ? 10 : 0;
  var totalPayableAmount = parseFloat((total-discout+shipment-couponDiscout).toFixed(2))
  return (
   <>
  <PromptMobile/>
    <div className="overflow-hidden mx-auto ">
      <Navbar page="2"></Navbar>
      <div className='bg-subtheme h-screen w-full '>
      <img src="https://i.postimg.cc/mZ3Sg74n/image.png" alt="Watermark" className="absolute top-32 bottom-64" width={"100%"} />
      <h1 className='font-bold items-center justify-center flex text-lg py-10'>My Cart!</h1>
      <div className="space-y-4">
        <div className="px-5 flex">
            <img className=" rounded-xl" src="https://i.postimg.cc/Njv6sT5Q/herbal-bathing-powder.jpg" width={"20%"} ></img>
            <div className="grid grid-rows-3 ml-2">
                <span className="text-sm font-bold"> Herbal Bathing Powder</span>
                <span className="text-sm text-gray-500 "> Qnt: {bathCount} </span>
            </div>
            <div className="absolute right-5"> ₹{(bathPrice)}</div>
        </div>
        <div className="px-5 flex">
            <img className=" rounded-xl" src="https://i.postimg.cc/W4bpZM8G/image.png" width={"20%"} ></img>
            <div className="grid grid-rows-3 ml-2">
                <span className="text-sm font-bold"> Herbal Face Powder</span>
                <span className="text-sm text-gray-500 "> Qnt: {faceCount} </span>
            </div>
            <div className="absolute right-5"> ₹{(facePrice)}</div>
        </div>    
      </div>
       <div className='text-white  text-sm font-bold justify-end flex '> 
      <button className='bg-theme py-1 px-4 rounded-lg mr-5'>
      Apply Coupon
      </button>
      </div>
      
      <div className="bg-gray-300 rounded-2xl p-3 m-5  bg-opacity-50">
        <div className="grid grid-rows-5 space-y-2">
          <div className=" row-span-1">
          <div className="flex justify-between items-center">
              <h1>Total</h1>
              <h1 className="text-gray-900">₹{total}</h1>
          </div>
          </div>
          <div className=" row-span-1 text-gray-950 flex justify-between items-center">
              <h1>Discount</h1>
              <h1 className="text-gray-500">-10%</h1>
          </div>
          <div className=" row-span-1 flex justify-between items-center">
            <h1>Shipping Charges</h1>
            <h1 className="text-gray-500">+₹{shipment}</h1></div>
          <div className=" row-span-1 flex justify-between items-center">
            <h1>Coupon Discount</h1>
            <h1 className="text-gray-500 ">{couponDiscout ? "-₹"+couponDiscout : "-"}</h1> 
          </div>
          <div className=" row-span-1 text-lg flex justify-between items-center">
            <h1>Total Payable Amount</h1>
            <h1 className="text-gray-900 ">₹{totalPayableAmount}</h1>
          </div>
        </div>
      </div>
      
      <div className='space-y-10'>
      <div className='text-white font-bold justify-center flex absolute right-0 bottom-0 left-0 mb-10'> 
      
      <Link href="/customerDetails" className='bg-theme py-1 px-2  rounded-lg'>Checkout
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 inline-block ml-2 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </Link>
      
      </div>
      </div>
    </div>
    </div>
  </>
  )
}
