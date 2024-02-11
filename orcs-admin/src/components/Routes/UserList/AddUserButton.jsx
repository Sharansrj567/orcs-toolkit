import React, { useState } from "react";
import { Button } from "react-bootstrap";

import AddUserModal from "./AddUserModal";

const AddUserButton = ({ edit = false, user = {}, onReload = null }) => {
  const [visible, setvisible] = useState(false);
  const toggle = () => {
    setvisible(!visible);
  };

  return (
    <>
      <Button
        className="bg-transparent text-primary py-2"
        onClick={() => toggle()}
      >
        {edit ? "Edit User" : "Add User"}
      </Button>
      {visible && (
        <AddUserModal
          visible={visible}
          onReload={onReload}
          toggle={toggle}
          edit={edit}
          propUser={user}
        />
      )}
    </>
  );
};

export default AddUserButton;
