const express = require("express");
const app = express();
app.use(express.json());

const books = [
    {
      "id": 1,
      "title": "1984",
      "author": "George Orwell"
    },
    {
      "id": 2,
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee"
    },
    {
      "id": 3,
      "title": "Pride and Prejudice",
      "author": "Jane Austen"
    },
    {
      "id": 4,
      "title": "The Girl with the Dragon Tattoo",
      "author": "Stieg Larsson"
    },
    {
      "id": 5,
      "title": "Gone Girl",
      "author": "Gillian Flynn"
    },
    {
      "id": 6,
      "title": "The Name of the Wind",
      "author": "Patrick Rothfuss"
    }
];

// to get all the books 
app.get("/books", (req, res) => {
    res.json(books);
})

// to get some specific books based on their id no.
app.get("/books/:id", (req, res) => {
    const bookID = req.params.id - 1;
    const book = books[bookID];
    if(book)
        res.json(book);
    else 
        res.status(404).send("book not found");
})

// to add some books
app.post("/books/addbook", (req, res) => {
    const newBook = req.body;
    newBook.id = books[books.length - 1].id + 1;
    books.push(newBook);
    res.status(201).send("new book added");
})

// to delete any book from the books
app.delete("/books/deletebook/:id", (req, res) => {
    const bookID = parseInt(req.params.id);
    const bookIndex = books.findIndex(books => books.id === bookID);
    if (bookIndex != -1) {
        books.splice(bookIndex, 1);
        res.send(`Book with ID: ${bookID} has been removed.`);
    } else {
        res.status(404).send("No such book found in the directory");
    }
});

app.listen(8080);