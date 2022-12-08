const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("./routers/auth.routes");
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const { initializeApp } = require("firebase/app");
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbdh6w97UsnL46_HQlUpWKTbU7IhBrP3o",
  authDomain: "rikkeisocial.firebaseapp.com",
  projectId: "rikkeisocial",
  storageBucket: "rikkeisocial.appspot.com",
  messagingSenderId: "423182667385",
  appId: "1:423182667385:web:c5f2477bead6ac8caecea8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(morgan("dev"));

server.get("/", (req, res) => {
  res.send("hello");
});
server.use("/auth", authRoutes);
server.listen(8000, () => {
  console.log("server is running on http://127.0.0.1:8000");
});
