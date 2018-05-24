require('dotenv').config();

module.exports = {
    url: process.env.DB_CONNECTION || 'mongodb://localhost:27017/tours-admin',
    port: process.env.PORT || 3000
}
