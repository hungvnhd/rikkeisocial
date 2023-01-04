import React from "react";
import { Collapse, Typography, Avatar } from "antd";
import styled from "styled-components";
import { AppContext } from "../../Context/AppProvider";
import { addDocument } from "../firebase/services";
import { AuthContext } from "../../Context/AuthProvider";
import useFirestore from "../../hooks/useFirestore";

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  margin: 10px 5px;
`;

const LinkAvatar = styled(Avatar)`
  margin: 0px 5px;
`;

export default function RoomList() {
  const {
    friends,
    setSelectedFriendId,
    // selectedFriendId,
    // setFriendRoom,
    friend,
    setSelectedRoomId,
    friendRoom,
  } = React.useContext(AppContext);
  const {
    user: { uid },
  } = React.useContext(AuthContext);
  // const friendRoomComdition = React.useMemo(() => {
  //   return {
  //     fieldName: "coderoom",
  //     operator: "array-contains",
  //     compareValue: uid + selectedFriendId,
  //   };
  // }, [uid + selectedFriendId]);
  // // console.log(selectedFriendId + uid);
  // const chatFriendRoom = useFirestore("rooms", friendRoomComdition);
  // // console.log(chatFriendRoom);
  // const chatFriendRoom1 = React.useMemo(
  //   () => chatFriendRoom[0] || {},
  //   [chatFriendRoom]
  // );

  // setFriendRoom(chatFriendRoom1);
  // console.log(chatFriendRoom1.id);
  const handleFriend = (e) => {
    const friendId = e.target.id;
    setSelectedFriendId(friendId);
    setSelectedRoomId(friendRoom.id);

    // if (chatFriendRoom1) {
    //   console.log(123);
    // } else {
    // addDocument("rooms", {
    //   members: [uid, friendId],
    //   name: friend.displayName,
    //   coderoom: [uid + friendId, friendId + uid],
    //   description: "",
    // });
    // }
  };

  return (
    <Collapse ghost defaultActiveKey={["1"]}>
      <div className='list-friend'>
        {friends.map((e) => (
          <LinkStyled key={e.id} id={e.uid} onClick={handleFriend}>
            <LinkAvatar src={e.photoURL}></LinkAvatar>
            {e.displayName}
          </LinkStyled>
        ))}
      </div>
    </Collapse>
  );
}
