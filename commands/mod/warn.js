
const Discord = require("discord.js");

const fs = require("fs");

const ms = require("ms");

let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
module.exports = {
 name:"warn",
  aliases: ["wn"], 
  category: "mod", 
  description: "warns🔨 User", 
  usage: "${prefix}warn @{mention} {reason}", 
  run: async (cli, message, args,) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("No can do pal!");

  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])

  if(!wUser) return message.reply("Couldn't find them yo");

  if(wUser.hasPermission("ADMINISTRATOR")) return message.reply("They waaaay too kewl");

  let reason = args.join(" ").slice(22);


  if(!warns[wUser.id]) warns[wUser.id] = {

    warns: 0

  };


  warns[wUser.id].warns++;


  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {

    if (err) console.log(err)

  });


  let warnEmbed = new Discord.RichEmbed()

  .setDescription("Warns")

  .setAuthor(message.author.username)

  .setColor("#fc6400")

  .addField("Warned User", `<@${wUser.id}>`)

  .addField("Warned In", message.channel)

  .addField("Number of Warnings", warns[wUser.id].warns)

  .addField("Reason", reason);


  let warnchannel = message.guild.channels.find(`name`, "punishments");

  if(!warnchannel) return message.reply("Couldn't find channel");


  warnchannel.send(warnEmbed);


  if(warns[wUser.id].warns == 3){


    message.guild.member(wUser).kick(reason)

    message.channel.send(`<@${wUser.id}> has been kicked`);


 

  if(warns[wUser.id].warns == 4){

    message.guild.member(wUser).ban(reason);

    message.reply(`<@${wUser.id}> has been banned.`)

  }


}

}


