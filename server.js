const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const mongourl = "mongodb+srv://shailesh:d2Ps0UQEnEcmUUkM@cluster0.b5xkmr9.mongodb.net/books?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

const bookSchema = new mongoose.Schema({
    title: String,
    author: String
});

const Book = mongoose.model('Book', bookSchema);

// to get all the books 
app.get("/books", async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// to get a specific book based on their id
app.get("/books/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).send("Book not found");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// to add a new book
app.post("/books/addbook", async (req, res) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(201).send("New book added");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// to delete a book
app.delete("/books/deletebook/:id", async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (book) {
            res.send(`Book with ID: ${req.params.id} has been removed.`);
        } else {
            res.status(404).send("No such book found in the directory");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
