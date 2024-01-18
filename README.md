# Express + MySQL + TypeScript + Docker

## 🔧 Installation and Setup

Clone the repository

```
git clone https://github.com/Gunnar50/node-mysql-docker-start.git
```

Navigate to the project directory

```
cd node-mysql-docker-start
```

Start the Docker container

```
docker-compose up
```

Should see the following message on the console

```
Server is running on port 3000
Successfully connected to the database
```

If you do not see this message, try CTRL+C and run the docker command again

API is running on

```
http://localhost:3000
```

### Available routes

```
GET    /notes        		get all notes
GET    /notes/:id    		get a single note by id
GET    /notes/test-note    creates a test note with title and body set up
POST   /notes        		creates a new note (request = {title: "title", body: "note"})
PUT    /notes/:id    		updates a note by id (request = {title: "title", body: "note"})
DELETE /notes/:id    		deletes a note by id
```

## 🛠️Technology Stack

**Back end:**

- Node
- Express
- MySQL
- Docker

## ⭐️ Show your support

Give a start if you liked and this project helped you!

## 📝 License

This project is open source and available under the MIT License.
