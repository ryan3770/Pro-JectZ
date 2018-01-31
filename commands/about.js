exports.run = (client, message) => {
  message.channel.send({embed: new client.Discord.RichEmbed()
    .setTitle("Click here to join my support server.").setURL (client.config.supportServer)
    .setColor(client.randomColor)
    .setAuthor(client.footer)
    .setFooter(client.user.id, client.user.avatarURL)
    .setTimestamp()
    .setThumbnail(client.user.avatarURL)
    .setDescription(`A Discord.js Bot for PRO.\n`)
    .addField("Presence", `${client.guilds.size} Servers\n${client.channels.size} Channels\n${client.users.size} Users`)
    .addField("Statistics", `DiscordJs v${client.Discord.version} | NodeJs ${process.version}`)
    .addField("Bot Owners", client.config.botOwner.map(i=>client.users.get(i).tag).join("\n"))
    .addField("Bot Invite", "[Click here to invite the bot to your server](" + client.config.botinvite + ")")
  });
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  botOwnerOnly: false,
  aliases: ['stats', 'botinfo', 'invite', 'binfo'],
  permits: []
}

exports.help = {
  name: "about",
  desc: "Get info on bot.",
  extended: "Get stats and official server invite of the bot.",
  usage: "about"
}