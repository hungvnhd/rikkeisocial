import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import ChatRoom from "./ChatRoom";

function Messages() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={1.5}></Grid>
        <Grid xs={6}>
          <ChatRoom />
        </Grid>
        <Grid xs={2.5}>
          <div className='block'>Add to your feed</div>
        </Grid>
        <Grid xs={2}></Grid>
      </Grid>
    </>
  );
}

export default Messages;
