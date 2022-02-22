const express = require('express')
const res = require('express/lib/response')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const config = require('./config/key')
const { User } = require('./models/users');

//application/x-www-form-urlencoded로 돼있는 것을 가져올 수 있게 해줌
app.use(bodyParser.urlencoded({extended: true}));
//application/json으로 돼있는 것을 가져올 수 있게 해줌
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
    .then(()=> console.log('MongoDB connected...'))
    .catch(err => console.log(err))



app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요dd')
})

app.post('/register', (req, res) => {

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})