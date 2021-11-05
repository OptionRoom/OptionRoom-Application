const functions = require("firebase-functions");
const {Telegraf} = require('telegraf');

const app = new Telegraf(functions.config().telegram.auth_token);
const telegramChats = functions.config().telegram.chats;

exports.sendNotification = function (channel, message) {
    if (channel === 'telegram') {
        telegramChats.forEach((entry) => {
            app.telegram.sendMessage(entry, message);
        });
    }
};
