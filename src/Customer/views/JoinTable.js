import React, { useEffect, useState } from "react";
import { getTableDetail } from "../Helpers";
import { createACustomer } from "../Helpers";
import { authenticate, isAuthenticated } from "../../auth/Customer/helper";
import { Redirect } from "react-router-dom";

function JoinTable({ match }) {
  const [values, setValues] = useState({
    name: "",
    phone_number: "",
    on_table: "",
    table_number: "",
    is_occupied: "",
    is_active: "",
  });
  const [didRedirect, setDidRedirect] = useState(false);
  const [error, setError] = useState(false);
  const performRedirect = () => {
    if (didRedirect) {
      return <Redirect to="/" />;
    }
    if (isAuthenticated()) {
      return <Redirect to="/menu" />;
    }
  };
  const { name, phone_number, on_table } = values;
  const preLoad = (id) => {
    console.log(id);
    getTableDetail(id).then((data) => {
      if (data.detail === "Not found.") {
        setError(true);
      } else {
        console.log(data);
        setValues({
          ...values,
          on_table: data.id,
          table_number: data.number,
          is_occupied: data.is_occupied,
          is_active: data.is_active,
        });
      }
    });
  };

  useEffect(() => {
    preLoad(match.params.tableID);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(on_table);
    createACustomer({ name, phone_number, on_table })
      .then((data) => {
        authenticate(data, () => {
          setDidRedirect(true);
        });
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };

  return (
    <div class="flex h-screen bg-gray-300">
      <div class="m-auto">
        <div className="w-full max-w-lg">
          {error ? (
            <div class="alert flex flex-row items-center bg-red-200 p-5 rounded border-b-2 border-red-300">
              <div class="alert-icon flex items-center bg-red-100 border-2 border-red-500 justify-center h-10 w-10 flex-shrink-0 rounded-full">
                <span class="text-red-500">
                  <svg fill="currentColor" viewBox="0 0 20 20" class="h-6 w-6">
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </span>
              </div>
              <div class="alert-content ml-4">
                <div class="alert-title font-semibold text-lg text-red-800">
                  Error
                </div>
                <div class="alert-description text-sm text-red-600">
                  Invalid Table.
                </div>
              </div>
            </div>
          ) : values.is_occupied ? (
            <div class="alert flex flex-row items-center bg-red-200 p-5 rounded border-b-2 border-red-300">
              <div class="alert-icon flex items-center bg-red-100 border-2 border-red-500 justify-center h-10 w-10 flex-shrink-0 rounded-full">
                <span class="text-red-500">
                  <svg fill="currentColor" viewBox="0 0 20 20" class="h-6 w-6">
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </span>
              </div>
              <div class="alert-content ml-4">
                <div class="alert-title font-semibold text-lg text-red-800">
                  Error
                </div>
                <div class="alert-description text-sm text-red-600">
                  This table is occupied by someone else.
                </div>
              </div>
            </div>
          ) : (
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="flex flex-col items-center justify-center">
                <div className="cursor-text text-3xl">
                  {values.table_number}
                </div>
                <svg
                  className="w-10 h-10"
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 490.669 490.669"
                  // style="{enable-background:new 0 0 490.669 490.669}"
                >
                  <g>
                    <g>
                      <path
                        d="M373.334,170.676h-256c-5.888,0-10.667,4.779-10.667,10.667s4.779,10.667,10.667,10.667h117.333v132.075l-36.779,18.389
			c-5.269,2.645-7.403,9.045-4.779,14.315c1.899,3.733,5.653,5.888,9.557,5.888c1.6,0,3.221-0.363,4.757-1.131l37.909-18.944
			l37.888,18.944c1.536,0.768,3.157,1.131,4.779,1.131c3.925,0,7.68-2.155,9.557-5.888c2.624-5.269,0.491-11.691-4.779-14.315
			l-36.779-18.389V192.009h117.333c5.888,0,10.667-4.779,10.667-10.667S379.222,170.676,373.334,170.676z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M490.348,349.428l-20.8-83.179l20.971-125.824c0.96-5.803-2.965-11.307-8.768-12.267
			c-5.803-1.045-11.307,2.965-12.267,8.768l-19.84,119.083h-86.976c-5.376,0-9.92,4.011-10.581,9.344l-10.667,85.333
			c-0.725,5.845,3.413,11.179,9.259,11.904c5.888,0.619,11.179-3.435,11.904-9.259l4.16-33.323h94.251l8.661,34.581
			c1.216,4.864,5.547,8.085,10.347,8.085c0.853,0,1.728-0.107,2.603-0.32C488.3,360.927,491.777,355.124,490.348,349.428z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M149.228,350.687l-10.667-85.333c-0.64-5.333-5.184-9.344-10.56-9.344H41.046l-19.84-119.083
			c-0.96-5.803-6.485-9.813-12.267-8.768c-5.824,0.96-9.771,6.464-8.789,12.267l20.971,125.824l-20.8,83.179
			c-1.429,5.717,2.048,11.499,7.765,12.928c0.853,0.213,1.728,0.32,2.581,0.32c4.779,0,9.131-3.221,10.325-8.085l8.661-34.581
			h94.251l4.16,33.323c0.725,5.824,6.016,9.877,11.904,9.259C145.814,361.865,149.953,356.532,149.228,350.687z"
                      />
                    </g>
                  </g>
                </svg>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="name"
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={handleChange("name")}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="phone"
                >
                  Phone
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone"
                  type="text"
                  placeholder="Phone"
                  name="phone"
                  onChange={handleChange("phone_number")}
                />
              </div>

              <div className="flex items-center justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={onSubmit}
                >
                  Sign In
                </button>
              </div>
            </form>
          )}

          {performRedirect()}
        </div>
      </div>
    </div>
  );
}

export default JoinTable;
