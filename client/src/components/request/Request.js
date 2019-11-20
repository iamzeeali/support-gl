import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import Spinner from "../UI/Spinner";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import SuperAdminRequest from "./SuperAdminRequest";
import UserRequest from "./UserRequest";

const Request = ({ auth: { isAuthenticated, loading, role } }) => {
  let request;
  if (isAuthenticated && role === "super-admin") {
    request = <SuperAdminRequest />;
  } else {
    request = <UserRequest />;
  }

  return (
    <Fragment>
      {!loading ? <Fragment>{request}</Fragment> : <Spinner />}
    </Fragment>
  );
};

Request.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(Request));
