const fs = require("fs");
const { RichEmbed } = require("discord.js");
let embed = new RichEmbed();

module.exports = {
  name: "premium",
  aliases: ["p"],
  category: "Info",
  run: (client, message, args) => {
    let premium = message.guild.id
    
    fs.writeFile("./config.json", JSON.stringify(premium), err => {
      if (err) console.error(err);
    });
    message.channel.send(message.guild.name + "Now has premium access")
  }
};
