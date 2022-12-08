const firebaseAuth = require("firebase/auth");
const db = require("../models/db");
const {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} = firebaseAuth;

module.exports.signUpNewUser = (req, res) => {
  const { email, password } = req.body;
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
            console.log(user);
            sendEmailVerification(auth.currentUser).then(() => {
              console.log("email sent");
              db.execute("INSERT INTO tbl_users VALUES(?, ?, ?, ?)", [
                id,
                email,
                password,
                "false",
              ]).then((data) => {
                console.log(data);
                res.status(200).json({
                  message: "Create one succesfully",
                  status: "success",
                });
              });
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
      }
    }
  );

  // const auth = getAuth();
  // createUserWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //     const user = userCredential.user;
  //     console.log(user);
  //     sendEmailVerification(auth.currentUser).then(() => {
  //       console.log("email sent");
  //     });
  //     let id = Math.floor(Math.random() * 1000000);
  //     // password = bcrypt.hashSync(password, saltRounds);
  //     db.execute("SELECT * FROM tbl_users WHERE email = ?", [email])
  //       .then((data) => {
  //         let [rows] = data;
  //         // console.log(data);
  //         if (rows.length > 0) {
  //           return Promise.reject("User already exist");
  //         } else {
  //           return db.execute("INSERT INTO tbl_users VALUES(?, ?, ?, ?)", [
  //             id,
  //             email,
  //             password,
  //             "false",
  //           ]);
  //         }
  //       })
  //       .then((data) => {
  //         console.log(data);
  //         res.status(200).json({
  //           message: "Create one succesfully",
  //           status: "success",
  //         });
  //       });
  //     // .catch((err) => res.status(500).json({ message: err }));

  //     // ...
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // ..
  //   });
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
          // res.cookie("userId", find.user_id, { signed: true });
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
                  res.status(200).json({
                    message: "Login Successfully",
                    status: "success",
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
  //   .catch((err) => console.log(err));
};
