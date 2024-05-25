const mongoose = require("mongoose");
const books = require("../books.js");

const mongoUrl = "mongodb+srv://shailesh:d2Ps0UQEnEcmUUkM@cluster0.b5xkmr9.mongodb.net/books?retryWrites=true&w=majority&appName=Cluster0";

async function main() {
  await mongoose.connect(mongoUrl);
}
main()
  .then(() => console.log(`Connected to Database`))
  .catch((err) => console.error("Error connecting to database", err));


const bookSchema = new mongoose.Schema({
    title: String,
    author: String
});
const book = mongoose.model('Book', bookSchema);

const initDb = async () => {
  try {
    await book.deleteMany({});
    await book.insertMany(books.books);
  }
  catch(err) {
    console.log(err);
  }
};
initDb();
