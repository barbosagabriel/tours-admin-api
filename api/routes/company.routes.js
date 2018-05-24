module.exports = (app) => {
    const company = require('../controllers/company.controller.js');

    app.post('/company', company.create);

    app.get('/company', company.findAll);

    app.get('/company/:companyId', company.findOne);

    app.put('/company/:companyId', company.update);

    app.delete('/company/:companyId', company.delete);
}