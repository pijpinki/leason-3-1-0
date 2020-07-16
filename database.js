const USERNAME = 'editor';
const PASSWORD = "UqhtuwF3IGI6gOc3";
const DATABASE_NAME = 'database';
const CONNECT_URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.c8cdd.mongodb.net/${DATABASE_NAME}`;

mongodb.MongoClient.connect(CONNECT_URL)
.then(client => {
  