import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../UI/Spinner";
import {
  getAllRequests,
  setCurrentRequest,
  clearRequest,
  deleteRequest
} from "../../_actions/requestAction";
import Moment from "react-moment";
import "moment-timezone";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const UserRequest = ({
  getAllRequests,
  setCurrentRequest,
  deleteRequest,
  clearRequest,
  requests,
  filtered,
  loading
}) => {
  useEffect(() => {
    getAllRequests();
    //eslint-diable-next-line
  }, [getAllRequests]);

  // const onDeleteHandler = id => {
  //   deleteRequest(id);
  //   clearRequest();
  // };

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
        <h1 className="pt-4">Request Logs</h1>
        <small className="lead">Requests in the portal...</small>
        <br />
        <small>
          <i
            class="fa fa-hourglass-half text-warning text-center fa-lg"
            aria-hidden="true"
          >
            {" "}
          </i>{" "}
          Open
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
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map(req => (
              <tr key={req._id}>
                <td>{req.activity}</td>
                <td>{req.subActivity}</td>
                <td>{req.user.name}</td>
                <td>{req.user.company.companyName}</td>
                <td>
                  {" "}
                  <Moment format="DD/MM/YYYY, h:mm:ss a">{req.date}</Moment>
                </td>
                <td>{req.openStatus === true ? openStatus : closeStatus}</td>

                <td>
                  <Link
                    title="Update Status"
                    to={`/editRequest/${req._id}`}
                    onClick={() => setCurrentRequest(req)}
                  >
                    <i className="fa fa-edit fa-lg"></i>
                  </Link>{" "}
                  &nbsp; &nbsp;
                  {/* <Link title="Delete" onClick={() => onDeleteHandler(req._id)}>
                    <i className="fa fa-trash text-danger fa-lg"></i>
                  </Link> */}
                </td>
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
  getAllRequests: PropTypes.func.isRequired,
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
  { getAllRequests, deleteRequest, setCurrentRequest, clearRequest }
)(UserRequest);
