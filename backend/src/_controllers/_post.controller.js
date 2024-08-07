const _postService = require('../_services/_post.service');

const _postController = {
    create: async (req, res) => {
        try {

            const {name, description} = req.body;
            const imageName = req.file.filename;

            const post = await _postService.create(name, description, imageName, req.userId);

            if (post) {
                res.status(201).json(post)
            }

        }catch (e) {
            console.log(e)
            res.status(500).json({message: "Internal server error"})
        }
    },
    findAll: async (req, res) => {
        try {
            const posts = await _postService.findAll();
            if (posts) {
                res.status(200).json(posts)
            }
        }catch (e) {
            console.log(e)
            res.status(500).json({message: "Internal server error"})
        }
    }
}


module.exports = _postController;