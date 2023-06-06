const msgs_Texto = require('../libs/msgs.js');
const colors = require('colors');

function criarTexto(texto, ...args) {
  return texto.replace(/{(\d+)}/g, (match, index) => {
    return typeof args[index] !== 'undefined' ? args[index] : match;
  });
}

function erroComandoMsg(comando) {
  return `Erro: Comando inválido "${comando}".`;
}

function getCurrentDateTime() {  // Pega a data atual (usado para mostrar no console a data e hora que o comando foi executado)
  const now = new Date();
  return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
}

async function handleCommands(client, message) {
  const { body } = message;
  const lowerCaseBody = body.toLowerCase();

  var args = lowerCaseBody.split(' ');
  args.shift(); // Remover o primeiro elemento que é o comando '?anuncio'

  if (!lowerCaseBody.startsWith('!')) {
    // Ignorar mensagens que não começam com "!"
    return;
  }

  const command = lowerCaseBody.split(' ')[0]; // Extrai o comando da mensagem

  switch (command) {
    // User
    case '!ajuda':
    case '!suporte':
    case '!help':
      console.log(`[${message.isGroupMsg ? colors.yellow('GRUPO') : colors.red('PRIVADO')} - AJUDA] ${colors.cyan(getCurrentDateTime())} - ${colors.magenta('!ajuda')} de ${colors.magenta(message.sender.pushname)}`);
      client.sendText(message.from, msgs_Texto.ajuda);
      break;
      
    case '!info':
      console.log(`[${message.isGroupMsg ? colors.yellow('GRUPO') : colors.red('PRIVADO')} - INFO] ${colors.cyan(getCurrentDateTime())} - ${colors.magenta('!info')} de ${colors.magenta(message.sender.pushname)}`);
      client.sendText(message.from, msgs_Texto.info);
      break;


    // ADMIN
    case '!anunciar':
      console.log(`[${message.isGroupMsg ? colors.yellow('GRUPO') : colors.red('PRIVADO')} - ANÚNCIO] ${colors.cyan(getCurrentDateTime())} - !anuncio de ${message.sender.pushname}`);
      if (args.length === 0) return await client.reply(message.from, erroComandoMsg(command), message.id);
      const comando = args.shift(); // Remove o primeiro elemento que é o comando "?anuncio"
      const mensagem = args.join(' ').trim();
      const chats = await client.getAllChats();
      const bloqueados = await client.getBlockedIds();

      await client.reply(message.from, criarTexto(msgs_Texto.admin.anunciotodos.espera, chats.length, chats.length), message.id);

      for (const chat of chats) {
        if (comando === 'contatos' && !chat.isGroup) {
          if (!bloqueados.includes(chat.id)) {
            await new Promise((resolve) => {
              setTimeout(async () => {
                resolve(await client.sendText(chat.id, criarTexto(msgs_Texto.admin.anunciocontatos.anuncio, mensagem)));
              }, 1000);
            });
          }
        } else if (comando === 'grupos' && chat.isGroup && !chat.isReadOnly && !chat.isAnnounceGrpRestrict) {
          await new Promise((resolve) => {
            setTimeout(async () => {
              resolve(await client.sendText(chat.id, criarTexto(msgs_Texto.admin.anunciogrupos.anuncio, mensagem)));
            }, 1000);
          });
        } else if (comando === 'todos') {
          if (!bloqueados.includes(chat.id)) {
            await new Promise((resolve) => {
              setTimeout(async () => {
                resolve(await client.sendText(chat.id, criarTexto(msgs_Texto.admin.anunciotodos.anuncio, mensagem)));
              }, 1000);
            });
          }
        }
      }
      break;

    // Default
    default:
      client.sendText(message.from, msgs_Texto.default);
      console.log(`[${message.isGroupMsg ? colors.yellow('GRUPO') : colors.red('PRIVADO')} - DESCONHECIDO] ${colors.cyan(getCurrentDateTime())} - ${colors.magenta(command)} de ${message.sender.pushname}`);
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