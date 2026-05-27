const express = require('express');
const path = require('path');
const Anthropic = require("@anthropic-ai/sdk");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const systemPromptIABeauty = `Você é um especialista em VISAGISMO focado em recomendações de CORTE DE CABELO.

## PRINCÍPIOS
1. Assimetria Facial → Posicionamento estratégico de cabelo
2. Linhas Visuais → Compensação visual
3. Biotipos → Sinergia com corte

Gere recomendação INTEGRADA de corte de cabelo que funciona em SINERGIA com TUDO.`;

app.post('/api/gerar-sintese', async (req, res) => {
  try {
    const { nome, rosto, corpo } = req.body;

    if (!nome || !rosto || !corpo) {
      return res.status(400).json({ error: 'Missing required data' });
    }

    const userPrompt = `Análise para ${nome}:
- Assimetria: ${rosto.assimetria}
- Essência: ${rosto.essencia}
- Contexto: ${rosto.contexto}
- Biotipo: ${corpo.biotipo}
- Linhas: ${corpo.linhasCorpo}
- Comprimento: ${corpo.comprimentoPreferido}

Gere uma recomendação integrada de corte de cabelo.`;

    const response = await client.messages.create({
      model: "claude-opus-4-1-20250805",
      max_tokens: 2000,
      system: systemPromptIABeauty,
      messages: [{ role: "user", content: userPrompt }],
    });

    const recomendacao = response.content[0].type === 'text' ? response.content[0].text : '';

    res.json({
      success: true,
      nome,
      recomendacao,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: 'Failed to generate synthesis',
      details: error.message,
    });
  }
});

// Fallback para index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ IA BEAUTY 2.0 rodando em porta ${PORT}`);
  console.log(`📡 API: POST /api/gerar-sintese`);
  console.log(`🔑 ANTHROPIC_API_KEY: ${process.env.ANTHROPIC_API_KEY ? 'Configurada ✅' : 'Não configurada ❌'}`);
});
