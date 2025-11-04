import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));



app.get("/", (req, res) => {
  res.render("index.ejs", {posts: blogPosts})
})

app.get("/about", (req, res) => {
  res.render("about.ejs")
})

app.get("/createPost", (req, res) => {
  res.render("createPost.ejs")
})

app.get("/contact", (req, res) => {
  res.render("contact.ejs")
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})



let blogPosts = [
  {
    postId: uuidv4(),
    postTitle: "Test post!",
    postContent: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur ratione odio impedit iusto inventore deleniti ut repellat aut qui quae exercitationem architecto deserunt dolorum atque ex, similique itaque. Magni, placeat."
  },
  {
    postId: uuidv4(),
    postTitle: "Test post! #2",
    postContent: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur ratione odio impedit iusto inventore deleniti ut repellat aut qui quae exercitationem architecto deserunt dolorum atque ex, similique itaque. Magni, placeat."
  }
]