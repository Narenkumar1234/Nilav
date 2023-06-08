import Navbar from "@/components/Navbar";
import Loading from "@/components/loading";
import { useState } from "react";
import Layout from "./layout/layout";

export default function ShippingPolicy() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Layout>
        <div
          id="my-element"
          className="lg:h-screen md:h-screen lg:p-10 md:p-10"
        >
          <div className="lg:relative bg-subtheme w-full mobile-view">
            {isLoading ? <Loading /> : <div></div>}
            <Navbar page="7" setIsLoading={setIsLoading} />
            <div className="bg-gray-100 text-gray-800">
              <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mt-4">Shipping Policy</h1>

                <h3 className="text-2xl font-bold mt-4">Shipping Method:</h3>
                <p>
                  We utilize a professional courier service for all our shipping
                  needs. This ensures reliable and efficient delivery of your
                  orders.
                </p>

                <h3 className="text-2xl font-bold mt-4">
                  International Shipping:
                </h3>
                <p>
                  At this time, we do not offer international shipping. We only
                  ship within India.
                </p>

                <h3 className="text-2xl font-bold mt-4">Processing Time:</h3>
                <p>
                  Please allow a minimum of 1 business day and a maximum of 3
                  business days for us to process your order before it is
                  shipped. Please note that orders placed after the cut-off time
                  or on weekends/holidays will be processed on the next business
                  day.
                </p>

                <h3 className="text-2xl font-bold mt-4">Shipping Time:</h3>
                <p>
                  Once your order has been processed and dispatched, the
                  estimated shipping time is approximately <b> 2-3 days </b>.
                  Please note that this is an estimate, and actual delivery
                  times may vary depending on the destination and any unforeseen
                  circumstances that may arise during transit.
                </p>

                <h3 className="text-2xl font-bold mt-4">Order Tracking:</h3>
                <p>
                  We provide tracking numbers for all shipments. Once your order
                  has been shipped, you will receive an email notification with
                  your tracking information. You can use this tracking number to
                  monitor the progress of your package.
                </p>

                <h3 className="text-2xl font-bold mt-4">Shipping Costs:</h3>
                <p>
                  We charge a standard shipping fee based on your location. For
                  deliveries within Tamil Nadu, there is a shipping charge of 40
                  rupees. For deliveries to other states, the shipping charge is
                  45 rupees. The shipping cost will be calculated at the
                  checkout based on your shipping address.
                </p>

                <h3 className="text-2xl font-bold mt-4">
                  Returns and Exchanges:
                </h3>
                <p>
                  For returns and exchanges of products, please contact us via
                  email at{" "}
                  <a href="mailto:narumugaiherbals2023@gmail.com">
                    narumugaiherbals2023@gmail.com
                  </a>
                  . Provide us with the necessary details and reason for the
                  return or exchange, and our customer support team will assist
                  you with the process.
                </p>

                <p className="mb-8">
                  Thank you for reading our Shipping Policy. If you have any
                  questions or need further assistance, please don't hesitate to
                  reach out to our customer support team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
