const Sequelize = require(`sequelize`);
const Discord = require(`discord.js`);
const sequelize = new Sequelize(`database`, `user`, `password`, {
  host: `localhost`,
  dialect: `sqlite`,
  logging: false,
  // SQLite only
  storage: `database.sqlite`,
});
const Tags = sequelize.define(`tags`, {
  name: {
    type: Sequelize.STRING,
    unique: true,
  },
  description: Sequelize.TEXT,
  username: Sequelize.STRING,
  usage_count: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
});

module.exports = async client => {
  // Why await here? Because the ready event isn't actually ready, sometimes
  // guild information will come in *after* ready. 1s is plenty, generally,
  // for all of them to be loaded.
  await client.wait(1000);

  // Sets the "Current total members" message in #rules_and_info
  var guild = client.guilds.get(`382585019300053013`);
  var bots = guild.members.filter(member => member.user.bot).map(g => g.toString());
  guild.channels.get(`382640041358262285`).fetchMessage(`423594731994611723`).then(msg => msg.edit(`:busts_in_silhouette: **Current total members: \`${guild.memberCount-bots.length}\`**`));

  var playings = [
    [`with Shin-Ae`, {type: `PLAYING`}], 
    [`with James`, {type: `PLAYING`}], 
    [`with Nen`, {type: `PLAYING`}], 
    [`with fire`, {type: `PLAYING`}], 
    [`on Webtoons instead of working`, {type: `PLAYING`}], 
    [`with your heart`, {type: `PLAYING`}], 
    [`with Shen`, {type: `PLAYING`}], 
    [`with SAI`, {type: `PLAYING`}], 
    [`some game or something idrk`, {type: `PLAYING`}], 
    [`with the big boys`, {type: `PLAYING`}], 
    [`with Madi`, {type: `PLAYING`}], 
    [`in Webtoonland`, {type: `PLAYING`}], 
    [`in Wonderland`, {type: `PLAYING`}], 
    [`Adobe Illustrator`, {type: `PLAYING`}], 
    [`Fire Alpaca`, {type: `PLAYING`}], 
    [`for the money`, {type: `PLAYING`}], 
    [`YAAAASSSSS`, {type: `PLAYING`}], 
    [`with my code`, {type: `PLAYING`}], 
    [`with time`, {type: `PLAYING`}], 
    [`in space`, {type: `PLAYING`}], 
    [`for the good guys`, {type: `PLAYING`}], 
    [`with other bots`, {type: `PLAYING`}], 
    [`with the ratelimit ;)`, {type: `PLAYING`}], 
    [`with the Podcast crew`, {type: `PLAYING`}], 
    [`[status]`, {type: `PLAYING`}], 
    [`[object Object]`, {type: `PLAYING`}], 
    [`against the clock`, {type: `PLAYING`}], 
    [`Error 503: Forbidden`, {type: `PLAYING`}], 
    [`with your ships`, {type: `PLAYING`}], 
    [`Monopoly`, {type: `PLAYING`}], 
    [`with life in a box`, {type: `PLAYING`}], 
    [`with life`, {type: `PLAYING`}], 
    [`with the other lurkers`, {type: `PLAYING`}], 
    [`with the skin of my enemies`, {type: `PLAYING`}], 
    [`for the glory`, {type: `PLAYING`}], 
    [`with friends`, {type: `PLAYING`}], 
    [`on the beach`, {type: `PLAYING`}], 
    [`at the mall`, {type: `PLAYING`}], 
    [`at home`, {type: `PLAYING`}], 
    [`on the couch`, {type: `PLAYING`}], 
    [`?¿`, {type: `PLAYING`}], 
    [`devil's advocate`, {type: `PLAYING`}], 
    [`Poker`, {type: `PLAYING`}], 
    [`MS Paint`, {type: `PLAYING`}], 
    [`with Kowoks`, {type: `PLAYING`}], 
    [`with Uru-chan`, {type: `PLAYING`}], 
    [`with Quimchee`, {type: `PLAYING`}], 
    [`with Chris McCoy @ Safely Endangered`, {type: `PLAYING`}], 
    [` `, {type: `PLAYING`}],
    [`Netflix`, {type: `WATCHING`}],
    [`you`, {type: `WATCHING`}],
    [`Spotify`, {type: `LISTENING`}]
  ];

  // Both `wait` and `client.log` are in `./modules/functions`.
  client.logger.log(`[READY] ${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, `ready`);

  // We check for any guilds added while the bot was offline, if any were, they get a default configuration.
  client.guilds.filter(g => !client.settings.has(g.id)).forEach(g => client.settings.set(g.id, client.config.defaultSettings));

  Tags.sync();

  Array.prototype.randomElement = function(array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  setInterval(() => {
    var randomPl = playings.randomElement(playings);
    client.user.setActivity(`${randomPl[0]} | !w help`, randomPl[1]);
  }, 60000);

  // Webhooks support
  var date = new Date();
  var day = date.toDateString().substring(0, 3);
  var time = date.toTimeString().substring(0, 8);
  const hook = new Discord.WebhookClient(`447143362219212820`, client.config.webhookToken);
  var channel = client.channels.get(`447132033173422090`);
  
  var data = {
    monday: require(`../webhook-data/monday.json`),
    tuesday: require(`../webhook-data/tuesday.json`),
    wednesday: require(`../webhook-data/wednesday.json`),
    thursday: require(`../webhook-data/thursday.json`),
    friday: require(`../webhook-data/friday.json`),
    saturday: require(`../webhook-data/saturday.json`),
    sunday: require(`../webhook-data/sunday.json`)
  };

  function postIt(){
    if (time === "00:00:00") {
      if (day === "Mon") {channel.bulkDelete(1); hook.send(data.monday)}
      else if (day === "Tue") {channel.bulkDelete(1); hook.send(data.tuesday)}
      else if (day === "Wed") {channel.bulkDelete(1); hook.send(data.wednesday)}
      else if (day === "Thu") {channel.bulkDelete(1); hook.send(data.thursday)}
      else if (day === "Fri") {channel.bulkDelete(1); hook.send(data.friday)}
      else if (day === "Sat") {channel.bulkDelete(1); hook.send(data.saturday)}
      else if (day === "Sun") {channel.bulkDelete(1); hook.send(data.sunday)}
      else {channel.send("@Akii#0008, something has gone wrong.")}
    } else return;
  }

  setInterval(postIt, 15000);
};
