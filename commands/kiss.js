exports.run = (client, message) => {
  const config = require(`../config.json`);
  const Discord = require(`discord.js`);

  var giphy = require(`giphy-api`)(config.giphy);

  var sweetheart = message.mentions.users.first();

  message.guild.member(sweetheart).id;

  giphy.random({
    tag: `kiss sexy kissing hot makeout`,
    limit: 1,
    rating: `pg`,
    fmt: `json`
  }).then(function(res) {
    var myArray = [`snogging`, `sucking face`, `getting intimate`, `kissing`, `in a loving embrace`];
    var words = myArray[Math.floor(Math.random() * myArray.length)];
        
    message.channel.send(new Discord.RichEmbed()
      .setTitle(message.author.username + ` and ` + sweetheart.username + ` are ` + words + ` give em a bit of privacy💏❤️`)
      .setImage(res.data.image_url)
    );
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [`makeout`],
  permLevel: `User`
};

exports.help = {
  name: `kiss`,
  description: `Kiss someone`,
  usage: `kiss <user>`,
  category: `Fun`
};