import React, { useState, useEffect, Fragment } from "react";
import api from "../../../utils/api";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Row,
  Container,
  Col,
  Button,
} from "react-bootstrap";
import FullScreenLoader from "../../utilities/Spinner";
import BanlistButton from "./BanButton";

const BanList = ({ socket }) => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);

  const fetchData = () => {
    setloading(true);
    api
      .get("/policy/getRoleWisePolicy")
      .then((res) => {
        setdata(res.data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };

  const deletePolicy = (id) => {
    setloading(true);
    api
      .post("/policy/deletePolicy/" + id)
      .then((res) => {
        fetchData();
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return loading ? (
    <FullScreenLoader />
  ) : (
    <Fragment>
      <Container fluid className="main-content-container px-4">
        <Row>
          <Col lg={12}>
            <div
              className="d-flex text-center py-2 my-2"
              style={{ justifyContent: "space-between" }}
            >
              <h4 className="fs-22 font-w600">Defined Policies</h4>
              <BanlistButton socket={socket} onReload={fetchData} />
            </div>
          </Col>
          <Col lg={12}>
            <Row>
              {data.map((d) => (
                <Col lg={4}>
                  <Card className="border border-primary rounded card shadow_1">
                    <Card.Title className="m-4 d-flex justify-content-between">
                      <h4 className="py-2 text-primary">{d._id}</h4>
                      <BanlistButton
                        edit={true}
                        role={d._id}
                        onReload={fetchData}
                        banList={d.list[0]}
                        socket={socket}
                      />
                      <Button
                        className="bg-transparent text-danger"
                        onClick={() => deletePolicy(d.policyid)}
                      >
                        Delete
                      </Button>
                    </Card.Title>
                    <ListGroup
                      className="list-group-flush overflow-auto"
                      style={{ maxHeight: 200 }}
                    >
                      {d.list[0].length === 0 ? (
                        <h4 className="p-3 text-center font-w100">
                          No Process Defined
                        </h4>
                      ) : (
                        d.list[0].map((p, i) => {
                          return (
                            <ListGroupItem>
                              <h4>Process Name: {p}</h4>
                            </ListGroupItem>
                          );
                        })
                      )}
                    </ListGroup>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default BanList;
