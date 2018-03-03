module.exports.run = (client, message, args) => { // eslint-disable-line no-unused-vars
    var Fstrings = [` with a transformer.`, ` with poutine.`, `, and what a fight it is! Whoa mama!`, `, with two thousand blades!`, `. SHORYUKEN!`, `. HADOUKEN!`, `. KA-POW!`, ` with a pillow.`, ` with a large fish.`, ` with a burnt piece of toast.`];

    function randomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    const member = message.mentions.members.first();
    if (!member) return message.channel.send(`${message.author.username} is fighting no one${randomElement(Fstrings)}`);
    message.channel.send(`${message.author.username} is fighting ${member}${randomElement(Fstrings)}`);

    setTimeout(() => {
        var winner = Math.round(Math.random());
        if (Math.round(winner === 0)) {message.channel.send(`:trophy: **${message.author} WON** :trophy:`);}
        else {message.channel.send(`:trophy: **${message.mentions.users.first()} WON** :trophy:`);}
    }, 100);
    
};

exports.conf = {
    enabled: true,
    aliases: [`fite`],
    permLevel: `User`,
    guildOnly: true
};

exports.help = {
    name: `fight`,
    description: `Fight a user!`,
    usage: `fight <mention>`,
    category: `Fun`
};
