const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello");
});
app.listen(8000, () => {
  console.log("server is running on http://127.0.0.1:8000");
});
