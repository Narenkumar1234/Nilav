import Navbar from "@/components/Navbar"
import Link from "next/link"

export default function Payment({bathCount, faceCount, phoneNumber, address, name }){
  var bathPrice = parseFloat((bathCount*150.33).toFixed(2))
  var facePrice = parseFloat((faceCount*250.33).toFixed(2))
  var total = parseFloat((bathPrice+facePrice).toFixed(2))
  var discout = total*10/100;
  var shipment = total ? 40 : 0;
  var couponDiscout = total ? 10 : 0;
  var totalPayableAmount = parseFloat((total-discout+shipment-couponDiscout).toFixed(2))
  var message = `Hey! New Order from ${name}`+ `\nThe Order List : \n ` +`${bathCount ? `\nHerbal Bathing Powder:  ${bathCount}\n`: ``}` + `${faceCount ? `\nHerbal Face Powder:  ${faceCount}\n`: ``} `  + "\nThe Address You have to deliver is \n" + address + ` \n \nPayment Done : ₹ ${totalPayableAmount} \n \n Customer Mobile Number ${phoneNumber}`
  const handleSubmit = async (event) => {

    try {
      const response = await fetch('/api/whatsapp1', {
        method: 'POST',
        body: JSON.stringify({ message }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        console.error(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

    return (<>
    
    <div className="overflow-hidden">
      <Navbar page="2"></Navbar>
      <div className='bg-subtheme h-screen w-full '>
            <h1 className='font-bold items-center justify-center flex text-lg py-10'>Payment!</h1>
            
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
       <div className="justify-center flex items-center  mt-10"> 
       { <Link href="/paymentFailed" onClick={handleSubmit} className='z-10 text-white bg-theme py-3 px-5 rounded-lg'>Pay with BHIM/UPI ID
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 inline-block ml-2 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </Link>}
      </div>
      <div className="justify-center items-center flex">
      <img src="https://i.postimg.cc/Pr5ddQ0R/image.png" className="z-0 absolute bottom-0" width={"60%"} alt=""/>

      </div>
      </div>
      
    </div>
    </>)
}
