/**
 * MAGICFACE - GERADOR DE PROTOCOLO
 * Integração com Claude API para gerar protocolos personalizados
 */

async function gerarProtocoloComIA(nomeUsuaria, dadosQuiz, imagensMeiasFaces) {
  try {
    console.log('Iniciando geração de dossiê para:', nomeUsuaria);

    // Tentar usar API primeiro
    const systemPrompt = criarSystemPromptMagicFace(nomeUsuaria);
    const userPrompt = montarPromptUsuaria(nomeUsuaria, dadosQuiz);

    const isLocalhost = window.location.hostname === 'localhost';
    const apiUrl = isLocalhost
      ? 'http://localhost:3001/api/gerar-protocolo'
      : '/api/gerar-protocolo';

    console.log('Chamando endpoint:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: nomeUsuaria,
        quiz: dadosQuiz,
        systemPrompt: systemPrompt,
        userPrompt: userPrompt
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.protocolo) {
        console.log('Dossiê gerado via API com sucesso!');
        return limparProtocolo(data.protocolo);
      }
    }

    throw new Error('API indisponível, usando fallback');

  } catch (error) {
    console.log('Usando gerador de dossiê local...');
    return gerarDossieLocal(nomeUsuaria, dadosQuiz);
  }
}

function gerarDossieLocal(nomeUsuaria, quiz) {
  // Usar o gerador de dossiê completo
  return gerarDossieCompleto(nomeUsuaria, quiz);
}

function limparProtocolo(texto) {
  if (!texto) return '';

  return texto
    // Remove símbolos especiais problemáticos
    .replace(/█/g, '')
    .replace(/▌/g, '')
    .replace(/□/g, '')
    .replace(/◆/g, '')
    .replace(/═+/g, '─')
    .replace(/║/g, '│')
    .replace(/╔/g, '┌')
    .replace(/╗/g, '┐')
    .replace(/╚/g, '└')
    .replace(/╝/g, '┘')
    // Converte caracteres especiais para mais legíveis
    .replace(/☑/g, '✔')
    .replace(/☐/g, '○')
    // Remove múltiplas quebras de linha
    .replace(/\n\n\n+/g, '\n\n')
    // Garante codificação UTF-8 correta
    .trim();
}

