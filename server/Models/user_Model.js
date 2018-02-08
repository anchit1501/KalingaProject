var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    
  },
  email: {
    type: String,
    required: true,
    unique:true
   
  },
  password: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true,
    
  },
  reset_token:{
    type:String,

  },

  personal_details: {
    title:{ type:String,default:'null'},
    firstname:{ type:String,default:'null'},
    lastname: { type:String,default:'null'},
    middlename: { type:String,default:'null'},
    address_line1: { type:String,default:'null'},
    address_line2: { type:String,default:'null'},
    city: { type:String,default:'null'},
    state: { type:String,default:'null'},
    pincode: { type:Number,default:0},
    dob:{type:String,default:'null'}
  },
  role:{type:String,
    enum:['user','admin','superadmin'],
    default:'user'},

    profile:{type:String,
      default:'null'}
});
module.exports = mongoose.model("Users", UserSchema);
