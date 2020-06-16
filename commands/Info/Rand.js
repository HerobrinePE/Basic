module.exports = {
    name: "rand",
    category: "Info",
    description: "returns a random interger of your number",
    run: async (client, message, args) => {
let text = args[0]
if(!text) return message.reply("choose a number")
if(isNaN(text)) return message.channel.send(`${text} `+"is not a number (letters are not accepted)")
if(!isNaN(text))
var math = Math.floor(Math.random() * text)
message.channel.send(`your random value ${math}`)

    }
}
