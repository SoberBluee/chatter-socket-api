var express = require("express");
var config = require("../firebase-config");
var router = express.Router();

var { firebaseApp } = require("../app");

var messageController = require("../controllers/MessageController");

/* GET home page. */
router.get("/firebase", (request, response, next) => {
    console.log("config: ", config);
    const firebaseconfig = config;
    return response.json({
        config: firebaseconfig,
    });
});

router.post("/messages/set-message", (request, response, next) => {
    const messageData = {
        head: request.headers,
        body: request.body,
    };
    messageController.sendMessage(messageData, firebaseApp);
    response.json({ message: "message sent" });
});

module.exports = router;
