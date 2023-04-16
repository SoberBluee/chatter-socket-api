var express = require("express");
var config = require("../firebase-config");
var router = express.Router();

/* GET home page. */
router.get("/firebase", (request, response, next) => {
  console.log("config: ", config);
  const firebaseconfig = config;
  return response.json({
    config: firebaseconfig,
  });
});

router.get("/firebase-config", (request, response, next) => {
  return response.json({
    data: "123",
  });
  console.log("config: ", this.firebaseConfig);
  const config = this.firebaseConfig;
  return response.json({
    config: config,
  });
});

module.exports = router;
