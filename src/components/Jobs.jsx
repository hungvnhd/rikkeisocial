import React from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CheckIcon from "@mui/icons-material/Check";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import SettingsIcon from "@mui/icons-material/Settings";
import Grid from "@mui/material/Unstable_Grid2";
import Footer from "./Footer";

function Jobs() {
  return (
    <>
      <div className='page-block'>
        <Grid container spacing={2}>
          <Grid xs={1.5}></Grid>
          <Grid xs={2}>
            <div className='left-block'>
              <ul className='job-block-left'>
                <li className='job-hoder-active-btn'>
                  <BookmarkIcon />
                  My jobs
                </li>
                <li className='job-hoder-active-btn'>
                  <NotificationsIcon />
                  Jobs alerts
                </li>
                <li className='job-hoder-active-btn'>
                  <CheckIcon />
                  Demonstrate skills
                </li>
                <li className='job-hoder-active-btn'>
                  <StickyNote2Icon />
                  Interview prep
                </li>
                <li className='job-hoder-active-btn'>
                  <NoteAddIcon />
                  Resume Builder
                </li>

                <li className='job-hoder-active-btn'>
                  <SmartDisplayIcon />
                  Job seeker guidance
                </li>
                <li className='job-hoder-active-btn'>
                  <SettingsIcon />
                  Application settings
                </li>
              </ul>
              <div className='btn-jobs-post'><div className="btn-jobs-post-inner">Post a free job</div></div>
             
              
            </div>
          </Grid>
          <Grid xs={4}>
            <div className='middle-block'>
              <div className='job-block'>Suggested job searches </div>
              <div className='job-block-searchjobs'>
                <h2>OOps! Looks like we're experiencing a problem</h2>
                <p>
                  Click here to continue searching over 20 million jobs on
                  LinkedIn
                </p>
                <div className='btn-search-jobs'>Search jobs</div>
              </div>
            </div>
          </Grid>

          <Grid xs={2.5}>
            <div className='right-block'>
              <div className='job-block'>
                Job seeker guidance
                <div className='job-guidance'>I want to improve my resume</div>
              </div>
            </div>
            <Footer/>
          </Grid>
          <Grid xs={2.5}></Grid>
        </Grid>
      </div>
    </>
  );
}

export default Jobs;
