import React, { useState, useEffect } from "react";
import Base from "../Base";
import { isAuthenticated } from "../../auth/Customer/helper";
import {
  getMyOrder,
  removeDiscountCoupon,
  addDiscountCoupon,
  updatePayemntType,
  checkOTP,
  payCash,
} from "../Helpers";
import Payment from "../components/Payment";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Bill() {
  const [myOrders, setMyOrders] = useState({
    id: "",
    order_items: [],
    coupon: [],
  });
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [paymentType, setPaymentType] = useState("online");
  const [showCodeBox, setShowCodeBox] = useState(false);
  const { token, phone_number } = isAuthenticated();
  const [couponCode, setCouponCode] = useState("");
  const [modelError, setModelError] = useState("");
  const [otp, setOtp] = useState();
  const [otpError, setOtpError] = useState(false);
  const [didRedirect, setDidRedirect] = useState(false);

  const history = useHistory();

  useEffect(() => {
    getMyOrder(token).then((data) => {
      setMyOrders(data);
      setLoading(false);
      setPaymentType(data.payment_type);
    });
  }, [reload]);

  const makeCashPayment = () => {
    payCash(token, {
      invoice_no: myOrders.invoice_no,
      amount: myOrders.grand_total,
    }).then((data) => {
      if (data.error) {
        alert("Something Went Wrong");
      } else {
        setDidRedirect(true);
      }
    });
  };

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
    if (!isAllOrderConfirmed()) {
      return <Redirect to="/" />;
    }
  };

  const isAllOrderConfirmed = () => {
    return myOrders.order_items.every((o) => {
      return o["ordered"] === true;
    });
  };

  return (
    <Base>
      <section className="relative py-16 bg-gray-300">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="w-full mx-auto xl:w-8/12 my-12 xl:mb-0 px-4">
              <div className="relative  bg-gray-300 flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                      <h3 className="font-semibold text-base text-gray-800">
                        Bill Detail
                      </h3>
                    </div>
                    <div class="inline-block relative">
                      <select
                        value={paymentType}
                        onChange={(e) => {
                          if (e.target.value === "online" && myOrders.coupon) {
                            removeDiscountCoupon(token, {
                              paymentType: paymentType,
                            });
                            updatePayemntType(token, {
                              payment_type: e.target.value,
                            });
                            setReload(!reload);
                          } else if (e.target.value === "cash") {
                            updatePayemntType(token, {
                              payment_type: e.target.value,
                            });
                          } else if (e.target.value === "online") {
                            updatePayemntType(token, {
                              payment_type: e.target.value,
                            });
                          }
                          setPaymentType(e.target.value);
                        }}
                        class="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value="online">Pay Online</option>
                        <option value="cash">Pay Cash</option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          class="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                      <h3 className="font-semibold text-base text-gray-800">
                        Invoice No: {myOrders.invoice_no}
                      </h3>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                      <h3 className="font-semibold text-base text-gray-800">
                        Date and Time: {myOrders.created_at}
                      </h3>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center">
                    {paymentType === "cash" && myOrders.coupon === null && (
                      <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <button
                          className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                          onClick={() => {
                            setShowCodeBox(true);
                          }}
                        >
                          Enter Coupon
                        </button>
                      </div>
                    )}
                    {paymentType === "cash" && myOrders.coupon !== null && (
                      <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <button
                          className="bg-red-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                          onClick={() => {
                            removeDiscountCoupon(token, {
                              paymentType: paymentType,
                            }).then((data) => {
                              setReload(!reload);
                              setPaymentType(data.paymentType);
                            });
                          }}
                        >
                          Remove Coupon
                        </button>
                      </div>
                    )}
                    {showCodeBox && (
                      <div class="inline-block relative">
                        <input
                          onChange={(e) => {
                            setCouponCode(e.target.value);
                          }}
                          type="text"
                          placeholder="Placeholder"
                          class="px-2 py-1 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pr-10"
                        />
                        <button
                          onClick={() => {
                            addDiscountCoupon(token, {
                              code: couponCode,
                              paymentType: paymentType,
                            }).then((data) => {
                              if (data.detail) {
                                setModelError(data.detail);
                              } else {
                                setModelError("");
                                setShowCodeBox(false);
                                setReload(!reload);
                                setPaymentType(data.paymentType);
                              }
                            });
                          }}
                          className="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-2 py-1"
                        >
                          {/* <span class=""> */}
                          <i class="fas fa-arrow-right"></i>
                          {/* </span> */}
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                      <h3 className="font-semibold text-red text-gray-800">
                        {modelError}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="block w-full overflow-x-auto">
                  {/* Projects table */}
                  <table className="items-center w-full bg-transparent border-collapse">
                    <thead className="">
                      <tr>
                        <th className="px-6 bg-gray-200 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                          Dish Name
                        </th>
                        <th className="px-6 bg-gray-200 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                          Qty
                        </th>
                        <th className="px-6 bg-gray-200 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                          Mrp
                        </th>
                        <th className="px-6 bg-gray-200 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {myOrders.order_items.length > 0 &&
                        myOrders.order_items.map((item, index) => (
                          <tr>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                              {item.item.name}
                            </th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                              {item.quantity}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                              Rs {item.item.price}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                              Rs {item.final_price}
                            </td>
                          </tr>
                        ))}
                      <tr>
                        <th
                          colSpan="3"
                          className="border-t-0 bg-gray-200 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
                        >
                          Total
                        </th>

                        <td className="border-t-0 bg-gray-200 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                          Rs {myOrders.total}
                        </td>
                      </tr>
                      {myOrders.coupon && (
                        <tr>
                          <th
                            colSpan="3"
                            className="border-t-0  px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
                          >
                            Coupon Discount ({myOrders.coupon.percent}%)
                          </th>

                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            Rs {myOrders.discount}
                          </td>
                        </tr>
                      )}
                      <tr>
                        <th
                          colSpan="3"
                          className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
                        >
                          CGST (2.5%)
                        </th>

                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                          Rs {myOrders.cgst}
                        </td>
                      </tr>
                      <tr>
                        <th
                          colSpan="3"
                          className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
                        >
                          SGST (2.5%)
                        </th>

                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                          Rs {myOrders.sgst}
                        </td>
                      </tr>
                      <tr>
                        <th
                          colSpan="3"
                          className="border-t-0 bg-gray-200 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
                        >
                          Net Bill Value
                        </th>

                        <td className="border-t-0 bg-gray-200 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                          Rs {myOrders.grand_total}
                        </td>
                      </tr>
                      {paymentType === "cash" && (
                        <tr>
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                            Enter OTP:
                          </th>

                          <td
                            colSpan="2"
                            className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                          >
                            <div class="mb-1 pt-0">
                              <input
                                onChange={(e) => {
                                  setOtp(e.target.value);
                                }}
                                value={otp}
                                type="number"
                                placeholder="Enter OTP"
                                class="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                              />
                              <p
                                class={
                                  !otpError
                                    ? "hidden"
                                    : null + " text-red-500 text-xs italic"
                                }
                              >
                                Incorrect OTP
                              </p>
                            </div>
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            <button
                              onClick={() => {
                                checkOTP(token, {
                                  otp: otp,
                                }).then((data) => {
                                  if (data.error) {
                                    setOtpError(true);
                                  } else {
                                    setOtpError(false);
                                    makeCashPayment();
                                  }
                                });
                              }}
                              class="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                              type="button"
                              style={{ transition: "all .15s ease" }}
                              disabled={!otp ? true : false}
                            >
                              Pay Bill
                            </button>
                          </td>
                        </tr>
                      )}
                      {paymentType === "online" && (
                        <tr>
                          <th
                            colSpan="3"
                            className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
                          ></th>

                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            {console.log(myOrders)}
                            {myOrders.id !== "" && (
                              <Payment
                                data={JSON.stringify({
                                  order_id: myOrders.id,
                                  phone_number: phone_number,
                                })}
                              />
                            )}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {performRedirect()}
    </Base>
  );
}

export default Bill;
