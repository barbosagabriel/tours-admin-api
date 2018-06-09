const Customer = require("../models/customer.model.js");

exports.create = function(req, res) {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Customer content can not be empty"
    });
  }

  const customer = new Customer({
    name: req.body.name,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    identificationNumber: req.body.identificationNumber,
    email: req.body.email,
    phone: req.body.phone,
    phoneSecondary: req.body.phoneSecondary,
    postalCode: req.body.postalCode,
    address: req.body.address,
    addressLine2: req.body.addressLine2,
    addressNumber: req.body.addressNumber,
    addressNeighbourhood: req.body.addressNeighbourhood,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    company: req.body.company
  });

  customer
    .save()
    .then(function(data) {
      res.status(201).send(data);
    })
    .catch(function(err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the customer."
      });
    });
};

exports.findAll = function(req, res) {
  Customer.find()
    .then(function(customers) {
      res.send(customers);
    })
    .catch(function(err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    });
};

exports.findAllByCompany = function(req, res) {
  Customer.find({company: req.params.id})
    .then(function(customers) {
      res.send(customers);
    })
    .catch(function(err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    });
};

exports.findOne = function(req, res) {
  Customer.findById(req.params.id)
    .then(function(customer) {
      if (!customer) {
        return res.status(404).send({
          message: "Customer not found with id " + req.params.id
        });
      }
      res.send(customer);
    })
    .catch(function(err) {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Customer not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error retrieving Customer with id " + req.params.id
      });
    });
};

exports.update = function(req, res) {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Customer email can not be empty"
    });
  }

  Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      identificationNumber: req.body.identificationNumber,
      email: req.body.email,
      phone: req.body.phone,
      phoneSecondary: req.body.phoneSecondary,
      postalCode: req.body.postalCode,
      address: req.body.address,
      addressLine2: req.body.addressLine2,
      addressNumber: req.body.addressNumber,
      addressNeighbourhood: req.body.addressNeighbourhood,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      company: req.body.company
    },
    { new: true }
  )
    .then(function(customer) {
      if (!customer) {
        return res.status(404).send({
          message: "Customer not found with id " + req.params.id
        });
      }
      res.send(customer);
    })
    .catch(function(err) {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Customer not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error updating Customer with id " + req.params.id
      });
    });
};

exports.delete = function(req, res) {
  Customer.findByIdAndRemove(req.params.id)
    .then(function(customer) {
      if (!customer) {
        return res.status(404).send({
          message: "Customer not found with id " + req.params.id
        });
      }
      res.send({ message: "Customer deleted successfully!" });
    })
    .catch(function(err) {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Customer not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete Customer with id " + req.params.id
      });
    });
};
