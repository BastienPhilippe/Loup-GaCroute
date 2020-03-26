const Discord = require("discord.js");
const fs = require("fs");

const bot = new Discord.Client();

const Game = require("./game");

const VOICE_CHANNEL_ID = "690316072808874171";
const GUILD_ID = "690316072808874167";
const VILLAGE_ID = "690316072808874170";

function getTavern() {
  return bot.channels.fetch(VOICE_CHANNEL_ID);
}

bot.on("ready", () => {
  console.log("ready");
});
bot.on("message", (message) => {
  if (message.channel.id === VILLAGE_ID && message.content === "!start") {
    new Game(message.guild, message.channel);
  }
});

let rawdata = fs.readFileSync(".secret.json");
let loginId = JSON.parse(rawdata);

bot.login(loginId);
