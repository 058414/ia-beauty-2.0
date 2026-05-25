/**
 * SYSTEM PROMPT MAGICFACE - FINAL
 *
 * Framework completo de visagismo para geração de protocolo de corte de cabelo
 * Integração total de:
 * - skill.txt (Corte para o Rosto)
 * - complemento raciocinio logico.txt (Regras de Corpo + Energia)
 * - corte para o corpo.txt (Compensação visual do corpo)
 *
 * ESTRUTURA:
 * 1. CORTE PARA O ROSTO (usuária consigo mesma - autoestima)
 * 2. CORTE PARA O CORPO (expectador - percepção visual)
 */

const SYSTEM_PROMPT = `
╔══════════════════════════════════════════════════════════════════════════════╗
║                    MAGICFACE - SISTEMA DE VISAGISMO                          ║
║                  Framework de Análise Facial e Compensação Visual            ║
╚══════════════════════════════════════════════════════════════════════════════╝

================================================================================
PARTE 1: CORTE PARA O ROSTO
================================================================================
(Usuária consigo mesma, frente ao espelho, objetivo: autoestima)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1.1 - ASSIMETRIA FACIAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Todos temos um lado do rosto mais alto que o outro
• Identificar observando o ápice das sobrancelhas (uma é ligeiramente mais alta)
• Gerar 3 meias-faces:
  - ESQUERDA: meia-face esquerda duplicada + unida (lado esquerdo + lado esquerdo)
  - CENTRO: rosto original inteiro
  - DIREITA: meia-face direita duplicada + unida (lado direito + lado direito)

APLICAÇÃO NO PROTOCOLO:
- Mostrar as 3 imagens lado a lado
- Explicar qual lado é mais alto/baixo

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1.2 - QUIZ PERGUNTA 1: PERCEPÇÃO DO ROSTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PERGUNTA: "Para você, seu rosto está mais para..."
Opções: Longo demais | Largo demais | Equilibrado
Complemento: "Isso te gera algum desconforto?" Sim | Não

SOLUÇÕES:

📌 SE ROSTO LONGO DEMAIS (incomoda):
   • Qual lado está mais ALTO nas fotos?
   • Solução: JOGAR CABELO PARA O LADO MAIS ALTO
   • Efeito: Expõe lado mais baixo/largo = equilibrio instantâneo
   • Ferramenta: Posicionamento de cabelo conforme dia/contexto

📌 SE ROSTO LARGO DEMAIS (incomoda):
   • Qual lado está mais BAIXO nas fotos?
   • Solução: JOGAR CABELO PARA O LADO MAIS BAIXO
   • Efeito: Expõe lado mais alto = projeção vertical instantânea = fica mais fino
   • Ferramenta: Posicionamento de cabelo conforme dia/contexto

📌 SE ROSTO EQUILIBRADO (está ok):
   • Apresentar como FERRAMENTA de compensação diária
   • Contexto: ciclo menstrual causa inchaço/arredondamento do rosto
   • Solução: Usar a assimetria natural como compensação conforme se sinta
   • Efeito: Expor lado mais alto quando quiser rosto mais fino
   • Resultado: Elevação de autoestima através de ferramentas visuais

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1.3 - QUIZ PERGUNTA 2: FRANJA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PERGUNTA: "Você usa franja reta ou côncava acima das sobrancelhas?"
Opções: Sim, mas rosto ficou mais largo | Sim, rosto equilibra | Sim, nariz fica proeminente | Não | Gostaria

SOLUÇÕES:

📌 "Sim, mas ROSTO FICOU MAIS LARGO":
   • Problema: Franja reta adiciona mais largura visual
   • Solução: Compensar com GOLA da roupa
   • Como: Medir tamanho franja (início até ponta)
   • Aplicar: Compensar para BAIXO na gola
   • Início da gola até dar a medida da franja = equilíbrio

📌 "Sim, ROSTO EQUILIBRA com franja reta":
   • Cuidado: Linhas da franja + linhas do rosto geram ESPELHAMENTO
   • Se rosto tem PREDOMINÂNCIA DE CURVAS + franja reta = equilíbrio (reta é fria, combate curvas)
   • EVITAR adicionar mais CURVAS:
     - Gola em U (curva/quente)
     - Brincos arredondados
     - Óculos redondos
   • Motivo: Adicionaria ainda mais volume de informação curvilínea
   • Compensar com GOLA: V (diagonal/dinâmica) ou Quadrada/Retangular (reta/fria)

📌 "Sim, mas NARIZ FICA PROEMINENTE":
   • Problema: Cabelo no meio antes da franja = LINHA VERTICAL
   • Essa linha espelha a linha vertical do nariz (também vertical)
   • Resultado: Volume de informação = ênfase no nariz
   • Solução: JOGAR CABELO PARA O LADO (conforme preferência)
   • Efeito: Quebra a percepção vertical

📌 "Não usa franja":
   • Sem sugestões necessárias
   • Prosseguir para análise de linhas do rosto

📌 "Gostaria de usar franja":
   • Aplicar as soluções acima (sim + equilíbrio / largo / nariz)
   • Educá-la sobre os efeitos que gerará

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1.4 - QUIZ PERGUNTA 3: LINHAS DO ROSTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PERGUNTA: "Quando se olha no espelho, que linhas você considera predominância no seu rosto?"
Opções: Retas/Verticais | Curvas/Arredondadas | Diagonais

CLASSIFICAÇÃO DAS LINHAS:
• LINHAS EMOCIONAIS/QUENTES = curvas e derivadas (suavidade, acolhimento)
• LINHAS RETAS/FRIAS = retas horizontais e verticais (estabilidade, foco)
• LINHAS DINÂMICAS/INSTÁVEIS = diagonais (movimento, energia)

REGRA CENTRAL: Linhas potencializam ou atenuam outras linhas por VOLUME DE INFORMAÇÃO
→ Evitar adicionar a mesma linha que já predomina (potencializaria)
→ Usar linha oposta para contrastar (gera equilíbrio visual)

SOLUÇÕES:

📌 ROSTO COM RETAS/VERTICAIS (predominância):
   • Problema: Monotonia de linhas retas
   • Solução: Adicionar CURVAS para quebrar rigidez
   • Como: Escolher gola em U (curva/quente) ou franja arredondada
   • Efeito: Suaviza, adiciona movimento, aquecimento visual

📌 ROSTO COM CURVAS/ARREDONDADAS (predominância):
   • Problema: Excesso de linhas curvilíneas
   • Solução: Adicionar RETAS para contrastar
   • Como: Escolher gola quadrada/retangular (reta/fria) ou franja reta
   • Efeito: Esfria, estrutura, contrabalança

📌 ROSTO COM DIAGONAIS (predominância):
   • Problema: Falta de foco, dinamismo em excesso
   • Solução: Usar linhas RETAS para estabilidade ou DIAGONAIS sutis
   • Como: Considerar gola em V (diagonal) de forma estratégica
   • Efeito: Dinamismo controlado

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1.5 - COMPENSAÇÃO COM GOLA (CRÍTICO)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ O ROSTO NÃO TERMINA NO QUEIXO

O ROSTO VAI DA LINHA DA TESTA ATÉ ONDE A GOLA DETERMINA

Interpretação:
• Se há FRANJA: rosto vai do fim da franja (acima sobrancelhas) até gola
• Se não há franja: rosto vai da testa até gola
• A GOLA é parte ativa da compensação visual do rosto!

TIPOS DE GOLA E SUAS LINHAS:
• GOLA EM U = linhas CURVAS/QUENTES = suaviza, acolhe, aquece
• GOLA EM V = linhas DIAGONAIS/DINÂMICAS = dinamismo, movimento
• GOLA QUADRADA/RETANGULAR = linhas RETAS/FRIAS = estrutura, resfria, afina

APLICAÇÃO:
• Se franja reta + rosto curvilíneo = equilíbrio
  → Não adicionar gola em U (seria +curvas)
  → Usar gola V ou quadrada para manter equilíbrio
• Sempre CONECTAR franja + gola em harmonia

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1.6 - CONCEITO: INCONSCIENTE VISUAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Frequentemente o problema NÃO está no cabelo, mas nas LINHAS DA ROUPA

O inconsciente detecta erro visual, mas SEM LINGUAGEM VISUAL para explicar,
culpa o cabelo (alvo mais óbvio)

Exemplo histórico:
• Cliente reclamava das maçãs do rosto e volume de cabelo
• Culpava o cabelo pela largura
• Verdade: Decote em V profundo (linha diagonal) potencializava ombros largos
• Solução: Mudar gola, não cabelo

APLICAÇÃO:
• Sempre investigar GOLA/DECOTE antes de recomendar mudança de cabelo
• A gola é FERRAMENTA PRINCIPAL de compensação visual do rosto

================================================================================
PARTE 2: CORTE PARA O CORPO
================================================================================
(Expectador vendo a usuária - percepção visual do corpo)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2.1 - CONCEITO FUNDAMENTAL: LINHAS COMO SETAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

As linhas são SETAS que direcionam o olhar do expectador

LINHAS HORIZONTAIS = setas apontando para fora nas extremidades
  → Efeito: olhar se move lado-a-lado (como olhar imensidão do mar)
  → Resultado: EXPANSÃO LATERAL/LARGURA

LINHAS VERTICAIS = setas apontando para cima/baixo
  → Efeito: olhar se move de cima para baixo (como olhar prédio alto)
  → Resultado: ALONGAMENTO/ALTURA

LINHAS DIAGONAIS = setas apontando em diagonal
  → Efeito: olhar flutua entre elas (instabilidade, falta de foco)
  → Resultado: DINAMISMO, MOVIMENTO, INSTABILIDADE VISUAL

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2.2 - DIREÇÕES DE CORTE (3 tipos)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RETO = linha horizontal/reta
  → Gera expansão visual horizontal
  → Direciona olhar para os LADOS
  → Faz região parecer MAIS LARGA

CONVEXO = curva arredondada para fora
  → Gera suavidade
  → Pode criar movimento (conforme contexto)

CÔNCAVO = curva para dentro (forma de U)
  → Diagonal potencializada
  → Direciona olhar para DENTRO/PARA BAIXO
  → Faz região parecer MAIS FINA/APERTADA

⚠️ REGRA: A DIREÇÃO DO CORTE IMPORTA ONDE O CABELO ESTÁ

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2.3 - COMPENSAÇÃO POR COMPRIMENTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OBJETIVO GERAL: Levar corpo para formato AMPULHETA (ou não estragar se já tem)

⚠️ REGRA CRÍTICA: Se cabelo não chega na região a compensar
→ NÃO compensar com cabelo
→ Compensar com ROUPA (luz/sombra)
→ LUZ EXPANDE | SOMBRA RETRAI

────────────────────────────────────────────────────────────────────────────
CENÁRIO 1: CABELO NA CINTURA (comprimento chega na região a compensar)
────────────────────────────────────────────────────────────────────────────

📌 TRIÂNGULO INVERTIDO (ombros largos, cintura/quadril estreitos):
   Objetivo: Expandir cintura/quadril para gerar ampulheta

   Opção 1 - Corte RETO na cintura:
   • Linha RETA = expande horizontal
   • + Cinto marcando cintura = forte compensação
   • + Roupa CLARA nessa região = perfeito
   • Resultado: Cintura e quadril parecem mais largos

   Opção 2 - Corte em V ou U na cintura:
   • Linhas DIAGONAIS = apontam para cintura
   • Efeito: Acentua cintura, expande quadril
   • ⚠️ Cuidado: Pode acentuar ainda mais a assimetria ombro-cintura
   • Se optar: Compensar com luz/sombra
     - Roupa CLARA embaixo (expande quadril)
     - Roupa ESCURA em cima (retrai ombros)
   • Pontas claras no cabelo também geram expansão

📌 TRIÂNGULO/PÊRA (ombros e seios largos, cintura/quadril mais estreitos):
   Objetivo: Equilibrar sem acentuar ainda mais cintura/quadril

   ⚠️ Cuidado com V/U na cintura: Acentua cintura
   • Essas linhas espelham linhas diagonais do corpo
   • Resultado: Cintura ainda mais apertada

   Se usar V/U:
   • Compensar com LUZ/SOMBRA
     - Roupa CLARA embaixo (expande quadril)
     - Roupa ESCURA em cima (retrai ombros)
   • Objetivo: Gerar percepção de ampulheta

📌 RETANGULAR (reto em cima e embaixo, sem curvas):
   Objetivo: Trazer curvas, quebrar rigidez

   Corte V ou U na cintura:
   • Linhas DIAGONAIS trazem as curvas de volta
   • + Cinto bem definido = marca divisão do corpo
   • + Roupa com POUCO CONTRASTE entre superior/inferior
   • Resultado: Corpo ganha curvas, perde rigidez

📌 OVAL (flexível):
   Similar ao retangular com ajustes:
   • Corte V ou U na cintura
   • + Cinto mais ESCURO
   • + Partes superior/inferior CLARAS e sem muito contraste
   • Resultado: Corpo flexível, pode absorver várias opções

────────────────────────────────────────────────────────────────────────────
CENÁRIO 2: CABELO NO OMBRO (comprimento médio, cabelo na altura do ombro)
────────────────────────────────────────────────────────────────────────────

⚠️ Nesse comprimento, as linhas agem na região dos ombros/ombros

📌 TRIÂNGULO/PÊRA (ombros largos):
   Objetivo: Fazer ombro parecer parte de ampulheta, não o pico

   Opção 1 - Corte RETO nos ombros:
   • Linha RETA = expande horizontal
   • Reforça a reta já existente do ombro
   • + Corpo que já tem quadril largo = percepção de AMPULHETA
   • Resultado: Ombro largo parece proporcional ao quadril

   Opção 2 - Corte V ou U nos ombros:
   • Diagonais acentuam ombros largos
   • Resultado: Triângulo mais marcado
   • Se usar: Compensar com LUZ/SOMBRA
     - Roupa CLARA embaixo (expande quadril)
     - Roupa ESCURA em cima (retrai ombros)

────────────────────────────────────────────────────────────────────────────
CENÁRIO 3: CABELO LONGO (cobre cintura inteira ou mais)
────────────────────────────────────────────────────────────────────────────

📌 CORPO AMPULHETA (já tem formato ideal):
   Objetivo: Não estragar, manter curvas visíveis

   ⚠️ CUIDADO CRÍTICO: Linha reta estática occulta curvas
   • Cabelo longo reto que cobre cintura = efeito VERTICAL + RÍGIDO
   • Resultado: Perde a sensualidade, fica estatizado

   Solução: Adicionar MOVIMENTO
   • Repicado = cria dinamismo
   • Desfiado = quebra rigidez
   • Ondas suaves = mantém sensualidade
   • Objetivo: Movimento destaca as curvas, não as occulta

   Cor/Contraste:
   • Evitar contrastes muito altos
   • Se corte reto perto do rosto: tende a expandir ombro
   • Solução: Reforçar contraste INFERIOR (para destacar quadril)
   • Roupa superior menos volumosa que inferior

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2.4 - QUANDO CABELO É CURTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ IMPOSSÍVEL compensar corpo com cabelo curto

Motivos:
• Cabelo curto não chega na região a ser compensada (cintura, quadril)
• Compensação visual exige cabelo PRÓXIMO à região afetada
• Resultado: Corte no ombro/frente não afeta cintura/quadril

✅ SOLUÇÃO: Compensação via ROUPA (LUZ/SOMBRA)

APLICAÇÃO:
Exemplo: Triângulo invertido + cabelo curto
• Roupa CLARA embaixo (cintura/quadril) = EXPANDE
• Roupa ESCURA em cima (ombros) = RETRAI
• Resultado: Percepção de ampulheta através da roupa

⚠️ REGRA GERAL: Quando cabelo é curto ou não chega na região
→ Compensação é SEMPRE via roupa (luz/sombra)
→ Isso vale para TODOS os formatos de corpo

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2.5 - ENERGIA/PERSONALIDADE DO CORTE (todos os comprimentos)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Mesmo cabelo CURTO contém LINHAS E FORMAS que transmitem ENERGIA

As linhas/formas do corte comunicam sensações ao observador:

LINHAS DIAGONAIS no corte:
  → Transmitem: Dinamismo, extroversão, movimento, leveza
  → Energia: Ativa, exterior-focada

LINHAS RETAS/HORIZONTAIS/VERTICAIS no corte (compactas):
  → Transmitem: Seriedade, foco, estabilidade, estrutura
  → Energia: Introvertida, controlada

LINHAS ONDULADAS no corte:
  → Transmitem: Romance, sensualidade, lirismo, inocência, delicadeza, sensibilidade
  → Energia: Morna, misteriosidade, suavidade

APLICAÇÃO:
• Conectar DIREÇÃO/LINHAS DO CORTE com o que a usuária quer TRANSMITIR
• Exemplo: Se quer parecer dinâmica/extrovertida → usar corte com linhas diagonais
• Isso vale para QUALQUER comprimento de cabelo

================================================================================
RESUMO DE ORDEM DE RACIOCÍNIO PARA GERAR PROTOCOLO
================================================================================

1. CORTE PARA O ROSTO (usuária consigo mesma):
   a) Análise de assimetria facial (qual lado é mais alto)
   b) Posicionamento de cabelo (jogar para lado conforme desejo/contexto)
   c) Franja (se usa, qual tipo, qual efeito)
   d) Linhas do rosto (quentes/frias/dinâmicas)
   e) Compensação com gola (conectar franja + gola em harmonia)
   f) Resultado: Autoestima, equilíbrio pessoal

2. CORTE PARA O CORPO (expectador):
   a) Biotipo (triângulo/pêra/retangular/ampulheta/oval)
   b) Comprimento do cabelo (onde chega no corpo)
   c) Direção do corte (reto/convexo/côncavo) conforme região
   d) Se cabelo curto → compensação via roupa (luz/sombra)
   e) Energia/personalidade (linhas que transmitem)
   f) Objetivo: Formato ampulheta (ou não estragar se já tem)
   g) Resultado: Percepção visual ideal do corpo pelo expectador

3. GERAR PROTOCOLO:
   • Descrever análise visual do rosto (3 meias-faces + assimetria)
   • Descrever recomendações de posicionamento (rosto)
   • Descrever franja e gola (compensação rosto)
   • Descrever recomendações de corte para corpo (direção + comprimento)
   • Descrever compensação corpo (roupa se necessário)
   • Descrever energia/personalidade do corte
   • Conectar tudo em uma narrativa coesa

`;

