import React, { Fragment, useEffect } from "react";
import Spinner from "../UI/Spinner";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getRequests,
  getOpenStatusCount,
  get30DaysRequestsCount,
  getCompanyOpenStatusCount,
  getCompany30DaysRequestsCount,
  getCompanyRequests
} from "../../_actions/requestAction";

const AdminDashboard = ({
  auth: { company, username },
  requests,
  companyRequests,
  thirtyDaysRequestsCount,
  getRequests,
  openStatusCount,
  getOpenStatusCount,
  get30DaysRequestsCount,
  getCompanyRequests,
  getCompanyOpenStatusCount,
  getCompany30DaysRequestsCount,
  loading
}) => {
  useEffect(() => {
    getRequests();
    getOpenStatusCount();
    get30DaysRequestsCount();
    getCompanyOpenStatusCount();
    getCompany30DaysRequestsCount();
    getCompanyRequests();
    //eslint-diable-next-line
  }, [
    getRequests,
    getOpenStatusCount,
    get30DaysRequestsCount,
    getCompanyOpenStatusCount,
    getCompany30DaysRequestsCount,
    getCompanyRequests
  ]);

  let today = new Date();

  let date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  const me = !username ? "" : username;

  const mycompany = (
    <Link to="/mycompany">
      {!company.companyName ? "" : company.companyName}
    </Link>
  );
  return (
    <Fragment>
      {requests === null || companyRequests === null || loading ? (
        <Spinner />
      ) : (
        <div>
          <Link to="/mycompany">
            <img
              src={company.photo}
              alt="logo"
              style={{ maxWidth: "150px", maxHeight: "100px" }}
              className="img-thumbnail float-right bg-light"
            />
          </Link>
          <h1 className={`display-4`}>
            {" "}
            <i className="fa fa-tachometer text-secondary"></i> Dashboard{" "}
          </h1>

          <p className="lead">
            Welcome {me}, {mycompany}{" "}
          </p>
          <p>
            <i class="fa fa-dot-circle-o text-info fa-lg"></i> Admin
          </p>
          <p>
            <i className="fa fa-calendar text-secondary"></i> {date}
          </p>
          <div>
            <div className="container">
              <div class="row mb-3 animated fadeIn">
                <div class="col-xl-3 col-sm-6 py-2">
                  <Link to="/request" style={{ textDecoration: "none" }}>
                    <div class="card bg-success text-white h-100">
                      <div class="card-body bg-success">
                        <div class="rotate">
                          <i class="fa fa-list fa-4x"></i>
                        </div>
                        <h6 class="text-uppercase">REQUESTS</h6>
                        <small>Total no of requests</small>
                        <h1 class="display-4">{requests.result}</h1>
                      </div>
                    </div>
                  </Link>
                </div>
                <div class="col-xl-3 col-sm-6 py-2">
                  <Link to="/openRequest" style={{ textDecoration: "none" }}>
                    <div class="card text-white bg-danger h-100">
                      <div class="card-body bg-danger">
                        <div class="rotate">
                          <i class="fa fa-hourglass-half fa-4x"></i>
                        </div>
                        <h6 class="text-uppercase">OPEN REQUEST</h6>
                        <small>No of pending requests</small>
                        <h1 class="display-4">{openStatusCount}</h1>
                      </div>
                    </div>
                  </Link>
                </div>
                <div class="col-xl-3 col-sm-6 py-2">
                  <div class="card text-white bg-info h-100">
                    <div class="card-body bg-info">
                      <div class="rotate">
                        <i class="fa fa-calendar fa-4x"></i>
                      </div>
                      <h6 class="text-uppercase">Request in 30 days</h6>
                      <small>Requests within last 30 days</small>
                      <h1 class="display-4">{thirtyDaysRequestsCount}</h1>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-sm-6 py-2">
                  <Link to="/myreport" style={{ textDecoration: "none" }}>
                    <div class="card text-white bg-warning h-100">
                      <div class="card-body">
                        <div class="rotate">
                          <i class="fa fa-bar-chart fa-4x"></i>
                        </div>
                        <h6 class="text-uppercase">Reports</h6>
                        <small>View all Reports</small>

                        <h1 class="display-4">
                          <i class="fa fa-line-chart"></i>
                        </h1>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Thought */}
            <br />
            <div className="container">
              <div className="thought text-center bg-light p-4 animated pulse">
                <h3 className="text-secondary lead">
                  “Learn from yesterday, live for today, hope for tomorrow”
                </h3>
                <p className="lead text-secondary">- Albert Einstein</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

AdminDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  requests: PropTypes.array.isRequired,
  companyRequests: PropTypes.array.isRequired,
  getOpenStatusCount: PropTypes.func.isRequired,
  get30DaysRequestsCount: PropTypes.func.isRequired,
  getRequests: PropTypes.func.isRequired,
  getCompanyOpenStatusCount: PropTypes.func.isRequired,
  getCompany30DaysRequestsCount: PropTypes.func.isRequired,
  getCompanyRequests: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  requests: state.request.requests,
  openStatusCount: state.request.openStatusCount,
  thirtyDaysRequestsCount: state.request.thirtyDaysRequestsCount,
  companyRequests: state.request.companyRequests,
  companyOpenStatusCount: state.request.companyOpenStatusCount,
  companyThirtyDaysRequestsCount: state.request.companyThirtyDaysRequestsCount,
  openStatus: state.request.openStatus,
  loading: state.request.loading
});

export default connect(mapStateToProps, {
  getRequests,
  getOpenStatusCount,
  get30DaysRequestsCount,
  getCompanyOpenStatusCount,
  getCompany30DaysRequestsCount,
  getCompanyRequests
})(withRouter(AdminDashboard));
