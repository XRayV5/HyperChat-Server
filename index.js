const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");
require("./util");
const routerAPI = require("./routerAPI");
const routerSIO = require("./routerSIO");

mongoose.connect(config.dbStr);

const app = express();
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));
const server = http.createServer(app);
const port = process.env.PORT || 3090;
server.listen(port);
console.log("Server listening on: ", port);
routerAPI(app);
routerSIO(server);
