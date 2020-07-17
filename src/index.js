const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const database = require("./database");
const users = require("./routes/users");
const comments = require("./routes/comments");
const app = express();

async function main() {
  await database.init();

  app.use(express.json());
  app.use(cors());
  app.use(morgan("dev"));
  app.use("/app", express.static(`${__dirname}/public/index.html`));

  app.use(users);
  app.use(comments);

  app.use((req, res) => {
    res.status(404).send({ message: "Page not found" });
  });

  app.listen(8080, err => {
    if (err) {
      console.error("Failed to start web server");
      return mongoose.connection.close();
    }

    console.info("Wer server started at port 8080");
  });
}

main().catch(console.error);
