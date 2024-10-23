require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Person = require("./models/person");

const morgan = require("morgan");
morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

const app = express();
app.use(express.static("dist"));
app.use(cors());
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/info", (req, res) => {
  const date = new Date();
  // calculate the number of people in the phonebook
  Person.find({}).then((persons) => {
    res.send(
      `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
    );
  });
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.delete("/api/persons/:id", (req, res) => {
  Person.findByIdAndDelete(req.params.id).then((result) => {
    if (result) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "person not found" }).end();
    }
  });
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;
  Person.find({ name: body.name })
    .then((result) => {
      if (result.length > 0) {
        res
          .status(409)
          .json({ error: "name must be unique", person: result[0] })
          .end();
      } else {
        const person = new Person({
          name: body.name,
          number: body.number,
        });
        person
          .save()
          .then((savedPerson) => {
            res.json(savedPerson);
          })
          .catch((error) => next(error));
      }
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;
  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      if (updatedPerson) {
        res.json(updatedPerson);
      } else {
        res.status(404).json({ error: "person not found" }).end();
      }
    })
    .catch((error) => next(error));
});

// Handler of requests with unknown endpoint
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

// Handler of requests with result to errors
const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
