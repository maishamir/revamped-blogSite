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

app.get("/", (req, res) => {
  res.render("index.ejs", { posts: blogPosts });
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/createPost", (req, res) => {
  res.render("createPost.ejs");
});

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
    // console.log("post created successfully");
    // setTimeout(() => {
    res.redirect("/");
    // }, 2000);
  } catch (err) {
    console.error(err);
  }
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.post("/deletePost", (req, res) => {
  //find index of item with id to delete
  // const postToDelete = req.params.postId;
  // console.log(postIndex);
  const postToDelete = req.body.postId;

  const postIndex = blogPosts.findIndex((post) => post.postId == postToDelete);
  // console.log(typeof (blogPosts[0].postId))
  console.log(postIndex)

  if (postIndex !== -1) {
    blogPosts.splice(postIndex, 1);
    // console
    //   .log(`Post with ID ${postToDelete} was delete successfully.`);
    res.redirect("/")
  } else {
    console.error(`Item with ID ${req.params.postId} was not found.`);
  }
});
