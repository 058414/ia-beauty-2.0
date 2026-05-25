/**
 * SYSTEM PROMPT MAGICFACE
 *
 * Converte resultado do quiz + análise em prompt visual para Inpainting
 * Input: { assimetria, biotipo, linhasRosto, linhasCorpo, tomPele, ... }
 * Output: Prompt descritivo super detalhado para gerar imagem com corte recomendado
 */

function gerarPromptCorte(analise) {
  const {
    assimetria,           // "lado_direito_mais_alto" | "lado_esquerdo_mais_alto" | "equilibrado"
    biotipo,              // "retangulo" | "pera" | "triangulo_invertido" | "ampulheta" | "oval"
    linhasRosto,          // "retas" | "curvas" | "diagonais"
    linhasCorpo,          // "retas" | "curvas" | "mistura"
    tomPele,              // "quente" | "frio" | "neutro"
    usoFranja,            // "sim_equilibra" | "sim_mais_largo" | "sim_nariz_proeminente" | "nao" | "gostaria"
    comprimentoPreferido, // "curto" | "medio" | "longo"
    descricaoAdicional    // observações do quiz
  } = analise;

  let prompt = `CORTE DE CABELO PERSONALIZADO - IMAGEM PARA ANÁLISE VISUAL\n\n`;

  // ===== SEÇÃO 1: BASE DO CORTE =====
  prompt += `## TIPO DE CORTE:\n`;

  // Determinar corte baseado em assimetria + biotipo + linhas
  let tipoCorte = determinarTipoCorte(assimetria, biotipo, linhasRosto, linhasCorpo);
  let comprimento = determinarComprimento(biotipo, comprimentoPreferido);
  let franja = determinarFranja(assimetria, linhasRosto, usoFranja);

  prompt += tipoCorte.descricao + `\n\n`;

  // ===== SEÇÃO 2: COMPENSAÇÃO DE ASSIMETRIA =====
  prompt += `## POSICIONAMENTO DE CABELO (Compensação de Assimetria):\n`;

  let compensacao = calcularCompensacaoAssimetria(assimetria, tipoCorte.nome);
  prompt += compensacao + `\n\n`;

  // ===== SEÇÃO 3: LINHAS E FORMAS =====
  prompt += `## LINHAS DO CORTE:\n`;

  let linhas = calcularLinhasCorte(linhasRosto, linhasCorpo);
  prompt += linhas + `\n\n`;

  // ===== SEÇÃO 4: FRANJA =====
  if (franja.incluir) {
    prompt += `## FRANJA:\n`;
    prompt += franja.descricao + `\n\n`;
  }

  // ===== SEÇÃO 5: COMPRIMENTO =====
  prompt += `## COMPRIMENTO:\n`;
  prompt += `${comprimento.descricao}\n\n`;

  // ===== SEÇÃO 6: LUZ E SOMBRA =====
  prompt += `## LUZ E SOMBRA:\n`;
  let luzSombra = calcularLuzSombra(biotipo, assimetria, tomPele);
  prompt += luzSombra + `\n\n`;

  // ===== SEÇÃO 7: INSTRUÇÕES VISUAIS PARA IA =====
  prompt += `## INSTRUÇÕES PARA GERAÇÃO:\n`;
  prompt += `- Manter rosto exatamente igual, APENAS mudar o cabelo\n`;
  prompt += `- Corte deve ser nítido, profissional, bem definido\n`;
  prompt += `- Cabelo realista, natural, sem texturas estranhas\n`;
  prompt += `- Iluminação natural, mesma luz original\n`;
  prompt += `- ${tipoCorte.instrucao}\n\n`;

  // ===== SEÇÃO 8: RESULTADO ESPERADO =====
  prompt += `## RESULTADO ESPERADO:\n`;
  let resultado = calcularResultadoEsperado(assimetria, biotipo, linhasRosto, tipoCorte.nome);
  prompt += resultado + `\n`;

  return prompt;
}

/**
 * LÓGICA 1: Determinar tipo de corte
 */
