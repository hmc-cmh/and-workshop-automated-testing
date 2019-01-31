const request = require("supertest");
const server = require("../server");

describe("Health check", () => {
  it("sends a status message", async () => {
    await request(server)
      .get("/health")
      .expect({ status: "UP" });
  });
});
