//Setup dotevn for Mongo secrets
require("dotenv").config();

// Heroku defines the environment variable PORT, and requires the binding address to be 0.0.0.0
var host = process.env.PORT ? "0.0.0.0" : "127.0.0.1";
var port = process.env.PORT || 8080;

//Use mongoose to access the mongo database for cached results
var mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

// Grab the blacklist from the command-line so that we can update the blacklist without deploying
// again. CORS Anywhere is open by design, and this blacklist is not used, except for countering
// immediate abuse (e.g. denial of service). If you want to block all origins except for some,
// use originWhitelist instead.
var originBlacklist = (process.env.CORSANYWHERE_BLACKLIST || "").split(",");

var mongoDB = process.env.mongo;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  w: "majority",
  family: 4,
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var cors_proxy = require("./lib/cors-anywhere");
cors_proxy
  .createServer({
    originBlacklist: [],
    originWhitelist: [
      "https://boardgamegeek.com",
      "https://www.boardgamegeek.com",
    ],
    requireHeader: [],
    removeHeaders: [
      "cookie",
      "cookie2",
      // Strip Heroku-specific headers
      "x-heroku-queue-wait-time",
      "x-heroku-queue-depth",
      "x-heroku-dynos-in-use",
      "x-request-start",
    ],
    httpProxyOptions: {
      // Do not add X-Forwarded-For, etc. headers, because Heroku already adds it.
      xfwd: false,
    },
  })
  .listen(port, host, function () {
    console.log("Running CORS Anywhere on " + host + ":" + port);
  });
