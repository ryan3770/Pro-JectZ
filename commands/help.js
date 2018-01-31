exports.run = (client, message, args) => {
  if (!args[0]) 
{
  const commandNames = Array.from(client.commands.keys()); 
  const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
  const embed = new client.Discord.RichEmbed()
    .setTitle("List Of Commands")
    .setAuthor(client.footer)
    .setDescription(`\`\`\`${client.commands.map(cmd=>`${client.config.prefix}${cmd.help.name}${' '.repeat(longest - cmd.help.name.length)} :: ${cmd.help.desc}`).join("\n")}\`\`\``)
    .setFooter(client.footer)
    .setTimestamp()
    .setColor(client.randomColor);
  message.author.send({embed});
  if (message.channel.type === "text") message.channel.send("Check your Direct Message!");
}
else
{
  let command = client.commands.get(args[0]);
  if (!command) command = client.commands.get(client.aliases.get(args[0]));
  if (!command) return message.reply("Command not found.");
  
  let permits = command.conf.permits.map(p=>p.replace("_", "")).join(" & ");
  if (permits) permits = "Require " + permits;
  else permits = " ";
  if (command.conf.botOwnerOnly) permits = "\nBot Owner Only";
  
  let alias = command.conf.aliases.map(a=>client.config.prefix + a).join(" / ");
  if (!alias) alias = client.config.prefix + command.help.name;
  else alias = client.config.prefix + command.help.name + " / " + alias;
  
  const embed = new client.Discord.RichEmbed()
    .setDescription(`\`${alias}\`\n${command.help.extended}**${permits}**\n`)
    .setColor(client.randomColor)
    .addField("Usage", command.help.usage)
    .setFooter(client.footer)
    .setTimestamp();
  message.channel.send({embed});
}
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  botOwnerOnly: false,
  aliases: ['h'],
  permits: []
}

exports.help = {
  name: "help",
  desc: "Show info on the commands.",
  extended: "Displays a list of all the commands or info on a specific command.",
  usage: "help or help <command>"
}