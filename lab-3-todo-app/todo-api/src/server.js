const express = require("express")();
const bodyParser = require("body-parser").json();
const cors = require("cors")();
const pino = require("express-pino-logger")();
const swaggerUi = require("swagger-ui-express");
const mongoose = require("mongoose");
const swaggerDocument = require("./swagger.json");

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/todos";
mongoose.connect(mongoURI, { useNewUrlParser: true });

express
  .use(bodyParser)
  .use(cors)
  .use(pino)
  .use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .get("/todos", require("./routes/get_todos"))
  .post(
    "/todos",
    require("./validators/create_todo"),
    require("./routes/create_todo")
  )
  .put(
    "/todos/:id",
    require("./validators/update_todo"),
    require("./routes/update_todo")
  )
  .delete("/todos/:id", require("./routes/delete_todo"))
  .get("/health", require("./routes/health_check"))
  .use((req, res) => {
    res.status(404).json({ code: "404", message: "Not Found" });
  });

module.exports = express;
