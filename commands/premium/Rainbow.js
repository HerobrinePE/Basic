const ms = require("ms")
const fs = require("fs")
let {premium} = JSON.parse(fs.readFileSync("./config.json", "utf8"))
module.exports = {
	name: "rrole",
  aliases: ["rainbow"],
	category: "premium",
	description: "***PREMIUM MEMBERS*** Changes role color to rainbow",
	run: (client, message, args)=>{    
  
    
    let ge = args[0]
    let mc=args[1]
    if(!mc) return message.reply("select a time 4s or above remember leave a space between selections")
    let t = args[2]
    if(!t) return message.reply("time stamps can be s/m/h/d and leave space while selecting time")
    let rRole= message.guild.roles.find("name", ge)
    if(!rRole) return message.reply("role not found")
    try{
      if(mc < 4){
        message.reply("4 seconds or above")
      }
      if(mc >= 4){
              message.channel.send(ge+" role has been set to rainbow role with "+ms(ms(mc+t)) + " interval")
role()
      }
      function role(){
      var colors = ["#FF2E00","#00FF20","#00FFCF","#0014FF","#FF00B3","#FF7500"]
      var random = colors[Math.floor(Math.random() * colors.length)]
      setInterval(() =>{
        role()
        rRole.edit({
            color: random
        })
    }, ms(mc+t));
      }
    }catch(error){
      message.guild.channels.find("name", "errorlogs").send(error+"01=^^")
    }
    
  }
}
