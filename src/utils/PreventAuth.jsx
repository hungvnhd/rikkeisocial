import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
const PreventAuth = () => {
  let cookie = Cookies.get("userID");
  if (typeof cookie === typeof "1") {
    cookie = true;
  } else {
    cookie = false;
  }
  return cookie ? <Navigate to='/feed' /> : <Outlet />;
};

export default PreventAuth;
