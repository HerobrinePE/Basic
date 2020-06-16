const { RichEmbed } = require("discord.js");
module.exports = {
  name: "kick",
  aliases: ["K", "k"],
  category: "mod",
  description: "Kicks User",
  usage: "${prefix}kick @{mention} {reason}",
  run: (cli, message, args) => {
    message.delete();
    let kmtn = message.guild.member(
      message.mentions.users.first() || message.guild.members.get(args[0])
    );
    if (!kmtn) return message.channel.send("please ping user");
    let reason = args.join(" ").slice(22);
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message
        .reply("You don't have the required permissions to use this command.")
        .then(m => m.delete(5000));
    if (kmtn.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "This user has an unbannable position please remove that position and try again"
      );
    let embed = new RichEmbed()
      .setTitle("KICK")
      .setThumbnail(
        "https://cdn.glitch.com/34219f89-5da9-4107-b722-a71edf79699b%2Ftenor%20(2).gif?v=1590628414092"
      )
      .setDescription(`${message.author} kicked ${kmtn}`)
      .setColor("RANDOM")
      .addField(
        `this user`,
        "<@" +
          `${kmtn.id}` +
          ">" +
          ` got kicked for ` +
          reason +
          " \n *kicked* in the channel: " +
          message.channel
      )
      .setFooter("Kicked user id " + `${kmtn.id}`);
    let Kchannel = message.guild.channels.find("name", "punishments");
    if (!Kchannel)
      return message.channel
        .send("Can't find channel so a channel will be created")
        .then(() => {
          message.guild.createChannel("punishments", "channel");
          message.channel.send("channel created now re run command");
        });
    message.guild.member(kmtn).kick(reason);
    Kchannel.send(embed);
  }
};
