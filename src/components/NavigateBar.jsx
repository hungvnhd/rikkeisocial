import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import WorkIcon from "@mui/icons-material/Work";
import SmsIcon from "@mui/icons-material/Sms";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Unstable_Grid2";

import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
function NavigateBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <nav className='nav-container'>
        
        <Grid container spacing={1}>
          <Grid xs={2}></Grid>
          <Grid xs={4} sx={{
    padding:0
    }} >
    
   
            <div className='container-nav-logo'>
              <Link to='/'>
                <img
                  className='logo-brand'
                  src={require("../images/rc.jpg")}
                  alt=''
                />
              </Link>
              <div className='container-search'>
                <SearchIcon sx={{ fontSize: "30px" }} />
                <input placeholder='Search' className='search-input' />
              </div>
            </div>
          </Grid>
          <Grid xs={5} sx={{
    padding:0
    }} >
            <div className='flex'>
              <NavLink to='/feed' className='btn-nav'>
                <div>
                  <HomeIcon  />
                </div>
                <span className='btn-nav-name'>Home</span>
              </NavLink>
              <NavLink to='/mynetwork' className='btn-nav'>
                <div >
                  <GroupIcon />
                </div>
                <span className='btn-nav-name'>My Network</span>
              </NavLink>
              <NavLink to='/jobs' className='btn-nav'>
                <div>
                  <WorkIcon />
                </div>
                <span className='btn-nav-name'>Jobs</span>
              </NavLink>
              <NavLink to='/messaging' className='btn-nav'>
                <div>
                  <SmsIcon />
                </div>
                <span className='btn-nav-name'>Messaging</span>
              </NavLink>
              <NavLink to='/notifications' className='btn-nav'>
                <div>
                  <NotificationsIcon />
                </div>
                <span className='btn-nav-name'>Notifications</span>
              </NavLink>
              <div
                // id="demo-customized-button"
                aria-controls={open ? "demo-customized-menu" : undefined}
                aria-haspopup='true'
                aria-expanded={open ? "true" : undefined}
                variant='contained'
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
                className='btn-nav'
              >
                <div>
                  <img
                    src={require("../images/avatar.png")}
                    alt=''
                    className='avatar-user'
                  />
                </div>
                <span className='ava-seemore'>
                  Me
                  <ExpandMoreIcon />
                </span>
              </div>

              <StyledMenu
                MenuListProps={{
                  "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                {" "}
                <div className='style-menu'>
                  <div onClick={handleClose} disableRipple>
                    <div className='profile-user'>
                      <img
                        src={require("../images/avatar.png")}
                        alt=''
                        className='profile-avatar'
                      />
                      <span>UserName</span>
                    </div>
                    <div className='btn-profile'>View Profile</div>
                  </div>
                  <Divider sx={{ my: 0.5 }} />

                  <div
                    className='list-item-title'
                    onClick={handleClose}
                    disableRipple
                  >
                    Account
                  </div>
                  <div
                    className='list-item'
                    onClick={handleClose}
                    disableRipple
                  >
                    Settings & Privacy
                  </div>
                  <div
                    className='list-item'
                    onClick={handleClose}
                    disableRipple
                  >
                    Help
                  </div>
                  <div
                    className='list-item'
                    onClick={handleClose}
                    disableRipple
                  >
                    Language
                  </div>
                  <Divider sx={{ my: 0.5 }} />
                  <div
                    className='list-item-title'
                    onClick={handleClose}
                    disableRipple
                  >
                    Manage
                  </div>
                  <div
                    className='list-item'
                    onClick={handleClose}
                    disableRipple
                  >
                    Posts & Activity
                  </div>
                  <div
                    className='list-item'
                    onClick={handleClose}
                    disableRipple
                  >
                    Job Posting Account
                  </div>
                  <Divider sx={{ my: 0.5 }} />
                  <div
                    className='list-item'
                    onClick={handleClose}
                    disableRipple
                  >
                    Sign out
                  </div>
                </div>
              </StyledMenu>
            </div>
          </Grid>
          <Grid xs={1}></Grid>
        </Grid>
        
      </nav>
    </>
  );
}

export default NavigateBar;
