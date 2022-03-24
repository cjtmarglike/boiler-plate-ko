const express = require('express')
const res = require('express/lib/response')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./config/key')
const { auth } = require('./middleware/auth');
const { User } = require('./models/User');

//application/x-www-form-urlencoded로 돼있는 것을 가져올 수 있게 해줌
app.use(bodyParser.urlencoded({extended: true}));
//application/json으로 돼있는 것을 가져올 수 있게 해줌
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
    .then(()=> console.log('MongoDB connected...'))
    .catch(err => console.log(err))

app.get('/api/hello', (req, res) => {
  res.send('axiosItWas!')
})

app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요')
})

//signUp
app.post('/api/users/register', (req, res) => {
  //1. get info from client for sign up
  const user = new User(req.body)
  //2. insert into database
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })
})

//login
app.post('/api/users/login', (req, res) => {

  //check if the email address exists
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "입력한 이메일에 해당하는 유저가 없습니다."
      })
    }
    //if it exists, check if the password matches
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 일치하지 않습니다." })
      //if it matches, generate token
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);
        //save token using cookie/local storage
        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
      })
    })
  })
})

//authentication
app.get('/api/users/auth', auth, (req, res) => {

  //came here means that authentication succedeed
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/users/logout', auth, (req, res) => {
  //whole token process isn't needed with auth middleware
  User.findOneAndUpdate({ _id: req.user._id }, 
    { token: '' }, (err, user) => {
      if(err) return res.json({ success: false, err })
      //now client cookie != db cookie('') so u don't need to consider deleting it
      return res.status(200).json({
        success: true
      })
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})