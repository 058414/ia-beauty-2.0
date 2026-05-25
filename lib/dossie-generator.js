/**
 * GERADOR DE DOSSIÊ COMPLETO E PROFISSIONAL - MAGICFACE
 * Entrega final que serve como referência única para a usuária
 * Inclui análise completa + recomendação de corte específica e técnica
 */

function gerarDossieCompleto(nomeUsuaria, quiz) {
  const dossie = {
    nome: nomeUsuaria,
    data: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    secoes: []
  };

  // Seções que formam o dossiê completo — ORDEM CORRETA
  dossie.secoes.push(gerarCapa(nomeUsuaria));
  dossie.secoes.push(gerarIntroducao());
  dossie.secoes.push(gerarAssimetria(quiz));              // 1º: Meias-Faces + Assimetria
  dossie.secoes.push(gerarAncestralidade(quiz));          // 2º: Ancestralidade
  dossie.secoes.push(gerarAnaliseFacial(quiz));           // 3º: Análise Facial
  dossie.secoes.push(gerarAnaliseCorpo(quiz));            // 4º: Análise Corpo
  dossie.secoes.push(gerarRecomendacaoCorteCompleta(quiz)); // 5º: Elementos de Compensação Visual
  dossie.secoes.push(gerarGuiaPratico(quiz));
  dossie.secoes.push(gerarResumoCaracteristicas(quiz));
  dossie.secoes.push(gerarConclusao());

  return formatarDossieEmTexto(dossie);
}

function gerarCapa(nome) {
  return {
    titulo: 'CAPA - PROTOCOLO IA BEAUTY',
    conteudo: `
IA BEAUTY
PROTOCOLO PERSONALIZADO DE VISAGISMO
Análise Facial & Compensação Visual

────────────────────────────────────────────────────────────────

DOSSIÊ EXCLUSIVO DE: ${nome.toUpperCase()}

Data: ${new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}

Este é seu mapa pessoal de visagismo.
Use este dossiê como referência para todos os seus cortes e estilos.

O QUE VOCÊ VAI ENCONTRAR:
• Sua Genética Facial
• Análise do Seu Rosto
• Análise do Seu Corpo
• Seu Corte Recomendado
• Guia Prático Diário
• Resumo de Características e Solução
`
  };
}

function gerarIntroducao() {
  return {
    titulo: 'INTRODUÇÃO',
    conteudo: `
BEM-VINDA AO SEU DOSSIÊ IA BEAUTY

Este documento é seu companheiro. Aqui você encontra TUDO sobre você:
- Como seu rosto é único
- Como seu corpo funciona visualmente
- Qual corte foi desenvolvido especificamente para você
- Como usar seu cabelo como ferramenta de confiança

IMPORTANTE: Este dossiê é seu. Leve para o salão. Mostre ao cabeleireiro.
Use como base para toda vez que quiser um corte.

O que você vai encontrar aqui é resultado de análise profunda, não genérico.
Cada recomendação é para VOCÊ especificamente.

Visagismo não muda quem você é.
Visagismo revela quem você realmente é.
`
  };
}

function gerarAssimetria(quiz) {
  return {
    titulo: 'SUA ASSIMETRIA FACIAL — O QUE SUAS TRÊS FACES REVELAM',
    conteudo: `
Você tem 3 representações do seu rosto neste dossiê:

LADO ESQUERDO: Meia-face esquerda duplicada
CENTRO: Seu rosto completo (original)
LADO DIREITO: Meia-face direita duplicada

Observe as 3 imagens. Qual lado parece mais alto? Qual parece mais baixo?

${quiz.assimetria === 'lado_direito_mais_alto' ?
`SUA ANÁLISE VISUAL REVELA:
Seu lado DIREITO é mais ALTO.
Seu lado ESQUERDO é mais BAIXO.

Esta assimetria é seu superpoder visual. Você pode usá-la para:
- Alongar o rosto: jogar cabelo para o lado mais baixo (expõe lado mais alto)
- Equilibrar o rosto: jogar cabelo para o lado mais alto (expõe lado mais baixo)
- Variar sua apresentação conforme seu dia e energia` :

quiz.assimetria === 'lado_esquerdo_mais_alto' ?
`SUA ANÁLISE VISUAL REVELA:
Seu lado ESQUERDO é mais ALTO.
Seu lado DIREITO é mais BAIXO.

Esta assimetria é seu superpoder visual. Você pode usá-la para:
- Alongar o rosto: jogar cabelo para o lado mais baixo (expõe lado mais alto)
- Equilibrar o rosto: jogar cabelo para o lado mais alto (expõe lado mais baixo)
- Variar sua apresentação conforme seu dia e energia` :

`SUA ANÁLISE VISUAL REVELA:
Seus dois lados estão EQUILIBRADOS.

Você tem total flexibilidade para posicionar cabelo de qualquer forma.
Sua assimetria natural é mínima — aproveite essa liberdade para experimentar.`
}
`
  };
}

