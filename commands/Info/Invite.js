const cd = new Set();
module.exports = {
  name: "tinvite",
  category: "Info",
  run: async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return cd.add(message.author.id)
    if(!cd.has(message.author.id)) return send()
    if(cd.has(message.author.id)) return message.reply("This command is on cooldown please wait 1 day to get another invite link")
    setTimeout(function(){
    cd.delete(message.author.id)
}, 86400)
    async function send(){
      try {
        let invite = await message.channel
          .createInvite({
            maxAge: 86400,
            maxUses: 100
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
