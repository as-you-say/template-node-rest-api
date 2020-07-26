const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/auth');

// 데이터베이스 관련 모듈
const { db } = require('./database');
const { User } = require('./models/User');

// 미들웨어
// application/x-www-form-urlencoded
// application/json
// cookie
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// 라우터
app.get('/', (req, res) => res.send('안녕하세요~'));
app.post('/apis/users/register', (req, res) => {
  // application/json 형태로 전달받는 경우에 body에 담겨서 받습니다
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  });
});
app.post('/apis/users/login', (req, res) => {
  // 1. 요청한 이메일이 데이터베이스에 있는지 찾는다.
  User.findOne({ emain: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: '제공된 이메일에 해당하는 유저가 없습니다.'
      })
    }

    // 2. 요청된 이메일이 데이터베이스에 있다면, 비밀번호가 맞는 비밀번호인지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: '비밀번호가 틀렸습니다.' })
      // 3. 비밀번호까지 맞다면, 토큰을 생성하기
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err)

        // 4. 토큰을 저장한다. -- 어디에? : 쿠키, 로컬스토리지, 세선
        // 어디에 저장해야 안전하냐는 부분은 논란이 많다 ... 각자 다 장단점이 있습니다.
        // 이번에는 쿠키를 사용한다.
        res.cookie("x_auth", user.token)
        .status(200)
        .json({ loginSuccess: true, userId: user._id })
      })
    })
  })
});
app.get('/apis/users/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})
app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, {token: ""}, (err, user) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).send({
      success: true
    })
  })
})


// 서버
const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('Server Connected')
})