function montarPromptUsuaria(nomeUsuaria, quiz) {
  // Mapear respostas do quiz para descrições legíveis
  const mapLinhas = {
    'retas': 'retas e angulosas',
    'curvas': 'curvas e arredondadas',
    'mistura': 'mistura de retas e curvas'
  };

  const mapBiotipo = {
    'retangulo': 'Retângulo',
    'pera': 'Pêra',
    'triangulo_inv': 'Triângulo Invertido',
    'ampulheta': 'Ampulheta',
    'oval': 'Oval'
  };

  const mapComprimento = {
    'curto': 'Curto (acima dos ombros)',
    'medio': 'Médio (na altura dos ombros)',
    'longo': 'Longo (próximo da cintura ou abaixo)'
  };

  const mapImagem = {
    'autoridade': 'Autoridade e presença',
    'afeto': 'Afeto e delicadeza',
    'dinamismo': 'Dinamismo e modernidade',
    'sensualidade': 'Sensualidade elegante'
  };

  // Construir narrativa de energia baseada em linhas do rosto + corpo + imagem desejada
  let energiaDescrita = '';
  const linhasRosto = mapLinhas[quiz.linhasRosto];
  const linhasCorpo = mapLinhas[quiz.linhasCorpo];
  const imagemDesejada = mapImagem[quiz.imagem];

  if (quiz.linhasRosto === 'retas' && quiz.linhasCorpo === 'retas') {
    energiaDescrita = 'sua energia é estruturada, controlada, com presença marcante. Retas tanto no rosto quanto no corpo criam uma aura de autoridade e poder';
  } else if (quiz.linhasRosto === 'curvas' && quiz.linhasCorpo === 'curvas') {
    energiaDescrita = 'sua energia é envolvente, morna, sensual. Curvas em ambos os planos (rosto e corpo) criam uma fluidez natural, elegância sem esforço';
  } else if (quiz.linhasRosto === 'mistura' || quiz.linhasCorpo === 'mistura') {
    energiaDescrita = 'sua energia é versátil e adaptável. A mistura de linhas te dá flexibilidade para ser autoridade quando precisa, sensual quando quer';
  }

  return `PROTOCOLO PERSONALIZADO PARA ${nomeUsuaria.toUpperCase()}

═══════════════════════════════════════════════════════════════

QUEM VOCÊ É (Reconhecimento):
${nomeUsuaria}, você chegou aqui porque sente que seu cabelo pode trabalhar a SEU FAVOR. Percebe que há algo no rosto ou corpo que você gostaria de compensar. E está certa. ${energiaDescrita}. Essa é sua superpotência para compensação visual.

CARACTERÍSTICAS FÍSICAS E VISUAIS:
• Linhas do Rosto: ${linhasRosto}
• Linhas do Corpo: ${linhasCorpo}
• Perceção do Rosto: ${quiz.percepcaoRosto || 'Não especificado'}
• Biotipo do Corpo: ${mapBiotipo[quiz.biotipo] || quiz.biotipo}
• Comprimento Atual: ${mapComprimento[quiz.comprimentoCabelo] || quiz.comprimentoCabelo}

CONTEXTO E INTENÇÕES:
• Energia/Imagem Desejada: ${imagemDesejada}
• Divisão de Cabelo: ${quiz.divisaoCabelo === 'sim' ? 'Ao meio (cria linha vertical no rosto)' : 'De lado (mais maleável)'}
• Uso de Franja: ${quiz.franja || 'Não usa'}
${quiz.queixo && quiz.queixo !== 'nao' ? `• Preocupação com Queixo/Papada: ${quiz.queixo === 'sim' ? 'Quer compensar' : 'Um pouco incômodo'}` : ''}
${quiz.cintura ? `• Marca de Cintura: ${quiz.cintura === 'sim' ? 'Sim, muito marcada' : quiz.cintura === 'raramente' ? 'Raramente' : 'Não marca'}` : ''}

═══════════════════════════════════════════════════════════════

TAREFA PARA VOCÊ (Claude):

Gere um protocolo PROFUNDO, ESPECÍFICO e EXCLUSIVO para ${nomeUsuaria} baseado EXATAMENTE nestes dados.

Cada recomendação deve ser tão específica que seria IMPOSSÍVEL usar para outra pessoa. Isso significa:
- Entender EXATAMENTE qual lado é mais alto/baixo (assimetria)
- Trabalhar com as LINHAS específicas do rosto e corpo
- Educar sobre ELEMENTOS/FERRAMENTAS concretas (tipos de linhas, posicionamento, técnicas, movimento)
- Explicar O PORQUÊ visual de cada elemento (qual linha compensa qual, como o volume ajuda, qual mensagem comunica, etc)

Estruture em EXATAMENTE 4 SEÇÕES:
1. Sua Assimetria Facial — O Mapa do Seu Rosto
2. Seu Corpo — Como as Linhas e o Volume Dialogam com Seu Biotipo
3. Suas Ferramentas de Compensação Visual — O Que Cada Elemento Consegue Fazer
4. Estilização Diária — Como Você Comanda a Compensação Visual

IMPORTANTE:
- Parágrafos fluidos, ZERO bullets dentro das seções
- Linguagem pessoal direto para ${nomeUsuaria}
- 1200-1500 palavras TOTAL
- Cada elemento com EXPLICAÇÃO visual clara do PORQUÊ
- NUNCA genérico
- Reforce que ${nomeUsuaria} está no comando. Os elementos são ferramentas, não prescrição`;
}

