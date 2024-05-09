const Books = require("../Models/bookModel");
const mongoose = require("mongoose");

// get all Books
const getBooks = async (req, res) => {
  const books = await Books.find({}).sort({ createdAt: -1 });
  res.status(200).json(books);
};

// get a single Book

const getBook = async (req, res) => {
  const { title } = req.params; 
  try {
    const book = await Books.findOne({
      title: { $regex: new RegExp(title, "i") },
    });

    if (!book) {
      return res.status(404).json({ error: "No such book" });
    }

    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// add book
const addBook = async (req, res) => {
  const { title, author, genre, available ,image } = req.body;

  // adding Book to db
  try {
    const book = await Books.create({ title, author, genre, available ,image });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// delete book
const removeBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such book" });
  }
  const book = await Books.findByIdAndDelete({ _id: id });

  if (!book) {
    res.status(404).json({ error: "No such book" });
  }
  res.status(200).json(book);
};
//update book record

const updateBook = async (req, res) => {
  const { title } = req.params;
  const { updateType } = req.body;

  try {
    let detail;

    if (updateType === "increment") {
      detail = await Books.findOneAndUpdate(
        { title },
        { $inc: { available: 1 } },
        { new: true }
      );
    } else if (updateType === "decrement") {
      detail = await Books.findOneAndUpdate(
        { title },
        { $inc: { available: -1 } },
        { new: true }
      );
    } else {
      const { available } = req.body;
      const updateValue = Number(available);

      if (isNaN(updateValue)) {
        return res.status(400).json({ error: "Invalid update value" });
      }

      detail = await Books.findOneAndUpdate(
        { title },
        { available: updateValue },
        { new: true }
      );
    }

    if (!detail) {
      return res.status(404).json({ error: "No such record" });
    }

    return res.status(200).json(detail);
  } catch (error) {
    console.error("Error updating book:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addBook,
  getBooks,
  getBook,
  removeBook,
  updateBook,
};
