const companyRoute = require('./company.routes.js');

module.exports = (app) => {
    app.use('/company', companyRoute());
}