// Fallback se API falhar - PROTOCOLO COMPLETO COM ANÁLISE PROFUNDA DO CORPO
function gerarProtocoloFallback(nomeUsuaria, quiz) {
  const analiseAssimetria = analisarAssimetria(quiz.assimetria, quiz.desconforto);
  const analiseCorpo = analisarCorpoCompleto(quiz.biotipo, quiz.linhasCorpo, quiz.comprimentoPreferido);
  const analiseLinhas = analisarLinhasRostoCorpo(quiz.linhasRosto, quiz.linhasCorpo);
  const analiseCorte = gerarRecomendacaoCorte(quiz.biotipo, quiz.linhasRosto, quiz.linhasCorpo, quiz.franja, quiz.assimetria);

  const protocolo = `**1. Sua Assimetria Facial — O Mapa do Seu Rosto**

${nomeUsuaria}, seu rosto é seu mapa de compensação visual. Um dos lados naturalmente é mais alto ou mais baixo, e essa é sua superpotência para criar equilíbrio instantâneo através do posicionamento do cabelo.

${analiseAssimetria}

**Linhas do seu rosto:** ${quiz.linhasRosto === 'retas' ? 'Retas e angulosas' : quiz.linhasRosto === 'curvas' ? 'Curvas e arredondadas' : 'Mistura de retas e curvas'}.

${quiz.caracteristicaFacial && quiz.caracteristicaFacial !== 'nenhuma' ? `**Característica específica a compensar:** ${quiz.caracteristicaFacial}. Esta será a prioridade na recomendação de corte.` : ''}

**2. Seu Corpo — Como o Corte Dialoga com Seu Biotipo**

O corte de cabelo é uma ferramenta que age DIRETAMENTE no seu corpo através das linhas e setas visuais que cria. Vamos detalhar exatamente como:

${analiseCorpo}

**3. Seu Corte Ideal — Técnicas e Posicionamento**

${analiseCorte}

**4. Estilização Diária — Compensação Visual na Prática**

${gerarEstilizacaoDiaria(quiz.biotipo, quiz.linhasRosto, quiz.linhasCorpo, quiz.assimetria)}

---

Protocolo gerado via análise MagicFace - Metodologia de Visagismo`;

  // Limpar símbolos especiais
  return limparSimbols(protocolo);
}

function analisarAssimetria(assimetria, desconforto) {
  let analise = '';

  if (assimetria === 'lado_direito_mais_alto') {
    analise = `**Sua assimetria:** LADO DIREITO mais ALTO, LADO ESQUERDO mais BAIXO.

**Estratégia de compensação:**
- Para VERTICALIZAR/AFINAR: Jogar cabelo para o LADO ESQUERDO (mais baixo), expor o LADO DIREITO (mais alto)
  - Resultado: Lado baixo fica mais volumoso, lado alto mais limpo → rosto parece mais fino e alongado

- Para ALARGAR/EQUILIBRAR: Jogar cabelo para o LADO DIREITO (mais alto), expor o LADO ESQUERDO (mais baixo)
  - Resultado: Lado baixo exposto, lado alto coberto → rosto parece mais equilibrado

${desconforto === 'sim' ? '**Seu desconforto:** Você sente incômodo com essa assimetria, então vamos priorizá-la na recomendação de corte.' : '**Seu conforto:** Você já se sente bem com sua assimetria, então vamos usá-la como ferramenta opcional de estilo.'}`;
  } else if (assimetria === 'lado_esquerdo_mais_alto') {
    analise = `**Sua assimetria:** LADO ESQUERDO mais ALTO, LADO DIREITO mais BAIXO.

**Estratégia de compensação:**
- Para VERTICALIZAR/AFINAR: Jogar cabelo para o LADO DIREITO (mais baixo), expor o LADO ESQUERDO (mais alto)
  - Resultado: Lado baixo fica mais volumoso, lado alto mais limpo → rosto parece mais fino e alongado

- Para ALARGAR/EQUILIBRAR: Jogar cabelo para o LADO ESQUERDO (mais alto), expor o LADO DIREITO (mais baixo)
  - Resultado: Lado baixo exposto, lado alto coberto → rosto parece mais equilibrado

${desconforto === 'sim' ? '**Seu desconforto:** Você sente incômodo com essa assimetria, então vamos priorizá-la na recomendação de corte.' : '**Seu conforto:** Você já se sente bem com sua assimetria, então vamos usá-la como ferramenta opcional de estilo.'}`;
  } else {
    analise = `**Sua assimetria:** EQUILIBRADA — ambos os lados estão na mesma altura.

**Estratégia de compensação:**
- Você pode experimentar cortes simétricos OU assimétricos conforme seu humor
- Sua flexibilidade facial permite diferentes posicionamentos de cabelo
- Vamos focar em outras características (linhas, corpo, franja) para criar impacto visual`;
  }

  return analise;
}

