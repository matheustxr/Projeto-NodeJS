const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const UsersController = require("../controllers/usersController");
const UserAvatarController = require("../controllers/userAvatarController");
const ensureAuthenticared = require("../middlewares/ensureAuthenticared");

const usersRouters = Router();
const upload = multer(uploadConfig.MULTER);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouters.post("/", usersController.create);
usersRouters.put("/", ensureAuthenticared, usersController.update);
usersRouters.patch("/avatar", ensureAuthenticared, upload.single("avatar"), userAvatarController.update);

module.exports = usersRouters