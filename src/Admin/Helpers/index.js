import download from "downloadjs";

const {
  API,
  homeData,
  allOrders,
  orderDetail,
  orderStatusUpdate,
  orderHistory,
  orderHistoryExport,
} = require("../Constant");

// export const getStats()
export const login = async (data) => {
  return await fetch(`${API}/login/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getHome = async (token) => {
  return await fetch(homeData, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getAllOrders = async (token) => {
  return await fetch(allOrders, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getOrderDetail = async (token, id) => {
  return await fetch(`${orderDetail}/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateOrderStatus = async (token, data) => {
  return await fetch(orderStatusUpdate, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getOrderHistory = async (token, date) => {
  return await fetch(`${orderHistory}/?date=${date}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const exportExcel = async (token, data) => {
  return await fetch(`${orderHistoryExport}/?date=${data}`, {
    method: "GET",
    headers: {
      Accept:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      Authorization: `Token ${token}`,
    },
  })
    .then((response) => {
      const blob = response.blob();

      // from downloadjs it will download your file
      download(
        blob,
        "file.xlsx",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );

      return { success: "ok" };
    })
    .catch((err) => console.log(err));
};
