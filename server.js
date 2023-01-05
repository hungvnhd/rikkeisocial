const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const { initializeApp } = require("firebase/app");

// Your web app's Firebase configuration

// const storageRef = ref(storage, "some-child");
const firebaseConfig = {
  apiKey: "AIzaSyAG5NaMDy52e7f-_w-VdXc-XoqV2ZYZr0Y",
  authDomain: "rikkeichat-94b17.firebaseapp.com",
  projectId: "rikkeichat-94b17",
  storageBucket: "rikkeichat-94b17.appspot.com",
  messagingSenderId: "629791864097",
  appId: "1:629791864097:web:3b6b70e7db097a5bb47a60",
  measurementId: "G-66TBPVXQ9Q",
};

const authRoutes = require("./routers/auth.routes");
const userRoutes = require("./routers/user.routes");
const apiRoutes = require("./routers/api.routes");

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const { getStorage, ref, uploadBytes } = require("firebase/storage");

const storage = getStorage();

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(cookieParser("secret"));

server.get("/", (req, res) => {
  res.redirect("/auth/register");
});
server.use("/auth", authRoutes);
server.use("/user", userRoutes);
server.use("/api", apiRoutes);

server.listen(8000, () => {
  console.log("server is running on http://127.0.0.1:8000");
});
