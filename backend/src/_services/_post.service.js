const _post = require('../_models/_post.model');
const _socketManager = require("../socket/_socketManager")
const _postService = {
    create: async (name, description, imageName, authorId) => {

        const post = new _post({
            name,
            description,
            image: imageName,
            author: authorId
        })

        const savedPost = await post.save();

        const populatedPost = await _post.findById(savedPost._id).populate("likes").populate("favorites").populate("author").exec();
        return populatedPost;
    },

    findAll: async () => {
        const posts = await _post.find().populate("author").populate("likes").populate("favorites").exec();
        return posts;
    },
    like: async (postId, userId) => {
        console.log("PostId: ", postId)
        const post = await _post.findById(postId);

        console.log(post.likes)

        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter(like => like.toString() !== userId);
        } else {
            post.likes.push(userId);
        }



        const updatedPost = await post.save();

        const populatedPost = await _post.findById(postId).populate("likes").populate("favorites").populate("author").exec();
        _socketManager.emits("likePost", {postId, likes: populatedPost.likes});
        return populatedPost;
    },
    favorite: async (postId, userId) => {
        console.log("PostId: ", postId)
        const post = await _post.findById(postId);

        console.log(post.favorites)

        if (post.favorites.includes(userId)) {
            post.favorites = post.favorites.filter(favorite => favorite.toString() !== userId);
        } else {
            post.favorites.push(userId);
        }

        const updatedPost = await post.save();

        const populatedPost = await _post.findById(postId).populate("favorites").populate("likes").populate("author").exec();
        return populatedPost;
    }
}

module.exports = _postService;