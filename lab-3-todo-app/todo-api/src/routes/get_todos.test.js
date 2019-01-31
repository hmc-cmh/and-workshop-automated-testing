const getToDo = require("./get_todos");
const toDoMock = require("../models/todo");

describe("Get To Dos", () => {
  let mockNext = jest.fn();
  const mockJson = jest.fn();
  let req = {};
  let res = { json: mockJson };

  beforeEach(() => {
    mockNext.mockClear();
    mockJson.mockClear();
  });

  it("Returns data when find method is called", async () => {
    jest
      .spyOn(toDoMock, "find")
      .mockReturnValue(Promise.resolve({ data: "data" }));

    await getToDo(req, res, mockNext);

    expect(mockNext).not.toHaveBeenCalled();
    expect(mockJson).toHaveBeenCalledTimes(1);
    expect(mockJson).toHaveBeenCalledWith({ data: "data" });
  });

  it("Fails if there is an error", async () => {
    jest.spyOn(toDoMock, "find").mockReturnValue(Promise.reject(mockNext));

    await getToDo(req, res, mockNext);
    expect(mockJson).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledTimes(1);
  });
});
