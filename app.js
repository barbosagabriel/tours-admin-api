const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

const dbConfig = require("./config/database.config.js");

class AppController {
  constructor() {
    this.express = express();

    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  dbConnection() {
    if (process.env.NODE_ENV === "test") {
      const Mockgoose = require("mockgoose").Mockgoose;
      const mockgoose = new Mockgoose(mongoose);

      mockgoose.prepareStorage().then(function() {
        mongoose.connect(dbConfig.url);
      });

      var db = mongoose.connection;

      db.once("open", () => {
        console.log("Using in-memory database");
      });

      db.on("error", err => {
        console.warn("Error: ", err);
      });

      return;
    }

    mongoose.Promise = global.Promise;

    mongoose
      .connect(dbConfig.url)
      .then(function() {
        console.log("Successfully connected to the database");
      })
      .catch(function(err) {
        console.log("Could not connect to the database. Exiting now...");
        process.exit();
      });
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json({ limit: "5mb" }));
    this.express.use(
      cors([
        { origin: "http://localhost:8080" },
        { origin: "https://tours-admin.herokuapp.com" }
      ])
    );
  }

  routes() {
    this.express.get("/", function(req, res) {
      res.json({ status: "API Online" });
    });

    require("./api/routes/routes.js")(this.express);
  }
}

module.exports = new AppController().express;
