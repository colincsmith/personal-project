module.exports = {
    getAllPosts: async (req, res) => {
        const db = req.app.get("db")
        const posts = await db.get_all_posts()
        res.status(200).send(posts)
    },

    getOnePost: async (req, res) => {
        const db = req.app.get("db")
        const {id} = req.params
        const [post] = await db.posts.get_one_post(+id)
        if(post){
            res.status(200).send(post)
        } else {
            res.status(400).send('could not find anything')
        }
    },

    addPost: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.session.user
        const {img, ski_name, content} = req.body

        try{
        const newPost = await db.add_post([img, ski_name, content, user_id])
        return res.status(200).send(newPost)
        } catch(err) {
            console.log('cannot add review', err)
            res.sendStatus(500)
        }
    },

    editPost: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        const {ski_name, content} = req.body

        try{
            const posts = await db.edit_pun([id, ski_name, content])
            res.status(200).send(posts)
        } catch(err){
            console.log("cannot edit post", err)
            res.sendStatus(500)
        }
    },

    deletePost: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params

        try{
            const posts = await db.delete_post(+id)
            res.status(200).send(posts)
        } catch(err){
            console.log('could not delete this post')
            res.sendStatus(500)
        }
    }
}