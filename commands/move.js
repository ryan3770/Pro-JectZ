const moves = require("../data/moves.js").BattleMovedex;

exports.run = (client, message, args) => {
    let moveName = message.content.split(" ").slice(1).join(" ").replace(/ /g, "");
    let move = moves[moveName];
    if (!move) {
        for (var i = 0; i < Object.keys(moves).length; i++) {
            if (moves[Object.keys(moves)[i]].num == moveName) {
                move = moves[Object.keys(moves)[i]];
                break;
            }
        }
    }
    if (!move) {
        for (var i = 0; i < Object.keys(moves).length; i++) {
            if (moves[Object.keys(moves)[i]].name.toLowerCase() == moveName) {
                move = moves[Object.keys(moves)[i]];
                break;
            }
        }
    }
    if (move) {
        moveName = move.name;
        var descString;
        if (move.desc) {
            descString = move.desc;
        } else {
            descString = move.shortDesc;
        }
        var accuracyString;
        if (move.accuracy == true) {
            accuracyString = "Certain Success";
        } else {
            accuracyString = move.accuracy;
        }
        var viableString;
        if (move.isViable) {
            viableString = "Yes";
        } else {
            viableString = "No";
        }
        var targetString;
        if (move.target == "normal") {
            targetString = "One Enemy";
        } else {
            targetString = client.capFL(move.target.replace(/([A-Z])/g, ' $1'));
        }
        var crystalString;
        if (move.isZ) {
            crystalString = client.capFL(move.isZ.substring(0, move.isZ.length - 1)) + " Z";
        } else {
            crystalString = "None";
        }
        var embedObject = new client.Discord.RichEmbed({
            title: client.capFL(move.name),
            color: client.randomColor,
            fields: [{
                    name: "Description",
                    value: descString
                },
                {
                    name: "Type",
                    value: move.type,
                    inline: true
                },
                {
                    name: "Base Power",
                    value: move.basePower,
                    inline: true
                },
                {
                    name: "PP",
                    value: move.pp,
                    inline: true
                },
                {
                    name: "Category",
                    value: move.category,
                    inline: true
                },
                {
                    name: "Accuracy",
                    value: accuracyString,
                    inline: true
                },
                {
                    name: "Priority",
                    value: move.priority,
                    inline: true
                },
                {
                    name: "Target",
                    value: targetString,
                    inline: true
                }
            ],
            footer: {
                text: "#" + move.num
            }
        });
        if (crystalString != "None") embedObject.addField("Z-Crystal", crystalString, true);
      embedObject.setThumbnail(client.user.avatarURL);
        message.channel.send({embed: embedObject});
    }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  botOwnerOnly: false,
  aliases: ['moves'],
  permits: [],
};

exports.help = {
  name: 'move',
  desc: 'Get info on a move.',
  extended: "Shows full competitive data on a move.",
  usage: 'move [move]'
}; 