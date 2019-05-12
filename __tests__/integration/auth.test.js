const request = require("supertest");
const mongoose = require("mongoose");
const Mockgoose = require("mockgoose").Mockgoose;
const mockgoose = new Mockgoose(mongoose);

const app = require("../../app");
const factory = require("../factories");

beforeAll(async () => {
  await mockgoose.prepareStorage().then(function() {
    mongoose.connect("");
  });
});

describe("Authentication", () => {
  it("should login with valid credentials", async () => {
    var company = await factory.create("Company");
    await company.save();

    var user = await factory.create("User", {
      company: company
    });
    await user.save();

    const response = await request(app)
      .post("/auth/login")
      .send({ email: user.email, password: user.password });

    expect(response.status).toBe(200);
  });

  it("should not login with invalid credentials", async () => {
    var company = await factory.create("Company");
    await company.save();

    var user = await factory.create("User", {
      company: company
    });
    await user.save();

    const response = await request(app)
      .post("/auth/login")
      .send({ email: user.email, password: "123456" });

    expect(response.status).toBe(404);
  });
});
