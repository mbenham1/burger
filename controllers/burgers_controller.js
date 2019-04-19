var express = require("express");
var burger = require("../models/burger.js");
var connection = require("../config/connection.js");

var router = express.Router();

router.get("/", function (req, res) {

    // res.send("Worked");

    burger.all(function (data) {
        var hbsObject = {
            burger: data
        }
        res.render("index", hbsObject);

    });

});

router.get("/api/burgers", function (req,res) {

    burger.all(function (data) {

        res.json({ burgers: data });

    });
    // connection.query("SELECT * FROM burgers;", function(err, data) {
    //     if (err) {
    //       return res.status(500).end();
    //     }
    
    //     res.json({ burgers: data });
    //   });
})

router.post("/api/burgers", function (req, res) {

    burger.create([
        "burger_name", "devoured"
    ], [
            req.body.name, false
        ], function (result) {
            res.json({ id: result.insertId });
        });

});

router.put("/api/burgers/:id", function (req, res) {

    console.log(req.body);

    var condition = "id = " + req.params.id;

    burger.update({
        devoured: req.body.devoured
    }, condition, function (result) {
        if (result.changeRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });

});

router.delete("/api/burgers/:id", function(req, res) {

    var condition = "id = " + req.params.id;
  
    burger.delete(condition, function(result) {
      if (result.affectedRows == 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });

});

module.exports = router;