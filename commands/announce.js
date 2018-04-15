const Discord = require(`discord.js`);
module.exports.run = async (client, message, args) => {
  try {
    if (message.member.roles.has(`382591919772925962`) || message.author.id === `107599228900999168`) {
      var date = new Date();

      String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, `g`), replacement);
      };
        
      const messageContent = args.join(` `);
      const splitter = messageContent.split(` | `);
      var title = splitter[0];
      var part2 = splitter[1];
      var cmdargs = splitter[2];

      if (!title) return message.channel.send(`:x: Missing a title!`);
      if (!part2) return message.channel.send(`:x: Missing the content!`);
      var content = part2.replaceAll(`/n`, `\n`).trim();
        
      var color = 54371;
      if (cmdargs) {
        if (cmdargs.includes(`color=`)) {color = cmdargs.substring(cmdargs.indexOf(`color=`)+6);} else {color = 54371;}
        if (cmdargs.includes(`no-subs`)) {announce();} else {message.guild.channels.get(`382642103626498049`).send(`<@&383439861463515136>`); announce();}
      } else {color = 54371; message.guild.channels.get(`382642103626498049`).send(`<@&383439861463515136>`); announce();}
        
      function announce() { // eslint-disable-line no-inner-declarations
        client.channels.get(`382642103626498049`).send(new Discord.RichEmbed()
          .setColor(color)
          .setAuthor(message.author.username, message.author.avatarURL)
          .setFooter(`${date.getHours()}:${date.getMinutes()} • ${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`)
          .addField(title, content)
        );
        if (cmdargs) message.channel.send(`:white_check_mark: **Announcement sent!** | **Args:** \`${cmdargs}\``);
        else message.channel.send(`:white_check_mark: **Announcement sent!**`);
      }
    } else message.channel.send(`:x: You do not have access to this command!`);
  } catch (err) {message.channel.send(`:x: ${err}`);}
};

//<@&383439861463515136> anno subs role
//382642103626498049 announcement channel id

exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 'User',
  aliases: ['anno']
};

exports.help = {
  name: 'announce',
  description: 'Announces something',
  usage: 'announce <title> | <content> [| '
}