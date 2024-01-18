import dotenv from "dotenv";
import express, { Request, Response } from "express";
import mysql from "mysql";
import {
	Note,
	createNote,
	deleteNote,
	getNoteById,
	getNotes,
	updateNote,
} from "../mysql/queries/notesQueries";
import notesRouter from "./routes/notesRoute";
dotenv.config();

const app = express();
app.use(express.json());

// MySQL connection
// const connection = mysql.createConnection({
// 	host: process.env.DB_HOST,
// 	user: process.env.DB_USER,
// 	password: process.env.DB_PASSWORD,
// 	database: process.env.DB_DATABASE,
// });

// // test connection
// connection.connect((error: mysql.MysqlError) => {
// 	if (error) throw error;
// 	console.log("Successfully connected to the database.");
// });

// routes
// simple route for testing
app.get("/", (_: Request, res: Response) => {
	res.send("Hello World!");
});

// get single note
// app.get("/notes/:id", (req: Request, res: Response) => {
// 	const id: string = req.params.id;
// 	connection.query("SELECT * FROM notes WHERE id = ?", id, (error, result) => {
// 		if (error) throw error;
// 		res.json(result);
// 	});
// });

// create
// app.post("/notes", (req: Request, res: Response) => {
// 	const note: Note = req.body;
// 	connection.query("INSERT INTO notes SET ?", note, (error, result) => {
// 		if (error) throw error;
// 		res.status(201).send(`Note created with ID: ${result.insertId}`);
// 	});
// });

// // update
// app.put("/notes/:id", (req: Request, res: Response) => {
// 	const id: string = req.params.id;
// 	const note: Note = req.body;
// 	connection.query(
// 		"UPDATE notes SET ? WHERE id = ?",
// 		[note, id],
// 		(error, result) => {
// 			if (error) throw error;
// 			res.send("Note updated successfully.");
// 		}
// 	);
// });

// // delete
// app.delete("/notes/:id", (req: Request, res: Response) => {
// 	const id: string = req.params.id;
// 	connection.query("DELETE FROM notes WHERE id = ?", id, (error, result) => {
// 		if (error) throw error;
// 		res.send("Note deleted successfully.");
// 	});
// });

app.use("/notes", notesRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
