const createToDo = require("./create_todo");
const toDoMock = require("../models/todo");
const validator = require("express-validator/check");

describe("Create To Do", () => {
  let mockJsonMethod = jest.fn();
  let mockNextMethod = jest.fn();
  let mockStatusMethod = jest.fn();
  let req = {};
  let res = {
    json: mockJsonMethod,
    status: mockStatusMethod.mockReturnValue({ json: mockJsonMethod })
  };

  beforeEach(() => {
    mockNextMethod.mockClear();
    mockJsonMethod.mockClear();
  });

  it("It calls validation result to check for error", async () => {
    let errors = {
      isEmpty: () => true
    };
    jest.spyOn(validator, "validationResult").mockImplementation(() => errors);

    await createToDo(req, res, mockNextMethod);
    expect(validator.validationResult).toHaveBeenCalled();
    expect(validator.validationResult).toHaveBeenCalledWith(req);
    expect(mockNextMethod).not.toHaveBeenCalled();
  });
  it("Calls res.json with data", async () => {
    jest
      .spyOn(toDoMock, "create")
      .mockReturnValue(Promise.resolve({ data: "data" }));

    await createToDo(req, res, mockNextMethod);
    expect(res.json).toHaveBeenCalledWith({ data: "data" });
  });

  it("Fails and calls the catch method", async () => {
    jest
      .spyOn(toDoMock, "create")
      .mockReturnValue(Promise.reject(mockNextMethod));

    await createToDo(req, res, mockNextMethod);
    expect(mockJsonMethod).not.toHaveBeenCalled();
    expect(mockNextMethod).toHaveBeenCalledTimes(1);
  });

  it("Calls res.status.json when isEmpty is false", async () => {
    let error = {
      isEmpty: () => false,
      array: () => ["error"]
    };
    jest.spyOn(validator, "validationResult").mockImplementation(() => error);

    await createToDo(req, res, mockNextMethod);

    expect(mockStatusMethod).toHaveBeenCalled();
    expect(mockStatusMethod).toHaveBeenCalledWith(400);
    expect(mockJsonMethod).toHaveBeenCalledWith({
      code: "400",
      errors: ["error"]
    });
  });
});
