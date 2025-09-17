// Import necessary modules
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const cors = require("cors");

// Initialize the Express application
const app = express();

// Define the port
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Sample route
app.get("/", (req, res) => {
  res.send("📚 Book Management System API is running...");
});

// MongoDB connection URI (set in .env file)
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const database = client.db("book_management");
    const booksCollection = database.collection("books");
    const fs = require("fs");
    const path = require("path");

    // If the collection is empty (local dev), seed it from client/public/books.json
    try {
      const existingCount = await booksCollection.countDocuments();
      if (existingCount === 0) {
        const sampleFile = path.join(
          __dirname,
          "..",
          "client",
          "public",
          "books.json"
        );
        if (fs.existsSync(sampleFile)) {
          const raw = fs.readFileSync(sampleFile, "utf8");
          const docs = JSON.parse(raw);
          if (Array.isArray(docs) && docs.length > 0) {
            const docsToInsert = docs.map((d) => ({
              ...d,
              createdAt: new Date(),
            }));
            await booksCollection.insertMany(docsToInsert);
            console.log(
              `✅ Seeded books collection with ${docsToInsert.length} documents from ${sampleFile}`
            );
          }
        }
      }
    } catch (seedErr) {
      console.error("Error seeding books collection:", seedErr);
    }

    /* -------------------------------
       🔹 Create a new book (POST)
    -------------------------------- */
    app.post("/books", async (req, res) => {
      try {
        const newBook = req.body;
        const result = await booksCollection.insertOne(newBook);
        res.status(201).json({
          message: "Book added successfully",
          insertedId: result.insertedId,
          book: newBook,
        });
      } catch (error) {
        res.status(500).json({ message: "Error adding book", error });
      }
    });

    /* -------------------------------
       🔹 Get all books (GET with filters)
    -------------------------------- */
    app.get("/books", async (req, res) => {
      const {
        limit,
        page,
        sortBy,
        genre,
        minYear,
        maxYear,
        author,
        minPrice,
        maxPrice,
        search,
        order,
      } = req.query;

      try {
        const currentPage = Math.max(1, parseInt(page) || 1);
        const parsedLimit =
          typeof limit !== "undefined" ? parseInt(limit) : undefined;
        // itemsPerPage === 0 => no limit (return all)
        const itemsPerPage = Number.isInteger(parsedLimit) ? parsedLimit : 10;
        const skip = itemsPerPage > 0 ? (currentPage - 1) * itemsPerPage : 0;

        const filterOptions = {};

        // 🔍 Search
        if (search) {
          filterOptions.$or = [
            { title: { $regex: search, $options: "i" } },
            { author: { $regex: search, $options: "i" } },
            { genre: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ];
        }

        // 📅 Year filter
        if (minYear || maxYear) {
          filterOptions.publishedYear = {};
          if (minYear) filterOptions.publishedYear.$gte = parseInt(minYear);
          if (maxYear) filterOptions.publishedYear.$lte = parseInt(maxYear);
        }

        // 💰 Price filter
        if (minPrice || maxPrice) {
          filterOptions.price = {};
          if (minPrice) filterOptions.price.$gte = parseFloat(minPrice);
          if (maxPrice) filterOptions.price.$lte = parseFloat(maxPrice);
        }

        // ✅ Genre filter
        if (genre) {
          filterOptions.genre = { $regex: genre, $options: "i" };
        }

        // ✅ Author filter
        if (author) {
          filterOptions.author = { $regex: author, $options: "i" };
        }

        // 🔽 Sorting
        const sortOrder = order === "desc" ? -1 : 1;
        const validSortFields = [
          "title",
          "author",
          "genre",
          "publishedYear",
          "price",
        ];
        const sortField = validSortFields.includes(sortBy) ? sortBy : "title";

        // 📚 Fetch books + count
        const [books, totalCount] = await Promise.all([
          booksCollection
            .find(filterOptions)
            .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(itemsPerPage > 0 ? itemsPerPage : 0)
            .toArray(),
          booksCollection.countDocuments(filterOptions),
        ]);

        res.status(200).json({
          message: "Books fetched successfully",
          count: books.length,
          books,
          totalCount,
          currentPage,
          totalPages:
            itemsPerPage > 0 ? Math.ceil(totalCount / itemsPerPage) : 1,
        });
      } catch (error) {
        res.status(500).json({ message: "Error fetching books", error });
      }
    });

    /* -------------------------------
       🔹 Get single book by ID (GET)
    -------------------------------- */
    app.get("/books/:id", async (req, res) => {
      try {
        const bookId = req.params.id;
        
        // Validate ObjectId format
        if (!ObjectId.isValid(bookId)) {
          return res.status(400).json({ message: "Invalid book ID format" });
        }
        
        const book = await booksCollection.findOne({
          _id: new ObjectId(bookId),
        });
        if (!book) {
          return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({
          message: "Book fetched successfully",
          book,
        });
      } catch (error) {
        res.status(500).json({ message: "Error fetching book", error });
      }
    });

    /* -------------------------------
       🔹 Update book by ID (PUT)
    -------------------------------- */
    app.put("/books/:id", async (req, res) => {
      try {
        const bookId = req.params.id;
        
        // Validate ObjectId format
        if (!ObjectId.isValid(bookId)) {
          return res.status(400).json({ message: "Invalid book ID format" });
        }
        
        const updatedBook = req.body;
        const result = await booksCollection.updateOne(
          { _id: new ObjectId(bookId) },
          { $set: updatedBook }
        );
        if (result.matchedCount === 0) {
          return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({
          message: "Book updated successfully",
          updatedBook,
        });
      } catch (error) {
        res.status(500).json({ message: "Error updating book", error });
      }
    });

    /* -------------------------------
       🔹 Delete book by ID (DELETE)
    -------------------------------- */
    app.delete("/books/:id", async (req, res) => {
      try {
        const bookId = req.params.id;
        
        // Validate ObjectId format
        if (!ObjectId.isValid(bookId)) {
          return res.status(400).json({ message: "Invalid book ID format" });
        }
        
        const result = await booksCollection.deleteOne({
          _id: new ObjectId(bookId),
        });
        if (result.deletedCount === 0) {
          return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: "Error deleting book", error });
      }
    });

    // ✅ Confirm connection
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Successfully connected to MongoDB!");
  } finally {
    // Don’t close client (for continuous connection)
  }
}
run().catch(console.dir);

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
