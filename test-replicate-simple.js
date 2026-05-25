require('dotenv').config({ path: '.env.local' });

const token = process.env.REPLICATE_API_TOKEN;

// Tentar usar o modelo replicate/hello-world ou outro simples
const payload = {
  version: '5c7d5dc6dd8bf75c1acaa8565735e7986bc5b66206b55cca93cb72c9bf15ccaa', // Stable Diffusion XL
  input: {
    prompt: 'A woman with a stylish blonde bob haircut, professional salon photo, high quality, beautiful',
    num_inference_steps: 30,
    guidance_scale: 7.5
  }
};

console.log('Testando modelo SDXL no Replicate...');

fetch('https://api.replicate.com/v1/predictions', {
  method: 'POST',
  headers: {
    'Authorization': `Token ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(payload)
})
  .then(async r => {
    const data = await r.json();
    console.log(`Status: ${r.status}`);
    console.log('Resposta:', JSON.stringify(data, null, 2));
  })
  .catch(e => console.error('Erro:', e));
