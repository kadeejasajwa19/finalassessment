const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const BlogModel = require("./models/BlogModel"); // Ensure you have a Blog schema

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

// 1️ Connect to MongoDB
mongoose
  .connect("mongodb+srv://kadeejasajwafathima:kadeejasajwa@cluster0.a30q6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("DB Connection Error:", error));

// 2️ Create a POST API to add a new blog
app.post("/add", async (req, res) => {
  try {
    const { title, content, img_url } = req.body;
    
    if (!title || !content || !img_url) {
      return res.status(400).send({ message: "All fields are required" });
    }
    
    const newBlog = new BlogModel({ title, content, img_url });
    await newBlog.save();
    res.status(201).send({ message: "Blog added successfully", newBlog });
  } catch (error) {
    res.status(500).send({ error: "Failed to add blog" });
    console.log(error);
  }
});


// 3️ GET API to fetch all blogs
app.get("/get", async (req, res) => {
  try {
    let data = await BlogModel.find();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch blogs" });
    console.log(error);
  }
});

// 4️ PUT API to update an existing blog (Edit)
app.put("/update/:id", async (req, res) => {
  try {
    const { title, content, img_url } = req.body; // Ensure these fields are sent in the request body
    const updatedBlog = await BlogModel.findByIdAndUpdate(
      req.params.id,
      { title, content, img_url }, // Update the fields in the database
      { new: true } // Return the updated document
    );
    
    if (!updatedBlog) {
      return res.status(404).send({ message: "Blog not found" });
    }

    res.send({ message: "Blog updated successfully", updatedBlog });
  } catch (error) {
    res.status(500).send({ error: "Failed to update blog" });
    console.log(error);
  }
});

// 5️ DELETE API to delete a blog
app.delete("/delete/:id", async (req, res) => {
  try {
    const deletedBlog = await BlogModel.findByIdAndDelete(req.params.id); // Delete the blog by its ID

    if (!deletedBlog) {
      return res.status(404).send({ message: "Blog not found" });
    }

    res.send({ message: "Blog deleted successfully", deletedBlog });
  } catch (error) {
    res.status(500).send({ error: "Failed to delete blog" });
    console.log(error);
  }
});

// 6️ Start the Express Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
