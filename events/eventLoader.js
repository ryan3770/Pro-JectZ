exports.guildCreate = (guild, client) => {
  let ch = client.channels.get(client.config.zlogs)
  if (ch) {
    ch.send({embed: new client.Discord.RichEmbed()
      .setTitle("New Guild Joined")
      .addField("Guild ID", guild.id)
      .setFooter(client.footer)
      .setAuthor(guild.name)
      .setThumbnail(guild.avatarURL)
      .setColor(0x0000FF)
    });
  }
};

exports.guildDelete = (guild, client) => {
  let ch = client.channels.get(client.config.zlogs)
  if (ch) {
    ch.send({embed: new client.Discord.RichEmbed()
      .setTitle("Guild Left")
      .addField("Guild ID", guild.id)
      .setFooter(client.footer)
      .setAuthor(guild.name)
      .setThumbnail(guild.avatarURL)
      .setColor(0xFF0000)
    });
  }
};