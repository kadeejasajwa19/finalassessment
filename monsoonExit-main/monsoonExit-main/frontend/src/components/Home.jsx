import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Card, CardContent, CardMedia, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);

  // Fetch blog data when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3001/get") // Fetch blogs from backend
      .then((res) => {
        setBlogs(res.data); // Set blogs in state
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to fetch blogs.");
      });
  }, []);

  // Handle delete button click
  const deleteBlog = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then((res) => {
        alert("Blog deleted successfully.");
        setBlogs(blogs.filter((blog) => blog._id !== id)); // Remove deleted blog from state
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to delete blog.");
      });
  };

  // Open the dialog with the blog details for editing
  const openEditDialog = (blog) => {
    setCurrentBlog(blog);
    setOpenDialog(true);
  };

  // Handle changes to the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBlog({ ...currentBlog, [name]: value });
  };

  // Handle form submission for updating the blog
  const updateBlog = () => {
    axios
      .put(`http://localhost:3001/update/${currentBlog._id}`, currentBlog)
      .then((res) => {
        alert("Blog updated successfully.");
        setBlogs(blogs.map((blog) => (blog._id === currentBlog._id ? currentBlog : blog))); // Update blog in state
        setOpenDialog(false); // Close the dialog
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to update blog.");
      });
  };

  return (
    <div>
      <Box sx={{ padding: 4 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 4 }}>
          {blogs.map((blog) => (
            <Card key={blog._id} sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={blog.img_url} // Ensure the image is correctly displayed
                alt={blog.title}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
                  {blog.content.slice(0, 100)}... {/* Show first 100 chars */}
                </Typography>
                <Button size="small" color="primary" onClick={() => openEditDialog(blog)}>
                  Edit
                </Button>
                <Button size="small" color="error" onClick={() => deleteBlog(blog._id)}>
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Edit Blog Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Blog</DialogTitle>
        <DialogContent>
          {currentBlog && (
            <>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                name="title"
                value={currentBlog.title}
                onChange={handleInputChange}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Content"
                variant="outlined"
                fullWidth
                name="content"
                value={currentBlog.content}
                onChange={handleInputChange}
                sx={{ marginBottom: 2 }}
                multiline
                rows={4}
              />
              <TextField
                label="Image URL"
                variant="outlined"
                fullWidth
                name="img_url"
                value={currentBlog.img_url}
                onChange={handleInputChange}
                sx={{ marginBottom: 2 }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={updateBlog} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
