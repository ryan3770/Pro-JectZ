exports.run = (client, message, args) => {

  let m = message.mentions.users.first();
  if (!m) return message.reply("Mention someone to use this command.");
  
  let n = parseInt(args[0]);
  if (!n) return message.reply("Invalid amount specified.");
  
  let reason = message.content.split(" ").slice(3).join(" ");
  if (!reason) reason = "Reason: Unknown";
  
  let s = client.points.get(m.id);
  s.points += n;
  client.users.get(m.id).send(`You have been awarded ${n} xp by ${message.author.tag} for *${reason}*.`);
  return message.reply(`Awarded ${n} points to ${m.tag}.`);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  botOwnerOnly: true,
  aliases: [],
  permits: []
}

exports.help = {
  name: 'awardxp',
  desc: "Award someone xp.",
  extended: "Award yourself or someone else xp.",
  usage: 'awardxp <amount> <mention> [reason]'
}