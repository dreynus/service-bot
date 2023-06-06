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
┏━───╯⌬╰───━┓
    ☾ *Canais IPTV - Giliard* ☽
┗━───╮⌬╭───━┛

Olá, ${msgHora}, Agradeço pelo contato.

Visite o site para uma visão geral:
https://gcanaisiptv.github.io/canais-iptv/

❯─ Obrigado por confiar em meu serviço.
`,

  ajuda: `
┏━───╯⌬╰───━┓
    ☾ *Canais IPTV - Giliard* ☽
┡━───╮⌬╭───━┛
|
|❯─ ☾ Comandos ☽
|
|❯ *!info* -> Mais Informações Sobre.
|❯ *!loja* -> Loja de Aplicativos.
|❯ *!comprar* -> Comprar Aplicativo.
|❯ *!revendedor* -> Ser Revendedor IPTV.
|
╰───────────
  `,

  admin: {
    anunciotodos: {
      espera: "Enviando anúncio para {0} Chats...",
      anuncio: "{0}"
    },
    anunciocontatos: {
      espera: "Enviando anúncio para {0} Contatos...",
      anuncio: "{0}"
    },
    anunciogrupos: {
      espera: "Enviando anúncio para {0} Grupos...",
      anuncio: "{0}"
    }

  },

  default: "Desculpe, Não entendi seu comando.."
}

module.exports = msgs_Texto;