const _post = require('../_models/_post.model');
const _notification = require("../_models/_notification.model")
const _socketManager = require("../socket/_socketManager")
const { ObjectId } = require('mongoose').Types;
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
        const post = await _post.findById(postId);
        let isLiked = false

        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter(like => like.toString() !== userId);
        } else {
            post.likes.push(userId);
            isLiked = true
        }

        const updatedPost = await post.save();

        const populatedPost = await _post.findById(postId).populate("likes").populate("favorites").populate("author").exec();



        _socketManager.emits("likePost", {postId, likes: populatedPost.likes});


        if (isLiked && userId !== populatedPost.author._id.toString()) {
            const notification = new _notification({
                sender: userId,
                receiver: post.author,
                content: `A like votre post`
            })

            const savedNotification = await notification.save();
            console.log("Emitting notification")
            _socketManager.emitToUser(populatedPost.author._id, "receiveNotification",await (await savedNotification.populate("sender", "username avatar")).populate("receiver", "username avatar"));
        }

        return populatedPost;
    },
    favorite: async (postId, userId) => {
        console.log("PostId: ", postId)
        const post = await _post.findById(postId);

        let isFavorite = false

        if (post.favorites.includes(userId)) {
            post.favorites = post.favorites.filter(favorite => favorite.toString() !== userId);
        } else {
            post.favorites.push(userId);
            isFavorite = true
        }

        const updatedPost = await post.save();

        if (isFavorite && userId !== updatedPost.author.toString()) {
            const notification = new _notification({
                sender: userId,
                receiver: updatedPost.author,
                content: `A mis en favoris votre post`
            })

            const savedNotification = await notification.save();
            _socketManager.emitToUser(updatedPost.author, "receiveNotification", await (await savedNotification.populate("sender", "username avatar")).populate("receiver", "username avatar"));
        }

        const populatedPost = await _post.findById(postId).populate("favorites").populate("likes").populate("author").exec();
        return populatedPost;
    }
}

module.exports = _postService;