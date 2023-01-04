import React, { useState } from "react";
import useFirestore from "../hooks/useFirestore";
import { AuthContext } from "./AuthProvider";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isAddFriendVisible, setIsAddFriendVisible] = useState(false);
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [selectedFriendId, setSelectedFriendId] = useState("");
  // const [room, setRoom] = useState({});

  const {
    user: { uid },
  } = React.useContext(AuthContext);

  const friendsComdition = React.useMemo(() => {
    return {
      fieldName: "friends",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);

  const friends = useFirestore("users", friendsComdition);

  const friend = friends.find((e) => e.uid === Number(selectedFriendId));

  const roomsCondition = React.useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);
  const rooms = useFirestore("rooms", roomsCondition);

  const roomsnhom = rooms.filter((e) => {
    return e.coderoom === "";
  });
  // const friendRoomComdition = React.useMemo(() => {
  //   return {
  //     fieldName: "coderoom",
  //     operator: "array-contains",
  //     compareValue: uid + selectedFriendId,
  //   };
  // }, [uid + selectedFriendId]);
  // const chatFriendRoom = useFirestore("rooms", friendRoomComdition);

  // const chatFriendRoom1 = React.useMemo(
  //   () => chatFriendRoom[0] || {},
  //   [rooms, chatFriendRoom]
  // );
  // console.log(selectedRoomId);

  const friendRoomComdition = React.useMemo(() => {
    return {
      fieldName: "coderoom",
      operator: "array-contains",
      compareValue: uid + selectedFriendId,
    };
  }, [uid + selectedFriendId]);

  const chatFriendRoom = useFirestore("rooms", friendRoomComdition);
  // console.log(chatFriendRoom);
  const friendRoom = React.useMemo(
    () => chatFriendRoom[0] || {},
    [chatFriendRoom]
  );

  const selectedRoom = React.useMemo(
    () => rooms.find((room) => room.id === selectedRoomId) || {},
    [rooms, selectedRoomId]
  );
  // console.log(selectedRoom);
  const usersCondition = React.useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: selectedRoom.members,
    };
  }, [selectedRoom.members]);

  const members = useFirestore("users", usersCondition);

  // console.log("1.--", selectedRoom);
  // console.log("2.--", friendRoom);

  const clearState = () => {
    setSelectedRoomId("");
    setSelectedFriendId("");
    setIsAddRoomVisible(false);
    setIsAddFriendVisible(false);
    setIsInviteMemberVisible(false);
  };

  // if (!friendRoom.coderoom) {
  //   setRoom(selectedRoom);
  // } else {
  //   setRoom(friendRoom);
  // }

  return (
    <AppContext.Provider
      value={{
        rooms,
        roomsnhom,
        members,
        friends,
        friend,
        friendRoom,
        selectedRoom,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectedFriendId,
        setSelectedFriendId,
        isAddFriendVisible,
        setIsAddFriendVisible,
        selectedRoomId,
        setSelectedRoomId,
        isInviteMemberVisible,
        setIsInviteMemberVisible,
        clearState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
