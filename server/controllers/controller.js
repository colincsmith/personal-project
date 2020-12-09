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

    getMe: async (req, res) => {
        const {user_id} = req.session.user

        const db = req.app.get('db')

        const me = await db.get_me([user_id])
        return res.status(200).send(me)
    },

    //#post controller
    getAllPosts: async (req, res) => {
        const db = req.app.get("db")
        const posts = await db.get_all_posts()
        res.status(200).send(posts)
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
        
    },

    deletePost: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        // const {userId} = req.session.user
        // const post = await db.get_post([id])
        await db.delete_post([id])

        res.sendStatus(200)
        // if(userId != post[0].id){
        //     return res.status(401).send("You did not create this post.")
        // }
        // else{
        //     await db.delete_post([id])
        //     return res.status(200).send(posts)
        // }
    },

    getUserPosts: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.params

        const post = await db.get_user_posts([user_id])
        console.log(post)
        return res.status(200).send(post)
    }
}