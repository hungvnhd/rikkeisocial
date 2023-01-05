import React, { useState, useEffect } from "react";
function LikeComment(props) {
  const { comments } = props;
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
    if (e.target.id === "Like" && !like.status) {
      //   SendReaction(postData.postId, "like", Cookies.get("userID"));
      setLike({
        ...like,
        status: true,
        default: true,
      });
      setClap({
        ...clap,
        status: false,
        default: false,
      });
      setHeart({
        ...heart,
        status: false,
        default: false,
      });
      setHaha({
        ...haha,
        status: false,
        default: false,
      });
      setDislike({
        ...dislike,
        status: false,
        default: false,
      });
    } else if (e.target.id === "Clap" && !clap.status) {
      //   SendReaction(postData.postId, "clap", Cookies.get("userID"));

      setLike({
        ...like,
        status: false,
        default: false,
      });
      setClap({
        ...clap,
        status: true,
        default: true,
      });
      setHeart({
        ...heart,
        status: false,
        default: false,
      });
      setHaha({
        ...haha,
        status: false,
        default: false,
      });
      setDislike({
        ...dislike,
        status: false,
        default: false,
      });
    } else if (e.target.id === "Heart" && !heart.status) {
      //   SendReaction(postData.postId, "love", Cookies.get("userID"));

      setLike({
        ...like,
        status: false,
        default: false,
      });
      setClap({
        ...clap,
        status: false,
        default: false,
      });
      setHeart({
        ...heart,
        status: true,
        default: true,
      });
      setHaha({
        ...haha,
        status: false,
        default: false,
      });
      setDislike({
        ...dislike,
        status: false,
        default: false,
      });
    } else if (e.target.id === "Haha" && !haha.status) {
      //   SendReaction(postData.postId, "haha", Cookies.get("userID"));

      setLike({
        ...like,
        status: false,
        default: false,
      });
      setClap({
        ...clap,
        status: false,
        default: false,
      });
      setHeart({
        ...heart,
        status: false,
        default: false,
      });
      setHaha({
        ...haha,
        status: true,
        default: true,
      });
      setDislike({
        ...dislike,
        status: false,
        default: false,
      });
    } else if (e.target.id === "Dislike" && !dislike.status) {
      //   SendReaction(postData.postId, "dislike", Cookies.get("userID"));

      setLike({
        ...like,
        status: false,
        default: false,
      });
      setClap({
        ...clap,
        status: false,
        default: false,
      });
      setHeart({
        ...heart,
        status: false,
        default: false,
      });
      setHaha({
        ...haha,
        status: false,
        default: false,
      });
      setDislike({
        ...dislike,
        status: true,
        default: true,
      });
    }
    // console.log(like, dislike, haha, heart, clap);
  };
  const handleClickPost = (e) => {
    if (e.target.id === "Love" && heart.status) {
      //   DeleteReaction(postData.postId, "love");
      setHeart({
        ...heart,
        status: !heart.status,
        default: true,
      });
    } else if (e.target.id === "Clap" && clap.status) {
      //   DeleteReaction(postData.postId, "clap");

      setClap({
        ...clap,
        status: !clap.status,
        default: true,
      });
    } else if (e.target.id === "Haha" && haha.status) {
      //   DeleteReaction(postData.postId, "haha");

      setHaha({
        ...haha,
        status: !haha.status,
        default: true,
      });
    } else if (e.target.id === "Dislike" && dislike.status) {
      //   DeleteReaction(postData.postId, "dislike");

      setDislike({
        ...dislike,
        status: !dislike.status,
        default: true,
      });
    } else if (e.target.id === "Like" && like.status) {
      //   DeleteReaction(postData.postId, "like");
      console.log("turn off");
      setLike({
        ...like,
        status: false,
        default: true,
      });
      setClap({
        ...clap,
        default: false,
      });
      setHeart({
        ...heart,
        default: false,
      });
      setHaha({
        ...haha,
        default: false,
      });
      setDislike({
        ...dislike,
        default: false,
      });
    } else {
      //   SendReaction(postData.postId, "like", Cookies.get("userID"));

      setLike({
        ...like,
        status: true,
        default: true,
      });
      setClap({
        ...clap,
        default: false,
      });
      setHeart({
        ...heart,
        default: false,
      });
      setHaha({
        ...haha,
        default: false,
      });
      setDislike({
        ...dislike,
        default: false,
      });
    }
  };
  const [display, setDisplay] = useState("none");
  const handleClickReply = (e) => {
    console.log(comments);
    if (display === "none") {
      setDisplay("block");
    } else {
      setDisplay("none");
    }
  };

  return (
    <>
      <div className='like-reply'>
        <span
          className='like-comment'
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
                <span
                  onClick={handleClickPost}
                  id={e.name}
                  style={{ color: e.color }}
                >
                  <i id={e.name} className={e.icon}></i> {e.name}
                </span>
              );
            } else if (e.default) {
              return (
                <span
                  onClick={handleClickPost}
                  id={e.name}
                  style={{ color: "#666666" }}
                >
                  <i id={e.name} className='fa-solid fa-thumbs-up'></i> Like
                </span>
              );
            }
          })}
          <div className='post-reactions-comment' style={style}>
            <div>
              <span id='Like' onClick={handleClick}>
                <i
                  id='Like'
                  style={{ color: "#408EE5" }}
                  className='fa-solid fa-thumbs-up'
                ></i>
              </span>
              <span id='Clap' onClick={handleClick}>
                <i
                  id='Clap'
                  style={{ color: "#73AD57" }}
                  className='fa-solid fa-hands-clapping'
                ></i>
              </span>
              <span id='Heart' onClick={handleClick}>
                <i
                  id='Heart'
                  style={{ color: "#F7251C" }}
                  className='fa-solid fa-heart'
                ></i>
              </span>
              <span id='Haha' onClick={handleClick}>
                <i
                  id='Haha'
                  style={{ color: "#F8C035" }}
                  className='fa-solid fa-face-laugh-squint'
                ></i>
              </span>

              <span id='Dislike' onClick={handleClick}>
                <i
                  id='Dislike'
                  style={{ color: "#980202" }}
                  className='fa-solid fa-thumbs-down'
                ></i>
              </span>
            </div>
          </div>
        </span>
        <span>|</span>
        <span className='reply-comment' onClick={handleClickReply}>
          Reply
        </span>
        <form style={{ display: display }}>
            <div style={{display:"flex",alignItems:"center"}}>
          <img
            alt=''
            src={comments.userAva}
            style={{ width: "25px", height: "25px", borderRadius: "50%" }}
          />

          <input
            style={{
              borderRadius: "99px",
              width: "100%",
              height: "25px",
              paddingLeft:"5px",
             outline:"none",
             marginLeft:"5px"
            }}
            className="input-reply"
          />
          </div>
        </form>
      </div>
    </>
  );
}

export default LikeComment;
