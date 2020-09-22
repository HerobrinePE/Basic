const { RichEmbed } = require("discord.js");
const { RedditSimple } = require("reddit-simple");

module.exports = {
  name: "meme",
  category: "Fun",
  description: "Sends an epic meme",
  run: async (client, message, args) => {
    const subReddits = [
      "dankmeme",
      "cursed_meme",
      "meme",
      "me_irl",
      "minecraft",
      "cursed_minecraft"
    ];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];
    RedditSimple.RandomPost(random)
      .then(res => {
        let val = res[0];
        const bex = new RichEmbed()
          .setColor("RANDOM")
          .setImage(val.data.url)
          .setTitle("from " + val.data.subreddit_name_prefixed)
          .setURL(val.data.url);
        message.channel.send(bex);
      })
      .catch(e => {
        console.log(e);
      });
  }
};

