const search = require("youtube-search");
const { RichEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
module.exports = {
  name: "play",
  description: "searches for yt video",
  run: async (client, message, args) => {
    const que = [];
    const opt = {
      seek: 0,
      volume: 2,
      filter : "audioonly"
    };
    const opts = {
      maxResults: 25,
      key: process.env.api,
      type: "video"
    };
    let embed = new RichEmbed()
      .setColor("#73ffdc")
      .setDescription(
        "What Do You wanna search"
      )
      .setTitle("YouTube Search API");
    let embedMsg = await message.channel.send(embed);
try{
    let filter = m => m.author.id === message.author.id;
    let query = await message.channel.awaitMessages(filter, { max: 1 });
    let results = await search(query.first().content, opts).catch(err =>
      console.log(err)
    );
    if (results) {
      let youtubeResults = results.results;
      let i = 0;
      let titles = youtubeResults.map(result => {
        i++;
        return i + ") " + result.title;
      });
      console.log(titles);
      const em = message.channel
        .send({
          embed: {
            title: "Select what you want by typing the number",
            description: titles.join("\n")
          }
        })
        .catch(err => console.log(err));

      filter = m =>
        m.author.id === message.author.id &&
        m.content >= 1 &&
        m.content <= youtubeResults.length;
      let collected = await message.channel.awaitMessages(filter, {
        maxMatches: 1
      });
      let selected = youtubeResults[collected.first().content - 1];

      embed = new RichEmbed()
        .setTitle(`${selected.title}`)
        .setURL(`${selected.link}`)
        .setDescription(
          `${selected.description}` +
            "\n \n" +
            "***NOTE THIS IS A BETA COMMAND SO IT MAY NOT PLAY***Do You Wish To Play or add to Queue"
        )
        .setThumbnail(`${selected.thumbnails.default.url}`);

      message.channel.send(embed).then(embedMsg => {
        embedMsg.react("✅").then(() => embedMsg.react("❌"));

        const filter = (reaction, user) => {
          return (
            ["✅", "❌"].includes(reaction.emoji.name) &&
            user.id === message.author.id
          );
        };

        embedMsg
          .awaitReactions(filter, { max: 1 })
          .then(async collected => {
            const reaction = collected.first();
            const que = [selected.link];
            console.log(que);
            if (reaction.emoji.name === "✅") {
              message.reply("OK");
              try {
                let vc = message.member.voiceChannel;
                if (!vc)
                  return message.reply(
                    "request cannot be confirmed because user is not in a voice channel"
                  );
                let connection = await message.member.voiceChannel.join();
                const stream = ytdl(que[0], opt)
                const disaptcher = connection.playStream(stream)
                message.reply(`playing ${selected.title}`);
              } catch (e) {
                throw e;
              }
            } else {
              message.reply("Ok i will not add to queue");
            }
          })
          .catch(collected => {
            message.reply(
              ` ${collected}`
            );
          });
      });
}
} catch(e){
const er = new RichEmbed()
.setDescription(e.stack)
message.reply(er)
}
    
  }
};
