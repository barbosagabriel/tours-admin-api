var companyRoutes = require('./company.routes.js');
var customerRoutes = require('./customer.routes.js');
var userRoutes = require('./user.routes.js');
var authRoutes = require('./auth.routes.js');

module.exports = function(app) {
    app.use('/company', companyRoutes());
    app.use('/customer', customerRoutes());
    app.use('/user', userRoutes());
    app.use('/auth', authRoutes());
}