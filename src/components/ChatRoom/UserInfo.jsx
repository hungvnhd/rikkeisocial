import React from "react";
import { Button, Typography, Avatar } from "antd";

import styled from "styled-components";
import { auth } from "../firebase/config";
import { AuthContext } from "../../Context/AuthProvider";

const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 38, 83);

  .user-name {
    margin-left: 5px;
  }
`;

export default function UserInfo() {
  const {
    user: { displayName, photoURL },
  } = React.useContext(AuthContext);

  return (
    <div>
      <WrapperStyled>
        <div>
          <h4>Messaging</h4>
        </div>
      </WrapperStyled>
    </div>
  );
}
