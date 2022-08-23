import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import classes from "./pages.module.scss";
import classNames from "classnames";

import RouteWrapper from "../components/route";
import {PAGES} from "../constants/pages";
import Interview from "./interview";

function Pages() {

  const publicPages = [
    {
      path: PAGES.INTERVIEW_PAGE.path,
      component: Interview,
      exact: true,
    },
  ];

  return (
    <div className={classNames(classes.Wrap, "no-select")}>
      <Switch>
        <React.Fragment>
          {publicPages.map((props) => (
            <RouteWrapper key={props.path} restricted {...props} />
          ))}
          <div className={classNames(classes.PaddingWrap)}>
            <Route exact path="/">
              <Redirect to={PAGES.INTERVIEW_PAGE.path} />
            </Route>
          </div>
        </React.Fragment>
      </Switch>
    </div>
  );
}

export default Pages;
