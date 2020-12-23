//Set up mongoose connection
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Create schema
var CacheSchema = new Schema(
  {
    title: String,
    count: Number,
    date: Number,
  },
  {
    collection: "caches",
  }
);

module.exports = mongoose.model("Cache", CacheSchema);
