const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors([{origin: 'http://localhost:8080'}, {origin: 'https://tours-admin.herokuapp.com'}]));

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url)
.then(function() {
    console.log("Successfully connected to the database");    
}).catch(function(err) {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

app.get('/', function(req, res) {
    res.json({"status": "API Online"});
});

require('./api/routes/routes.js')(app);

app.listen(dbConfig.port, function() {
    console.log("Server is listening on port " + dbConfig.port);
});