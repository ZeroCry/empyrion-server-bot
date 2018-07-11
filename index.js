const fs = require('fs');
const path = require('path');
const Yaml = require('js-yaml');
const Commando = require('discord.js-commando');

const secrets = Yaml.safeLoad(fs.readFileSync('secrets.yml', 'utf8'));

const bot = new Commando.Client({

});

bot.registry
  .registerGroups([
    ['admin', 'Admin commands'],
  ])
  .registerDefaults()
  .registerCommandsIn(path.join(__dirname, 'commands'));

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

bot.login(secrets['bot_token']);