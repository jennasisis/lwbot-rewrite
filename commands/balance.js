module.exports.run = (client, message, args, currency) => {
    Reflect.defineProperty(currency, `getBalance`, {
        value: function getBalance(id) {
            const user = currency.get(id);
            return user ? user.balance : 0;
        },
    });

    const target = message.mentions.users.first() || message.author;
    return message.channel.send(`${target.tag} has **${currency.getBalance(target.id)} Kowoks**`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [`bal`, `money`, `$`],
    permLevel: `User`
};

exports.help = {
    name: `balance`,
    description: `Shows user balance`,
    usage: `balance [user]`,
    category: `Currency`
};