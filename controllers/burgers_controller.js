var express = require("express");
var burgers = require("../models/burger.js");
var router = express.Router();

router.get("/", function(req, res) {
    burgers.selectAll(function(data) {
        var allBurgers = {
            burgers: data
        };
        console.log(allBurgers);
        res.render("index", allBurgers);
    });
});

router.post("/api/burgers", function(req, res) {
    burgers.insertOne(["burger_name", "devoured"], [req.body.name, req.body.devoured], function(result) {
    res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burgers.updateOne(
        {
            devoured: true
        },
        condition,
        function(result) {
            if (result.changedRows === 0) {
                return res.status(404).send('Not Found');
            }
            res.status(200).send('Success!');
        }
    );
});

module.exports = router;