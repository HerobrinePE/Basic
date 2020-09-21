const { RichEmbed } = require("discord.js");
var weather = require("weather-js");

let __ERROR__ = "#8B0000";
let __BLUE__ = "#00FFFF";
let maps = [];
let nums = []
module.exports = {
  name: "weather",
  category: "weather",
  description: `Some countries like USA or Philippines you need to use your city or state`,
  run: (client, message, args) => {
    const msg = message.content.split(" ").slice(1);
    const r = msg.join(" ");
    let m = r;
    let i = 0;
    weather.find({ search: m.toLowerCase(), degreeType: "C" }, async function(
      err,
      result
    ) {
      if (err) {
        const errorbed = new RichEmbed()
          .setColor(__ERROR__)
          .setTitle(`⚠️It seems ive ran into an error⚠️`)
          .setDescription("Error {" + err + "}");
        message.channel.send(errorbed);
      }
      let parse = result[0];
      for (i in result) {
        let fe = result[i].location.name;
        maps.push(fe + "``` Country Number  [" + i + "] ```");
        nums.push(i)
      }
      if (!parse) {
        const errorbed = new RichEmbed()
          .setColor(__ERROR__)
          .setTitle(`⚠️It seems ive ran into an error⚠️`)
          .setDescription(
            `information for **${m.toUpperCase()}** hasnt been found please make sure its spelt correctly or a valid country `
          );
        message.channel.send(errorbed);
      } else {
        const bes = new RichEmbed()
          .setTitle(
            "all countries in that category Select one by choosing a number"
          )
          .setDescription(maps);
        message.channel.send(bes);
        let filter = m =>
          m.author.id === message.author.id &&
          m.content >= 0 &&
          m.content <= maps.length;
        let collected = await message.channel.awaitMessages(filter, {
          maxMatches: 1
        });

        let f = collected.first().content;
        let base = await result[parseInt(f)];
        if(!base) {
          const be = new RichEmbed()
          .setTitle("❌Selection error❌")
          .setColor(__ERROR__)
          .setDescription("this usually happens when a wrong number is chosen or a word is typed the selection is "+`[${nums}] but you chose [${f}]`)
          message.channel.send(be).then(()=>{
        maps.splice(0, maps.length)
        nums.splice(0, nums.length)
        })
        }

        const locate = base.location;
        let forecast = base.forecast[1];
        let current = base.current;
        console.log(base);
        const wbed = new RichEmbed()
          .setTitle(locate.name)
          .setDescription(
            `Located at Lat(${locate.lat}), Long(${locate.long}) Timezone GMT(${locate.timezone})`
          )
          .addField("day", current.day + " " + current.date)
          .addField(
            "Today Temperature in °C",
            `Current temperature(${current.temperature})°C ` +
              "\n" +
              `Highest temperature today(${forecast.high})°C` +
              "\n" +
              `Lowest temperature(${forecast.low})°C`
          )
          .addField("Current status", current.skytext)
          .addField("Todays status", forecast.skytextday)
          .addField("Precipitation", forecast.precip + "mm")
          .setColor(__BLUE__)
          .addField("Humidity", current.humidity + "%")
          .setThumbnail(current.imageUrl);
        message.channel.send(wbed).then(()=>{
        maps.splice(0, maps.length)
        nums.splice(0, nums.length)
        })
      }
    });
  }
};
