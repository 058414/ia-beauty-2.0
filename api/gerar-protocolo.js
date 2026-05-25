/**
 * VERCEL SERVERLESS FUNCTION
 * Endpoint: /api/gerar-protocolo
 * Gera protocolo MagicFace usando Claude API
 */

export default async function handler(req, res) {
  // Apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { nome, quiz, systemPrompt, userPrompt } = req.body;

    // Validar inputs
    if (!systemPrompt || !userPrompt) {
      return res.status(400).json({ error: 'systemPrompt e userPrompt são obrigatórios' });
    }

    // Chamar Claude API
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY não configurada');
      return res.status(500).json({ error: 'API key não configurada' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-1',
        max_tokens: 2000,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro da API Claude:', errorData);
      return res.status(response.status).json({
        error: 'Erro ao chamar Claude API',
        details: errorData
      });
    }

    const data = await response.json();
    const protocolo = data.content?.[0]?.text;

    if (!protocolo) {
      return res.status(500).json({ error: 'Resposta vazia da IA' });
    }

    return res.status(200).json({
      protocolo: protocolo,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erro no endpoint:', error);
    return res.status(500).json({
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
}
