import React, { useState } from "react";
import logo from "../linkedin.svg";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import AlertTitle from "@mui/material/AlertTitle";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [validateEmail, setValidateEmail] = useState(true);
  const [validatePass, setValidatePass] = useState(true);
  const [validateBorderEmail, setValidateBorderEmail] = useState("black");
  const [validateBorderPass, setValidateBorderPass] = useState("black");
  const [validateUser, setValidateUser] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);

  return (
    <div className='auth-container'>
      <form
        className='auth-form-container'
        onSubmit={(e) => {
          e.preventDefault();
          if (email === "" && pass !== "") {
            setValidateEmail(false);
            setValidatePass(true);
            setValidateUser("");
            setValidateBorderEmail("red");
            setValidateBorderPass("black");
          } else if (email === "" && pass === "") {
            setValidateEmail(false);
            setValidatePass(true);
            setValidateUser("");
            setValidateBorderEmail("red");
            setValidateBorderPass("red");
          } else if (pass === "" && email !== "") {
            setValidatePass(false);
            setValidateEmail(true);
            setValidateUser("");
            setValidateBorderEmail("black");
            setValidateBorderPass("red");
          } else if (pass !== "" && email !== "") {
            setValidatePass(true);
            setValidateEmail(true);
            setValidateBorderEmail("black");
            setValidateBorderPass("black");
            const data = { email: email, password: pass };

            fetch("http://127.0.0.1:8000/auth/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((response) => response.json())
              .then((data) => {
                if (
                  data.message === "Wrong password" ||
                  data.message === "User is not exist"
                ) {
                  setValidateUser(
                    <Alert variant='filled' severity='error'>
                      {data.message}
                    </Alert>
                  );
                } else {
                  setCookie("userID", data.userID, { path: "/" });
                  setValidateUser(
                    <Alert variant='filled' severity='success'>
                      {data.message}
                    </Alert>
                  );
                  window.location.href = "http://localhost:3000/feed";
                  // console.log(data);
                  console.log(Cookies.get("userID"));
                }
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          }
        }}
      >
        <h1>Welcome to your professional community</h1>

        <div className='error-alert'>
          {!validateEmail ? <span>Please enter your email</span> : ""}
        </div>
        <div className='error-alert'>
          {!validatePass ? <span>Please enter your password</span> : ""}
        </div>
        <div className='error-alert'>{validateUser}</div>

        <label htmlFor='email'>Email</label>
        <input
          type='email'
          onChange={(e) => {
            setEmail(e.target.value);

            // e.target.value!==""? setValidate(true) : setValidate(false)
          }}
          style={{ borderColor: validateBorderEmail }}
          className='input-signin'
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          onChange={(e) => {
            setPass(e.target.value);
          }}
          style={{ borderColor: validateBorderPass }}
          className='input-signin'
        ></input>
        <label className='forgot-password'>Forgot password?</label>
        <button type='submit' className='btn-sign-in'>
          Sign in
        </button>
        <div className='line-or'>or</div>
        <button type='submit' className='btn-sign-up'>
          Sign up
        </button>
      </form>

      <img src={logo} alt='' />
    </div>
  );
}

export default Login;