function gerarAncestralidade(quiz) {
  return {
    titulo: 'SUA GENÉTICA FACIAL - HERANÇAS E HISTÓRIA',
    conteudo: `
Seu rosto carrega a história de duas linhagens.

HERANÇA PATERNA - LADO ESQUERDO
Você herdou do seu pai características como:
- A forma e largura da mandíbula
- A altura e proeminência das maçãs
- O tamanho e definição do nariz
- A profundidade do queixo
- A largura da testa

Esses são traços estruturais que você pode reconhecer quando olha para as fotos de seu pai.

HERANÇA MATERNA - LADO DIREITO
Você herdou da sua mãe características como:
- O formato e abertura dos olhos
- A natureza das sobrancelhas
- O tamanho e definição dos lábios
- A textura da pele
- A capacidade expressiva

Esses são traços que você pode reconhecer quando olha para as fotos de sua mãe.

Observe nas 3 meias-faces: qual lado você reconhece mais a herança de qual lado da família? Essa interpretação é VOCÊ quem faz — você conhece suas origens.

SUA ASSIMETRIA FACIAL - SEU SUPERPODER

${quiz.assimetria === 'lado_direito_mais_alto' ?
`Seu lado DIREITO é mais ALTO
Seu lado ESQUERDO é mais BAIXO

Esta não é uma imperfeição. É a marca perfeita da sua genealogia.
Um lado herdou mais do pai, o outro lado mais da mãe.
E isso criou você.` :

quiz.assimetria === 'lado_esquerdo_mais_alto' ?
`Seu lado ESQUERDO é mais ALTO
Seu lado DIREITO é mais BAIXO

Esta não é uma imperfeição. É a marca perfeita da sua genealogia.
Um lado herdou mais do pai, o outro lado mais da mãe.
E isso criou você.` :

`Seus dois lados estão EQUILIBRADOS.

Isso significa que você herdou as heranças de forma mais simétrica.
Você tem total flexibilidade para experimentar diferentes estilos.`
}

COMO USAR SUA ASSIMETRIA A SEU FAVOR

${quiz.assimetria && quiz.assimetria !== 'equilibrado' ?
`Você pode variar sua aparência conforme seu contexto:

QUANDO QUER PARECER ALONGADA:
- Jogue cabelo para o lado mais baixo
- Deixe o lado mais alto exposto
- Resultado: rosto mais fino e definido

QUANDO QUER PARECER EQUILIBRADA:
- Jogue cabelo para o lado mais alto
- Deixe o lado mais baixo exposto
- Resultado: rosto mais proporcional

Você tem controle total. Use conforme seu dia.` :

`Com seu rosto equilibrado, você tem flexibilidade total.
Qualquer posicionamento vai funcionar bem.`
}
`
  };
}

function gerarAnaliseFacial(quiz) {
  return {
    titulo: 'ANÁLISE DO SEU ROSTO',
    conteudo: `
SUAS LINHAS FACIAIS

${quiz.linhasRosto === 'retas' ?
`Você tem linhas RETAS e ANGULOSAS.

Características:
- Traços bem definidos e estruturados
- Presença visual forte
- Aparência de autoridade e foco

Estratégia de corte:
- ADICIONAR MOVIMENTO para quebrar a rigidez
- ADICIONAR ONDAS para trazer calor
- RESULTADO: você fica mais acessível sem perder força` :

quiz.linhasRosto === 'curvas' ?
`Você tem linhas CURVAS e ARREDONDADAS.

Características:
- Traços suaves e aquecidos
- Passa acessibilidade naturalmente
- Expressão receptiva e amigável

Estratégia de corte:
- ADICIONAR ESTRUTURA para trazer definição
- ADICIONAR RETAS para criar força
- RESULTADO: você fica mais presente e estruturada` :

`Você tem linhas MISTAS - retas, curvas e diagonais.

Características:
- Traços dinâmicos e versáteis
- Capacidade de parecer múltiplas formas
- Flexibilidade natural

Estratégia de corte:
- Você pode variar conforme necessidade
- Use estrutura quando quer parecer focada
- Use movimento quando quer parecer relaxada`
}

${quiz.narizLargo || quiz.narizComprido ?
`
SUA CARACTERÍSTICA FACIAL: NARIZ

${quiz.narizLargo && quiz.narizComprido ?
`Você tem NARIZ LARGO E LONGO.

Como trabalhar isso no corte:
- Jogar cabelo para os LADOS (reduz exposição)
- Usar mechas laterais com MOVIMENTO VERTICAL
- Evitar cortes muito abertos ou todos presos
- Resultado: equilíbrio entre largura e comprimento` :

quiz.narizLargo ?
`Você tem NARIZ LARGO.

Como trabalhar isso no corte:
- Jogar cabelo para os LADOS (reduz exposição visual)
- Usar movimento lateral que distrai
- Evitar cortes muito abertos
- Resultado: reduz percepção de largura` :

`Você tem NARIZ LONGO.

Como trabalhar isso no corte:
- Usar franja ou cabelo que cubra parcialmente
- Adicionar largura visual com movimento nos lados
- Evitar cortes muito alongados
- Resultado: reduz percepção de comprimento`
}` : ''
}

${quiz.caracteristicaFacial && quiz.caracteristicaFacial !== 'nenhuma' ?
`
OUTRA CARACTERÍSTICA: ${quiz.caracteristicaFacial.toUpperCase()}

${quiz.caracteristicaFacial === 'papada' ?
`Como trabalhar isso no corte:
- NUNCA usar corte que caia reto para trás
- USAR linhas VERTICAIS que alongam
- USAR linhas DIAGONAIS PARA FRENTE que cortam a percepção
- USAR franja ou movimento que cubra parcialmente
- USAR repicado/movimento que quebra a linha reta
- Resultado: reduz visibilidade da papada` :

quiz.caracteristicaFacial === 'macas' ?
`Como trabalhar isso no corte:
- Jogar cabelo para o lado onde estão mais proeminentes
- Usar volume nas laterais para equilibrar
- Evitar cabelo muito preso
- Considerar franja ou mechas que reduzam foco
- Resultado: reduz destaque das maçãs` :

quiz.caracteristicaFacial === 'inchado' ?
`Como trabalhar isso no corte:
- VERTICALIZAR com linhas retas (quebra a fluidez das curvas)
- Jogar cabelo para o lado mais alto (cria assimetria)
- Usar corte com estrutura reta
- Evitar ondas, curvas e muito volume
- Resultado: rosto parece mais fino e estruturado` : ''
}` : ''
}
`
  };
}

