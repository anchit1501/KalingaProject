"use strict";
var mongoose = require("mongoose");
var Nakli = mongoose.model("Naklis");
// var db=mongoose.connect('mongodb://localhost/gotrip');

exports.list_all_booking = function(req, res) {
  Nakli.find({}, function(err, nakli) {
    if (err) {
      res.status(500).send();
      res.send(err);
    } else {
      if (!nakli) {
        res.status(404).send();
        res.send(err);
      } else {
      
        res.json(nakli);
      }
    }
  });
};

exports.add_booking = function(req, res) {
  var new_nakli = new Nakli(req.body);
  console.log(req.body);
  new_nakli.save(function(err, nakli) {
    if (err) res.send(err);
    res.send(nakli);
  });
};
