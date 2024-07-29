const { Router } = require("express");

const NotesController = require("../controllers/notesController");

const notesRouters = Router();

const notesController = new NotesController();

notesRouters.get("/", notesController.index);
notesRouters.get("/:id", notesController.show);
notesRouters.post("/:user_id", notesController.create);
notesRouters.delete("/:id", notesController.delete);

module.exports = notesRouters;