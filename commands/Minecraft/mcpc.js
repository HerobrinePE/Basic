const mcpc = require("minecraft-server-util");
const { RichEmbed } = require("discord.js");

module.exports = {
  name: "mcserver",
  category: "Minecraft",
  run: (client, message, args) => {
    let mc = args[0];
    let port = args[1];
    if (!args[0])
      return message.channel.send("You must type a minecraft server ip");
    if (!args[1])
      return message.channel.send("You must type a minecraft server port");
    let int = parseInt(port);
    mcpc
      .ping(mc, { port: int }) // port is optional, defaults to 25565
      .then(response => {
        console.log(response);
        const bed = new RichEmbed()
          .setTitle("MC Server ")
          .addField(` ${mc}`, `  ${int}`)
          .addField("version Type", response.version)
          .addField("Players Online", response.onlinePlayers)
          .addField("MAX players", response.maxPlayers);
        message.channel.send(bed);
      })
      .catch(error => {
        errr();

        function errr() {
          const M = new RichEmbed().setdescription(error);
          message.channel.send(M);
        }
      });
  }
};
