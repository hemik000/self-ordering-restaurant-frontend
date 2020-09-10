import React, { useState } from "react";

import { Redirect } from "react-router-dom";
import { checkCustomerToken } from "../Helpers";
import { authenticate, isAuthenticated } from "../../auth/Customer/helper";

function JoinSession() {
  const [customerToken, setCustomerToken] = useState("");
  const [error, setError] = useState(false);
  const [didRedirect, setDidRedirect] = useState(false);

  const handleCustomerToken = (event) => {
    const value = event.target.value;
    setCustomerToken(value);
  };

  const checkToken = () => {
    checkCustomerToken(customerToken)
      .then((data) => {
        if (data.detail) {
          setError(data.detail);
        } else {
          authenticate(data, () => {
            setDidRedirect(true);
          });
        }
      })
      .catch();
  };

  const performRedirect = () => {
    if (didRedirect) {
      return <Redirect to="/menu" />;
    }
    if (isAuthenticated()) {
      return <Redirect to="/menu" />;
    }
  };

  return (
    <div class="flex h-screen bg-gray-300">
      {performRedirect()}
      <div class="m-auto">
        <div className="w-full max-w-lg">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <p class="text-red-500 text-md">{error}</p>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="phone"
              >
                Customer Token
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="text"
                placeholder="Customer Token"
                name="customer_token"
                onChange={handleCustomerToken}
                required={true}
                value={customerToken}
              />
              <p class="text-red-500 text-xs italic">
                Only if you have previously join.
              </p>
            </div>

            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={checkToken}
              >
                Join Table
              </button>
            </div>
          </form>
          {/* <p className="text-center text-gray-500 text-xs">
                &copy;2020 Acme Corp. All rights reserved.
              </p> */}
        </div>
      </div>
    </div>
  );
}

export default JoinSession;
