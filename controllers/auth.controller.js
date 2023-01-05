const { getByDisplayValue } = require("@testing-library/react");
const { updateProfile } = require("firebase/auth");
const firebaseAuth = require("firebase/auth");
const db = require("../models/db");
// const { addDocument } = require("../models/services");
const {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} = firebaseAuth;

module.exports.signUpNewUser = (req, res) => {
  const { email, password, fullName, job, company, location, id } = req.body;

  console.log(id, email, password, fullName, job, company, location);

  db.execute("SELECT * FROM tbl_users WHERE email = ?", [email]).then(
    (data) => {
      let [rows] = data;
      // console.log(data);
      if (rows.length > 0) {
        res.status(500).json({ message: "User already exists" });
      } else {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;

            updateProfile(auth.currentUser, {
              displayName: fullName,
              photoURL:
                "https://scr.vn/wp-content/uploads/2020/07/Avatar-Facebook-tr%E1%BA%AFng.jpg",
            })
              .then(() => {
                console.log("ok");
              })
              .catch((err) => {
                console.log(err);
              });
            sendEmailVerification(auth.currentUser).then(() => {
              console.log("email sent");

              db.execute(
                "INSERT INTO tbl_users VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [
                  id,
                  email,
                  password,
                  "false",
                  fullName,
                  job,
                  company,
                  location,
                  null,
                  null,
                ]
              ).then((data) => {
                console.log(data);
                res.status(200).json({
                  message: "Create one successfully",
                  status: "success",
                });
              });
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
            // ..
          });
      }
    }
  );
};

module.exports.login = (req, res) => {
  let { email, password } = req.body;
  const auth = getAuth();
  db.execute("SELECT * FROM tbl_users WHERE email = ?", [email])
    .then((data) => {
      let [rows] = data;
      let find = rows[0];
      if (!find) {
        res.status(404).json({
          message: "User is not exist",
        });
      } else {
        if (password !== find.password) {
          res.status(404).json({
            message: "Wrong password",
          });
        } else {
          // res.cookie("role", find.role, { signed: true });
          signInWithEmailAndPassword(auth, email, password).then(
            (userCredential) => {
              // Signed in
              const user = userCredential.user;
              console.log(user.reloadUserInfo.emailVerified);
              if (user.reloadUserInfo.emailVerified === false) {
                res.status(500).json({ message: "Please verified your email" });
                console.log(500);
              } else {
                db.execute(
                  "UPDATE tbl_users SET verified = ? WHERE email = ?",
                  ["true", email]
                ).then((data) => {
                  res.cookie("userId", find.id, { signed: true });

                  res.status(200).json({
                    message: "Login Successfully",
                    status: "success",
                    userID: find.id,
                  });
                });
              }
            }
          );
        }
      }
    })

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};
