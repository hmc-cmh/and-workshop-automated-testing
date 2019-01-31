const healthCheck = require("./health_check");

describe("Health Check", () => {
  it("Sends the correct data with res.send", () => {
    const res = {
      send: jest.fn()
    };
    const req = {};
    healthCheck(req, res);
    expect(res.send).toHaveBeenCalledWith({ status: "UP" });
  });
});
