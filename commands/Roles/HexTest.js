const {RichEmbed}= require("discord.js")
module.exports = {
	name: "hrole",
  aliases: ["hexrole"],
	category: "Roles",
	description: "***COLOR CHANGE*** Changes role color to a given Hex Color This is just a W.I.P command",
	run: (client, message, args)=>{
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply("You don't have the required permissions to use this command.").then(m => m.delete(5000));
      let text = args[0]
      let ge = args[1]
      if(!text)return message.reply("please specify hex color")
    let rRole= message.guild.roles.find("name", ge)
    if(!rRole) return message.reply("role not found")
    try{
        rRole.edit({
            color: text
        })
        let embed = new RichEmbed()
        .setColor(text)
        .setTitle("role color changed")
        .addField(`${message.author.tag}`, "changed the "+rRole+" color to "+ text )
        message.channel.send(embed)
    }catch(error){
      message.guild.channels.find("name", "errorlogs").send(error+"01=^^")
    }
    
  }
}