function analisarCorpoCompleto(biotipo, linhasCorpo, comprimentoPreferido) {
  let analise = `**Seu biotipo:** ${biotipo === 'pera' ? 'PÊRA (largo em baixo - quadril maior que ombros)' :
                      biotipo === 'triangulo_inv' ? 'TRIÂNGULO INVERTIDO (largo em cima - ombros maiores que quadril)' :
                      biotipo === 'retangulo' ? 'RETÂNGULO (ombros e quadril proporcionais, sem marcação de cintura)' :
                      biotipo === 'ampulheta' ? 'AMPULHETA (curvas pronunciadas, cintura marcada)' :
                      biotipo === 'oval' ? 'OVAL (versátil, proporcional)' : 'não especificado'}

**Linhas do seu corpo:** ${linhasCorpo === 'retas' ? 'Retas (estrutura definida, linear)' :
                             linhasCorpo === 'curvas' ? 'Curvas (fluida, suave)' :
                             'Mistura de retas e curvas'}

${analisisarEstrategiaPorBiotipo(biotipo, linhasCorpo, comprimentoPreferido)}`;

  return analise;
}

function limparSimbols(texto) {
  // Remove símbolos especiais que causam problemas no PDF
  return texto
    .replace(/📍/g, '>')
    .replace(/✓/g, '✔')
    .replace(/✗/g, '✘')
    .replace(/★/g, '*')
    .replace(/⚠️/g, 'ATENÇÃO:')
    .replace(/❌/g, '')
    .replace(/✅/g, '')
    .replace(/═+/g, '-')
    .replace(/║/g, '|')
    .replace(/█/g, '')
    .replace(/▌/g, '');
}

function analisisarEstrategiaPorBiotipo(biotipo, linhasCorpo, comprimento) {
  let estrategia = '\n**COMO O CABELO COMPENSA SEU CORPO:\n\n';

  if (biotipo === 'pera') {
    estrategia += `📍 PÊRA (quadril largo) — O cabelo precisa EXPANDIR os ombros ou não descer direto até o quadril.

**QUANDO CABELO NA CINTURA:**
✓ Opção 1: Corte RETO na cintura + linha horizontal = expande ombro visualmente
  - Como funciona: Linhas horizontais são "setas" que apontam para os lados
  - Resultado: Ombro parece mais largo → equilibra quadril
  - Bônus: Cinto + roupa clara nessa região = super eficaz

✓ Opção 2: Corte V/U na cintura + mechas claras
  - Como funciona: Mechas claras expandem (luz), corte côncavo cria movimento
  - Resultado: Volume na cintura + claridade = expande ombro
  - Bônus: Roupa clara embaixo para equilibrar

**QUANDO CABELO NO OMBRO:**
✓ Use corte RETO: linha reta no ombro = expande ombro visualmente
  - Resultado: Percepção de corpo ampulheta mesmo com quadril largo
  - Bônus: Cinto bem definido

⚠️ EVITAR corte V/U no ombro (piora a pêra): comprime cintura e destaca mais o quadril

**QUANDO CABELO CURTO (não chega região):**
❌ Não é possível compensar com cabelo
✅ Usar LUZ E SOMBRA nas roupas: roupa clara em cima (expande ombro), escura embaixo`;
  }
  else if (biotipo === 'triangulo_inv') {
    estrategia += `📍 TRIÂNGULO INVERTIDO (ombro largo) — O cabelo precisa EXPANDIR o quadril ou trazer volume para baixo.

**QUANDO CABELO NA CINTURA:**
✓ Opção 1: Corte RETO na cintura + roupa clara embaixo
  - Como funciona: Linha reta expande lateralmente (seta horizontal)
  - Resultado: Quadril parece mais largo → equilibra ombro
  - Bônus: Cinto + roupa clara = ampulheta perfeita

✓ Opção 2: Corte V/U na cintura + mechas claras nas pontas
  - Como funciona: Côncavo cria movimento descendente, luz expande
  - Resultado: Peso visual desce para quadril
  - Bônus: Roupa clara embaixo intensifica

**QUANDO CABELO NO OMBRO:**
⚠️ CRÍTICO: Evitar corte RETO (piora ainda mais!)
✓ Solução: Compensação EXCLUSIVAMENTE por LUZ E SOMBRA nas roupas
  - Roupa CLARA embaixo (expande quadril)
  - Roupa ESCURA em cima (retrai ombro)
  - Resultado: Equilíbrio visual entre ombro e quadril

**QUANDO CABELO LONGO:**
✓ Usar ondas nas pontas (abaixo ombro) para trazer volume para baixo
  - Movimento visual desce, equilibra ombro largo`;
  }
  else if (biotipo === 'retangulo') {
    estrategia += `📍 RETÂNGULO (linear, sem marcação) — O cabelo precisa QUEBRAR a monotonia com curvas ou diagonais.

**ESTRATÉGIA PRINCIPAL:** Adicionar CURVA ou DIAGONAL onde não existe

✓ Opção 1: Corte RETO no ombro (estrutura) + Corte V/U na cintura (movimento)
  - Como funciona: Repete reta no topo, adiciona diagonal/curva em baixo
  - Resultado: Cria percepção de cintura, afina visualmente

✓ Opção 2: Corte com FRANJA LATERAL + volume lateral
  - Como funciona: Diagonal dinâmica quebra retilíneo
  - Resultado: Suaviza linhas retas, adiciona movimento

✓ Opção 3: Bob com comprimento variado
  - Como funciona: Linhas não-uniformes quebram monotonia
  - Resultado: Mais movimento, menos "quadrado"

**BÔNUS CINTURA:** Se marca bem a cintura com cinto, use corte que reforce isso`;
  }
  else if (biotipo === 'ampulheta') {
    estrategia += `📍 AMPULHETA (curvas reforçadas) — O cabelo deve REFORÇAR as curvas, não quebrá-las.

**ESTRATÉGIA PRINCIPAL:** Manter as curvas, evitar contrastes muito altos

✓ Opção 1: Corte comprido com ondas suaves
  - Como funciona: Movimento fluido + comprimento = reforça curva do corpo
  - Resultado: Silhueta em ampulheta mais pronunciada
  - Cuidado: Não deixar muito estático

✓ Opção 2: Corte reto estruturado (se rosto tem muitas curvas)
  - Como funciona: Reto no cabelo contrasta com curvas do corpo
  - Resultado: Equilíbrio sem quebrar a ampulheta

**BÔNUS:** Evitar contrastes muito altos em cor (mantém elegância). Movimento é mais importante que estrutura`;
  }
  else if (biotipo === 'oval') {
    estrategia += `📍 OVAL (versátil) — Você pode usar praticamente qualquer corte!

**ESTRATÉGIA:** Escolher baseado em LINHAS DO ROSTO, não do biotipo

Se rosto tem muitas CURVAS → use corte RETO (contraste)
Se rosto tem muitas RETAS → use corte ONDULADO (quebra monotonia)
Se rosto é DIAGONAL → use reto ou diagonal estratégico`;
  }

  estrategia += `

**RESUMO DE COMPRIMENTO:**
- Cabelo na CINTURA: compensa corpo inteiro
- Cabelo no OMBRO: age na região dos ombros + superior
- Cabelo CURTO: nenhuma compensação corporal (use roupa)
- Cabelo LONGO: influencia corpo inteiro, importância de movimento`;

  return estrategia;
}

