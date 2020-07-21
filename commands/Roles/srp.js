const {RichEmbed} = require("discord.js")
module.exports = {
  name: "setrp",
  category:"Roles",
  description: "Sets Role Permission",
  run: async (client, message, args) => {
    let role = args[0];
    if (!role) return message.reply("no role specified");
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.reply("you gotta has that perms bro");
    let rol = message.guild.roles.find("name", role);
    if (!rol) return message.channel.send("Error Role Not found");
let mes = args[1]
var t = mes.toUpperCase()
    rol.setPermissions(t);
    const embed = new RichEmbed()
    .setTitle("SetPermission")
    .setDescription(`${message.author} has set the ${rol} permission ${t}`)
    .setColor("RANDOM")
    .setFooter(`${t}`)
    message.channel.send(embed)
  }
};
