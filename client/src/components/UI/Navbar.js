import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../../_actions/authAction";

const Navbar = (
  { auth: { isAuthenticated, loading, role }, logout },
  props
) => {
  const authLinks = (
    <Fragment>
      <div className="nav-side-menu">
        <div className="brand">
          <h2 className="lead">support@globuslabs.com</h2>
        </div>
        <i
          className="fa fa-bars fa-2x toggle-btn"
          data-toggle="collapse"
          data-target="#menu-content"
        ></i>

        <div className="menu-list">
          <ul id="menu-content" className="menu-content collapse out">
            <li>
              <Link to="/dashboard">
                <i className="fa fa-dashboard fa-lg"></i> Dashboard
              </Link>
            </li>

            <li
              data-toggle="collapse"
              data-target="#products"
              className="collapsed active"
            >
              <Link to="#">
                <i className="fa fa-gift fa-lg"></i> Activity{" "}
                <span className="arrow"></span>
              </Link>
            </li>
            <ul className="sub-menu collapse" id="products">
              <li className="active">
                <Link to="/activity">View Activities</Link>
              </li>
              <li>
                <Link to="addActivity">Add an activity</Link>
              </li>
            </ul>

            <li
              data-toggle="collapse"
              data-target="#service"
              className="collapsed"
            >
              <Link to="#">
                <i className="fa fa-globe fa-lg"></i> Company{" "}
                <span className="arrow"></span>
              </Link>
            </li>
            <ul className="sub-menu collapse" id="service">
              <li>
                <Link to="/company">View Companies</Link>
              </li>
              <li>
                <Link to="/addCompany">Add Company</Link>
              </li>
            </ul>

            <li data-toggle="collapse" data-target="#new" className="collapsed">
              <Link to="#">
                <i className="fa fa-car fa-lg"></i> Logs{" "}
                <span className="arrow"></span>
              </Link>
            </li>
            <ul className="sub-menu collapse" id="new">
              <li>All Logs</li>
            </ul>

            <li
              data-toggle="collapse"
              data-target="#user"
              className="collapsed"
            >
              <Link to="#">
                <i className="fa fa-car fa-lg"></i> User Setting{" "}
                <span className="arrow"></span>
              </Link>
            </li>
            <ul className="sub-menu collapse" id="user">
              <li>All Users</li>
              <li>Create user</li>
            </ul>

            <li data-toggle="collapse" data-target="#new" className="collapsed">
              <Link to="#">
                <i className="fa fa-car fa-lg"></i> Power{" "}
                <span className="arrow"></span>
              </Link>
            </li>
            <ul className="sub-menu collapse" id="new">
              <li>
                <Link onClick={logout} to="/login">
                  Logout
                </Link>
              </li>
            </ul>
          </ul>
        </div>
      </div>
      <main className="page-wrapper">{props.children}</main>
    </Fragment>
  );

  const userAuthLinks = (
    <Fragment>
      <div className="nav-side-menu">
        <div className="brand">
          <h2 className="lead">support@globuslabs.com</h2>
        </div>
        <i
          className="fa fa-bars fa-2x toggle-btn"
          data-toggle="collapse"
          data-target="#menu-content"
        ></i>

        <div className="menu-list">
          <ul id="menu-content" className="menu-content collapse out">
            <li>
              <Link to="/dashboard">
                <i className="fa fa-dashboard fa-lg"></i> Dashboard
              </Link>
            </li>

            <li data-toggle="collapse" data-target="#new" className="collapsed">
              <Link to="#">
                <i className="fa fa-car fa-lg"></i> Request{" "}
                <span className="arrow"></span>
              </Link>
            </li>
            <ul className="sub-menu collapse" id="new">
              <li>
                <Link to="/request">Requests</Link>
              </li>
              <li>
                <Link to="/addRequest">Add Requests</Link>
              </li>
            </ul>

            <li data-toggle="collapse" data-target="#new" className="collapsed">
              <Link to="#">
                <i className="fa fa-car fa-lg"></i> Power{" "}
                <span className="arrow"></span>
              </Link>
            </li>
            <ul className="sub-menu collapse" id="new">
              <li>
                <Link onClick={logout} to="/login">
                  Logout
                </Link>
              </li>
            </ul>
          </ul>
        </div>
      </div>
      <main className="page-wrapper">{props.children}</main>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand lead" to="#">
            support@globuslabs.com
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

              <li className="nav-item">
                <Link className="nav-link lead" to="/login">
                  Login
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
          </div>
        </div>
      </nav>
    </Fragment>
  );

  return (
    <Fragment>
      {!loading && (
        <div>
          {isAuthenticated && role === "admin"
            ? authLinks
            : isAuthenticated && role === "user"
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

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
