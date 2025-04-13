/** @format */

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { MdEmojiEvents } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useCart from "../../../hook/useCart";

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [tranjectionId, setTranjectionId] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const [clientSecret, setClienSecret] = useState(null);
  const navigate = useNavigate();
  const [cart, refetch] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          setClienSecret(res.data?.ClientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    // Here you'd call your backend to get clientSecret and confirm payment
    // This part is just a placeholder

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error in the create payment method", error);
      setError(error.message);
    } else {
      setError(null);
      console.log("[PaymentMethod]", paymentMethod);
    }

    // set up the confirm cardElement

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
      console.log(confirmError, "error in the confirm error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTranjectionId(paymentIntent.id);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Thank for purcessing",
          showConfirmButton: false,
          timer: 1500,
        });

        // now save payment data to the database
        const payment = {
          email: user?.email,
          cartIds: cart.map((item) => item._id),
          menuItemIds: cart.map((item) => item.menuId),
          status: "pending",
          date: new Date(),
          tranjectionId: paymentIntent.id,
          price: totalPrice,
        };

        setTimeout(() => {
          console.log("Payment simulated.");
          setProcessing(false);
        }, 2000);

        const paymentRes = await axiosSecure.post("/payment", payment);
        console.log(paymentRes);
        if (
          paymentRes.data?.result?.insertedId &&
          paymentRes.data?.deletedResult?.deletedCount
        ) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Cart is empty and save to the payment`,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/paymentHistory");
        }
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-6 border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Check in Your Information!!
      </h2>
      <p className="text-lg text-green-700">
        Total Amount: <span className="font-semibold">${totalPrice}</span>{" "}
      </p>
      {tranjectionId && (
        <>
          <div className="text-2xl text-center flex items-center justify-center">
            <MdEmojiEvents className="text-[#bc5800] text-4xl" />

            <span>Congratulation</span>
            <MdEmojiEvents className="text-[#bc5800] text-4xl" />
          </div>
          <p className="text-lg text-green-700">
            Your Tranjection ID:{" "}
            <span className="font-semibold">{tranjectionId}</span>{" "}
          </p>
        </>
      )}

      <div className="p-4 border border-gray-300 rounded-md">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",
                "::placeholder": {
                  color: "#a0aec0",
                },
              },
              invalid: {
                color: "#e53e3e",
              },
            },
          }}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe || processing}
        className={`w-full py-3 cursor-pointer uppercase rounded-md text-white font-medium transition-all ${
          processing || !stripe
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#bc5800] hover:bg-[#ff5800]"
        }`}>
        {processing ? "Processing..." : `Pay Now`}
      </button>

      <div>
        <p>{error}</p>
      </div>
    </form>
  );
};

export default CheckOutForm;
