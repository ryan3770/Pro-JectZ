exports.run = (client, message) => {
  message.channel.send("Pong?").then(m=>m.edit(`:ping_pong: Pong!\nLatency :blue_heart: ${message.createdTimestamp - m.createdTimestamp} ms | API Latency :blue_heart: ${client.ping} ms`));
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  botOwnerOnly: false,
  aliases: [],
  permits: []
}

exports.help = {
  name: "ping",
  desc: "Ping the bot.",
  extended: "Check the bot's latency and API latency.",
  usage: "ping"
}