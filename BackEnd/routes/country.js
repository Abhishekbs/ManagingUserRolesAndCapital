var express = require("express");
var router = express.Router();
var country = require("../service/country");
var db = require('../dbCreator');
let middleware = require('./tokenMiddleware');
let config = require('./config');
let jwt = require('jsonwebtoken');
// router.get("/", function(req,res){
//     res.send("server running");
// })

// router.post("/", function(req,res){
//     console.log("request obj==>",req.body);
//     // console.log(TestTable.insertData());
//     res.send("from service file(POST)")
// })



router.post("/addCountry", middleware.checkToken, function (req, res) {
    // ("Adding country") 
    console.log(req.headers);
    var decoded = jwt.verify(req.headers["authorization"].split(" ")[1], config.secret);
    const data = {
        ...req.body,
        owner: decoded.username
    }

    console.log("data==>", data);
    let result = country.addcountry(data);
    var collection = db.get().collection('country');
    collection.findOne({ countryName: data.countryName }, function (err, docs) {
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

                    res.json({ success: true, data: docs });
                    // db.close()
                })
            })
        }
        else {
            res.json({ success: false, message: 'Already Exist' });
        }
    })
});

router.post("/deleteCountry", middleware.checkToken, function (req, res) {
    // res.send("Delete Roles")
    console.log(req.body);
    const data = req.body;
    var collection = db.get().collection('country');
    collection.deleteOne({ countryName: data.countryName }, function (err, obj) {
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

router.post("/updateCountry", middleware.checkToken, function (req, res) {
    // res.send("Edit Roles")
    const data = req.body;
    var collection = db.get().collection('country');
    var newvalues = { $set: { countryName: data.countryName, capital: data.capital } };
    collection.updateOne({ countryName: data.countryName }, newvalues, function (err, obj) {
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

router.get("/getCountry", middleware.checkToken, function (req, res) {
    // res.send("Get Roles");
    var collection = db.get().collection('country');
    collection.find({}).toArray(function (err, docs) {
        if (err) {
            res.json({ success: false, message: 'erron in fetching Details' });
        }

        res.json({ success: true, data: docs });
        // db.close()
    })

});

module.exports = router;


