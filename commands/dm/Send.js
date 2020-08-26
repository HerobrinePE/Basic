module.exports = {
  name: "msg",
  aliases: ["send"],
  category: "dm",
  description: "dm",
  run: (client, message, args) => {
    let owner = message.author;
    let __myId__="475435277444186114"
    let ids = "743615073045708870";
    let role = message.member.roles.has(ids);
    if (!message.member.roles.some(role => role.id === ids)) return error();
    function error() {
      const { RichEmbed } = require("discord.js");
      const b = new RichEmbed()
        .setTitle("Owners only command")
        .setDescription(
          "only <@&" + ids + "> Role has access to this commandor the owner"
        )
        .setFooter("Thank you");
      message.reply(b);
    }
    let usr = args[0];
    if (usr.length == 18) {
      if (!usr) return message.reply("please give id");
      let text = message.content.split(" ").slice(2);
      if (!text) return message.reply("Cant do that");
      client.users.get(usr).send(text.join(" "));
      message.reply("Sent");
    } else return message.reply("not a valid id");
  }
};
