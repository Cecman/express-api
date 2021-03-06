const CourseSchema = require("../../db/models/courses");
const { Category } = require("../../db/models/category");
const validator = require("../../middleware/inputValidation");
const _ = require('lodash')

const allCoursesHandler = async (req, res) => {
  const courses = await CourseSchema.find().select("-__v -_id");
  if (courses.length < 1) {
    return res.status(404).send("No courses were found");
  }
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
  const { error } = validator(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const course = new CourseSchema({
    name: req.body.name,
    author: req.body.author,
    tags: [...req.body.tags],
    category: new Category({ name: req.body.category }),
    isPublished: req.body.isPublished,
    price: req.body.price,
  });
  // _.pick(req.body, [
  //   "name",
  //   "author",
  //   "tags",
  //   "category",
  //   "price",
  //   "isPublished",
  // ]
  const result = await course.save();
  res.send(result);
};

const updateOneCourseHandler = async (req, res) => {
  const { error } = validator(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const query = { name: req.params.name };
  const updated = await CourseSchema.updateOne(
    query,
    _.pick(req.body, ["name", "author", "tags"])
  );
  res.send(updated);
};

const updateManyCourseHandler = async (req, res) => {
  const query = { name: req.params.name };
  const updated = await CourseSchema.updateMany(
    query,
    _.pick(req.body, ["name", "author", "tags"])
  );
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

  const course = new CourseSchema(
    _.pick(req.body, ["name", "author", "tags", "isPublished"])
  );
  // {
  //   name: result.name,
  //   author: result.author,
  //   tags: result.tags,
  //   isPublished: result.isPublished,
  // }
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

// const setCategoryHandler = async (req, res) => {
//   const query = { name: req.params.name };
//   const course = await CourseSchema.find(query);

//   console.log(course[0].category.name);
//   const updated = await CourseSchema.updateOne(course.category.name, {
//     category: req.body.category,
//   });

//   res.send(course);
//   // const updated = await Category.updateOne(query, {
//   //   category: req.body.category,
//   // });
//   // res.send(updated);
// };

const deleteCourseHandler = async (req, res) => {
  const result = await CourseSchema.findOneAndDelete({
    name: req.params.name,
  });
  if (!result) {
    return res.status(404).send("No such course found");
  }
  res.send(result);

  // res.status(500).send("Oops, something went wrong...");
};

const deleteManyCoursesHandler = async (req, res) => {
  const courseName = req.params.name;
  const result = await CourseSchema.deleteMany({ name: courseName });
  if (result.length < 1) {
    return res.status(404).send(`No courses named ${courseName} were found`);
  }
  res.send(result);
};

module.exports = {
  allCoursesHandler,
  specificCourseHandler,
  createCourseHandler,
  updateOneCourseHandler,
  updateManyCourseHandler,
  deleteCourseHandler,
  setOneCourseHandler,
  deleteManyCoursesHandler,
  //setCategoryHandler,
};
