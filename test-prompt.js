// Test do System Prompt MagicFace
const { gerarPromptInpainting } = require('./lib/systemPromptMagicFace.js');

// EXEMPLO 1: Mulher com Pêra + Curvas (caso comum)
const exemplo1 = {
  assimetria: "lado_direito_mais_alto",
  biotipo: "pera",
  linhasRosto: "curvas",
  linhasCorpo: "curvas",
  tomPele: "quente",
  usoFranja: "sim_equilibra",
  comprimentoPreferido: "medio"
};

console.log("========================================");
console.log("EXEMPLO 1: Mulher Pêra + Curvas");
console.log("========================================\n");
const resultado1 = gerarPromptInpainting(exemplo1);
console.log("VERSÃO PARA INPAINTING (para IA gerar imagem):\n");
console.log(resultado1.inpainting);

console.log("\n\n");

// EXEMPLO 2: Mulher com Triângulo Invertido + Retas
const exemplo2 = {
  assimetria: "lado_esquerdo_mais_alto",
  biotipo: "triangulo_invertido",
  linhasRosto: "retas",
  linhasCorpo: "retas",
  tomPele: "frio",
  usoFranja: "nao",
  comprimentoPreferido: "longo"
};

console.log("========================================");
console.log("EXEMPLO 2: Mulher Triângulo Invertido + Retas");
console.log("========================================\n");
console.log(gerarPromptInpainting(exemplo2));

console.log("\n\n");

// EXEMPLO 3: Mulher Retângulo + Misto
const exemplo3 = {
  assimetria: "equilibrado",
  biotipo: "retangulo",
  linhasRosto: "diagonais",
  linhasCorpo: "mistura",
  tomPele: "neutro",
  usoFranja: "gostaria",
  comprimentoPreferido: "curto"
};

console.log("========================================");
console.log("EXEMPLO 3: Mulher Retângulo Equilibrada + Misto");
console.log("========================================\n");
console.log(gerarPromptInpainting(exemplo3));
