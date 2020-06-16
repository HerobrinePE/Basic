module.exports = {
  name: "dm",
  aliases: ["a"],
  category: "dm",
  description: "dm",
  run: (client, message, args) => {
    
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You cant access this")
    
    
  let usr = message.mentions.users.first()
  if(!usr) return message.reply("please mention user")
  let text = message.content.split(" ").slice(2)
  if(!text) return message.reply("Cant do that")
    usr.send(text.join(" "))
  }
}
