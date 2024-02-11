import React from "react";

const StyledCard = ({ title, body, borderColor }) => (
  <div
    style={{ background: "#FFFBFE" }}
    className={`col-5 my-2 px-2 mx-3 text-black border-primary rounded border`}
  >
    <div className="d-inline-block relative py-3 mt-2">
      <h6 className={`fs-22 text-grey100 font-w600`}>{title}</h6>
      <h2 style={{ color: borderColor }}>{body}</h2>
    </div>
  </div>
);

export default StyledCard;
