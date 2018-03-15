module.exports.run = async (client, message, args, currency) => {
    const config = require(`../config.json`);
    const PREFIX = config.prefix;
    const input = message.content.slice(PREFIX.length).trim();
    if (!input.length) return;
    const [, commandArgs] = input.match(/(\w+)\s*([\s\S]*)/);
    const currentAmount = currency.getBalance(message.author.id);
    const transferAmount = commandArgs.split(/ +/g).find(arg => !/<@!?\d+>/g.test(arg));
    const transferTarget = message.mentions.users.first();
    
    if (!transferAmount || isNaN(transferAmount)) return message.channel.send(`Sorry ${message.author}, that's an invalid amount.`);
    if (transferAmount > currentAmount) return message.channel.send(`Sorry ${message.author}, you only have ${currentAmount}.`);
    if (transferAmount <= 0) return message.channel.send(`Please enter an amount greater than zero, ${message.author}.`);
    
    currency.add(message.author.id, -transferAmount);
    currency.add(transferTarget.id, transferAmount);
    
    return message.channel.send(`Successfully transferred ${transferAmount} Kowoks to ${transferTarget.tag}. Your current balance is ${currency.getBalance(message.author.id)} Kowoks 💰`);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [`pay`],
    permLevel: `User`
};

exports.help = {
    name: `transfer`,
    description: `Transfer Kowoks to another user`,
    usage: `transfer <amount> <user>`,
    category: `Currency`
};