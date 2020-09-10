import React, { useState } from "react";
import { API } from "../../Constant/index";

import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../../auth/Customer/helper";

function Payment({ data }) {
  const [paymentData, setPaymentData] = useState(data);

  const { id, name, phone_number, email, token } = isAuthenticated();
  const [didRedirect, setDidRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const performRedirect = () => {
    if (didRedirect) {
      return (
        <Redirect
          to={{
            pathname: "/thankyou",
            state: { is_paid: true },
          }}
        />
      );
    }
  };

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const paymentHandler = async (e) => {
    e.preventDefault();
    console.log("######> " + paymentData);
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const orderUrl = `${API}/payment/create/`;
    const response = await fetch(orderUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //   "Access-Control-Allow-Headers": "Customer-Token",
      },
      body: paymentData,
    }).then((t) => t.json());
    const { data } = response;
    console.log(response.data);
    const options = {
      key: process.env.RAZOR_PAY_TEST_KEY,
      name: "Hotel MS",
      description: "Payment Staging",
      order_id: data.id,
      handler: async (response) => {
        try {
          const payment_detail = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            amount: data.amount,
          };
          const url = `${API}/payment/capture/`;
          const captureResponse = await fetch(url, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Customer-Token": token,
            },
            body: JSON.stringify(payment_detail),
          }).then((t) => t.json());
          if (captureResponse.detail === "ok") {
            setDidRedirect(true);
          }
        } catch (err) {
          console.log(err);
        }
      },
      prefill: {
        name,
        email,
        phone_number,
      },
      theme: {
        color: "#686CFD",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <button
      onClick={paymentHandler}
      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
    >
      {console.log(data)}
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        className="currency-rupee w-6 h-6"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 5a1 1 0 100 2h1a2 2 0 011.732 1H7a1 1 0 100 2h2.732A2 2 0 018 11H7a1 1 0 00-.707 1.707l3 3a1 1 0 001.414-1.414l-1.483-1.484A4.008 4.008 0 0011.874 10H13a1 1 0 100-2h-1.126a3.976 3.976 0 00-.41-1H13a1 1 0 100-2H7z"
          clip-rule="evenodd"
        ></path>
      </svg>
      {/* <svg
        style={margin: "auto", background: "none", display: "block", shape-rendering: "auto"}
        width="200px"
        height="200px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      />
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke="#85a2b6"
        stroke-width="10"
        r="35"
        stroke-dasharray="164.93361431346415 56.97787143782138"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        ></animateTransform>
      </circle> */}
      <span>Pay Online</span>
      {performRedirect()}
    </button>
  );
}

export default Payment;
