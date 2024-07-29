const { Router } = require("express");

const UsersController = require("../controllers/usersController");

const usersRouters = Router();

const usersController = new UsersController();

usersRouters.post("/", usersController.create);
usersRouters.put("/:id", usersController.update);

module.exports = usersRouters