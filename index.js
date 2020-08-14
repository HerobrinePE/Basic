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
  if (message.content === process.env.PREFIX + "bot")
    
message.reply(`Here is my invite link`+"\n https://discord.com/api/oauth2/authorize?client_id=606109109837758474&permissions=8&scope=bot")
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

client.on("message", message =>{
  if(message.channel.type === "dm"){
    if(message.author.bot) return;
    const bed = new RichEmbed()
    .setTitle("DMs")
    .setDescription("A User Dmed the bot")
    .setColor("RANDOM")
    .setAuthor(message.author.username)
    .addField(`${message.author.tag} sent`, `${message.content}`)
    .setFooter(message.author.id)
    client.channels.get(`742961125607342181`).send(bed, "Here is the id if needed to respond")
    client.channels.get(`742961125607342181`).send(message.author.id)
    
    }
})
