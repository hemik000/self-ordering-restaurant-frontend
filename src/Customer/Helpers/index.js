import {
  createCutomer,
  joinTableSession,
  getTable,
  getAllMenu,
  addToCart,
  myOrder,
  updateQuantity,
  addItem,
  removeCoupon,
  addCoupon,
  deleteItem,
  confirmItem,
  listCategory,
  paymentType,
  confirmOTP,
  cashPay,
} from "../../Constant";

export const createACustomer = (customer) => {
  return fetch(createCutomer, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const checkCustomerToken = (token) => {
  return fetch(`${joinTableSession}/${token}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getTableDetail = (tableID) => {
  return fetch(`${getTable}/${tableID}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getMenu = async (category, type) => {
  return await fetch(`${getAllMenu}?category=${category}&type=${type}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const makeOrder = (token, data) => {
  return fetch(addToCart, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Customer-Token": token,
      //   "Access-Control-Allow-Headers": "Customer-Token",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getMyOrder = async (token) => {
  return await fetch(myOrder, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Customer-Token": token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateOrderQuantity = async (token, item_id) => {
  return await fetch(updateQuantity, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Customer-Token": token,
      //   "Access-Control-Allow-Headers": "Customer-Token",
    },
    body: JSON.stringify(item_id),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteOrderitem = async (token, item_id) => {
  return await fetch(`${deleteItem}/${item_id}/delete`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Customer-Token": token,
      //   "Access-Control-Allow-Headers": "Customer-Token",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const addOrderItem = async (token, item_id) => {
  return await fetch(addItem, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Customer-Token": token,
      //   "Access-Control-Allow-Headers": "Customer-Token",
    },
    body: JSON.stringify(item_id),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const confirmItemOrder = async (token, item_id) => {
  return await fetch(confirmItem, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Customer-Token": token,
      //   "Access-Control-Allow-Headers": "Customer-Token",
    },
    body: JSON.stringify(item_id),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const addDiscountCoupon = async (token, data) => {
  return await fetch(addCoupon, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Customer-Token": token,
      //   "Access-Control-Allow-Headers": "Customer-Token",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const removeDiscountCoupon = async (token, paymentType) => {
  return await fetch(removeCoupon, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Customer-Token": token,
      //   "Access-Control-Allow-Headers": "Customer-Token",
    },
    body: JSON.stringify(paymentType),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getCategory = async () => {
  return await fetch(listCategory, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updatePayemntType = async (token, data) => {
  return await fetch(paymentType, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Customer-Token": token,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const checkOTP = async (token, data) => {
  return await fetch(confirmOTP, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Customer-Token": token,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const payCash = async (token, data) => {
  return await fetch(cashPay, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Customer-Token": token,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
