import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../UI/Spinner";
import {
  getMembers,
  deleteMember,
  setCurrentMember,
  clearMember
} from "../../_actions/memberAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Member = ({
  auth: { isAuthenticated, company, role, user },
  getMembers,
  deleteMember,
  setCurrentMember,
  clearMember,
  members,
  filtered,
  loading
}) => {
  useEffect(() => {
    getMembers();
    //eslint-diable-next-line
  }, [getMembers]);

  const onDeleteHandler = id => {
    deleteMember(id);
  };

  const adminRole = (
    <span className="badge badge-danger text-center">Admin</span>
  );
  const userRole = (
    <span className="badge badge-primary text-center">User</span>
  );

  return (
    <Fragment>
      <div className="form-title animated fadeIn">
        <Link to="/" className="">
          <i
            className="fa fa-home fa-lg text-muted bg-light rounded-circle p-2"
            aria-hidden="true"
          ></i>
        </Link>{" "}
        <h1 className="pt-4">Members</h1>
        <small className="lead">Available Members in the portal...</small>
      </div>
      {members !== null && !loading ? (
        <table className="table table-hover table-bordered container fadeIn my-4">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {members.map(mem => (
              <tr key={mem._id}>
                <td>{mem.name}</td>
                <td>{mem.email}</td>
                <td>{mem.company.companyName}</td>
                <td> {mem.role === "admin" ? adminRole : userRole}</td>

                <td>
                  {user._id !== mem._id ? (
                    <Link
                      title="Disable Member"
                      to="#"
                      onClick={() => onDeleteHandler(mem._id)}
                    >
                      <i className="fa fa-ban text-danger fa-lg"></i>
                    </Link>
                  ) : (
                    <Link
                      title="Can't disable yourself"
                      style={{ cursor: "not-allowed" }}
                    >
                      <i className="fa fa-ban text-danger fa-lg"></i>
                    </Link>
                  )}
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

Member.propTypes = {
  getMembers: PropTypes.func.isRequired,
  deleteMember: PropTypes.func.isRequired,
  setCurrentMember: PropTypes.func.isRequired,
  clearMember: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  members: state.member.members,
  member: state.member.member,
  filtered: state.member.filtered,
  loading: state.member.loading
});
export default connect(mapStateToProps, {
  getMembers,
  deleteMember,
  setCurrentMember,
  clearMember
})(Member);
