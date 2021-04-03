const express = require("express");
const CourseSchema = require("../db/models/courses");
const dbConnection = require("../db/connection");
const debugerData = require("debug")("app:datadebuger"); //needs DEBUG (env variable) set to this namespace to work
const Joi = require("joi");

const router = express.Router();

// debugerData(courses);

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    author: Joi.string().min(3).required(),
    tags: Joi.array().items(Joi.string()),
    isPublished: Joi.boolean(),
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

  const course = new CourseSchema({
    name: req.body.name,
    author: req.body.author,
    tags: [req.body.tags[0], req.body.tags[1]],
    isPublished: req.body.isPublished,
  });
  course.save();
  res.send(course);
});

router.put("/:id", (req, res) => {
  const findCourse = courses.find((course) => {
    return parseInt(req.params.id) === course.id;
  });
  if (!findCourse) {
    return res.status(404).send("The course specified does not exist");
  }

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
