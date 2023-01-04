import React from "react";
import { Collapse, Typography, Button } from "antd";
import styled from "styled-components";
import { PlusSquareOutlined } from "@ant-design/icons";
import { AppContext } from "../../Context/AppProvider";

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    .ant-collapse-content-box {
      padding: 0 20px;
    }

    .add-room {
      padding: 0;
    }
    background: #f5f5f5f;
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
`;

export default function RoomList() {
  const { roomsnhom, setIsAddRoomVisible, setSelectedRoomId } =
    React.useContext(AppContext);

  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  };

  return (
    <Collapse ghost defaultActiveKey={["0"]}>
      <PanelStyled header='Rooms List' key='1'>
        {roomsnhom.map((room) => (
          <LinkStyled key={room.id} onClick={() => setSelectedRoomId(room.id)}>
            {room.name}
          </LinkStyled>
        ))}
        <Button
          type='text'
          icon={<PlusSquareOutlined />}
          className='add-room'
          onClick={handleAddRoom}
        >
          Add Room
        </Button>
      </PanelStyled>
    </Collapse>
  );
}
