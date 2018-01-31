exports.run = (client, message) => {
  message.channel.send("Restarting...").then(m=>{
  console.log("Rebooting...");
    m.edit("Restarted successfully.");
  }).then(ms=>process.exit());
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  botOwnerOnly: true,
  aliases: ["shutdown", "reboot","r"],
  permits: []
}

exports.help = {
  name: "restart",
  desc: "Restart the bot.",
  extended: "Exit the bot's process and restart it.",
  usage: "restart"
}