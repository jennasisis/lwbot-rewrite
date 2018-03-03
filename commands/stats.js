const { version } = require(`discord.js`);
const moment = require(`moment`);
const Discord = require(`discord.js`);
require(`moment-duration-format`);

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const duration = moment.duration(client.uptime).format(` D [days], H [hrs], m [mins], s [secs]`);
    message.channel.send(new Discord.RichEmbed()
        .setTitle(`\`Statistics\``)
        .addField(`Mem Usage`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`)
        .addField(`Uptime`, duration)
        .addField(`Discord.js`, `v${version}`)
        .addField(`Node`, process.version)
        .setColor(`0x59D851`)
    );
    
    /* message.channel.send(`= STATISTICS =
        • Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
        • Uptime     :: ${duration}
        • Users      :: ${client.users.size.toLocaleString()}
        • Servers    :: ${client.guilds.size.toLocaleString()}
        • Channels   :: ${client.channels.size.toLocaleString()}
        • Discord.js :: v${version}
        • Node       :: ${process.version}`, {code: `asciidoc`}); */
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: `User`
};

exports.help = {
    name: `stats`,
    category: `Misc`,
    description: `Gives some useful bot statistics`,
    usage: `stats`
};
