import React from "react";
import { isAuthenticated } from "../../auth/Customer/helper";
import { addOrderItem } from "../Helpers";

function MenuItem({ id, name, price, image, popMessage = (f) => f, type }) {
  const { token } = isAuthenticated();

  const addOrder = () => {
    addOrderItem(token, { item_id: id }).then((data) => {
      popMessage();
    });
  };

  return (
    <div className="w-full lg:w-4/12 px-4 lg:order-1">
      <div className="flex flex-col justify-center items-center max-w-sm mx-auto my-4">
        <div
          style={{ backgroundImage: `url(${image})` }}
          className="bg-gray-300 h-64 w-full rounded-lg shadow-md bg-cover bg-center"
        ></div>
        <div className="w-56 md:w-64 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden">
          <div className="py-2 flex justify-center align-center text-center font-bold uppercase tracking-wide text-gray-800">
            <div className="w-11/12">{name}</div>

            <div
              className={
                "text-" + (type === "V" ? "green" : "red") + "-600 w-1/12 mr-1"
              }
            >
              <i className="far fa-dot-circle"></i>
            </div>
          </div>
          <div className="flex items-center justify-between py-2 px-3 bg-gray-400">
            <h1 className="text-gray-800 font-bold ">Rs. {price}</h1>
            <button
              onClick={addOrder}
              className=" bg-gray-800 text-xs text-white px-2 py-1 font-semibold rounded uppercase hover:bg-gray-700"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
    // <div className="bg-gray-300 shadow rounded lg:w-64 my-4">
    //   <div
    //     style={{ backgroundImage: `url(${image})` }}
    //     className="h-40 bg-gray-200 bg-cover bg-center rounded-t-lg flex items-center justify-center"
    //   >
    //     {/* <p className="text-white font-bold text-4xl">Profile</p> */}
    //   </div>
    //   {/* <div className="flex justify-center mt-4">
    //     <img
    //       className="shadow sm:w-12 sm:h-12 w-10 h-10 rounded-full"
    //       src={image}
    //       alt="Avatar"
    //     />
    //   </div> */}
    //   <div className="px-6 py-3">
    //     <div className="text-center">
    //       <p className="text-gray-600 font-bold">{name}</p>
    //       {/* <p className="text-sm font-hairline text-gray-600 mt-1">Subtitle</p> */}
    //     </div>
    //     <div className="flex justify-around text-center mt-2">
    //       <div>
    //         <p className="text-xs mt-2 text-gray-600 font-hairline">Rs.</p>
    //         <p className="text-gray-700 font-bold">{price}</p>
    //       </div>
    //       {/* <div>
    //         <p className="text-xs mt-2 text-gray-600 font-hairline">Likes</p>
    //         <p className="text-gray-700 font-bold">99k</p>
    //       </div> */}
    //       {/*<div>
    //         <p className="text-gray-700 font-bold">530</p>
    //         <p className="text-xs mt-2 text-gray-700 font-hairline">Shares</p>
    //       </div> */}
    //     </div>
    //     <div className="mt-6">
    //       <button className="rounded shadow-md w-full items-center shadow bg-blue-500 px-4 py-2 text-white hover:bg-blue-400">
    //         Order
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
}

export default MenuItem;
