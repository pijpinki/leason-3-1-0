const express = require("express");
const UserModel = require("../models/UserModel");

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find({});

    res.send({ users });
  } catch (e) {
    res.status(500).send();
  }
});

/**
 * Get some data
 * req.params
 */
router.get("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await UserModel.findById({ _id: userId });

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
router.post("/users", async (req, res) => {
  try {
    const { name, surname, email, age } = req.body;

    const user = await UserModel.create({ name, surname, email, age });

    res.send({ user });
  } catch (e) {
    console.error(req.body, e);
    res.status(500).send(e);
  }
});

/**
 * Edit some data
 */
router.put("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, surname, age, email } = req.body;

    if (!name || !surname) {
      return res.status(400).send({ message: "Bad request" });
    }

    await UserModel.updateUser(userId, { age, name, surname, email });

    res.status(204).send();
  } catch (e) {
    console.error("Error", e);
    res.status(500).send(e);
  }
});

/**
 * Delete some data
 */
router.delete("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    await UserModel.findByIdAndDelete({ _id: userId });

    res.send({ success: true });
  } catch (e) {
    console.error("Error !!!", e);
    res.sendStatus(501);
  }
});

module.exports = router;
