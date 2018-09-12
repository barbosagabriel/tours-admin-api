const Service = require("../models/service.model.js");

exports.create = function(req, res) {
	if (!req.body.name && !req.body.price) {
		return res.status(400).send({
			message: "Service content can not be empty"
		});
	}

	const service = new Service({
		name: req.body.name,
		shortDescription: req.body.shortDescription,
		description: req.body.description,
		price: req.body.price,
		company: req.body.company,
	});

	service.save()
		.then(function(data) {
			res.status(201).send(data);
		})
		.catch(function(err) {
			res.status(500).send({
			message:
				err.message || "Some error occurred while creating the service."
			});
		});
};

exports.findAll = function(req, res) {
	Service.find()
		.then(function(services) {
			res.send(services);
		})
		.catch(function(err) {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving services."
			});
		});
};

exports.findAllByCompany = function(req, res) {
	var id = req.params.id;
	Service.find({company: id})
		.then(function(services) {
			res.send(services);
		})
		.catch(function(err) {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving services."
			});
		});
};

exports.findOne = function(req, res) {
	Service.findById(req.params.id)
		.then(function(service) {
			if (!service) {
				return res.status(404).send({
					message: "Service not found with id " + req.params.id
				});
			}
			res.send(service);
		})
		.catch(function(err) {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: "Service not found with id " + req.params.id
				});
			}
			return res.status(500).send({
				message: "Error retrieving Service with id " + req.params.id
			});
		});
};

exports.update = function(req, res) {
  	Service.findByIdAndUpdate(req.params.id, req.body, { new: true, upsert: true })
		.then(function(service) {
			if (!service) {
				return res.status(404).send({
					message: "Service not found with id " + req.params.id
				});
			}
			res.send(service);
		})
		.catch(function(err) {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: "Service not found with id " + req.params.id
				});
			}
				return res.status(500).send({
					message: "Error updating Service with id " + req.params.id
				});
		});
};

exports.delete = function(req, res) {
	Service.findByIdAndRemove(req.params.id)
		.then(function(service) {
			if (!service) {
				return res.status(404).send({
					message: "Service not found with id " + req.params.id
				});
			}
			res.status(200).send({ message: "Service deleted successfully!" });
		})
		.catch(function(err) {
			if (err.kind === "ObjectId" || err.name === "NotFound") {
				return res.status(404).send({
					message: "Service not found with id " + req.params.id
				});
			}
			return res.status(500).send({
				message: "Could not delete Service with id " + req.params.id
			});
		});
};