function determinarTipoCorte(assimetria, biotipo, linhasRosto, linhasCorpo) {
  let nome = "";
  let descricao = "";
  let instrucao = "";

  // Casos principais baseados em biotipo + linhas

  // PÊRA (largo em baixo) - precisa expandi ombros ou alongar
  if (biotipo === "pera") {
    if (linhasRosto === "curvas" && linhasCorpo === "curvas") {
      // Quebra monotonia de curvas com corte mais estruturado
      nome = "Corte Bob Estruturado Assimétrico";
      descricao = `Corte bob estruturado com comprimento mentoniano, volume pronunciado nos ombros,
      linha assimétrica que alonga visualmente. Estrutura angular para contrastar curvas excessivas.`;
      instrucao = "Volume nos ombros e nas laterais para equilibrar quadril mais largo.";
    } else if (linhasRosto === "retas") {
      nome = "Pixie Long ou Corte Mullet Moderno";
      descricao = `Corte com franja lateral longa e laterais curtas, mantendo comprimento nas costas.
      Linhas diagonais que equilibram biotipo pêra.`;
      instrucao = "Diagonal dinâmica, volume nos ombros, costas mais longas.";
    } else {
      nome = "Corte Shag Assimétrico";
      descricao = `Corte em camadas com comprimento variado, franja lateral, volume estratégico.
      Combina retas e curvas para equilíbrio visual.`;
      instrucao = "Camadas dinâmicas que expandem ombros e afinam quadril.";
    }
  }

  // TRIÂNGULO INVERTIDO (largo em cima) - precisa expandi quadril
  else if (biotipo === "triangulo_invertido") {
    if (linhasRosto === "retas" && linhasCorpo === "retas") {
      nome = "Corte Long Bob com Comprimento Alongado";
      descricao = `Corte bob alongado (abaixo dos ombros), sem volume nos ombros, comprimento
      distribuído nas costas para equilibrar largura de ombros.`;
      instrucao = "Comprimento longo, sem volume no topo, linhas retas para afinar ombros.";
    } else {
      nome = "Corte Wave Comprido";
      descricao = `Corte comprido com ondas suaves, volume nas pontas (abaixo ombros),
      sem franja, para expandir quadril visualmente.`;
      instrucao = "Comprimento longo, ondas nas pontas para descer volume, equilibra ombros largos.";
    }
  }

  // RETÂNGULO (reto) - precisa quebrar monotonia com curva ou diagonal
  else if (biotipo === "retangulo") {
    if (linhasRosto === "retas") {
      nome = "Corte Bob com Franja Lateral e Volume";
      descricao = `Corte bob assimétrico com franja lateral longa, volume pronunciado nas laterais,
      linhas suaves para quebrar retilíneo.`;
      instrucao = "Franja lateral, volume lateral para criar ilusão de curvas, quebra linhas retas.";
    } else {
      nome = "Corte Mullet Moderno";
      descricao = `Franja mais curta/lateral, corpo médio com volume, comprimento nas costas em camadas.
      Mistura retas (franja) com curvas (corpo).`;
      instrucao = "Diagonal dinâmica, volume estratégico para quebrar retilíneo do corpo.";
    }
  }

  // AMPULHETA (curvas reforçadas)
  else if (biotipo === "ampulheta") {
    if (linhasRosto === "curvas") {
      nome = "Corte Long Waves ou Mermaid Hair";
      descricao = `Corte comprido com ondas suaves e naturais, reforçando curvas do corpo.
      Volume equilibrado, franja opcional em U para manter curvado.`;
      instrucao = "Ondas suaves, volume nas laterais, reforça silhueta em ampulheta.";
    } else {
      nome = "Corte Bob Estruturado";
      descricao = `Bob com estrutura angular, franja reta ou assimétrica, para contrastar
      excesso de curvas do corpo.`;
      instrucao = "Estrutura reta para quebrar monotonia de curvas, mantém elegância.";
    }
  }

  // OVAL (flexível, pode usar qualquer coisa)
  else if (biotipo === "oval") {
    nome = "Corte Adaptativo Personalizado";
    descricao = `Biotipo oval é versátil. Optar por corte que equalize linhas do rosto.
    Se rosto tem curvas → preferir retas. Se rosto tem retas → preferir curvas.`;
    instrucao = "Escolher corte baseado em linhas do rosto, não no biotipo. Oval aceita tudo.";
  }

  // DEFAULT
  else {
    nome = "Corte Personalizado";
    descricao = "Corte que equilibra visualmente o biotipo e linhas do rosto.";
    instrucao = "Aplicar princípios de compensação visual baseado em assimetria.";
  }

  return { nome, descricao, instrucao };
}

