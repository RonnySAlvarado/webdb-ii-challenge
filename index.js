const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const server = express();

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.sqlite3"
  },
  useNullAsDefault: true
};
const db = knex(knexConfig);

server.use(express.json());
server.use(helmet());

// endpoints here

server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(zoo => {
      res.status(200).json(zoo);
    })
    .catch(err => {
      console.log(err);
      res
        .status(400)
        .json({ message: "Something went wrong with retrieving the data." });
    });
});

server.post("/api/zoos", (req, res) => {
  const zoo = req.body;
  console.log(zoo);
  db.insert(zoo)
    .into("zoos")
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
