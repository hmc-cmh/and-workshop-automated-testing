const Todo = require("../models/todo");

const error404 = {
  code: "404",
  message: "Not Found"
};

module.exports = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id)
    .then(data =>
      data ? res.status(204).send() : res.status(404).json(error404)
    )
    .catch(() => {
      res.status(404).json(error404);
    });
};
