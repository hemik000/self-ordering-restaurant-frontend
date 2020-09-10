import React from "react";

function CardStats({ customer_today, table_busy, today_sale, this_month }) {
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
                    {customer_today}
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
                <span className="whitespace-no-wrap">Paid</span>
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
                    Table Busy
                  </h5>
                  <span className="font-semibold text-xl text-gray-800">
                    {table_busy}
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
                <span className="whitespace-no-wrap">Customer on Table</span>
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
                    Today
                  </h5>
                  <span className="font-semibold text-xl text-gray-800">
                    Rs. {today_sale}
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
                <span className="whitespace-no-wrap">Sale</span>
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
                    This Month
                  </h5>
                  <span className="font-semibold text-xl text-gray-800">
                    Rs. {this_month}
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
                <span className="whitespace-no-wrap">Sale</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardStats;
