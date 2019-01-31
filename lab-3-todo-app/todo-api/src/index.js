require("dotenv").config();
const logger = require("pino")();
const server = require("./server");

const env = process.env.NODE_ENV || "development";
server.listen(8080, () => {
  logger.info(`Running service on port 8080 using NODE_ENV: ${env}`);
});
