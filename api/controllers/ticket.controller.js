const Ticket = require("../models/ticket.model.js");

exports.create = function(req, res) {
	if (!req.body.company) {
		return res.status(400).send({
			message: "Ticket content can not be empty"
		});
	}

	const ticket = new Ticket({
		date: req.body.date,
		participants: req.body.participants,
		subTotal: req.body.subTotal,
		discount: req.body.discount,
		total: req.body.total,
		company: req.body.company,
		customer: req.body.customer, 
		guide: req.body.guide,
		responsible: req.body.responsible,
		service: req.body.service
	});

	ticket.save()
		.then(function(data) {
			res.status(201).send(data);
		})
		.catch(function(err) {
			res.status(500).send({
			message:
				err.message || "Some error occurred while creating the ticket."
			});
		});
};

exports.findAll = function(req, res) {
	Ticket.find()
		.then(function(tickets) {
			res.send(tickets);
		})
		.catch(function(err) {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving tickets."
			});
		});
};

exports.findAllByCompany = function(req, res) {
	var id = req.params.id;
	Ticket.find({company: id}).populate('customer').populate('service')
		.then(function(tickets) {
			res.send(tickets);
		})
		.catch(function(err) {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving tickets."
			});
		});
};

exports.findOne = function(req, res) {
	Ticket.findById(req.params.id)
		.then(function(ticket) {
			if (!ticket) {
				return res.status(404).send({
					message: "Ticket not found with id " + req.params.id
				});
			}
			res.send(ticket);
		})
		.catch(function(err) {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: "Ticket not found with id " + req.params.id
				});
			}
			return res.status(500).send({
				message: "Error retrieving Ticket with id " + req.params.id
			});
		});
};

exports.update = function(req, res) {
  	Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true, upsert: true })
		.then(function(ticket) {
			if (!ticket) {
				return res.status(404).send({
					message: "Ticket not found with id " + req.params.id
				});
			}
			res.send(ticket);
		})
		.catch(function(err) {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: "Ticket not found with id " + req.params.id
				});
			}
				return res.status(500).send({
					message: "Error updating Ticket with id " + req.params.id
				});
		});
};

exports.delete = function(req, res) {
	Ticket.findByIdAndRemove(req.params.id)
		.then(function(ticket) {
			if (!ticket) {
				return res.status(404).send({
					message: "Ticket not found with id " + req.params.id
				});
			}
			res.status(200).send({ message: "Ticket deleted successfully!" });
		})
		.catch(function(err) {
			if (err.kind === "ObjectId" || err.name === "NotFound") {
				return res.status(404).send({
					message: "Ticket not found with id " + req.params.id
				});
			}
			return res.status(500).send({
				message: "Could not delete Ticket with id " + req.params.id
			});
		});
};
