const mongooose = require("mongoose");

const USERNAME = "editor";
const PASSWORD = "UqhtuwF3IGI6gOc3";
const DATABASE_NAME = "database";
const CONNECT_URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.c8cdd.mongodb.net/${DATABASE_NAME}`;

console.info(CONNECT_URL);

class Database {
  constructor() {
    this.connection = null;
  }

  errorHandler(e) {
    console.error("Database connection error");
    console.error(e);

    process.exit(1);
  }

  async init() {
    try {
      this.connection = await mongooose.connect(CONNECT_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
      });

      console.info("Database succesfully connected");
    } catch (e) {
      this.errorHandler(e);
    }
  }
}

module.exports = new Database();
