# 🧪 Instruções de Teste - MagicFace

## Passo 1: Configurar API Key

1. Copie seu `ANTHROPIC_API_KEY` (tipo: `sk-ant-...`)
2. Crie um arquivo `.env` na pasta do projeto:
   ```
   ANTHROPIC_API_KEY=sk-ant-sua-chave-aqui
   ```

## Passo 2: Iniciar Servidores

**Terminal 1** — Frontend (porta 3000):
```bash
cd C:\Users\Usuário\Desktop\magicface
npx http-server -p 3000
```

**Terminal 2** — Backend (porta 3001):
```bash
cd C:\Users\Usuário\Desktop\magicface
node server.js
```

## Passo 3: Testar no Navegador

1. Abra: `http://localhost:3000`
2. Permita acesso à câmera
3. Centralize o rosto (aguarde máscara dourada)
4. Responda as 10 perguntas do quiz
5. 🎯 **Veja a IA gerar o protocolo em tempo real!**

## Troubleshooting

❌ **"API key não configurada"**
- Verifique se `.env` existe e tem `ANTHROPIC_API_KEY=sk-...`

❌ **"Erro ao chamar Claude API"**
- Verifique se a API key é válida
- Verifique se tem créditos na conta Anthropic

❌ **"Cors error"**
- Frontend em port 3000, Backend em port 3001
- Ambos devem estar rodando

✅ **Funcionando?**
- Veja `⏳ Gerando Protocolo` com loading visual
- Depois aparece o protocolo com as 4 seções
