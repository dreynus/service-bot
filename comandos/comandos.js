const msgs_Texto = require('../libs/msgs.js');

async function handleCommands(client, message) {
  const { body } = message;
  const lowerCaseBody = body.toLowerCase();


  if (!lowerCaseBody.startsWith('?')) {
    // Ignorar mensagens que não começam com "?"
    return;
  }

  switch (command) {
    case '?info':
      client.sendText(message.from, msgs_Texto.info);
      break;

    case '?ajuda':
      client.sendText(message.from, msgs_Texto.ajuda);
      break;

    default:
      client.sendText(message.from, msgs_Texto.default);
      break;
  }
}

module.exports = handleCommands;