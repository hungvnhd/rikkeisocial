import React, { useState, useEffect } from "react";

import CreatePost from "./CreatePost";
import Post from "./Post";

function FeedBody() {
  const [postData, setPostData] = useState();
  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const data = await fetch("http://127.0.0.1:8000/api/v1/posts/116223");
      // convert the data to json
      const json = await data.json();

      // set state with the result
      setPostData(json);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);
  if (!postData) {
    return <div>loading....</div>;
  }

  return (
    <div>
      <CreatePost />

      {postData.map((e, i) => (
        <Post key={i} postData={e} />
      ))}
    </div>
  );
}

export default FeedBody;
