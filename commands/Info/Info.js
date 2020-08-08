const { RichEmbed } = require("discord.js");
module.exports = {
  name: "info",
  run: (client, message, args) => {
    var b = new RichEmbed()
    .setTitle("Info")
    .setDescription("Rainbowlands is a bot which is originally inspired by Rainbowed a minecraft youtuber with over 40k+ Subscribers")
    .addField("Rainbowed was the main inspiration for this bot being created\n if you like minecraft go check out", "[Rainbowed](https://www.youtube.com/c/Rainbowed) on Youtube")
    .addField("\n Main Developer", "[HerobrinePE](https://www.youtube.com/c/HerobrinePE)")
    .addField("\n Secondary Developer", "[Herobrina Briggs](https://www.youtube.com/channel/UCAXPslFRk1MOYPq9U1YJZPg)")
    .addField("In collaboration with", "[Cloud Developers](https://discord.gg/w5fDZ3W)")
    .addField("And", " [Orange Echo Stable](https://discordapp.com/oauth2/authorize?client_id=714001186897788934&scope=bot&permissions=2146958847)")
    .addField("Devs Discord name", "Orange Group#5362, HerobrinePE#2365, Rainbowed#2261, Herobrina#3229, NC_Legend#2147, Skies#8245, Reverse#0001, chrhol#5015")
    message.channel.send(b)
  }
};
