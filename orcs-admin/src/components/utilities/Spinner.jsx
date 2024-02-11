import React from "react";
import { Spinner } from "react-bootstrap";

const FullScreenLoader = () => (
  <div
    style={{
      display: "flex",
      flex: 1,
      minHeight: "100vh",
    }}
    className="d-flex h-100 align-items-center justify-content-center"
  >
    <Spinner color="primary" animation="border" />
  </div>
);

export default FullScreenLoader;
