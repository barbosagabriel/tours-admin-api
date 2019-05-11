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
		date: new Date(req.body.date),
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

				docDefinition = addExtraInformationSections(docDefinition, ticket);
		
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
						value: (ticket.company.addressNumber || '') + ' ' + ticket.company.address
					},
					{
						key: "{{COMPANY_ADDRESS_LINE2}}",
						value: ticket.company.city + ', ' + ticket.company.state + ' ' + ticket.company.zipcode + ', ' + ticket.company.country
					},
					{
						key: "{{LOGO}}",
						value: pdfHelper.getLogo()
					},
					{
						key: "{{VOUCHER_NUMBER}}",
						value: ticket.number.toString().padStart(6, '0')
					},
					{
						key: "{{DATE_OF_ISSUE}}",
						value: dateHelper.convertDate(new Date(), false)
					},
					{
						key: "{{DATE}}",
						value: dateHelper.convertDate(new Date(ticket.date), true)
					},
					{
						key: "{{GUIDE_NAME}}",
						value: ""
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
						value: ticket.service.price.toFixed(2)
					},
					{
						key: "{{DISCOUNT}}",
						value: ticket.discount.toFixed(2)
					},
					{
						key: "{{ITEM_TOTAL}}",
						value: (ticket.service.price * ticket.participants).toFixed(2)
					},
					{
						key: "{{TOTAL}}",
						value: ticket.total.toFixed(2)
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
				
				try	{
					docDefinition = pdfHelper.replaceTags(docDefinition, tags);
			
					pdfHelper.generatePdf(docDefinition, function(base64File){
						res.send({ 
							file: base64File,
							filename: pdfHelper.generateVoucherFilename(ticket)
						});
					});
				}catch{
					res.status(400).send();
				}
			}
		});
};

var addExtraInformationSections = function(docDefinition, ticket){

	if(ticket.service.description){
		docDefinition.content.push({
			text: "Descrição", style: "invoiceBillingTitle"
		},
		{
			text:"{{SERVICE_DESCRIPTION}}",
			style: "notesText"
		});
	}
	
	if(ticket.extraInformation){
		docDefinition.content.push({
			text: "Informações Complementares", style: "invoiceBillingTitle"
		},
		{
			text:"{{EXTRA_INFORMATION}}",
			style: "notesText"
		});
	}

	if(ticket.notes){
		docDefinition.content.push({
			text: "Notas Especiais", style: "invoiceBillingTitle"
		},
		{
			text:"{{NOTES}}",
			style: "notesText"
		});
	}

    if(ticket.paymentInformation){
		docDefinition.content.push({
			text: "Informações de Pagamento", style: "invoiceBillingTitle"
		},
		{
			text:"{{PAYMENT_INFORMATION}}",
			style: "notesText"
		});
	}

	return docDefinition;
    
}


