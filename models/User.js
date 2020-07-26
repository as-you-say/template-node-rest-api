const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
})

// 비밀번호 암호화
userSchema.pre('save', (next) => {
  var user = this;
  if (user.isModified('password')) {
    // - salt 생성 (saltRounds 는 salt의 자릿수를 말한다.)
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err)
      
      // - salt 를 이용해서 비밀번호를 암호화
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err) 

        user.password = hash;
        next();
      })
    })
  } else {
    next();
  }
})

userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
    if (err) return cb(err)
    cb(null, isMatch)
  });
}

userSchema.methods.generateToken = function (cb) {
  var user = this;
  
  // jsonwebtoken 을 이용해서 토큰을 생성하기
  var token = jwt.sign(user._id.toHexString(), 'secretToken');

  user.token = token;
  user.save((err, user) => {
    if(err) return cb(err)
    cb(null, user)
  })
}

const User = mongoose.model('User', userSchema);

module.exports = {
  User
}