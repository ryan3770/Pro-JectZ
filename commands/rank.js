exports.run = (client, message) => {

  let m = message.mentions.users.first();
  if (!m) m = message.author;
  
  if (m.bot) return message.reply("Bots do not have rank.");
  if (!client.points.get(m.id)) return message.reply("This user do not have any points.");
  
  let score = client.points.get(m.id);
  const embed = new client.Discord.RichEmbed()
    .setAuthor(m.tag, m.avatarURL)
    .setTitle("Global Rank")
    .setThumbnail(m.avatarURL)
    .setDescription(`:star: EXP: ${score.points}/${Math.pow((score.level + 1) * 10, 2)}`)
    .addField("LEVEL", score.level)
    .setColor(client.randomColor)
    .setFooter("Rank", m.avatarURL)
    .setTimestamp();
  return message.channel.send({embed});
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  botOwnerOnly: false,
  aliases: ['xp'],
  permits: []
}

exports.help = {
  name: 'rank',
  desc: "Check someone's rank.",
  extended: "Check your or someone else's rank.",
  usage: 'rank or rank <mention>'
}