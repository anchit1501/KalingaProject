var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RecommendationSchema = new Schema({
  image: String,
  source: String,
  destination: String,
  r_code: String,

});

module.exports = mongoose.model("Recommendations", RecommendationSchema);
