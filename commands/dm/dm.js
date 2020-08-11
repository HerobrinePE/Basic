module.exports = {
  name: "dm",
  aliases: ["a"],
  category: "dm",
  description: "dm",
  run: (client, message, args) => {
    let owner = "475435277444186114";
    let ids = message.author;
    if (!ids.id == owner) {
      return error();
    } else return send();
    function error() {
      const { RichEmbed } = require("discord.js");
      const b = new RichEmbed()
        .setTitle("Owners only command")
        .setDescription("only <@" + owner + "> has access to thos command")
        .setFooter("Thank you");
      message.reply(b);
    }
    function send() {
      let usr = message.mentions.users.first();
      if (!usr) return message.reply("please mention user");
      let text = message.content.split(" ").slice(2);
      if (!text) return message.reply("Cant do that");
      usr.send(text.join(" "));
    }
  }
};