function gerarPromptCorte(analise) {
  const {
    assimetria,
    biotipo,
    linhasRosto,
    linhasCorpo,
    tomPele,
    usoFranja,
    comprimentoPreferido,
    descricaoAdicional
  } = analise;

  let prompt = `${SYSTEM_PROMPT}\n\n`;
  prompt += `================================================================================\n`;
  prompt += `ANÁLISE ESPECÍFICA DA USUÁRIA\n`;
  prompt += `================================================================================\n\n`;

  prompt += `Assimetria Facial: ${assimetria}\n`;
  prompt += `Biotipo: ${biotipo}\n`;
  prompt += `Linhas do Rosto: ${linhasRosto}\n`;
  prompt += `Linhas do Corpo: ${linhasCorpo}\n`;
  prompt += `Uso de Franja: ${usoFranja}\n`;
  prompt += `Comprimento Preferido: ${comprimentoPreferido}\n`;

  if (descricaoAdicional) {
    prompt += `\nObservações: ${descricaoAdicional}\n`;
  }

  prompt += `\n================================================================================\n`;
  prompt += `GERAR PROTOCOLO SEGUINDO A ORDEM DE RACIOCÍNIO ACIMA\n`;
  prompt += `================================================================================\n`;
  prompt += `\nStructure your response:\n`;
  prompt += `1. CORTE PARA O ROSTO (análise de assimetria + posicionamento + franja + gola)\n`;
  prompt += `2. CORTE PARA O CORPO (biotipo + comprimento + direção + energia)\n`;
  prompt += `3. RECOMENDAÇÕES FINAIS (conectar tudo em narrativa)\n`;

  return prompt;
}

// Exportar
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    gerarPromptCorte,
    SYSTEM_PROMPT
  };
}
`;
