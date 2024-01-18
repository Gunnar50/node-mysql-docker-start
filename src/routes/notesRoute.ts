import express from "express";
import {
	createNote,
	createTestNote,
	deleteNote,
	getNotes,
	getSingleNote,
	updateNote,
} from "../controllers/notesController";

const notesRouter = express.Router();

// create a test note
notesRouter.get("/test-note", createTestNote);

// get all notes
notesRouter.get("/", getNotes);
notesRouter.get("/:noteId", getSingleNote);
notesRouter.post("/", createNote);
notesRouter.delete("/:noteId", deleteNote);
notesRouter.put("/:noteId", updateNote);

export default notesRouter;
