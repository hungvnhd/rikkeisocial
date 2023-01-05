import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
// import { Routes, Route, Link } from "react-router-dom";
import NavigateBar from "./components/NavigateBar";
import Jobs from "./components/Jobs";
import Feed from "./components/Feed";
import Notifications from "./components/Notifications";

import PrivateRoutes from "./utils/PrivateRoutes";
import PreventAuth from "./utils/PreventAuth";
import Tcncontainer from "./components/tcn/Tcncontainer";

// import SignIn from './components/Sign
import React, { useState, useEffect } from "react";
import Network from "./components/network/Network";
import Cookie from "js-cookie";
import Message from "./components/message/Message";

const App = () => {
  const [users, setUsers] = useState([]);
  const [friendadd, setFriendadd] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/v1/friends/${Cookie.get("userID")}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFriendadd(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/v1/users`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        console.log(users);
      });
  }, []);

  const btnAccept = (e) => {
    console.log(e.target.value);
    let backEndUrl = `http://127.0.0.1:8000/user/friends/request/accept/${e.target.value}`;
    e.preventDefault();

    fetch(backEndUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((data) => {
        // Giả lập ở fontend
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const btnremove = (e) => {
    let backEndUrl = `http://127.0.0.1:8000/user/friends/request/remove/${e.target.value}`;
    e.preventDefault();

    fetch(backEndUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((data) => {
        // Giả lập ở fontend
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const btnAdding = (e) => {
    console.log(e.target.value);
    let backEndUrl = `http://127.0.0.1:8000/user/friends/request/${e.target.value}`;
    e.preventDefault();
    fetch(backEndUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((data) => {
        // Giả lập ở fontend
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Routes>
        {/* <Route path='/' element={<Login />} /> */}
        <Route element={<PrivateRoutes />}>
          <Route
            path='/feed'
            element={
              <>
                <NavigateBar />
                <div className='container-page'>
                  <Feed />
                </div>
              </>
            }
          />
          <Route
            path='/'
            element={
              <>
                <NavigateBar />
                <div className='container-page'>
                  <Feed />
                </div>
              </>
            }
          />
          <Route
            path='/mynetwork'
            element={
              <>
                <NavigateBar />
                <div className='container-page'>
                  <Network
                    btnAccept={btnAccept}
                    btnremove={btnremove}
                    users={users}
                    friendadd={friendadd}
                    btnAdding={btnAdding}
                  />
                </div>
              </>
            }
          />
          <Route
            path='/jobs'
            element={
              <>
                <NavigateBar />
                <div className='container-page'>
                  <Jobs />
                </div>
              </>
            }
          />
          <Route
            path='/user/:id'
            element={
              <>
                <NavigateBar />
                <div className='container-page'>
                  <Tcncontainer />
                </div>
              </>
            }
          />
          <Route
            path='/messaging/:id'
            element={
              <>
                <NavigateBar />
                <div className='container-page'></div>
                <Message />
              </>
            }
          />
          <Route
            path='/notifications'
            element={
              <>
                <NavigateBar />
                <div className='container-page'>
                  <Notifications />
                </div>
              </>
            }
          />
        </Route>
        <Route element={<PreventAuth />}>
          <Route path='/auth/register' element={<SignUp />} />
          <Route path='/auth/login' element={<Login />} />
        </Route>
      </Routes>

      {/* <div className='container-page'>
        <Routes>
          <Route path='/feed' element={<Feed />} />
          <Route path='/mynetwork' />
          <Route path='/jobs' element={<Jobs />} />
          <Route path='/messaging' />
          <Route path='/notifications' />
        </Routes>
      </div> */}

      {/* <Tcncontainer /> */}
    </>
  );
};

export default App;
