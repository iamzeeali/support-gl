import React, { Fragment } from "react";
import sending from "./sending.gif";

export default () => (
  <Fragment>
    <img
      src={sending}
      style={{
        width: "400px",
        margin: "auto",
        display: "block",
        textAlign: "center"
      }}
      alt="Sending..."
    />
  </Fragment>
);
