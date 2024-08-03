const { Router } = require("express");

const UsersController = require("../controllers/usersController");
const ensureAuthenticared = require("../middlewares/ensureAuthenticared");

const usersRouters = Router();

const usersController = new UsersController();

usersRouters.post("/", usersController.create);
usersRouters.put("/", ensureAuthenticared, usersController.update);

module.exports = usersRouters