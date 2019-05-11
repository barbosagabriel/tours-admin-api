"use strict";

var express = require("express");
var authController = require("../controllers/auth.controller.js");

(function() {
  var _route = function() {
    var router = express.Router();

    router.post("/login", authController.login);

    return router;
  };

  module.exports = _route;
})();
