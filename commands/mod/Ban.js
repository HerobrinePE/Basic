const { RichEmbed } = require("discord.js");
module.exports = {
  name: "ban",
  aliases: ["bn"],
  category: "mod",
  description: "Bans🔨 User",
  usage: "${prefix}ban @{mention} {reason}",
  run: (cli, message, args,) => {
    message.delete();
    let mtn = message.guild.member(
      message.mentions.users.first() || message.guild.members.get(args[0])
    );

    if (!mtn) return message.channel.send("please ping user");
    let reason = args.join(" ").slice(22);
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message
        .reply("You don't have the required permissions to use this command.")
        .then(m => m.delete(5000));
    if (mtn.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "This user has an unbannable position please remove that position and try again"
      );
    let embed = new RichEmbed()
      .setTitle("🔨BAN🔨")
      .setThumbnail("https://cdn.glitch.com/34219f89-5da9-4107-b722-a71edf79699b%2Ftenor%20(1).gif?v=1590628423786")
      .setDescription(`${message.author} banned ${mtn}`)
      .setColor("RANDOM")
      .addField(`the user`,"<@" +`${mtn.id}`+">" +` got banned for ` +reason +  " \n *banned* in the channel: " +message.channel)
      .setFooter("Banned user id🔨 " + `${mtn.id}`);
    let Bchannel = message.guild.channels.find("name", "punishments");
    if (!Bchannel) return message.channel.send("No channel called Punishments, this channel will be made").then(()=>{
      message.reply("return the command again")
              message.guild.createChannel("punishments", "channel")
    })
    message.channel.send(embed)
  message.guild.member(mtn).ban(reason);
    Bchannel.send(embed);
  }
};
