import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faTwitter,
  faFacebook,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

export default function Layout({ children }) {
  return (
    <>
      <div className="bg-gradient-to-br from-gray-900 to-green-600">
        <div
          id="my-element"
          className="lg:h-screen md:h-screen lg:p-10 md:p-10"
        >
          <div className="bg-subtheme w-full mobile-view">{children}</div>
        </div>
      </div>

      <footer className="bg-black text-white py-8 px-10">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row justify-between ">
            <div className="flex items-center justify-center lg:justify-betweeen  mb-4 lg:mb-0">
              <img
                src="https://i.postimg.cc/LsLDnCmq/IMG-20230530-113928-375.jpg"
                alt="Watermark"
                className="border-white w-20 m-3 rounded-md"
              />
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className="text-white text-xl"
                  />
                </a>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faTwitter}
                    className="text-white text-xl"
                  />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="text-white text-xl"
                  />
                </a>
                <a
                  href="https://www.whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faWhatsapp}
                    className="text-white text-xl"
                  />
                </a>
              </div>
            </div>
            <div className="mb-4 lg:mb-0">
              <h3 className="text-xl mb-2 lg:mb-4 text-green-500">
                Our Policies
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-2  text-xs lg:text-sm gap-4">
                <a href="/refundPolicy" className="text-white">
                  Cancellation & Refund
                </a>
                <a href="/shippingPolicy" className="text-white">
                  Shipping Policy
                </a>
                <a href="/privacyPolicy" className="text-white">
                  Privacy Policy
                </a>
                <a href="/termsAndConditions" className="text-white">
                  Terms and Conditions
                </a>
                <a href="/contactUs" className="text-white">
                  Any Queries? Contact Us?
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl mb-2 lg:mb-4 text-green-500">
                Contact Us
              </h3>
              <div className="flex text-xs lg:text-sm items-center mb-2 lg:mb-4">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-white mr-2"
                />
                <p className="text-white">narumugaiherbals2023@gmail.com</p>
              </div>
              <div className="flex text-xs lg:text-sm items-center">
                <FontAwesomeIcon icon={faPhone} className="text-white mr-2" />
                <p className="text-white">+918122779620</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
