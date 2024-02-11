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
import moment from "moment";

const LogsList = () => {
  const [data, setdata] = useState([]);
  const [limit, setlimit] = useState(20);
  const [loading, setloading] = useState(false);

  const fetchData = () => {
    setloading(true);
    api
      .get("/logs?limit=" + limit)
      .then((res) => {
        setdata(res.data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [limit]);

  return loading ? (
    <FullScreenLoader />
  ) : (
    <Fragment>
      <Container
        fluid
        className="main-content-container px-4"
        style={{ background: "#F7F8FB" }}
      >
        <Row>
          <Col lg={12}>
            <div
              className="d-flex text-center py-2 my-2"
              style={{ justifyContent: "space-between" }}
            >
              <h4 className="fs-22 font-w600">Logs Worklist</h4>
            </div>
          </Col>
          <Col lg={12}>
            <Row>
              {data.map((d) => (
                <Col lg={6}>
                  <Card
                    className={`border border-${
                      d.message === "connected" ? "success" : "danger"
                    } rounded card shadow_1`}
                  >
                    <Card.Title className="m-4 d-flex justify-content-between">
                      <h4 className="py-2 text-primary">{d.label}</h4>
                    </Card.Title>
                    <ListGroup
                      className="list-group-flush overflow-auto"
                      style={{ maxHeight: 200 }}
                    >
                      <ListGroupItem>
                        <h4>Timestamp: {moment(d.timestamp).format("lll")}</h4>
                      </ListGroupItem>
                      <ListGroupItem>
                        <h4>Message: {d.message}</h4>
                      </ListGroupItem>
                      <ListGroupItem>
                        <h4>Data: {d.meta?.data}</h4>
                      </ListGroupItem>
                    </ListGroup>
                  </Card>
                </Col>
              ))}
            </Row>
            <div className="text-center">
              <Button
                className="btn-link bg-transparent py-2 mb-2"
                onClick={() => {
                  setlimit(limit + 20);
                }}
              >
                Load More
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default LogsList;
