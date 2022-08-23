import React from "react";
import { Route, Redirect } from "react-router-dom";
import {PAGES} from "../../constants/pages";


const RouteWrapper = ({ component: Component, restricted, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        restricted ? (
          <Component {...props} />
        ) : (
          <Redirect to={PAGES.INTERVIEW_PAGE.path} />
        )
      }
    />
  );
};

export default RouteWrapper;
