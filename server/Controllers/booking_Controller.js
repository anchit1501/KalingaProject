"use strict";
var mongoose = require("mongoose");
var Flight = mongoose.model("Flights");
const nodemailer = require("nodemailer");

// var db=mongoose.connect('mongodb://localhost/gotrip');

exports.list_all_booking = function(req, res) {
  Flight.find({}, function(err, flight) {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!flight) {
        res.status(404).send(err);
      } else {
        res.json(flight);
      }
    }
  });
};

const sendBookingMail = data => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gotripwt@gmail.com",
      pass: "123456789aA"
    }
  });

  const mailOptions = {
    from: "gotripwt@gmail.com", // sender address
    to: `${data.email}${data.user_email != "" ? `,${data.user_email}` : ""}`, // list of receivers
    subject: "Booking Successfull", // Subject line
    html: `booking successful </br>
          from ${data.origin_airport} to ${data.destination_airport} ` // plain text body
  };
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
}

exports.post_booking = function(req, res) {
  var new_flight = new Flight(req.body);
  console.log(req.body);
  sendBookingMail(req.body);
  new_flight.save(function(err, flight) {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(flight);
    }
  });
};

exports.cancel_booking = function(req, res) {
  Flight.findOne({ booking_id: req.params.booking_id }, function(
    err,
    foundObject
  ) {
    if (err) {
      res.status(500).send();
    } else {
      if (!foundObject) {
        res.status(404).send();
      } else {
        foundObject.status = "Cancelled";

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

exports.find_bookings = function(req, res) {
  Flight.find(
    {
      origin_airport: req.params.source,
      destination_airport: req.params.destination,
      departs_at: { $regex: req.params.date, $options: "i" }
    },
    function(err, foundObject) {
      if (err) {
        res, status(500).send(err);
      } else {
        if (!foundObject) {
          res.status(404).send(err);
        } else {
          res.status(200).send(foundObject);
        }
      }
    }
  );
};

exports.find_booking_user = function(req, res) {
  Flight.find({ user_email: req.params.user_email }, function(
    err,
    foundObject
  ) {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!foundObject) {
        res.status(404).send(err);
      } else {
        res.status(200).send(foundObject);
      }
    }
  });
};

exports.count_all=function(req,res){
Flight.count( [
      {
        $group: {
          _id: null,
          total: { $sum: 1 }
        }
      }
    ],function(err,foundObject){
      res.json(foundObject);
    }
)};


exports.count_cancelled = function(req, res) {
  Flight.count({ status: "Cancelled" }, function(err, foundObject) {
    // console.log(foundObject);
    res.json(foundObject);
  });
};

exports.count_status = function(req, res) {
  Flight.aggregate(
    [
      {
        $group: {
          _id: "$status",
          total: { $sum: 1 }
        }
      }
    ],
    function(err, foundObject) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (!foundObject) {
          res.status(404).send(err);
        } else {
          console.log(foundObject);
          res.json(foundObject);
        }
      }
    }
  );
};

exports.booking_flight_count = function(req, res) {
  Flight.aggregate(
    [
      {
        $group: {
          _id: "$operating_airline",
          total: { $sum: 1 }
        }
      }
    ],
    function(err, foundObject) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (!foundObject) {
          res.status(404).send(err);
        } else {
          console.log(foundObject);
          res.json(foundObject);
        }
      }
    }
  );
};


exports.booking_revenue = function(req, res) {
  Flight.aggregate(
    [
      {
        $group: {
          _id: "$status",
          total: { $sum: "$total_fare_flight" }
        }
      }
    ],
    function(err, foundObject) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (!foundObject) {
          res.status(404).send(err);
        } else {
          console.log(foundObject);
          res.json(foundObject);
        }
      }
    }
  );
};


exports.airline_revenue = function(req, res) {
  Flight.aggregate(
    [
      {
        $group: {
          _id: "$operating_airline",
          total: { $sum: "$total_fare_flight" }
        }
      }
    ],
    function(err, foundObject) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (!foundObject) {
          res.status(404).send(err);
        } else {
          console.log(foundObject);
          res.json(foundObject);
        }
      }
    }
  );
};

exports.revenue = function(req, res) {
  Flight.aggregate(
    [
      {
        $group: {
          _id: null,
          total: { $sum: "$total_fare_flight" }
        }
      }
    ],
    function(err, foundObject) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (!foundObject) {
          res.status(404).send(err);
        } else {
          console.log(foundObject);
          res.json(foundObject);
        }
      }
    }
  );
};
