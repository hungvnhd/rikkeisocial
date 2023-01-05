import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import LikeComment from "./LikeComment";
import Reply from "./Reply";
// import { Reply } from "@mui/icons-material";

function Comment(props) {
  const { comments } = props;
  console.log(comments);
  const [displayRep, setDisplayRep] = useState("none");
  const handleReply = (e) => {
    if (displayRep === "none") {
      setDisplayRep("block");
    } else {
      setDisplayRep("none");
    }
  };
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        marginTop: "10px",
      }}
    >
      {comments.map((e) => (
        <ListItem alignItems='flex-start'>
          <ListItemAvatar>
            <Avatar alt='Remy Sharp' src={e.userAva} />
          </ListItemAvatar>
          <ListItemText
            primary={e.userName}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component='span'
                  variant='body2'
                  color='text.primary'
                >
                  {e.content}
                </Typography>
                <LikeComment comments={e} />
                <div onClick={handleReply}>See reply</div>
                <div style={{ display: displayRep }}>
                  <Reply />
                </div>
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
      <Divider variant='inset' component='li' />
    </List>
  );
}
export default Comment;
