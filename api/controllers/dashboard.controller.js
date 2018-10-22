const Ticket = require("../models/ticket.model.js");
const Customer = require("../models/customer.model.js");
const Service = require("../models/service.model.js");
const Company = require("../models/company.model.js");
const DateHelper = require('../../helpers/date.helper');

exports.numberOfTicketsThisMonth = function(req, res) {
    
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

    var query = {
        date: {"$gte": firstDay, "$lt": date},
        company: req.params.companyId
    };

    Ticket.count(query)
        .then(function(tickets){
            res.status(200).send({total: tickets});
        })
        .catch(function(err){
            return res.status(500).send({
                message: "Error retrieving data"
            });
        });
};

exports.nextTickets = function(req, res) {

    var query = {
        date: {"$gte": new Date()},
        company: req.params.companyId
    };

    Ticket.find(query)
            .populate(['customer', 'service'])
            .sort({'date': 1})
            .limit(5)
        .then(function(tickets){
            if (!tickets) {
               return res.status(404).send({
                    message: "No tickets found"
               });
            }

            var result = "";
            tickets.forEach(ticket => {
                result += "<li><div class=\"avatar\"><img src=\"/assets/img/icon-tour.png\" class=\"img-responsive img-circle\"></div><div class=\"content\"><span class=\"msg\"><a href=\"#\" class=\"person\">" + ticket.service.name + "</a><br> " + ticket.customer.name + "</span><span class=\"time\">" + DateHelper.convertDate(ticket.date) + "</span></div></li>";
            });

            res.status(200).send({data: result});
        })
        .catch(function(err){
            return res.status(500).send({
                message: "Error retrieving data"
            });
        });
};

exports.numberOfCustomersThisMonth = function(req, res) {
    
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    var query = {
        createdAt: {"$gte": firstDay, "$lt": lastDay},
        company: req.params.companyId
    };

    Customer.count(query)
        .then(function(customers){
            res.status(200).send({total: customers});
        })
        .catch(function(err){
            return res.status(500).send({
                message: "Error retrieving data"
            });
        });
};

exports.numberOfCustomers = function(req, res) {
    
    Customer.count({company: req.params.companyId})
        .then(function(customers){
            res.status(200).send({total: customers});
        })
        .catch(function(err){
            return res.status(500).send({
                message: "Error retrieving data"
            });
        });
};

exports.numberOfServices = function(req, res) {
    
    Service.count({company: req.params.companyId})
        .then(function(services){
            res.status(200).send({total: services});
        })
        .catch(function(err){
            return res.status(500).send({
                message: "Error retrieving data"
            });
        });
};

exports.customersMonthGoal = function(req, res) {
    
    Company.findById(req.params.companyId)
        .then(function(company){
            res.status(200).send({total: company.goalCustomersPerMonth});
        })
        .catch(function(err){
            return res.status(500).send({
                message: "Error retrieving data"
            });
        });
};

exports.ticketsMonthGoal = function(req, res) {
    
    Company.findById(req.params.companyId)
        .then(function(company){
            res.status(200).send({total: company.goalTicketsPerMonth});
        })
        .catch(function(err){
            return res.status(500).send({
                message: "Error retrieving data"
            });
        });
};