function gerarAnaliseCorpo(quiz) {
  return {
    titulo: 'ANÁLISE DO SEU CORPO',
    conteudo: `
SEU BIOTIPO: ${definirBiotipo(quiz.biotipo)}

${gerarAnaliseCompleteCorpo(quiz.biotipo, quiz.linhasCorpo, quiz.comprimentoPreferido)}

ESTRATÉGIA BASEADA EM SEU COMPRIMENTO ESCOLHIDO

Você escolheu cabelo: ${definirComprimento(quiz.comprimentoPreferido)}

${gerarEstrategiaComprimento(quiz.biotipo, quiz.linhasCorpo, quiz.comprimentoPreferido)}

COMPENSAÇÃO VISUAL COM ROUPA - FERRAMENTA PODEROSA

Lembre-se: seu rosto vai até ONDE VOCÊ COLOCA A GOLA DA ROUPA.

Quando cabelo não chega em uma região, você compensa com:

LUZ = Roupa CLARA expande visualmente
SOMBRA = Roupa ESCURA retrai visualmente

${gerarCompensacaoRoupa(quiz.biotipo, quiz.comprimentoPreferido)}
`
  };
}

function gerarRecomendacaoCorteCompleta(quiz) {
  return {
    titulo: 'SEU CORTE RECOMENDADO - ESPECIFICAÇÃO TÉCNICA COMPLETA',
    conteudo: `
BASEADO EM SUA ANÁLISE COMPLETA

${gerarEspecificacaoCorte(quiz)}

COMO ESTE CORTE FUNCIONA PARA VOCÊ

${gerarExplicacaoCorte(quiz)}

POSICIONAMENTO PARA SUA ASSIMETRIA

${gerarPosicionamento(quiz)}

MANUTENÇÃO

- Frequência: A cada 4-6 semanas
- Entre cortes: Use secador para criar movimento estratégico
- Pentear sempre na direção que equilibra sua assimetria
- Hidrate 2x por semana

IMPORTÂNCIA DO CORTE TÉCNICO

Este corte foi desenvolvido considerando TODOS os seus traços:
- Sua assimetria facial
- Suas linhas de rosto
- Seu biotipo
- Suas linhas de corpo
- Seu comprimento escolhido
- Sua característica específica (se houver)

Não é coincidência. É PLANEJAMENTO.
`
  };
}

