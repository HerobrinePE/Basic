const { RichEmbed } = require("discord.js");
let embed = new RichEmbed();

module.exports = {
  name: "avatar",
  aliases: ["a"],
  category: "Info",
  description: "returns an avatar picture",
  run: (client, message, args) => {
  let usr = message.mentions.users.first()
  if(!usr) return message.channel.send(embed.setImage(message.author.avatarURL))
  message.channel.send(embed.setImage(usr.avatarURL));
  }
}
