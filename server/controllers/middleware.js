module.exports = {
    checkUser: async (req, res, next) => {
        if(req.session.user.user_id){
            next()
        } else {
            res.status(403).send('No one is logged in')
        }
    }
}