import React, { useState } from "react";
import { Button } from "react-bootstrap";

import BanListModal from "./BanModal";

const BanlistButton = ({
  edit = false,
  role = "",
  banList = [],
  onReload,
  socket,
}) => {
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
        {edit ? "Edit" : "Add Policy"}
      </Button>
      {visible && (
        <BanListModal
          onReload={onReload}
          visible={visible}
          toggle={toggle}
          edit={edit}
          propBanList={banList}
          propRole={role}
          socket={socket}
        />
      )}
    </>
  );
};

export default BanlistButton;
