const api = require("covidapi");
const facts = require("covid-facts");
const canvas = require("canvas");
const random = facts.random();
const { MessageAttachment } = require("discord.js");
api.all().then(console.log);
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
  description: `${process.env.PREFIX}covid country to get your country's data or ${process.env.PREFIX}covid (world, worldwide) to get world data or ${process.env.PREFIX}covid {fact, facts} to get random facts about covid`,
  run: async (client, message, args, MessageEmbed) => {
    let msg = message.content.split(" ").slice(1);
    let r = msg.join(" ");
    let usr = message.author;
    let m = r;
    if (!r) return message.reply("Please Type in a country name");

    async function test(val) {
      const cvs = canvas.createCanvas(920, 200);
      const ctx = cvs.getContext("2d");
      const bg = await canvas.loadImage(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDTj4pJ5sQ5d-JNg9EnkrmsD6IauVmghb5fg&usqp=CAU"
      );
      ctx.drawImage(bg, 0, 0, cvs.width, cvs.height);
      const avatar = await canvas.loadImage(val.countryInfo.flag);
      ctx.drawImage(avatar, 0, 0, 300, cvs.height);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 32px sans-serif";
      ctx.fillText(
        `${val.countryInfo.iso2} |Population: ${val.population}|
Cases: ${val.cases}    |Today: ${val.todayCases}|
Deaths: ${val.deaths}    |Today: ${val.todayDeaths}|
Recoveries: ${val.recovered} 
Active: ${val.active}
`,
        312,
        30
      );
      const ach = new MessageAttachment(cvs.toBuffer(), "result.png");
      message.channel.send(random, ach);
    }
    if (m.toLowerCase() === "global") {
      api.all().then(async val => {
        const can = canvas.createCanvas(800, 280);
        const ctx = can.getContext("2d");
        const globe = await canvas.loadImage(" ")
        ctx.drawImage(globe ,0,0,300,300)
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 32px sans-serif";
        ctx.fillText("text", 300, 50);
        const attach = new MessageAttachment(can.toBuffer(), "global.png");
        message.channel.send(random, attach);
      });
    } else if (r.toLowerCase() === "fact") {
      fact();
    } else if (r.toLowerCase() === "facts") {
      fact();
    } else {
      other();
    }
    function error() {
      const errorbed = new MessageEmbed()
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
        test(val);
      });
    }
    function fact() {
      var allFacts = facts.all;
      var randomFact = facts.random();
      const fEmbed = new MessageEmbed()
        .setTitle("📖Random Covid-19 Facts📖")
        .setDescription("==\n" + randomFact + "\n==")
        .setColor("RANDOM")
        .addField(
          "Coding NodeJS\nModule/Package used to generate the facts",
          "[covid-facts](https://www.npmjs.com/package/covid-facts)"
        );
      message.channel.send(fEmbed);
    }
  }
};
