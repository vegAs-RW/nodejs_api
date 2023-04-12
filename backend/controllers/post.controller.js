const PostModel = require('../models/post.model')

// Controller for get all posts
module.exports.getPosts = async (req, res) => {
    const posts = await PostModel.find();
    res.status(200).json(posts)
}

// Controller for post a new post
module.exports.setPosts = async (req, res) => {
    if(!req.body.message) {
        res.status(400).json({message:"Merci d'ajouter un message"})
    }
    const post = await PostModel.create({
        message: req.body.message,
        author : req.body.author
    })
    res.status(200).json(post);
}

// Controller for edit a post
module.exports.editPosts = async (req, res) => {
    const post = await PostModel.findById(req.params.id)

    if (!post) {
        res.status(404).json({message: "Ce post n'existe pas"})
    }

    const updatePost = await PostModel.findByIdAndUpdate(
        post,
        req.body,
        {new: true}
    )
    res.status(200).json(updatePost)
}

// Controller for delete a post
module.exports.deletePosts = async (req, res) => {
    const post = await PostModel.findById(req.params.id)

    if (!post) {
        res.status(404).json({message: "Ce post n'existe pas"})
    }
    await post.deleteOne();
    res.status(200).json("Message supprimé" + req.params.id)
}

// Controller for add a liker in a array "likers" by his userId
module.exports.likePosts = async (req, res) => {
    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {$addToSet: {likers: req.body.userId}},
            {new: true}
        ).then(data => res.status(200).json(data))
    } catch (err) {
        res.status(400).json(err)
    }
}

// Controller for remove a liker in a array "likers" by his userId
module.exports.dislikePosts = async (req, res) => {
    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {$pull: {likers: req.body.userId}},
            {new: true}
        ).then(data => res.status(200).json(data))
    } catch (err) {
        res.status(400).json(err)
    }
}