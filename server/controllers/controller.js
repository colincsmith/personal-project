const bcrypt = require('bcrypt')

module.exports = {
    //# auth controllers
    getUser: (req, res) => {
        res.status(200).send(req.session.user)
    },

    register: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body
        
        const foundUser = await db.check_user(username)
        if(foundUser[0]){
            return res.status(400).send('this username has already registered')
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const[newUser] = await db.register_user([username, hash])
        req.session.user = {
            userId: newUser.user_id
        }
        res.status(200).send({
            id: newUser.user_id,
            username: newUser.username
        })
    },

    login: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body

        const [foundUser] = await db.check_user(username)
        const user = foundUser

        if(!user){
            return res.status(401).send('sorry, wrong credentials')
        }

        const authenticated = bcrypt.compareSync(password, user.password)
        if(authenticated){
            req.session.user = {
                userId: user.user_id
            }

            return res.status(200).send({
                id: user.user_id,
                username: user.username
            })
        } else {
            res.status(401).send('try again buddy')
        }
    },

    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },

    //#post controller
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
        const {userId} = req.session.user
        const {img, ski_name, content} = req.body
        
        try{
        const newPost = await db.add_post([img, ski_name, content, userId])
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
            const posts = await db.edit_post([id, ski_name, content])
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