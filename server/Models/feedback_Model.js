var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
  username: {
    type: String,
    
  },
  email: {
    type: String,
    required: true
  },
  subject:{
      type:String,
    
  },
  message:{
      type:String,
      min:20,
      max:400,
      required:true
  }
});

module.exports = mongoose.model('Feedbacks', FeedbackSchema);