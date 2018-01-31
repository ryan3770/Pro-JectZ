exports.run = (client, message, args) => {
  let server = "";
  if (args[0]) server = args[0].toLowerCase();
  if (server != "red" && server != "blue" && server != "yellow") return message.reply("Please specify a valid PRO server.");
  
  const colors = {"red": 0xFF0000, "blue": 0x0000FF, "yellow": 0xFFFF00}
  
  client.request.get('https://pokemon-revolution-online.net/ladder.php',(error, response, body) => {
    if (error || response.statusCode == 404) console.log(error);
    else { 
    client.tabletojson.convertUrl('https://pokemon-revolution-online.net/ladder.php', function(res)
    {
      // table
      let table = {};
      table.red = res[1];
      table.blue = res[13];
      table.yellow = res[7];
      
      const embed = new client.Discord.RichEmbed();
      
      // arrays
      let ranks = ["Rank", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"],
      names = [];
      let user = [];
      let wins = [];
      let losses = []
      
      function pushArray (array, number) {
        for (var i=0; i<26; i++) array.push(table[server][i][number]);
      }
      pushArray (names, 1);
      pushArray (user, 2);
      pushArray (wins, 3);
      pushArray (losses, 4);
      wins[0] = "Wins";
      losses[0] = "Losses";
      
      function wlPercent(win,loss){
        if(win != "Wins" && loss != "Losses"){
          win = parseInt(win)
          loss = parseInt(loss)
          let total = win + loss;
          let percent = win/total
          percent *=100
          return percent.toFixed(0) + "%"
        }
        return "Win Percent"
      }
      const longest = (array) => array.reduce((long, str) => Math.max(long, str.length), 0);
      let msg = `#${server.toUpperCase()} User Ranking\n\n`;
      for (var i = 0; i<26; i++) {
        msg = msg + `${ranks[i]}${' '.repeat(longest(ranks) - ranks[i].length)}  ${names[i]}${' '.repeat(longest(names) - names[i].length)}  ${user[i]}${' '.repeat(longest(user) - user[i].length)}  ${wins[i]}${' '.repeat(longest(wins) - wins[i].length)}  ${losses[i]}${' '.repeat(longest(losses) - losses[i].length)}  ${wlPercent(wins[i],losses[i])}\n`;                                 
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
  aliases: ['l'],
  permits: []
}

exports.help = {
  name: "userladder",
  desc: "Show the ladder of PRO users.",
  extended: "Show the user ladder of specified PRO server.",
  usage: "userladder <server>"
}