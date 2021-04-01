const express = require("express");
const app = express();
const logger = require('./middleware/logger');
const authenticator = require('./middleware/authenticator');
const Joi = require("joi");

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger);
app.use(authenticator);

let courses = [
    {id: 1, name: "course1"},
    {id: 2, name: "course2"},
    {id: 3, name: "course3"},
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
        return res.status(404).send("The course with the given ID was not found");
    } else {
        res.send(foundElement);
    }
});

app.post("/api/courses", (req, res) => {
    const {error} = validateCourse(req.body);

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

app.put("/api/courses/:id", (req, res) => {
    const findCourse = courses.find((course) => {
        return parseInt(req.params.id) === course.id;
    });
    if (!findCourse) {
        return res.status(404).send("The course specified does not exist");
    }

    //   const result = validateCourse(req.body);
    const {error} = validateCourse(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    findCourse.name = req.body.name;
    res.send(findCourse);
});

app.delete("/api/courses/:id", (req, res) => {
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

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });
    return schema.validate(course);
}

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
