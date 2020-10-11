const app = require("../app");
const request = require("supertest");
const User = require("../models/user");
const chance = require("chance").Chance();
process.env.NODE_ENV = "test";
// let token;

describe("Run test for user routes", () => {
  beforeAll(async () => {
    jest.setTimeout(60000);
  });

  afterEach(async () => {
    // Delete documents from collections
    await User.collection.deleteMany({});
  });

  describe("Route /api/v1/user/signup", () => {
    describe("POST create a new user", () => {
      it("should register a new user to the database", async () => {
        const newUser = new User({
          firstName: chance.first(),
          lastName: chance.last(),
          email: chance.email(),
          password: "3hd56$%hs!45",
        });

        const result = await request(app)
          .post("/api/v1/user/signup")
          .send(newUser);

        expect(result.statusCode).toBe(201);
        expect(result.body.status).toBe("Success");
        expect(result.body.data).toHaveProperty("_id", result.body.data._id);
      });

      it("should return an error if INVALID EMAIL is used", async () => {
        const newUser = new User({
          firstName: chance.first(),
          lastName: chance.last(),
          email: chance.string(),
          password: "3hd56$%hs!45",
        });

        const result = await request(app)
          .post("/api/v1/user/signup")
          .send(newUser);

        expect(result.body.error).toBe("Invalid email address");
      });

      it("should return an error if the email supplied is already in use", async () => {
        const newUser = new User({
          firstName: chance.first(),
          lastName: chance.last(),
          email: chance.email(),
          password: "3hd56$%hs!45",
        });

        const firstUser = await request(app)
          .post("/api/v1/user/signup")
          .send(newUser);

        const secondUser = await request(app)
          .post("/api/v1/user/signup")
          .send(newUser);

        expect(secondUser.body.error).toBe(
          "A user with the email already exists"
        );
      });
    });

    describe("POST login an existing user", () => {
      it("should successfully log in an existing user providing correct login details", async () => {
        const newUser = new User({
          firstName: chance.first(),
          lastName: chance.last(),
          email: chance.email(),
          password: "3hd56$%hs!45",
        });

        await request(app).post("/api/v1/user/signup").send(newUser);

        const loginDetails = {
          email: newUser.email,
          password: newUser.password,
        };

        const result = await request(app)
          .post("/api/v1/user/login")
          .send(loginDetails);

        expect(result.statusCode).toBe(200);
        expect(result.body.token).toBeDefined();
        expect(result.body.message).toBe("Authentication Successfull!");
      });

      it("should throw a 404 error if email does not exist in database", async () => {
        const newUser = new User({
          firstName: chance.first(),
          lastName: chance.last(),
          email: chance.email(),
          password: "3hd56$%hs!45",
        });

        await request(app).post("/api/v1/user/signup").send(newUser);

        const loginDetails = {
          email: chance.email(),
          password: newUser.password,
        };

        const result = await request(app)
          .post("/api/v1/user/login")
          .send(loginDetails);

        expect(result.body.error).toBe("Authentication failed");
      });

      it("should throw a 401 error if email and/or password is missing or incorrect", async () => {
        const newUser = new User({
          firstName: chance.first(),
          lastName: chance.last(),
          email: chance.email(),
          password: "3hd56$%hs!45",
        });

        await request(app).post("/api/v1/user/signup").send(newUser);

        const loginDetails = {
          email: chance.email(),
          password: 12345,
        };

        const result = await request(app)
          .post("/api/v1/user/login")
          .send(loginDetails);

        expect(result.statusCode).toBe(401);
        expect(result.body.error).toBe("Authentication failed");
      });
    });
  });
});
