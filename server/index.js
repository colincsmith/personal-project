require('dotenv').config()

const express = require('express')
const massive = require('massive')
const session = require('express-session')

const {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING} = process.env
const ctrl = require('./controllers/controller')
const { checkUser } = require('./controllers/middleware')

const app = express()

app.use(express.json())

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(db => {
    app.set('db', db)
    console.log('database connected and functioning smoothly')
}).catch(err => console.log(err))

// user endpoints
app.get('/auth/user', checkUser, ctrl.getUser)
app.post('/auth/register', ctrl.register)
app.post('/auth/login', ctrl.login)
app.post('/auth/logout', ctrl.logout)

// post endpoints
app.get('/feed/posts', ctrl.getAllPosts)
app.get('/feed/post', ctrl.getOnePost)
app.post('/post/form', ctrl.addPost)
app.put('/post/:id', ctrl.editPost)
app.delete('/post/:id', ctrl.deletePost)

app.listen(SERVER_PORT, () => console.log(`server listening on port ${SERVER_PORT}`))