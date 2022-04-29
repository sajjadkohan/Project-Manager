const Application = require("./app/server");

const DB_URL = "mongodb://localhost:3001";
new Application(3001,DB_URL);