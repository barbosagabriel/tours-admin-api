"use strict";

var express = require("express");
var companyController = require("../controllers/company.controller.js");

(function() {
	var _route = function() {
		var router = express.Router();

		router.post("/", companyController.create);
		router.get("/", companyController.findAll);
		router.get("/:companyId", companyController.findOne);
		router.put("/:companyId", companyController.update);
		router.delete("/:companyId", companyController.delete);

		return router;
	};

	module.exports = _route;
})();
