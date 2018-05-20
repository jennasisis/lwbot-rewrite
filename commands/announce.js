const Discord = require(`discord.js`);
module.exports.run = async (client, message, args) => {
  try {
    if (message.member.permissions.has(`MANAGE_MESSAGES`) || message.author.id === `107599228900999168`) {
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
      } else {color = 54371; announce();}
        
      function announce() { // eslint-disable-line no-inner-declarations
        client.channels.find(`name`, `announcements`).send(new Discord.RichEmbed()
          .setColor(color)
          .setAuthor(message.author.username, message.author.avatarURL)
          .setFooter(`${date.toDateString()} ${date.toTimeString()}`)
          .addField(title, content)
        );
        if (cmdargs) message.channel.send(`:white_check_mark: **Announcement sent!** | **Args:** \`${cmdargs}\``);
        else message.channel.send(`:white_check_mark: **Announcement sent!**`);
      }
    } else message.channel.send(`:x: You do not have access to this command!`);
  } catch (err) {message.channel.send(`:x: ${err}`);}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: `User`,
  aliases: [`anno`]
};

exports.help = {
  name: `announce`,
  description: `Announces something`,
  usage: `announce <title> | <content> [| color=(Hex without the #) no-subs]`,
  category: `Server`
};