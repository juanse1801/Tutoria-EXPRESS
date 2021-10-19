const express = require("express");
const server = express();
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes/index");

//MIDDLEWARES
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "authorization",
    ],
  })
);

//ROUTES
server.use("/", routes);

server.listen(3000, () => console.log("listen on port 3000"));
