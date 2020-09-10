import React from "react";
import { isAuthenticated } from "../../auth/Admin/helper";
import { updateOrderStatus } from "../Helpers";

function OrderItems({
  id,
  item_name,
  quantity,
  ordered,
  setReload = (f) => f,
  reload,
}) {
  const { token } = isAuthenticated();

  return (
    <tr>
      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
        {item_name}
      </th>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
        {quantity}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
        {ordered ? (
          <div className="text-green-500">
            <button
              onDoubleClick={() => {
                updateOrderStatus(token, { item_id: id }).then((data) => {
                  setReload(!reload);
                });
              }}
              className="flex rounded-md w-5 h-5 bg-green-200 hover:bg-green-300 justify-center items-center mr-4 text-green-600"
            >
              <i class="fas fa-check"></i>
            </button>
          </div>
        ) : (
          <div className="text-red-500">
            {/* <button className="flex rounded-md w-5 h-5 bg-red-200 hover:bg-red-300 justify-center items-center mr-4 text-red-600"> */}
            <i class="fas fa-times"></i>
            {/* </button> */}
          </div>
        )}
      </td>
    </tr>
  );
}

export default OrderItems;
