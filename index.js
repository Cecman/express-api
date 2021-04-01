const config = require("config");
const express = require("express");
const courses = require("./routes/courses");
const home = require("./routes/home");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/courses", courses);
app.use("/", home);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
