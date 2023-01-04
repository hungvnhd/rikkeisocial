import React, { useState } from "react";
import { db } from "../components/firebase/config";
import { addDocument, generateKeywords } from "../components/firebase/services";
import { AppContext } from "../Context/AppProvider";

import logo from "../logo121.png";

export default function SignUp() {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);
  const [job, setJob] = useState([]);
  const [company, setCompany] = useState([]);
  const [phone, setPhone] = useState([]);
  const [location, setLocation] = useState([]);
  const [noEmail, setNoEmail] = useState([]);
  const [noPassword, setNoPassword] = useState([]);
  const [noFirstName, setNoFirstName] = useState([]);
  const [noLastName, setNoLastName] = useState([]);
  const [noLocation, setNoLocation] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("test");
    if (!email) {
      setNoEmail("Please enter your email address.");
    } else if (!password) {
      setNoEmail("");
      setNoPassword("Please enter your password.");
    } else if (!firstName) {
      setNoEmail("");
      setNoPassword("");
      setFirstName("Please enter your first name.");
    } else if (!lastName) {
      setNoEmail("");
      setNoPassword("");
      setNoFirstName("");
      setNoLastName("Please enter your last name.");
    } else if (!location) {
      setNoEmail("");
      setNoPassword("");
      setNoFirstName("");
      setNoLastName("");
      setLocation("Please enter your location.");
    } else {
      const id = Math.floor(Math.random() * 1000000);
      const data = {
        id: id,
        email: email,
        password: password,
        fullName: firstName + " " + lastName,
        job: job,
        company: company,
        location: location,
      };
      const user = {
        displayName: firstName + " " + lastName,
        email: email,
        photoURL:
          "https://scr.vn/wp-content/uploads/2020/07/Avatar-Facebook-tr%E1%BA%AFng.jpg",
        uid: id,
        providerId: "",
        keywords: generateKeywords((firstName + lastName).toLowerCase()),
        friends: [],
      };
      addDocument("users", user);
      // const addUser = db.collection("users").doc(id.toString());
      // addUser.set({
      //   ...user,
      // });

      fetch("http://127.0.0.1:8000/auth/register", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
          setNoEmail(data.message);
          if (data.message === "Create one successfully") {
            setNoEmail("");
            setNoPassword("");
            window.location.href = "http://127.0.0.1:3000/auth/login";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      setNoEmail("");
      setNoPassword("");
      setNoFirstName("");
      setNoLastName("");
      setLocation("");
    }
  };

  return (
    <>
      <div className='sign-container'>
        <div className='logo'>
          <img src={logo} alt='' />
        </div>
        <div className='form-sign-up'>
          <p className='title'>Make the most of your professional life</p>
          <form onSubmit={handleSubmit} className='form'>
            <div className='form-input'>
              <div className='child1'>
                <p>Email</p>
                <input
                  className='input'
                  onChange={(e) => setEmail(e.target.value)}
                  type='email'
                  value={email}
                />
                <p className='validate'>{noEmail}</p>
                <p>Password (6 or more characters)</p>
                <input
                  className='input'
                  onChange={(e) => setPassword(e.target.value)}
                  type='password'
                  value={password}
                />
                <p className='validate'>{noPassword}</p>
                <p>First Name</p>
                <input
                  className='input'
                  onChange={(e) => setFirstName(e.target.value)}
                  type='text'
                  value={firstName}
                />
                <p className='validate'>{noFirstName}</p>

                <p>Last Name</p>
                <input
                  className='input'
                  onChange={(e) => setLastName(e.target.value)}
                  type='text'
                  value={lastName}
                />
                <p className='validate'>{noLastName}</p>
              </div>
              <div className='child2'>
                <p>Job</p>
                <input
                  className='input'
                  onChange={(e) => setJob(e.target.value)}
                  type='text'
                  value={job}
                />
                <p>Company</p>
                <input
                  className='input'
                  onChange={(e) => setCompany(e.target.value)}
                  type='text'
                  value={company}
                />
                <p>Phone Number</p>
                <input
                  className='input'
                  onChange={(e) => setPhone(e.target.value)}
                  type='number'
                  value={phone}
                />
                <p>Location</p>
                <input
                  className='input'
                  onChange={(e) => setLocation(e.target.value)}
                  type='text'
                  value={location}
                />
                <p className='validate'>{noLocation}</p>
              </div>
            </div>
            <div className='policy'>
              By clicking Agree & Join, you agree to the Rikkei Social{" "}
              <a href='#'>User Agreement</a>, <a href='#'>Privacy Policy</a>,{" "}
              <a href='#'>and Cookie Policy</a>.
            </div>
            <button className='btn-submit'> Agree & Join </button>
            <h5>
              Already on Rikkei Social?
              <a href='#'>Sign in</a>
            </h5>
          </form>
        </div>
        <div className='vkk'>
          Looking to create a page for a business? <a href='#'>Get help</a>
        </div>
        <div>
          <ul className='ul'>
            <li>
              <a href='#'>Accessibility</a>
            </li>
            <li>
              <a href='#'>Privacy Policy</a>
            </li>
            <li>
              <a href='#'>Copyright Policy</a>
            </li>
            <li>
              <a href='#'>Guest Controls</a>
            </li>
            <li>
              <a href='#'>About</a>
            </li>
            <li>
              <a href='#'>User Agreement</a>
            </li>
            <li>
              <a href='#'>Cookie Policy</a>
            </li>
            <li>
              <a href='#'>Brand Policy</a>
            </li>
            <li>
              <a href='#'>Community Guidelines</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
