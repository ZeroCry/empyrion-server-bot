const Commando = require('discord.js-commando');

class StopServerCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'stop-server',
      group: 'admin',
      memberName: 'stop-server',
      description: 'Performs a `saveandexit 0` on the server'
    })
  }

  async run(message, args) {
    console.log('stop-server');
  }
}

module.exports = StopServerCommand;