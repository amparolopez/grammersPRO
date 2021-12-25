const Post = require('../models/Post.js')

const PostController = {
    getAllPosts: async(req,res) => {
        try{
            const post = await Post.find()
            res.json({ success: false, response: post });
        }catch(error){
            res.json({ success: false, response: error });
        }
    },
    postAPost: async(req,res) => {
        const {postText  , user, comments, commentDate} = req.body
        const {postImage} = req.file
        console.log(postImage)
        let post = await new Post({
            postText ,postImage, user, comments, commentDate
        })
        try{
            await post.save()
        }catch(error){
            res.json({
                success: false,
              });
        }
        res.json({
            res: post,
            success: true,
          });
    }

}

module.exports = PostController