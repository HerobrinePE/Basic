const { RichEmbed, MessageAttachment } = require("discord.js");
const generate = require("jimp");
const fs = require("fs");
module.exports = {
  name: "discolor",
  category: "Fun",
  description: "messes with a users image color and discolors it",
  run: async (client, message, args) => {
    let usr = message.mentions.users.first();
    let aut = message.author;
    if (usr) {
      generate.read(usr.avatarURL).then(image => {
        image
          .quality(60)
          .resize(250, 250)
          .normalize()
        .color([
  { apply: 'hue', params: [Math.floor(Math.random() * -100)] },
  { apply: 'lighten', params: [Math.floor(Math.random()*50)] },
  { apply: 'xor', params: [Math.floor(Math.random()*16777215).toString(16)] }
])
          .write("test.png");
        message.channel
          .send(``, { files: ["test.png"] })
          .then(fs.unlink("/test.png"));
      });
    } else {
      await generate
        .read(aut.avatarURL)
        .then(image => {
          image
            .quality(100)
            .resize(250, 250)
      .color([
  { apply: 'hue', params: [Math.floor(Math.random() * -100)] },
  { apply: 'lighten', params: [Math.floor(Math.random()*50)] },
  { apply: 'xor', params: [Math.floor(Math.random()*16777215).toString(16)] }
])
            .write("test.png");
          message.channel
            .send(``, { files: ["test.png"] })
            .then(fs.unlink("/test.png"));
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
