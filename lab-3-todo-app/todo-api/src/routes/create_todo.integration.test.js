const request = require("supertest");
const server = require("../server");
const Todo = require("../models/todo");

describe("Create Todo", () => {
  beforeEach(async () => {
    console.log("Deleting test database");
    await Todo.deleteMany();
  });

  afterEach(async () => {
    await Todo.deleteMany();
  });

  it("Gives an error message with a bad post request", async () => {
    await request(server)
      .post("/todos")
      .send("tfknlgj")
      .expect({
        code: "400",
        errors: [{ location: "body", param: "text", msg: "must be provided" }]
      });
  });

  it("Posts to the database with a valid request", async () => {
    await request(server)
      .post("/todos")
      .send({ text: "Sorry tests" })
      .expect(200) //supertest
      .then(response => {
        expect(response.body).toMatchObject({
          //jest
          completed: false,
          id: expect.anything()
        });
      });
  });
});
