module.exports = {
  name: "msg",
  aliases: ["send"],
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
      let usr = args[0]
      if(usr.length == 18){
      if (!usr) return message.reply("please give id");
      let text = message.content.split(" ").slice(2);
      if (!text) return message.reply("Cant do that");
      client.users.get(usr).send(text.join(" "));
        }else return message.reply("not a valid id")
    }
  }
};
