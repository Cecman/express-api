const express = require("express");
const app = express();
const Joi = require("joi");

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// app.get("/api/courses/:id/:value", (req, res) => {
//   // res.send(req.params.id); //single param
//   // res.send(req.params); //all parameters
//   res.send(req.query); //read the query
// });

app.get("/api/courses/:id", (req, res) => {
  let foundElement = courses.find((c) => {
    return parseInt(req.params.id) === c.id;
  });

  if (!foundElement) {
    res.status(404).send("The course with the given ID was not found");
  } else {
    res.send(foundElement);
  }
});

app.post("/api/courses", (req, res) => {
  //JOI validation schema
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});


app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});