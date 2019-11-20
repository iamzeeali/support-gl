import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import UIAvatar from "react-ui-avatars";
import ReactTooltip from "react-tooltip";
import { logout } from "../../_actions/authAction";

const Navbar = ({
  auth: { username, isAuthenticated, loading, role },
  logout
}) => {
  const authLinks = (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <Link className="navbar-brand lead" to="/">
            <img src="./logo.png" alt="globus labs logo" width="220px" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link lead" to="/">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link lead" to="/about">
                  About
                </Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-primary my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
            <ul className="navbar-nav ml-4">
              <li className="nav-item">
                <Link
                  className="nav-link lead"
                  onClick={logout}
                  to="/login"
                  data-tip={`Logout ${username}`}
                >
                  <UIAvatar
                    name={username}
                    size="36"
                    background="#E61313"
                    color="#ffffff"
                    rounded="true"
                    bold="true"
                  />
                </Link>
                <ReactTooltip />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );

  const userAuthLinks = (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <Link className="navbar-brand lead" to="/">
            <img
              src="http://globuslabs.com/images/logo1.png"
              alt="globus labs logo"
              width="200px"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link
                  to="/"
                  style={{ textDecoration: "none" }}
                  className="nav-link lead"
                  data-tip="Home"
                >
                  <i className="fa fa-home fa-lg"></i>
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/request"
                  style={{ textDecoration: "none" }}
                  className="nav-link lead"
                  data-tip="All Requests"
                >
                  <i className="fa fa-list fa-lg"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/addRequest"
                  style={{ textDecoration: "none" }}
                  className="nav-link lead"
                  data-tip="Add Request"
                >
                  <i className="fa fa-plus-circle fa-lg"></i>
                </Link>
              </li>

              <li className="nav-item dropdown">
                <i class="dropbtn fa fa-envelope fa-lg lead nav-link"></i>
                <div class="dropdown-content">
                  <Link to="/addEmail">Add Email</Link>
                  <Link to="/deleteEmail">Suspend Email</Link>
                  <Link to="/changePassword">Change Password</Link>
                </div>
              </li>

              <li className="nav-item">
                <Link
                  to="/myreport"
                  style={{ textDecoration: "none" }}
                  className="nav-link lead"
                  data-tip="Reports"
                >
                  <i className="fa fa-bar-chart fa-lg"></i>
                </Link>
              </li>
              {isAuthenticated && role === "admin" ? (
                <li className="nav-item">
                  <Link
                    to="/member"
                    style={{ textDecoration: "none" }}
                    className="nav-link lead"
                    data-tip="Members"
                  >
                    <i className="fa fa-user fa-lg"></i>
                  </Link>
                </li>
              ) : null}
            </ul>

            <ul className="navbar-nav ml-4">
              <li className="nav-item">
                <Link className="nav-link lead" to="/about">
                  about
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link lead"
                  onClick={logout}
                  to="/login"
                  data-tip="Logout"
                >
                  {" "}
                  <UIAvatar
                    name={username}
                    size="36"
                    background="#E61313"
                    color="#ffffff"
                    rounded="true"
                    bold="true"
                  />
                </Link>
                <ReactTooltip />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand lead" to="/">
            <img
              src="http://globuslabs.com/images/logo1.png"
              alt="globus labs logo"
              width="220px"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link lead" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link lead" to="/about">
                  About
                </Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-primary my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>

            <ul className="navbar-nav ml-4">
              <li className="nav-item">
                <Link className="nav-link lead" to="/login">
                  <i class="fa fa-sign-in" aria-hidden="true"></i> Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );

  return (
    <Fragment>
      {!loading && (
        <div>
          {isAuthenticated && role === "super-admin"
            ? authLinks
            : isAuthenticated && (role === "user" || "admin")
            ? userAuthLinks
            : guestLinks}
        </div>
      )}
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
