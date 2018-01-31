exports.run = (client, message) => {
  message.channel.send(message.content.split(" ").slice(1).join(" "));
  message.delete(50);
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  botOwnerOnly: false,
  aliases: [],
  permits: []
}

exports.help = {
  name: "say",
  desc: "Make bot say something.",
  extended: "Make bot say something.",
  usage: "say <message>"
}