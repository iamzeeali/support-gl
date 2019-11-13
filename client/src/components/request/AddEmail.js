import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Sending from "../UI/Sending";
import { addEmail } from "../../_actions/requestAction";

const AddEmail = ({ auth: { username }, addEmail, sendingLoader, history }) => {
  useEffect(() => {
    //eslint-diable-next-line
  }, []);

  const [formData, setFormData] = useState({
    activity: "Email",
    subActivity: "Create Email",
    email: "",
    operateEmail: "",
    description: ""
  });

  const { activity, subActivity, description, operateEmail } = formData;

  const onChangeHandler = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    try {
      addEmail(formData, history);
    } catch (error) {
      console.log(error);
    }
  };

  var today = new Date();

  var hours = today.getHours();
  var minutes = today.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;

  var date =
    today.getDate() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getFullYear() +
    ", " +
    hours +
    ":" +
    minutes +
    " " +
    ampm;

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
          <i className="fa fa-arrow-left"> </i> Go Back
        </Link>
        <h1 className="pt-4">Add Email</h1>
      </div>

      {sendingLoader ? (
        <Sending />
      ) : (
        <div className="animated fadeIn">
          <div className="row">
            <div className="col-sm-9 col-md-9 col-lg-9 mx-auto">
              <div className="card my-5">
                <div className="card-body">
                  <form
                    className="form-signin"
                    onSubmit={e => onSubmitHandler(e)}
                  >
                    <div className="row border-dark p-4">
                      <div className="col-sm-4">
                        Date: <br />
                        <b>{date}</b>{" "}
                      </div>

                      <div className="col-sm-3">
                        Request By:
                        <br /> <b>{username}</b>
                      </div>
                      <div className="col-sm-2">
                        Activity:
                        <br /> <b>{activity}</b>
                      </div>
                      <div className="col-sm-2">
                        Sub Activity: <br /> <b>{subActivity}</b>
                      </div>
                    </div>

                    <div className="form-label-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email address you want to create"
                        name="operateEmail"
                        value={operateEmail}
                        onChange={e => onChangeHandler(e)}
                        required
                        autoFocus
                      />
                    </div>

                    <div className="form-label-group">
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Description (optional)"
                        value={description}
                        name="description"
                        onChange={e => onChangeHandler(e)}
                      />
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
      )}
    </Fragment>
  );
};

AddEmail.propTypes = {
  getActivities: PropTypes.func.isRequired,
  addEmail: PropTypes.func.isRequired,
  populateSubActivities: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  activities: state.activity.activities,
  subActivities: state.activity.subActivities,
  sendingLoader: state.request.sendingLoader,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addEmail }
)(withRouter(AddEmail));
