const Commando = require('discord.js-commando');
const hasPermission = require('../../has-permission');
const exec = require('../../exec');
const getBuild = require('../../get-build');

class UpdateServerCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'update-server',
      group: 'admin',
      memberName: 'update-server',
      description: 'Updates the server to the latest version',
    })
  }

  async run(message, args) {
    const caller = message.message.author;
    if (hasPermission(this, caller)) {
      let build = await getBuild();
      await message.reply(`Current server version: ${build.version} (${build.number})`);
      await exec(global.config.empyrion_update, {
        cwd: global.config.empyrion_dir,
      });
      build = await getBuild();
      await message.reply(`New server version: ${build.version} (${build.number})`);
      await message.reply(`✅ Server updated.`);
      console.log(`${caller.username} called \`update-server\`.`);
    } else {
      await message.reply(`You don't have permission to do that.`);
      console.warn(`${caller.username} tried to call \`update-server\` without permission.`);
    }
  }
}

module.exports = UpdateServerCommand;