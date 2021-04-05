const CourseSchema = require("../../db/models/courses");
const Joi = require("joi");

const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    author: Joi.string().min(3).required(),
    tags: Joi.array().items(Joi.string()).required(),
    isPublished: Joi.boolean(),
  });
  return schema.validate(course);
};

const allCoursesHandler = async (req, res) => {
  const courses = await CourseSchema.find();
  res.send(courses);
};

const specificCourseHandler = async (req, res) => {
  const foundCourse = await CourseSchema.find({ name: req.params.name });
  if (foundCourse.length < 1) {
    return res.status(404).send("The specified course was not found");
  }
  res.send(foundCourse);
};

const createCourseHandler = async (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  const course = new CourseSchema({
    name: req.body.name,
    author: req.body.author,
    tags: [...req.body.tags],
    isPublished: req.body.isPublished,
  });

  const result = await course.save();
  res.send(result);

  res.status(500).send("Oops, something went wrong...");
};

const updateOneCourseHandler = async (req, res) => {
  const query = { name: req.params.name };
  const updated = await CourseSchema.updateOne(query, {
    name: req.body.name,
    author: req.body.author,
    tags: [...req.body.tags],
  });
  res.send(updated);
};

const updateManyCourseHandler = async (req, res) => {
  const query = { name: req.params.name };
  const updated = await CourseSchema.updateMany(query, {
    name: req.body.name,
    author: req.body.author,
    tags: [...req.body.tags],
  });
  res.send(updated);
};

const setOneCourseHandler = async (req, res) => {
  const result = await CourseSchema.find({ name: req.params.name });
  if (!result) {
    return res
      .status(404)
      .send(new Error("The course with the specified name was not found"));
  }
  if (result.isPublished) {
    return res
      .status(403)
      .send(new Error("Unable to change the published state of the course"));
  }

  const course = new CourseSchema({
    name: result.name,
    author: result.author,
    tags: result.tags,
    isPublished: result.isPublished,
  });
  if (course.isPublished) {
    res
      .status(403)
      .send(new Error("Unable to change the published state of the course"));
  }

  course.name = req.body.name;
  course.author = req.body.author;
  course.save();
  res.send(course);
};

const deleteCourseHandler = async (req, res) => {
  const result = await CourseSchema.findOneAndDelete({
    name: req.params.name,
  });
  if (!result) {
    return res.status(404).send("No such course found");
  }
  res.send(result);

  res.status(500).send("Oops, something went wrong...");
};

module.exports = {
  allCoursesHandler,
  specificCourseHandler,
  createCourseHandler,
  updateOneCourseHandler,
  updateManyCourseHandler,
  deleteCourseHandler,
  setOneCourseHandler,
};
