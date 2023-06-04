const { create, Client } = require('@open-wa/wa-automate');
const { handleCommands } = require('./comandos/comandos.js');

const launchConfig = {
  useChrome: true,
  autoRefresh: true,
  cacheEnabled: false,
  sessionId: 'hr',
};

function start(client) {
  client.onMessage(async (message) => {
    handleCommands(client, message); // Passa o objeto client para a função handleCommands
  });
}

create(launchConfig).then(start);