function gerarGuiaPratico(quiz) {
  return {
    titulo: 'GUIA PRÁTICO DIÁRIO',
    conteudo: `
COMO USAR SEU CORTE NO DIA A DIA

VARIAÇÃO CONFORME SEU HUMOR

${quiz.assimetria && quiz.assimetria !== 'equilibrado' ?
`Com sua assimetria, você pode variar:

DIA QUE QUER PARECER MAIS FOCADA:
- Jogue cabelo para o lado mais baixo
- Deixe o lado mais alto exposto
- Vista gola em V (alonga)
- Resultado: mais presente e estruturada

DIA QUE QUER PARECER MAIS RELAXADA:
- Jogue cabelo para o lado mais alto
- Deixe o lado mais baixo exposto
- Vista gola arredondada ou quadrada
- Resultado: mais acessível` :

`Seu rosto equilibrado oferece flexibilidade total.
- Use cabelo preso, solto, de lado, sem medo
- Qualquer posicionamento funciona bem`
}

SINCRONIZAR COM ROUPAS

A gola que escolher trabalha COM ou CONTRA seu corte:

GOLA EM V PROFUNDO:
- Verticaliza (alonga rosto)
- Melhor para: rosto largo ou quadrado
- Realça: estrutura e autoridade

GOLA EM U OU ARREDONDADA:
- Arredonda (aquece visualmente)
- Melhor para: rosto reto ou angular
- Realça: suavidade e acessibilidade

GOLA QUADRADA/RETANGULAR:
- Define (estrutura fria)
- Melhor para: rosto muito curvilíneo
- Realça: força e definição

COMPENSAÇÃO COM COR E BRILHO

LUZ EXPANDE (use roupa clara para expandir):
- Quer quadril maior? Roupa clara embaixo
- Quer ombro maior? Roupa clara em cima
- Quer rosto mais amplo? Roupa clara perto do rosto

SOMBRA RETRAI (use roupa escura para retrair):
- Quer ombro menor? Roupa escura em cima
- Quer quadril menor? Roupa escura embaixo
- Quer rosto mais fino? Roupa escura perto do rosto

O CINTO ESTRATÉGICO

O cinto é tão importante quanto o cabelo:

CINTO BEM DEFINIDO:
- Marca a cintura
- Multiplica o efeito do corte
- Melhor para: retângulo que quer marcar cintura

SEM CINTO OU CINTOS LARGOS:
- Deixa corpo mais fluido
- Melhor para: ampulheta (não quebra silhueta)

POSIÇÃO DO CINTO:
- Na cintura natural: marca o ponto mais fino
- Mais alto: alonga (modernidade)
`
  };
}

function gerarResumoCaracteristicas(quiz) {
  return {
    titulo: 'RESUMO - SUAS CARACTERÍSTICAS E SOLUÇÃO',
    conteudo: `
ESTA É SUA ANÁLISE COMPLETA

Com base nas suas respostas, você tem as seguintes características:

CARACTERÍSTICAS FACIAIS
---
Assimetria: ${quiz.assimetria === 'lado_direito_mais_alto' ? 'Lado direito mais alto, lado esquerdo mais baixo' : quiz.assimetria === 'lado_esquerdo_mais_alto' ? 'Lado esquerdo mais alto, lado direito mais baixo' : 'Rosto equilibrado'}
Linhas do rosto: ${quiz.linhasRosto === 'retas' ? 'Retas e angulosas' : quiz.linhasRosto === 'curvas' ? 'Curvas e arredondadas' : 'Mistura de retas e curvas'}
${quiz.narizLargo ? 'Nariz: Largo/Proeminente' : ''}
${quiz.narizComprido ? 'Nariz: Comprido/Alongado' : ''}
${quiz.papada ? 'Queixo: Com papada/redondez a compensar' : ''}
Desconforto: ${quiz.desconforto === 'sim' ? 'Sim' : 'Não'}

CARACTERÍSTICAS CORPORAIS
---
Biotipo: ${quiz.biotipo === 'retangulo' ? 'Retângulo (linear)' : quiz.biotipo === 'pera' ? 'Pêra (quadril largo)' : quiz.biotipo === 'triangulo_inv' ? 'Triângulo invertido (ombros)' : quiz.biotipo === 'ampulheta' ? 'Ampulheta (curvas)' : 'Oval (versátil)'}
Linhas do corpo: ${quiz.linhasCorpo === 'retas' ? 'Retas' : quiz.linhasCorpo === 'curvas' ? 'Curvas' : 'Mistura'}
Comprimento preferido: ${quiz.comprimentoPreferido === 'curto' ? 'Curto' : quiz.comprimentoPreferido === 'medio' ? 'Médio' : 'Longo'}
Marca cintura: ${quiz.cintura === 'sim' ? 'Sim' : quiz.cintura === 'raramente' ? 'Raramente' : 'Não'}

ESTILO & PREFERÊNCIAS
---
Franja: ${quiz.franja === 'sim' ? 'Usa' : quiz.franja === 'gostaria' ? 'Gostaria' : 'Não'}
Divisão: ${quiz.divisaoCabelo === 'sim' ? 'Ao meio' : 'Lateral'}
Energia: ${quiz.imagem === 'autoridade' ? 'Autoridade' : quiz.imagem === 'afeto' ? 'Afeto' : quiz.imagem === 'dinamismo' ? 'Dinamismo' : 'Sensualidade'}

ESTA É A SUA SOLUÇÃO

Para suas características específicas, o corte recomendado é:

${gerarSolucaoEspecifica(quiz)}

Este corte foi desenvolvido EXCLUSIVAMENTE para você, considerando:
✓ Sua assimetria facial (compensação visual pelo posicionamento)
✓ Suas linhas (rosto vs corpo - equilíbrio)
✓ Seu biotipo (como o comprimento age no seu corpo)
✓ Suas preferências (franja, comprimento, estilo)

VOCÊ NÃO PRECISA VOLTAR AQUI.

Este dossiê é seu. Leve para qualquer salão. Mostre para qualquer cabeleireiro.
Use como base para toda vez que quiser um corte que realmente funcione.

Guarde este PDF. É sua referência para sempre.
`
  };
}

