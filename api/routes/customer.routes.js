'use strict';

var express = require('express');
var customerController = require('../controllers/customer.controller.js');

(function() {

	var _route = function() {
		var router = express.Router();

		router.post('/', customerController.create);
		router.get('/', customerController.findAll);
		router.get('/company/:id', customerController.findAllByCompany);
		router.get('/:id', customerController.findOne);
		router.put('/:id', customerController.update);
		router.delete('/:id', customerController.delete);

		return router;
	};

	module.exports = _route;

})();