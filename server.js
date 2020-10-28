const express = require("express");
const routes = require("./routes");
const sequelize = require("./config/connection");
const arg = process.argv[2];
const version = "1.0.0";

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Application
init = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(routes);

  sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("Now listening"));
  });
};

// Display Argument Data
if (arg === "-h") {
  console.log(`
        Usage: node server.js [ -h | -v | -l | -a ]
        or: npm start
        
        [options]
        -h          Display this message.
        -v          Show version.
        -l          Show license info.
        -a          What is EcommerceSite?
    `);
  process.exit();
} else if (arg === "-v") {
  console.log("EcommerceSite Version: " + version);
  process.exit();
} else if (arg === "-l") {
  console.log("Licensed under the Creative Commons CC0 Public Domain.");
  process.exit();
} else if (arg === "-a") {
  console.log(
    "E-Commerce backend with Express.js and SQL database. Including robust REST API with multiple endpoints/routes."
  );
  process.exit();
} else {
  init();
}
