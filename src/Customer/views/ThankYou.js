import React, { useEffect } from "react";
import Thank_You from "../assets/thank_you.svg";
import { Redirect } from "react-router-dom";

function ThankYou({ location }) {
  const signout = (next) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("customer");
    }
  };

  const checkState = () => {
    if (location.state === undefined) {
      return <Redirect to="/" />;
      // if (!location.state.is_paid) {
      // }
    } else {
      signout();
    }
  };

  useEffect(() => {
    console.log(location);
  }, []);

  return (
    <div>
      {checkState()}
      {/* {signout()} */}
      <div class="flex h-screen bg-gray-300">
        <div class="m-auto">
          <div class="max-w-sm bg-white rounded overflow-hidden shadow-lg">
            <img
              class="w-full p-5"
              src={Thank_You}
              alt="Sunset in the mountains"
            />
            <div class="px-6 py-4 text-center">
              <div class="font-bold text-xl mb-2">Thank You.</div>
              <p class="text-gray-700 text-base">Visit us again.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
