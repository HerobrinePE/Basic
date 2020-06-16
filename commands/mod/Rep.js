const { RichEmbed } = require("discord.js");
module.exports = {
  name: "report",
  aliases: ["rep"],
  category: "mod",
  description: "Reports someone",
  usage: "${prefix}report @{mention} {reason}",
  run: (cli, message, args) => {
    message.delete();
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Couldn't find user.");
    let rreason = args.join(" ").slice(22);
    let reportEmbed = new RichEmbed()
    .setDescription("Reports")
    .setColor("#15f153")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", rreason);
    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send("Couldn't find Reports channel so new channel will be created.").then(()=>{
message.guild.createChannel("reports", "channel")
message.reply("channel created now re run command")
})

    reportschannel.send(reportEmbed);
  }
}
