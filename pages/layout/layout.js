import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faTwitter,
  faFacebook,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <>
      <div className="content-container">
        <div id="my-element" className="content">
          <div className="bg-subtheme min-h-screen w-full ">{children}</div>
        </div>
      </div>

      <footer className="bg-footer text-white py-8 px-10  mt-auto">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row justify-between ">
            <div className="flex items-center justify-center lg:justify-betweeen  mb-4 lg:mb-0">
              <Link href="/">
                <img
                  src="https://i.postimg.cc/LsLDnCmq/IMG-20230530-113928-375.jpg"
                  alt="Watermark"
                  className="border-white w-20 m-3 rounded-md"
                />
              </Link>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/narumugaiherbals"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faFacebook} className=" text-2xl" />
                </a>
                <a
                  href="https://www.twitter.com/narumugaiherbals"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faTwitter} className=" text-2xl" />
                </a>
                <a
                  href="https://www.instagram.com/_.narumugai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faInstagram} className=" text-2xl" />
                </a>
                <a
                  href="https://wa.me/+918122779620"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faWhatsapp} className=" text-2xl" />
                </a>
              </div>
            </div>
            <div className="mb-4 lg:mb-0">
              <h3 className="lg:text-2xl text-lg  font-bold mb-2 lg:mb-4 ">
                OUR POLICIES
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-2  text-lg lg:text-lg gap-4">
                <a href="/refundPolicy" className="">
                  Cancellation & Refund
                </a>
                <a href="/shippingPolicy" className="">
                  Shipping Policy
                </a>
                <a href="/privacyPolicy" className="">
                  Privacy Policy
                </a>
                <a href="/termsAndConditions" className="">
                  Terms and Conditions
                </a>
                <a href="/contactUs" className="">
                  Any Queries? Contact Us?
                </a>
              </div>
            </div>
            <div>
              <h3 className="lg:text-2xl text-lg lg:font-bold font-bold mb-2 lg:mb-4 ">
                CONTACT US
              </h3>
              <div className="flex text-lg lg:text-lg items-center mb-2 lg:mb-4">
                <FontAwesomeIcon icon={faEnvelope} className=" mr-2" />
                <p className="">narumugaiherbals2023@gmail.com</p>
              </div>
              <div className="flex text-lg lg:text-lg items-center">
                <FontAwesomeIcon icon={faPhone} className=" mr-2" />
                <p className="">+918122779620</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
