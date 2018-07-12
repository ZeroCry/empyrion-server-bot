const Commando = require('discord.js-commando');
const hasPermission = require('../../has-permission');

class StopServerCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'stop-server',
      group: 'admin',
      memberName: 'stop-server',
      description: 'Performs a `saveandexit 0` on the server',
    })
  }

  async run(message, args) {
    const caller = message.message.author;
    if (hasPermission(this, caller)) {
      await global.telnet.write('saveandexit 0');
      await message.reply(`🔻 Server shutdown.`);
      console.log(`${caller.username} called \`stop-server\`.`);
    } else {
      await message.reply(`You don't have permission to do that.`);
      console.warn(`${caller.username} tried to call \`stop-server\` without permission.`);
    }
  }
}

module.exports = StopServerCommand;