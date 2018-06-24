'use strict';

var express = require('express');
var serviceController = require('../controllers/service.controller.js');

(function() {
	var _route = function() {
		var router = express.Router();

		router.post('/', serviceController.create);
		router.get('/', serviceController.findAll);
		router.get('/company/:id', serviceController.findAllByCompany);
		router.get('/:id', serviceController.findOne);
		router.put('/:id', serviceController.update);
		router.delete('/:id', serviceController.delete);

		return router;
	};

	module.exports = _route;

})();