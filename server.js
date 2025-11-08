import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let blogPosts = [
  {
    postId: uuidv4(),
    postTitle: "Test post!",
    postContent:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur ratione odio impedit iusto inventore deleniti ut repellat aut qui quae exercitationem architecto deserunt dolorum atque ex, similique itaque. Magni, placeat.",
  },
  {
    postId: uuidv4(),
    postTitle: "Test post! #2",
    postContent:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur ratione odio impedit iusto inventore deleniti ut repellat aut qui quae exercitationem architecto deserunt dolorum atque ex, similique itaque. Magni, placeat.",
  },
];

// Homepage route
app.get("/", (req, res) => {
  res.render("index.ejs", { posts: blogPosts });
});

// About page route
app.get("/about", (req, res) => {
  res.render("about.ejs");
});

// Create post page route
app.get("/createPost", (req, res) => {
  res.render("createPost.ejs");
});

// Create post route
app.post("/createPost", (req, res) => {
  try {
    const { postTitle, postContent } = req.body;
    console.log(postTitle, postContent);
    const newPost = {
      postId: uuidv4(),
      postTitle: postTitle,
      postContent: postContent,
    };
    blogPosts.push(newPost);
    res.redirect("/");
  } catch (err) {
    console.error(err);
  }
});

// Contact page route
app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

// Delete post route
app.post("/deletePost", (req, res) => {
  const postToDelete = req.body.postId;

  const postIndex = blogPosts.findIndex((post) => post.postId == postToDelete);
  console.log(postIndex);

  if (postIndex !== -1) {
    blogPosts.splice(postIndex, 1);
    res.redirect("/");
  } else {
    console.error(`Item with ID ${req.params.postId} was not found.`);
  }
});

// Edit post route
app.get("/editPost/:postId", (req, res) => {
  const postToEdit = req.params.postId;
  const postIndex = blogPosts.findIndex((post) => post.postId === postToEdit);

  if (postIndex !== -1) {
    res.render("editPost.ejs", {
      postId: blogPosts[postIndex].postId,
      postTitle: blogPosts[postIndex].postTitle,
      postContent: blogPosts[postIndex].postContent,
    });
  }
});

app.post("/editPost/:postId", (req, res) => {
  const postToEdit = req.params.postId;
  const updatedPostDeets = req.body;

  const postIndex = blogPosts.findIndex((post) => post.postId === postToEdit);

  if (postIndex !== -1) {
    blogPosts[postIndex] = { ...updatedPostDeets, postId: postToEdit };
    res.redirect("/");
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
