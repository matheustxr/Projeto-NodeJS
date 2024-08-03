const { Router } = require("express");

const TagsController = require("../controllers/tagsController");
const ensureAuthenticared = require("../middlewares/ensureAuthenticared");

const tagsRoutes = Router();

const tagsController = new TagsController();

tagsRoutes.get("/", ensureAuthenticared, tagsController.index);

module.exports = tagsRoutes;