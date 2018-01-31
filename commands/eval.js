exports.run = (client, message, args) => {
  // defines
  const bot = client.user;
  const guild = message.guild;
  const channel = message.channel;
  const msg = message.content;
  const argss = message.content.split(" ").slice(1).join(" ");
  const author = message.author;
  const member = message.member;
  
  // func
  function dmSend(user, string) {
    client.guilds.get("405360081551753216").members.find("displayName", user).send(string);
    return string;
  }
  
  // checks
  if (!args[0]) return;
  
  // eval
  const clean = text => {
    if (typeof(text) === "string") {
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    }else {
      return text;
    }
  }
  try {
    const code = argss;
    let evaled = eval(code);
    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
    const evalembed = new client.Discord.RichEmbed()
      .setColor(3447003)
      .setAuthor("EVAL", bot.avatarURL)
      .addField("Eval Input", "```" + code + "```")
      .addBlankField()
      .addField("Eval Output", "```" + clean(evaled) + "```");
    message.channel.send({embed: evalembed});
  } catch (err) {
    const errembed = new client.Discord.RichEmbed()
      .setAuthor("EVAL", bot.avatarURL)
      .setColor(0xF44336)
      .addField("Eval Input", "```" + argss + "```")
      .addBlankField()
      .addField("Eval Error", "```" + clean(err) + "```");
    message.channel.send({embed: errembed});
  }
}

exports.conf = { 
  enabled: true, 
  guildOnly: false, 
  botOwnerOnly: true, 
  aliases: ['jsbot'], 
  permits: [] 
}

exports.help = { 
  name: "eval", 
  desc: "Eval a code.", 
  extended: "Run a JavaScript code through the bot.", 
  usage: "eval <code>" }