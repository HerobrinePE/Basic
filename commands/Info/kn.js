module.exports = {
    name: "endloop",
    category: "Info",
    run: async (client, msg, args) => {
    if(!msg.member.hasPermission == "ADMINISTRATOR") return msg.reply("you cant kill this interval")
    msg.channel.send("Turning off please wait")
            msg.reply("Loop ended").then(()=>{ process.exit(1)})
}
}
