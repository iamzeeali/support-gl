import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editRequest, getCurrentRequest } from "../../_actions/requestAction";
import Moment from "react-moment";
import "moment-timezone";

const EditSuperAdminRequest = ({
  request: { request, loading },
  open,
  editRequest,
  getCurrentRequest,
  history,
  match
}) => {
  var today = new Date();

  var currentDate = today.toISOString();

  const [formData, setFormData] = useState({
    openStatus: null,
    closeDate: null
  });

  const [requestData, setRequestData] = useState({
    activity: "",
    subActivity: "",
    reqBy: "",
    reqCompany: "",
    date: ""
  });

  useEffect(() => {
    getCurrentRequest(match.params.id);

    setFormData({
      openStatus: open
    });

    setRequestData({
      activity: loading || !request.activity ? "" : request.activity,
      subActivity: loading || !request.subActivity ? "" : request.subActivity,
      reqBy: loading || !request.user.name ? "" : request.user.name,
      reqCompany:
        loading || !request.user.company.companyName
          ? ""
          : request.user.company.companyName,
      date: loading || !request.date ? "" : request.date
    });
    //eslint-disable-next-line
  }, [loading, getCurrentRequest]);

  const { openStatus } = formData;

  const { activity, subActivity, reqBy, reqCompany, date } = requestData;

  const toggleStatus = e => {
    setFormData({
      openStatus: openStatus ? false : true,
      closeDate: currentDate
    });
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    editRequest(formData, history, match.params.id);
  };

  return (
    <Fragment>
      <div className="form-title animated fadeIn">
        <Link to="/" className="float-right">
          <i
            className="fa fa-home fa-lg text-dark border border-dark rounded-circle p-2"
            aria-hidden="true"
          ></i>
        </Link>
        <Link to="/request" className="btn btn-primary">
          <i className="fa fa-arrow-left"> </i> Go Back
        </Link>
        <h1 className="pt-4">Update Status</h1>
      </div>

      <div className="animated fadeIn">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card my-5">
              <div className="card-body">
                <form
                  className="form-signin"
                  onSubmit={e => onSubmitHandler(e)}
                >
                  <div className="form-label-group">
                    <input
                      type="text"
                      className="form-control"
                      value={activity}
                      disabled
                    />
                  </div>

                  <div className="form-label-group">
                    <input
                      type="text"
                      className="form-control"
                      value={subActivity}
                      disabled
                    />
                  </div>

                  <div className="form-label-group">
                    <input
                      type="text"
                      className="form-control"
                      value={reqBy}
                      disabled
                    />
                  </div>

                  <div className="form-label-group">
                    <input
                      type="text"
                      className="form-control"
                      value={reqCompany}
                      disabled
                    />
                  </div>

                  <div className="form-label-group">
                    <Moment format="DD/MM/YYYY, h:mm:ss a">{date}</Moment>
                  </div>
                  <hr className="my-4" />

                  <div className="form-label-group">
                    <div className="row">
                      <div className="col-md-12">
                        <ul class="list-group list-group-flush">
                          <li className="list-group-item">
                            Request Open?
                            <label className="switch ">
                              <input
                                type="checkbox"
                                className="success"
                                name="openStatus"
                                value={openStatus}
                                checked={openStatus}
                                onChange={toggleStatus}
                              />{" "}
                              <span className="slider round"></span>
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

EditSuperAdminRequest.propTypes = {
  editRequest: PropTypes.func.isRequired,
  getCurrentRequest: PropTypes.func.isRequired,
  request: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  request: state.request,
  open: state.request.open
});

export default connect(mapStateToProps, { editRequest, getCurrentRequest })(
  withRouter(EditSuperAdminRequest)
);
