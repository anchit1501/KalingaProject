'use strict';
var mongoose = require("mongoose");
var Passenger = mongoose.model("Passenger_Details");

exports.get_all_passenger = function(req, res) {
  Passenger.find({}, function(err, passenger) {
    if (err) {
      res.sendStatus(500);
    } else {
    //   res.status(200).send();
      res.json(passenger);
    }
  });
};

exports.add_passenger = function(req, res) {
  var new_passenger = new Passenger(req.body);
  new_passenger.save(function(err, passenger) {
    if (err) {
      res.sendStatus(500).send(err);
    
    } else {
      res.sendStatus(200).json({message:'passenger added'});
    }
  });
};