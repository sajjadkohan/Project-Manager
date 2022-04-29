const Application = require("./app/server");

const DB_URL = "mongodb://0.0.0.0:27017/ProjectManagerDB";
new Application(3001,DB_URL);