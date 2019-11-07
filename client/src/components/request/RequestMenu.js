import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const requestMenu = () => {
  return (
    <Fragment>
      <div>
        <div className="row">
          <div className="col-sm-6">
            <Link to="emailRequest">
              <div className="request-meu-item bg-primary">
                <i className="fa fa-envelope fa-lg" aria-hidden="true"></i>
                <h2>Email Request</h2>
              </div>
            </Link>
          </div>
          <div className="col-sm-6">
            <Link to="allRequest">
              <div className="request-meu-item bg-primary">
                <i className="fa fa-reply fa-lg" aria-hidden="true"></i>
                <h2>Other Requests</h2>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default requestMenu;
