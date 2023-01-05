import { Link } from "react-router-dom";
import MessageRoom from "./MessageRoom";
import MessageRoomDetail from "./MessageRoomDetail";

function MessageRoomsContainer(props) {
  const { rooms } = props;
  return (
    <>
      <div className='message-rooms-container'>
        <div className='message-room-header'>Messaging</div>
        {rooms.map((e) => (
          <Link to={`/messaging/${e.roomID}`}>
            <MessageRoom rooms={e} />
          </Link>
        ))}
      </div>

      <MessageRoomDetail />
    </>
  );
}

export default MessageRoomsContainer;
