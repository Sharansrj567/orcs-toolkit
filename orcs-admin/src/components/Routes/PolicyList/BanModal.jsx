import React, { useState, useEffect } from "react";
import api from "../../../utils/api";
import { Button, Modal, Form } from "react-bootstrap";
import AsyncSelect from "react-select/async";
import io from 'socket.io-client';

const BanListModal = ({
  visible,
  toggle,
  edit,
  propRole,
  onReload,
  propBanList,
}) => {
  const [socket, setSocket] = useState(null);

	useEffect(() => {
		let newSocket = io.connect('http://localhost:4000');
		newSocket.emit('clientAuth', process.env.REACT_APP_AUTH_SECRET);
		console.log('Newsocket', newSocket);
		setSocket(newSocket);
	}, []);

  const [role, setRole] = useState(propRole);
  const [error, setError] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [banList, setBanList] = useState(
    propBanList.length === 0
      ? []
      : propBanList.map((p) => {
          return { label: p, value: p };
        })
  );

  const handleSubmit = () => {
    if (role !== "") {
      setError(false);
      api
        .post(`/policy/${edit ? "updatePolicy" : "setPolicy"}`, {
          role,
          banList: banList.map((b) => b.value),
        })
        .then((res) => {
          onReload && onReload();
          console.log(socket);
          socket.emit("updated:Ban", {
            role, // default, student, faculty, admin
            status: edit ? "updated" : "created", // updated, deleted, created
          });
          console.log("Success", res);
          toggle();
        })
        .catch((err) => {
          setError(true);
          console.log(err);
        });
    } else {
      setError(true);
    }
  };

  const fetchFavorites = () => {
    api
      .get("/policy/getfavoriteProcesses")
      .then((res) => {
        setFavorites(res.data.map((m) => ({ value: m, label: m })));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <Modal className="fade" show={visible}>
      <Modal.Header>
        <Modal.Title>Set Ban-List</Modal.Title>
        <Button variant="" className="close" onClick={toggle}>
          <span>&times;</span>
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="my-2">
          <Form.Label>Role</Form.Label>
          <input
            type="text"
            className="w-100 p-2"
            defaultValue={role}
            onChange={(event) => setRole(event.target.value)}
            name="Role"
            disabled={edit}
            placeholder="Enter Role"
          />
          {error && (
            <Form.Label className="text-danger pt-3">
              Please Enter Valid Role
            </Form.Label>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Select Processes</Form.Label>
          <AsyncSelect
            styles={{
              menuPortal: (base) => ({
                ...base,
                zIndex: 9999,
              }),
            }}
            isMulti={true}
            defaultOptions={favorites}
            value={banList}
            onChange={(newValue) => {
              setBanList(newValue);
              console.log(banList);
            }}
            placeholder={"Select Processes"}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={toggle} variant="danger rounded">
          Close
        </Button>
        <Button variant="primary  rounded" onClick={handleSubmit}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BanListModal;