/**
 * LÓGICA 2: Determinar comprimento
 */
function determinarComprimento(biotipo, comprimentoPreferido) {
  let descricao = "";

  if (comprimentoPreferido === "curto") {
    descricao = "Curto, acima dos ombros (tipo pixie cut, undercut, ou bob curto). Realça traços faciais.";
  } else if (comprimentoPreferido === "medio") {
    descricao = "Médio, entre ombros e cintura. Equilíbrio entre versatilidade e definição.";
  } else if (comprimentoPreferido === "longo") {
    descricao = "Longo, abaixo da cintura ou até metade das costas. Movimento e fluidez.";
  } else {
    // Se não especificou, usar biotipo
    if (biotipo === "pera") {
      descricao = "Médio, volume nos ombros. Não muito longo (deixaria pêra mais marcada).";
    } else if (biotipo === "triangulo_invertido") {
      descricao = "Longo, abaixo ombros. Equilibra ombros largos com comprimento nas costas.";
    } else {
      descricao = "Médio, oferece flexibilidade para estilo e compensação diária.";
    }
  }

  return { descricao };
}

/**
 * LÓGICA 3: Determinar franja
 */
function determinarFranja(assimetria, linhasRosto, usoFranja) {
  let incluir = false;
  let descricao = "";

  if (usoFranja === "sim_equilibra") {
    incluir = true;
    descricao = `Franja RETA ou assimétrica (dependendo de assimetria facial).
    ${assimetria === "lado_direito_mais_alto" ?
      "Colocar franja pendendo para lado ESQUERDO para equilibrar." :
      "Colocar franja pendendo para lado DIREITO para equilibrar."}
    Comprimento até sobrancelha, reta ou sutilmente inclinada.`;
  } else if (usoFranja === "sim_mais_largo") {
    incluir = true;
    descricao = `Franja RETA como compensação. Rosto ficava mais largo COM franja,
    então usar franja mais curta ou mais lateral para evitar efeito.`;
  } else if (usoFranja === "sim_nariz_proeminente") {
    incluir = true;
    descricao = `Franja LATERAL longa (não centralizada). Evitar franja reta (reforça nariz).
    Colocar cabelo lateralmente para quebrar linha vertical do nariz.`;
  } else if (usoFranja === "gostaria") {
    incluir = true;
    descricao = `Franja ${linhasRosto === "retas" ? "ASSIMÉTRICA ou lateral" : "em U ou curtinha"}
    para começar a experimentar. Comprimento até sobrancelha.`;
  } else {
    // "nao" - sem franja
    incluir = false;
    descricao = "";
  }

  return { incluir, descricao };
}

/**
 * LÓGICA 4: Compensação de Assimetria Facial
 */
function calcularCompensacaoAssimetria(assimetria, tipoCorte) {
  let texto = "";

  if (assimetria === "lado_direito_mais_alto") {
    texto = `LADO DIREITO está mais ALTO. Posicionamento de cabelo:
    - Jogar mais volume/comprimento para o LADO ESQUERDO (lado mais baixo)
    - Expor LADO DIREITO (lado mais alto)
    - Efeito: lado baixo fica mais volumoso/largo, lado alto mais limpo → equilibra`;
  } else if (assimetria === "lado_esquerdo_mais_alto") {
    texto = `LADO ESQUERDO está mais ALTO. Posicionamento de cabelo:
    - Jogar mais volume/comprimento para o LADO DIREITO (lado mais baixo)
    - Expor LADO ESQUERDO (lado mais alto)
    - Efeito: lado baixo fica mais volumoso/largo, lado alto mais limpo → equilibra`;
  } else {
    texto = `Rosto EQUILIBRADO. Ambos lados estão na mesma altura.
    - Distribuir volume igualmente em ambos lados
    - Opção: fazer corte assimétrico intencional (estilo fashion)
    - Advantage: pode experimentar compensação conforme contexto`;
  }

  return texto;
}

/**
 * LÓGICA 5: Linhas do corte (compensar linhas do rosto + corpo)
 */
