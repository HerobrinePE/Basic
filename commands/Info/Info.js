const { RichEmbed } = require("discord.js");
module.exports = {
  name: "botinfo",
  run: (client, message, args) => {
    var b = new RichEmbed()
    .setTitle("Info")
    .setDescription("Rainbowlands is a bot which inspired by Rainbowed a Minecraft Youtuber with over 40k+ Subscribers")
    .addField("Rainbowed was the Main Inspiration for this bot being created\n if you like Minecraft go check out", "[Rainbowed](https://www.youtube.com/c/Rainbowed) on Youtube")
    .addField("\n Main Developer", "[HerobrinePE](https://www.youtube.com/c/HerobrinePE)")
    .addField("\n Secondary Developer", "[Herobrina Briggs](https://www.youtube.com/channel/UCAXPslFRk1MOYPq9U1YJZPg)")
    .addField("In Collaboration with", "[Cloud Developers](https://discord.gg/w5fDZ3W)")
    .addField("And", " [Orange Group](https://discord.gg/q39C4Sj) the creator of [Orange Echo Stable](https://discordapp.com/oauth2/authorize?client_id=714001186897788934&scope=bot&permissions=2146958847)")
    .addField("Devs Discord name", "Orange Group#5362, HerobrinePE#2365, Rainbowed#2261, Herobrina#3229, NC_Legend#2147, Skies#8245, Reverse#0001, chrhol#5015")
    .addField("For help and Support", "(Click Here)[https://discord.gg/HBSX4t9]")
    .setFooter(`Command called by ${message.author.username}`)
    message.channel.send(b)
  }
};
