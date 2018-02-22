module.exports.run = (client, message, args) => {
    try {
        if (message.member.hasPermission(`MANAGE_EMOJIS`)) {
            var emojiName = args[0];
            var emojiURL = args[1];

            if (!emojiName) return message.channel.send(`:x: You forgot the emoji name!`);
            if (!emojiURL) return message.channel.send(`:x: You forgot the emoji url!`);

            message.guild.createEmoji(args[1], args[0], null, `${message.author.tag} created emoji ${emojiName}`)
                .then(emote => {
                    message.channel.send(`:white_check_mark: Emote **\`${emote.name}\`** ${emote} created!`);
                })
                .catch((err) => {message.channel.send(`:x: Something went wrong:\n${err}`);});
       
        } else message.channel.send(`:x: Missing Permission: \`Manage Emojis\``);
    } catch (err) {message.channel.send(`:x: Something went wrong: ${err}`);}
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [`aE`],
    permLevel: `User`
};

exports.help = {
    name: `addEmote`,
    description: `Adds an emote to the server`,
    category: `Server`,
    usage: `addEmote <name> <image url>`
};