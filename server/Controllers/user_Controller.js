"use strict";
var mongoose = require("mongoose");
var User = mongoose.model("Users");
const nodemailer = require("nodemailer");
const uuidv4 = require("uuid/v4");
// var baseurl = "http://localhost:3000/#/";
// export let baseurl = "http://gotripwtapi.azurewebsites.net/";
var baseurl = "http://gotripwtdev.azurewebsites.net/#/";

// var db=mongoose.connect('mongodb://localhost/gotrip');

exports.list_all_user = function(req, res) {
  User.find({}, function(err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};


exports.user_count=function(req,res){
   User.aggregate(
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
exports.get_details = function(req, res) {
  User.find(
    { email: req.params.email, password: req.params.password },
    function(err, foundObject) {
      if (err) {
        res.status(500).send(foundObject);
      } else {
        if (!foundObject) {
          res.status(404).send(foundObject);
        } else {
          res.send(foundObject);
        }
      }
    }
  );
};

exports.register_user = function(req, res) {
  var new_user = new User(req.body);
  new_user.save(function(err, user) {
    if (err) {
      res.json({ message: "User Exists" });
    } else {
      res.json({ message: "User Added" });
    }
  });
};

exports.delete_user = function(req, res) {
  User.remove(
    {
      email: req.params.email
    },
    function(err, user) {
      if (err) res.send(err);
      res.json({ message: "User deleted" });
    }
  );
};

exports.set_reset_token = function(req, res) {
  console.log("working token");
  User.findOne({ email: req.body.email }, function(err, foundObject) {
    if (err) {
      res.status(500).send();
    } else {
      if (!foundObject) {
        {
          res.json({ message: "not registered", status: 400 });
        }
      } else {
        foundObject.reset_token = uuidv4();
        let reset_link = `${baseurl}resetpassword/${foundObject.reset_token}`;

        //~~~~~~~~~~~~~~~~~~~~node mailer
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "gotripwt@gmail.com",
            pass: "123456789aA"
          }
        });

        const mailOptions = {
          from: "gotripwt@gmail.com", // sender address
          to: `${foundObject.email}`, // list of receivers
          subject: "Password Gotrip", // Subject line
          html: `${reset_link}` // plain text body
        };
        transporter.sendMail(mailOptions, function(err, info) {
          if (err) console.log(err);
          else console.log(info);
        });
        //~~~~~~~~~~~~~~~~~~~~~end~~~~~~~~~

        foundObject.save(function(err, updatedObject) {
          if (err) {
            console.log(err);
            res.status(500).send();
          } else {
            res.json({ status: 200, message: "email sent sucessfully" });
          }
        });
      }
    }
  });
};

exports.send_password = function(req, res) {
  console.log("working");
  console.log(req.body.email);
  User.findOne({ email: req.body.email }, function(err, foundObject) {
    if (err) {
      res.status(500).send();
    } else {
      if (!foundObject) {
        {
          res.json({ message: "not found" });
        }
      } else {
        console.log(foundObject);

        //~~~~~~~~~~~~~~~~~~~~node mailer
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "gotripwt@gmail.com",
            pass: "123456789aA"
          }
        });

        const mailOptions = {
          from: "gotripwt@gmail.com", // sender address
          to: "muzammilafsar@gmail.com", // list of receivers
          subject: "Password Gotrip", // Subject line
          html: `${foundObject.password}` // plain text body
        };
        transporter.sendMail(mailOptions, function(err, info) {
          if (err) console.log(err);
          else console.log(info);
        });
        //~~~~~~~~~~~~~~~~~~~~~end~~~~~~~~~

        {
          res.json({ message: "Sent Successfully" });
        }
      }
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
        if (req.body.firstname) {
          foundObject.personal_details.firstname = req.body.firstname;
        }
        if (req.body.lastname) {
          foundObject.personal_details.lastname = req.body.lastname;
        }
        if (req.body.middlename) {
          foundObject.personal_details.middlename = req.body.middlename;
        }
        if (req.body.address_line1) {
          foundObject.personal_details.address_line1 = req.body.address_line1;
        }
        if (req.body.address_line2) {
          foundObject.personal_details.address_line2 = req.body.address_line2;
        }
        if (req.body.city) {
          foundObject.personal_details.city = req.body.city;
        }
        if (req.body.state) {
          foundObject.personal_details.state = req.body.state;
        }
        if (req.body.pincode) {
          foundObject.personal_details.pincode = req.body.pincode;
        }
        if (req.body.dob) {
          foundObject.personal_details.dob = req.body.dob;
        }
        if (req.body.mobile) {
          foundObject.mobile = req.body.mobile;
        }
         if (req.body.profile) {
          foundObject.profile = req.body.profile;
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

exports.checktoken = function(req, res) {
  User.findOne({ reset_token: req.body.reset_token }, function(err, obj) {
    if (err) {
      res.status(500).send();
    } else {
      if (!obj) {
        res.json({ status: 400, message: "invalid or expired link" });
      } else {
        res.json({ status: 200, message: "valid link" });
      }
    }
  });
};
exports.reset_password = function(req, res) {
  console.log("working", req.body.password);
  User.findOne({ reset_token: req.body.reset_token }, function(
    err,
    foundObject
  ) {
    if (err) {
      res.status(500).send();
    } else {
      if (!foundObject) {
        res.status(404).send();
      } else {
        foundObject.password = req.body.password;
        foundObject.reset_token = "";

        foundObject.save(function(err, updatedObject) {
          if (err) {
            res.status(500).send();
            console.log(err);
          } else {
            res.json({ status: 200, message: "password reset sucessfull" });
          }
        });
      }
    }
  });
};

exports.upgrade = function(req, res) {
 
  // console.log("working",req.body.password);
  User.findOne({ email: req.params.email }, function(err, foundObject) {
    if (err) {
      res.status(500).send();
    } else {
      
      if (!foundObject) {
        res.status(404).send();
      } 
      else {

        if (req.body.role) {
          foundObject.role=req.body.role;

          foundObject.save(function(err, updatedObject) {
            if (err) {
              res.status(500).send(err);
              // console.log(err);
            } else {
              res.json({ status: 200, message: "Role Updated" });
            }
          });
        }
      }
    }
  });
};

