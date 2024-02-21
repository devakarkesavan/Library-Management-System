require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");


// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Create a book
app.post("/Book", async (req, res) => {
    try {
        const { title, author, sub, pub_date } = req.body;
        const newBook = await pool.query(
            "INSERT INTO Book (title, author, sub, pub_date) VALUES($1, $2, $3, $4) RETURNING *",
            [title, author, sub, pub_date]
        );
        res.json(newBook.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Get all books
app.get("/Book", async (req, res) => {
    try {
        const allBooks = await pool.query("SELECT * FROM Book");
        res.json(allBooks.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Get a book
app.get("/Book/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await pool.query("SELECT * FROM Book WHERE id = $1", [id]);
        res.json(book.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Update a book
app.put("/Book/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, sub, pub_date } = req.body;
        const updateBook = await pool.query(
            "UPDATE Book SET title = $1, author = $2, sub = $3, pub_date = $4 WHERE id = $5",
            [title, author, sub, pub_date, id]
        );
        res.json("Book was updated");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Delete a book
app.delete("/Book/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteBook = await pool.query("DELETE FROM Book WHERE id = $1", [id]);
        res.json("Book was deleted");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
    console.log(`Server started running on port ${PORT}`);
});
