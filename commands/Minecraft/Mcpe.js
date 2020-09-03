const ping = require("mcpe-ping-fixed");
const { RichEmbed } = require("discord.js");

module.exports = {
  name: "mcpeserver",
  run: (client, message, args) => {
    let mc = args[0];
    let port = args[1];
    if (!args[0])
      return message.channel.send("You must type a minecraft server ip");
    if (!args[1])
      return message.channel.send("You must type a minecraft server port");
    let int = parseInt(port);
    ping(mc, { port: int }, (err, res) => {
      if (err) return error && console.log(err);
      function error() {
        const M = new RichEmbed().setdescription(err);
        message.channel.send(M);
      }
      console.log(res)
      const bed = new RichEmbed()
      .setTitle("MCPE Server "+ mc + " " + port)
      .addField("Game Type", res.game)
      .addField("Players Online", res.currentPlayers)
      .addField("MAX players", res.maxPlayers)
      if(res.connected == true){ 
      bed.addField("Server Stats", "Online="+res.connected+"  [🟢]")
        message.channel.send(bed)
    }
    });
  }
};
