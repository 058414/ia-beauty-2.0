/**
 * API ENDPOINT: Gerar Síntese Final (Q4)
 * POST /api/gerar-sintese
 *
 * Recebe dados consolidados de Q1, Q2, Q3
 * Chama Claude para gerar recomendação integrada
 * Retorna recomendação + PDF
 */

import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const systemPromptIABeauty = `Você é um especialista em VISAGISMO e ANÁLISE FACIAL focado em recomendações de CORTE DE CABELO.

Seu papel é analisar dados de uma mulher sobre:
1. ROSTO: assimetria facial, essência visual, contexto emocional
2. GOLA: exploração de como golas trabalham visualmente
3. CORPO: biotipo, linhas do corpo, comprimento preferido

E gerar uma RECOMENDAÇÃO INTEGRADA de corte de cabelo que funciona em SINERGIA com TUDO ISSO.

## PRINCÍPIOS FUNDAMENTAIS

### 1. Assimetria Facial = Posicionamento Estratégico
- Se lado esquerdo é mais alto → jogar cabelo para DIREITA (expõe lado baixo, equilibra)
- Se lado direito é mais alto → jogar cabelo para ESQUERDA
- Se equilibrado → flexibilidade máxima

### 2. Linhas Visuais = Compensação
- Rosto com MUITAS CURVAS + corpo com MUITAS CURVAS → adicionar RETAS no corte
- Rosto com MUITAS RETAS + corpo com MUITAS RETAS → adicionar CURVAS no corte
- MISTURA → flexibilidade

### 3. Biotipos + Corte = Sinergia
- RETÂNGULO → movimento, volume lateral, franja diagonal
- PÊRA → volume nos OMBROS, comprimento na cintura
- TRIÂNGULO INVERTIDO → ondas nas pontas, comprimento longo
- AMPULHETA → reforçar curva, movimento fluido
- OVAL → flexibilidade, escolher pelo rosto

### 4. Gola + Franja + Corte = SISTEMA
- Corte compensa o que gola/franja deixam exposto
- Se franja cobre testa → corte alonga abaixo
- Se gola é V → corte estruturado nos ombros

### 5. Essência vs Contexto = Sustentabilidade
- Corte que funciona para ambos os lados da identidade

## FORMATO RESPOSTA
Gere em MARKDOWN com:
- 🎯 Seu Perfil Visual (1-2 parágrafos)
- ✨ Recomendação de Corte (Tipo, Comprimento, Técnicas, Posicionamento, Por quê)
- 💇 Guia Prático (Como Estilizar, Compensação Diária)
- 👚 Gola + Franja + Adereços que Funcionam
- 🔄 Teste Prático

NUNCA diga "certo" ou "errado". SEMPRE explique consequências visuais. SEMPRE conecte com dados recebidos.`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { nome, rosto, corpo, meiaFacesDescricao } = req.body;

    if (!nome || !rosto || !corpo) {
      return res.status(400).json({ error: "Missing required data" });
    }

    // Construir prompt com dados consolidados
    const userPrompt = `
Análise para: ${nome}

## ROSTO (Q1)
- Assimetria: ${rosto.assimetria || "não analisada"}
- Essência (SER): ${rosto.essencia || "não explorada"}
- Contexto (ESTAR): ${rosto.contexto || "não explorado"}
- Imagens: 3 meias-faces foram fornecidas para análise
${meiaFacesDescricao ? `  Descrição visual: ${meiaFacesDescricao}` : ""}

## GOLA + ADEREÇOS + FRANJA (Q2)
- Exploração realizada de golas, franja e adereços
- Entendimento de compensação visual entre elementos

## CORPO (Q3)
- Biotipo: ${corpo.biotipo || "não definido"}
- Linhas do corpo: ${corpo.linhasCorpo || "não definidas"}
- Comprimento preferido: ${corpo.comprimentoPreferido || "não definido"}

Gere uma recomendação INTEGRADA de corte de cabelo que funciona em SINERGIA com TUDO ISSO.
Seja específico. Conecte cada recomendação com os dados acima.
Nunca diga "certo" ou "errado" — mostre consequências visuais.
Empodere a mulher a ENTENDER sua imagem.`;

    // Chamar Claude Opus para gerar recomendação
    const response = await client.messages.create({
      model: "claude-opus-4-1-20250805",
      max_tokens: 2000,
      system: systemPromptIABeauty,
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    const recomendacao =
      response.content[0].type === "text" ? response.content[0].text : "";

    return res.status(200).json({
      success: true,
      nome,
      recomendacao,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error generating synthesis:", error);
    return res.status(500).json({
      error: "Failed to generate synthesis",
      details: error.message,
    });
  }
}
