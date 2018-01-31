const sets = require('../data/sets.js').BattleSets;

exports.run = (client, message, args) => {
  let mon = message.content.toLowerCase().split(" ").slice(1).join(" ").replace(/ /, "-");
  sets(client, mon, "sm", set => {
    if (set.error) {
    console.error(set.error);
    return message.reply(set.error);
    }
    const embed = new client.Discord.RichEmbed();
    for (var i = 0; i < set.length; i++) {
      let x = set[i];
      const getmove = (num) => x.moveslots[num - 1].map(data=>data).join("/");
      let evdata = "";
      function getev(stat) {
        if (x.evconfigs[0][stat]) evdata = evdata + String(x.evconfigs[0][stat]) + ` ${stat} / `;
      }
      getev("hp");
      getev("atk");
      getev("def");
      getev("spa");
      getev("spd");
      getev("spe");
      evdata = evdata.slice(0, evdata.length - 3);
      
      embed.addField(x.name, `\`\`\`Move 1: ${getmove(1)}\nMove 2: ${getmove(2)}\nMove 3: ${getmove(3)}\nMove 4: ${getmove(4)}\`\`\`**Item**: ${x.items.map(data=>data).join("/")}\n**Ability**: ${x.abilities.map(data=>data).join("/")}\n**Nature**: ${x.natures.map(data=>data).join("/")}\nEVs: ${evdata}`);
      if (i != set.length - 1) embed.addBlankField();
    }
    embed.setTitle(client.capFL(mon) + " Smogon Set")
      .setColor(client.randomColor)
      .setThumbnail("https://play.pokemonshowdown.com/sprites/bwani/" + args[0].toLowerCase() + ".gif")
      .setFooter("Smogon.com", client.user.avatarURL)
      .setTimestamp();
      
    message.channel.send({embed});
  });
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  botOwnerOnly: false,
  aliases: ['sets', 'build'],
  permits: []
}

exports.help = {
  name: "set",
  desc: "Get a moveset of a Pokemon.",
  extended: "Shows all Smogon build/moveset for the specified Pokémon.",
  usage: "set <pokemon>"
}