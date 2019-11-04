import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addActivity } from "../../_actions/activityAction";

const AddActivity = ({ addActivity, history }) => {
  const [formData, setFormData] = useState({
    activityName: "",
    subActivities: ""
  });

  const { activityName, subActivities } = formData;

  const onChangeHandler = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    addActivity(formData, history);
  };

  return (
    <Fragment>
      <div className="form-title animated fadeIn">
        <Link to="/activity" className="btn btn-primary">
          <i className="fa fa-arrow-left"> </i> Go Back
        </Link>
        <h1 className="pt-4">Add Activity</h1>
        <small className="lead">Add new Activity...</small>
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
                      placeholder="Activity"
                      name="activityName"
                      value={activityName}
                      onChange={e => onChangeHandler(e)}
                      required
                      autoFocus
                    />
                  </div>

                  <div className="form-label-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Sub Activities"
                      name="subActivities"
                      value={subActivities}
                      onChange={e => onChangeHandler(e)}
                      required
                    />
                    <small className="text-muted">
                      Enter comma separated values. Eg: create email, change
                      password etc.
                    </small>
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

AddActivity.propTypes = {
  addActivity: PropTypes.func.isRequired
};

export default connect(
  null,
  { addActivity }
)(withRouter(AddActivity));
