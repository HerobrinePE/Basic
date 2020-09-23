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
      RedditSimple.RandomPost(meme).then(res => {
        let val = res[0];
        const bex = new RichEmbed()
            .setColor("RANDOM")
            .setImage(val.data.url)
            .setTitle("from " + val.data.subreddit_name_prefixed)
            .setURL(val.data.url);
          message.channel.send(bex);
      }).catch(e=>{ 
      const bex = new RichEmbed()
          .setTitle("OOPS")
      .setColor("#FF6000")
          .setDescription(`your search **${meme}** was not found error because of {${e}}`)
          message.channel.send(bex)

      })
    } else {
      const random = subReddits[Math.floor(Math.random() * subReddits.length)];
      RedditSimple.RandomPost(random)
        .then(res => {
          let val = res[0];
          console.log(val);
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
  }
};
