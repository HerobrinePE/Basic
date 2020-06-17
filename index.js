const { Client, Collection, RichEmbed } = require("discord.js");
const fs = require("fs");
let prefix= "+"
require("events").EventEmitter.defaultMaxListeners = 100;
const client = new Client({
  disableEveryone: true
});
client.login(process.env.TOKEN);
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.on("guildMemberAdd", member => {
  const guild = client.guilds.get("472128849417601036");
  var memberCount = guild.members.filter(member => !member.user.bot).size;
  var memberCountChannel = client.channels.get("710145974093348964");
  memberCountChannel.setName(`${memberCount} members!`);
});

client.on("guildMemberRemove", member => {
  const guild = client.guilds.get("472128849417601036");
  var memberCount = guild.members.filter(member => !member.user.bot).size;
  var memberCountChannel = client.channels.get("710145974093348964");
  memberCountChannel.setName(`${memberCount} members!`);
});

client.on("ready", async function() {
  var list = [
    `Use my Prefix ${process.env.PREFIX}`,
    `On ${client.guilds.size} servers `
  ];
  setInterval(function() {
    const Exec = Math.floor(Math.random() * list.length);
    client.user.setActivity(list[Exec], { type: "STREAMING" });
fs.writeFile("./text.txt", "&@&@×9×292822€2€€", (err)=>{
if(err) throw(err)
})
    console.log(Exec);
  }, 10000);

  console.log("online"+client.user.tag);
});
client.on("message", message => {
  if (message.content.startsWith("Hello")) {
    message.react("👋");
  }
});
const newUsers = new Collection();
const oldUsers = new Collection();
const w = new RichEmbed();
var c = "Have fun and invite your friends";

client.on("message", async message => {
  const prefix = process.env.PREFIX;
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (command) command.run(client, message, args);
});

var token = require("dotenv");
const embed = new RichEmbed();
client.on("message", message => {
  if (message.content === process.env.PREFIX + "IP")
    var x = message.channel
      .send(`${message.author} your request has been sent to Dms`)
      .then(x => {
        x.react("👍");
        message.author.send(
          `${message.author}`,
          embed.setTitle("Processed"),
          embed.setColor("RANDOM"),
          embed.addField(
            "Server IP and Port",
            "Server IP=rainbowlandsmc.ddns.net\nServer Port=Port: 25576"
          ),
          embed.setDescription("_________________")
        );
      });
});
client.on("message", function(message) {
  if (message.content == process.env.PREFIX + "apk")
    var MCPE = message.channel
      .send(`Request Has been Satisfied ${message.author} Check Your DMS `)
      .then(MCPE => {
        MCPE.react("📩");
        message.author.send(
          `Your request ${message.author}` +
            "\n" +
            "https://rainbowedapks.weebly.com/"
        );
        message.delete();
      });
});
client.on("guildCreate", guild => {
  setTimeout(function() {
    client.delete();
    client.login(process.env.TOKEN);
  }, 3000);
});
client.on("guildDelete", guild => {
  setTimeout(function() {
    client.delete();
    client.login(process.env.TOKEN);
  }, 3000);
});


// server.js
// where your node app starts
// init project
const express = require('express');
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
