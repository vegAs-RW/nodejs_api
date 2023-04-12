const express = require('express');
const { setPosts, getPosts, editPosts, deletePosts } = require('../controllers/post.controller');

const router = express.Router();

router.get("/", getPosts);

router.post("/", setPosts);

router.put("/:id", editPosts);

router.delete("/:id", deletePosts)

router.patch("/like-post/:id", (req, res) => {
    res.json({message: "post liké : id : " + req.params.id});
});

router.patch("/dislike-post/:id", (req, res) => {
    res.json({message: "post disliké : id : " + req.params.id});
});


module.exports = router