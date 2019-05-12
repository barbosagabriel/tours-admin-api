const faker = require("faker");
const { factory } = require("factory-girl");

const Company = require("../api/models/company.model");
const User = require("../api/models/user.model");

factory.define("Company", Company, {
  name: `${faker.random.word()} Company`
});

factory.define("User", User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  role: faker.lorem.word(),
  company: ""
});

module.exports = factory;
