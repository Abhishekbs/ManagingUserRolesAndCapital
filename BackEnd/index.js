var express = require('express');
var app = express();
const router = express.Router();
const bodyParser= require('body-parser');
var db = require('./dbCreator');
var sample = require('./routes/sample');
var userPath = require('./routes/user');
var rolePath = require('./routes/role');
var countryPath = require('./routes/country');
var loginPath = require('./routes/login');

router.use("/sample",sample);
router.use("/user",userPath);
router.use("/country",countryPath);
router.use("/role",rolePath);
router.use("/login",loginPath);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log("hit");
  res.header("x-SERVER-TIME", Date.now());
  res.header("Referer", req.headers.referer);
  res.header("X-CUSTOM_HEADER", req.headers["x-custom_header"]);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.use(router);

// Connect to Mongo on start
db.connect('mongodb://localhost:27017', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    app.listen(3005, function() {
      console.log('Listening on port 3005...')
    })
  }
})
