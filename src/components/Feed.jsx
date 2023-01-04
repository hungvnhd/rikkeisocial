import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";

import Grid from "@mui/material/Unstable_Grid2";
import Footer from "./Footer";
import NavigateBar from "./NavigateBar";
import Loading from "../helpers/Loading";
import FeedBody from "./FeedBody";

function Feed() {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `http://127.0.0.1:8000/api/v1/users/${Cookies.get("userID")}`
      );
      const json = await data.json();

      setUserData(json);
    };
    fetchData();
  }, []);
  if (userData.length === 0) {
    return <Loading />;
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={1.5}></Grid>

        <Grid xs={2}>
          <div className='block'>
            <div className='background-ava'>
              <img
                src='https://htmlcolorcodes.com/assets/images/colors/mint-green-color-solid-background-1920x1080.png'
                className='background-image'
                alt=''
              />

              <img src={userData[0].avatar} className='feed-ava' alt='' />
            </div>

            <div className='feed-name'>{userData[0].fullName}</div>
            <p className='feed-bio'>{userData[0].jobs}</p>
            <div className='feed-title'>Connection</div>
            <div className='feed-title'>My items</div>
          </div>
          <div className='block-community-panel'>
            <div className='community-panel'>Groups</div>
            <div className='community-panel'>Events</div>
            <div className='community-panel'>Followed Hashtags</div>
          </div>
        </Grid>

        <Grid xs={4}>
          <FeedBody userData={userData} />
        </Grid>

        <Grid xs={2.5} className='feed-right-block'>
          <div className='block'>Add to your feed</div>
          <div></div>
          <Footer />
        </Grid>
        <Grid xs={2}></Grid>
      </Grid>
    </>
  );
}

export default Feed;
