import React, { useState, useEffect } from "react";
import api from "../../../utils/api";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import AsyncSelect from "react-select/async";

const AddUserModal = ({ visible, toggle, edit, propUser, onReload }) => {
  const [user, setUser] = useState(propUser);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [selectedRole, setSelectedRole] = useState(
    edit ? { value: user.role || "", label: user.role || "" } : {}
  );
  const [roles, setroles] = useState([]);

  const handleSubmit = () => {
    setLoading(true);
    let request = api.post(`/auth/register`, {
      ...user,
      isAdmin: user.role === "Admin",
    });
    if (edit) {
      request = api.post(`/user/updateUser/${user.id}`, {
        ...user,
      });
    }
    request
      .then((res) => {
        onReload && onReload();
        setLoading(false);
        console.log("Success", res);
        toggle();
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        setErrMsg(
          <ul>
            {err.response.data.errors.map((e) => (
              <li>- {e.message}</li>
            ))}
          </ul>
        );
      });
  };

  const fetchRoles = () => {
    api
      .get("/policy/getRoleWisePolicy")
      .then((res) => {
        setroles(res.data.map((m) => ({ value: m._id, label: m._id })));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <Modal className="fade" show={visible}>
      <Modal.Header>
        <Modal.Title>Add User</Modal.Title>
        <Button variant="" className="close" onClick={toggle}>
          <span>&times;</span>
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="my-2">
          <Form.Label>Name</Form.Label>
          <input
            type="text"
            className="w-100 p-2"
            defaultValue={user?.name || ""}
            onChange={(event) => setUser({ ...user, name: event.target.value })}
            name="Name"
            placeholder="Enter Name"
          />
          {error && (
            <Form.Label className="text-danger pt-3">
              Please Enter Valid Name
            </Form.Label>
          )}
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Label>Email</Form.Label>
          <input
            type="text"
            className="w-100 p-2"
            defaultValue={user?.email || ""}
            autoComplete="none"
            onChange={(event) =>
              setUser({ ...user, email: event.target.value })
            }
            name="Email"
            placeholder="Enter Email"
          />
          {error && (
            <Form.Label className="text-danger pt-3">
              Please Enter Valid Email
            </Form.Label>
          )}
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Label>Password</Form.Label>
          <input
            type="password"
            className="w-100 p-2"
            defaultValue={""}
            onChange={(event) =>
              setUser({ ...user, password: event.target.value })
            }
            autoComplete="none"
            name="Password"
            placeholder="Enter Password"
          />
          {error && (
            <Form.Label className="text-danger pt-3">
              Please Enter Valid Password
            </Form.Label>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Select Role</Form.Label>
          <AsyncSelect
            styles={{
              menuPortal: (base) => ({
                ...base,
                zIndex: 9999,
              }),
            }}
            defaultOptions={roles}
            value={selectedRole}
            onChange={(newValue) => {
              setSelectedRole(newValue);
              setUser({ ...user, role: newValue.value });
            }}
            placeholder={"Select Role"}
          />
        </Form.Group>
        {error && (
          <Form.Label className="text-danger pt-3">{errMsg}</Form.Label>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={toggle} variant="danger rounded">
          Close
        </Button>
        <Button
          variant="primary  rounded"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <Spinner color="primary" animation="border" />
          ) : (
            "Save changes"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUserModal;
