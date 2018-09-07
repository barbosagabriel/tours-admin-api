'use strict';

var express = require('express');
var ticketController = require('../controllers/ticket.controller.js');

(function() {
	var _route = function() {
		var router = express.Router();

		router.post('/', ticketController.create);
		router.get('/', ticketController.findAll);
		router.get('/company/:id', ticketController.findAllByCompany);
		router.get('/:id', ticketController.findOne);
		router.put('/:id', ticketController.update);
		router.delete('/:id', ticketController.delete);

		return router;
	};

	module.exports = _route;

})();