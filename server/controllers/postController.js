module.exports = {
    addPost: async (req, res) => {
        const db = req.app.get('db')
        const {userid} = req.session.userid
        const {img, ski_name, content} = req.body
        const user_id = userid

        const newPost = await db.add_post([img, ski_name, content, user_id])
        return res.status(200).send(newPost)
    }
}