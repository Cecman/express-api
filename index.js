const config = require("config");
const express = require("express");
require("./db/connection");
require("express-async-errors");
const error = require("./middleware/error");
const courses = require("./routes/courses");
const customers = require("./routes/customers");
const categories = require("./routes/categories");
const home = require("./routes/home");
const helmet = require("helmet");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

//routers
app.use("/api/courses", courses);
app.use("/api/customers", customers);
app.use("/api/categories", categories);
app.use("/", home);

app.use(error);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
