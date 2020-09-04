const { RichEmbed } = require("discord.js");
const api = require("covidapi");
api.settings({
  baseUrl:
    "https://disease.sh" | "https://api.caw.sh" | "https://corona.lmao.ninja"
});
module.exports = {
  name: "c19",
  description: `${process.env.PREFIX} country to get country data or ${process.env.PREFIX} world to get world data`,
  run: async (client, message, args) => {
    let msg = message.content.split(" ").slice(1);
    let m = msg.join(" ");
    let usr = message.author;
    if (args[0] == "world") {
      api.all().then(val => {
        const bed = new RichEmbed()
          .setTitle("☣Covid WorldWide☣")
          .addField("Updated", val.updated)
          .addField("Cases Today", val.todayCases)
          .addField("Total Cases", val.cases)
          .addField("Deaths", val.deaths)
          .addField("Deaths Today", val.todayDeaths)
          .addField("Recoveries", val.recovered)
          .addField("Recoveries today", val.todayRecovered)
          .addField("Active", val.active)
          .addField(
            "Coding NodeJS",
            "package used on this command [covidapi](https://www.npmjs.com/package/covidapi)"
          );
        message.channel.send(bed);
      });
    }

   let countries =  api.countries({ country: m.toLowerCase() }).then(val => {
      let embed = new RichEmbed()
        .setThumbnail(val.countryInfo.flag)
        .setTitle("☣Covid "+`[${val.country}] [${val.countryInfo.iso2}] [${val.countryInfo.iso3}] `+"☣")
        .addField("Updated", val.updated)
        .addField("Cases Today", val.todayCases)
        .addField("Total Cases", val.cases)
        .addField("Deaths", val.deaths)
        .addField("Deaths Today", val.todayDeaths)
        .addField("Recoveries", val.recovered)
        .addField("Recoveries today", val.todayRecovered)
        .addField("Active", val.active)
        .addField(
          "Coding NodeJS",
          "package used on this command [covidapi](https://www.npmjs.com/package/covidapi)"
        );
      message.channel.send(embed);
      console.log(val);
    });
  }
};
