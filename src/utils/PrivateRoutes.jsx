import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
const PrivateRoutes = () => {
   let cookie = Cookies.get("userID");
   if (typeof(cookie)=== typeof("1")){
      cookie=true;
   }else{
      cookie=false;
   }
   return(
      
    cookie ? <Outlet/> : <Navigate to="/auth/login"/>
    
   )
}

export default PrivateRoutes;