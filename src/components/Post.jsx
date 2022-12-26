import React, { useState, useEffect } from "react";

function Post(props) {
  const { postData } = props;
  console.log(postData.postId);
  const [style, setStyle] = useState({ display: "none" });
  const [like, setLike] = useState({
    status: false,
    color: "#408EE5",
    icon: "fa-solid fa-thumbs-up",
    name: "Like",
    default: true,
  });
  const [clap, setClap] = useState({
    status: false,
    color: "#73AD57",
    icon: "fa-solid fa-hands-clapping",
    name: "Clap",

    default: false,
  });
  const [heart, setHeart] = useState({
    status: false,
    color: "#F7251C",
    icon: "fa-solid fa-heart",
    name: "Love",
    default: false,
  });
  const [haha, setHaha] = useState({
    status: false,
    color: "#F8C035",
    icon: "fa-solid fa-face-laugh-squint",
    name: "Haha",
    default: false,
  });
  const [dislike, setDislike] = useState({
    status: false,
    color: "#980202",
    icon: "fa-solid fa-thumbs-down",
    name: "Dislike",
    default: false,
  });
  const reactState = [like, clap, heart, haha, dislike];
  const handleClick = (e) => {
    console.log(e.target.id);
    if (e.target.id === "like") {
      setLike({
        status: true,
        color: "#408EE5",
        default: true,
        icon: "fa-solid fa-thumbs-up",
        name: "Like",
      });
      setClap({
        status: false,
        color: "#73AD57",
        default: false,
        icon: "fa-solid fa-hands-clapping",
        name: "Clap",
      });
      setHeart({
        status: false,
        color: "#F7251C",
        default: false,
        icon: "fa-solid fa-heart",
        name: "Love",
      });
      setHaha({
        status: false,
        color: "#F8C035",
        default: false,
        icon: "fa-solid fa-face-laugh-squint",
        name: "Haha",
      });
      setDislike({
        status: false,
        color: "#980202",
        default: false,
        icon: "fa-solid fa-thumbs-down",
        name: "Dislike",
        e,
      });
    } else if (e.target.id === "clap") {
      setLike({
        status: false,
        color: "#408EE5",
        default: false,
        icon: "fa-solid fa-thumbs-up",
        name: "Like",
      });
      setClap({
        status: true,
        color: "#73AD57",
        default: true,
        icon: "fa-solid fa-hands-clapping",
        name: "Clap",
      });
      setHeart({
        status: false,
        color: "#F7251C",
        default: false,
        icon: "fa-solid fa-heart",
        name: "Love",
      });
      setHaha({
        status: false,
        color: "#F8C035",
        default: false,
        icon: "fa-solid fa-face-laugh-squint",
        name: "Haha",
      });
      setDislike({
        status: false,
        color: "#980202",
        default: false,
        icon: "fa-solid fa-thumbs-down",
        name: "Dislike",
        e,
      });
    } else if (e.target.id === "heart") {
      setLike({
        status: false,
        color: "#408EE5",
        default: false,
        icon: "fa-solid fa-thumbs-up",
        name: "Like",
      });
      setClap({
        status: false,
        color: "#73AD57",
        default: false,
        icon: "fa-solid fa-hands-clapping",
        name: "Clap",
      });
      setHeart({
        status: true,
        color: "#F7251C",
        default: true,
        icon: "fa-solid fa-heart",
        name: "Love",
      });
      setHaha({
        status: false,
        color: "#F8C035",
        default: false,
        icon: "fa-solid fa-face-laugh-squint",
        name: "Haha",
      });
      setDislike({
        status: false,
        color: "#980202",
        default: false,
        icon: "fa-solid fa-thumbs-down",
        name: "Dislike",
        e,
      });
    } else if (e.target.id === "haha") {
      setLike({
        status: false,
        color: "#408EE5",
        default: false,
        icon: "fa-solid fa-thumbs-up",
        name: "Like",
      });
      setClap({
        status: false,
        color: "#73AD57",
        default: false,
        icon: "fa-solid fa-hands-clapping",
        name: "Clap",
      });
      setHeart({
        status: false,
        color: "#F7251C",
        default: false,
        icon: "fa-solid fa-heart",
        name: "Love",
      });
      setHaha({
        status: true,
        color: "#F8C035",
        default: true,
        icon: "fa-solid fa-face-laugh-squint",
        name: "Haha",
      });
      setDislike({
        status: false,
        color: "#980202",
        default: false,
        icon: "fa-solid fa-thumbs-down",
        name: "Dislike",
        e,
      });
    } else if (e.target.id === "dislike") {
      setLike({
        status: false,
        color: "#408EE5",
        default: false,
        icon: "fa-solid fa-thumbs-up",
        name: "Like",
      });
      setClap({
        status: false,
        color: "#73AD57",
        default: false,
        icon: "fa-solid fa-hands-clapping",
        name: "Clap",
      });
      setHeart({
        status: false,
        color: "#F7251C",
        default: false,
        icon: "fa-solid fa-heart",
        name: "Love",
      });
      setHaha({
        status: false,
        color: "#F8C035",
        default: false,
        icon: "fa-solid fa-face-laugh-squint",
        name: "Haha",
      });
      setDislike({
        status: true,
        color: "#980202",
        default: true,
        icon: "fa-solid fa-thumbs-down",
        name: "Dislike",
      });
    }
  };
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50px", marginRight: "10px" }}>
          <img
            style={{ width: "100%" }}
            src='https://avatars.githubusercontent.com/u/55929607?v=4'
            alt=''
          />
        </div>
        <div>
          <span> Manh Hung Nguyen</span>
          <div>Talent Acquisition Executive at Rikkeisoft</div>
          <div>
            <span>
              <i class='fa-solid fa-globe'></i>
            </span>
          </div>
        </div>
      </div>
      <div style={{ width: "500px" }}>{postData.content}</div>
      <div style={{ width: "500px" }}>
        {postData.postImg !== null ? (
          <img style={{ width: "100%" }} src={postData.postImg} alt='' />
        ) : (
          ""
        )}
      </div>
      <div className='display-like-comment'>
        <span>5 likes</span>
        <span>10 comments</span>
      </div>
      <div className='like-comment-share'>
        <div
          className='like-comment-share__btn'
          onMouseEnter={(e) => {
            setStyle({ display: "block" });
          }}
          onMouseLeave={(e) => {
            setStyle({ display: "none" });
          }}
        >
          {reactState.map((e, i) => {
            if (e.status) {
              return (
                <span key={i} style={{ color: e.color }}>
                  <i className={e.icon}></i> {e.name}
                </span>
              );
            } else if (e.default) {
              return (
                <span key={i} style={{ color: "#666666" }}>
                  <i className='fa-solid fa-thumbs-up'></i> Like
                </span>
              );
            }
          })}

          <div className='post-reactions' style={style}>
            <div>
              <span id='like' onClick={handleClick}>
                <i
                  id='like'
                  style={{ color: "#408EE5" }}
                  className='fa-solid fa-thumbs-up'
                ></i>
              </span>
              <span id='clap' onClick={handleClick}>
                <i
                  id='clap'
                  style={{ color: "#73AD57" }}
                  className='fa-solid fa-hands-clapping'
                ></i>
              </span>
              <span id='heart' onClick={handleClick}>
                <i
                  id='heart'
                  style={{ color: "#F7251C" }}
                  className='fa-solid fa-heart'
                ></i>
              </span>
              <span id='haha' onClick={handleClick}>
                <i
                  id='haha'
                  style={{ color: "#F8C035" }}
                  className='fa-solid fa-face-laugh-squint'
                ></i>
              </span>

              <span id='dislike' onClick={handleClick}>
                <i
                  id='dislike'
                  style={{ color: "#980202" }}
                  className='fa-solid fa-thumbs-down'
                ></i>
              </span>
            </div>
          </div>
        </div>
        <div className='like-comment-share__btn'>
          <span>
            <i className='fa-solid fa-comment'></i> Comment
          </span>
        </div>
        <div className='like-comment-share__btn'>
          <span>
            <i className='fa-solid fa-share'></i> Share
          </span>
        </div>
      </div>
    </div>
  );
}

export default Post;
