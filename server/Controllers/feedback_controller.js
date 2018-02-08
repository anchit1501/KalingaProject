"use strict";
var mongoose = require("mongoose");
var Feedback = mongoose.model("Feedbacks");
const nodemailer = require("nodemailer");


exports.list_all = function(req, res) {
  Feedback.find({}, function(err, feedback) {
    if (err) {
      res.status(500).send();
    } else {
      res.status(200).json(feedback);
    }
  });
};

const sendReplyMail = data => {
  console.log(data.email);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gotripwt@gmail.com",
      pass: "123456789aA"
    }
  });

  const mailOptions = {
    from: "gotripwt@gmail.com", // sender address
    to: `${data.email}`, // list of receivers
    subject: "Feedback", // Subject line
    html: `
    Hi,
    ${data.body} ` // plain text body
  };
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
}
exports.send_reply=function(req,res)
{ 
  console.log(req.body);
  sendReplyMail({
    email: req.body.email,
    body:req.body.body

  });
  res.send({status:200});

}


exports.get_count=function (req,res){
  Feedback.aggregate(
    [
      {
        $group: {
          _id: null,
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
}


exports.get_feedback = function(req, res) {
  Feedback.find({ email: req.params.email }, function(err, feedback) {
    if (err) {
      res.status(500).send();
    } else {
      if (!feedback) {
        res.status(404).send();
      } else {
        res.json(feedback);
      }
    }
  });
};

exports.post_feedback = function(req, res) {
  var new_feedback = new Feedback(req.body);
  //   console.log(req.body);
  new_feedback.save(function(err, feedback) {
    if (err) {
      res.status(500).send();
      res.send(err);
    } else {
      res.json(feedback);
    }
  });
};


