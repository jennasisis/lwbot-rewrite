/*
The HELP command is used to display every command's name and description
to the user, so that he may see what commands are available. The help
command is also filtered by level, so if a user does not have access to
a command, it is not shown to them. If a command name is given with the
help command, its extended help is shown.
*/
const Discord = require(`discord.js`);

exports.run = async (client, message, args, level) => {
  // If no specific command is called, show all filtered commands.
  if (!args[0]) {
    // Load guild settings (for prefixes and eventually per-guild tweaks)
    const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;

    // Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
    const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);
    
    // Here we have to get the command names only, and we use that array to get the longest name.
    // This make the help commands "aligned" in the output.
    const commandNames = myCommands.keyArray();
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    
    let currentCategory = ``;
    let output = `[Use ${settings.prefix}help <commandname> for details]\n`;
    const sorted = myCommands.array().sort((p, c) => 
      p.help.category > c.help.category ? 1 : p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
    sorted.forEach( c => {
      const cat = c.help.category;
      if (currentCategory !== cat) {
        output += `\u200b\n== ${cat} ==\n`;
        currentCategory = cat;
      }
      output += `${settings.prefix}${c.help.name}${` `.repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
    });
    await message.react(`✅`);
    await message.author.send(new Discord.RichEmbed().setDescription(`\`\`\`asciidoc\n${output}\n\`\`\``).setColor(`0x59D851`));
    await message.author.send(`:grimacing: Yes, I know this doesn't look *the best,* but I'm working with the dev team to try and make it a *bit* prettier.`);
  } else {
    // Show individual command's help.
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      if (level < client.levelCache[command.conf.permLevel]) return message.channel.send(`:x: You do not have access to this command!`);
      message.channel.send(new Discord.RichEmbed()
        .setTitle(`\`${command.help.name}\``)
        .setDescription(`${command.help.category} | ${command.help.description}`)
        .addField(`Usage`, command.help.usage)
        .addField(`Aliases`, command.conf.aliases.join(`, `))
        .setColor(`0x59D851`)
      );
      /* message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage:: ${command.help.usage}\naliases:: ${command.conf.aliases.join(`, `)}\n= ${command.help.name} =`, {code:`asciidoc`}); */
    } else {message.channel.send(`:x: I couldn't find the command ${command}!`);}
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [`h`, `halp`, `hlp`],
  permLevel: `User`
};

exports.help = {
  name: `help`,
  category: `System`,
  description: `Displays all the available commands for your permission level.`,
  usage: `help [command]`
};
