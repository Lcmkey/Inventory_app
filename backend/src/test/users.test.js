const supertest = require("supertest");

const app = require("@services/app");

describe("GET /api/v1/users", () => {
  it("should respond with an array of users", async () => {
    const response = await supertest(app)
      .get("/api/v1/users")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should respond with user", async () => {
    const response = await supertest(app)
      .get("/api/v1/users/1")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.id).toBe(1);
  });

  it("should respond with no user", async () => {
    const response = await supertest(app)
      .get("/api/v1/users/999")
      .expect("Content-Type", /json/)
      .expect(404);
  });
});