function gerarSolucaoEspecifica(quiz) {
  let solucao = '✨ CORTE ESPECÍFICO PARA VOCÊ:\n\n';

  if (quiz.biotipo === 'pera') {
    solucao += '• TIPO: Bob estruturado ou corte que expande ombros\n';
  } else if (quiz.biotipo === 'triangulo_inv') {
    solucao += '• TIPO: Long Bob ou corte comprido com volume nas pontas\n';
  } else if (quiz.biotipo === 'retangulo') {
    solucao += '• TIPO: Bob assimétrico ou corte que quebra o linear\n';
  } else if (quiz.biotipo === 'ampulheta') {
    solucao += '• TIPO: Corte fluido com ondas que reforçam curvas\n';
  } else {
    solucao += '• TIPO: Flexível - escolha baseado nas linhas do rosto\n';
  }

  if (quiz.linhasRosto === 'retas') {
    solucao += '• MOVIMENTO: Com ondas/repicado (quebra rigidez)\n';
  } else if (quiz.linhasRosto === 'curvas') {
    solucao += '• MOVIMENTO: Estruturado/reto (cria definição)\n';
  } else {
    solucao += '• MOVIMENTO: Misto (flexibilidade)\n';
  }

  solucao += `• COMPRIMENTO: ${quiz.comprimentoPreferido === 'curto' ? 'Curto - realça traços' : quiz.comprimentoPreferido === 'medio' ? 'Médio - traz volume nos ombros' : 'Longo - movimento é essencial'}\n`;

  if (quiz.franja === 'sim') {
    solucao += '• FRANJA: Otimizar a existente\n';
  } else if (quiz.franja === 'gostaria') {
    solucao += '• FRANJA: Adicionar (tipo: ' + (quiz.linhasRosto === 'retas' ? 'lateral para quebrar rigidez' : 'reta para estruturar') + ')\n';
  } else {
    solucao += '• FRANJA: Não - criar movimento nas laterais\n';
  }

  solucao += `• POSICIONAMENTO: ${quiz.assimetria === 'lado_direito_mais_alto' ? 'Lado direito exposto (mais alto), cabelo caindo para esquerda' : quiz.assimetria === 'lado_esquerdo_mais_alto' ? 'Lado esquerdo exposto (mais alto), cabelo caindo para direita' : 'Flexível - você controla'}`;

  return solucao;
}

function gerarConclusao() {
  return {
    titulo: 'CONCLUSÃO - SEU PODER VISUAL',
    conteudo: `
Você agora entende:

1. Como seu rosto é construído (genética e assimetria)
2. Como seu corpo funciona visualmente
3. Como o cabelo é uma ferramenta
4. Como usar luz, sombra e roupa para compensar
5. Como variar sua aparência conforme sua necessidade

VOCÊ TEM CONTROLE TOTAL.

Este corte não é uma prisão. É uma ferramenta que se adapta a você.

Variar. Experimentar. Descobrir. Sentir-se bem.

Isso é visagismo de verdade.

Você é sua melhor versão não quando muda quem é.
Você é sua melhor versão quando revela quem realmente é.

Este dossiê é para isso.

Use-o. Confie nele. Leve para cada salão.

Você merece se sentir bem todos os dias.

---

IA Beauty © ${new Date().getFullYear()}
Análise Facial & Compensação Visual
`
  };
}

// FUNÇÕES DE SUPORTE

function definirBiotipo(biotipo) {
  const map = {
    'pera': 'PÊRA (quadril mais largo que ombros)',
    'triangulo_inv': 'TRIÂNGULO INVERTIDO (ombros mais largos que quadril)',
    'retangulo': 'RETÂNGULO (ombros e quadril proporcionais, cintura pouco marcada)',
    'ampulheta': 'AMPULHETA (ombros e quadril largos, cintura bem marcada)',
    'oval': 'OVAL (versátil, proporções harmoniosas)'
  };
  return map[biotipo] || 'não especificado';
}

function definirComprimento(comp) {
  const map = {
    'curto': 'CURTO (acima dos ombros)',
    'medio': 'MÉDIO (na altura dos ombros)',
    'longo': 'LONGO (abaixo dos ombros)'
  };
  return map[comp] || 'não especificado';
}

