import dotenv from "dotenv";
import express from "express";
import mysql from "mysql";
dotenv.config();

const app = express();
app.use(express.json());

// MySQL connection
const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
});

// test connection
connection.connect((error) => {
	if (error) throw error;
	console.log("Successfully connected to the database.");
});

// routes
// simple route
app.get("/", (_, res) => {
	res.send("Hello World!!!!!!!!!!!");
});
// get all notes
app.get("/notes", (_, res) => {
	connection.query("SELECT * FROM notes", (error, results) => {
		if (error) throw error;
		res.json(results);
	});
});

// get single note
app.get("/notes/:id", (req, res) => {
	const id = req.params.id;
	connection.query("SELECT * FROM notes WHERE id = ?", id, (error, result) => {
		if (error) throw error;
		res.json(result);
	});
});

// create
app.post("/notes", (req, res) => {
	const note = req.body;
	connection.query("INSERT INTO notes SET ?", note, (error, result) => {
		if (error) throw error;
		res.status(201).send(`Note created with ID: ${result.insertId}`);
	});
});

// update
app.put("/notes/:id", (req, res) => {
	const id = req.params.id;
	const note = req.body;
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
app.delete("/notes/:id", (req, res) => {
	const id = req.params.id;
	connection.query("DELETE FROM notes WHERE id = ?", id, (error, result) => {
		if (error) throw error;
		res.send("Note deleted successfully.");
	});
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

export default app;
