const { RichEmbed } = require("discord.js");
const api = require("covidapi");
api.settings({
  baseUrl:
    "https://disease.sh" | "https://api.caw.sh" | "https://corona.lmao.ninja"
});
let __R__ = "#FF0000";
let __ERROR__ = "#8B0000";
module.exports = {
  name: "covid",
  aliases: ["corona", "covid19", "c-19"],
  category: "Covid",
  description: `${process.env.PREFIX}covid country to get your country's data or ${process.env.PREFIX}covid (world, worldwide) to get world data`,
  run: async (client, message, args) => {
    let msg = message.content.split(" ").slice(1);
    let r = msg.join(" ");
    let usr = message.author;
    let m = r
    if (!r) return error();
    if (m.toLowerCase() === "world") {
      all();
    } else if (m.toLowerCase() === "worldwide") {
      all();
    } else {
      other();
    }
    function all() {
      api.all().then(val => {
        console.log(val);
        const bed = new RichEmbed()
          .setColor(__R__)
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
    }
    function error() {
      const errorbed = new RichEmbed()
        .setColor(__ERROR__)
        .setTitle(`⚠️It seems ive ran into an error⚠️`)
        .setDescription(
          `information for **${r.toUpperCase()}** hasnt been found please make sure its spelt correctly or a valid country `
        );
      message.channel.send(errorbed);
    }

    function other() {
      api.countries({ country: m.toLowerCase() }).then(val => {
        if (!val.countryInfo) return error();
        let embed = new RichEmbed()
          .setThumbnail(val.countryInfo.flag)
          .setTitle(
            "☣Covid " +
              `[${val.country}] [${val.countryInfo.iso2}] [${val.countryInfo.iso3}] ` +
              "☣"
          )
          .setColor(__R__)
          .addField("Api Updates Per Usage", val.updated)
          .addField("Population", val.population)
          .addField("Cases Today", val.todayCases)
          .addField("Total Cases", val.cases)
          .addField("Test Done", val.tests)
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
