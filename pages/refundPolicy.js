import Navbar from "@/components/Navbar";

export default function refundPolicy(){
    return (
      <>
      <Navbar page="7"></Navbar>
        <div className="bg-gray-100 h-screen text-gray-800">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">
              Cancellation and Refund Policy
            </h1>
            <p className="mb-8">
              Effective Date: 1 June 2023
            </p>

            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p className="mb-8">
              If you have any questions, concerns, or wish to initiate a
              cancellation and refund request within 1 day of order placement,
              please contact our customer service team using the following
              methods:
            </p>
            <ul className="mb-8">
              <li>
                Email:{" "}
                <a href="mailto:narumugaiherbals2023@gmail.com">
                  narumugaiherbals2023@gmail.com
                </a>
              </li>
              <li>Phone: +918122779620</li>
            </ul>

            <p className="mb-8">
              Please include the following details when contacting us for
              cancellation and refund requests:
            </p>
            <ul className="mb-8">
              <li>Order Number</li>
              <li>Customer Name</li>
              <li>Contact Information</li>
            </ul>

            <p className="mb-8">
              We are available during our business hours (Mon - Fri 9AM - 9PM) to assist you promptly.
            </p>

            <p className="mb-8">
              We value our customers and strive to provide a transparent and
              fair cancellation and refund policy. If you have any further
              questions or require additional information, please do not
              hesitate to contact us.
            </p>

            <p>During refund, standard refund charges will be applicable.</p>
          </div>
        </div>
      </>
    );
}