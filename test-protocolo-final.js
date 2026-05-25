/**
 * TESTE DE PROTOCOLO FINAL
 * Simula a geração de protocolo com novo user prompt
 */

// Simular os dados de um quiz respondido
const quizTestado = {
  arquetipo: 'dinamica',
  personalidade: ['dinamica'],
  contextoTemporal: 'explorar',
  oQueQuerComunicar: 'dinamismo',
  momentoVida: [],
  percepcaoRosto: 'largo',
  desconforto: 'sim',
  franja: 'mais_largo',
  linhasRosto: 'curvas',
  narizLargo: false,
  narizComprido: false,
  caracteristicaFacial: 'macas',
  biotipo: 'pera',
  linhasCorpo: 'curvas',
  comprimentoPreferido: 'medio',
  ondeQuerEquilibrio: 'ambos'
};

// Copiar as funções do protocolo-gerador.js (sem módulos)
function criarSystemPromptFinal() {
  return `
╔══════════════════════════════════════════════════════════════════════════════╗
║                    IA BEAUTY - PROTOCOLO DE COMPENSAÇÃO VISUAL               ║
║           ANÁLISE INTEGRADA: QUEM + COMPENSAÇÃO VISUAL + SUSTENTABILIDADE   ║
╚══════════════════════════════════════════════════════════════════════════════╝

VOCÊ É UM ESPECIALISTA EM COMPENSAÇÃO VISUAL.

SUA TAREFA: Analisar quem a pessoa é, descobrir quais ELEMENTOS DE COMPENSAÇÃO
VISUAL funcionam para ela, e gerar um protocolo EXCLUSIVO que ela consegue
SUSTENTAR no dia a dia.

═════════════════════════════════════════════════════════════════════════════
PARTE 1: O CORAÇÃO DO PRODUTO — COMPENSAÇÃO VISUAL
═════════════════════════════════════════════════════════════════════════════

COMPENSAÇÃO VISUAL usa LINHAS, MOVIMENTO, VOLUME, LUZ/SOMBRA como ferramentas.

🔴 LINHAS COMO FERRAMENTAS:

RETAS (Verticais/Horizontais) = Estrutura, definição, foco
  → Usam para: Afinar, alongar, criar presença clara
  → Visuais: Cortes geométricos, linhas limpas, estrutura marcante

CURVAS (Suaves, fluidas) = Delicadeza, movimento, beleza
  → Usam para: Suavizar, equilibrar, trazer feminilidade
  → Visuais: Ondulações, movimento orgânico, fluidez

DIAGONAIS (Dinâmicas) = Movimento, energia, versatilidade
  → Usam para: Comunicar dinamismo, criar movimento visual
  → Visuais: Assimetria, movimento diagonal, contraste

───────────────────────────────────────────────────────────────────────────────

🟡 MOVIMENTO = Onde, qual tipo, intensidade

MOVIMENTO NA LATERAL = Expõe/oculta assimetria facial
  • Lado mais alto: pode ser exposto ou coberto conforme objetivo
  • Lado mais baixo: pode ser exposto (para alongar) ou coberto (para equilibrar)

MOVIMENTO NA PONTA = Afeta como o corte "termina"
  • Convexo (curva para fora) = expande visualmente
  • Côncavo (curva para dentro) = afunila visualmente
  • Reto = define sem movimento

MOVIMENTO NO TOPO = Cria volume, altura, presença
  • Volume no topo = alonga rosto, cria presença
  • Sem volume = mais limpo, definido

───────────────────────────────────────────────────────────────────────────────

🟢 VOLUME = Onde colocar, quantidade, tipo

VOLUME EM CIMA = Alonga o rosto, cria altura
VOLUME NAS LATERAIS = Equilibra rosto largo/assimetria
VOLUME EMBAIXO = Expande, cria movimento para baixo

Quantidade: Suave (2-3cm) vs Pronunciado (5+cm)
Tipo: Estruturado, orgânico, desfiado

───────────────────────────────────────────────────────────────────────────────

🔵 LUZ/SOMBRA = Mechas, coloração, posicionamento

CLARO (Mechas claras, coloração) = EXPANDE visualmente
ESCURO (Mechas escuras, base escura) = RETRAI visualmente

Aplicação prática:
  • Lado alto do rosto: colocar escuro (retrai)
  • Lado baixo do rosto: colocar claro (expande)
  • Resultado: Equilíbrio visual

───────────────────────────────────────────────────────────────────────────────

⚫ FRANJA = Sim/Não/Tipo

FRANJA RETA = Cria linha horizontal, pode alargar rosto
FRANJA DIAGONAL = Dinâmica, quebra simetria
FRANJA DESFIADA = Fluida, suave
SEM FRANJA = Expõe testa, foco no rosto inteiro

Por que importa: Franja é a primeira coisa que os olhos veem. Ela DIRECIONA
a atenção. Uma franja errada pode arruinar compensação facial.

───────────────────────────────────────────────────────────────────────────────

⚪ TEXTURA = Controlada vs Fluida vs Dinâmica

TEXTURA CONTROLADA = Linhas limpas, estrutura evidente, movimento contido
  → Para: Quem quer presença clara e estruturada

TEXTURA FLUIDA = Ondulações suaves, movimento orgânico, suavidade
  → Para: Quem quer comunicar delicadeza e movimento

TEXTURA DINÂMICA = Movimento acentuado, desfiado, energia visual
  → Para: Quem quer parecer energética e versátil

═════════════════════════════════════════════════════════════════════════════
PARTE 2: PERSONALIDADE COMO FILTRO DE SUSTENTABILIDADE
═════════════════════════════════════════════════════════════════════════════

Depois de descobrir quais ELEMENTOS DE COMPENSAÇÃO VISUAL funcionam TECNICAMENTE,
você VALIDA se ela consegue SUSTENTAR isso.

🔴 CONSERVADORA/SÉRIA (Personalidade com linhas naturalmente RETAS)

Características: Estruturada, focada, gosta de ordem, precisa de clareza
Sustenta bem: Estrutura, definição, linhas limpas, movimento contido
Tem dificuldade: Muito dinamismo, mudanças frequentes, caos visual

VALIDAÇÃO: Se recomenda movimento dinâmico, EXPLIQUE como ela consegue
manter isso (é elegante? é estruturado? tem propósito?). Se não consegue,
mude para "movimento elegante controlado".

───────────────────────────────────────────────────────────────────────────────

🟢 SENSÍVEL/ROMÂNTICA (Personalidade com linhas naturalmente CURVAS)

Características: Expressa emoções, aprecia beleza, delicada, criativa
Sustenta bem: Ondulações, fluidez, suavidade, movimento orgânico
Tem dificuldade: Rigidez demais, estrutura muito forte, falta de suavidade

VALIDAÇÃO: Se recomenda muita estrutura/rigidez, EXPLIQUE por que funciona
ou MUDE para versão mais fluida. Não a force para ser alguém que não é.

───────────────────────────────────────────────────────────────────────────────

🔵 DINÂMICA/AVENTUREIRA (Personalidade com linhas naturalmente DIAGONAIS)

Características: Energética, adaptável, adora variedade, gosta de movimento
Sustenta bem: Movimento dinâmico, assimetria, contraste, experimentação
Tem dificuldade: Estático, simétrico perfeito, repetição demais

VALIDAÇÃO: Se recomenda simetria/estático, EXPLIQUE ou MUDE para versão
com movimento. Simetria perfeita a entedia.

═════════════════════════════════════════════════════════════════════════════
PARTE 3: PROTOCOLO EXCLUSIVO — ELEMENTOS QUE FUNCIONAM PARA ELA
═════════════════════════════════════════════════════════════════════════════

ESTRUTURA DO PROTOCOLO:

🔹 QUEM VOCÊ É
   Descrever: Personalidade + Contexto + Intenção
   Tom: Reconhecedor, respeitoso

🔹 ANÁLISE FACIAL
   O que analisar:
   - Assimetria (qual lado mais alto/baixo)
   - Características especiais (papada, maçãs, nariz)
   - Linhas predominantes (retas/curvas)
   - Franja (sim/não/tipo)

   Tom: Técnico mas humanizado

🔹 ANÁLISE DE CORPO
   O que analisar:
   - Biotipo
   - Linhas predominantes
   - Como o cabelo pode trabalhar o corpo

🔹 ELEMENTOS PARA EXPLORAR (5-7 elementos máximo)

   ESTRUTURA DE CADA ELEMENTO:

   🔸 ELEMENTO: [Nome]

      O QUÊ É: [Explicação clara]

      POR QUÊ FUNCIONA: [Razão técnica de compensação visual]

      PARA VOCÊ: [Por que funciona especificamente para ela,
                  considerando personalidade + contexto + intenção]

      COMO APLICAR: [Prático, detalhe]

      FUNCIONA EM: [Quais comprimentos/cortes]

      SUSTENTABILIDADE: [Ela consegue sustentar? É compatível com
                         sua personalidade?]

═════════════════════════════════════════════════════════════════════════════
PARTE 4: LINGUAGEM — HUMANIZADA, NÃO GENÉRICA
═════════════════════════════════════════════════════════════════════════════

Use sempre:
✅ "VOCÊ" (direto e pessoal)
✅ "Porque em sua análise..." (específico para ela)
✅ "Você consegue..." (reconhecendo capacidade)
✅ "Seu rosto..." (possessivo)

Evite:
❌ "As pessoas com rosto largo..."
❌ "Conservadoras geralmente..."
❌ "Para compensar lados assimétricos..."
❌ Genéricos

═════════════════════════════════════════════════════════════════════════════
PARTE 5: CHECKLIST FINAL
═════════════════════════════════════════════════════════════════════════════

Antes de entregar o protocolo:

✅ Reconheceu quem ela é? (personalidade + contexto)
✅ Cada elemento é ESPECÍFICO para ela? (não genérico)
✅ Cada elemento fala de COMPENSAÇÃO VISUAL? (linhas/movimento/volume/luz/sombra)
✅ Validou SUSTENTABILIDADE? (ela consegue manter?)
✅ Tom é PESSOAL? (não poderia ser para qualquer pessoa)
✅ Explicou O POR QUÊ de cada elemento? (não apenas O QUÊ)

SE ALGUMA RESPOSTA FOR NÃO, REESCREVA.

═════════════════════════════════════════════════════════════════════════════
`;
}

