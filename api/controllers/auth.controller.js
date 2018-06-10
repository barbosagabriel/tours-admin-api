const User = require("../models/user.model.js");

exports.login = function(req, res) {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({
            message: "User content invalid."
        });
    }

    var query = {
        email: req.body.email,
        password: req.body.password
    };

    User.findOne(query)
        .then(function(user){
            if (!user) {
               return res.status(404).send({
                    message: "User not found"
               });
            }
            res.status(200).send(user);
        })
        .catch(function(err){
            return res.status(500).send({
                message: "Error retrieving data"
            });
        });
};