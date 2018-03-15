module.exports.run = async (client, message) => {
  const { CurrencyShop } = require(`../dbObjects.js`);
  const items = await CurrencyShop.findAll();
  return message.channel.send(items.map(item => `${item.name}: ${item.cost}💰`).join(`\n`), { code: true });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [`store`],
  permLevel: `User`
};

exports.help = {
  name: `shop`,
  description: `Shows all of the items in the shop`,
  usage: `shop`,
  category: `Currency`
};