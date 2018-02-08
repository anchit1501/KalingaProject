var mongoose = require("mongoose");
var Schema=mongoose.Schema;

var PassengerDetailsSchema= new Schema({
    title:String,
    firstname:String,
    lastname:String,
    booking_id:Number,
    pnr:Number

});

module.exports = mongoose.model("Passenger_Details", PassengerDetailsSchema);