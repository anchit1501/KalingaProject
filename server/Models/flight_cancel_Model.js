var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var admin = express();

var cancelSchema = new Schema({
  
    refundable: Boolean,
    cancel_penalties: Boolean,
    cancel_charge: {
      type: Number,
      default: 300
    },
    
    
    updated_at:Date.now(),
    
    updated_by:String
    
  
});
