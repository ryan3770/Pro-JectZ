exports.run = (client, message, args) => {
  let server = "";
  if (args[0]) server = args[0].toLowerCase();
  if (server != "red" && server != "blue" && server != "yellow") return message.reply("Please specify a valid PRO server.");
  
  const colors = {"red": 0xFF0000, "blue": 0x0000FF, "yellow": 0xFFFF00}
  
  client.request.get('https://pokemon-revolution-online.net/guildladder.php',(error, response, body) => {
    if (error || response.statusCode == 404) console.log(error);
    else { 
    client.tabletojson.convertUrl('https://pokemon-revolution-online.net/guildladder.php', function(res)
    {
      // table
      let table = {};
      table.red = res[1];
      table.blue = res[3];
      table.yellow = res[5];
      
      const embed = new client.Discord.RichEmbed();
      
      // arrays
      let ranks = ["Rank", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      names = [];
      let leaders = [];
      let pvp = [];
      function pushArray (array, number) {
        for (var i=0; i<11; i++) array.push(table[server][i][number]);
      }
      pushArray (names, 2);
      pushArray (leaders, 3);
      pushArray (pvp, 4);
      pvp[0] = "PvP Rating";
      //
      const longest = (array) => array.reduce((long, str) => Math.max(long, str.length), 0);
      let msg = `#${server.toUpperCase()} Guild Ranking\n\n`;
      for (var i = 0; i<11; i++) {
        msg = msg + `${ranks[i]}${' '.repeat(longest(ranks) - ranks[i].length)}  ${names[i]}${' '.repeat(longest(names) - names[i].length)}  ${leaders[i]}${' '.repeat(longest(leaders) - leaders[i].length)}  ${pvp[i]}${' '.repeat(longest(pvp) - pvp[i].length)}\n`;
      }
      embed.setDescription(`\`\`\`md\n\n${msg}\`\`\``)
        .setThumbnail(client.user.avatarURL)
        .setColor(colors[server]);
      message.channel.send(embed.description);
    });
    }
  });
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  botOwnerOnly: false,
  aliases: ['gl'],
  permits: []
}

exports.help = {
  name: "guildladder",
  desc: "Show the ladder of PRO guilds.",
  extended: "Show the server ladder of specified PRO server.",
  usage: "guildladder <server>"
}