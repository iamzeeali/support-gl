import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import AdminRequest from "./AdminRequest";
import UserRequest from "./UserRequest";

const Request = ({ auth: { isAuthenticated, loading, role } }) => {
  return (
    <Fragment>
      {!loading && (
        <Fragment>
          {isAuthenticated && role === "admin" ? (
            <AdminRequest />
          ) : (
            <UserRequest />
          )}
        </Fragment>
      )}
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
