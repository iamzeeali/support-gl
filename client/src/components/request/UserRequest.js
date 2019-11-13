import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../UI/Spinner";
import {
  getRequests,
  setCurrentRequest,
  clearRequest,
  deleteRequest
} from "../../_actions/requestAction";
import Moment from "react-moment";
import "moment-timezone";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const UserRequest = ({
  getRequests,
  setCurrentRequest,
  clearRequest,
  requests,
  filtered,
  loading
}) => {
  useEffect(() => {
    getRequests();
    //eslint-diable-next-line
  }, [getRequests]);

  const openStatus = (
    <i
      class="fa fa-hourglass-half text-warning text-center fa-lg"
      aria-hidden="true"
    ></i>
  );

  const closeStatus = (
    <i
      class="fa fa-check-circle text-success text-center fa-lg"
      aria-hidden="true"
    ></i>
  );
  return (
    <Fragment>
      <div className="form-title animated fadeIn">
        <Link to="/" className="float-right">
          <i
            className="fa fa-home fa-lg text-dark border border-dark rounded-circle p-2"
            aria-hidden="true"
          ></i>
        </Link>
        <Link to="/addRequest" className="btn btn-primary">
          Add Request
        </Link>
        <h1 className="pt-4">Requests</h1>
        <small className="lead">Requests in the portal...</small>
        <br />
        <small>
          <i
            class="fa fa-hourglass-half text-warning text-center fa-lg"
            aria-hidden="true"
          >
            {" "}
          </i>{" "}
          Pending
        </small>
        <br />{" "}
        <small>
          <i
            class="fa fa-check-circle text-success text-center fa-lg"
            aria-hidden="true"
          >
            {" "}
          </i>{" "}
          Closed
        </small>
      </div>

      {requests !== null && !loading ? (
        <table className="table table-responsive animated fadeIn my-2">
          <thead>
            <tr>
              <th scope="col">Activity</th>
              <th scope="col">Sub Activities</th>
              <th scope="col">Req By</th>
              <th scope="col">Req for</th>
              <th scope="col">Req on</th>
              <th scope="col">Status</th>
            </tr>
          </thead>

          <tbody>
            {requests.map(request => (
              <tr key={request._id}>
                <td>{request.activity}</td>
                <td>{request.subActivity}</td>
                <td>{request.user.name}</td>
                <td>{request.user.company.companyName}</td>
                <td>
                  {" "}
                  <Moment format="DD/MM/YYYY, h:mm:ss a">{request.date}</Moment>
                </td>
                <td>{request.openStatus === true ? openStatus : closeStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

UserRequest.propTypes = {
  getRequests: PropTypes.func.isRequired,
  deleteRequest: PropTypes.func.isRequired,
  setCurrentRequest: PropTypes.func.isRequired,
  clearRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  requests: state.request.requests,
  request: state.request.request,
  filtered: state.request.filtered,
  loading: state.request.loading
});
export default connect(
  mapStateToProps,
  { getRequests, deleteRequest, setCurrentRequest, clearRequest }
)(UserRequest);
