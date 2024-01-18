import { Request, Response } from "express";
import { Query } from "../../mysql/connection";
import { Note } from "../../mysql/queries/notesQueries";
import { HTTP_STATUS } from "../utils/httpStatus";
import { tryPromise } from "../utils/inlineHandler";

export async function getNotes(_: Request, res: Response) {
	const { data, error } = await tryPromise(Query("SELECT * FROM notes"));
	if (error) {
		return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
			message: "Something went wrong fetchin the data. Please try again.",
		});
	}

	return res.status(HTTP_STATUS.OK).send(data);
}

export async function getSingleNote(req: Request, res: Response) {
	const { noteId } = req.params;

	const { data, error } = await tryPromise(
		Query("SELECT * FROM notes WHERE id = ?", [noteId])
	);
	if (error) {
		return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
			message: "Something went wrong fetchin the data. Please try again.",
		});
	}

	return res.status(HTTP_STATUS.OK).send(data);
}

export async function createTestNote(_: Request, res: Response) {
	const { title, body }: Note = {
		title: "Test Note",
		body: "This is a test note",
	};

	const { data, error } = await tryPromise(
		Query("INSERT INTO notes (title, body) VALUES (?, ?)", [title, body])
	);
	if (error) {
		return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
			message: "Something went wrong. Please try again.",
		});
	}

	return res
		.status(HTTP_STATUS.CREATED)
		.send(`Note created with ID: ${data.insertId}`);
}

export async function createNote(req: Request, res: Response) {
	const { title, body }: Note = req.body;

	const { data, error } = await tryPromise(
		Query("INSERT INTO notes (title, body) VALUES (?, ?)", [title, body])
	);

	if (error) {
		return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
			message: "Something went wrong when creating a note. Please try again.",
		});
	}

	return res
		.status(HTTP_STATUS.CREATED)
		.send(`Note created with ID: ${data.insertId}`);
}

export async function deleteNote(req: Request, res: Response) {
	const { noteId } = req.params;

	const { data, error } = await tryPromise(
		Query("DELETE FROM notes WHERE id = ?", [noteId])
	);

	if (error) {
		return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
			message: "Something went wrong when deleting a note. Please try again.",
		});
	}

	if (!data.affectedRows) {
		return res.status(HTTP_STATUS.NOT_FOUND).send({
			message: "Note not found",
		});
	}

	return res.status(HTTP_STATUS.CREATED).send("Note deleted successfully");
}

export async function updateNote(req: Request, res: Response) {
	const { noteId } = req.params;

	const { title, body }: Note = req.body;

	const { data, error } = await tryPromise(
		Query("UPDATE notes SET title = ?, body = ? WHERE id = ?", [
			title,
			body,
			noteId,
		])
	);

	if (error) {
		return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
			message: "Something went wrong when updating a note. Please try again.",
		});
	}

	if (!data.affectedRows) {
		return res.status(HTTP_STATUS.NOT_FOUND).send({
			message: "Note not found",
		});
	}

	return res.status(HTTP_STATUS.OK).send("Note updated successfully");
}
