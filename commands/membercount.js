const Discord = require(`discord.js`);
module.exports.run = (client, message, args) => { // eslint-disable-line no-unused-vars
  var bots = message.guild.members.filter(member => member.user.bot).map(g => g.toString()).length;
  message.channel.send(new Discord.RichEmbed()
    .addField(`Total Users`, message.guild.memberCount, true)
    .addField(`Bots`, bots, true)
    .addField(`Humans`, message.guild.memberCount-bots, true)
    .setColor(`0x59D851`)
  );
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [`mc`, `members`, `users`],
  permLevel: `User`
};

exports.help = {
  name: `membercount`,
  category: `Server`,
  description: `Shows the number of users in the server`,
  usage: `membercount`
};