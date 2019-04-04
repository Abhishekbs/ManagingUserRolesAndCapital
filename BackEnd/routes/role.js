var express = require("express");
var router = express.Router();
var country = require("../service/country");
var db = require('../dbCreator')
let middleware = require('./tokenMiddleware');



router.post("/addRole",middleware.checkToken, function (req, res) {
    // ("Adding role") 
    const data = req.body;
    console.log("data==>", data);
    let result = country.addcountry(data);
    var collection = db.get().collection('role');
    collection.findOne({ role: data.role }, function (err, docs) {
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

router.post("/deleteRole", middleware.checkToken,function (req, res) {
    // res.send("Delete role")
    console.log(req.body);
    const data = req.body;
    var collection = db.get().collection('role');
    collection.deleteOne({ role: data.role }, function (err, obj) {
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

router.post("/updateRole",middleware.checkToken, function (req, res) {
    // res.send("Edit role")
    const data = req.body;
    console.log(data);
    var collection = db.get().collection('role');
    var newvalues = { $set: { permission:[...data.permission]} };
    collection.updateOne({ role: data.role }, newvalues, function (err, obj) {
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

router.get("/getRole",middleware.checkToken, function (req, res) {
    // res.send("Get role");
    var collection = db.get().collection('role');
    collection.find({}).toArray(function (err, docs) {
        if (err) {
            res.json({ success: false, message: 'erron in fetching Details' });
        }

        res.json({ success: true, data: docs });
        // db.close()
    })

});

module.exports = router;


