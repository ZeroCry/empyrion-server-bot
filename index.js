const fs = require('fs');
const Yaml = require('js-yaml');
const Discord = require('discord.js');

const secrets = Yaml.safeLoad(fs.readFileSync('secrets.yml', 'utf8'));

const bot = new Discord.Client();

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

bot.login(secrets['bot_token']);