function analisarLinhasRostoCorpo(linhasRosto, linhasCorpo) {
  let analise = '\n**INTERAÇÃO DE LINHAS — O PRINCÍPIO CRÍTICO:**\n\n';

  analise += `As linhas governam o direcionamento do olhar. Cada linha reforça ou equilibra outras linhas por VOLUME DE INFORMAÇÃO.\n\n`;

  if (linhasRosto === 'curvas' && linhasCorpo === 'curvas') {
    analise += `🔴 Seu ROSTO é CURVILÍNEO + Seu CORPO é CURVILÍNEO

PROBLEMA: Excesso de linhas quentes/emocionais
SOLUÇÃO: Quebrar com LINHAS RETAS no corte
- Corte com linhas limpas, ângulos, assimetria
- Evitar: franja muito arredondada, bobs muito redondos
- Resultado: Afina visualmente, quebra monotonia`;
  }
  else if (linhasRosto === 'retas' && linhasCorpo === 'retas') {
    analise += `🔵 Seu ROSTO é RETO + Seu CORPO é RETO

PROBLEMA: Excesso de linhas frias/estruturadas (muito linear)
SOLUÇÃO: Quebrar com LINHAS CURVAS no corte
- Corte com ondas, bobs em U, movimento fluido
- Evitar: cortes muito estruturados
- Resultado: Suaviza, adiciona movimento, aquecimento`;
  }
  else {
    analise += `🟡 Seu ROSTO é MISTO + Seu CORPO é MISTO (ou rosto/corpo diferentes)

ESTRATÉGIA: Flexibilidade de compensação
- Você pode equilibrar diferentes áreas
- Combinar retas (estrutura) com curvas (movimento)
- Usar diagonais para dinamismo`;
  }

  return analise;
}

