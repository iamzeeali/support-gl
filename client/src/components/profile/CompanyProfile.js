import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const CompanyProfile = ({
  auth: { username, company, isAuthenticated, loading, role },
  logout
}) => {
  const {
    companyName,
    country,
    state,
    city,
    shortName,
    photo,
    companyAddress,
    companyPhone,
    companyEmail,
    contactPerson,
    contactPersonPhone,
    contactPersonEmail,
    description
  } = company;
  return (
    <Fragment>
      <div className="profile-page pb-4">
        <div className="page-header pb-4 rounded" data-parallax="true"></div>
        <div className="main main-raised p-4">
          <div className="profile-content">
            <div className="container">
              <div className="row">
                <div className="col-md-6 ml-auto mr-auto">
                  <div className="profile">
                    <div className="avatar">
                      <img
                        src={photo}
                        alt="logo"
                        className="img-raised rounded img-fluid bg-light"
                      />
                    </div>
                    <div className="name">
                      <h3 className="title">
                        {companyName} ({shortName})
                      </h3>
                      <h6>
                        {city} {state} {country}
                      </h6>

                      {/* <a
                      href="#pablo"
                      className="btn btn-just-icon btn-link btn-dribbble"
                    >
                      <i className="fa fa-dribbble"></i>
                    </a>
                    <a
                      href="#pablo"
                      className="btn btn-just-icon btn-link btn-twitter"
                    >
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a
                      href="#pablo"
                      className="btn btn-just-icon btn-link btn-pinterest"
                    >
                      <i className="fa fa-pinterest"></i>
                    </a> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-10 ml-auto mr-auto p-4 bg-light">
                  <p className="text-muted my-4 text-center">
                    {description ? description : null}
                  </p>
                </div>
              </div>
              <div className="details my-4">
                <div className="row">
                  <div className="col-sm-6">
                    <ul class="list-group">
                      <li class="list-group-item active">
                        <h5>Company Details</h5>
                      </li>
                      <li class="list-group-item">
                        {" "}
                        <i class="fa fa-map-marker" aria-hidden="true"></i>{" "}
                        {city} {state} {country} <br />
                        {companyAddress}
                        <br />
                        <br />
                      </li>
                      <li class="list-group-item">
                        <i class="fa fa-phone" aria-hidden="true"></i>{" "}
                        {companyPhone}
                      </li>
                      <li class="list-group-item">
                        {" "}
                        <i class="fa fa-envelope" aria-hidden="true"></i>{" "}
                        {companyEmail}
                      </li>
                    </ul>
                  </div>
                  <div className="col-sm-6">
                    <ul class="list-group bg-light">
                      <li class="list-group-item active ">
                        <h5>Contact Details</h5>
                      </li>
                      <li class="list-group-item">
                        <i class="fa fa-user" aria-hidden="true"></i>{" "}
                        {contactPerson}
                        <br />
                        <br />
                        <br />
                      </li>
                      <li class="list-group-item">
                        <i class="fa fa-phone" aria-hidden="true"></i>{" "}
                        {contactPersonPhone}
                      </li>
                      <li class="list-group-item">
                        <i class="fa fa-envelope" aria-hidden="true"></i>{" "}
                        {contactPersonEmail}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

CompanyProfile.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(CompanyProfile);
