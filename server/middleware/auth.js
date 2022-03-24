const { User } = require('../models/User')

//authentication
let auth = (req, res, next) => {

    //get cookie from client
    let token = req.cookies.x_auth
    //find user with decoded token
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true });

        //so u can use req.token and req.user at index.js
        req.token = token;
        req.user = user;
        next()
    })

    //else fail
}

module.exports = { auth };