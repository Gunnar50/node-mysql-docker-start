import mysql, { MysqlError, Query } from "mysql";

export interface QueryResult {
	insertId?: number;
	affectedRows?: number;
}

const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
});

connection.connect((error: mysql.MysqlError) => {
	if (error) throw error;
	console.log("Successfully connected to the database.");
});

export function Query(
	queryString: string,
	params: string[] = []
): Promise<QueryResult> {
	return new Promise((resolve, reject) => {
		connection.query(
			queryString,
			params,
			(err: MysqlError | null, results: QueryResult) => {
				if (err) {
					reject(err);
					return;
				}
				resolve(results);
			}
		);
	});
}
