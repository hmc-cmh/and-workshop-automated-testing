const Todo = require("../models/todo");

module.exports = async (req, res, next) => {
  await Todo.find()
    .then(data => res.json(data))
    .catch(next);
};