function gerarAnaliseCompleteCorpo(biotipo, linhasCorpo, comprimento) {
  if (biotipo === 'pera') {
    return `
DESAFIO: Seu quadril é mais largo que os ombros.
OBJETIVO: Fazer os ombros parecerem mais largos para equilibrar.

CARACTERÍSTICAS:
- Quadril pronunciado
- Ombros mais estreitos proporcionalmente
- Cintura pode ser bem definida ou não

COMO O CABELO AJUDA:
- Linhas RETAS na cintura criam setas horizontais que expandem
- Volume nos ombros traz peso visual para cima
- Movimento nas laterais do rosto aumenta largura visual`;
  } else if (biotipo === 'triangulo_inv') {
    return `
DESAFIO: Seus ombros são mais largos que o quadril.
OBJETIVO: Fazer o quadril parecer mais largo para equilibrar.

CARACTERÍSTICAS:
- Ombros largos e proeminentes
- Quadril mais estreito proporcionalmente
- Presença forte na parte superior

COMO O CABELO AJUDA:
- Movimento que traz volume para baixo
- Ondas nas pontas trazem peso visual para quadril
- Comprimento longo é crítico para equilibrar`;
  } else if (biotipo === 'retangulo') {
    return `
DESAFIO: Seu corpo é muito linear e geométrico.
OBJETIVO: Adicionar CURVA ou MOVIMENTO onde não existe.

CARACTERÍSTICAS:
- Ombros e quadril com largura similar
- Cintura pouco marcada
- Corpo estruturado e reto

COMO O CABELO AJUDA:
- Movimento quebra a rigidez
- Cortes que não são perfeitamente retos criam dinâmica
- Volume estratégico marca melhor a cintura`;
  } else if (biotipo === 'ampulheta') {
    return `
DESAFIO: Você já tem curvas pronunciadas. Não quebrar.
OBJETIVO: MANTER e CELEBRAR as curvas naturais.

CARACTERÍSTICAS:
- Ombros e quadril equilibrados e largos
- Cintura bem definida e marcada
- Silhueta em ampulheta clara

COMO O CABELO AJUDA:
- Movimento fluido reforça suas curvas
- Evitar estruturas muito rígidas que quebram o efeito
- Deixar a silhueta fluida e natural`;
  } else if (biotipo === 'oval') {
    return `
VANTAGEM: Você é versátil! Quase qualquer corte funciona.
OBJETIVO: Escolher conforme as linhas do ROSTO, não do corpo.

CARACTERÍSTICAS:
- Proporções harmoniosas
- Flexibilidade natural
- Capacidade de parecer múltiplas formas

COMO O CABELO AJUDA:
- Escolha a estratégia baseada nas linhas do rosto
- Você não tem restrições corpóreas
- Aproveite essa liberdade`;
  }
}

function gerarEstrategiaComprimento(biotipo, linhasCorpo, comprimento) {
  if (comprimento === 'curto') {
    return `
Seu cabelo CURTO não atua diretamente no corpo.
Ele atua principalmente REALÇANDO TRAÇOS FACIAIS.

COMPENSAÇÃO CORPORAL:
- 100% através de ROUPA (luz e sombra)
- Escolha bem sua gola, cores e cintos
- Camisetas e decotes são suas ferramentas`;
  } else if (comprimento === 'medio') {
    return `
Seu cabelo MÉDIO atua principalmente na região dos OMBROS.

IMPACTO:
- Influencia como os ombros são percebidos
- Cria volume na região do busto
- Pode marcar bem a cintura

ESTRATÉGIA:
- Volume e movimento nos ombros são chave
- Comprimento até altura do ombro maximiza o efeito`;
  } else {
    return `
Seu cabelo LONGO é sua maior ferramenta corporal.

IMPACTO:
- Influencia TODO o corpo
- Traz peso visual para baixo
- Cria movimento contínuo

ESTRATÉGIA:
- Movimento é ESSENCIAL (nunca deixar estático)
- Ondas nas pontas criam expansão
- Comprimento longo é crítico para equilibrar`;
  }
}

function gerarCompensacaoRoupa(biotipo, comprimento) {
  if (comprimento === 'curto' || comprimento === 'medio') {
    if (biotipo === 'pera') {
      return `
PÊRA com cabelo ${comprimento}:
- Roupa CLARA em cima (expande ombros)
- Roupa ESCURA embaixo (retrai quadril)
- Use cinto bem definido
- Resultado: visualmente mais equilibrada`;
    } else if (biotipo === 'triangulo_inv') {
      return `
TRIÂNGULO INVERTIDO com cabelo ${comprimento}:
- Roupa CLARA embaixo (expande quadril)
- Roupa ESCURA em cima (retrai ombros)
- Use cinto se quiser marcar cintura
- Resultado: visualmente mais equilibrada`;
    } else if (biotipo === 'retangulo') {
      return `
RETÂNGULO com cabelo ${comprimento}:
- Use CINTO bem definido
- Contraste entre cores em cima e embaixo
- Roupa com textura ou padrão (quebra linearidade)
- Resultado: cintura mais marcada`;
    } else if (biotipo === 'ampulheta') {
      return `
AMPULHETA com cabelo ${comprimento}:
- Use roupa que marque a cintura
- Cores que complementem sua pele
- Evitar contrastes muito altos (mantém elegância)
- Resultado: reforça suas curvas naturais`;
    } else {
      return `
OVAL com cabelo ${comprimento}:
- Você é flexível!
- Pode usar praticamente qualquer combinação
- Escolha o que faz você se sentir bem`;
    }
  } else {
    return `
Com cabelo LONGO, a roupa potencializa o efeito:

Se quer expandir uma região:
- Use roupa CLARA naquela área
- Claro + comprimento = expansão máxima

Se quer retrair uma região:
- Use roupa ESCURA naquela área
- Escuro + comprimento = retração máxima

Combine com o movimento do cabelo para efeito total`;
  }
}

