module.exports = {
    name: "clear",
    aliases: ["cls", "purge"],
    category: "mod",
    description: "Bulk deletes",
    usage: "${prefix}clear {amount}",
    run: (cli, message, args) => {
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("permission denied")
  if(!args[0]) return message.channel.send("how much shall i delete?");
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(5000));
  });
}
}
