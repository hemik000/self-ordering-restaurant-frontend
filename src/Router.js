import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import JoinSession from "./Customer/views/JoinSession";
import JoinTable from "./Customer/views/JoinTable";
import Menu from "./Customer/views/Menu";
import Dashboard from "./Admin/views/Dashboard";
import MyOrder from "./Customer/views/MyOrder";
import PrivateRoutes from "./auth/Customer/helper/PrivateRoutes";
import Bill from "./Customer/views/Bill";
import ThankYou from "./Customer/views/ThankYou";
import Home from "./Admin/views/Home";
import Login from "./Admin/views/Login";
import AdminRoutes from "./auth/Admin/helper/AdminRoutes";
import OrderDetail from "./Admin/views/OrderDetail";
import OrderHistory from "./Admin/views/OrderHistory";
function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={JoinSession} />
        <Route path="/table/:tableID" exact component={JoinTable} />
        <Route path="/thankyou" component={ThankYou} />
        <PrivateRoutes path="/menu" exact component={Menu} />
        <PrivateRoutes path="/order" exact component={MyOrder} />
        <PrivateRoutes path="/payment" exact component={Bill} />

        {/* Admin Routes */}

        <Route path="/admin/login" exact component={Login} />
        <AdminRoutes path="/admin" exact component={Home} />
        <AdminRoutes
          path="/admin/order/:orderID"
          exact
          component={OrderDetail}
        />
        <AdminRoutes
          path="/admin/order-history"
          exact
          component={OrderHistory}
        />
        {/* <Redirect from="/" to="/profile" /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
