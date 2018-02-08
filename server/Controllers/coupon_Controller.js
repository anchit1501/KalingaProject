'use strict';
var mongoose = require("mongoose");
var Coupon = mongoose.model("Coupons");

exports.list_all_coupons = function(req, res) {
  Coupon.find({}, function(err, coupon) {
    if (err) {
      res.status(500).send();
    } else {
    //   res.status(200).send();
      res.json(coupon);
    }
  });
};

exports.add_coupon = function(req, res) {
  var new_coupon = new Coupon(req.body);
  new_coupon.save(function(err, coupon) {
    if (err) {
      res.send(err);
    
    } else {
      res.json(coupon);
    }
  });
};

exports.delete_coupon = function(req, res) {
  Coupon.remove(
    {
      coupon_code: req.params.coupon_code
    },
    function(err, coupon) {
      if (err) {
        res.Status(500).send(err);
      } else {
        if (!coupon) {
          res.status(400).send();
        } else {
          res.json({ message: "Coupon deleted" });
        }
      }
    }
  );
};
