import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from ".";

function AdminRoutes({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/admin/login/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default AdminRoutes;
