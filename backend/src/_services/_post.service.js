const _post = require('../_models/_post.model');

const _postService = {
    create: async (name, description, imageName, authorId) => {

        const post = new _post({
            name,
            description,
            image: imageName,
            author: authorId
        })

        const savedPost = ((await (await post.save()).populate("author")).populate("likes"));
        return savedPost;
    },

    findAll: async () => {
        const posts = await _post.find().populate("author").populate("likes").exec();
        return posts;
    }
}

module.exports = _postService;