const msgs_Texto = require('../libs/msgs.js');

function criarTexto(texto, ...args) {
  return texto.replace(/{(\d+)}/g, (match, index) => {
    return typeof args[index] !== 'undefined' ? args[index] : match;
  });
}

function erroComandoMsg(comando) {
  return `Erro: Comando inválido "${comando}".`;
}




async function handleCommands(client, message) {
  const { body } = message;
  const lowerCaseBody = body.toLowerCase();

  var args = lowerCaseBody.split(' ');
  args.shift(); // Remover o primeiro elemento que é o comando '?anuncio'

  if (!lowerCaseBody.startsWith('?')) {
    // Ignorar mensagens que não começam com "?"
    return;
  }

  const command = lowerCaseBody.split(' ')[0]; // Extrai o comando da mensagem

  switch (command) {
    case '?info':
      client.sendText(message.from, msgs_Texto.info);
      break;

    case '?ajuda':
      client.sendText(message.from, msgs_Texto.ajuda);
      break;

    case '?anuncio':
      if (args.length === 0) return await client.reply(message.from, erroComandoMsg(command), message.id);
      const comando = args.shift(); // Remove o primeiro elemento que é o comando "?anuncio"
      const mensagem = args.join(' ').trim();
      const chats = await client.getAllChats();
      const bloqueados = await client.getBlockedIds();

      await client.reply(message.from, criarTexto(msgs_Texto.admin.bctodos.espera, chats.length, chats.length), message.id);

      for (const chat of chats) {
        if (comando === 'contatos' && !chat.isGroup) {
          if (!bloqueados.includes(chat.id)) {
            await new Promise((resolve) => {
              setTimeout(async () => {
                resolve(await client.sendText(chat.id, criarTexto(msgs_Texto.admin.bctodos.anuncio, mensagem)));
              }, 1000);
            });
          }
        } else if (comando === 'grupos' && chat.isGroup && !chat.isReadOnly && !chat.isAnnounceGrpRestrict) {
          await new Promise((resolve) => {
            setTimeout(async () => {
              resolve(await client.sendText(chat.id, criarTexto(msgs_Texto.admin.bctodos.anuncio, mensagem)));
            }, 1000);
          });
        } else if (comando === 'todos') {
          if (!bloqueados.includes(chat.id)) {
            await new Promise((resolve) => {
              setTimeout(async () => {
                resolve(await client.sendText(chat.id, criarTexto(msgs_Texto.admin.bctodos.anuncio, mensagem)));
              }, 1000);
            });
          }
        }
      }
      break;

    default:
      client.sendText(message.from, msgs_Texto.default);
      break;
  }
}

module.exports = { handleCommands };


// Backup né
// case '?anuncio':
// if (args.length === 0) return await client.reply(message.from, erroComandoMsg(command), message.id);
// const comando = args.shift(); // Remove o primeiro elemento que é o comando "?anuncio"
// const mensagem = args.join(' ').trim();
// const chats = await client.getAllChats();
// const bloqueados = await client.getBlockedIds();

// await client.reply(message.from, criarTexto(msgs_Texto.admin.bctodos.espera, chats.length, chats.length), message.id);

// for (const chat of chats) {
//   if (comando === 'contatos' && !chat.isGroup) {
//     if (!bloqueados.includes(chat.id)) {
//       await new Promise((resolve) => {
//         setTimeout(async () => {
//           resolve(await client.sendText(chat.id, criarTexto(msgs_Texto.admin.bctodos.anuncio, mensagem)));
//         }, 1000);
//       });
//     }
//   } else if (comando === 'grupos' && chat.isGroup && !chat.isReadOnly && !chat.isAnnounceGrpRestrict) {
//     await new Promise((resolve) => {
//       setTimeout(async () => {
//         resolve(await client.sendText(chat.id, criarTexto(msgs_Texto.admin.bctodos.anuncio, mensagem)));
//       }, 1000);
//     });
//   } else if (comando === 'todos') {
//     if (!bloqueados.includes(chat.id)) {
//       await new Promise((resolve) => {
//         setTimeout(async () => {
//           resolve(await client.sendText(chat.id, criarTexto(msgs_Texto.admin.bctodos.anuncio, mensagem)));
//         }, 1000);
//       });
//     }
//   }
// }
// break;