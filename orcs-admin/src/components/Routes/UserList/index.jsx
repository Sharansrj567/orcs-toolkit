import React, { useState, useEffect, Fragment } from "react";
import moment from "moment";
// import axios from "axios";
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
import AddUserButton from "./AddUserButton";

const UserList = () => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);

  const fetchData = () => {
    setloading(true);
    api
      .get("/user/getAllUsers")
      .then((res) => {
        setdata(res.data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };

  const deleteUser = (id) => {
    setloading(true);
    api
      .post("/user/deleteUser/" + id)
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
              <h4 className="fs-22 font-w600">User List</h4>
              <AddUserButton onReload={fetchData} />
            </div>
          </Col>
          <Col lg={12}>
            <Row>
              {data.map((d) => (
                <Col lg={3}>
                  <Card className="border border-primary rounded card shadow_1">
                    <Card.Title className="my-2 mx-4">
                      <h4 className="text-primary">User Details</h4>
                    </Card.Title>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem>
                        <h5 className="text-primary">Name: {d.name || ""}</h5>
                      </ListGroupItem>
                      <ListGroupItem>
                        <h5 className="text-primary">Email: {d.email || ""}</h5>
                      </ListGroupItem>
                      <ListGroupItem>
                        <h5 className="text-primary">Role: {d.role || ""}</h5>
                      </ListGroupItem>
                      <ListGroupItem>
                        <h5 className="text-primary">
                          Created On: {moment(d.date).format("ll") || ""}
                        </h5>
                      </ListGroupItem>
                    </ListGroup>
                    <Card.Title className="m-4 d-flex justify-content-between">
                      <AddUserButton
                        edit={true}
                        user={d}
                        onReload={fetchData}
                      />
                      <Button
                        className="bg-transparent text-danger p-2"
                        onClick={() => deleteUser(d.id)}
                      >
                        Delete User
                      </Button>
                    </Card.Title>
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

export default UserList;
