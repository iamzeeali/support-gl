import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addRequest } from "../../_actions/requestAction";
import { getActivities } from "../../_actions/activityAction";

const AddRequest = ({
  auth: { user },
  addRequest,
  getActivities,
  activities,
  history
}) => {
  useEffect(() => {
    getActivities();
    //eslint-diable-next-line
  }, [getActivities]);
  const [formData, setFormData] = useState({
    activity: "",
    subActivity: ""
  });

  const { activity, subActivity } = formData;

  const onChangeHandler = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    addRequest(formData, history);
  };

  let activityOptions = activities.map(activity => (
    <option key={activity._id} value={activity.activityName}>
      {activity.activityName}
    </option>
  ));

  let subActivityOptions = activities.map(activity => (
    <option key={activity._id} value={activity.subActivities}>
      {activity.subActivities}
    </option>
  ));

  return (
    <Fragment>
      <div className="form-title animated fadeIn">
        <Link to="/request" className="btn btn-primary">
          <i className="fa fa-arrow-left"> </i> Go Back
        </Link>
        <h1 className="pt-4">Add Request</h1>
        <small className="lead">Add new Request...</small>
      </div>

      <div className="animated fadeIn">
        <div className="row">
          <div className="col-sm-9 col-md-9 col-lg-9 mx-auto">
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
                      placeholder="User"
                      value={user.name}
                      required
                      disabled
                    />
                  </div>

                  <div className="form-label-group">
                    <select
                      className="form-control"
                      name="activity"
                      value={activity}
                      defaultValue={{ label: "Select activity", value: 0 }}
                      onChange={e => onChangeHandler(e)}
                    >
                      <option>Select Activity</option>
                      {activityOptions}
                    </select>
                  </div>

                  <div className="form-label-group">
                    <select
                      className="form-control"
                      name="subActivity"
                      value={subActivity}
                      defaultValue={{ label: "Select sub Activity", value: 0 }}
                      onChange={e => onChangeHandler(e)}
                    >
                      <option>Select Sub Activity</option>
                      {subActivityOptions}
                    </select>
                  </div>

                  <hr className="my-4" />

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

AddRequest.propTypes = {
  getActivities: PropTypes.func.isRequired,
  addRequest: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  activities: state.activity.activities,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addRequest, getActivities }
)(withRouter(AddRequest));
