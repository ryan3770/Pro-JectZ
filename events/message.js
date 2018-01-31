exports.run = (client, message) => {
  if (message.author.bot) return;
  
  if (message.channel.type === "dm" && !message.content.startsWith(client.config.prefix)) client.users.get(client.config.botOwner[0]).send({embed: {title: message.author.username, description: message.content, color: client.randomColor}});
  
  // points moniter
  client.pointsMoniter = () => {
    if (message.channel.type != "text") return;
    if (message.content.startsWith(client.config.prefix)) return;
    const score = client.points.get(message.author.id) || {points: 0, level: 0};
    score.id = message.author.id;
    score.points++;
    const curLevel = Math.floor(0.1 * Math.sqrt(score.points));
    if (score.level < curLevel && score.level != 100) {
      message.channel.send(client.config.lvlUpMsg.replace("<user>", "<@" + message.author.id + ">").replace("<level>", score.level + 1));
      score.level++;
    }
    client.points.set(message.author.id, score);
  }
  client.pointsMoniter();
  
  // returns
  if (!message.content.startsWith(client.config.prefix)) return;
  
  // defines
  client.footer = client.user.username, message.client.user.avatarURL;
  
  // func
  function contains(array, string) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === string) return true;
  }
}
  
  // handler
  let command = message.content.toLowerCase().split(" ")[0].slice(client.config.prefix.length);
  let args = message.content.split(" ").slice(1);
  let cmd;
  if (client.commands.has(command)) cmd = client.commands.get(command);
  else if (client.aliases.has(command)) cmd = client.commands.get(client.aliases.get(command));
  else return;
  
  if (cmd.conf.botOwnerOnly && !contains(client.config.botOwner, message.author.id)) return message.reply("This command can only be used by bot owner.");
  
  if (!cmd.conf.enabled) return message.reply("This command is disabled.");
  if (cmd.conf.guildOnly && message.channel.type != "text") return message.reply("This command can only be used in server.");
  cmd.run(client, message, args);
}