import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../UI/Spinner";
import { getUsers } from "../../_actions/authAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const User = ({ getUsers, users, loading }) => {
  useEffect(() => {
    getUsers();
    //eslint-diable-next-line
  }, [getUsers]);

  //   const onDeleteHandler = id => {
  //     deleteActivity(id);
  //   };

  return (
    <Fragment>
      <div className="form-title animated fadeIn">
        <Link to="/" className="float-right">
          <i
            className="fa fa-home fa-lg text-dark border border-dark rounded-circle p-2"
            aria-hidden="true"
          ></i>
        </Link>
        <Link to="/addUser" className="btn btn-primary">
          Add User
        </Link>
        <h1 className="pt-4">Users</h1>
        <small className="lead">Available Users in the portal...</small>
      </div>

      {users !== null && !loading ? (
        <table className="table animated fadeIn my-2">
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.company ? user.company.companyName : "NA"}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
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

User.propTypes = {
  getUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  users: state.auth.users,

  loading: state.auth.loading
});
export default connect(
  mapStateToProps,
  { getUsers }
)(User);
