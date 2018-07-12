const fs = require('fs');
const path = require('path');
const Yaml = require('js-yaml');
const Commando = require('discord.js-commando');
const Telnet = require('./src/telnet');

const secrets = loadYaml('secrets.yml');
const config = global.config = loadYaml('config.yml', 'utf8');
const serverAppPath = config['empyrion_dir'];
const serverConfigName = config['empyrion_config'];
global.serverConfig = loadYaml(path.join(serverAppPath, serverConfigName));

const bot = new Commando.Client();
const telnet = global.telnet = new Telnet();

bot.registry
  .registerGroups([
    ['admin', 'Admin commands'],
  ])
  .registerDefaults()
  .registerCommandsIn(path.join(__dirname, 'src', 'commands'));

bot.on('ready', () => {
  console.log(`Logged in to Discord as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

bot.login(secrets['bot_token']);
telnet.connect();

function loadYaml(filepath) {
  return Yaml.safeLoad(fs.readFileSync(filepath, 'utf8'));
}