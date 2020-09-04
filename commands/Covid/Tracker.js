const { RichEmbed } = require("discord.js");
const api = require("covidapi");
api.settings({
  baseUrl:
    "https://disease.sh" | "https://api.caw.sh" | "https://corona.lmao.ninja"
});
module.exports = {
  name: "covid",
  description: `${process.env.PREFIX}covid country to get your country's data or ${process.env.PREFIX}covid world to get world data`,
  run: async (client, message, args) => {
    let msg = message.content.split(" ").slice(1);
    let m = msg.join(" ");
    let usr = message.author;
    let r = args[0];
    if (r.toLowerCase() == "world") {
      api.all().then(val => {
        console.log(val);
        const bed = new RichEmbed()
          .setTitle("☣Covid WorldWide☣")
          .addField("API Updates per usage", val.updated)
          .addField("Earths Population", val.population)
          .setColor("#FF0000")
          .addField("Cases Today", val.todayCases)
          .addField("Total Cases", val.cases)
          .addField("Deaths", val.deaths)
          .addField("Deaths Today", val.todayDeaths)
          .addField("Recoveries", val.recovered)
          .addField("Recoveries today", val.todayRecovered)
          .addField("Test Done", val.tests)
          .addField("Active", val.active)
          .addField("Critical Condition", val.critical)
          .addField(
            "Coding NodeJS",
            "package used on this command [covidapi](https://www.npmjs.com/package/covidapi)"
          );
        message.channel.send(bed);
      });
    } else {
      let countries = api.countries({ country: m.toLowerCase() }).then(val => {
        let embed = new RichEmbed()
          .setThumbnail(val.countryInfo.flag)
          .setTitle(
            "☣Covid " +
              `[${val.country}] [${val.countryInfo.iso2}] [${val.countryInfo.iso3}] ` +
              "☣"
          )
          .addField("Api Updates Per Usage", val.updated)
          .addField("Population", val.population)         
          .addField("Cases Today", val.todayCases)
          .addField("Total Cases", val.cases)
          .addField("Deaths", val.deaths)
          .addField("Deaths Today", val.todayDeaths)
          .addField("Recoveries", val.recovered)
          .addField("Recoveries today", val.todayRecovered)
          .addField("Active", val.active)
        .addField("Critical", val.critical)
          .addField(
            "Coding NodeJS",
            "package used on this command [covidapi](https://www.npmjs.com/package/covidapi)"
          );
        message.channel.send(embed);
        console.log(val);
      });
    }
  }
};
