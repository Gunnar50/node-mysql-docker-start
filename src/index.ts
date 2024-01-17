import dotenv from "dotenv";
import express, { Request, Response } from "express";
import mysql from "mysql";
dotenv.config();

const app = express();
app.use(express.json());

interface Note {
	id?: number;
	title: string;
	body: string;
}

// MySQL connection
const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
});

// test connection
connection.connect((error: mysql.MysqlError) => {
	if (error) throw error;
	console.log("Successfully connected to the database.");
});

// routes
// simple route
app.get("/", (_: Request, res: Response) => {
	res.send("Hello World!!!!!!!!!!!");
});

// get all notes
app.get("/notes", (_: Request, res: Response) => {
	connection.query("SELECT * FROM notes", (error, results) => {
		if (error) throw error;
		res.json(results);
	});
});

// get single note
app.get("/notes/:id", (req: Request, res: Response) => {
	const id: string = req.params.id;
	connection.query("SELECT * FROM notes WHERE id = ?", id, (error, result) => {
		if (error) throw error;
		res.json(result);
	});
});

// create
app.post("/notes", (req: Request, res: Response) => {
	const note: Note = req.body;
	connection.query("INSERT INTO notes SET ?", note, (error, result) => {
		if (error) throw error;
		res.status(201).send(`Note created with ID: ${result.insertId}`);
	});
});

// update
app.put("/notes/:id", (req: Request, res: Response) => {
	const id: string = req.params.id;
	const note: Note = req.body;
	connection.query(
		"UPDATE notes SET ? WHERE id = ?",
		[note, id],
		(error, result) => {
			if (error) throw error;
			res.send("Note updated successfully.");
		}
	);
});

// delete
app.delete("/notes/:id", (req: Request, res: Response) => {
	const id: string = req.params.id;
	connection.query("DELETE FROM notes WHERE id = ?", id, (error, result) => {
		if (error) throw error;
		res.send("Note deleted successfully.");
	});
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
