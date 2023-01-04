import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../components/firebase/config";

export const AuthContext = React.createContext();
export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const history = useNavigate();
  React.useEffect(() => {
    const unsubscibed = auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({
          displayName,
          email,
          uid,
          photoURL,
        });

        // history("/");
        // history("/messaging");
        return;
      }
      // reset user info
      setUser({});
    });

    // clean function
    return () => {
      unsubscibed();
    };
  }, [history]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
