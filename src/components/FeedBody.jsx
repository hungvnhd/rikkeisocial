import React, { useState, useEffect } from "react";

import CreatePost from "./CreatePost";
import Post from "./Post";
import Cookie from "js-cookie";

function FeedBody(props) {
  const { userData } = props;

  const [postData, setPostData] = useState();
  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const data = await fetch(
        `http://127.0.0.1:8000/api/v1/posts/${Cookie.get("userID")}`
      );
      // convert the data to json
      const json = await data.json();

      // set state with the result
      setPostData(json);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [postData]);
  if (!postData) {
    return <div>loading....</div>;
  }
  // console.log(postData);
  return (
    <div>
      <CreatePost userData={userData} />

      {postData.posts.map((e, i) => (
        <Post key={i} postData={e} userData={userData} />
      ))}
    </div>
  );
}

export default FeedBody;
