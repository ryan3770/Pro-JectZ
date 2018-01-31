const smogon = require("../data/smogon.js");

exports.run = (client, message, args) => {
  let abil = args.join(" ").toLowerCase();
  smogon.SmogonAbilities(client, abil.replace(/ /g, "-"), ability => {
    if (ability.error) return message.reply("Invalid ability specified.");
    const embed = new client.Discord.RichEmbed()
      .setTitle(client.capFL(abil))
      .setDescription(ability.description)
      .setColor(client.randomColor)
      .setThumbnail(client.user.avatarURL)
      .setFooter("AbilityDex", client.user.avatarURL);
    message.channel.send({embed});
  });
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  botOwnerOnly: false,
  aliases: [],
  permits: ['abil']
};

exports.help = {
  name: 'ability',
  desc: 'Get info on an Ability.',
  extended: 'Get description on an Ability.',
  usage: 'ability <ability>'
}