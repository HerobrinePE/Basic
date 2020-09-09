const { RichEmbed } = require("discord.js");
var weather = require("weather-js");

let __ERROR__ = "#8B0000";
let __BLUE__ = "#00FFFF";
module.exports = {
  name: "weather",
  category: "weather",
  description: `${process.env.PREFIX}covid country to get your country's data or ${process.env.PREFIX}covid (world, worldwide) to get world data or ${process.env.PREFIX}covid {fact, facts} to get random facts about covid`,
  run: async (client, message, args) => {
    let msg = message.content.split(" ").slice(1);
    let r = msg.join(" ");
    let usr = message.author;
    let m = r;
    weather.find({ search: m, degreeType: "C" }, function(err, result) {
      if (err) {
        error1(err);
      }
      console.log(result)
      let parse = result[0];
      console.log(parse);
      if(!parse) return error()

      const bed = new RichEmbed()
        .setColor(__BLUE__)
        .addField("Location", parse.location.name)
        .addField("Timezone", parse.location.timezone)
      .addField("Day", parse.current.day+" "+parse.current.date)
        .addField(
          "Temperature",
          parse.current.temperature + "°" + parse.location.degreetype
        )
        .addField("Skies/Forecast", parse.current.skytext)
        .addField("Humidity", parse.current.humidity)
      .setThumbnail(parse.current.imageUrl)
      
      message.channel.send(bed);

      function error1() {
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
            `information for **${r.toUpperCase()}** hasnt been found please make sure its spelt correctly or a valid country `
          );
        message.channel.send(errorbed);
      }
    });
  }
};
