if (process.version.slice(1).split(`.`)[0] < 8) throw new Error(`Node 8.0.0 or higher is required. Update Node on your system.`);

const Discord = require(`discord.js`);
const Sequelize = require(`sequelize`);
const { promisify } = require(`util`);
const readdir = promisify(require(`fs`).readdir);
const Enmap = require(`enmap`);
const EnmapLevel = require(`enmap-level`);
const client = new Discord.Client();
const currency = new Discord.Collection();
const { Users, CurrencyShop } = require(`./dbObjects`);

/* const sequelize = new Sequelize(`database`, `user`, `password`, {
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
}); */

Reflect.defineProperty(currency, `add`, {
  value: async function add(id, amount) {
    const user = currency.get(id);
    if (user) {
      user.balance += Number(amount);
      return user.save();
    }
    const newUser = await Users.create({ user_id: id, balance: amount });
    currency.set(id, newUser);
    return newUser;
  },
});

Reflect.defineProperty(currency, `getBalance`, {
  value: function getBalance(id) {
    const user = currency.get(id);
    return user ? user.balance : 0;
  },
});

client.config = require(`./config.js`);
client.logger = require(`./util/Logger`);
require(`./modules/functions.js`)(client);

client.commands = new Enmap();
client.aliases = new Enmap();
client.settings = new Enmap({provider: new EnmapLevel({name: `settings`})});

const init = async () => {

  // Here we load **commands** into memory, as a collection, so they're accessible
  // here and everywhere else.
  const cmdFiles = await readdir(`./commands/`);
  client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(`.js`)) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });

  // Then we load events, which will include our message and ready event.
  const evtFiles = await readdir(`./events/`);
  client.logger.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(`.`)[0];
    const event = require(`./events/${file}`);
    // This line is awesome by the way. Just sayin'.
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });

  // Generate a cache of client permissions for pretty perms
  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

  // Here we login the client.
  client.login(client.config.token);

// End top-level async/await function.
};

init();

/* client.once(`ready`, async () => {
  Tags.sync();
  const storedBalances = await Users.findAll();
  storedBalances.forEach(b => currency.set(b.user_id, b));
}); */

//Btw that green hex color is #59D851
