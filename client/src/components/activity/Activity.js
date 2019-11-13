import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../UI/Spinner";
import {
  getActivities,
  deleteActivity,
  setCurrentActivity,
  clearActivity
} from "../../_actions/activityAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Activity = ({
  getActivities,
  deleteActivity,
  setCurrentActivity,
  clearActivity,
  activities,
  filtered,
  loading
}) => {
  useEffect(() => {
    getActivities();
    //eslint-diable-next-line
  }, [getActivities]);

  const onDeleteHandler = id => {
    deleteActivity(id);
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
        <Link to="/addActivity" className="btn btn-primary">
          Add Activity
        </Link>
        <h1 className="pt-4">Activities</h1>
        <small className="lead">Available activities in the portal...</small>
      </div>

      {activities !== null && !loading ? (
        <table className="table animated fadeIn my-2">
          <thead>
            <tr>
              <th>Activity</th>
              <th>Sub Activities</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {activities.map(act => (
              <tr key={act._id}>
                <td>{act.activityName}</td>

                <td>
                  <ul style={{ padding: "0", listStyleType: "none" }}>
                    {act.subActivities.slice(0, 4).map((subAct, index) => (
                      <li key={index}>{subAct}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <Link
                    title="Edit"
                    to={`/editActivity/${act._id}`}
                    onClick={() => setCurrentActivity(act)}
                  >
                    <i className="fa fa-edit fa-lg"></i>
                  </Link>{" "}
                  &nbsp; &nbsp;
                  <Link
                    title="Delete"
                    to="#!"
                    onClick={() => onDeleteHandler(act._id)}
                  >
                    <i className="fa fa-trash text-danger fa-lg"></i>
                  </Link>
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

Activity.propTypes = {
  getActivities: PropTypes.func.isRequired,
  deleteActivity: PropTypes.func.isRequired,
  setCurrentActivity: PropTypes.func.isRequired,
  clearActivity: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  activities: state.activity.activities,
  activity: state.activity.activity,
  filtered: state.activity.filtered,
  loading: state.activity.loading
});
export default connect(
  mapStateToProps,
  { getActivities, deleteActivity, setCurrentActivity, clearActivity }
)(Activity);
