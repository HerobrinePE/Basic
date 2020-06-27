const { Client, Collection, RichEmbed } = require("discord.js");
const fs = require("fs");
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
    `On ${client.guilds.size} servers `,
`A Cloud Partner`
  ];
  setInterval(function() {
    const Exec = Math.floor(Math.random() * list.length);
    client.user.setActivity(list[Exec], { type: "STREAMING" });
    console.log(Exec);
  }, 10000);

  console.log("online  "+client.user.tag);
});
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
      .send(`${message.author} your request`)
      .then(x => {
        x.react("👍");
        message.channel.send(
          `${message.author}`,
          embed.setTitle("Processed"),
          embed.setColor("RANDOM"),
          embed.addField(
            "Server IP and Port",
            "<a:NitroBoost728:709614699041259570><a:Fire:514567641449627648>     Server IP=rainbowevents.us.to     \nServer Port=Port: 25565     <a:NitroBoost728:709614699041259570><a:Fire:514567641449627648>"
          ),
          embed.setDescription("_________________")
        );
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
