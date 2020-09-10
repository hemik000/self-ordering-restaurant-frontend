import React from "react";
import { isAuthenticated } from "../../auth/Customer/helper";
import {
  updateOrderQuantity,
  addOrderItem,
  deleteOrderitem,
  confirmItemOrder,
} from "../Helpers";

function OrderItem({
  id,
  item_id,
  name,
  price,
  quantity,
  final_price,
  ordered,
  setReload = (f) => f,
  reload,
  popMessage = (f) => f,
}) {
  const { token } = isAuthenticated();

  const updateOrder = () => {
    updateOrderQuantity(token, { item_id: id }).then((data) => {
      setReload(!reload);
    });
  };
  const addOrder = () => {
    addOrderItem(token, { item_id: id }).then((data) => {
      setReload(!reload);
    });
  };

  return (
    <li className="border-gray-400 flex flex-row mb-4">
      <div className="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
        {!ordered && (
          <div className="flex-1">
            {/* <div className="flex rounded-md w-10 h-10 bg-green-200 justify-center items-center mr-4 text-green-600 mb-1"> */}
            <button
              className="flex rounded-md w-10 h-10 bg-green-200 hover:bg-green-300 justify-center items-center mr-4 text-green-600 mb-1"
              onClick={() => {
                popMessage();
              }}
              onDoubleClick={() => {
                confirmItemOrder(token, { item_id: item_id }).then((data) => {
                  setReload(!reload);
                });
              }}
            >
              <i className="fas fa-check"></i>
            </button>
            {/* </div> */}
            <button
              className="flex rounded-md w-10 h-10 bg-red-200 hover:bg-red-300 justify-center items-center mr-4 text-red-600"
              onClick={() => {
                deleteOrderitem(token, item_id).then((data) => {
                  // console.log(data);
                  setReload(!reload);
                });
              }}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        )}

        <div className="flex-1 pl-1 mr-16">
          <div className="font-medium">
            {name} {ordered && " x" + quantity}
          </div>
          <div className="text-gray-600 text-sm">Rs. {price}</div>
          <div className="text-gray-600 text-sm">Total: {final_price}</div>
          {/* <div className="text-gray-600 text-sm">{ordered && "Hii"}</div> */}
        </div>
        {/* <div className="text-gray-600 text-xs">Qty {quantity}</div> */}
        {!ordered ? (
          <div className="text-gray-600 text-xs w-20">
            <label
              htmlFor="custom-input-number"
              className="w-full text-gray-700  font-semibold"
            >
              Quantity
            </label>
            <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
              <button
                onClick={updateOrder}
                data-action="decrement"
                className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
              >
                <span className="m-auto text-2xl font-thin">−</span>
              </button>
              <input
                type="number"
                className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                name="custom-input-number"
                value={quantity}
                disabled
              ></input>
              <button
                onClick={addOrder}
                data-action="increment"
                className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
              >
                <span className="m-auto text-2xl font-thin">+</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex rounded-md px-2 h-10 bg-green-200 hover:bg-green-300 justify-center items-center mr-4 text-green-600 mb-1">
            <p className="text-xs">Confirmed</p>
          </div>
        )}
      </div>
    </li>
  );
}

export default OrderItem;
