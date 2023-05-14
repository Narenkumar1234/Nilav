import Navbar from '../components/Navbar'
import { PlusSmIcon, MinusSmIcon } from '@heroicons/react/solid'
import Link from 'next/link';
import PromptMobile from "@/components/PromptMobile"

export default function Home({faceCount, setFaceCount, bathCount, setBathCount}) {
  return (
    <>
    <PromptMobile/>
    <div className="lg:hidden">
      <Navbar page="1"></Navbar>
      <div className='bg-subtheme h-screen w-full paddingBody'>
      <h1 className='font-bold items-center justify-center flex text-lg py-10'>Our Products!</h1>
      <div className='space-y-10'>
      <div className=" bg-white h-full mx-10 rounded-xl">
      <div className=" grid grid-rows-4">
    
      <div className=" row-span-3">
        <div className=" grid grid-cols-2 py-3 ">
          <div className=" col-span-1 ">
            <div className="flex items-center justify-center">
            <img className=" rounded-xl" src="https://i.postimg.cc/Njv6sT5Q/herbal-bathing-powder.jpg" width={"70%"} ></img>
            </div>
          </div>
          <div className=" col-span-1">
             <h1 className="font-bold"> Herbal Bathing Powder </h1>
             <p className=" text-gray-400">125g</p>
          </div>
        </div>
      </div>
      
      <div className="row-span-1 px-7">
        <div className="flex justify-between items-center">          
          <div>
          <div className="flex items-center">
          <button className="p-0.5 border border-green-800 rounded-full" onClick={()=>bathCount && setBathCount(bathCount-1)}>
            <MinusSmIcon className="h-5 w-5 text-black" />
          </button>
          <span className="mx-2">{bathCount}</span>
          <button className="p-0.5 border  border-green-800 rounded-full" onClick={()=>setBathCount(bathCount+1)}>
            <PlusSmIcon className="h-5 w-5 text-black" />
          </button>
          </div>
          </div>
          <div className="font-bold">₹150.33</div>
        </div>
      </div>
      </div>
      </div>

      <div className=" bg-white h-full mx-10 rounded-xl">
      <div className=" grid grid-rows-4">
      
      <div className=" row-span-3">
        <div className=" grid grid-cols-2 py-3 ">
          <div className=" col-span-1 ">
            <div className="flex items-center justify-center">
            <img className=" rounded-xl" src="https://i.postimg.cc/W4bpZM8G/image.png" width={"70%"} ></img>
            </div>
          </div>
          <div className=" col-span-1">
             <h1 className="font-bold"> Herbal Face Powder </h1>
             <p className=" text-gray-400">125g</p>
          </div>
        </div>
      </div>
      
      <div className="row-span-1 px-7">
        <div className="flex justify-between items-center">          
          <div>
          <div className="flex items-center">
          <button className="p-0.5 border border-green-800 rounded-full" onClick={()=>faceCount && setFaceCount(faceCount-1)}>
            <MinusSmIcon className="h-5 w-5 text-black" />
          </button>
          <span className="mx-2">{faceCount}</span>
          <button className="p-0.5 border  border-green-800 rounded-full" onClick={()=>setFaceCount(faceCount+1)}>
            <PlusSmIcon className="h-5 w-5 text-black"  />
          </button>
          </div>
          </div>
          <div className="font-bold">₹250.33</div>
        </div>
      </div>
      </div>
      </div>
      </div>
      <div className='text-white font-bold justify-center flex absolute right-0 bottom-0 left-0 mb-10'> 
      <Link href="/myCart" className='bg-theme py-1 px-2 rounded-lg'>Proceed
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 inline-block ml-2 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      </Link>
      </div>
      </div>
    </div>
    </>
)
 
}
