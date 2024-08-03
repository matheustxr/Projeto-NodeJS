const { Router } = require("express");

const NotesController = require("../controllers/notesController");
const ensureAuthenticared = require("../middlewares/ensureAuthenticared");

const notesRouters = Router();

const notesController = new NotesController();

notesRouters.use(ensureAuthenticared);

notesRouters.post("/", notesController.create);
notesRouters.get("/:id", notesController.show);
notesRouters.delete("/:id", notesController.delete);
notesRouters.get("/", notesController.index);

module.exports = notesRouters;