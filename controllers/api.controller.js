const db = require("../models/db");
const mysql = require("mysql2");
const e = require("express");

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
        // console.log(postsData);
        db.execute("SELECT * FROM tbl_postreactions").then((data) => {
          let [postReactions] = data;
          db.execute("SELECT * FROM tbl_comments").then((data) => {
            let [postComments] = data;
            db.execute("SELECT * FROM tbl_users ").then((data) => {
              let [users] = data;
              let filterFriends = friends.filter((e) => {
                return (
                  (Number(e.friendID) === Number(id) && e.added === "true") ||
                  (Number(e.id) === Number(id) && e.added === "true")
                );
              });
              // console.log(filterFriends);
              let postsDataResult = postsData.reduce((pre, curr) => {
                if (curr.postOf === Number(id)) {
                  pre.push(curr);
                }
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
              console.log(postsDataResult);
              let postReactionsFilter = postReactions.filter((e) => {
                return e.reactionOf === Number(id);
              });
              // console.log(postsDataResult);

              let userPostDataResult = postsDataResult.reduce((pre, curr) => {
                postReactionsFilter.forEach((e) => {
                  if (e.postID === curr.postId) {
                    curr.defaultReaction = e.reactionType;
                  }
                });

                curr.totalReactions =
                  curr.like + curr.clap + curr.love + curr.haha + curr.dislike;
                let totalComments = [];
                postComments.forEach((e) => {
                  if (e.postID === curr.postId) {
                    totalComments.push(e);
                  }
                });
                let totalReactionsArr = [
                  {
                    total: curr.like,
                    type: "fa-solid fa-thumbs-up",
                    color: "#408EE5",
                  },
                  {
                    total: curr.clap,
                    type: "fa-solid fa-hands-clapping",
                    color: "#73AD57",
                  },
                  {
                    total: curr.love,
                    type: "fa-solid fa-heart",
                    color: "#F7251C",
                  },
                  {
                    total: curr.haha,
                    type: "fa-solid fa-face-laugh-squint",
                    color: "#F8C035",
                  },
                  {
                    total: curr.dislike,
                    type: "fa-solid fa-thumbs-down",
                    color: "#980202",
                  },
                ];
                let first, second, third;

                third = first = second = 0;
                for (let i = 0; i < totalReactionsArr.length; i++) {
                  if (totalReactionsArr[i].total > first) {
                    third = second;
                    second = first;
                    first = totalReactionsArr[i].total;
                  } else if (totalReactionsArr[i].total > second) {
                    third = second;
                    second = totalReactionsArr[i].total;
                  } else if (totalReactionsArr[i].total > third)
                    third = totalReactionsArr[i].total;
                }

                let mostReactions = [first, second, third];
                let newArr = [];
                for (let i = 0; i < totalReactionsArr.length; i++) {
                  for (let j = 0; j < mostReactions.length; j++) {
                    if (totalReactionsArr[i].total === mostReactions[j]) {
                      newArr.push(totalReactionsArr[i]);
                    }
                  }
                }
                newArr = Array.from(new Set(newArr));

                function compareValues(key, order = "asc") {
                  return function (a, b) {
                    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                      // nếu không tồn tại
                      return 0;
                    }

                    const varA =
                      typeof a[key] === "string"
                        ? a[key].toUpperCase()
                        : a[key];
                    const varB =
                      typeof b[key] === "string"
                        ? b[key].toUpperCase()
                        : b[key];

                    let comparison = 0;
                    if (varA > varB) {
                      comparison = 1;
                    } else if (varA < varB) {
                      comparison = -1;
                    }
                    return order == "desc" ? comparison * -1 : comparison;
                  };
                }
                newArr = newArr.sort(compareValues("total", "desc"));
                newArr.splice(2, 2);

                curr.totalComments = totalComments.length;
                curr.top3reactions = newArr;

                pre.push(curr);

                return pre;
              }, []);
              // console.log(userPostDataResult);
              let finalResult = userPostDataResult.reduce((pre, curr) => {
                users.forEach((e) => {
                  if (e.id === curr.postOf) {
                    curr.userData = {
                      fullName: e.fullName,
                      job: e.jobs,
                      company: e.company,
                      avatar: e.avatar,
                    };
                  }
                });
                pre.push(curr);
                return pre;
              }, []);
              console.log(finalResult);

              res.status(200).json({
                posts: userPostDataResult,
              });
            });
          });
        });
      })
      .catch((err) => console.log(err));
  });
};
module.exports.createPost = (req, res) => {
  let { userId, content, postImg } = req.body;
  db.execute("INSERT INTO tbl_posts VALUES(?,?,?,?,?,?,?,?,?,?)", [
    null,
    userId,
    content,
    0,
    0,
    0,
    0,
    0,
    postImg,
    new Date(),
  ])
    .then((data) => {
      res.status(200).json({ message: "Posted successfully" });
    })
    .catch((err) => console.log(err));
};
module.exports.sendReaction = (req, res) => {
  const postID = req.params.id;
  const { reactionType, reactionOf } = req.body;
  // console.log(postID, reactionType, reactionOf);
  db.execute(
    "SELECT * FROM tbl_postreactions WHERE postID=? AND reactionOf=? ",
    [postID, reactionOf]
  ).then((data) => {
    // console.log(data[0]);
    if (data[0].length === 0) {
      db.execute("INSERT INTO tbl_postreactions VALUE(?,?,?,?)", [
        null,
        postID,
        reactionType,
        reactionOf,
      ]).then((data) => {
        db.execute("SELECT * FROM tbl_posts WHERE postId = ?", [postID]).then(
          (data) => {
            // console.log(data[0][0][reactionType]);
            let newReaction = data[0][0][reactionType] + 1;

            let query = `UPDATE tbl_posts SET ${reactionType} = ? WHERE postId = ?`;
            let sql = `UPDATE tbl_posts SET ?? = ? WHERE ?? = ?`;
            let inserts = [reactionType, newReaction, "postId", Number(postID)];
            sql = mysql.format(sql, inserts);
            db.execute(sql).then((data) => {
              res.status(200).json({
                message: "sent reaction succesfully",
              });
            });
          }
        );
      });
    } else {
      const previousReaction = data[0][0].reactionType;
      db.execute("SELECT * FROM tbl_posts WHERE postId = ?", [postID]).then(
        (data) => {
          let newArr = ["like", "clap", "love", "haha", "dislike"];
          let result = newArr.indexOf(reactionType);

          newArr.splice(result, 1);

          let query = `UPDATE tbl_posts SET ${reactionType} = ?, ${newArr[0]} = ?, ${newArr[1]} = ?, ${newArr[2]} = ?, ${newArr[3]} = ? WHERE postId = ?`;
          let sql = `UPDATE tbl_posts SET ?? = ?, ?? = ? WHERE ?? = ?`;
          let inserts = [
            reactionType,
            data[0][0][reactionType] + 1,
            previousReaction,
            data[0][0][previousReaction] - 1,

            "postId",
            Number(postID),
          ];
          sql = mysql.format(sql, inserts);

          db.execute(sql)
            .then((data) => {
              db.execute(
                "UPDATE tbl_postreactions SET reactionType = ? WHERE postID = ? AND reactionOf= ?  ",
                [reactionType, postID, reactionOf]
              ).then((data) => {
                res.status(200).json({
                  message: "update reaction successfully",
                });
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      );
    }
  });
};
module.exports.deleteReaction = (req, res) => {
  const postID = req.params.id;
  const previousReaction = req.body.previousReaction;
  db.execute("DELETE FROM tbl_postreactions WHERE postID=?", [postID]).then(
    (data) => {
      db.execute("SELECT * FROM tbl_posts WHERE postId=?", [postID]).then(
        (data) => {
          const newReactionValue = data[0][0][previousReaction] - 1;
          // let query = `UPDATE tbl_posts SET ${reactionType} = ? WHERE postId = ?`;
          let sql = `UPDATE tbl_posts SET ?? = ? WHERE ?? = ?`;
          let inserts = [
            previousReaction,
            newReactionValue,
            "postId",
            Number(postID),
          ];
          sql = mysql.format(sql, inserts);
          db.execute(sql).then((data) => {
            res.status(200).json({
              message: "remove reaction successfully",
            });
          });
        }
      );
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

//comment
module.exports.getCommentById = (req, res) => {
  const postID = req.params.id;
  db.execute("SELECT * FROM tbl_comments WHERE postID=?", [postID])
    .then((comments) => {
      const [dataComments] = comments;
      db.execute("SELECT * FROM tbl_users").then((users) => {
        const [dataUsers] = users;
        db.execute("SELECT * FROM tbl_replycomment").then((data) => {
          const [replycmt] = data;
          const result = dataComments.reduce((pre, curr) => {
            dataUsers.forEach((e) => {
              if (e.id === curr.commentOf) {
                curr.userName = e.fullName;
                curr.userAva = e.avatar;
                curr.userJob = e.jobs;
                curr.userCompany = e.company;
              }
            });
            const arr = [];

            const replycmtresult = replycmt.reduce((pre1, curr1) => {
              dataUsers.forEach((e) => {
                if (e.id === curr1.replyOf) {
                  curr1.replyUsername = e.fullName;
                  curr1.replyUserAva = e.avatar;
                }
              });
              pre1.push(curr1);
              return pre1;
            }, []);
            // console.log(replycmtresult);
            replycmtresult.forEach((e) => {
              if (e.commentID === curr.commentID) {
                arr.push(e);
                curr.reply = arr;
              }
            });
            pre.push(curr);
            return pre;
          }, []);
          console.log(result);

          res.status(200).json({
            data: result,
          });
        });
      });
    })
    .catch((err) => console.log(err));
};
module.exports.addComment = (req, res) => {
  const { postID, content, commentOf } = req.body;
  // console.log(req.body);

  db.execute("INSERT INTO tbl_comments VALUE(?, ?, ?, ?, ?, ?)", [
    null,
    content,
    postID,
    commentOf,
    0,
    new Date(),
  ])
    .then((data) => {
      res.status(200).json({
        message: "comment posted successfully",
      });
    })
    .catch((err) => console.log(err));
};
module.exports.addReply = (req, res) => {
  const { replyOf, content, commentID } = req.body;

  db.execute("INSERT INTO tbl_replycomment VALUES(?,?,?,?)", [
    null,
    commentID,
    replyOf,
    content,
  ]).then((data) => {
    res.status(200).json({ message: "sent reply successfully" });
  }).catch((err)=> {
    console.log(err);
  } );
};

module.exports.loadMessage = (req, res) => {
  const userID = req.params.id;
  db.execute("SELECT * FROM tbl_users").then((data) => {
    const [users] = data;
    db.execute("SELECT * FROM tbl_messageroom").then((data) => {
      const [rooms] = data;

      // console.log(rooms);
      const loggedInUserRooms = rooms.filter((e) => {
        // console.log(e.createdBy);
        return (
          e.createdBy === Number(userID) || e.invitedUser === Number(userID)
        );
      });

      db.execute("SELECT * FROM tbl_messages").then((data) => {
        const [messages] = data;
        // console.log(messages);
        const result = loggedInUserRooms.reduce((pre, curr) => {
          users.forEach((e) => {
            if (e.id === curr.createdBy && curr.createdBy !== Number(userID)) {
              curr.user = {
                userName: e.fullName,
                userAva: e.avatar,
              };
            } else if (
              e.id === curr.invitedUser &&
              curr.invitedUser !== Number(userID)
            ) {
              curr.user = {
                userName: e.fullName,
                userAva: e.avatar,
              };
            }
          });
          messages.forEach((e) => {
            let arr = [];
            if (e.fromRoom === curr.roomID) {
              arr.push(e);
              curr.message = arr;
            }
          });
          pre.push(curr);
          return pre;
        }, []);
        // console.log(result);

        res.status(200).json({
          data: result,
        });
      });
    });
  });
};

module.exports.getAllRequest1 = (req, res) => {
  let friendID = req.params.id;
  let userID = req.body.userId;
  db.execute(`SELECT * FROM tbl_friends`)
    .then((data) => {
      data[0].forEach((value, index) => {
        console.log(value.friendID, userID, value.id, value.added, friendID);

        if (
          value.id == userID &&
          value.friendID == friendID &&
          value.added == "false"
        ) {
          res.status(200).json({
            added: "Cancel",
          });
        } else if (
          value.id == userID &&
          value.friendID == friendID &&
          value.added == "true"
        ) {
          res.status(200).json({
            added: "Friend",
          });
        } else if (
          value.id == friendID &&
          value.friendID == userID &&
          value.added == "false"
        ) {
          res.status(200).json({
            added: "accept",
          });
        } else if (
          value.id == friendID &&
          value.friendID == userID &&
          value.added == "true"
        ) {
          res.status(200).json({
            added: "friend",
          });
        }
      });
    })
    .catch((err) => console.log(err));
};

module.exports.getMessagesByRoomID = (req, res) => {
  const roomID = req.params.id;
  db.execute("SELECT * FROM tbl_users ").then((data) => {
    const [users] = data;
    db.execute("SELECT * FROM tbl_messages WHERE fromRoom = ?", [roomID]).then(
      (data) => {
        const [messages] = data;
        const result = messages.reduce((pre, curr) => {
          users.forEach((e) => {
            if (e.id === curr.messageOf) {
              curr.userDetail = {
                userName: e.fullName,
                userAva: e.avatar,
              };
            }
          });
          pre.push(curr);
          return pre;
        }, []);
        res.status(200).json({
          data: result,
        });
      }
    );
  });
};

module.exports.sendMessage = (req, res) => {
  const roomID = req.params.id;
  const { messageOf, messageContent } = req.body;
  db.execute("INSERT INTO tbl_messages VALUE(?,?,?,?,?)", [
    null,
    messageOf,
    messageContent,
    new Date(),
    roomID,
  ])
    .then((data) => {
      res.status(200).json({
        message: "send message successfully",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
