const express = require("express");
const courses = require("../data/coursesData");
const Joi = require("joi");

const router = express.Router();

console.log(courses);

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}

router.get("/", (req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
  let foundElement = courses.find((c) => {
    return parseInt(req.params.id) === c.id;
  });

  if (!foundElement) {
    return res.status(404).send("The course with the given ID was not found");
  } else {
    res.send(foundElement);
  }
});

router.post("/", (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

router.put("/:id", (req, res) => {
  const findCourse = courses.find((course) => {
    return parseInt(req.params.id) === course.id;
  });
  if (!findCourse) {
    return res.status(404).send("The course specified does not exist");
  }

  //   const result = validateCourse(req.body);
  const { error } = validateCourse(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  findCourse.name = req.body.name;
  res.send(findCourse);
});

router.delete("/:id", (req, res) => {
  const findCourse = courses.find((course) => {
    return parseInt(req.params.id) === course.id;
  });

  if (!findCourse) {
    return res.status(404).send("The course specified does not exist");
  }

  const index = courses.indexOf(findCourse);
  courses.splice(index, 1);

  res.send(findCourse);
});

module.exports = router;
