import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Sidebar from "./Sidebar";
import routes from "./routes";

const Emails = () => {
  const loading = () => (
    <div className="animated fadeIn pt-1 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  );
  return (
    <div className="animated fadeIn">
      <div className="email-app mb-4">
        <Sidebar />
        <Suspense fallback={loading()}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component ? (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => <route.component {...props} />}
                />
              ) : null;
            })}
          </Switch>
        </Suspense>
      </div>
    </div>
  );
};

export default Emails;
