const msgs_Texto = require('../libs/msgs.js');

function handleCommands (client, message) {
  const { body } = message;
  const lowerCaseBody = body.toLowerCase(); 

  switch (lowerCaseBody) {
    case 'olá':
    case 'oi':
    case 'eae':
    case 'ola':
    case 'bom dia':
    case 'boa noite':
    case 'boa tarde':
      client.sendText(message.from, msgs_Texto.saudacao)
      break;

    default:
      client.sendText(message.from, msgs_Texto.default)
  }
}

module.exports = handleCommands;