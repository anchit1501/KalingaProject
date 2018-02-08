'use strict';
var mongoose = require("mongoose");
var Insurance = mongoose.model("Insurances");

exports.get_all_passenger = function(req, res) {
  Insurance.find({}, function(err, passenger) {
    if (err) {
      res.sendStatus(500);
    } else {
    //   res.status(200).send();
      res.json(passenger);
    }
  });
};

exports.add_insurance = function(req, res) {
  var new_insurance = new Insurance(req.body);
  new_insurance.save(function(err, insurance) {
    if (err) {
      res.sendStatus(500).send(err);
    
    } else {
      res.sendStatus(200).json({message:'Insurance added'});
    }
  });
};


exports.profile_update = function(req, res) {
  // var email = req.param.email;
  User.findOne({ email: req.params.email }, function(err, foundObject) {
    if (err) {
      res.status(500).send();
    } else {
      if (!foundObject) {
        res.status(404).send();
      } else {
        if (req.body.title) {
          foundObject.personal_details.title = req.body.title;
        }
        

        foundObject.save(function(err, updatedObject) {
          if (err) {
            res.status(500).send();
            console.log(err);
          } else {
            res.send(updatedObject);
          }
        });
      }
    }
  });
};
