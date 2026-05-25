/**
 * API ENDPOINT — Gerar Recomendação com Claude
 * Vercel Serverless Function
 *
 * POST /api/gerar-recomendacao
 * Body: { quiz, imagens }
 * Response: { recomendacao, pdfUrl }
 */

export default async function handler(req, res) {
  // Apenas POST é aceito
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { quiz, imagens } = req.body;

    // Validar entrada
    if (!quiz || !imagens) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }

    // TODO: Chamar Claude API com system prompt
    // const systemPrompt = criarSystemPromptMagicFace(nomeUsuaria);
    // const response = await fetch('https://api.anthropic.com/v1/messages', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'x-api-key': process.env.ANTHROPIC_API_KEY,
    //     'anthropic-version': '2023-06-01'
    //   },
    //   body: JSON.stringify({
    //     model: 'claude-opus-4-7',
    //     max_tokens: 2000,
    //     system: systemPrompt,
    //     messages: [{
    //       role: 'user',
    //       content: [
    //         { type: 'text', text: 'Gere a recomendação baseada nesses dados...' },
    //         { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: imagens.meiaEsquerda } },
    //         // ... mais imagens
    //       ]
    //     }]
    //   })
    // });

    // TODO: Gerar PDF com jsPDF
    // const pdfUrl = await gerarPDF(recomendacao, imagens);

    // Resposta temporária (placeholder)
    return res.status(200).json({
      recomendacao: 'Recomendação será gerada aqui',
      pdfUrl: null,
      status: 'Em desenvolvimento'
    });

  } catch (error) {
    console.error('Erro ao gerar recomendação:', error);
    return res.status(500).json({
      error: 'Erro ao processar requisição',
      details: error.message
    });
  }
}
