const Ticket = require("../models/ticket.model.js");
const pdfHelper = require('../../helpers/pdf.helper');
const dateHelper = require('../../helpers/date.helper');

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
		service: req.body.service,
		extraInformation: req.body.extraInformation,
		notes: req.body.notes,
		paymentInformation: req.body.paymentInformation,
		customerHotel: req.body.customerHotel,
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
	Ticket.findById(req.params.id).populate('customer').populate('service').populate('company')
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

exports.getPdf = function(req, res){
	
	var ticketId = req.params.id;
	Ticket.findById(req.params.id).populate('customer').populate('service').populate('company')
		.then(function(ticket) {
			if(ticket != null){
				var docDefinition = pdfHelper.getVoucherTemplate();
		
				var tags = [
					{
						key: "{{COMPANY_PHONE_1}}",
						value: ticket.company.phone
					},
					{
						key: "{{COMPANY_PHONE_2}}",
						value: ticket.company.phoneSecondary
					},
					{
						key: "{{COMPANY_EMAIL}}",
						value: ticket.company.email
					},
					{
						key: "{{COMPANY_WEBSITE}}",
						value: ticket.company.website
					},
					{
						key: "{{COMPANY_INSTAGRAM}}",
						value: ticket.company.instagram
					},
					{
						key: "{{COMPANY_ADDRESS}}",
						value: ticket.company.addressNumber + ' ' + ticket.company.address
					},
					{
						key: "{{COMPANY_ADDRESS_LINE2}}",
						value: ticket.company.city + ', ' + ticket.company.state + ' ' + ticket.company.zipcode + ', ' + ticket.company.country
					},
					{
						key: "{{LOGO}}",
						value: "data:image/png;base64,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"
					},
					{
						key: "{{VOUCHER_NUMBER}}",
						value: ticket.number.toString().padStart(6, '0')
					},
					{
						key: "{{DATE_OF_ISSUE}}",
						value: dateHelper.convertDate(new Date())
					},
					{
						key: "{{DATE}}",
						value: dateHelper.convertDate(new Date(ticket.date))
					},
					{
						key: "{{GUIDE_NAME}}",
						value: "Nome do Guia"
					},
					{
						key: "{{COMPANY_NAME}}",
						value: ticket.company.corporateName
					},
					{
						key: "{{CUSTOMER_NAME}}",
						value: ticket.customer.name
					},
					{
						key: "{{CUSTOMER_HOTEL}}",
						value: ticket.customerHotel
					},
					{
						key: "{{SERVICE_NAME}}",
						value: ticket.service.name
					},
					{
						key: "{{SERVICE_SHORT_DESCRIPTION}}",
						value: ticket.service.shortDescription.trim()
					},
					{
						key: "{{QUANTITY}}",
						value: ticket.participants
					},
					{
						key: "{{UNIT_PRICE}}",
						value: ticket.service.price
					},
					{
						key: "{{DISCOUNT}}",
						value: ticket.discount
					},
					{
						key: "{{TOTAL}}",
						value: ticket.total
					},
					{
						key: "{{SERVICE_DESCRIPTION}}",
						value: ticket.service.description.trim()
					},
					{
						key: "{{EXTRA_INFORMATION}}",
						value: ticket.extraInformation
					},
					{
						key: "{{NOTES}}",
						value: ticket.notes
					},
					{
						key: "{{PAYMENT_INFORMATION}}",
						value: ticket.paymentInformation
					},
				];
				
				docDefinition = pdfHelper.replaceTags(docDefinition, tags);
		
				pdfHelper.generatePdf(docDefinition, function(base64File){
					res.send({ 
						file: base64File,
						filename: pdfHelper.generateVoucherFilename(ticket)
					});
				});
			}
		});
};
