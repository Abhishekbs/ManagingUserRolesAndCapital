var express = require('express');
var app = express();
const router = express.Router();
const bodyParser = require('body-parser');
var db = require('./dbCreator');
var sample = require('./routes/sample');
var userPath = require('./routes/user');
var rolePath = require('./routes/role');
var countryPath = require('./routes/country');
var loginPath = require('./routes/login');

router.use("/sample", sample);
router.use("/user", userPath);
router.use("/country", countryPath);
router.use("/role", rolePath);
router.use("/login", loginPath);

app.use(bodyParser.urlencoded({ extended: false }));
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
db.connect('mongodb://localhost:27017', function (err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    var collection = db.get().collection('user');

    collection.findOne({ userName: 'superAdmin' }, function (err, docs) {
      if (err) {
        res.json({ success: false, message: 'erron in creat' });
      }
      if (!docs) {
        collection.insertOne({ userName: 'superAdmin', role: ['superAdmin'] }, function (err, result) {
          if (err) {
            console.log("Error in creating Super Admin");
            return false;
          }

          var collection = db.get().collection('role');
          collection.findOne({
            role: 'superAdmin'
          }, function (err, docs) {
            if (err) {
              res.json({ success: false, message: 'erron in creat' });
            }
            console.log(docs);
            if (!docs) {
              collection.insertOne({
                role: 'superAdmin', permission: [
                  'addRoleOnly',
                  'addUserOnly',
                  'addCountryOnly',
                  'editCreatedCountryOnly',
                  'viewCountryList']
              }, function (err, result) {
                if (err) {
                  return false;
                }
                collection.find({}).toArray(function (err, docs) {
                  if (err) {
                    res.json({ success: false, message: 'erron in fetching Details' });
                  }

                  // db.close()
                })
              })
            }
            else {
              res.json({ success: false, message: 'Already Exist' });
            }
          })


          console.log("Super Admin Created Successfully");
          // db.close()

        })
      }
      else {
        console.log("Super Admin Already Exist");
      }
    })

    app.listen(3005, function () {
      console.log('Listening on port 3005...')
    })
  }
})
