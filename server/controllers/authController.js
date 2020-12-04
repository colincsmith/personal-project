const bcrypt = require('bcrypt')

module.exports = {
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
    }
}