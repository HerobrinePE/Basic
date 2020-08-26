const { RichEmbed } = require("discord.js");
module.exports = {
  name: "role",
  category:"Roles",
  description:"Gives someone a role\n server owners can use +role everyone @role to give everyone a role specific role",
  run: (client, message, args) => {
    let guid = message.guild;
    let mem = message.member;
    try {
      if (mem.hasPermission("MANAGE_ROLES")) return send();
      const ms8 = new RichEmbed()
      .setTitle("permissions")
      .setDescription("access denied required perms MANAGE_ROLES")
      .setColor("RANDOM")
      message.channel.send(ms8);
      function send() {
        if (args[0] == "everyone") return check();
        let user = message.mentions.members.first();
        let role = message.mentions.roles.first()
        if(!role) return message.reply("please mention role")
        user.addRole(role);
        const bed = new RichEmbed()
        .setTitle("ROLE ADDED")
        .setDescription(`${message.author} has updated roles for ${user}`)
        .setColor("RANDOM")
        message.channel.send(bed)
        user.send(`Congrats ${user} you have just gotten the ${role.name}`)
        function check() {
          if (message.author.id == guid.owner.id) return everyone();
          function everyone() {
            let role = message.mentions.roles.first() || args[1]
            let my = message.guild.roles.find("name", role)
            if(!my) return message.reply("role not found")
            message.guild.members.forEach(member => {
              member.addRole(role);
            });
            const bed = new RichEmbed()
            .setTitle("Server Updated")
            .setDescription(`${guid.owner} has given the entire server ${role}`)
            .setColor("RANDOM")
            message.channel.send(bed)
          }
          const bed = new RichEmbed()
          .setTitle("Owner Only")
          .setDescription(`only the server owner ${guid.owner} has access to role everyone`)
          message.channel.send(bed);
        }
      }
    } catch (e) {
      const errorbed = new RichEmbed().setDescription(e);
      message.channel.send(errorbed);
    }
  }
};
