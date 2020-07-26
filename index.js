const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// 데이터베이스 관련 모듈
const { db } = require('./database');
const { User } = require('./models/User');

// 미들웨어
// application/x-www-form-urlencoded
// application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 라우터
app.get('/', (req, res) => res.send('안녕하세요~'));
app.post('/register', (req, res) => {
  // application/json 형태로 전달받는 경우에 body에 담겨서 받습니다
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })
});

// 서버
const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('Server Connected')
})