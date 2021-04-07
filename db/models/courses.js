const mongoose = require("mongoose");
const { categoriesSchema } = require("./category");

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 255 },
  author: { type: String, required: true, minlength: 3, maxlength: 255 },
  tags: {
    type: Array,
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "A course should have at least one tag",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
  },
  category: {
    type: categoriesSchema,
    required: true,
  },
});

module.exports = mongoose.model("Course", courseSchema);
