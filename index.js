const express = require("express");

const server = express();

let users = [
  {
    id: 1, // hint: use the shortid npm package to generate it
    name: "Jane Doe", // String, required
    bio: "Not Tarzan's Wife, another Jane", // String, required
  },
];

server.use(express.json());

server.get("/", (req, res) => {
  res.json({ api: "running" });
});

server.get("/api/users", (req, res) => {
  res.json(users);
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;

  const user = users.find((user) => user.id == id);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

server.post("/api/users", (req, res) => {
  const userInfo = req.body;

  if (!userInfo.name || !userInfo.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else if (userInfo.name || userInfo.bio) {
    users.push(userInfo);
    res.status(201).json(users);
  } else {
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database",
    });
  }
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  const found = users.find((user) => user.id === id);

  if (found) {
    users = users.filter((user) => user.id !== id);
    res.status(200).json(found);
  } else {
    res.status(404).json({ message: "not found" });
  }
});

server.patch("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  let found = users.find((use) => use.id === id);

  if (found) {
    Object.assign(found, changes);
    res.status(200).json(found);
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

const port = 5000;
server.listen(port, () =>
  console.log(`\n === server running on port ${port} === \n`)
);
