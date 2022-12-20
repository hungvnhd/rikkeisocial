const db = require("../models/db");

module.exports.getAll = (req, res) => {
  db.execute("SELECT * FROM tbl_users").then((data) => {
    res.status(200).json(data[0]);
  });
};

module.exports.getById = (req, res) => {
  let userId = req.params.id;
  db.execute("SELECT * FROM tbl_users WHERE id= ?", [userId]).then((data) => {
    res.status(200).json(data[0]);
  });
};
module.exports.getPostById = (req, res) => {
  const id = req.params.id;
  db.execute("SELECT * FROM tbl_posts WHERE postOf=?", [id]).then((data) => {
    res.status(200).json(data[0]);
  });
};
module.exports.createPost = (req, res) => {
  let { userId, content, postImg } = req.body;
  db.execute("INSERT INTO tbl_posts VALUES(?,?,?,?,?,?,?,?,?)", [
    null,
    userId,
    content,
    0,
    0,
    0,
    0,
    0,
    postImg,
  ])
    .then((data) => {
      res.status(200).json({ message: "Posted successfully" });
    })
    .catch((err) => console.log(err));
};
module.exports.getAllRequest = (req, res) => {
  db.execute("SELECT * FROM tbl_friends")
    .then((data) => {
      res.status(200).json(data[0]);
    })
    .catch((err) => console.log(err));
};

module.exports.getSignedInUserRequest = (req, res) => {
  const id = req.params.id;

  db.execute("SELECT * FROM tbl_users")
    .then((data) => {
      let [users] = data;
      console.log(users);
      db.execute("SELECT * FROM tbl_friends WHERE friendID=?", [id]).then(
        (data) => {
          let [requests] = data;
          console.log(requests);
          let result = requests.filter((e) => e.friendID === id);
          let result2 = result.reduce((pre, curr) => {
            users.forEach((e) => {
              if (curr.id === e.id) {
                curr.name = e.fullName;
                curr.job = e.jobs;
                curr.company = e.company;
              }
            });

            pre.push(curr);

            return pre;
          }, []);
          res.status(200).json(result2);
        }
      );
    })

    .catch((err) => console.log(err));
};
