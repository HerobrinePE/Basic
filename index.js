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


client.on("message", message =>{
  if(message.channel.type === "dm"){
    if(message.author.bot) return;
    const bed = new RichEmbed()
    .setTitle("DMs")
    .setDescription("A User Dmed the bot")
    .setColor("RANDOM")
    .setAuthor(message.author.username)
    .addField(`${message.author.tag} sent`, `${message.content}`)
    .setFooter("copy id below if needed "+message.author.id)
    client.channels.get(`742961125607342181`).send(bed).then(m=>{m.channel.send(message.author.id)})
    
    }
})

client.on("message", message => {
  if (message.channel.type === "dm") {
    if (message.content.startsWith("+off")) return off()
    function off(){
      if (!message.author.id == "475435277444186114") return message.reply("no");
      message.reply("killing process for 1 mins")
client.destroy(process.env.TOKEN)
    setTimeout(()=>{
      client.login(process.env.TOKEN)
var guildList = client.guilds.array();
        try {
            guildList.forEach(guild => guild.defaultChannel.send("Client Updated as a server counter protocol if you see this message ignore it it will bot happen again"));
        } catch (err) {
            console.log("Could not send message to " + guild.name);
        }
      }, ms("1m"))

    }
    
  }
});
