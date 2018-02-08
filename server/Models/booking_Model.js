"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FlightSchema = new Schema({
  departs_at: String,
  arrives_at: {
    type: String
  },

  origin_airport: {
    type: String
  },
  origin_terminal: Number,
  destination_airport: {
    type: String
  },
  destination_terminal: Number,
  operating_airline: String,
  flight_number: Number,
  aircraft: String,

  travel_class: {
    type: String,
    enum: ["ECONOMY", "BUSINESS"],
    default: 'ECONOMY'
  },
  total_price: {
    type: Number
  },
  no_of_passengers: {
    type: Number
  },

  total_fare_flight: {
    type: Number
  },
  tax: Number,
  flight_cancellation: {
    refundable: { type: Boolean, default: true },
    cancel_penalties: { type: Boolean, default: true },
    cancel_charge: { type: Number, default: 2500 }
  },
  go_cancellation: {
    refundable: { type: Boolean, default: true },
    cancel_penalties: { type: Boolean, default: true },
    cancel_charge: {
      type: Number,
      default: 300
    }
  },

  vas: {
    coupon_used: { type: Boolean, default: false },
    coupon_code: { type: String, default: "null" },
    food: {
      type: Boolean,
      default: false
    },
    food_category: {
      type: String,
      enum: ["Vegetarian", "Non-Vegetarian"],
      default: "Vegetarian"
    },
    pickup_and_drop: {
      type: Boolean,
      default: false
    },
    cancel_insurance:{
      type:Boolean,
      default:false
    },
    travel_insurance:{
      type:Boolean,
      default:false
    },
    addons_ammount:{
      type:Number,
      default: 0
    }
  },

  status: {
    type: String,
    
    default: "Scheduled"
  },
  gross_total: Number,
  alternate_email: {
    type: String
  },
  mobile: {
    type: Number,
    default: 123
  },
  email: {
    type: String
  },
  other_email: {
    type: String,
    default: "null"
  },
  booking_id: {
    type: Number,
    default: 1020340,
  },
  cancelled:{
    type: Boolean,
    default:false
  },
  passenger_list:{
    type:Array
  },
  booking_type:{
    type:String,
    enum: ["OneWay", "RoundTrip","Multicity"],
    default:'OneWay',
  },
  guest:{
    type:Boolean,
    default: false
  },
  user_email:{
    type:String,
    default:""
  },
  pnr:{type:String,
    
  }
});

module.exports = mongoose.model("Flights", FlightSchema);
