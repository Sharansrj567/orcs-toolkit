import React from "react";
import { Link } from "react-router-dom";
import { Icon01, Icon02 } from "../../assets/images/SearchJobsIcon";

const SingleMachine = (props) => {
  const { name, role, runningProcesses, macA, isActive } =
    props.MachineData;
  const { key } = props;
  let icon = "";
  if (key % 2 === 0) {
    icon = Icon02;
  } else {
    icon = Icon01;
  }
  return (
    <div className="col-xl-4 col-md-6 my-2">
      <div className="card shadow_1">
        <div className="card-body">
          <div className="media mb-2">
            <div className="media-body">
              <p className="mb-1 text-primary">Role: {role}</p>
              <h4 className="fs-20 text-primary">
                Username: {name || "NA"}
              </h4>
            </div>
            {icon}
          </div>
          <h4 className="text-primary font-w500 d-block">
            Status: {name !== 'NA' ? "Authenticated" : "Not Authenticated"}
          </h4>
          <div className="d-flex align-items-center mt-4">
            <Link
              to={`process?macA=${macA}`}
              className="btn btn-primary light btn-rounded mr-auto"
            >
              Details
            </Link>
            <h4 className="text-primary font-w500 d-block mx-2 mt-2">
              Active Processes: {runningProcesses}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMachine;
