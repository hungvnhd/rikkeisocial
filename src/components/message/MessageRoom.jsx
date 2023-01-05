function MessageRoom({ rooms }) {
  return (
    <>
      <div className='message-room'>
        <div className='message-room__container'>
          <img src={rooms.user.userAva} alt='' className='message-room__img' />
          <div>
            <div className='message-room__name'>{rooms.user.userName}</div>
            <div className='message-room__lastmessage'>Hello World</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MessageRoom;