function gerarEspecificacaoCorte(quiz) {
  return `
ESPECIFICAÇÃO TÉCNICA DO CORTE

COMPRIMENTO: ${definirComprimento(quiz.comprimentoPreferido)}

ESTRUTURA: ${quiz.linhasRosto === 'retas' ? 'COM MOVIMENTO (ondas, repicado)' : quiz.linhasRosto === 'curvas' ? 'COM ESTRUTURA (reto, angular)' : 'COM FLEXIBILIDADE'}

CAMADAS: ${gerarEspecCamadas(quiz.biotipo, quiz.linhasRosto)}

FRANJA: ${gerarEspecFranja(quiz.franja, quiz.linhasRosto, quiz.assimetria)}

MOVIMENTO: ${gerarEspecMovimento(quiz.biotipo, quiz.comprimentoPreferido)}

DIREÇÃO: ${gerarEspecDirecao(quiz.assimetria, quiz.biotipo)}

TÉCNICAS A USAR:
${gerarEspecTecnicas(quiz.biotipo, quiz.linhasRosto, quiz.linhasCorpo)}

POSICIONAMENTO ESPECÍFICO:
${gerarEspecPosicionamento(quiz.assimetria, quiz.biotipo)}
`;
}

function gerarEspecCamadas(biotipo, linhasRosto) {
  if (linhasRosto === 'retas') {
    return 'CAMADAS SUAVES - quebra o linear, adiciona movimento e fluidez';
  } else if (linhasRosto === 'curvas') {
    return 'CAMADAS DEFINIDAS - estrutura angular, cria definição';
  } else {
    return 'CAMADAS MISTAS - combina estrutura com movimento';
  }
}

function gerarEspecFranja(franja, linhasRosto, assimetria) {
  if (franja === 'sim') {
    return `SIM - Otimizar franja existente
${assimetria && assimetria !== 'equilibrado' ?
  '  Pendendo levemente para o lado que equilibra sua assimetria' :
  '  Centralizada ou assimétrica conforme preferência'}`;
  } else if (franja === 'gostaria') {
    return `SIM - Implementar franja
${linhasRosto === 'retas' ? 'LATERAL para quebrar rigidez' : linhasRosto === 'curvas' ? 'RETA para estruturar' : 'ASSIMÉTRICA para flexibilidade'}`;
  } else {
    return 'NÃO - Criar movimento nas laterais em vez de franja';
  }
}

function gerarEspecMovimento(biotipo, comprimento) {
  if (comprimento === 'curto') {
    return 'ESTRUTURADO com suavidade - realça traços faciais';
  } else if (comprimento === 'medio') {
    return 'DINÂMICO - traz volume e movimento na região dos ombros';
  } else {
    return 'FLUIDO E ONDULADO - movimento é essencial, nunca estático';
  }
}

function gerarEspecDirecao(assimetria, biotipo) {
  if (assimetria === 'lado_direito_mais_alto') {
    return 'LADO DIREITO exposto (lado mais alto), cabelo caindo para LADO ESQUERDO (lado mais baixo)';
  } else if (assimetria === 'lado_esquerdo_mais_alto') {
    return 'LADO ESQUERDO exposto (lado mais alto), cabelo caindo para LADO DIREITO (lado mais baixo)';
  } else {
    return 'SIMÉTRICO ou ASSIMÉTRICO conforme preferência - rosto equilibrado oferece flexibilidade';
  }
}

function gerarEspecTecnicas(biotipo, linhasRosto, linhasCorpo) {
  let tecnicas = '- Corte bem definido e preciso\n';

  if (biotipo === 'pera') {
    tecnicas += '- Volume concentrado nos ombros\n';
    tecnicas += '- Linhas retas na cintura para expandir\n';
  } else if (biotipo === 'triangulo_inv') {
    tecnicas += '- Volume nas pontas (abaixo ombro) para trazer para baixo\n';
    tecnicas += '- Evitar volume no topo\n';
  } else if (biotipo === 'retangulo') {
    tecnicas += '- Movimento que quebra o reto\n';
    tecnicas += '- Repicado ou desfiado para dinâmica\n';
  } else if (biotipo === 'ampulheta') {
    tecnicas += '- Movimento fluido que reforça curvas\n';
    tecnicas += '- Evitar estrutura muito rígida\n';
  }

  if (linhasRosto === 'retas') {
    tecnicas += '- Camadas suaves para aquecimento\n';
    tecnicas += '- Ondas ou repicado para fluidez\n';
  } else if (linhasRosto === 'curvas') {
    tecnicas += '- Estrutura angular para definição\n';
    tecnicas += '- Linhas limpas para força\n';
  }

  tecnicas += '- Hidratação e movimento natural do cabelo';

  return tecnicas;
}