function calcularLinhasCorte(linhasRosto, linhasCorpo) {
  let texto = "";

  // Se rosto tem curvas E corpo tem curvas → quebrar com retas
  if (linhasRosto === "curvas" && linhasCorpo === "curvas") {
    texto = `LINHAS RETAS/ESTRUTURADAS no corte para contrastar.
    - Evitar: franja curva, bobs muito redondos
    - Usar: linhas limpas, ângulos, assimetria
    - Efeito: quebra monotonia de curvas, afina visualmente`;
  }
  // Se rosto tem retas E corpo tem retas → quebrar com curvas
  else if (linhasRosto === "retas" && linhasCorpo === "retas") {
    texto = `LINHAS CURVAS/ONDULADAS no corte para quebrar monotonia.
    - Usar: ondas suaves, bobs em U, franja arredondada
    - Evitar: cortes muito estruturados/retos
    - Efeito: suaviza, adiciona movimento, aquecimento`;
  }
  // Mistura = flexível
  else {
    texto = `LINHAS MISTAS/DIAGONAIS no corte.
    - Combinar retas (estrutura) com curvas (movimento)
    - Usar: assimetria, camadas dinâmicas, franja lateral
    - Efeito: equilíbrio visual, dinamismo`;
  }

  return texto;
}

/**
 * LÓGICA 6: Luz e Sombra
 */
function calcularLuzSombra(biotipo, assimetria, tomPele) {
  let texto = `ILUMINAÇÃO E COR DO CABELO:\n`;

  // Luz expande, sombra retrai
  if (biotipo === "pera") {
    texto += `Biotipo Pêra (largo em baixo):
    - Escurecer base, deixar pontas mais claras (mechas) → retrai quadril
    - Ou: deixar mais claro em cima (ombros/coroa) → expande ombros`;
  } else if (biotipo === "triangulo_invertido") {
    texto += `Biotipo Triângulo Invertido (largo em cima):
    - Deixar mais claro em baixo/pontas → expande quadril
    - Evitar: cor muito escura nos ombros`;
  } else {
    texto += `Cor uniforme ou mechas estratégicas conforme preferência.`;
  }

  // Tom de pele
  if (tomPele === "quente") {
    texto += `\nTom de pele QUENTE: cabelo com tons quentes (castanho mel, caramelo, louro dourado)`;
  } else if (tomPele === "frio") {
    texto += `\nTom de pele FRIO: cabelo com tons frios (preto, castanho cinzento, louro platinado)`;
  }

  return texto;
}

/**
 * LÓGICA 7: Resultado esperado (sentimento visual)
 */
function calcularResultadoEsperado(assimetria, biotipo, linhasRosto, tipoCorte) {
  let texto = `Com este corte, o rosto ficará visualmente:
  - EQUILIBRADO (compensando ${assimetria === "equilibrado" ? "já está" : "a assimetria"})
  - ALONGADO ou ESTRUTURADO (conforme necessário)
  - MODERNO e BEM DEFINIDO
  - Com melhor PROPORÇÃO em relação ao corpo
  \nO cabelo trabalha a FAVOR do rosto, não contra.`;

  return texto;
}

// ===== FUNÇÃO AUXILIAR: Formatar para Inpainting =====
function formatarParaInpainting(promptCompleto) {
  // Remove explicações técnicas, mantém instruções visuais
  // Objetivo: criar prompt CONCISO e VISUAL para IA de geração

  const linhas = promptCompleto.split('\n').filter(l => l.trim());
  const promptLimpo = linhas
    .filter(l => !l.includes('INSTRUÇÕES PARA GERAÇÃO') &&
                  !l.includes('Manter rosto') &&
                  !l.includes('Corte deve ser'))
    .join('\n');

  return promptLimpo;
}

// ===== FUNÇÃO PRINCIPAL =====
function gerarPromptInpainting(analiseQuiz) {
  const promptCompleto = gerarPromptCorte(analiseQuiz);

  // Versão limpa para Inpainting
  const promptLimpo = `[DESCRIÇÃO VISUAL DO CORTE DE CABELO]\n${formatarParaInpainting(promptCompleto)}`;

  return {
    completo: promptCompleto,      // Versão com todas as explicações
    inpainting: promptLimpo         // Versão para IA gerar imagem
  };
}

// Exportar para usar em API
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { gerarPromptInpainting, gerarPromptCorte };
}
