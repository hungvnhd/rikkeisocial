import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
// import { Routes, Route, Link } from "react-router-dom";
import NavigateBar from "./components/NavigateBar";
import Jobs from "./components/Jobs";
import Feed from "./components/Feed";
import Cookies from "js-cookie";
import PrivateRoutes from "./utils/PrivateRoutes";
import PreventAuth from "./utils/PreventAuth";
import Tcncontainer from "./components/tcn/Tcncontainer";

// import SignIn from './components/Sign

function App() {
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
          <Route path='/mynetwork' />
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
          <Route path='/messaging' />
          <Route path='/notifications' />
        </Route>
        <Route element={<PreventAuth />}>
          <Route path='/auth/register' element={<SignUp />} />
          <Route path='/auth/login' element={<Login />} />
        </Route>
        <Route path='/feed/:id' element={<Tcncontainer />} />
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
    </>
  );
}

export default App;
