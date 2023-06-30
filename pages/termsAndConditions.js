import Navbar from "@/components/Navbar";
import Loading from "@/components/loading";
import { useState } from "react";
import Layout from "./layout/layout";

export default function TermsAndConditions() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Layout>

          <div className="lg:relative ">
            {isLoading ? <Loading /> : <div></div>}
            <Navbar page="7" setIsLoading={setIsLoading}></Navbar>
            <div className="bg-gray-100 text-gray-800">
              <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">
                  Terms and Conditions
                </h1>
                <p className="mb-8">
                  These Terms and Conditions govern your use of our website. By
                  accessing or using our website, you agree to be bound by these
                  Terms and Conditions. If you do not agree with any part of
                  these terms, please do not use our website.
                </p>

                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <p className="mb-8">
                  If you have any questions or concerns regarding these Terms
                  and Conditions, please contact us at:
                  <br />
                  Email:{" "}
                  <a href="mailto:narumugaiherbals2023@gmail.com">
                    narumugaiherbals2023@gmail.com
                  </a>
                </p>

                <h2 className="text-2xl font-bold mb-4">Effective Date</h2>
                <p className="mb-8">
                  These Terms and Conditions are effective as of 1 June 2023.
                  Please review these terms regularly, as they may be updated
                  and modified from time to time without prior notice.
                </p>

                <h2 className="text-2xl font-bold mb-4">
                  Limitation of Liability
                </h2>
                <p className="mb-8">
                  We make every effort to ensure the accuracy and reliability of
                  our products and services. However, we shall not be held
                  liable for any direct, indirect, incidental, consequential, or
                  punitive damages arising from the use or inability to use our
                  products or services.
                </p>

                <h2 className="text-2xl font-bold mb-4">
                  Disclaimer of Warranties
                </h2>
                <p className="mb-8">
                  We provide our products and services as without any warranties
                  or representations, expressed or implied. We disclaim all
                  warranties, including but not limited to, the implied
                  warranties of merchantability and fitness for a particular
                  purpose. Customers acknowledge that product descriptions,
                  images, and information on our website may not be entirely
                  accurate or error-free.
                </p>

                <h2 className="text-2xl font-bold mb-4">Rules of Contact</h2>
                <div className="mb-8">
                  In order to request a cancellation and refund, customers must
                  adhere to the following rules:
                  <ul className="list-disc pl-8">
                    <li>
                      Customers are required to contact us within 1 day of order
                      placement to initiate a cancellation and refund request.
                    </li>
                    <li>
                      Cancellation requests received after the 1-day timeframe
                      may not be eligible for a refund.
                    </li>
                    <li>
                      All cancellation requests must be submitted through our
                      designated communication channels, including email, phone,
                      or the contact form on our website.
                    </li>
                    <li>
                      Customers must provide the necessary order details, such
                      as the order number and customer information, to
                      facilitate the cancellation process.
                    </li>
                    <li>
                      We will communicate with customers regarding the status of
                      their cancellation request and provide confirmation via
                      email or any other preferred communication method.
                    </li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold mb-4">User Restrictions</h2>
                <div className="mb-8">
                  By using our website, you agree to comply with the following
                  user restrictions:
                  <ul className="list-disc pl-8">
                    <li>
                      This cancellation and refund policy applies to all
                      customers who have placed an order on our e-commerce
                      website.
                    </li>
                    <li>
                      Customers must adhere to the specified cancellation
                      timeframe of 1 day from the order placement to be eligible
                      for a refund.
                    </li>
                    <li>
                      Customers are responsible for providing accurate and
                      up-to-date contact information to ensure effective
                      communication regarding their cancellation and refund
                      requests.
                    </li>
                    <li>
                      Customers shall not misuse or abuse the cancellation
                      policy, including making fraudulent claims or attempts to
                      receive refunds outside the stated policy.
                    </li>
                  </ul>
                </div>

                <p className="mb-8">
                  By using our website, you agree to comply with these Terms and
                  Conditions. If you do not agree with any part of these terms,
                  please do not use our website. We reserve the right to modify,
                  update, or discontinue any aspect of our website at any time
                  without prior notice. Thank you for reading and agreeing to
                  our Terms and Conditions.
                </p>
              </div>
            </div>
          </div>
      </Layout>
    </>
  );
}
