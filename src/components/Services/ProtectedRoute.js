import React from "react";

import { Suspense } from "react";
import { Route } from "react-router-dom";
import Loader from "../../template/Loader/Loader";
import AppHeader from "../../template/AppHeader/AppHeader";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, title, ...rest }) => {
  const mode = useSelector * ((state) => state.mode.value);

  return (
    <div>
      <AppHeader />
      <div
        className={mode}
        style={{
          minHeight: "100vh",
          width: "100%",
          margin: "auto",
        }}
      >
        <Route
          {...rest}
          render={(props) => {
            return (
              <>
                <Suspense fallback={<Loader />}>
                  {/* <AppBreadcrumb title={title} /> */}
                  <Component {...props} />
                </Suspense>
              </>
            );
          }}
        />
      </div>
    </div>
  );
};

export default ProtectedRoute;
