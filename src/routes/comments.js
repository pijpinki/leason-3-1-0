const express = require("express");
const routerExpress = express.Router();
const CommentModel = require("../models/CommentModel");

routerExpress.post("/comments", async (req, res) => {
  try {
    const comments = await CommentModel.create(req.body);

    res.send(comments);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});
routerExpress.get("/comments", async (req, res) => {
  try {
    const comments = await CommentModel.find({});
    res.send({ comments });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = routerExpress;
