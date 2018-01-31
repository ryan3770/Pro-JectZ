exports.run = (client, message) => {
  const lb = client.points.map(p=>p).sort((a, b) => b.points>a.points);
  function getUser(p) {
    if (client.users.get(p.id)) return client.users.get(p.id).tag;
    else if (p.id) return p.id;
    else return "Invalid User";
  }
  const embed = new client.Discord.RichEmbed();
  for (var i = 0; i < 9; i++) {
    console.log (lb[i]);
   if (lb[i]) embed.addField("#" + String(i+1) + " " + getUser(lb[i]), `Level ${lb[i].level} | *${lb[i].points} XP*`);
  }
  embed.setTitle("XP Leaderboard")
    .setAuthor(client.footer)
    .setThumbnail(client.user.avatarURL)
    .setFooter("Global Rank LB")
    .setTimestamp()
    .setColor(client.randomColor);
  return message.channel.send({embed});
              
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  botOwnerOnly: false,
  aliases: ['top'],
  permits: []
}

exports.help = {
  name: "xplb",
  desc: "Get a XP Leaderboard.",
  extended: "Sends a XP Leaderboard with Top 10 people.",
  usage: "xplb"
}