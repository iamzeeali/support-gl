import React, { Fragment } from "react";
import styles from "./dashboard.module.css";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const UserDashboard = ({ auth: { username } }) => {
  return (
    <div className={styles.dashboard}>
      <h1 className={`display-4`}> Dashboard</h1>
      <p className="lead">
        Welcome <b>{username}</b>
      </p>
      <div className={styles.dashboardMenu}>
        <div className="row">
          <div
            className={`col-sm-3 col-md-3 animated zoomIn bg-primary ${styles.dashboardItem}`}
          >
            <Link to="/request" style={{ textDecoration: "none" }}>
              <i className="fa fa-list fa-lg"></i>
              <h1 className="lead text-light">Requests</h1>
            </Link>
          </div>

          <div
            className={`col-sm-3 col-md-3 animated zoomIn bg-primary ${styles.dashboardItem}`}
          >
            <Link to="/addRequest" style={{ textDecoration: "none" }}>
              <i className="fa fa-paper-plane fa-lg"></i>
              <h1 className="lead text-light">Send Requests</h1>
            </Link>
          </div>
        </div>

        <Fragment>
          <div className="menu py-4">
            <p className="lead">
              <i class="fa fa-bars" aria-hidden="true"></i> Menu
            </p>
            <div className="menu-list">
              <ul
                id="menu-content"
                className="menu-content out text-secondary"
                style={{ listStyleType: "none" }}
              >
                <li
                  data-toggle="collapse"
                  data-target="#new"
                  className="collapsed"
                >
                  <Link to="#" className="text-secondary">
                    <i class="fa fa-angle-right" aria-hidden="true"></i> Request{" "}
                    <span className="arrow"></span>
                  </Link>
                </li>
                <ul className="sub-menu collapse" id="new">
                  <li>All Request</li>
                  <li>Send Request</li>
                </ul>

                <li
                  data-toggle="collapse"
                  data-target="#email"
                  className="collapsed"
                >
                  <Link to="#" className="text-secondary">
                    <i class="fa fa-angle-right" aria-hidden="true"></i> Email{" "}
                    <span className="arrow"></span>
                  </Link>
                </li>
                <ul className="sub-menu collapse" id="email">
                  <li>
                    <Link to="/addEmail">Create new email</Link>
                  </li>
                  <li>
                    <Link to="/deleteEmail">Delete email</Link>
                  </li>
                  <li>
                    <Link to="/changePassword">Change Password</Link>
                  </li>
                </ul>

                <li
                  data-toggle="collapse"
                  data-target="#user"
                  className="collapsed"
                >
                  <Link to="#" className="text-secondary">
                    <i class="fa fa-angle-right" aria-hidden="true"></i> Profile{" "}
                    <span className="arrow"></span>
                  </Link>
                </li>
                <ul className="sub-menu collapse" id="user">
                  <li>View Profile</li>
                </ul>
              </ul>
            </div>
          </div>
        </Fragment>
      </div>
    </div>
  );
};

UserDashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(UserDashboard));
