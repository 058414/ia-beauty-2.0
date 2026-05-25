require('dotenv').config({ path: '.env.local' });

const token = process.env.REPLICATE_API_TOKEN;
console.log('🔑 Token:', token ? `✅ Encontrado (${token.length} chars)` : '❌ Não encontrado');

if (token) {
  // Tentar fazer uma chamada simples ao Replicate
  fetch('https://api.replicate.com/v1/predictions', {
    method: 'GET',
    headers: {
      'Authorization': `Token ${token}`
    }
  })
    .then(r => r.json())
    .then(d => {
      console.log('📊 Resposta da API:', d);
    })
    .catch(e => console.error('❌ Erro:', e.message));
}
