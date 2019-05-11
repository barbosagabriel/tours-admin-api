"use strict";

var express = require("express");
var userController = require("../controllers/user.controller.js");

(function() {
  var _route = function() {
    var router = express.Router();

    router.post("/", userController.create);
    router.get("/", userController.findAll);
    router.get("/:id", userController.findOne);
    router.put("/:id", userController.update);
    router.delete("/:id", userController.delete);

    return router;
  };

  module.exports = _route;
})();
