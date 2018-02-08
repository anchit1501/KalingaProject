"use strict";
var mongoose = require("mongoose");
var Recommendation = mongoose.model("Recommendations");

exports.all_recommendation = function(req, res) {
  Recommendation.find({}, function(err, foundObject) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(foundObject);
    }
  });
};

exports.add_recommendation = function(req, res) {
  var recommendation = new Recommendation(req.body);
  recommendation.save(function(err, object) {
    console.log(req.body);
    if (err) {
      res.send(err);
    } else {
      res.status(200).json(object);
    }
  });
};


exports.delete_recommendation = function(req, res) {
  console.log()
  Recommendation.remove(
    {
      r_code: req.params.r_code
    },
    function(err, foundObject) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (!foundObject) {
          res.status(400).send(err);
        } else {
          res.json({ message: "Recommendation Delete" });
        }
      }
    }
  );
};
