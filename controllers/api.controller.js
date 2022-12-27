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
  db.execute("SELECT * FROM tbl_friends").then((data) => {
    let [friends] = data;
    db.execute("SELECT * FROM tbl_posts")
      .then((data) => {
        let [postsData] = data;

        db.execute("SELECT * FROM tbl_postreactions").then((data) => {
          let [postReactions] = data;
          // console.log(postsData);

          // console.log(friends);
          let filterFriends = friends.filter((e) => {
            return (
              (Number(e.friendID) === Number(id) && e.added === "true") ||
              (Number(e.id) === Number(id) && e.added === "true")
            );
          });
          // console.log(filterFriends);
          let postsDataResult = postsData.reduce((pre, curr) => {
            filterFriends.forEach((e) => {
              if (
                Number(e.friendID) == Number(curr.postOf) ||
                Number(e.id) === Number(curr.postOf)
              ) {
                pre.push(curr);
              }
            });

            return pre;
          }, []);
          postsDataResult = Array.from(new Set(postsDataResult));

          // console.log(postsDataResult);
          // console.log(postReactions);
          let postReactionsFilter = postReactions.filter((e) => {
            return e.reactionOf === Number(id);
          });

          let userPostDataResult = postsDataResult.reduce((pre, curr) => {
            postReactionsFilter.forEach((e) => {
              if (e.postID === curr.postId) {
                curr.defaultReaction = e.reactionType;
              }
            });
            pre.push(curr);
            return pre;
          }, []);
          // console.log(userPostDataResult);

          res.status(200).json({
            posts: userPostDataResult,
          });
        });
      })
      .catch((err) => console.log(err));
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
module.exports.sendReaction = (req, res) => {
  const postID = req.params.id;
  const { reactionType, reactionOf } = req.body;
  console.log(postID, reactionType, reactionOf);
  db.execute(
    "SELECT * FROM tbl_postreactions WHERE postID=? AND reactionOf=? ",
    [postID, reactionOf]
  ).then((data) => {
    console.log(data[0]);
    if (data[0].length === 0) {
      db.execute("INSERT INTO tbl_postreactions VALUE(?,?,?,?)", [
        null,
        postID,
        reactionType,
        reactionOf,
      ]).then((data) => {
        res.status(200).json({
          message: "sent reaction succesfully",
        });
      });
    } else {
      db.execute(
        "UPDATE tbl_postreactions SET reactionType = ? WHERE postID =? AND reactionOf=?  ",
        [reactionType, postID, reactionOf]
      ).then((data) => {
        res.status(200).json({
          message: "update reaction successfully",
        });
      });
    }
  });
};
module.exports.deleteReaction = (req, res) => {
  const postID = req.params.id;
  console.log(postID);
  db.execute("DELETE FROM tbl_postreactions WHERE postID=?", [postID]).then(
    (data) => {
      res.status(200).json({
        message: "remove reaction successfully",
      });
    }
  );
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
                curr.avatar = e.avatar;
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
