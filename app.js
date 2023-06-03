const { create, Client } = require('@open-wa/wa-automate');

const launchConfig = {
  useChrome: true,
  autoRefresh: true,
  cacheEnabled: false,
  sessionId: 'hr',
};

function start(client) {
  client.onMessage(async message => {
    const { body } = message;

    switch (body) {
      case 'Hi':
        await client.sendText(message.from, 'Olá! (Mensagem Teste)');
        break;
      case 'Hello':
        await client.sendText(message.from, 'Oi! (Mensagem Teste)');
        break;
      case 'Bye':
        await client.sendText(message.from, 'Tchau! (Mensagem Teste)');
        break;
      default:
        await client.sendText(message.from, 'Desculpe, não entendi sua mensagem.');
    }
  });
}

create(launchConfig).then(start);