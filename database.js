const db = require('mongoose');
const config = require('./config/key');

db.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(()=>{
  console.log('Database Connected!');
})
.catch(()=>{
  console.log('Database Fail!');
})

module.exports = {
  db
}