const Commando = require('discord.js-commando');
const hasPermission = require('../../has-permission');
const exec = require('../../exec');

class StartServerCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'start-server',
      group: 'admin',
      memberName: 'start-server',
      description: 'Starts the server using the script defined in the config',
    })
  }

  async run(message, args) {
    const caller = message.message.author;
    if (hasPermission(this, caller)) {
      await exec(global.config.empyrion_start, {
        cwd: global.config.empyrion_dir,
      });
      await message.reply(`🚀 Server launched.`);
      console.log(`${caller.username} called \`start-server\`.`);
    } else {
      await message.reply(`You don't have permission to do that.`);
      console.warn(`${caller.username} tried to call \`start-server\` without permission.`);
    }
  }
}

module.exports = StartServerCommand;