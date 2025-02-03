const mongoose = require("mongoose");

// Define Schema
const schema = mongoose.Schema({
  title: String,
  content: String,
  img_url: String,
});

// Create Mongoose Model
const BlogModel = mongoose.model("Blog", schema);

// Export the model (optional, if using in another file)
module.exports = BlogModel;
