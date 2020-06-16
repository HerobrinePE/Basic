const { RichEmbed } = require("discord.js");
const rembed = new RichEmbed()

module.exports = {
	name: "emoji",
  aliases: ["e"],
	category: "Info",
	description: "returns user img as emoji",
	run: (client, message, args)=>{
    message.delete(2000)
	 let mtn = message.mentions.users.first()
     if(!mtn) return message.reply("please mention user")
        rembed.setThumbnail(mtn.avatarURL)
         message.channel.send(rembed)
	}
}
