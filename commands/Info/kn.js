module.exports = {
    name: "kill",
    category: "Info",
    run: async (client, msg, args) => {
    if(message.author.id == "475435277444186114") return message.reply("Only owner can use this")
        msg.channel.send("Turning off please wait")
            msg.reply("Loop ended").then(()=>{
client.destroy()
process.exit()
client.login(process.env.TOKEN)})
}
}
