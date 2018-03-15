module.exports.run = async (client, message, args, currency) => {
    require(`sqlite3`);
    require(`sqlite`);
    require(`sequelize`);
    const config = require(`../config.json`);
    const PREFIX = config.prefix;
    const input = message.content.slice(PREFIX.length).trim();
    if (!input.length) return;
    const [, commandArgs] = input.match(/(\w+)\s*([\s\S]*)/);
    const { Users, CurrencyShop } = require(`../data/dbObjects`);
    const item = await CurrencyShop.findOne({ where: { name: { $like: commandArgs } } });
    if (!item) return message.channel.send(`:x: **That item doesn't exist.**`);
    if (item.cost > currency.getBalance(message.author.id)) {
        return message.channel.send(`:x: You currently have \`${currency.getBalance(message.author.id)}\`, but the ${item.name} costs ${item.cost} Kowoks!`);
    }
    
    const user = await Users.findByPrimary(message.author.id);
    currency.add(message.author.id, -item.cost);
    await user.addItem(item);
    
    message.channel.send(`You've bought: ${item.name}.`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: `User`
};

exports.help = {
    name: `buy`,
    description: `Buy an item from the shop`,
    usage: `buy <item>`,
    category: `Currency`
};