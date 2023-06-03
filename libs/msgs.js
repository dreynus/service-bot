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
  saudacao: `
  Olá, ${msgHora} Agradeço pelo contato.
  
  Para saber sobre ... Envie "...".
  (Sem as aspas)
  `,


  default: "Desculpe, não entendi sua mensagem."
}

module.exports = msgs_Texto;