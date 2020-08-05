const { RichEmbed } = require("discord.js");
const fs = require("fs");
let cols = JSON.parse(fs.readFileSync("./color.json", "utf8"));
module.exports = {
  name: "crole",
  aliases: ["hexrole"],
  category: "RoleManagement",
  description: "***COLOR CHANGE*** Changes role color to a given Hex Color",
  run: (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message
        .reply("You don't have the required permissions to use this command.")
        .then(m => m.delete(5000));
    let rRole = message.mentions.roles.first();
    if (!rRole) return message.reply("ERROR 404 role not found");
    let tet = message.content.split(" ").slice(2)
  let text = tet.join(" ")
    const mf = cols[text];
    console.log(mf);
    const mt = text.split("#", 7);
    let mes = mt;

    if (!text)
      return message.reply.toUpperCase("please select random or hex color");
    if (text.startsWith("#")) {
      call();
    } else if (text.startsWith("random")) {
      cal();
    } else if (mf) {
      color();
    } else error();
    function error(){
      const c = new RichEmbed()
      .setTitle("Color Selection error")
      .setDescription("These colors are case sensitive or the color you may have entered is wrong")
      .addField("You can find the colors here" ,"[Hex Codes and color names](https://gist.githubusercontent.com/XDRosenheim/a41490919968338b2a23fe90574d883b/raw/b805478b072ab0cba5d4be74228dd7f00c39dc53/colors.json)")
      .setColor("RANDOM")
      message.reply(c);
      }

    function color() {
      const bet = new RichEmbed()
        .setColor(mf)
        .setTitle("role color changed")
        .setDescription(
          `${message.author.tag} has changed the ${rRole} role to ` + mf
        );
      message.channel.send(bet);
      rRole.edit({
        color: mf
      });
    }
    function cal() {
      try {
        let random = Math.floor(Math.random() * 16777215).toString(16);

        rRole.edit({
          color: random
        });
        let bed = new RichEmbed()
          .setColor(random)
          .setTitle("role color changed")
          .addField(
            `${message.author.tag}`,
            "changed the " + rRole + " color to " + text + "\n" + random
          );
        message.channel.send(bed);
      } catch (err) {
        message.reply(err.stack);
      }
    }
    function call() {
      if (text.length > "7") return message.reply("Must be 6 values in length");
      try {
        rRole.edit({
          color: text
        });
        let embed = new RichEmbed()
          .setColor(text)
          .setTitle("role color changed")
          .addField(
            `${message.author.tag}`,
            "changed the " + rRole + " color to " + text
          );
        message.channel.send(embed);
      } catch (error) {
        message.guild.channels.find("name", "errorlogs").send(error + "01=^^");
      }
    }
  }
};
