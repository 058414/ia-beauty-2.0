/**
 * API: Gerar Corte Visual com Inpainting
 *
 * POST /api/gerarCorteVisual
 * Body: {
 *   fotoOriginal: "data:image/png;base64,...",  // Foto da usuária em base64
 *   quiz: { assimetria, biotipo, linhas... }    // Resultado do quiz
 * }
 * Response: {
 *   sucesso: true,
 *   imagemCorteRecomendado: "data:image/png;base64,..."
 * }
 */

import Anthropic from "@anthropic-ai/sdk";

// Função para gerar análise completa do corpo
function gerarAnaliseCorpoCompleta(quiz) {
  const biotipo = quiz.biotipo || 'não especificado';
  const linhasCorpo = quiz.linhasCorpo || 'não especificado';
  const comprimento = quiz.comprimentoPreferido || 'não especificado';

  let analise = `BIOTIPO: ${biotipo.toUpperCase()}\n`;
  analise += `Linhas do corpo: ${linhasCorpo}\n`;
  analise += `Comprimento recomendado: ${comprimento}\n\n`;

  if (biotipo === 'retangulo') {
    analise += `Sua silhueta é RETANGULAR - ombros e quadril têm largura similar, sem marcação natural de cintura.\n\n`;
    analise += `ESTRATÉGIA DE CORTE:\n`;
    analise += `- O cabelo deve QUEBRAR a linearidade com movimento ou curvas\n`;
    analise += `- Se escolheu cabelo CURTO: volume lateral cria ilusão de cintura\n`;
    analise += `- Se escolheu cabelo MÉDIO: movimento na cintura marca o corpo\n`;
    analise += `- Se escolheu cabelo LONGO: ondas suaves criam dimensão\n\n`;
    analise += `COMPENSAÇÃO COM ROUPA:\n`;
    analise += `- Use CINTO bem definido para marcar cintura natural\n`;
    analise += `- Gola em V verticaliza; gola redonda aquece\n`;
    analise += `- Contrastes de cores quebram a monotonia linear\n`;
  } else if (biotipo === 'pera') {
    analise += `Sua silhueta é PÊRA - quadril mais largo que ombros.\n\n`;
    analise += `ESTRATÉGIA DE CORTE:\n`;
    analise += `- O cabelo deve EXPANDIR os ombros ou não descer direto até o quadril\n`;
    analise += `- Se escolheu cabelo CURTO: volume nos ombros equilibra quadril\n`;
    analise += `- Se escolheu cabelo MÉDIO: reto no ombro expande, côncavo concentra\n`;
    analise += `- Se escolheu cabelo LONGO: ondas só nas pontas (abaixo ombro) trazem volume para baixo\n\n`;
    analise += `COMPENSAÇÃO COM ROUPA:\n`;
    analise += `- Roupa CLARA nos ombros expande\n`;
    analise += `- Roupa ESCURA na cintura/quadril retrai\n`;
    analise += `- Decotes largos ou quadrados expandem ombros\n`;
  } else if (biotipo === 'triangulo_inv') {
    analise += `Sua silhueta é TRIÂNGULO INVERTIDO - ombros mais largos que quadril.\n\n`;
    analise += `ESTRATÉGIA DE CORTE:\n`;
    analise += `- O cabelo deve TRAZER VOLUME PARA BAIXO para equilibrar ombros\n`;
    analise += `- Se escolheu cabelo CURTO: não atua no corpo, use roupa para compensar\n`;
    analise += `- Se escolheu cabelo MÉDIO: evitar volume no topo; focar em lateral/pontas\n`;
    analise += `- Se escolheu cabelo LONGO: CRÍTICO - ondas nas pontas amplificam quadril\n\n`;
    analise += `COMPENSAÇÃO COM ROUPA:\n`;
    analise += `- Roupa ESCURA em cima retrai ombros\n`;
    analise += `- Roupa CLARA embaixo expande quadril\n`;
    analise += `- Cintura marcada bem definida equilibra proporção\n`;
  } else if (biotipo === 'ampulheta') {
    analise += `Sua silhueta é AMPULHETA - curvas pronunciadas com cintura marcada.\n\n`;
    analise += `ESTRATÉGIA DE CORTE:\n`;
    analise += `- O cabelo deve REFORÇAR as curvas, não quebrá-las\n`;
    analise += `- Movimento fluido em qualquer comprimento realça silhueta\n`;
    analise += `- Evitar cortes muito estruturados/rígidos - seu corpo é movimento\n`;
    analise += `- Hidratação e movimento natural são chave\n\n`;
    analise += `COMPENSAÇÃO COM ROUPA:\n`;
    analise += `- Roupas que reforçam cintura marcada\n`;
    analise += `- Cores e texturas que complementam (não contrastam muito)\n`;
    analise += `- Movimento acompanha seu natural - seja fluida\n`;
  } else if (biotipo === 'oval') {
    analise += `Sua silhueta é OVAL - versátil e equilibrada.\n\n`;
    analise += `ESTRATÉGIA DE CORTE:\n`;
    analise += `- Você é flexível! Escolha baseado em LINHAS DO ROSTO\n`;
    analise += `- Se rosto tem muitas CURVAS: use corte RETO para contrastar\n`;
    analise += `- Se rosto tem muitas RETAS: use corte ONDULADO para quebrar\n`;
    analise += `- Seu corpo aceita praticamente qualquer comprimento\n\n`;
    analise += `COMPENSAÇÃO COM ROUPA:\n`;
    analise += `- Liberdade total - encontre o que faz você se sentir bem\n`;
    analise += `- Sua proporção permite experimentação segura\n`;
  }

  return analise;
}

