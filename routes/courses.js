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
  CourseSchema.find({}, (err, allCourses) => {
    if (err) {
      res.status(400).send(new Error(err));
    }
    res.send(allCourses);
  });
});

router.get("/:name", (req, res) => {
  CourseSchema.find({ name: req.params.name }, (err, foundCourses) => {
    if (err) {
      res.status(400).send(new Error(err));
    }

    res.send(foundCourses);
  });
});

router.post("/", (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const course = new CourseSchema({
    name: req.body.name,
    author: req.body.author,
    tags: [req.body.tags[0], ...req.body.tags],
    isPublished: req.body.isPublished,
  });
  course.save();
  res.send(course);
});

router.put("/:name", (req, res) => {
  const query = { name: req.params.name };
  CourseSchema.updateOne(
    query,
    { name: req.body.name, author: req.body.author, tags: [...req.body.tags] },
    (err, result) => {
      if (err) {
        res.status(400).send(new Error(err));
      }
      res.send(result);
    }
  );
});
router.patch("/:name", (req, res) => {
  const query = { name: req.params.name };
  CourseSchema.updateMany(
    query,
    { name: req.body.name, author: req.body.author, tags: [...req.body.tags] },
    (err, result) => {
      if (err) {
        res.status(400).send(new Error(err));
      }
      res.send(result);
    }
  );
});
// router.patch("/:name", (req, res) => {});

router.delete("/:name", (req, res) => {
  CourseSchema.deleteOne(
    {
      name: req.params.name,
    },
    (err, deletedResult) => {
      if (err) {
        res.status(400).send(new Error(err));
      }
      res.send(deletedResult);
    }
  );
});

module.exports = router;
