import React, { useState, useEffect } from "react";
import Base from "../Base";
import Header from "../components/Header";
import LoadingSVG from "../assets/loading.svg";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { isAuthenticated } from "../../auth/Admin/helper";
import { getOrderDetail } from "../Helpers";
import CardOrder from "../components/CardOrder";
import OrderItems from "../components/OrderItems";
function OrderDetail({ match }) {
  const [orderDetail, setOrderDetail] = useState({
    order_items: [],
    coupon: [],
  });
  const { token } = isAuthenticated();

  const { orderID } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getOrderDetail(token, orderID).then((data) => {
      if (data.detail) {
      } else {
        setOrderDetail(data);
        setIsLoading(false);
      }
    });
  }, [reload]);

  return (
    <Base>
      <Header>
        {isLoading ? (
          <div className="w-full flex justify-center my-4">
            <img className="w-10 h-10" src={LoadingSVG} alt="Loading..." />
          </div>
        ) : (
          <CardOrder
            customer_name={orderDetail.customer}
            table_number={orderDetail.table}
            total_order={orderDetail.item_count}
            today_bill={orderDetail.grand_total ? orderDetail.grand_total : 0}
            invoice_no={orderDetail.invoice_no}
            otp={orderDetail.otp}
            token={orderDetail.customer_token}
          />
        )}
      </Header>
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <div className="flex flex-wrap mt-4">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-gray-800">
                      Orders
                    </h3>
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
                          Dish Name
                        </th>
                        <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                          QTY
                        </th>
                        <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                          Orderd
                        </th>
                        {/* <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        Bounce rate
                      </th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetail.order_items.map((order, index) => (
                        <OrderItems
                          key={index}
                          id={order.id}
                          item_name={order.item.name}
                          quantity={order.quantity}
                          ordered={order.ordered}
                          setReload={setReload}
                          reload={reload}
                        />
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
          <div className="w-full xl:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-gray-800">
                      Bill Detail
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
                          Bill Type
                        </th>
                        <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                          Amount
                        </th>
                        {/* <th
                        className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                        style={{ minWidth: "140px" }}
                      ></th> */}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                          Total
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                          {orderDetail.total}
                        </td>
                      </tr>
                      <tr>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                          Discount
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                          {orderDetail.discount}
                        </td>
                      </tr>
                      <tr>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                          CGST
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                          {orderDetail.cgst}
                        </td>
                      </tr>
                      <tr>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                          SGST
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                          {orderDetail.sgst}
                        </td>
                      </tr>
                      <tr>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                          Net Bill
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                          {orderDetail.grand_total}
                        </td>
                      </tr>
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

export default OrderDetail;
