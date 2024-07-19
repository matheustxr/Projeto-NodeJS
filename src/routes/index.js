const { Router } = require("express");

const usersRouters = require("./users.routes.js");

const routes = Router();
routes.use("/users",  usersRouters);

module.exports = routes