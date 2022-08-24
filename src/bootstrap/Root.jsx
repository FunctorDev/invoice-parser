import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import {PAGES} from "../constants/pages";
import InvoiceParser from "../modules/InvoiceParser";
import RouteWrapper from "../components/route";

const Root = () => {
  const publicPages = [
    {
      path: PAGES.INTERVIEW_PAGE.path,
      component: InvoiceParser,
      exact: true,
    },
  ];

  return (
    <Switch>
      <React.Fragment>
        {publicPages.map((props) => (
          <RouteWrapper key={props.path} restricted {...props} />
        ))}

        <Route exact path="/">
          <Redirect to={PAGES.INTERVIEW_PAGE.path} />
        </Route>
      </React.Fragment>
    </Switch>
  );
};

export default Root;