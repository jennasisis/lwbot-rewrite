const base64 = require(`base-64`);
const utf8 = require(`utf8`);

module.exports.run = (client, message, args) => {
    if (args[0] === `decode`) {
        try {
            message.channel.send(`What would you like to decode? [10 seconds]`)
                .then(() => {
                    message.channel.awaitMessages(response => (response.content.startsWith(``)), {max: 1, time: 10000, errors: [`time`]})
                        .then((collected) => {
                            var bytes = base64.decode(collected.first().content);
                            var decoded = utf8.decode(bytes);
                            message.channel.send(decoded);
                        })
                        .catch(() => {
                            message.channel.send(`:x: **Timed out**`);
                        });
                });
        } catch (err) {message.channel.send(`:x: **Error during decoding**`);}
    } else if (args[0] === `encode`) {
        message.channel.send(`What would you like to encode? [10 seconds]`)
            .then(() => {
                message.channel.awaitMessages(response => (response.content.startsWith(``)), {max: 1, time: 10000, errors: [`time`]})
                    .then((collected) => {
                        var bytes = base64.encode(collected.first().content);
                        var encoded = utf8.encode(bytes);
                        message.channel.send(encoded);
                    })
                    .catch(() => {
                        message.channel.send(`:x: **Timed out**`);
                    });
            });
    } else {
        message.channel.send(`:x: **Unrecognized argument.** Must be \`encode\` or \`decode\`.`);
    }
};

exports.conf = {
    enabled: true,
    aliases: [`b64`],
    guildOnly: false,
    permLevel: `User`
};

exports.help = {
    name: `base64`,
    description: `Encodes or decodes base64`,
    usage: `base64 <encode | decode>\n(New message) <text to encode or decode>`,
    category: `Misc`
};