/** @format */

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle";
import CheckoutForm from "../../../page/dashboard/payment/CheckOutForm";
// import CheckoutForm from "../../../page/dashboard/payment/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
const Payment = () => {
  return (
    <div>
      <SectionTitle
        title="Payment"
        subtitle="Payment Now!"
      />
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Payment;
