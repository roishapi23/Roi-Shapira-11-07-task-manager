const express = require("express");
let tasksController = require("./controllers/tasks-controller")

const server = express();

const port = process.env.PORT || 3001;
const cors = require('cors');

server.use(cors())
server.listen(port, () => console.log('Server started on port' + port));

server.use(express.json());

server.use("/tasks", tasksController);
