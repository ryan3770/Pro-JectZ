exports.run = (client, message, args) => {
  let server = args[0].toLowerCase();
  let servers = {
                "red": 0xFF0000,
                "yellow": 0xFFFF00,
                "blue": 0x0000FF
               }
               
  if (server != "red" && server != "blue" && server != "yellow") return message.reply("Can't find server.");
  client.request(`https://pokemon-revolution-online.net/ServerStatus${server[0].toUpperCase()}.php`, function(err, response, body) {
    const embed = new client.Discord.RichEmbed()
  .setDescription(body.split("\">")[1].split("</font>")[0])
  .setTitle(client.capFL(server) + " Server Status")
    .setThumbnail(client.user.avatarURL)
    .setColor(servers[server]);
  return message.channel.send({embed});
});
}

exports.conf = { 
  enabled: true, 
  guildOnly: false, 
  botOwnerOnly: false, 
  aliases: ["status","s"], 
  permits: [] 
}

exports.help = { 
  name: "server", 
  desc: "Get status of a PRO server.", 
  extended: "Get the count of online users of a Pokémon Revolution Online server.", 
  usage: "server <server colour>" 
}

