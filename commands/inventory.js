module.exports.run = async (client, message) => {
    const { Users } = require(`../dbObjects`);
    
    const target = message.mentions.users.first() || message.author;
    const user = await Users.findByPrimary(target.id);
    const items = await user.getItems();
    
    if (!items.length) return message.channel.send(`${target.tag} has nothing!`);
    else message.channel.send(`${target.tag} currently has ${items.map(i => `${i.amount} ${i.item.name}`).join(`, `)}`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [`inv`],
    permLevel: `User`
};

exports.help = {
    name: `inventory`,
    description: `Shows user inventory`,
    usage: `inventory [user]`,
    category: `Currency`
};