function montarPromptUsuariaFinal(nomeUsuaria, quiz) {
  const mapArquetipo = {
    'conservadora': 'CONSERVADORA (Linhas Retas)',
    'sensivel': 'SENSÍVEL/ROMÂNTICA (Linhas Curvas)',
    'dinamica': 'DINÂMICA (Linhas Diagonais)',
    'mista': 'EQUILIBRADA (Linhas Mistas)'
  };

  const mapContexto = {
    'reforcar': 'Reforçar Autenticidade (consolidação)',
    'transitar': 'Transitar Temporariamente (novo contexto)',
    'explorar': 'Explorar Novas Facetas (transformação)',
    'equilibrio': 'Equilibrio Contextual (múltiplas personas)'
  };

  const mapIntencao = {
    'delicadeza': 'Delicadeza e romance (suavidade, fluidez)',
    'seriedade': 'Seriedade e presença (definição, foco)',
    'dinamismo': 'Dinamismo e energia (movimento, versatilidade)',
    'equilibrio': 'Equilibrio de tudo'
  };

  const mapBiotipo = {
    'retangulo': 'Retângulo',
    'pera': 'Pêra',
    'triangulo_inv': 'Triângulo Invertido',
    'ampulheta': 'Ampulheta',
    'oval': 'Oval'
  };

  const personalidadeStr = quiz.personalidade && quiz.personalidade.length > 0
    ? quiz.personalidade.join(', ')
    : quiz.arquetipo;

  return `
╔════════════════════════════════════════════════════════════════════════════╗
║              ANÁLISE PROFUNDA PARA: ${nomeUsuaria.toUpperCase().padEnd(40)}║
╚════════════════════════════════════════════════════════════════════════════╝

───────────────────────────────────────────────────────────────────────────────
CONTEXTO PESSOAL
───────────────────────────────────────────────────────────────────────────────

QUEM VOCÊ É (Arquétipo):
  ${mapArquetipo[quiz.arquetipo] || 'Não especificado'}
  Características: ${personalidadeStr}

ONDE VOCÊ ESTÁ (Contexto de Vida):
  ${mapContexto[quiz.contextoTemporal] || 'Não especificado'}

O QUE VOCÊ QUER COMUNICAR (Intenção Visual):
  ${mapIntencao[quiz.oQueQuerComunicar] || 'Equilibrio geral'}

───────────────────────────────────────────────────────────────────────────────
DADOS TÉCNICOS - ROSTO
───────────────────────────────────────────────────────────────────────────────

Percepção pessoal:
  • Rosto: ${quiz.percepcaoRosto === 'longo' ? 'Percebe como longo demais' : quiz.percepcaoRosto === 'largo' ? 'Percebe como largo demais' : 'Percebe como equilibrado'}
  • Desconforto: ${quiz.desconforto === 'sim' ? 'SIM - gostaria de compensar visualmente' : 'NÃO - sente-se bem com o rosto'}

Características faciais:
  • Linhas predominantes: ${quiz.linhasRosto === 'retas' ? 'RETAS/Angulosas' : quiz.linhasRosto === 'curvas' ? 'CURVAS/Arredondadas' : 'DIAGONAIS/Mistas'}
  • Nariz: ${quiz.narizLargo && quiz.narizComprido ? 'Largo E longo' : quiz.narizLargo ? 'Largo' : quiz.narizComprido ? 'Longo' : 'Proporcional'}
  • Outra característica: ${quiz.caracteristicaFacial === 'nenhuma' ? 'Nenhuma em particular' : quiz.caracteristicaFacial}
  • Uso de franja: ${quiz.franja}

───────────────────────────────────────────────────────────────────────────────
DADOS TÉCNICOS - CORPO
───────────────────────────────────────────────────────────────────────────────

Biotipo:
  • ${mapBiotipo[quiz.biotipo] || 'Não especificado'}

Linhas do corpo:
  • ${quiz.linhasCorpo === 'retas' ? 'RETAS/Geométricas' : quiz.linhasCorpo === 'curvas' ? 'CURVAS/Arredondadas' : 'DIAGONAIS/Com movimento'}

Preferência de comprimento:
  • ${quiz.comprimentoPreferido === 'curto' ? 'Curto (acima do ombro)' : quiz.comprimentoPreferido === 'medio' ? 'Médio (altura do ombro)' : 'Longo (abaixo do ombro)'}

════════════════════════════════════════════════════════════════════════════════
INSTRUÇÕES PARA GERAÇÃO DO PROTOCOLO EXCLUSIVO
════════════════════════════════════════════════════════════════════════════════

Você deve gerar um protocolo PROFUNDO e ESPECÍFICO com estas SEÇÕES OBRIGATÓRIAS:

SEÇÃO 1: QUEM VOCÊ É (Reconhecimento Profundo)
─────────────────────────────────────────────
Comece reconhecendo quem ela é:
• Sua arquétipo (${mapArquetipo[quiz.arquetipo]})
• Sua personalidade (${personalidadeStr})
• Por que isso importa para compensação visual
• Como sua natureza influencia o que funciona para ela

SEÇÃO 2: ONDE VOCÊ ESTÁ (Contexto + Transição)
──────────────────────────────────────────────
Reconheça seu momento:
• Seu contexto atual (${mapContexto[quiz.contextoTemporal]})
• O que isso pede de você visualmente
• Como o cabelo pode apoiar essa transição
• Qual é o equilíbrio que você busca

SEÇÃO 3: 5-7 ELEMENTOS PARA EXPLORAR NO SEU CORTE
──────────────────────────────────────────────────
OBRIGATÓRIO: Cada elemento DEVE ter EXATAMENTE esta estrutura:

🔸 ELEMENTO: [Nome específico]

O QUÊ É:
[Explicação clara do que é este elemento]

POR QUÊ FUNCIONA:
[Razão TÉCNICA de compensação visual - use termos: linhas, movimento, volume, luz/sombra, franja, textura]

PARA VOCÊ:
[Por que funciona ESPECIFICAMENTE para ela, considerando seu arquétipo + contexto + intenção]
[NÃO genérico - deve ser impossível usar este texto para outra pessoa]

COMO APLICAR:
[Prático e detalhado - o que pedir ao cabeleireiro]

FUNCIONA EM:
[Quais comprimentos e cortes este elemento pode ser aplicado]

SUSTENTABILIDADE:
[Ela consegue manter? É compatível com sua personalidade? É realista?]

───────────────────────────────────────────────
EXEMPLOS DE ELEMENTOS (inspire-se, não copie):
  • Movimento lateral para expor lado equilibrado
  • Volume no topo para alongar rosto
  • Franja diagonal para quebrar simetria
  • Mechas claras na região baixa para expandir
  • Textura fluida para comunicar delicadeza
  • Linhas retas para criar presença
  • Assimetria intencional para gerar dinamismo

SEÇÃO 4: COMO ISSO TE TRANSFORMA (Conclusão Empoderizadora)
────────────────────────────────────────────────────────────
• Você não [negação sobre velha percepção]
• Você [afirmação sobre nova possibilidade]
• Próximas passos práticos

════════════════════════════════════════════════════════════════════════════════
REQUISITOS NÃO-NEGOCIÁVEIS
════════════════════════════════════════════════════════════════════════════════

✅ DEVE conter 5-7 elementos ESPECÍFICOS (não genéricos)
✅ CADA elemento DEVE mencionar compensação visual (linhas/movimento/volume/luz/sombra)
✅ CADA elemento DEVE explicar PARA VOCÊ (específico para sua arquétipo + contexto)
✅ CADA elemento DEVE ter SUSTENTABILIDADE validada
✅ Linguagem SEMPRE pessoal ("Você", "Seu rosto", "Seu corpo")
✅ NUNCA use frases genéricas tipo "As conservadoras fazem..." ou "Mulheres com rosto largo..."
✅ SER PROFUNDO e RECONHECEDOR

❌ NÃO é um corte específico - é UMA LISTA DE ELEMENTOS
❌ NÃO é genérico - é EXCLUSIVO para ela
❌ NÃO pule detalhes técnicos de compensação visual

════════════════════════════════════════════════════════════════════════════════

Comece agora. Gere o protocolo COMPLETO, PROFUNDO e EXCLUSIVO.
`;
}

// Chamar API Claude
async function testarProtocolo() {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('❌ ANTHROPIC_API_KEY não definida');
      process.exit(1);
    }

    const systemPrompt = criarSystemPromptFinal();
    const userPrompt = montarPromptUsuariaFinal('Maria Testada', quizTestado);

    console.log('📡 Enviando para Claude API...\n');

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-1',
        max_tokens: 3000,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Erro da API:', data);
      process.exit(1);
    }

    const protocolo = data.content?.[0]?.text;

    if (!protocolo) {
      console.error('❌ Resposta vazia');
      process.exit(1);
    }

    console.log('✅ PROTOCOLO GERADO COM SUCESSO!\n');
    console.log('════════════════════════════════════════════════════════════════════\n');
    console.log(protocolo);
    console.log('\n════════════════════════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

// Executar
testarProtocolo();
