var express = require('express'),
  app = express(),
  port = process.env.PORT || 4001;
  mongoose = require('mongoose'),
  Admin = require('./Models/admin_login_Model'),
  User=require('./Models/user_Model'),
  Booking=require('./Models/booking_Model');
  Feedback=require('./Models/feedback_Model');
  Coupon=require('./Models/coupon_Model');
  Nakli=require('./Models/nakli');
  Passenger=require('./Models/passenger_details_Model');
  Recommendation=require('./Models/recommendation_Model');
  Insurance=require('./Models/insurance_Model');
   //created model loading here
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/gotrip');
var db=mongoose.connect('mongodb://mongosql.westus2.cloudapp.azure.com:27017/gotrip',{user:'gotrip',pass:'Welcome123$'});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit:10241024102420,type:'application/json'}));
// app.use(bodyParser({limit: '5mb'}));
// app.use(express.urlencoded({limit: '5mb',extended:true}));


app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Methods","HEAD,GET,POST,PATCH,OPTIONS,PUT,DELETE");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var routes = require('./Routes/Routes'); //importing route
routes(app); //register the route


app.listen(port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

console.log('todo list RESTful API server started on: ' + port);
