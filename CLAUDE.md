# IA BEAUTY — Inteligência Visual da Sua Imagem (Arquitetura em Quadrantes)

## ✅ Status do Projeto

- **Status:** 🟢 Q1, Q2, Q3, Q4 COMPLETOS + PERSONALIZAÇÃO INTEGRADA
- **Última atualização:** 2026-05-26 (Madrugada)
- **Commit:** 58aa0f7 (feat: Add personalized communication with user's name throughout all quadrants)
- **URL Produção:** https://ia-beauty-20-novo.vercel.app ✅ FUNCIONANDO
- **Status Atual:** 
  - ✅ Câmera operacional (MediaPipe FaceLandmarker 468 pontos)
  - ✅ Detecção de assimetria corrigida (lado direito/esquerdo preciso)
  - ✅ Q1 (Rosto): Análise facial completa com meias-faces
  - ✅ Q2 (Gola + Adereços): Exploração educacional com volume de informação
  - ✅ Q3 (Corpo): Análise de biotipos e linhas do corpo
  - ✅ Q4 (Síntese Final): Integração com Claude API
  - ✅ **PERSONALIZAÇÃO:** Nome da usuária em 10+ funções através de Q2, Q3 e Q4

### 🟢 IMPLEMENTAÇÃO CONCLUÍDA - SESSÃO 26/05/2026 (MADRUGADA)

**Personalization Enhancement Complete:**
- ✅ Q2 (Gola + Adereços) — 4 funções com personalization:
  - `abrirQuadrante2()` → "👚 ${nome}, Agora Vamos Explorar Gola + Adereços"
  - `explorarGolas()` → "👚 ${nome}, Golas — Como Você Continua a Conversa do Rosto"
  - `explorarAderecos()` → "✨ ${nome}, Adereços — Brincos, Óculos, Colares e Mais"
  - `explorarFranja()` → "✨ ${nome}, Franja — O Sistema de Compensação com a Gola"

- ✅ Q3 (Corpo) — 3 funções com personalization:
  - `abrirQuadrante3()` → "💃 ${nome}, Seu Corpo — Como Linhas & Biotipos Guiam o Corte"
  - `explorarBiotipos()` → "Explore Os 5 Biotipos (${nome})"
  - `irParaPerguntas()` → "P1: Qual é seu Biotipo, ${nome}?"

- ✅ Q4 (Síntese Final) — 3 funções com personalization:
  - `abrirQuadrante4()` → Heading e intro message com nome
  - `gerarSinteseFinal()` → "⏳ Gerando sua síntese, ${nome}..."
  - `exibirRecomendacao()` → "✨ Sua Recomendação Integrada, ${nome}"

**Padrão de Implementação:**
- Cada função inicia com `const nome = usuariaData.nome || 'você';`
- Fallback para 'você' caso o nome não esteja disponível
- Nome aparece em headings, mensagens de intro, e chamadas diretas para a usuária
- Mantém consistência visual com emojis e formatação HTML existente

**Commit:** `58aa0f7` - feat: Add personalized communication with user's name throughout all quadrants
**Push:** ✅ GitHub sincronizado
**Deploy:** Vercel webhook auto-deploy em progresso

### ✅ Q4 REFACTORING COMPLETO - CONSOLIDAÇÃO VISUAL + PDF REAL

**Implementado:**
- ✅ **Visual Consolidation View** (`mostrarConsolidacaoVisual()`)
  - 3 meias-faces exibidas como thumbnails (lado esquerdo, original, lado direito)
  - Q1 Summary: Assimetria, Essência, Contexto com cores temáticas
  - Q2 Summary: Exploração de gola, adereços, franja com description
  - Q3 Summary: Biotipo, linhas do corpo, comprimento preferido
  - Layout visual com seções coloridas (pink para Q1, cyan para Q2, gold para Q3)

- ✅ **Real PDF Generation** (`gerarPDF()` com jsPDF)
  - Integração com jsPDF via CDN (html2pdf.js + jsPDF UMD)
  - Header profissional com "IA BEAUTY 2.0" e data
  - 4 seções principais:
    1. Análise Facial (Q1) - assimetria, essência, contexto
    2. Exploração - Gola + Adereços (Q2) - insights consolidados
    3. Análise do Corpo (Q3) - biotipo, linhas, comprimento
    4. Recomendação Integrada - texto completo do Claude
  - Footer com timestamp de geração
  - Text wrapping automático e quebra de página automática
  - Formatação de bullet points e parágrafos

- ✅ **New Flow States**
  - "consolidacao": Mostra visão de consolidação com tudo que foi analisado
  - "gerando": Loading state enquanto Claude gera recomendação
  - "exibindo": Mostra recomendação final com botão de PDF

- ✅ **Arquivo Commit:** `2079db7` - Q4 complete overhaul

### 🔄 PRÓXIMA SESSÃO - TAREFAS CRÍTICAS RESTANTES

**Prioritário #1: Teste Completo Q1→Q2→Q3→Q4**
- ⏳ Fazer fluxo completo com nome fictício
- ⏳ Verificar que consolidação visual está funcionando
- ⏳ Testar que meias-faces aparecem corretamente
- ⏳ Gerar PDF e validar conteúdo
- ⏳ Testar em mobile (Chrome Android)

**Prioritário #2: Deploy & Produção**
- ⏳ Verificar Vercel deployment automático completado (webhook)
- ⏳ Testar em produção: https://ia-beauty-20-novo.vercel.app
- ⏳ Validar que consolidação visual funciona em produção
- ⏳ Validar que PDF download funciona em produção

**Prioritário #3: Refinamento de Claude Prompt (Q4)**
- ⏳ Melhorar system prompt de Claude em `/api/gerar-sintese` para ser mais específico
- ⏳ Adicionar mais contexto sobre visagismo no prompt
- ⏳ Testar que recomendações são coerentes com análise

**Otimizações Futuras:**
- [ ] Adicionar imagens de referência de cortes no PDF
- [ ] Sistema de salvamento de protocolos (histórico por usuária)
- [ ] Compartilhamento de protocolo via link
- [ ] Modo escuro para mobile
- [ ] Integração com WhatsApp para enviar protocolo

**Problema Principal:**
- Máscara facial do MediaPipe está desenhando um círculo pequeno BRANCO no meio do rosto
- Isso sobrepõe os elementos faciais (olhos, nariz, boca)
- Problema está em `lib/camera.js` → função `desenharMascara()` → linhas 260-297

**Solução a Implementar:**
1. A máscara está usando o contorno padrão `FACE_OVAL` (36 pontos)
2. Esses pontos precisam ser escalados/posicionados baseado no BOUNDING BOX REAL do rosto detectado
3. NÃO aplicar escalas diferentes para X e Y (causa distorção)
4. Testar a imagem `C:\Users\Usuário\Desktop\IA BEAUT\PQP.jpeg` (rosto do Bruno) para validar

**Código Referência:**
- Usar MediaPipe FaceLandmarker (468 pontos) para detectar bounding box real
- Aplicar transformação UNIFORME ao contorno oval
- Sincronizar olhos, nariz, boca com a mesma transformação

**Arquivo Principal:** `C:\Users\Usuário\ia-beauty-2.0-novo\lib\camera.js`

---

### Implementações de hoje (Sessão 25/05 - Noite):

**Q1 (Rosto) — Finalizado e Robusto:**
- ✅ Fluxo: Nome → Formato → Desconforto → Câmera → Meias-faces → Análise → Reflexão SER vs ESTAR
- ✅ Reflexão SER vs ESTAR profunda com 3 versões (essência, contexto, híbrida)
- ✅ Cada versão tem explicação robusta conectada com análise facial
- ✅ Transição automática Q1 → Q2 após reflexão
- ✅ Bridge em Q1 educação explicando que Q2 vai explorar gola + adereços

**Q2 (Gola + Adereços) — Novo e Completo:**
- ✅ Novo arquivo: `lib/quadrante-2.js` com exploração educacional
- ✅ Conceito central: VOLUME DE INFORMAÇÃO = FORMATO + DENSIDADE
- ✅ Golas: 3 tipos (U/curvas, V/diagonal, Quadrada/retas) com efeitos visuais
- ✅ Adereços: Brincos, Óculos, Colares com detalhe de FINO vs DENSO
- ✅ Exemplos práticos: "óculos reto fino equilibra | óculos reto grosso conflita"
- ✅ Bridge de Sobrancelhas: Introduz as 3 regiões (Testa/Mental, Meio/Emocional, Queixo/Intuitivo)
- ✅ Sobrancelhas: 5 combinações (retas+grossas, retas+finas, curvas+grossas, curvas+finas, diagonais)
- ✅ Foco: Liberdade consciente de escolha através de entendimento de consequências visuais

**Correções e Ajustes:**
- ✅ Removidas chamadas para função `atualizarRosto()` inexistente
- ✅ `usuariaData` agora inclui `assimetria` (lado_alto, lado_baixo, diferenca)
- ✅ Assimetria preenchida corretamente ao analisar rosto em Q1
- ✅ Substituídos placeholders vazios por bridges educacionais

### O que foi implementado (Quadrante 1):

**Câmera + Detecção:**
✅ MediaPipe FaceLandmarker (468 pontos faciais)
✅ Máscara facial em tempo real (branca → dourada)
✅ Mensagens direcionais (← → ↑ ↓)
✅ Captura automática ao centralizar (5 frames estáveis)

**Fluxo Interativo (5 Etapas):**
1. ✅ **Meias-faces + Ancestralidade**
   - 3 meias-faces lado a lado (esquerda | original | direita)
   - Explicação visual de linhagem paterna/materna
   - (SEM texto de comparação genérico)

2. ✅ **Análise de Assimetria**
   - Detecta qual lado é mais alto/baixo usando landmarks
   - Mensagem personalizada: "Seu lado X é mais alto..."

3. ✅ **Pergunta de Formato**
   - 🔵 Redondo/Oval (curvas)
   - ⬜ Retangular/Quadrado (retas)
   - △ Triangular (diagonais)
   - Identifica linhas predominantes

4. ✅ **Pergunta de Desconforto**
   - 😟 Sim, causa desconforto
   - 😊 Não, me agrada
   - 😐 Indiferente
   - Entende percepção da usuária

5. ✅ **Educação Completa**
   - Resumo do perfil (assimetria + formato + conforto)
   - Compensação visual (qual lado expor)
   - 💡 Gola ideal (placeholders - aguardando refinamento)
   - ✨ Adereços/Acessórios (placeholders - aguardando refinamento)

### Próximos passos (Refinamento Q1):
⏳ Adicionar informações sobre GOLA por tipo de formato
⏳ Adicionar recomendações de ADEREÇOS (brincos, óculos, etc)
⏳ Quadrante 2: Quiz de corpo + biotipo
⏳ Quadrante 3: Integração Claude API + PDF
⏳ Deploy no Vercel

---

## 🎯 Visão Geral

**IA BEAUTY** é uma refatoração da arquitetura original (MagicFace) com foco em **modularidade e clareza**.

Em vez de um fluxo linear (câmera → quiz → resultado), usamos **4 quadrantes independentes**:
1. **Quadrante 1: Rosto** — Câmera + Análise de Assimetria
2. **Quadrante 2: Corpo** — Dados + Análise de Biotipo
3. **Quadrante 3: Síntese** — Junta análises → Recomendação + PDF
4. **Quadrante 4: Exploração** — Vazio (para novos recursos)

---

## 📊 Stack Técnico (Reutilizado do v1)

- **Frontend:** HTML/CSS/JS (Vanilla)
- **Câmera:** MediaPipe FaceLandmarker (468 pontos)
- **IA:** Claude Vision + Claude Opus (para recomendação)
- **PDF:** jsPDF
- **Backend:** Vercel serverless
- **Versionamento:** Git + GitHub
- **Deploy:** Vercel

---

## 🏗️ Arquitetura em Quadrantes

### **Quadrante 1: ROSTO**
**Responsabilidade:** Capturar e analisar assimetria facial

**Componentes:**
- Câmera com detecção MediaPipe
- Geração de 3 meias-faces (esquerda | original | direita)
- Visualização de assimetria
- Determinação: qual lado mais alto/baixo/largo?

**Output:**
```javascript
{
  assimetria: "lado_direito_mais_alto" | "lado_esquerdo_mais_alto" | "equilibrado",
  linhasRosto: "retas" | "curvas" | "mistura",
  imagens: {
    meiaEsquerda: dataURL,
    original: dataURL,
    meiaDireita: dataURL
  },
  caracteristicaFacial: "papada" | "macas" | "inchado" | "nenhuma"
}
```

---

### **Quadrante 2: CORPO**
**Responsabilidade:** Coletar dados sobre corpo e linhas

**Componentes:**
- Perguntas sobre biotipo (retângulo | pêra | triângulo_inv | ampulheta | oval)
- Perguntas sobre linhas do corpo (retas | curvas | mistura)
- Perguntas sobre preferências (comprimento, franja)

**Output:**
```javascript
{
  biotipo: "retangulo" | "pera" | "triangulo_inv" | "ampulheta" | "oval",
  linhasCorpo: "retas" | "curvas" | "mistura",
  comprimentoPreferido: "curto" | "medio" | "longo",
  franja: "sim" | "nao" | "gostaria"
}
```

---

### **Quadrante 3: SÍNTESE**
**Responsabilidade:** Juntar análises e gerar recomendação + PDF

**Fluxo:**
1. Recebe dados do Quadrante 1 (rosto) + Quadrante 2 (corpo)
2. Chama Claude Opus com system prompt especializado
3. Claude gera recomendação integrada
4. Monta PDF com:
   - 3 meias-faces
   - Análise do Rosto
   - Análise do Corpo
   - Recomendação de Corte
   - Guia Prático Diário
5. Oferece download do PDF

**Output:**
```javascript
{
  recomendacao: "texto do protocolo",
  pdfUrl: "link para download",
  analise: { rosto, corpo }
}
```

---

### **Quadrante 4: EXPLORAÇÃO**
**Responsabilidade:** Vazio por enquanto

Possíveis usos futuros:
- [ ] Galeria de cortes por biotipo
- [ ] Simulador visual (corte no rosto da usuária)
- [ ] Histórico de análises
- [ ] Compartilhamento de protocolo
- [ ] Feedback da usuária

---

## 🧠 Lógica de Compensação Visual (Core)

### **Princípio Central**
> Linhas iguais potencializam. Linhas opostas atenuam.

### **Regras de Compensação**

**1. Assimetria Facial → Posicionamento de Cabelo**
```
SE lado_esquerdo_mais_alto
   → jogar cabelo para DIREITA (expõe alto, volume no baixo)
   
SE lado_direito_mais_alto
   → jogar cabelo para ESQUERDA
   
SE equilibrado
   → flexibilidade total
```

**2. Linhas do Rosto vs Linhas do Corpo**
```
SE rosto RETO && corpo RETO
   → adicionar CURVAS no corte (quebra monotonia)
   
SE rosto CURVO && corpo CURVO
   → adicionar RETAS no corte (equilibra)
   
SE MISTO
   → flexibilidade (pode variar)
```

**3. Biotipo + Corte**
```
RETÂNGULO → quebrar linearidade (franja lateral, movimento)
PÊRA      → expandir ombros (corte reto na cintura)
TRIÂNGULO_INV → expandir quadril (ondas nas pontas)
AMPULHETA → reforçar curvas (movimento fluido)
OVAL      → máxima flexibilidade (escolher pelo rosto)
```

---

## 📁 Estrutura de Arquivos

```
ia-beauty-2.0/
├── index.html                    # Layout em 4 quadrantes
├── CLAUDE.md                     # Esta documentação
├── package.json                  # Dependências
├── .gitignore
│
├── lib/
│   ├── quadrante-1-rosto.js      # Câmera + Meias-Faces
│   ├── quadrante-2-corpo.js      # Formulário + Perguntas
│   ├── quadrante-3-sintese.js    # Geração de Recomendação
│   ├── quadrante-4-exploracao.js # Vazio (para depois)
│   ├── state.js                  # Estado compartilhado
│   ├── utils.js                  # Funções auxiliares
│   └── system-prompt.js          # System prompt para Claude
│
├── api/
│   └── gerar-recomendacao.js     # Endpoint Vercel (Claude API)
│
└── assets/
    └── (imagens, ícones, etc)
```

---

## 🔄 Fluxo de Dados

```
┌──────────────────────────────────────┐
│  QUADRANTE 1: ROSTO                  │
│  (Câmera → 3 Meias-Faces)            │
│  Output: { assimetria, linhas, img } │
└─────────────┬────────────────────────┘
              ↓
        ┌─────────────┐
        │ STATE       │
        │ (Comparti-  │
        │  lhado)     │
        └─────────────┘
              ↑
┌──────────────────────────────────────┐
│  QUADRANTE 2: CORPO                  │
│  (Formulário → Biotipo + Linhas)     │
│  Output: { biotipo, linhas, comp }   │
└─────────────┬────────────────────────┘
              ↓
        ┌──────────────────────┐
        │ QUADRANTE 3: SÍNTESE │
        │ (Claude Opus +       │
        │  jsPDF)              │
        │ Output: PDF + texto  │
        └──────────────────────┘
              ↓
        ┌──────────────────┐
        │ DOWNLOAD PDF     │
        └──────────────────┘
```

---

## ✅ Características Mantidas do v1

- ✅ Análise de assimetria facial (MediaPipe)
- ✅ Geração de 3 meias-faces
- ✅ Lógica de compensação visual (10 leis)
- ✅ System prompt especializado
- ✅ Integração com Claude API
- ✅ Geração de PDF com jsPDF
- ✅ Responsividade mobile
- ✅ Auto-deploy via GitHub

---

## 🚀 Próximos Passos

### ✅ FASE 1: Setup
- [x] Criar `index.html` com 4 quadrantes
- [x] Criar `lib/state.js` (gerenciamento de estado)
- [x] Criar estrutura básica de cada quadrante

### ✅ FASE 2: Quadrante 1 (Rosto)
- [x] Integrar câmera + MediaPipe
- [x] Gerar 3 meias-faces
- [x] Visualizar assimetria
- [x] Reflexão SER vs ESTAR robusta

### ✅ FASE 3: Quadrante 2 (Gola + Adereços)
- [x] Criar exploração educacional
- [x] Implementar Volume de Informação (formato + densidade)
- [x] Bridge de sobrancelhas e 3 regiões do rosto

### 🔄 FASE 4: Quadrante 3 (Corpo)
- [ ] Criar `lib/quadrante-3.js`
- [ ] Exploração de biotipos + linhas do corpo
- [ ] Aplicar Volume de Informação ao corpo
- [ ] As 3 regiões do corpo (ombros, cintura, quadril)

### ⏳ FASE 5: Quadrante 4 (Síntese Final)
- [ ] Consolidar dados Q1 + Q2 + Q3
- [ ] Chamar Claude API com prompt IA BEAUTY 2.0
- [ ] Gerar PDF com protocolo personalizado

### ✅ FASE 6: Deploy
- [x] Push para GitHub
- [x] Deploy na Vercel (webhook automático)

---

## 📝 Notas

- **Estado compartilhado:** Cada quadrante pode ler/escrever no `state.js`
- **Independência:** Quadrantes não falam entre si diretamente (só via state)
- **Testabilidade:** Fácil testar cada quadrante isolado
- **Clareza:** Usuária vê exatamente em qual etapa está

---

**Criado em:** 2026-05-21  
**Versão:** 2.0 (Refatoração Arquitetural)  
**Responsável:** Bruno Alves  
**Referência:** MagicFace v1 (magicface-sand.vercel.app)

---

## 🔒 CONSOLIDAÇÃO FINAL (26/05/2026)

**Projetos duplicados foram consolidados:**
- ❌ [ARCHIVED] IA BEAUT (Desktop) — deletado
- ❌ [ARCHIVED] magicface (cópia local) — deletado
- ✅ **ÚNICO PROJETO:** IA BEAUTY 2.0 (058414/ia-beauty-2.0)

**Regra clara:** SEMPRE trabalhar em `C:\Users\Usuário\ia-beauty-2.0`
**GitHub oficial:** `058414/ia-beauty-2.0`
**Produção oficial:** `https://ia-beauty-20-novo.vercel.app`

Sem mais confusão de 3 projetos iguais! 🎯
