var express = require("express");
var router = express.Router();
var country = require("../service/country");
var db = require('../dbCreator')
let middleware = require('./tokenMiddleware');


router.post("/addUser",middleware.checkToken, function (req, res) {
    // ("Adding User") 
    const data = req.body;
    console.log("data==>", data);
    let result = country.addcountry(data);
    var collection = db.get().collection('user');
    collection.findOne({ userName: data.userName }, function (err, docs) {
        if (err) {
            res.json({ success: false, message: 'erron in creat' });
        }
        console.log(docs);
        if (!docs) {
            collection.insertOne(data, function (err, result) {
                if (err) {
                    return false;
                }
                collection.find({}).toArray(function (err, docs) {
                    if (err) {
                        res.json({ success: false, message: 'erron in fetching Details' });
                    }

                    res.json({ success: true, data: docs});
                    // db.close()
                })
            })
        }
        else {
            res.json({ success: false, message: 'Already Exist' });
        }
    })
});

router.post("/deleteUser",middleware.checkToken, function (req, res) {
    // res.send("Delete User")
    console.log(req.body);
    const data = req.body;
    var collection = db.get().collection('user');
    collection.deleteOne({ userName: data.userName }, function (err, obj) {
        if (err) {
            res.json({ success: false, message: 'erron in fetching Details' });
        }
        collection.find({}).toArray(function (err, docs) {
            if (err) {
                res.json({ success: false, message: 'erron in fetching Details' });
            }

            res.json({ success: true, data: docs, message: "deleted Successfully" });
            // db.close()
        })

    });
});

router.post("/updateUser",middleware.checkToken, function (req, res) {
    // res.send("Edit User")
    const data = req.body;
    var collection = db.get().collection('user');
    var newvalues = { $set: { userName: data.userName, role: data.role } };
    collection.updateOne({ userName: data.userName }, newvalues, function (err, obj) {
        if (err) {
            res.json({ success: false, message: 'erron in fetching Details' });
        }

        collection.find({}).toArray(function (err, docs) {
            if (err) {
                res.json({ success: false, message: 'erron in fetching Details' });
            }

             res.json({ success: true, data: docs });
            // db.close()
        })

    })
});

router.get("/getUser", middleware.checkToken,function (req, res) {
    // res.send("Get User");
    var collection = db.get().collection('user');
    collection.find({}).toArray(function (err, docs) {
        if (err) {
            res.json({ success: false, message: 'erron in fetching Details' });
        }

        res.json({ success: true, data: docs });
        // db.close()
    })

});

module.exports = router;


