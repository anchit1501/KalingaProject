var mongoose = require("mongoose");
var Schema=mongoose.Schema;
var InsuranceSchema= new Schema({


insurance_name:String,
insurance_code:{type:Number, unique:'True'},
insurance_value:Number,
insurance_description:String
});

module.exports = mongoose.model("Insurances", InsuranceSchema);