function gerarEspecPosicionamento(assimetria, biotipo) {
  if (assimetria === 'lado_direito_mais_alto') {
    return `- Lado direito: mais exposto, revela altura
- Lado esquerdo: mais coberto, traz volume
- Efeito: equilíbrio e alongamento da assimetria`;
  } else if (assimetria === 'lado_esquerdo_mais_alto') {
    return `- Lado esquerdo: mais exposto, revela altura
- Lado direito: mais coberto, traz volume
- Efeito: equilíbrio e alongamento da assimetria`;
  } else {
    return `- Distribuição equilibrada
- Flexibilidade para variar conforme dia
- Você controla a apresentação`;
  }
}

function gerarExplicacaoCorte(quiz) {
  return `
COMO ESTE CORTE FUNCIONA

Este corte foi desenvolvido considerando SIMULTANEAMENTE:

1. Sua ASSIMETRIA FACIAL: ${quiz.assimetria === 'lado_direito_mais_alto' ? 'lado direito mais alto' : quiz.assimetria === 'lado_esquerdo_mais_alto' ? 'lado esquerdo mais alto' : 'equilibrado'}

2. Suas LINHAS DE ROSTO: ${quiz.linhasRosto}
   → O corte COMPENSA isso com movimento/estrutura oposta

3. Seu BIOTIPO: ${quiz.biotipo}
   → O comprimento e movimento trabalham seu corpo visualmente

4. Suas LINHAS DE CORPO: ${quiz.linhasCorpo}
   → O corte reforça ou quebra conforme necessário

5. Seu COMPRIMENTO ESCOLHIDO: ${quiz.comprimentoPreferido}
   → Define até onde o cabelo pode atuar

6. Sua CARACTERÍSTICA FACIAL: ${quiz.caracteristicaFacial || 'nenhuma específica'}
   → O corte inclui estratégia para amenizar se necessário

RESULTADO:
Um corte que NÃO É GENÉRICO. É seu. Específico. Técnico. Funcional.
`;
}

function gerarPosicionamento(quiz) {
  if (quiz.assimetria === 'lado_direito_mais_alto') {
    return `
SEU LADO DIREITO É MAIS ALTO

QUANDO QUER PARECER ALONGADA:
- Jogue cabelo para o LADO ESQUERDO
- Deixe LADO DIREITO exposto
- Use gola em V
- Resultado: rosto mais fino, mais presente

QUANDO QUER PARECER EQUILIBRADA:
- Jogue cabelo para o LADO DIREITO
- Deixe LADO ESQUERDO exposto
- Use gola arredondada
- Resultado: rosto mais proporcional, mais relaxada

Você controla a apresentação diariamente.`;
  } else if (quiz.assimetria === 'lado_esquerdo_mais_alto') {
    return `
SEU LADO ESQUERDO É MAIS ALTO

QUANDO QUER PARECER ALONGADA:
- Jogue cabelo para o LADO DIREITO
- Deixe LADO ESQUERDO exposto
- Use gola em V
- Resultado: rosto mais fino, mais presente

QUANDO QUER PARECER EQUILIBRADA:
- Jogue cabelo para o LADO ESQUERDO
- Deixe LADO DIREITO exposto
- Use gola arredondada
- Resultado: rosto mais proporcional, mais relaxada

Você controla a apresentação diariamente.`;
  } else {
    return `
SEU ROSTO ESTÁ EQUILIBRADO

Você tem total flexibilidade:
- Pode usar cabelo preso, solto, de lado
- Pode variar conforme seu dia
- Qualquer posicionamento vai funcionar bem

Use seu equilíbrio a favor. Experimente. Divirta-se.`;
  }
}

function formatarDossieEmTexto(dossie) {
  let texto = '';

  for (let i = 0; i < dossie.secoes.length; i++) {
    const secao = dossie.secoes[i];

    // Título da seção
    texto += '**' + secao.titulo + '**\n\n';

    // Conteúdo limpo
    let conteudo = secao.conteudo.trim();

    // Remove caracteres problemáticos
    conteudo = conteudo
      .replace(/[%*]{2,}/g, '')  // Remove %% e **
      .replace(/█/g, '')
      .replace(/▌/g, '')
      .replace(/╔/g, '')
      .replace(/╗/g, '')
      .replace(/╚/g, '')
      .replace(/╝/g, '')
      .replace(/═/g, '-')
      .replace(/║/g, '|')
      .replace(/━/g, '-')
      .trim();

    texto += conteudo;

    if (i < dossie.secoes.length - 1) {
      texto += '\n\n---\n\n';
    }
  }

  return texto;
}

// Exportar
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { gerarDossieCompleto };
}
