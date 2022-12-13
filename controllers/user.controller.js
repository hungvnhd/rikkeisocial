const db = require("../models/db");
module.exports.addingFriend = (req, res) => {
  //   console.log(req.params);
  const friendsId = req.params.id;
  //   console.log(friendsId);
  const { userId } = req.signedCookies;
  db.execute("INSERT INTO tbl_friends VALUES(?, ?, ?,?)", [
    null,
    friendsId,
    false,
    userId,
  ])
    .then((data) => {
      res.status(200).json({ message: "Friend request sent" });
    })
    .catch((err) => console.log(err));
};

module.exports.acceptFriend = (req, res) => {
  const friendId = req.params.id;
  const { userId } = req.signedCookies;
  db.execute("UPDATE tbl_friends SET added = ? WHERE id = ? AND friendID =?", [
    true,
    userId,
    friendId,
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
  const { userId } = req.signedCookies;
  db.execute("DELETE FROM tbl_friends WHERE id = ? AND friendID = ? ", [
    userId,
    requestId,
  ])
    .then((data) => {
      console.log(data);
      res.status(200).json({
        message: "Friend request removed",
      });
    })
    .catch((err) => console.log(err));
};
