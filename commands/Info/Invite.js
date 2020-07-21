const cdt = 86400;
const cd = new Set();
module.exports = {
  name: "tinvite",
  category: "Info",
  run: async (client, message, args) => {
    if (cd.has(message.author.id)) {
      message.reply(
        "This command is on cooldown please wait 1 day to get another invite link"
      );
    } else {
      send();
    }
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      cd.add(message.author.id);
    }
    var t = setTimeout(function() {
      cd.delete(message.author.id);
    }, cdt * 1000);
    async function send() {
      try {
        let invite = await message.channel
          .createInvite({
            maxAge: 86400,
            maxUses: 0
          })
          .catch();
        message.reply(`${invite}`);
      } catch (err) {
        const { RichEmbed } = require("discord.js");
        const embed = new RichEmbed()
          .setTitle("Error")
          .setDescription(err)
          .setColor("RANDOM");
        message.reply(embed);
        console.log(err);
      }
    }
  }
};
