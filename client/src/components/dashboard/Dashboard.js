import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SuperAdminDashboard from "./SuperAdminDashboard";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

const Dashboard = ({ auth: { isAuthenticated, loading, role }, requests }) => {
  let dashboard;
  if (isAuthenticated && role === "super-admin") {
    dashboard = <SuperAdminDashboard />;
  } else if (isAuthenticated && role === "admin") {
    dashboard = <AdminDashboard />;
  } else {
    dashboard = <UserDashboard />;
  }

  return <Fragment>{dashboard}</Fragment>;
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  requests: state.request.requests
});

export default connect(mapStateToProps)(withRouter(Dashboard));
