import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function MessageRoomDetail() {
  const [message, setMessage] = useState();
  const [inputMessage, setInputMessage] = useState("");
  useEffect(() => {
    const roomID = window.location.href.replace(
      "http://localhost:3000/messaging/",
      ""
    );
    // console.log(
    //   window.location.href.replace("http://localhost:3000/messaging/", "")
    // );
    const getData = async () => {
      const res = await fetch(
        `http://127.0.0.1:8000/api/v1/messages/room/${roomID}`
      );
      const data = await res.json();
      setMessage(data.data);
    };
    getData();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.inputMessage.value);
    const roomID = window.location.href.replace(
      "http://localhost:3000/messaging/",
      ""
    );
    if (e.target.inputMessage.value !== "") {
      const data = {
        messageOf: Cookies.get("userID"),
        messageContent: e.target.inputMessage.value,
      };
      fetch(`http://127.0.0.1:8000/api/v1/messages/send/${roomID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((data) => {
          setInputMessage("");
          console.log(data);
        })
        .catch((err) => console.log(err));
    }
  };
  const handleChange = (e) => {
    setInputMessage(e.target.value);
  };
  if (!message) {
    return <div>LOADING...</div>;
  }
  console.log(message);
  return (
    <>
      <div className='message-room-detail__container'>
        <div className='message-detail__header'>
          <div className='message-detail__name'>Mark Zuckerberg</div>
          <div className='message-detail__active'> Active now</div>
        </div>
        <div className='message-detail__body'>
          {message.map((e) => (
            <div className='message-detail__content'>
              <div className='detail-content__img'>
                <img
                  src={
                    e.userDetail.userAva
                      ? e.userDetail.userAva
                      : "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg"
                  }
                  alt=''
                />
              </div>
              <div className='detail-message__name'>
                {e.userDetail.userName} - {e.createdAt}
                <div className='detail-message__content'>
                  {e.messageContent}
                </div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <div className='message-detail__form'>
            <input
              value={inputMessage}
              onChange={handleChange}
              name='inputMessage'
              type='text'
              placeholder='write a message ... '
              className='message-detail__input'
            />
            <button>send</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default MessageRoomDetail;
