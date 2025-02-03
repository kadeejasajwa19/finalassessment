const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://kadeejasajwafathima:kadeejasajwa@cluster0.a30q6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {  // Replace with your actual URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log("Database connection error:", error);
  });
