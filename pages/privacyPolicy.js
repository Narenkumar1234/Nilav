import Navbar from "@/components/Navbar";
import Loading from "@/components/loading";
import { useState } from "react";
export default function PrivacyPolicy() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      {isLoading ? <Loading /> : <div></div>}
      <Navbar page="9" setIsLoading={setIsLoading}></Navbar>
      <div className="bg-gray-100 text-gray-800">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
          <p className="mb-4">Effective Date: 1 June 2023</p>
          <p className="mb-8">
            Thank you for using our website. This Privacy Policy outlines how we
            collect, use, and safeguard the personal information of our users.
            We are committed to protecting your privacy and ensuring the
            security of your personal information. Please read this policy
            carefully to understand our practices regarding your personal
            information.
          </p>
          <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
          <div className="mb-8">
            We collect the following personal information from our users:
            <ul className="list-disc pl-8">
              <li>
                Name: We collect your name to personalize your experience and
                address you appropriately.
              </li>
              <li>
                Address: We collect your address to facilitate the shipping of
                products to your specified location.
              </li>
              <li>
                Mobile Number: We collect your mobile number to contact you
                regarding order updates and delivery notifications.
              </li>
            </ul>
          </div>
          <h2 className="text-2xl font-bold mb-4">2. Information Collection</h2>
          <p className="mb-8">
            We collect the aforementioned personal information directly from you
            when you provide it during the shipping process on our website. You
            voluntarily provide this information to enable us to fulfill your
            order and ensure the successful delivery of your products.
          </p>
          <h2 className="text-2xl font-bold mb-4">
            3. Use of Collected Information
          </h2>
          <div className="mb-8">
            We use the collected personal information for the following
            purposes:
            <ul className="list-disc pl-8">
              <li>
                Shipping: We utilize the provided name, address, and mobile
                number to process and ship your orders accurately and promptly.
              </li>
              <li>
                Communication: We may use your mobile number to send you
                important updates and notifications regarding your orders, such
                as shipping confirmations and delivery updates.
              </li>
            </ul>
          </div>
          <h2 className="text-2xl font-bold mb-4">4. Information Security</h2>
          <p className="mb-8">
            We prioritize the security of your personal information and employ
            industry-standard measures to safeguard it. All customer data is
            encrypted at rest using AES-256 encryption, ensuring that your
            information remains confidential and secure. Additionally, we use
            Transport Layer Security (TLS) during data transmission to provide a
            secure connection between our servers and your device.
          </p>
          <h2 className="text-2xl font-bold mb-4">5. Information Sharing</h2>
          <p className="mb-8">
            We are committed to maintaining the privacy of your personal
            information and do not share it with any third-party applications or
            services. Your data is strictly used for internal purposes related
            to fulfilling your orders and ensuring a smooth shopping experience.
          </p>
          <p className="mb-8">
            Please note that while we take reasonable steps to protect your
            personal, no data transmission or storage method can be guaranteed
            as 100% secure. Therefore, we cannot guarantee the absolute security
            of your information. By using our website, you consent to the
            collection, use, and storage of your personal information as
            described in this Privacy Policy. If you have any questions or
            concerns about our privacy practices or would like to exercise your
            rights regarding your personal information, please contact us at
            <a
              className="text-blue-500"
              href="mailto:narumugaiherbals2023@gmail.com"
            >
              <i>narumugaiherbals2023@gmail.com</i>
            </a>
            . We reserve the right to update or modify this Privacy Policy at
            any time. Any changes will be effective immediately upon posting on
            this page. We encourage you to review this Privacy Policy
            periodically to stay informed about how we protect and use your
            personal information. Thank you for trusting us with your personal
            information.
          </p>
        </div>
      </div>
    </>
  );
}
