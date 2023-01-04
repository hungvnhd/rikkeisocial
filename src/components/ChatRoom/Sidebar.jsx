import React from "react";
import { Row, Col } from "antd";
import UserInfo from "./UserInfo";
import RoomList from "./RoomList";
import FriendList from "./FriendList";
import styled from "styled-components";
import Login from "../Login/Login";
const SidebarStyler = styled.div`
  background: #f5f5f5;
  height: 90vh;
  border: 1px solid #bebaba;
  border-radius: 5px;
`;

export default function Sidebar() {
  return (
    <SidebarStyler>
      <Row>
        <Col span={24}>
          <UserInfo />
        </Col>
        <Col span={24}>
          <FriendList />
          <RoomList />
        </Col>
      </Row>
    </SidebarStyler>
  );
}
