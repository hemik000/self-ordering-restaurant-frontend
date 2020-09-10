export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("customer", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("customer")) {
    return JSON.parse(localStorage.getItem("customer"));
  } else {
    return false;
  }
};
