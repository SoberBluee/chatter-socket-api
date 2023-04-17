var firebaseConfig = require("../firebase-config");
var firebase = require("firebase/app");
var { getDatabase, set, ref, push, child } = require("firebase/database");

function sendMessage(messageData, firebaseApp) {
    const database = getDatabase(firebaseApp);

    const userId = 1;
    const message = messageData.body.message;
    const user_sender_id = 1;
    const user_reciever_id = 2;

    const message_id = push(child(ref(database), "messages")).key;
    console.log(
        message_id,
        userId,
        message,
        user_sender_id,
        user_reciever_id,
        database
    );

    set(
        ref(database, "messages/" + message_id, {
            userId,
            message,
            user_sender_id,
            user_reciever_id,
        })
    );
    console.log("message has sent");
    console.log("Message Data: ", messageData);
}

module.exports = { sendMessage };
