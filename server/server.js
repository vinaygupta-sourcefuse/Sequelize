const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;
const sequelize = require("./config/database");
const Book = require("./models/Book");
const Author = require("./models/Author");
const Category = require("./models/Category");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Logging Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});


// GET all data related to books
app.get("/api/books", async (req, res) => {
    try {
        const books = await Book.findAll({
            include: [
                { model: Author, attributes: ["author_id", "author"] },
                { model: Category, attributes: ["category_id", "genre"] },
            ],
            raw: true, // Flatten the response
            nest: true, // Keep related data under proper keys
        });
        const formattedBooks = books.map(book => ({
            author: book.Author.author,  // Move author to the top
            genre: book.Category.genre,  // Move genre to the top
            category_id: book.category_id,
            isbn: book.isbn,
            title: book.title,
            price: book.price,
            pubDate: book.pubDate,
        }));

        res.json(formattedBooks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// POST: Insert a new record
app.post("/api/books", async (req, res) => {
    try {
        const { author, title, isbn, price, pubDate, genre } = req.body;

        // Check if author exists, else create it
        let [authorRecord] = await Author.findOrCreate({ where: { author } });

        // Check if category exists, else create it
        let [categoryRecord] = await Category.findOrCreate({ where: { genre } });

        // Create a new book
        const book = await Book.create({
            title,
            isbn,
            price,
            pubDate,
            author_id: authorRecord.author_id,
            category_id: categoryRecord.category_id,
        });

        res.status(201).json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// DELETE: Remove a record by ID
app.delete("/api/books/:isbn", async (req, res) => {
    try {
        const { isbn } = req.params;
        const book = await Book.findByPk(isbn);

        if (!book) return res.status(404).json({ error: "Book not found" });

        await book.destroy();
        res.json({ message: "Deleted successfully", deletedBook: book });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



sequelize.sync()
    .then(() => console.log("Database synchronized"))
    .catch((err) => console.error("Error syncing database:", err));

app.listen(3000, () => console.log("Server running on port 3000"));