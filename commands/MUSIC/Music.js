const ytdl = require("ytdl-core")

module.exports = {
    name: "play",
    category: "MUSIC",
    description: "This is only a beta to see if it works it will only accept urls",
    run: async (client, message, args) => {
       const channel = message.member.voiceChannel;
      if(!channel) return message.reply("please join channel")
      let text = args[0]
      if(!text) return message.reply("Please Input URL")
      let join = ytdl.validateURL(text)
      let info = await ytdl.getInfo(text)
      let connection = await message.member.voiceChannel.join()
      let dispatcher = connection.playStream(ytdl(text, {filter : "audioonly"}))
      message.reply(`playing ${info.title}`)
    }
}
