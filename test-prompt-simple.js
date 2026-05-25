const { gerarPromptInpainting } = require('./lib/systemPromptMagicFace.js');

// EXEMPLO REAL: Mulher Pêra + Curvas (caso muito comum)
const exemplo = {
  assimetria: "lado_direito_mais_alto",
  biotipo: "pera",
  linhasRosto: "curvas",
  linhasCorpo: "curvas",
  tomPele: "quente",
  usoFranja: "sim_equilibra",
  comprimentoPreferido: "medio"
};

const resultado = gerarPromptInpainting(exemplo);

console.log("VERSÃO PARA INPAINTING (concisa, para IA gerar imagem):");
console.log("=".repeat(60) + "\n");
console.log(resultado.inpainting);
