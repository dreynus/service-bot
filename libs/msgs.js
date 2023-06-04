function getHorarioMsg (horaDia) {
  const horarioDia = ['Bom dia!', 'Boa tarde!', 'Boa noite!']

  if (horaDia >= 0 && horaDia <= 11) {
    return horarioDia[0];
  } else if (horaDia >= 12 && horaDia <= 17) {
    return horarioDia[1]
  } else if (horaDia >= 18 && horaDia <= 23) {
    return horarioDia[2]
  }
}

const data = new Date();
const msgHora = getHorarioMsg(data.getHours());


const msgs_Texto = {
  info: `
Olá, ${msgHora} Agradeço pelo contato.
  
Visite nosso site para uma visão geral:
https://gcanaisiptv.github.io/canais-iptv/

Para saber mais sobre... Envie: *?ajuda*`,

  ajuda: `
╭─| ☾ *AJUDA* ☽
|
|>---- ☾ *MARCAS* ☽
|
|>- Para saber qual app para sua marca:
|Digite *?marca*, substituindo o "marca" pela marca de seu dispositivo.
|
|>- Marcas disponíveis:
|>- *?samsung*
|>- *?lg*
|>- *...*
|
|
|>---- ☾ *SESSÃO 2* ☽
|
|>- Mais coisas podem ser adicionadas conforme precisar...
|
┗━────────────
  `,

  mencao: `
Olá! Sou o BOT de tira-dúvidas deste grupo. 
Se você tem alguma pergunta, basta digitar o comando correspondente. 
  
Para ver a lista de comandos disponíveis, envie *?ajuda*
  `,

  admin: {
    bctodos: {
      espera: "Enviando anúncio para {0} chats...",
      anuncio: "{0}"
    }
  },

  default: "Desculpe, Não entendi seu comando.."
}

module.exports = msgs_Texto;