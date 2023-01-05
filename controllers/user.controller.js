const db = require("../models/db");
module.exports.addingFriend = (req, res) => {
  //   console.log(req.params);
  const friendsId = req.params.id;
  //   console.log(friendsId);
  const { userId } = req.body;
  db.execute("INSERT INTO tbl_friends VALUES(?, ?, ?,?)", [
    null,
    friendsId,
    "false",
    userId,
  ])
    .then((data) => {
      res.status(200).json({ message: "Friend request sent" });
    })
    .catch((err) => console.log(err));
};

module.exports.acceptFriend = (req, res) => {
  const requestId = req.params.id;
  console.log(requestId);
  db.execute("UPDATE tbl_friends SET added = ? WHERE requestID=?", [
    "true",
    requestId,
  ])
    .then((data) => {
      res.status(200).json({ message: "Friend request accepted" });
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports.removeRequest = (req, res) => {
  const requestId = req.params.id;

  db.execute("DELETE FROM tbl_friends WHERE requestID = ?", [requestId])
    .then((data) => {
      console.log(data);
      res.status(200).json({
        message: "Friend request removed",
      });
    })
    .catch((err) => console.log(err));
};

// module.exports.getFriends = (req, res) => {
//   db.execute("SELECT * FROM tbl_friends").then((data) =>
//     console.log(JSON.parse(data[1]))
//   );
// };
