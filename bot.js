const Discord = require("discord.js");
const fs = require("fs");
const ayarlar = require('./ayarlar.json');
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./komutlar/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Hiçbir komut bulunamadı!");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./komutlar/${f}`);
    console.log(`${f} yüklendi!`);
    bot.commands.set(props.help.name, props);
  });

});

bot.on("ready", async () => {
  console.log(`${bot.user.username} ${bot.guilds.size} sunucuda aktif!`);

  bot.user.setActivity("t!yardım yazarak botun komutlarına bakabilirsiniz", {type: "WATCHING"});
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = "t!";
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
})

bot.login("NTEwODA2MTkzMDQwNzg1NDQ4.DtGLew.ZDYzuJPIHC49LBpsO1hOU1dMsaM")
