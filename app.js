const { create, Client } = require('@open-wa/wa-automate');

const launchConfig = {
  useChrome: true,
  autoRefresh: true,
  cacheEnabled: false,
  sessionId: 'hr',
};

function start(client) {
  client.onMessage(async message => {
    if (message.body === 'Hi') {
      await client.sendText(message.from, 'Olá! _(Mensagem Teste)_')
    }
  });
}

create(launchConfig).then(start);