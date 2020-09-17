const { RichEmbed } = require("discord.js");
var weather = require("weather-js");

let __ERROR__ = "#8B0000";
let __BLUE__ = "#00FFFF";
module.exports = {
  name: "weather",
  category: "Weather",
  description: `Some countries like USA or Philippines you need to use your city or state`,
  run: async (client, message, args) => {
    const msg = message.content.split(" ").slice(1);
    const r = msg.join(" ");
    let m = r
    weather.find({ search: m.toLowerCase(), degreeType: "C" }, function( err,result ) {
      if (err) return er()
      let parse = result[0]
      let locate = parse.location
      let current = parse.current
      let forecast = parse.forecast[1]
      console.log(forecast)
      if(!parse) return error()
      console.log(parse)
const wbed = new RichEmbed()
.setTitle(locate.name)
.setDescription(`Located at Lat(${locate.lat}), Long(${locate.long}) Timezone GMT(${locate.timezone})`)
.addField("day", current.day +" "+ current.date)
.addField("Today Temperature in °C", `Current temperature(${current.temperature})°C `+"\n"+`Highest temperature today(${forecast.high})°C`+"\n"+`Lowest temperature(${forecast.low})°C`)
.addField("Current status", current.skytext)
.addField("Todays status", forecast.skytextday)
.addField("Precipitation", forecast.precip+"mm")
.setColor(__BLUE__)
.addField("Humidity", current.humidity+"%")
.setThumbnail(current.imageUrl)
message.channel.send(wbed)
      function er(){
        const errorbed = new RichEmbed()
          .setColor(__ERROR__)
          .setTitle(`⚠️It seems ive ran into an error⚠️`)
          .setDescription("Error {" + err + "}");
        message.channel.send(errorbed);
      }

      function error() {
        const errorbed = new RichEmbed()
          .setColor(__ERROR__)
          .setTitle(`⚠️It seems ive ran into an error⚠️`)
          .setDescription(
            `information for **${m.toUpperCase()}** hasnt been found please make sure its spelt correctly or a valid country `
          );
        message.channel.send(errorbed);
      }
    });
  }
};
