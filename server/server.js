const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "vinay",
    password: "password",
    database: "bms"
});

connection.connect(err => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to MySQL database.");
});

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Logging Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});


// GET all data related to books
app.get("/api/books", (req, res) => {
    connection.query(`
        select * from Author as a, Category as c, Book as b where  a.author_id = b.author_id and c.category_id = b.category_id;
    `, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        console.log('get request result',results);
        res.json(results);
    });
});



// POST: Insert a new record
app.post("/api/books", (req, res) => {
    const newData = req.body;
    const { author, title, isbn, price, pubDate, genre } = newData;

    // Check if the author already exists; if not, insert it
    connection.query(`SELECT author_id FROM Author WHERE author = ?`, [author], (err, authorResults) => {
        if (err) return res.status(500).json({ error: err.message });

        if (authorResults.length > 0) {
            // Author exists, use the existing ID
            insertCategoryAndBook(authorResults[0].author_id);
        } else {
            // Insert new author
            connection.query(`INSERT INTO Author (author) VALUES (?)`, [author], (err, authorInsertResults) => {
                if (err) return res.status(500).json({ error: err.message });
                insertCategoryAndBook(authorInsertResults.insertId);
            });
        }
    });

    function insertCategoryAndBook(author_id) {
        // Check if the category (genre) exists; if not, insert it
        connection.query(`SELECT category_id FROM Category WHERE genre = ?`, [genre], (err, categoryResults) => {
            if (err) return res.status(500).json({ error: err.message });

            if (categoryResults.length > 0) {
                // Genre exists, use the existing category_id
                insertBook(author_id, categoryResults[0].category_id);
            } else {
                // Insert new genre
                connection.query(`INSERT INTO Category (genre) VALUES (?)`, [genre], (err, categoryInsertResults) => {
                    if (err) return res.status(500).json({ error: err.message });
                    insertBook(author_id, categoryInsertResults.insertId);
                });
            }
        });
    }

    function insertBook(author_id, category_id) {
        // Insert book with foreign keys
        connection.query(
            `INSERT INTO Book (title, isbn, price, pubDate, author_id, category_id) VALUES (?, ?, ?, ?, ?, ?)`, 
            [title, isbn, price, pubDate, author_id, category_id], 
            (err, bookResults) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ id: bookResults.insertId, ...newData });
            }
        );
    }
});


// DELETE: Remove a record by ID
app.delete("/api/books/:isbn", (req, res) => {
    const isbn = req.params.isbn;

    // Check if the book exists before deletion
    connection.query(`SELECT * FROM Book WHERE isbn = ?`, [isbn], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "Book not found" });

        // Delete the book
        connection.query(`DELETE FROM Book WHERE isbn = ?`, [isbn], (err, deleteResults) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Deleted successfully", deletedBook: results[0] });
        });
    });
});



// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});