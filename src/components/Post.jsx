import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Comment from "./Comment";
import { display } from "@mui/system";
//Hook delete reaction
import { set } from "react-hook-form";
import { SendReaction } from "../helpers/SendReaction";
import Cookies from "js-cookie";
import { DeleteReaction } from "../helpers/DeleteReaction";
import { formatDate } from "../helpers/ConvertDate";
import { PostAddTwoTone } from "@mui/icons-material";
import LoadingPost from "./LoadingPost";

function Post(props) {
  const { postData, userData } = props;

  const [postComment, setPostComment] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `http://127.0.0.1:8000/api/v1/comments/${postData.postId}`
      );
      const json = await data.json().catch((err) => {
        console.log(err);
      });
      // console.log(json);
      setPostComment(json);
    };

    fetchData();
  }, [postData]);
  // console.log(postData);
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
  useEffect(() => {
    if (postData.defaultReaction === "like") {
      setLike({
        ...like,
        status: true,
      });
    } else if (postData.defaultReaction === "haha") {
      setHaha({
        ...haha,
        status: true,
      });
      setLike({
        ...like,
        default: false,
      });
    } else if (postData.defaultReaction === "love") {
      setHeart({
        ...heart,
        status: true,
      });
      setLike({
        ...like,
        default: false,
      });
    } else if (postData.defaultReaction === "clap") {
      setClap({
        ...clap,
        status: true,
      });
      setLike({
        ...like,
        default: false,
      });
    } else if (postData.defaultReaction === "dislike") {
      setDislike({
        ...dislike,
        status: true,
      });
      setLike({
        ...like,
        default: false,
      });
    }
  }, []);

  const handleClick = (e) => {
    if (e.target.id === "Like" && !like.status) {
      SendReaction(postData.postId, "like", Cookies.get("userID"));
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
      SendReaction(postData.postId, "clap", Cookies.get("userID"));

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
      SendReaction(postData.postId, "love", Cookies.get("userID"));

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
      SendReaction(postData.postId, "haha", Cookies.get("userID"));

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
      SendReaction(postData.postId, "dislike", Cookies.get("userID"));

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
      DeleteReaction(postData.postId, "love");
      setHeart({
        ...heart,
        status: !heart.status,
        default: true,
      });
    } else if (e.target.id === "Clap" && clap.status) {
      DeleteReaction(postData.postId, "clap");

      setClap({
        ...clap,
        status: !clap.status,
        default: true,
      });
    } else if (e.target.id === "Haha" && haha.status) {
      DeleteReaction(postData.postId, "haha");

      setHaha({
        ...haha,
        status: !haha.status,
        default: true,
      });
    } else if (e.target.id === "Dislike" && dislike.status) {
      DeleteReaction(postData.postId, "dislike");

      setDislike({
        ...dislike,
        status: !dislike.status,
        default: true,
      });
    } else if (e.target.id === "Like" && like.status) {
      DeleteReaction(postData.postId, "like");
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
      SendReaction(postData.postId, "like", Cookies.get("userID"));

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
  const [comment, setComment] = useState({ display: "none" });
  const handleClickComment = (e) => {
    if (comment.display === "none") {
      setComment({ display: "block" });
    } else {
      setComment({ display: "none" });
    }
  };
  const [inputComment, setInputComment] = useState("");
  const handleChange = (e) => {
    setInputComment(e.target.value);
  };
  const handleSubmit = (e) => {
    if (inputComment === "") {
      console.log("invalid");
    }
    setInputComment("");
    e.preventDefault();

    const data = {
      postID: postData.postId,
      content: inputComment,
      commentOf: Cookies.get("userID"),
    };
    fetch("http://127.0.0.1:8000/api/v1/comments/addComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  if (!postComment) {
    return <LoadingPost />;
  }
  // console.log(postData.createAt.split(" "));
  //old
  // console.log(
  //   postData.createAt.split(" ")[0].split("-"), //ngay thang
  //   postData.createAt.split(" ")[1].split(":") // gio
  // );
  // //now
  // console.log(new Date().toString().split(" ")[4].split(":")); //gio
  // console.log(formatDate(new Date()).split("-")); // ngay thang
  let passedTime = 0;
  if (postData.createAt) {
    let dateDayOld = Number(postData.createAt.split(" ")[0].split("-")[2]);
    let dateHourOld = Number(postData.createAt.split(" ")[1].split(":")[0]);
    let dateMinuteOld = Number(postData.createAt.split(" ")[1].split(":")[1]);
    let dateSecondOld = Number(postData.createAt.split(" ")[1].split(":")[2]);

    let dateDayNow = Number(formatDate(new Date()).split("-")[2]);
    let dateHourNow = Number(new Date().toString().split(" ")[4].split(":")[0]);
    let dateMinuteNow = Number(
      new Date().toString().split(" ")[4].split(":")[1]
    );
    let dateSecondNow = Number(
      new Date().toString().split(" ")[4].split(":")[2]
    );
    if (dateDayNow > dateDayOld) {
      passedTime = `${dateDayNow - dateDayOld}d`;
    } else if (dateDayNow === dateDayOld) {
      if (dateHourNow > dateHourOld) {
        passedTime = `${dateHourNow - dateHourOld}h`;
      } else if (dateHourNow === dateHourOld) {
        if (dateMinuteNow > dateMinuteOld)
          passedTime = `${dateMinuteNow - dateMinuteOld}m`;
        else if (dateMinuteNow === dateMinuteOld) {
          if (dateSecondNow > dateSecondOld) {
            passedTime = `${dateSecondNow - dateSecondOld}s`;
          } else if (dateSecondNow === dateSecondOld) {
            passedTime = "Just now";
          }
        }
      }
    }
  }

  return (
    <div className='block'>
      <div style={{ display: "flex", padding: "10px 15px 0px 15px" }}>
        <div
          style={{
            marginRight: "5px",

            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            src={postData.userData.avatar}
            alt=''
          />
        </div>
        <div className='post-info-detail'>
          <div>{postData.userData.fullName}</div>
          <div className='post-info-detail-job'>
            {postData.userData.job} at {postData.userData.company}
          </div>
          <div className='post-info-detail-job'>
            <span>
              {passedTime} • <i class='fa-solid fa-globe'></i>
            </span>
          </div>
        </div>
      </div>
      <div style={{ width: "100%", padding: "15px" }}>{postData.content}</div>
      <div style={{ width: "100%" }}>
        {postData.postImg !== null ? (
          <img style={{ width: "100%" }} src={postData.postImg} alt='' />
        ) : (
          ""
        )}
      </div>
      <div className='display-like-comment'>
        {postData.totalReactions !== 0 ? (
          <span>
            {postData.totalReactions}
            <span className='mostReactions'>
              {postData.top3reactions.map((e) => {
                // return (
                //   <span style={{ color: e.color }}>
                //     <i className={e.type}></i>
                //   </span>
                // );
                if (e.total === 0) {
                  return <span></span>;
                } else {
                  return (
                    <span style={{ color: e.color }}>
                      <i className={e.type}></i>
                    </span>
                  );
                }
              })}
            </span>
          </span>
        ) : (
          <span></span>
        )}
        {postData.totalComments !== 0 ? (
          <span>
            {postData.totalComments} comment
            {postData.totalComments !== 1 ? "s" : ""}
          </span>
        ) : (
          <span></span>
        )}
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

          <div className='post-reactions' style={style}>
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
        </div>
        <div className='like-comment-share__btn' onClick={handleClickComment}>
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
      <div style={comment}>
        <div className='post-user-comment-block'>
          <div
            style={{
              marginRight: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              src={userData[0].avatar}
              alt=''
            />
          </div>
          <form onSubmit={handleSubmit} action='' style={{ width: "100%" }}>
            <input
              onChange={handleChange}
              value={inputComment}
              className='post-user-comment'
              placeholder='Add a comment'
              name='comment'
            />
          </form>
        </div>
        <Comment comments={postComment.data} />
      </div>
    </div>
  );
}

export default Post;
