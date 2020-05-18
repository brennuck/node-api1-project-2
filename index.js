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

const port = 5000;
server.listen(port, () =>
  console.log(`\n === server running on port ${port} === \n`)
);