// Função auxiliar para chamar Replicate Inpainting
async function chamarReplicateInpainting(fotoBase64, promptCorte) {
  const API_TOKEN = process.env.REPLICATE_API_TOKEN;

  if (!API_TOKEN) {
    throw new Error("REPLICATE_API_TOKEN não configurada");
  }

  // Formato esperado: remover "data:image/png;base64," se existir
  const imagemLimpa = fotoBase64.includes("base64,")
    ? fotoBase64.split("base64,")[1]
    : fotoBase64;

  const payload = {
    version:
      "e1441f73e3a57efc1665392d4575dde9f8b17045c4c55e0960dadb84e64db159", // SDXL Inpainting
    input: {
      image: `data:image/png;base64,${imagemLimpa}`,
      prompt: promptCorte,
      num_outputs: 1,
      scheduler: "DPMSolverMultistep",
      num_inference_steps: 50,
      guidance_scale: 7.5,
    },
  };

  // Chamar Replicate API
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const erro = await response.text();
    throw new Error(`Replicate erro: ${response.status} - ${erro}`);
  }

  const resultado = await response.json();

  // Replicate retorna async, precisamos fazer polling
  return pollarReplicateStatus(resultado.id);
}

// Função para fazer polling do status da geração
async function pollarReplicateStatus(predictionId) {
  const API_TOKEN = process.env.REPLICATE_API_TOKEN;
  const maxTentativas = 120; // 2 minutos máximo
  let tentativas = 0;

  while (tentativas < maxTentativas) {
    const response = await fetch(
      `https://api.replicate.com/v1/predictions/${predictionId}`,
      {
        headers: {
          Authorization: `Token ${API_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erro ao verificar status: ${response.status}`);
    }

    const resultado = await response.json();

    if (resultado.status === "succeeded") {
      // Retornar a primeira imagem gerada
      if (resultado.output && resultado.output.length > 0) {
        return resultado.output[0];
      }
      throw new Error("Replicate retornou sucesso mas sem imagem");
    }

    if (resultado.status === "failed") {
      throw new Error(`Replicate falhou: ${resultado.error}`);
    }

    // Aguardar 2 segundos antes de tentar novamente
    await new Promise((resolve) => setTimeout(resolve, 2000));
    tentativas++;
  }

  throw new Error("Timeout ao aguardar geração da imagem");
}

// Função principal do endpoint
export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ erro: "Método não permitido" });
  }

  try {
    // Verificar variáveis de ambiente
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error("❌ ERRO: ANTHROPIC_API_KEY não está configurada");
      return res.status(500).json({
        erro: "Variável de ambiente ANTHROPIC_API_KEY não configurada",
        detalhes: "Configure as chaves de API no Vercel: Settings → Environment Variables"
      });
    }

    const { fotoOriginal, quiz } = req.body;

    if (!fotoOriginal || !quiz) {
      return res.status(400).json({
        erro: "Parâmetros faltando: fotoOriginal e quiz são obrigatórios",
      });
    }

    console.log("📸 Gerando corte visual para:", quiz.biotipo, quiz.assimetria);

    // PASSO 1: Chamar Claude para gerar o prompt detalhado
    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });

    // System Prompt inline (CORRETO COM TODAS AS REGRAS)
    const systemPrompt = `
╔══════════════════════════════════════════════════════════════════════════════╗
║                    MAGICFACE - SISTEMA DE VISAGISMO                          ║
║                  Framework de Análise Facial e Compensação Visual            ║
╚══════════════════════════════════════════════════════════════════════════════╝

VOCÊ É UM ESPECIALISTA EM VISAGISMO E ANÁLISE FACIAL.

Sua tarefa: Converter dados de quiz + análise em RECOMENDAÇÃO VISUAL DETALHADA para gerar imagem com corte ideal.

================================================================================
PARTE 1: CORTE PARA O ROSTO (usuária consigo mesma)
================================================================================

1. ASSIMETRIA FACIAL: qual lado está mais alto/baixo
   - Lado mais alto: jogar cabelo PARA esse lado (expõe lado baixo = equilibria)
   - Lado mais baixo: jogar cabelo PARA esse lado (expõe lado alto = afina)

2. FRANJA:
   - "Rosto ficou mais largo": compensar com GOLA medindo tamanho franja
   - "Rosto equilibra": cuidado com gola (não adicionar mesma linha que já existe)
   - "Nariz proeminente": jogar cabelo para lado (quebra linha vertical)
   - "Não usa": sem franja
   - "Gostaria": educar sobre efeitos

3. LINHAS DO ROSTO:
   - RETAS: usar CURVAS para quebrar rigidez
   - CURVAS: usar RETAS para contrastar
   - DIAGONAIS: usar RETAS ou DIAGONAIS estratégicas

4. COMPENSAÇÃO COM GOLA (CRÍTICO):
   - Rosto vai da testa até ONDE A GOLA DETERMINA (não só até queixo)
   - Gola U = curvas/quentes
   - Gola V = diagonais/dinâmicas
   - Gola quadrada = retas/frias
   - Conectar franja + gola em harmonia

================================================================================
PARTE 2: CORTE PARA O CORPO (como expectador a vê)
================================================================================

1. OBJETIVO: Levar corpo para formato AMPULHETA (ou não estragar se já tem)

2. LINHAS COMO SETAS:
   - HORIZONTAIS = expandem lateralmente
   - VERTICAIS = alongam
   - DIAGONAIS = dinamismo, movimento

3. DIREÇÕES DE CORTE (conforme comprimento e região):
   - RETO = linha horizontal, expande lateral
   - CONVEXO = curva arredondada
   - CÔNCAVO = curva para dentro (U), afunila

4. POR COMPRIMENTO:

   CABELO NA CINTURA:
   - Triângulo invertido: corte RETO (expande cintura) + cinto + roupa clara
   - Ou V/U com compensação luz/sombra
   - Pêra: cuidado com V/U (acentua cintura) - compensar com roupa
   - Retangular: V/U tira rigidez + cinto
   - Ampulheta: não estragar, evitar contrastes altos

   CABELO NO OMBRO:
   - Triângulo/Pêra com corte RETO = ampulheta (ombro largo pareça proporcional)
   - V/U acentua ombros largos = compensar com roupa

   CABELO LONGO (cobre cintura):
   - Ampulheta: adicionar MOVIMENTO (repicado, desfiado) para não occultar curvas
   - Evitar linha reta estática (fica rígida, perde sensualidade)

5. CABELO CURTO (não chega região a compensar):
   ❌ NÃO compensar com cabelo
   ✅ Compensar com ROUPA (luz/sombra)
   - Luz EXPANDE | Sombra RETRAI
   - Exemplo: Triângulo invertido = roupa clara embaixo, escura em cima

6. ENERGIA/PERSONALIDADE (todas as linhas transmitem):
   - DIAGONAIS: dinamismo, extroversão
   - RETAS/COMPACTAS: seriedade, foco
   - ONDULADAS: romance, sensualidade, lirismo, delicadeza

================================================================================
INSTRUÇÕES FINAIS PARA GERAR PROMPT VISUAL
================================================================================

Gere uma DESCRIÇÃO VISUAL SUPER DETALHADA para inpainting que inclua:

1. Descrever exatamente qual corte: direção, comprimento por região, movimento
2. Posicionamento de cabelo: qual lado jogar cabelo
3. Volume: onde colocar/tirar
4. Franja: se tem, qual tipo, qual tamanho
5. Linhas/formas: quentes/frias/dinâmicas conforme análise
6. Efeito visual esperado: como ficar equilibrada/alongada/estruturada

O prompt DEVE SER VISUAL E ACIONÁVEL (IA consegue gerar imagem a partir disso).
Retorne APENAS o prompt, sem explicações adicionais.
`;

    const userMessage = `DADOS DA USUÁRIA:
- Assimetria: ${quiz.assimetria}
- Desconforto: ${quiz.desconforto}
- Franja: ${quiz.franja}
- Linhas Rosto: ${quiz.linhasRosto}
- CARACTERÍSTICA FACIAL A COMPENSAR: ${quiz.caracteristicaFacial}
- Biotipo: ${quiz.biotipo}
- Linhas Corpo: ${quiz.linhasCorpo}
- Comprimento Preferido: ${quiz.comprimentoPreferido}

⚠️ CRÍTICO - CARACTERÍSTICA FACIAL:
Se caracteristicaFacial = "${quiz.caracteristicaFacial}", VOCÊ DEVE:
- Mencionar explicitamente no análise
- Descrever técnicas específicas para compensar
- Explicar POR QUE a solução funciona
- Dar exemplos práticos

APLICAR REGRAS DO FRAMEWORK (em ordem):

=== PASSO 1: ANÁLISE ROSTO ===
1. Assimetria: "${quiz.assimetria}"
   → Lado mais ALTO: jogar cabelo para lado BAIXO (expõe lado baixo = equilibra)
   → Lado mais BAIXO: jogar cabelo para lado ALTO (expõe lado alto = afina)

2. Característica Facial: "${quiz.caracteristicaFacial}"
   → OBRIGATÓRIO: mencionar e compensar nesta análise
   → Se "papada": linhas VERTICAIS/DIAGONAIS PARA FRENTE (nunca para trás)
   → Se "maçãs": jogar cabelo para o lado onde estão proeminentes
   → Se "rosto inchado": VERTICALIZAR com linhas retas
   → Se "nariz largo": jogar cabelo para os lados OU usar franja que molde o rosto
   → Se "nenhuma": apenas confirmar que foco é em assimetria + biotipo

3. Franja: "${quiz.franja}"
   → Se "rosto ficou mais largo": NÃO usar ou compensar com gola
   → Se "equilibra": cuidado com espelhamento de linhas
   → Se "nariz proeminente": jogar cabelo para lado (quebra vertical)

4. Linhas Rosto: "${quiz.linhasRosto}"
   → Se RETAS: usar CURVAS para quebrar
   → Se CURVAS: usar RETAS para contrastar
   → Determinar gola conforme linhas

=== PASSO 2: ANÁLISE CORPO ===
1. Biotipo: "${quiz.biotipo}"
2. Comprimento: "${quiz.comprimentoPreferido}"
3. Linhas Corpo: "${quiz.linhasCorpo}"
4. Aplicar regra ESPECÍFICA para esse biotipo + comprimento

=== PASSO 3: GERAR RECOMENDAÇÃO (OBRIGATÓRIO INCLUIR CARACTERÍSTICA) ===

**SEU CORTE RECOMENDADO:**

**Compensação de ${quiz.caracteristicaFacial}:**
- [Técnicas específicas para essa característica]
- [Por que funciona com seu rosto]
- [Exemplo prático de como usar]

**Posicionamento & Linhas:**
- [Tipo de corte: RETO / CONVEXO / CÔNCAVO]
- [Qual lado jogar cabelo: ESQUERDA / DIREITA]
- [Por que equilibra sua assimetria]

**Comprimento & Volume:**
- [Comprimento exato: até onde chega]
- [Onde concentrar volume]
- [Efeito visual esperado]

**Gola & Franja:**
- [Recomendação de gola]
- [Franja sim/não e qual tipo]

RESTRIÇÕES ABSOLUTAS:
1. ✅ MENCIONAR EXPLICITAMENTE A CARACTERÍSTICA: ${quiz.caracteristicaFacial}
2. ✅ SER PROFUNDO, NÃO GENÉRICO
3. ✅ EXPLICAR O POR QUE DE CADA SOLUÇÃO
4. ✅ PORTUGUÊS BRASILEIRO
5. ✅ FOCO: O QUE FUNCIONA E POR QUÊ`;

    const messageClaudeResponse = await client.messages.create({
      model: "claude-opus-4-1-20250805",
      max_tokens: 800,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    const promptCorte =
      messageClaudeResponse.content[0].type === "text"
        ? messageClaudeResponse.content[0].text
        : "";

    console.log("✅ Prompt gerado:", promptCorte.substring(0, 100) + "...");

    // PASSO 2: Replicate desativado por enquanto
    // TODO: Ativar quando Replicate estiver disponível com créditos
    let imagemGerada = null;
    // try {
    //   console.log("🎨 Chamando Replicate Inpainting...");
    //   imagemGerada = await chamarReplicateInpainting(
    //     fotoOriginal,
    //     promptCorte
    //   );
    //   console.log("✅ Imagem gerada com sucesso!");
    // } catch (erroReplicate) {
    //   console.warn("⚠️  Replicate indisponível:", erroReplicate.message);
    //   imagemGerada = null;
    // }

    // PASSO 3: Gerar análise COMPLETA do corpo via Claude
    let analiseCorpoCompleta = "";
    try {
      const userMessageCorpo = `GERAR APENAS ANÁLISE DO CORPO (não recomendação de corte):

DADOS:
- Biotipo: ${quiz.biotipo}
- Linhas do corpo: ${quiz.linhasCorpo}
- Comprimento preferido: ${quiz.comprimentoPreferido}
- Assimetria: ${quiz.assimetria}
- Linhas do rosto: ${quiz.linhasRosto}

TAREFA: Explicar PROFUNDAMENTE:
1. O que significa esse biotipo + essas linhas do corpo
2. Como o cabelo trabalha para compensar (para cada comprimento)
3. Como usar roupa/acessórios para equilibrar
4. Dicas práticas de dia a dia

Seja conversacional, detalhada e empoderador. Explique o POR QUÊ de cada recomendação.`;

      const messageCorpoResponse = await client.messages.create({
        model: "claude-opus-4-1-20250805",
        max_tokens: 1200,
        system: systemPrompt,
        messages: [
          {
            role: "user",
            content: userMessageCorpo,
          },
        ],
      });

      analiseCorpoCompleta = messageCorpoResponse.content[0].type === "text"
        ? messageCorpoResponse.content[0].text
        : "";

      console.log("✅ Análise do corpo gerada!");
    } catch (erroAnalise) {
      console.warn("⚠️ Erro ao gerar análise do corpo:", erroAnalise.message);
      analiseCorpoCompleta = "Análise do corpo indisponível no momento.";
    }

    // PASSO 4: Retornar resultado
    return res.status(200).json({
      sucesso: true,
      imagemCorteRecomendado: imagemGerada,
      promptUsado: promptCorte,
      analiseCorpo: analiseCorpoCompleta
    });
  } catch (erro) {
    console.error("❌ Erro ao gerar corte visual:", erro);
    console.error("Stack:", erro.stack);
    return res.status(500).json({
      erro: "Erro ao gerar corte visual",
      detalhes: erro.message,
      stack: process.env.NODE_ENV === 'development' ? erro.stack : undefined
    });
  }
}
