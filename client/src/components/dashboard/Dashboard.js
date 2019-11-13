import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

const Dashboard = ({ auth: { isAuthenticated, loading, role } }) => {
  return (
    <Fragment>
      {!loading && (
        <Fragment>
          {isAuthenticated && role === "admin" ? (
            <AdminDashboard />
          ) : (
            <UserDashboard />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(Dashboard));
