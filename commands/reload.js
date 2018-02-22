const fs = require(`fs`);

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const cmdFiles = await fs.readdir(`./commands/`); // eslint-disable-line
    if (!args) {
        message.channel.send(`no args`);
        /* // Unloads all commands
        client.logger.log(`Unloading a total of ${cmdFiles.length} commands.`);
        cmdFiles.forEach(f => {
            if (!f.endsWith(`.js`)) return;
            const response = client.unloadCommand(f);
            if (response) console.log(response);
        });
       
        // Loads all commands
        client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
        cmdFiles.forEach(f => {
            if (!f.endsWith(`.js`)) return;
            const response = client.loadCommand(f);
            if (response) console.log(response);
        }); */
    } else {
        let response = await client.unloadCommand(args[0]);
        if (response) return message.reply(`Error Unloading: ${response}`);

        response = client.loadCommand(args[0]);
        if (response) return message.reply(`Error Loading: ${response}`);

        message.reply(`The command \`${args[0]}\` has been reloaded`);}
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: `Bot Admin`
};

exports.help = {
    name: `reload`,
    category: `System`,
    description: `Reloads a command that"s been modified.`,
    usage: `reload [command]`
};
