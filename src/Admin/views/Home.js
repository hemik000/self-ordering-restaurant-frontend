import React, { useState, useEffect } from "react";
import Base from "../Base";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";

import Header from "../components/Header";
import CardStats from "../components/CardStats";
import Footer from "../components/Footer";
import { isAuthenticated } from "../../auth/Admin/helper";
import { getAllOrders, getHome } from "../Helpers";
import LoadingSVG from "../assets/loading.svg";
import { Link } from "react-router-dom";

function Home() {
  const [myStats, setMyStats] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [homeStats, sethomeStats] = useState({
    stats: [],
    orders: [],
    order_items: [],
  });

  const { token } = isAuthenticated();

  useEffect(() => {
    getHome(token).then((data) => {
      sethomeStats(data);
      setIsLoading(false);
    });

    // getAllOrders(token).then((data) => {
    //   if (data.detail) {
    //   } else {
    //     setAllOrders(data);
    //     setOrdersLoading(false);
    //   }
    // });
  }, []);

  return (
    <Base>
      <Header>
        {isLoading ? (
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
        )}
      </Header>
      {console.log(homeStats)}
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        {/* <div className="flex flex-wrap">
          <LineChart />
          <BarChart />
        </div> */}
        <div className="flex flex-wrap mt-4">
          <div className="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-gray-800">
                      Table Details
                    </h3>
                  </div>
                  {/* <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                    <button
                      className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                    >
                      See all
                    </button>
                  </div> */}
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
                          Table Number
                        </th>
                        <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                          Customer
                        </th>
                        <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                          Orders
                        </th>
                        {/* <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        Bounce rate
                      </th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {homeStats.orders.map((order, index) => (
                        <tr key={order.id}>
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                            <Link to={`/admin/order/${order.id}`}>
                              {order.table}
                            </Link>
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            {order.customer}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            {order.orders}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
          <div className="w-full xl:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-gray-800">
                      Recent Orders
                    </h3>
                  </div>
                  {/* <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                    <button
                      className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                    >
                      See all
                    </button>
                  </div> */}
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
                    <thead className="thead-light">
                      <tr>
                        <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                          Status
                        </th>
                        <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                          Item
                        </th>
                        <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                          Table
                        </th>
                        <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                          QTY
                        </th>

                        {/* <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                          Status
                        </th> */}
                        {/* <th
                        className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                        style={{ minWidth: "140px" }}
                      ></th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {homeStats.order_items.map((item, index) => (
                        <tr>
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                            <input
                              type="checkbox"
                              class="form-checkbox h-5 w-5 text-pink-600"
                            />
                            {/* <span class="ml-2 text-gray-700"></span> */}
                          </th>
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                            {item.item}
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            {item.table}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            {item.quantity}
                          </td>
                          {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            {item.status}
                          </td> */}
                        </tr>
                      ))}
                      {/* <tr>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                      Facebook
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      5,480
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        <div className="flex items-center">
                        <span className="mr-2">70%</span>
                        <div className="relative w-full">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-green-200">
                            <div
                            style={{ width: "70%" }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                            ></div>
                            </div>
                            </div>
                        </div>
                        </td>
                    </tr>
                    <tr>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                      Google
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        4,807
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        <div className="flex items-center">
                        <span className="mr-2">80%</span>
                          <div className="relative w-full">
                          <div className="overflow-hidden h-2 text-xs flex rounded bg-purple-200">
                              <div
                                style={{ width: "80%" }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
                              ></div>
                              </div>
                          </div>
                          </div>
                          </td>
                    </tr>
                    <tr>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                      Instagram
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        3,678
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      <div className="flex items-center">
                          <span className="mr-2">75%</span>
                          <div className="relative w-full">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                            <div
                                style={{ width: "75%" }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                                ></div>
                            </div>
                            </div>
                        </div>
                        </td>
                    </tr>
                    <tr>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                    twitter
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    2,645
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      <div className="flex items-center">
                      <span className="mr-2">30%</span>
                      <div className="relative w-full">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-orange-200">
                            <div
                            style={{ width: "30%" }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                            ></div>
                            </div>
                          </div>
                          </div>
                          </td>
                    </tr> */}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Base>
  );
}

export default Home;
