var companyRoutes = require('./company.routes.js');
var customerRoutes = require('./customer.routes.js');
var serviceRoutes = require('./service.routes.js');
var ticketRoutes = require('./ticket.routes.js');
var userRoutes = require('./user.routes.js');
var authRoutes = require('./auth.routes.js');
var dashboardRoutes = require('./dashboard.routes.js');

module.exports = function(app) {
    app.use('/company', companyRoutes());
    app.use('/customer', customerRoutes());
    app.use('/service', serviceRoutes());
    app.use('/ticket', ticketRoutes());
    app.use('/user', userRoutes());
    app.use('/auth', authRoutes());
    app.use('/dashboard', dashboardRoutes());
}