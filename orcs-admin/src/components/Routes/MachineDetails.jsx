import React, { useState, useEffect, Fragment } from "react";
import { useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import MemoryGraph from "../charts/MemoryGraph";
import ProcessList from "./ProcessList";
import {
  Icon01,
  Icon02,
  Icon03,
  Icon04,
  Icon05,
  Icon06,
  Icon07,
  Icon08,
  Icon09,
} from "../../assets/images/SearchJobsIcon";
import StyledCard from "../utilities/StyledCard";
import { formatBytes } from "../utilities/formatSize";

const MachineDetails = ({ socket }) => {
  var icons = [
    Icon01,
    Icon03,
    Icon05,
    Icon06,
    Icon07,
    Icon02,
    Icon08,
    Icon09,
    Icon04,
  ];
  const url = useLocation().search;
  const paramValue = new URLSearchParams(url).get("macA") || "";
  const [machineData, setMachineData] = useState(undefined);
  const [defaultIcon, setdefaultIcon] = useState(Icon01);

  useEffect(() => {
    setdefaultIcon(icons[Math.floor(Math.random() * icons.length)]);
  }, []);

  useEffect(() => {
    const getDataListener = (data) => {
      let tempMacA = Object.keys(data)[0];
      tempMacA === paramValue && setMachineData(data[tempMacA]);
    };
    socket.on("data", getDataListener);
  }, [socket]);

  return (
    <Fragment>
      {machineData ? (
        <div className="row">
          <div className="row col-6">
            <div className="col-12">
              <div className="card flex-lg-column flex-md-row">
                <div className="pt-2 px-2 text-center">
                  <div className="row px-2 pt-2">
                    <div className="col-6">
                      <div className="profile-image my-2">{defaultIcon}</div>
                      <h3 className="text-black ml-3 mb-1">
                        UserName: {machineData.name || "NA"}
                      </h3>
                      <h4 className="ml-3 py-1">MacA: {machineData.macA}</h4>
                      <h4 className="ml-3">Type: {machineData.role}</h4>
                    </div>
                    <div className="col-6 my-2">
                      <div className="row">
                        <div className="col-12">
                          <div className="border border-primary rounded m-2 py-2">
                            <h3 className="text-black font-w600">OS Type</h3>
                            <h5 className="text-black">
                              {machineData.osType.platform} -{" "}
                              {machineData.osType.distro}
                            </h5>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="border border-primary rounded m-2 py-2">
                            <h3 className="text-black font-w600">CPU Model</h3>
                            <h5 className="text-black">
                              {machineData.cpu.manufacturer +
                                " " +
                                machineData.cpu.brand}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="card">
                <div className="card-header align-items-center flex-wrap border-0 pb-0"></div>
                <div className="card-body pt-0">
                  <MemoryGraph memData={machineData.mem} />
                  <h4 className="fs-20 text-center text-black mb-4 mr-3">
                    Resource Utilization
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <h2 className="text-center mb-4 mr-3" style={{ color: "#224870" }}>
              Performance Indicators
            </h2>
            <div className="row text-center mx-2">
              <StyledCard
                title={"No. of Cores"}
                borderColor={"#2A4494"}
                body={machineData.cpu.cores}
              />
              <StyledCard
                title={"CPU Speed"}
                borderColor={"#224870"}
                body={machineData.cpu.speed + " Ghz" || ""}
              />
              <StyledCard
                title={"Total Memory"}
                borderColor={"#224870"}
                body={formatBytes(machineData.mem.total)}
              />
              <StyledCard
                title={"Used Memory"}
                borderColor={"#2A4494"}
                body={formatBytes(machineData.mem.used)}
              />
              <StyledCard
                title={"Memory Usage"}
                borderColor={"#2A4494"}
                body={
                  Math.floor(
                    (machineData.mem.used / machineData.mem.total) * 100
                  ) + "%"
                }
              />
              <StyledCard
                title={"Networks Connected"}
                borderColor={"#224870"}
                body={machineData.networkInterfaces.length}
              />
              <StyledCard
                title={"CPU Temperature"}
                borderColor={"#224870"}
                body={`${machineData.cpuTemp.main||34}°`}
              />
              <StyledCard
                title={"Is Active"}
                borderColor={"#2A4494"}
                body={machineData.isActive ? "Yes" : "No"}
              />
            </div>
          </div>
          <div className="col-12">
            <ProcessList socket={socket} />
          </div>
        </div>
      ) : (
        <div
          className="w-100 h-100"
          style={{
            display: "flex",
            marginTop: "50%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner animation="border" />
        </div>
      )}
    </Fragment>
  );
};

export default MachineDetails;
