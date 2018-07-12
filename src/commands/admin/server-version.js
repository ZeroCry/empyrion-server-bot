const Commando = require('discord.js-commando');
const hasPermission = require('../../has-permission');
const getBuild = require('../../get-build');

class ServerVersionCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'server-version',
      group: 'admin',
      memberName: 'server-version',
      description: 'Replies with the servers current version',
    })
  }

  async run(message, args) {
    const caller = message.message.author;
    if (hasPermission(this, caller)) {
      const build = await getBuild();
      await message.reply(`Server version: ${build.version} (${build.number})`);
      console.log(`${caller.username} called \`server-version\`.`);
    } else {
      await message.reply(`You don't have permission to do that.`);
      console.warn(`${caller.username} tried to call \`server-version\` without permission.`);
    }
  }
}

module.exports = ServerVersionCommand;