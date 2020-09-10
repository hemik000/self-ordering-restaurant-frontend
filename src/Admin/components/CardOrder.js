import React from "react";

function CardStats({
  customer_name,
  table_number,
  total_order,
  today_bill,
  invoice_no,
  otp,
  token
}) {
  return (
    <div>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap">
                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <h5 className="text-gray-500 uppercase font-bold text-xs">
                    Customer
                  </h5>
                  <span className="font-semibold text-xl text-gray-800">
                    {customer_name}
                  </span>
                </div>
                <div className="relative w-auto pl-4 flex-initial">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                    <i className="fas fa-users"></i>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                {/* <span className="text-green-500 mr-2">
                    <i className="fas fa-arrow-up"></i> 3.48%
                  </span> */}
                <span className="whitespace-no-wrap">
                  Table No. {table_number}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap">
                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <h5 className="text-gray-500 uppercase font-bold text-xs">
                    Orders
                  </h5>
                  <span className="font-semibold text-xl text-gray-800">
                    {total_order}
                  </span>
                </div>
                <div className="relative w-auto pl-4 flex-initial">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500">
                    <i className="fas fa-utensils"></i>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                {/* <span className="text-red-500 mr-2">
                    <i className="fas fa-arrow-down"></i> 3.48%
                  </span> */}
                <span className="whitespace-no-wrap">Total Orders</span>
              </p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap">
                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <h5 className="text-gray-500 uppercase font-bold text-xs">
                    Total
                  </h5>
                  <span className="font-semibold text-xl text-gray-800">
                    Rs. {today_bill}
                  </span>
                </div>
                <div className="relative w-auto pl-4 flex-initial">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-pink-500">
                    <i className="fas fa-rupee-sign"></i>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                {/* <span className="text-orange-500 mr-2">
                    <i className="fas fa-arrow-down"></i> 1.10%
                  </span> */}
                <span className="whitespace-no-wrap">
                  Invoice No. {invoice_no}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap">
                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <h5 className="text-gray-500 uppercase font-bold text-xs">
                    OTP
                  </h5>
                  <span className="font-semibold text-xl text-gray-800">
                    {otp}
                  </span>
                </div>
                <div className="relative w-auto pl-4 flex-initial">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-blue-500">
                    <i className="fas fa-rupee-sign"></i>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                {/* <span className="text-green-500 mr-2">
                    <i className="fas fa-arrow-up"></i> 12%
                  </span> */}
                <span className="whitespace-no-wrap">Token: {token}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardStats;
