const dex = require("../data/pokedex.js").BattlePokedex;

const embedColours = {
    Red: 16724530,
    Blue: 2456831,
    Yellow: 16773977,
    Green: 4128590,
    Black: 3289650,
    Brown: 10702874,
    Purple: 10894824,
    Gray: 9868950,
    White: 14803425,
    Pink: 16737701
};


exports.run = (client, message, args) => {
    let poke = message.content.split(" ").slice(1).join(" ");
    if (poke.split(" ")[0] == "mega") {
        poke = poke.substring(poke.split(" ")[0].length + 1) + "mega";
    }
    var pokeEntry = dex[poke.replace(/ /g, "")];
    if (!pokeEntry) {
        for (var i = 0; i < Object.keys(dex).length; i++) {
            if (dex[Object.keys(dex)[i]].num == Number(poke)) {
                poke = dex[Object.keys(dex)[i]].species.toLowerCase();
                pokeEntry = dex[poke];
                break;
            }
        }
    }
    if (!pokeEntry) {
        for (var i = 0; i < Object.keys(dex).length; i++) {
            if (dex[Object.keys(dex)[i]].species.toLowerCase() == poke) {
                pokeEntry = dex[Object.keys(dex)[i]];
                break;
            }
        }
    }
    if (pokeEntry) {
        poke = pokeEntry.species;
        var evoLine = "**" + client.capFL(poke) + "**";
        var preEvos = "";
        if (pokeEntry.prevo) {
            preEvos = preEvos + client.capFL(pokeEntry.prevo) + " > ";
            var preEntry = dex[pokeEntry.prevo];
            if (preEntry.prevo) {
                preEvos = client.capFL(preEntry.prevo) + " > " + preEvos;
            }
            evoLine = preEvos + evoLine;
        }
        var evos = "";
        if (pokeEntry.evos) {
            evos = evos + " > " + pokeEntry.evos.map(entry => client.capFL(entry)).join(", ");
            if (pokeEntry.evos.length < 2) {
                var evoEntry = dex[pokeEntry.evos[0]];
                if (evoEntry.evos) {
                    evos = evos + " > " + evoEntry.evos.map(entry => client.capFL(entry)).join(", ");
                }
            }
            evoLine = evoLine + evos;
        }
        if (!pokeEntry.prevo && !pokeEntry.evos) {
            evoLine = evoLine + " (No Evolutions)";
        }
        var typestring = "Type";
        if (pokeEntry.types.length > 1) {
            typestring += "s";
        }
        var abilityString = pokeEntry.abilities[0];
        for (var i = 1; i < Object.keys(pokeEntry.abilities).length; i++) {
            if (Object.keys(pokeEntry.abilities)[i] == 'H') {
                abilityString = abilityString + ", *" + pokeEntry.abilities['H'] + "*";
            } else {
                abilityString = abilityString + ", " + pokeEntry.abilities[i];
            }
        }
        var imagefetch = pokeEntry.num;
        if (imagefetch < 100) {
            imagefetch = "0" + imagefetch;
        }
        if (imagefetch < 10) {
            imagefetch = "0" + imagefetch;
        }
        imagefetch = imagefetch + client.capFL(poke) + ".png";

        

        const dexEmbed = new client.Discord.RichEmbed({
            title: client.capFL(poke).replace(/-/g, " "),
            color: embedColours[pokeEntry.color],
            fields: [{
                    name: typestring,
                    value: pokeEntry.types.join(", "),
                    inline: true
                },
                {
                    name: "Abilities",
                    value: abilityString,
                    inline: true
                },
                {
                    name: "Evolutionary Line",
                    value: evoLine,
                    inline: false
                },
                {
                    name: "Base Stats",
                    value: Object.keys(pokeEntry.baseStats).map(i => i.toUpperCase() + ": **" + pokeEntry.baseStats[i] + "**").join(", ")
                },
                {
                    name: "Height, Weight",
                    value: pokeEntry.heightm + "m" + ", " + pokeEntry.weightkg + "kg",
                    inline: true
                },
                {
                    name: "Egg Groups",
                    value: pokeEntry.eggGroups.join(", ")
                }                
            ],
            thumbnail: {

                url: "http://play.pokemonshowdown.com/sprites/xydex/" + poke.toLowerCase().replace(" ", "-").replace("mega-x", "megax").replace("mega-y", "megay") + ".png"
            },
            footer: {
                text: "#" + pokeEntry.num,
                icon_url: "https://cdn.rawgit.com/msikma/pokesprite/master/icons/pokemon/regular/" + poke.replace(" ", "_").toLowerCase() + ".png"
            }
        });
        dexEmbed.setImage("https://play.pokemonshowdown.com/sprites/xyani/" + poke.toLowerCase().replace(" ", "-").replace("mega-x", "megax").replace("mega-y", "megay") + ".gif");
        message.channel.send({embed: dexEmbed});
    } else {
        message.channel.send("⚠ Dex entry not found! Maybe you misspelt the Pokémon's name?");
    }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  botOwnerOnly: false,
  aliases: ['dex'],
  permits: []
};

exports.help = {
  name: 'pokedex',
  desc: 'Get info on a Pokemon.',
  extended: 'Get complete data on a Pokémon.',
  usage: 'pokedex <pokemon>'
};