import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../_actions/authAction";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="login">
      <div className="dark-overlay">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">
                  Globus Labs Support Portal
                </h5>
                <form className="form-signin" onSubmit={e => onSubmit(e)}>
                  <div className="form-label-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email address"
                      name="email"
                      value={email}
                      onChange={e => onChange(e)}
                      required
                      autoFocus
                    />
                  </div>

                  <div className="form-label-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={e => onChange(e)}
                      required
                    />
                  </div>

                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                  >
                    Log in
                  </button>
                  <hr className="my-4" />

                  <small className="text-center ml-auto">
                    Powered by{" "}
                    <a
                      href="http://globuslabs.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Globus Labs
                    </a>
                  </small>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { login })(Login);
