const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs").promises;
const app = express();

const wrapper = func => async (req, res) => {
  try {
    await func(req, res);
  } catch (e) {
    console.error("ERROR !", e);
    res.status(500).send({ message: e.message });
  }
};

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/app", express.static(`${__dirname}/public/index.html`));

app.get(
  "/users",
  wrapper(async (req, res) => {
    const usersText = await fs.readFile("users.json");
    const users = JSON.parse(usersText);

    res.send({ users });
  })
);

/**
 * Get some data
 * req.params
 */
app.get("/users/:userId", async (req, res) => {
  try {
    const userId = parseFloat(req.params.userId);
    const usersText = await fs.readFile("users.json", "utf-8");
    const users = JSON.parse(usersText);
    const user = users.find(user => user.id === userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send({ user });
  } catch (e) {
    console.error("ERROR !!!", e);
    res.status(500).send(e);
  }
});

/**
 * Add some data
 * Read file
 * Convert text to object
 * Add users to array
 * Write file
 *
 * req.body
 */
app.post("/users", async (req, res) => {
  try {
    const { name, surname, email } = req.body;
    const id = Math.random();

    const usersText = await fs.readFile("users.json", "utf-8");
    const users = JSON.parse(usersText);
    const user = { id, name, surname, email };

    users.push(user);

    await fs.writeFile("users.json", JSON.stringify(users), "utf-8");

    res.send({ user });
  } catch (e) {
    console.error(req.body, e);
    res.status(500).send(e);
  }
});

/**
 * Edit some data
 */
app.put("/users/:userId", async (req, res) => {
  try {
    const userId = parseFloat(req.params.userId);
    const usersText = await fs.readFile("users.json", "utf-8");
    const users = JSON.parse(usersText);

    const { name, surname } = req.body;

    if (!name || !surname) {
      return res.status(400).send({ message: "Bad request" });
    }

    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
      return res.status(404).send({ message: "Not user" });
    }

    users[userIndex] = { ...users[userIndex], name, surname };

    await fs.writeFile("users.json", JSON.stringify(users), "utf-8");

    res.status(204).send();
  } catch (e) {
    console.error("Error", e);
    res.status(500).send(e);
  }
});

/**
 * Delete some data
 */
app.delete("/users/:userId", async (req, res) => {
  try {
    const userId = parseFloat(req.params.userId);
    const usersText = await fs.readFile("users.json", "utf-8");
    const users = JSON.parse(usersText);
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
      return res.status(404).send({ message: "User not found" });
    }

    users.splice(userIndex, 1);

    await fs.writeFile("users.json", JSON.stringify(users), "utf-8");

    res.send({ success: true });
  } catch (e) {
    console.error("Error !!!", e);
    res.sendStatus(501);
  }
});

app.use((req, res) => {
  res.status(404).send({ message: "Page not found" });
});

app.listen(8080, err => {
  err && console.error("error", err);
  console.info("Operaion compele");
});
