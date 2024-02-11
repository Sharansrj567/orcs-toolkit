import React, { useState, useEffect } from "react";
import { Container, Row } from "shards-react";

import SingleMachine from "../utilities/SingleMachineCard";
import FullScreenLoader from "../utilities/Spinner";

const Dashboard = ({ socket }) => {
  const [machineList, setMachineList] = useState({});

  useEffect(() => {
    const updateListListener = (data) => {
      var tempMacA = Object.keys(data)[0];
      if (data[tempMacA].hasOwnProperty("processData")) {
        setMachineList((prevState) => {
          return { ...prevState, [tempMacA]: data[tempMacA] };
        });
      }
    };
    socket.on("data", updateListListener);
  }, [socket]);

  return (
    <>
      {machineList === {} ? (
        ((<FullScreenLoader />), console.log(machineList))
      ) : (
        <Container fluid className="main-content-container px-4">
          <Row>
            {(Object.values(machineList) || []).map((machine, i) => (
              <SingleMachine
                MachineData={{
                  ...machine,
                  runningProcesses: machine.processData?.running,
                }}
                key={i}
              ></SingleMachine>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default Dashboard;
