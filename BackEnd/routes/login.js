var express = require("express");
var router = express.Router();
var country = require("../service/country");
var db = require('../dbCreator')
let jwt = require('jsonwebtoken');
let config = require('./config');


router.post("/", function (req, res) {
    // ("Adding User") 
    const data = req.body;
    var collection = db.get().collection('user');
    collection.findOne({ userName: data.uname }, function (err, user) {
        if (err) {
            res.json({ success: false, message: 'erron in creat' });
        }
        console.log(user);
        if (user) {
            let token = jwt.sign({ username: user.userName },
                config.secret,
                {
                    expiresIn: '24h' // expires in 24 hours
                }
            );

            let collection1 = db.get().collection('role');
            let permission = {
                addCountryOnly: false,
                editCreatedCountryOnly: false,
                viewCountryList: false,
                addRoleOnly: false,
                addUserOnly: false
            };

            collection1.findOne({ role: user.role[0] }, function (err, role) {
                if (err) {
                    res.json({ success: false, message: 'error in accessing role permission' });
                }
                rolePermission = role.permission;
                Object.keys(permission).map((item) => {
                    permission[item] = rolePermission.indexOf(item) > -1 ? true : false;
                })
                res.json({ success: true, data: { token, permission } });
            })
            // db.close()
        }
        else {
            res.json({ success: false, message: 'Invalid' });
        }
    })
});


module.exports = router;


