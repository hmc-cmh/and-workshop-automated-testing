const request = require("supertest");
const server = require("../server");
const Todo = require("../models/todo");

describe("Get Todos API", () => {
  beforeEach(async () => {
    console.log("Deleting test database");
    await Todo.deleteMany();
  });

  afterEach(async () => {
    await Todo.deleteMany();
  });

  it("Returns 404 when invalid URL", async () => {
    await request(server)
      .get("/404")
      .expect(404, { code: "404", message: "Not Found" });
  });

  it("Returns empty list", async () => {
    await request(server)
      .get("/todos")
      .expect(200, []);
  });

  it("Returns correct data when there is something in the db", async () => {
    await Todo.create({ text: "Hello" });
    await request(server)
      .get("/todos")
      .then(response => {
        expect(response.body).toEqual([
          {
            text: "Hello",
            completed: false,
            id: expect.anything()
          }
        ]);
      });
  });
});
