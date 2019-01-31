const { validationResult } = require("express-validator/check");
const errorFormatter = require("../validators/error_formatter");
const Todo = require("../models/todo");

const error404 = {
  code: "404",
  message: "Not Found"
};

module.exports = async (req, res) => {
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      code: "400",
      errors: errors.array({ onlyFirstError: true })
    });
  }

  await Todo.findByIdAndUpdate(req.params.id, req.body)
    .then(data =>
      data ? res.status(204).send() : res.status(404).json(error404)
    )
    .catch(() => {
      res.status(404).json(error404);
    });
};
