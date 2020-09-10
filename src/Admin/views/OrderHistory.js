import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Base from "../Base";
import Header from "../components/Header";
import LoadingSVG from "../assets/loading.svg";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { getOrderHistory, exportExcel } from "../Helpers";
import { isAuthenticated } from "../../auth/Admin/helper";

function OrderHistory() {
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState(new Date());
  const { token } = isAuthenticated();
  const [allOrders, setAllOrders] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    getOrderHistory(
      token,
      `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    ).then((data) => {
      if (data.detail) {
      } else {
        setAllOrders(data);
        setIsLoading(false);
      }
    });
  }, [date]);

  const handleChange = (date) => {
    setDate(date);
  };

  const handleExport = () => {
    exportExcel(
      token,
      `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    ).then((data) => {
      // if (data.detail) {
      // } else {
      //   popMessage();
      // }
    });
  };

  const popMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <Base>
      <Header>
        {/* {isLoading ? (
          <div className="w-full flex justify-center my-4">
            <img className="w-10 h-10" src={LoadingSVG} alt="Loading..." />
          </div>
        ) : (
          <CardStats
            customer_today={homeStats.stats[0].customer_today}
            table_busy={homeStats.stats[0].table_busy}
            today_sale={homeStats.stats[0].today ? myStats.today : 0}
            this_month={homeStats.stats[0].thismonth}
          />
        )} */}
      </Header>

      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        {/* <div className="flex flex-wrap">
          <LineChart />
          <BarChart />
        </div> */}
        <div className="flex flex-wrap mt-4">
          <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-gray-800">
                      Table Details
                    </h3>
                  </div>
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                    <button
                      className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={handleExport}
                    >
                      See all
                    </button>

                    <DatePicker
                      selected={date}
                      onChange={handleChange}
                      dateFormat="dd-MM-yyyy"
                      className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
                    />
                  </div>
                </div>
              </div>
              <div className="block w-full overflow-x-auto">
                {/* Projects table */}
                {isLoading ? (
                  <div className="w-full flex justify-center my-4">
                    <img
                      className="w-10 h-10"
                      src={LoadingSVG}
                      alt="Loading..."
                    />
                  </div>
                ) : (
                  <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                      <tr>
                        <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                          Invoice No
                        </th>
                        <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                          Customer
                        </th>
                        <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                          SGST
                        </th>
                        <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                          CGST
                        </th>
                        <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                          Amount Paid
                        </th>
                        <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                          Transaction ID
                        </th>
                        {/* <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        Bounce rate
                      </th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {allOrders.map((order, index) => (
                        <tr key={order.id}>
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                            {/* <Link to={`/admin/order/${order.id}`}> */}
                            {order.invoice_no}
                            {/* </Link> */}
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            {order.customer}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            {order.sgst}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            {order.cgst}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            {order.grand_total}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            {order.payment}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
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
                <span className="font-semibold">Check your downloads.</span>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Base>
  );
}

export default OrderHistory;
