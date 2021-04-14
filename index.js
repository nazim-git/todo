var express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const appRoute = express.Router();
var app = express();
app.use(cors());
app.use(bodyParser.json());
appRoute.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
mongoose.connect(process.env.mongooseURI,
  { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', function () {
  console.log("MongoDB database connection established successfully");
})
app.route('/test/:param').get(function (req, res) {
    console.log(req.params)
      res.json('Express server working');
});
app.listen(process.env.PORT || 5000)
exports = module.exports = app;