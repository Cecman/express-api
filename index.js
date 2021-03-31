const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/courses", (req, res) => {
  res.send([7, 2, 3, 4, 5, 6]);
});

app.listen(3000, () => {
  console.log(`Listening on port ${port}...`);
});
