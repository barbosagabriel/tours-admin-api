const Company = require("../models/company.model.js");

exports.create = function(req, res) {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Company content can not be empty"
    });
  }

  const company = new Company({
    address: req.body.address,
    addressLine2: req.body.addressLine2,
    addressNumber: req.body.addressNumber,
    city: req.body.city,
    corporateName: req.body.corporateName,
    country: req.body.country,
    email: req.body.email,
    facebook: req.body.facebook,
    instagram: req.body.instagram,
    name: req.body.name,
    phone: req.body.phone,
    phone2: req.body.phone2,
    state: req.body.state,
    website: req.body.website,
    zipcode: req.body.zipcode,
    goalCustomersPerMonth: req.body.goalCustomersPerMonth,
    goalTicketsPerMonth: req.body.goalTicketsPerMonth
  });

  company
    .save()
    .then(function(data) {
      res.status(201).send(data);
    })
    .catch(function(err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the company."
      });
    });
};

exports.findAll = function(req, res) {
  Company.find()
    .then(function(companies) {
      res.send(companies);
    })
    .catch(function(err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving companies."
      });
    });
};

exports.findOne = function(req, res) {
  Company.findById(req.params.companyId)
    .then(function(company) {
      if (!company) {
        return res.status(404).send({
          message: "Company not found with id " + req.params.companyId
        });
      }
      res.send(company);
    })
    .catch(function(err) {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Company not found with id " + req.params.companyId
        });
      }
      return res.status(500).send({
        message: "Error retrieving Company with id " + req.params.companyId
      });
    });
};

exports.update = function(req, res) {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Company email can not be empty"
    });
  }

  Company.findByIdAndUpdate(
    req.params.companyId,
    {
      address: req.body.address,
      addressLine2: req.body.addressLine2,
      addressNumber: req.body.addressNumber,
      city: req.body.city,
      corporateName: req.body.corporateName,
      country: req.body.country,
      email: req.body.email,
      facebook: req.body.facebook,
      instagram: req.body.instagram,
      name: req.body.name,
      phone: req.body.phone,
      phoneSecondary: req.body.phoneSecondary,
      state: req.body.state,
      website: req.body.website,
      zipcode: req.body.zipcode,
      goalCustomersPerMonth: req.body.goalCustomersPerMonth,
      goalTicketsPerMonth: req.body.goalTicketsPerMonth
    },
    { new: true }
  )
    .then(function(company) {
      if (!company) {
        return res.status(404).send({
          message: "Company not found with id " + req.params.companyId
        });
      }
      res.send(company);
    })
    .catch(function(err) {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Company not found with id " + req.params.companyId
        });
      }
      return res.status(500).send({
        message: "Error updating Company with id " + req.params.companyId
      });
    });
};

exports.delete = function(req, res) {
  Company.findByIdAndRemove(req.params.companyId)
    .then(function(company) {
      if (!company) {
        return res.status(404).send({
          message: "Company not found with id " + req.params.companyId
        });
      }
      res.send({ message: "Company deleted successfully!" });
    })
    .catch(function(err) {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Company not found with id " + req.params.companyId
        });
      }
      return res.status(500).send({
        message: "Could not delete Company with id " + req.params.companyId
      });
    });
};
