exports.run = (client, message, args) => {
const config = require('../config.json');
if(message.author.id !== config.botownerid) return message.reply('you are not my owner!!!'); 
let hyperbeam = message.content.split(" ").slice(1);
let servername = hyperbeam.join(" ");
message.reply('I just left ' + servername);
client.guilds.find('name', servername).leave()
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  botOwnerOnly: true,
  aliases: [],
  permits: []
}

exports.help = {
  name: "leave",
  desc: "yes.",
  extended: ".",
  usage: "leave"
}