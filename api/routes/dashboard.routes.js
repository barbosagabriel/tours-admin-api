'use strict';

var express = require('express');
var dashboardController = require('../controllers/dashboard.controller.js');

(function() {
	var _route = function() {
		var router = express.Router();

		router.get('/customers/thisMonth/:companyId', dashboardController.numberOfCustomersThisMonth);
		router.get('/customers/count/:companyId', dashboardController.numberOfCustomers);
		router.get('/customers/monthGoal/:companyId', dashboardController.customersMonthGoal);
		router.get('/services/count/:companyId', dashboardController.numberOfServices);
		router.get('/tickets/nextTickets/:companyId', dashboardController.nextTickets);
		router.get('/tickets/thisMonth/:companyId', dashboardController.numberOfTicketsThisMonth);
		router.get('/tickets/monthGoal/:companyId', dashboardController.ticketsMonthGoal);

		return router;
	};

	module.exports = _route;

})();