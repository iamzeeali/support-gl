import React from "react";
import { Switch } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
//Components
import Dashboard from "../dashboard/Dashboard";

import Activity from "../activity/Activity";
import AddActivity from "../activity/AddActivity";
import EditActivity from "../activity/EditActivity";

import Company from "../company/Company";
import AddCompany from "../company/AddCompany";
import EditCompany from "../company/EditCompany";

import AddRequest from "../request/AddRequest";

const Routes = () => {
  return (
    <section className="container">
      <Switch>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/activity" component={Activity} />
        <PrivateRoute exact path="/addActivity" component={AddActivity} />
        <PrivateRoute
          exact
          path={`/editActivity/:id`}
          component={EditActivity}
        />
        <PrivateRoute exact path="/company" component={Company} />
        <PrivateRoute exact path="/addCompany" component={AddCompany} />
        <PrivateRoute exact path={`/editCompany/:id`} component={EditCompany} />

        <PrivateRoute exact path={"/addRequest"} component={AddRequest} />
      </Switch>
    </section>
  );
};

export default Routes;