function gerarRecomendacaoCorte(biotipo, linhasRosto, linhasCorpo, franja, assimetria) {
  let recomendacao = '';

  recomendacao += `**Tipo de Corte Recomendado:**\n\n`;

  if (biotipo === 'pera') {
    recomendacao += `📍 Para seu biotipo PÊRA, recomendamos cortes que EXPANDEM OS OMBROS:
    - Bob estruturado assimétrico com volume nos ombros
    - Ou corte Mullet Moderno com diagonal dinâmica
    - Se rosto curvilíneo + corpo curvilíneo: Bob estruturado quebra as curvas`;
  }
  else if (biotipo === 'triangulo_inv') {
    recomendacao += `📍 Para seu biotipo TRIÂNGULO INVERTIDO, recomendamos cortes que EQUILIBRAM o ombro:
    - Long Bob alongado (abaixo ombro) sem volume no topo
    - Ou Wave Comprido com volume nas pontas (longe do ombro)
    - Comprimento é crítico: quanto mais longo, melhor`;
  }
  else if (biotipo === 'retangulo') {
    recomendacao += `📍 Para seu biotipo RETÂNGULO, recomendamos cortes que QUEBRAM A MONOTONIA:
    - Bob assimétrico com franja lateral
    - Ou Mullet Moderno (diagonal dinâmica)
    - Objetivo: Adicionar curva ou diagonal`;
  }
  else if (biotipo === 'ampulheta') {
    recomendacao += `📍 Para seu biotipo AMPULHETA, recomendamos cortes que REFORÇAM AS CURVAS:
    - Long Waves com ondas suaves e naturais
    - Ou Bob estruturado se rosto tem muitas curvas
    - Movimento é chave: nunca deixar estático`;
  }
  else if (biotipo === 'oval') {
    recomendacao += `📍 Para seu biotipo OVAL, você tem flexibilidade:
    - Escolha corte baseado nas linhas do seu ROSTO
    - Se rosto curvo: use reto. Se rosto reto: use ondulado`;
  }

  if (franja && franja !== 'nao') {
    recomendacao += `\n\n**Sobre Franja:**`;
    if (franja === 'sim_equilibra') {
      recomendacao += `\n✅ Você usa franja reta e se sente equilibrada — ótimo!
      - Manter e otimizar o comprimento
      - Cuidado: evitar linhas que se repetem (espelhamento visual)`;
    } else if (franja === 'sim_mais_largo') {
      recomendacao += `\n⚠️ Franja reta deixa seu rosto mais largo — vamos revisar
      - Opção 1: Remover franja
      - Opção 2: Usar franja mais curta ou lateral`;
    } else if (franja === 'gostaria') {
      recomendacao += `\n✨ Você gostaria de usar franja — excelente!
      - Tipo: ${linhasRosto === 'retas' ? 'Assimétrica ou lateral' : 'Em U ou curtinha'}
      - Comprimento: até sobrancelha`;
    }
  }

  recomendacao += `\n\n**Posicionamento para sua assimetria (${assimetria}):**
  - Compensar a assimetria facial através do posicionamento estratégico do cabelo
  - Usar como ferramenta diária (você controla a compensação)`;

  return recomendacao;
}

function gerarEstilizacaoDiaria(biotipo, linhasRosto, linhasCorpo, assimetria) {
  return `**Como usar seu corte no dia a dia:**

1. **Assimetria Facial:** Use o posicionamento do cabelo para variar conforme seu contexto
   - Dia que se sente mais expansiva? Expõe o lado mais baixo
   - Dia que prefere mais foco? Cobre o lado menos confortável

2. **Interação com Roupas:** O corte dialoga com a gola/decote
   - Gola em V: verticaliza (afina)
   - Gola em U: arredonda (quente)
   - Gola quadrada: estrutura (fria)

3. **Luz e Sombra nas Roupas:** Potencializa a compensação corporal
   - Roupa clara: expande
   - Roupa escura: retrai
   - Exemplo: ${biotipo === 'triangulo_inv' ? 'Triângulo invertido: clara embaixo, escura em cima' : 'Use estrategicamente conforme objetivo do dia'}

4. **Movimento:** O corte é dinâmico
   - Pode variar com pentado diferente
   - Secador cria movimento + volume
   - Seu cabelo se adapta ao dia

**Lembre-se:** Você é quem controla a compensação visual. O corte é uma ferramenta, não uma prisão.`;
}
