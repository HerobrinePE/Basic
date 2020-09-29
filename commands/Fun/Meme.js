const { RichEmbed } = require("discord.js");
const { RedditSimple } = require("reddit-simple");

module.exports = {
  name: "meme",
  category: "Fun",
  description: "Sends an epic meme",
  run: async (client, message, args) => {
    const subReddits = [
      "dankmeme",
      "meme",
      "me_irl",
      "blursedimages",
      "cursedimages"
    ];
    if (args[0] == "search") {
      let mesg = message.content.split(" ").slice(2);
      let meme = mesg.join(" ");
      RedditSimple.RandomPost(meme)
        .then(res => {
          let val = res[0];
        console.log(val)
          if (val.data.over_18 == true) {
            if (message.channel.nsfw == true) {
              search();
              } else {
              const bed = new RichEmbed()
                .setTitle("❌Warning this is NSFW❌")
                .setDescription("only search this in NSFW channels")
                .setImage(
                  "https://thumbs.dreamstime.com/b/nsfw-icon-not-safe-work-anagram-icon-nsfw-icon-graphic-102160661.jpg"
                )
                .setFooter(message.author.tag);
              message.channel.send(bed);
            }
          }else return search()

          function search() {
            if (val.data.is_video == true)
              return message.channel.send(val.data.url);
            const bex = new RichEmbed()
              .setColor("RANDOM")
              .setTitle("from " + val.data.subreddit_name_prefixed)
              .setURL(val.data.url)
              .setDescription(val.data.title)
              .setImage(val.data.url)
              .setFooter(
                "**NOTE** **if image not available its maybe a URL**",
                val.data.url
              );

            message.channel.send(bex);
          }
        })
        .catch(e => {
          const bex = new RichEmbed()
            .setTitle("OOPS")
            .setColor("#FF6000")
            .setDescription(
              `your search **${meme}** was not found error because of {${e}}`
            );
          message.channel.send(bex);
        });
    } else {
      const random = subReddits[Math.floor(Math.random() * subReddits.length)];
      RedditSimple.RandomPost(random)
        .then(res => {
          let val = res[0];
          if (val.data.is_video == true)
            return message.channel.send(val.data.url);
          const bex = new RichEmbed()
            .setColor("RANDOM")
            .setTitle("from " + val.data.subreddit_name_prefixed)
            .setURL(val.data.url)
            .setDescription(val.data.title)
            .setImage(val.data.url)
            .setFooter(
              "**NOTE** **if image not available its maybe a URL**",
              val.data.url
            );

          message.channel.send(bex);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
