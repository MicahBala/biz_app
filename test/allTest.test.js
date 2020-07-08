const app = require("../app");
const request = require("supertest");
const { Business } = require("../models/business");
process.env.NODE_ENV = "test";

describe("Start Server and Connect to MongoDb databse", () => {
  beforeAll(() => {
    jest.setTimeout(60000);
  });
  afterEach(async () => {
    // Delete documents from collections
    await Business.collection.deleteMany({});
  });

  describe("Route /api/v1/biz", () => {
    describe("GET all businesses", () => {
      it("should return all businesses", async () => {
        Business.collection.insertMany([
          {
            name: "Kontract Metals",
            address: "Kaduna",
            phone: "08932456123",
            addedOn: Date.now(),
          },
          {
            name: "Fresh Cosmetics",
            address: "Kafanchan",
            phone: "08932456123",
            addedOn: Date.now(),
          },
        ]);

        const result = await request(app).get("/api/v1/biz");
        expect(result.statusCode).toBe(200);
        expect(result.body.length).toBe(2);
        expect(
          result.body.some((biz) => biz.name === "Fresh Cosmetics")
        ).toBeTruthy();
        expect(
          result.body.some((biz) => biz.name === "Kontract Metals")
        ).toBeTruthy();
      });
    });

    describe("GET a single business", () => {
      it("should return a single business if valid ID is passed", async () => {
        let newBiz = new Business({
          name: "Kontract Metals",
          address: "Kaduna",
          phone: "08932456123",
          addedOn: Date.now(),
        });

        newBiz = await newBiz.save();

        const result = await request(app).get(`/api/v1/biz/${newBiz._id}`);

        expect(result.statusCode).toBe(200);
        expect(result.body).toHaveProperty("name", newBiz.name);
        expect(result.body).toHaveProperty("address", newBiz.address);
        expect(result.body).toHaveProperty("phone", newBiz.phone);
      });

      it("should return 404 if an INVALID ID is passed", async () => {
        const result = await request(app).get("/api/v1/biz/1");

        expect(result.body.error).toBe("Invalid ID");
      });
    });

    describe("POST a new business", () => {
      it("should add a new business to database", async () => {
        const newBusiness = {
          name: "Kontract Metals",
          address: "Kaduna",
          phone: "08932456123",
          addedOn: Date.now(),
        };
        const result = await request(app).post("/api/v1/biz").send(newBusiness);

        expect(result.statusCode).toBe(201);
        expect(result.body).toHaveProperty("name", result.name);
        expect(result.body).toHaveProperty("address", result.address);
        expect(result.body).toHaveProperty("phone", result.phone);
      });

      it("should return 400 if body of request is INVALID", async () => {
        const result = await request(app).post("/api/v1/biz").send({});

        expect(result.statusCode).toBe(400);
      });
    });

    describe("PUT update a business", () => {
      it("should update a single business if a valid ID is passed", async () => {
        let newBiz = new Business({
          name: "Kontract Metals",
          address: "Kaduna",
          phone: "08932456123",
          addedOn: Date.now(),
        });

        newBiz = await newBiz.save();

        const updatedBiz = {
          name: "Kontract",
          address: "Kaduna",
          phone: "08932456123",
          addedOn: Date.now(),
        };

        const result = await request(app)
          .put(`/api/v1/biz/${newBiz._id}`)
          .send(updatedBiz);

        expect(result.statusCode).toBe(200);
        expect(result.body.data).toHaveProperty("name", updatedBiz.name);
        expect(result.body.data).toHaveProperty("address", updatedBiz.address);
        expect(result.body.data).toHaveProperty("phone", updatedBiz.phone);
      });

      it("should return 404 if an INVALID ID is passed", async () => {
        let newBiz = new Business({
          name: "Kontract Metals",
          address: "Kaduna",
          phone: "08932456123",
          addedOn: Date.now(),
        });

        newBiz = await newBiz.save();

        const updatedBiz = {
          name: "Kontract",
          address: "Kaduna",
          phone: "08932456123",
          addedOn: Date.now(),
        };

        const result = await request(app).put("/api/v1/biz/1").send(updatedBiz);

        expect(result.body.error).toBe("Invalid ID");
      });
    });

    describe("DELETE a business", () => {
      it("should delete a single business if a valid ID is passed", async () => {
        let newBiz = new Business({
          name: "Kontract Metals",
          address: "Kaduna",
          phone: "08932456123",
          addedOn: Date.now(),
        });

        newBiz = await newBiz.save();

        const result = await request(app).delete(`/api/v1/biz/${newBiz._id}`);

        expect(result.statusCode).toBe(200);

        const findBiz = await Business.findById({ _id: newBiz._id });
        expect(findBiz).toBe(null);
      });

      it("should return 404 if an INVALID ID is passed", async () => {
        const result = await request(app).delete("/api/v1/biz/1");

        expect(result.body.error).toBe("Invalid ID");
      });
    });
  });
});
