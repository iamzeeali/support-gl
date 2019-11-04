import React from "react";
import { Switch } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
//Components
import Dashboard from "../dashboard/Dashboard";
import Activity from "../activity/Activity";
import AddActivity from "../activity/AddActivity";
import EditActivity from "../activity/EditActivity";

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
      </Switch>
    </section>
  );
};

export default Routes;
