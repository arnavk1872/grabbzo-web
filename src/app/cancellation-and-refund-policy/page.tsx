import React from "react";

const CancellationAndRefundPolicy = () => {
  return (
    <div className="mx-auto px-12 text-justify -mt-14 mb-10">
      <h2 className="text-4xl font-semibold text-center">
        Cancellation and Refund Policy
      </h2>

      <p className="my-6">
        We at Grabbzo appreciate you for choosing our platform for placing
        orders at the restaurants. However, it does feel disappointing when an
        order is cancelled by you or the restaurant due to unavoidable
        circumstances. We feel immense pleasure and joy in serving you and
        providing you with a great experience and sincerely hope that the
        cancellations are avoided by you unless it is beyond your control.
        However, under circumstances where there is cancellation of the order,
        herein below are the cancellation and refund policies:
      </p>

      <h3 className="text-2xl font-semibold mb-4">Customer Cancellations</h3>
      <ul className="list-disc pl-8 space-y-4 mb-6">
        <li>
          <p className="text-justify">
            <strong>Customer Cancellations:</strong> Orders can be cancelled
            within 5 (Five) minutes of placing the order. However, on
            cancellation of an order on your part, no refund requests would be
            entertained.
          </p>
        </li>
        <li className="list-none">
          <p className="text-justify">
            <strong>Refund Policy:</strong> On cancellation of an order on your
            part, no refund requests would be entertained.
          </p>
        </li>
        <li className="list-none">
          <p className="text-justify">
            On cancellation of an order on part of the restaurant, the refund
            amount shall be transferred into the account of the consumer from
            where the payment was received within 7-8 business days.
          </p>
        </li>
        <li className="list-none">
          <p className="text-justify">
            On receipt of a complaint from your end against the restaurant, you
            agree to participate in the enquiry process. If found entitled for a
            refund after a detailed enquiry on the complaint, the refund amount
            shall be transferred into your account from where the payment was
            received within 7-8 business days of closure of the complaint.
          </p>
        </li>
      </ul>

      <h3 className="text-2xl font-semibold mb-4">Restaurant Cancellations</h3>
      <ul className="list-disc pl-8 space-y-4 mb-6">
        <li>
          <p className="text-justify">
            <strong>Restaurant Cancellations:</strong> Orders can be cancelled
            within 5 (Five) minutes of placing the order only due to
            non-availability of the ordered items.
          </p>
        </li>
        <li className="list-none">
          <p className="text-justify">
            <strong>Refund Policy:</strong> On cancellation of an order on your
            part, no refund is to be granted to the customer.
          </p>
        </li>
        <li className="list-none">
          <p className="text-justify">
            On cancellation of an order on part of the restaurant, full refund
            shall be granted to the customer. The refund process shall be
            completed within 7-8 business days into the account of the customer
            from where the payment was received.
          </p>
        </li>
        <li className="list-none">
          <p className="text-justify">
            On receipt of a complaint from the customer end against the
            restaurant, the restaurant agrees to participate in the enquiry
            process. If found entitled for a refund after detailed enquiry on
            the complaint, the restaurant is liable to refund the amount and the
            said amount shall be transferred into the account of the customer
            from where the payment was received within 7-8 business days of
            closure of the complaint.
          </p>
        </li>
        <li className="list-none">
          <p className="text-justify">
            The restaurant shall initiate a complete refund in favour of the
            customer if there is a delay of 10 minutes or more beyond the
            estimated delivery time in delivery of the order towards the
            consumer, and the refund process shall be completed within 7-8
            business days.
          </p>
        </li>
      </ul>

      <p className="text-justify mb-6">
        Please feel free to reach us at:
        <a
          href="mailto:support@grabbzo.com"
          className="text-blue-600 hover:underline px-1"
        >
          support@grabbzo.com
        </a>
        for any further assistance or feedback.
      </p>
    </div>
  );
};

export default CancellationAndRefundPolicy;
