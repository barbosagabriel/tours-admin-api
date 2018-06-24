const User = require("../models/user.model.js");

exports.create = function(req, res) {
  if (!req.body.name) {
    return res.status(400).send({
      message: "User content can not be empty"
    });
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
	company: req.body.company,
	initials: req.body.initials
  });

  user
    .save()
    .then(function(data) {
      res.status(201).send(data);
    })
    .catch(function(err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    });
};

exports.findAll = function(req, res) {
  User.find()
    .then(function(users) {
      res.send(users);
    })
    .catch(function(err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

exports.findOne = function(req, res) {
  User.findById(req.params.id)
    .then(function(user) {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      }
      res.send(user);
    })
    .catch(function(err) {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error retrieving User with id " + req.params.id
      });
    });
};

exports.update = function(req, res) {
  
    var userObj = {};
	if(req.body.name) userObj.name = req.body.name;
    if(req.body.email) userObj.email = req.body.email;
    if(req.body.password) userObj.password = req.body.password;
    if(req.body.image) userObj.image = req.body.image;
    if(req.body.company) userObj.company = req.body.company;
    if(req.body.initials) userObj.initials = req.body.initials;
  
	User.findByIdAndUpdate(req.params.id, userObj, { new: true, upsert: true })
		.then(function(user) {
			if (!user) {
				return res.status(404).send({
					message: "User not found with id " + req.params.id
				});
			}
			res.send(user);
		})
		.catch(function(err) {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: "User not found with id " + req.params.id
				});
			}
				return res.status(500).send({
					message: "Error updating User with id " + req.params.id
				});
		});
	};

exports.delete = function(req, res) {
  User.findByIdAndRemove(req.params.id)
    .then(function(user) {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      }
      res.send({ message: "User deleted successfully!" });
    })
    .catch(function(err) {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete User with id " + req.params.id
      });
    });
};
