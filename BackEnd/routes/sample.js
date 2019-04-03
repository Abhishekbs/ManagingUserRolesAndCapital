var express = require("express");
var router = express.Router();

router.get("/", function(req,res){
    res.send("server running");
})

router.post("/", function(req,res){
    console.log("request obj==>",req.body);
    // console.log(TestTable.insertData());
    res.send("from service file(POST)")
})

router.post("/createRoles", function(req,res){
    res.send("Create Roles")
})

router.delete("/deleteRoles", function(req,res){
    res.send("Delete Roles")
})

router.put("/updateRoles", function(req,res){
    res.send("Edit Roles")
})

router.get("/getRoles", function(req,res){
    res.send("Get Roles")
})




module.exports = router;


