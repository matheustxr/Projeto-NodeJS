const { Router } = require("express");

const usersRouters = require("./users.routes.js");
const notesRouters = require("./notes.routes.js");
const tagsRouters = require("./tags.routes.js");
const sessionsRouters = require("./sessions.routes.js");

const routes = Router();
routes.use("/users",  usersRouters);
routes.use("/notes",  notesRouters);
routes.use("/tags",  tagsRouters);
routes.use("/sessions",  sessionsRouters);

module.exports = routes