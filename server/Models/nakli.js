"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NakliSchema = new Schema({
 

  origin_airport: {
    type: String
  },
  
  destination_airport: {
    type: String
  },
 
 
  total_price: {
    type: Number
  },
  booking_id:{type:Number,
      default:102030
  },
  date:String
});

module.exports = mongoose.model("Naklis", NakliSchema);
