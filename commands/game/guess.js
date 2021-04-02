const ms = require("ms");
const fs = require("fs");
const points = JSON.parse(fs.readFileSync("./points.json", "utf8"));
module.exports = {
  name: "guess",
  run: (client, message, args, MessageEmbed) => {
    if (args[0] == "points") {
      let bed = new MessageEmbed()
        .setTitle("Points")
        .setColor("random")
        .setFooter(
          message.author.tag,
          "https://pbs.twimg.com/profile_images/1279843865327882240/f2rPqLsm.jpg"
        )
        .setDescription(
          `${message.author} you currently have ${points[message.author.id].points} Dumbass points`
        );
      message.channel.send(bed);
    }else
    play();
    function play() {
      message.delete(5000);
      let obj = `🟩`;
      let obj2 = `🟥`;
      let a = obj;
      let b = obj;
      let c = obj;
      let d = obj;
      let grid = `${a}${a}${a}===${b}${b}${b}===${c}${c}${c}===${d}${d}${d}
${a}${a}${a}===${b}${b}${b}===${c}${c}${c}===${d}${d}${d}
${a}${a}${a}===${b}${b}${b}===${c}${c}${c}===${d}${d}${d}
    1️⃣                 2️⃣                 3️⃣                  4️⃣

`;
      message.channel.send("answer one highlighted in red\n" + grid).then(x => {
        game();
        let gameData = [];
        function game() {
          setTimeout(() => {
            let sel = Math.floor(Math.random() * 7);
            console.log(sel + " ____");
            if (sel === 0 || sel === 4) {
              gameData.push("1");
              a = obj2;
              grid = `${a}${a}${a}===${b}${b}${b}===${c}${c}${c}===${d}${d}${d}
${a}${a}${a}===${b}${b}${b}===${c}${c}${c}===${d}${d}${d}
${a}${a}${a}===${b}${b}${b}===${c}${c}${c}===${d}${d}${d}
    1️⃣                 2️⃣                 3️⃣                  4️⃣

`;
              x.edit(grid).then(() => {
                setTimeout(() => {
                  react();
                  x.edit("which one was highlighted red");
                }, 500);
              });
            } else if (sel == 1 || sel === 5) {
              gameData.push("2");
              b = obj2;
              grid = `${a}${a}${a}===${b}${b}${b}===${c}${c}${c}===${d}${d}${d}
${a}${a}${a}===${b}${b}${b}===${c}${c}${c}===${d}${d}${d}
${a}${a}${a}===${b}${b}${b}===${c}${c}${c}===${d}${d}${d}
    1️⃣                 2️⃣                 3️⃣                  4️⃣

`;
              x.edit(grid).then(() => {
                setTimeout(() => {
                  x.edit("which one was highlighted red");
                  react();
                }, 500);
              });
            } else if (sel === 2 || sel === 6) {
              gameData.push("3");
              c = obj2;
              grid = `${a}${a}${a}===${b}${b}${b}===${c}${c}${c}===${d}${d}${d}
${a}${a}${a}===${b}${b}${b}===${c}${c}${c}===${d}${d}${d}
${a}${a}${a}===${b}${b}${b}===${c}${c}${c}===${d}${d}${d}
    1️⃣                 2️⃣                 3️⃣                  4️⃣

`;
              x.edit(grid).then(() => {
                setTimeout(() => {
                  x.edit("which one was highlighted red");
                  react();
                }, 500);
              });
            } else if (sel === 3 || sel === 7) {
              gameData.push("4");
              d = obj2;
              grid = `${a}${a}${a}===${b}${b}${b}===${c}${c}${c}===${d}${d}${d}
${a}${a}${a}===${b}${b}${b}===${c}${c}${c}===${d}${d}${d}
${a}${a}${a}===${b}${b}${b}===${c}${c}${c}===${d}${d}${d}
    1️⃣                 2️⃣                 3️⃣                  4️⃣
`;
              x.edit(grid).then(() => {
                setTimeout(() => {
                  x.edit("which one was highlighted red");
                  react();
                }, 500);
              });
            }
            function embed() {
              let bed = new MessageEmbed()
                .setTitle("Points")
                .setColor("random")
                .setFooter(
                  message.author.tag,
                  "https://pbs.twimg.com/profile_images/1279843865327882240/f2rPqLsm.jpg"
                )
                .setDescription(
                  `${message.author} you now have ${points[message.author.id].points} Dumbass points`
                );
              message.channel.send(bed);
            }
            function react() {
              message.channel
                .awaitMessages(m => m.author.id == message.author.id, {
                  max: 1,
                  time: ms("10s")
                })
                .then(collected => {
                  if (collected.first().content.toLowerCase() == gameData[0]) {
                    message.reply("correct +1 dumbass point");
                    if (!points[message.author.id])
                      points[message.author.id] = {
                        points: 0
                      };
                    points[message.author.id].points++;
                    fs.writeFile(
                      "./points.json",
                      JSON.stringify(points),
                      err => {
                        if (err) console.log(err);
                      }
                    );
                    gameData.splice(0, gameData.length);
                    setTimeout(() => {
                      play();
                    }, 5000);
                  } else {
                    message.reply("Naaaaaaaaa ");
                    gameData.splice(0, gameData.length);
                    embed();
                  }
                })
                .catch(() => {
                  message.reply("why must you go");
                  gameData.splice(0, gameData.length);
                  embed();
                });
            }
          }, 3000);
        }
      });
    }
  }
};
