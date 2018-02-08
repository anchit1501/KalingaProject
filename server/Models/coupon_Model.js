var mongoose = require("mongoose");
var Schema=mongoose.Schema;

var CouponSchema= new Schema({
coupon_name:{type:String, unique:true},
coupon_code:{type:String, unique:true},
coupon_value:Number,
desription:{type:String,max:400},
min_booking_amount:Number,
max_discount:Number,
discount_value:Number,
});

module.exports = mongoose.model("Coupons", CouponSchema);