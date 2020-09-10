import React, { useState, useEffect } from "react";
import Base from "../Base";
import OrderItem from "../components/OrderItem";
import { getMyOrder } from "../Helpers";
import { isAuthenticated } from "../../auth/Customer/helper";
import LoadingSVG from "../assets/loading.svg";
import { Link } from "react-router-dom";

function MyOrder() {
  const [myOrders, setMyOrders] = useState({
    order_items: [],
    coupon: [],
  });
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [error, setError] = useState(false);
  const { token } = isAuthenticated();

  useEffect(() => {
    getMyOrder(token).then((data) => {
      if (data.detail) {
        setError(true);
        setLoading(false);
      } else {
        setMyOrders(data);
        setLoading(false);
      }
    });
  }, [reload]);

  const popMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
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
            <div className="px-6">
              {!error && (
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          Rs. {myOrders.cgst}
                        </span>
                        <span className="text-sm text-gray-500">CGST</span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          Rs. {myOrders.sgst}
                        </span>
                        <span className="text-sm text-gray-500">SGST</span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          Rs. {myOrders.grand_total}
                        </span>
                        <span className="text-sm text-gray-500">Sub Total</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {error && (
                <div className="w-full flex justify-center align-center my-4">
                  <div>
                    <i className="fas fa-utensils"></i>
                  </div>
                  <div className="pl-3">No Orders Yet.</div>
                </div>
              )}
              {loading && (
                <div className="w-full flex justify-center my-4">
                  <img
                    className="w-10 h-10"
                    src={LoadingSVG}
                    alt="Loading..."
                  />
                </div>
              )}
              <div className="container flex flex-col mx-auto w-full items-center justify-center">
                <ul className="flex flex-col p-4">
                  {myOrders.order_items.length > 0 &&
                    myOrders.order_items.map((item, index) => (
                      <OrderItem
                        key={item.id}
                        id={item.item.id}
                        item_id={item.id}
                        name={item.item.name}
                        price={item.item.price}
                        quantity={item.quantity}
                        final_price={item.final_price}
                        ordered={item.ordered}
                        setReload={setReload}
                        reload={reload}
                        popMessage={popMessage}
                      />
                    ))}
                </ul>
                {!loading ? (
                  !error && isAllOrderConfirmed() ? (
                    <Link to="/payment">
                      <button
                        className="text-pink-500 bg-transparent border border-solid border-pink-500 hover:bg-pink-500 hover:text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 mb-5 rounded outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        <i className="fas fa-rupee-sign"></i> Proceed To Payment
                      </button>
                    </Link>
                  ) : (
                    <p className="font-bold uppercase text-xs px-4 py-2 mb-5 mr-1 mb-1">
                      One of your order is not confirmed.
                    </p>
                  )
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="fixed flex justify-center top-0 inset-x-0 m-6">
        <div
          className={
            (!showMessage
              ? "hidden transition-display duration-200 ease-out"
              : null) +
            " animate-bounce bg-white rounded-lg border-gray-300 border p-3 shadow-lg"
          }
        >
          <div className="flex flex-row">
            <div className="px-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 1792 1792"
                fill="#44C997"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1299 813l-422 422q-19 19-45 19t-45-19l-294-294q-19-19-19-45t19-45l102-102q19-19 45-19t45 19l147 147 275-275q19-19 45-19t45 19l102 102q19 19 19 45t-19 45zm141 83q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" />
              </svg>
            </div>
            <div className="ml-2 mr-6">
              <span className="font-semibold">
                Double Click to confirm order
              </span>
              <span className="block text-xs text-gray-500">
                Once orderd won't be cancled
              </span>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
}

export default MyOrder;
