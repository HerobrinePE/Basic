const {RichEmbed} = require("discord.js")
const track = require("covid19-stats")
module.exports = {
  name: "covid",
  category:"Covid",
  run: async(client, message, args) => {
    let msg = message.content.split(" ").slice(1)
    if(!msg) return message.reply("Please type in your country's name")
    let m = msg.join(" ")
    console.log(m.toUpperCase())
    let covid = await track.getCountry(m.toUpperCase())
    if (!covid) return message.reply("country not found")
    console.log(covid)
    const bed = new RichEmbed()
    .setTitle("Covid Tracker")
    .addField("Country", covid.country)
    .addField("Total Cases", covid.totalCases)
    .addField("New Cases", covid.newCases)
    .addField("Total Deaths", covid.totalDeaths)
    .addField("New Deaths", covid.newDeaths)
    message.channel.send(bed)
  }
};
