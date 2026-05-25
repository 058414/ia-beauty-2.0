# MagicFace — Skill de Análise Facial & Escolha de Corte de Cabelo

## Visão Geral
Estamos criando **MagicFace** — uma skill especializada em análise facial que ajuda mulheres a **escolher o corte de cabelo ideal** baseado em:
1. **Assimetria facial** (qual lado é mais alto/baixo)
2. **Formato do corpo** (biotipo)
3. **Linhas do rosto e corpo** (para compensação visual)
4. **Luz/sombra** (cores, mechas)

Método: Análise científica + visagismo prático = corte que realmente funciona.

**Status:** ✅ Fase 3 COMPLETA — Fluxo completo funcionando em produção
**Última atualização:** 2026-05-14
**URL Produção:** `https://magicface-sand.vercel.app`

## Objetivo Principal (CORE)

**O que MagicFace FAZ:**
1. Análise de assimetria facial → encontrar lado mais alto/baixo
2. Análise de biotipo → entender formato do corpo
3. Trabalhar compensação visual → através de linhas, formas, luz/sombra
4. **Entregar recomendação de corte de cabelo que realmente funciona**

**O que MagicFace NÃO É:**
- Não é "Dieta Visual genérica" (protocolo de estilo completo)
- Não é recomendação de roupas, cores, acessórios aleatórios
- Não é harmonia/caráter/caracterização (linguiça necessária mas secundária)

**Utilidade Pública:** Mulheres descobrem qual corte favorece seu rosto + corpo.

## Como Funciona (Fluxo MagicFace)

### PASSO 1: Análise Facial (Marquardt-Tester)
- Upload da foto (cabelo preso, frente, neutra)
- Sistema gera:
  - 3 meias faces (esquerda / original+Marquardt / direita)
  - Visualização clara da assimetria
- Usuária vê exatamente qual lado é mais alto/baixo/largo

### PASSO 2: Quiz de 6 Perguntas SIMPLES

**P1: Assimetria Visual (resultado do teste)**
- "Qual lado você viu mais alto na análise?"
- Opções: Lado esquerdo / Lado direito / Parecem iguais

**P2: Formato do Corpo (CORE)**
- "Qual seu biotipo?"
- Opções: Retângulo / Pêra / Triângulo invertido / Ampulheta / Oval

**P3: Linhas do Rosto**
- "Que linhas predominam no seu rosto?"
- Opções: Retas/angulosas / Curvas/arredondadas / Mistura

**P4: Linhas do Corpo**
- "Que linhas predominam no seu corpo?"
- Opções: Retas / Curvas / Mistura

**P5: Tom de Pele**
- "Como sua pele reage ao sol?"
- Opções: Bronzeia fácil (quente) / Fica vermelha (fria) / Pele negra/escura

**P6 (Opcional): Preferência**
- "Comprimento preferido?" (curto/médio/longo)
- OU "Usa franja atualmente?" (sim/não/gostaria)

### PASSO 3: Geração do Protocolo PDF
**Conteúdo (Nova Abordagem MagicFace):**
- Análise das meias faces (visual de assimetria)
- Recomendação do corte: "Para seu rosto com [lado X] mais alto e corpo [biotipo Y], você deve..."
- Explicação prática: Como usar compensação visual (posição de cabelo, linhas, luz/sombra)
- Sugestões de cortes que funcionam
- Teste prático (tipo John Frieda 5cm para cortes curtos)

### Conceitos-Chave Aplicados

**1. Assimetria Facial → Posicionamento de Cabelo**
- Lado mais alto → jogar cabelo para expor lado mais baixo (equilibra)
- Lado mais baixo → jogar cabelo para expor lado mais alto (alonga)

**2. Linhas e Formas**
- Rosto com linhas RETAS + corpo com linhas RETAS → precisa quebrar uma (adicionar curva/diagonal)
- Rosto com linhas CURVAS + corpo com linhas CURVAS → precisa quebrar uma (adicionar reta/diagonal)
- Compensação: escolher onde quebrar para melhor resultado

**3. Luz/Sombra**
- O que é CLARO expande (mechas, cor clara na região)
- O que é ESCURO retrai (base escura, sombra)
- Aplicar no corte, mechas e cores

**4. Biotipo + Linhas do Corpo**
- Retângulo (reta) → corte que crie curva ou diagonal na cintura/quadril
- Pêra (largo em baixo) → corte que expanda ombros ou alongue (equilibra)
- Triângulo invertido (largo em cima) → corte que expanda quadril (equilibra)
- Ampulheta → reforçar a curva (caráter)
- Oval → usar reta ou diagonal para afinar (compensação)

## Exemplo Prático (do Bruno)
Cliente chega com triangulo invertido, reclamando das maçãs do rosto. Bruno nota que ela usa decote V profundo. Quando ele tapa a região com toalha, ela muda de percepção. 

**Insight:** O inconsciente detecta o erro nas linhas, mas como não tem linguagem visual, culpa o cabelo. A skill precisa conectar esses pontos.

## FASE 1: Conclusão ✅

1. ✅ Documentar CLAUDE.md com estrutura inicial
2. ✅ Integrar conhecimento de visagismo (LINHAGENS_ANCESTRAIS.md)
3. ✅ Ler e entender o método do ebook (Cabelo Comando Visual)

## FASE 3: MagicFace — Fluxo Completo ✅ DEPLOYADO

**Arquivo:** `/c/Users/Usuário/magicface/index.html` (HTML único, sem backend)
**Repository:** `058414/magicface` no GitHub

### ✅ JORNADA DO USUÁRIO - COMPLETA

**1. CÂMERA + DETECÇÃO FACIAL**
- ✅ Câmera abre com cruz de centralização branca
- ✅ MediaPipe FaceLandmarker (468 pontos) detecta e rastreia o rosto
- ✅ Máscara branca aparece ao detectar o rosto — rastreia em tempo real
- ✅ Máscara dourada (glow) quando rosto está centralizado
- ✅ Contorno oval calibrado (linha do cabelo até queixo, +22% ajuste)
- ✅ Orientações direcionais: ← → ↑ ↓ + mensagens contextuais
- ✅ Countdown 3-2-1 automático quando centralizado (5 frames estáveis)
- ✅ Flash + captura automática com crop inteligente

**2. EDUCAÇÃO (NOVO)**
- ✅ Foto com linha divisória bem no meio do rosto
- ✅ Explicação profunda da ancestralidade:
  - Herança Paterna (traços marcantes: mandíbula, maçãs, nariz)
  - Herança Materna (suavidade e expressão)
  - 32 regiões genéticas identificadas pela ciência
  - Assimetria como "superpoder" para compensação visual

**3. ANÁLISE VISUAL (MEIAS FACES)**
- ✅ 3 meias-faces geradas no formato de simetria:
  - Lado Direito + Lado Direito (duplicado)
  - Normal (Você)
  - Lado Esquerdo + Lado Esquerdo (duplicado)
- ✅ Fundo branco em todas as imagens
- ✅ Labels claros e visuais

**4. QUIZ EXPANDIDO (6 PERGUNTAS)**
- ✅ **P1:** Percepção do rosto (longo/largo/equilibrado)
- ✅ **P2:** Desconforto (sim/não)
- ✅ **P3:** Uso de franja (5 opções)
- ✅ **P4:** Linhas do rosto (retas/curvas/diagonais)
- ✅ **P5:** Biotipo (retângulo/pêra/triângulo/ampulheta/oval)
- ✅ **P6:** Linhas do corpo (retas/curvas/mistura)

**5. PROTOCOLO/RESULTADO**
- ✅ 3 meias-faces exibidas
- ✅ Análise de compensação de assimetria
- ✅ Análise de franja
- ✅ Análise de linhas do rosto
- ✅ Análise de biotipo + linhas do corpo
- ✅ JSON completo exportável

**6. EXTRA**
- ✅ Funciona em iOS (Safari) e Android (Chrome)
- ✅ Responsivo em mobile
- ✅ Auto-deploy via GitHub

### Stack da máscara:
- MediaPipe Tasks Vision 0.10.12 (CDN)
- Modelo: face_landmarker.task (float16)
- Canvas 2D overlay (não SVG) — redesenha a cada frame
- Bezier suavizado + ajuste de hairline dinâmico

### Próximos ajustes pendentes:
- ⏳ Revisar dinâmica das perguntas do quiz
- ⏳ Adicionar novas perguntas
- ⏳ Protocolo PDF (meias-faces + análise + recomendação de corte)
- ⏳ Novo system prompt MagicFace para Claude

## FASE 2: Implementação em Progresso 🔄

### ✅ Marquardt-Tester (marquardt-tester.html)
- ✅ Upload de foto
- ✅ Geração de meias faces (esquerda/original+Marquardt/direita)
- ✅ Máscara de Marquardt (proporção áurea 1.618)
- ✅ Terminologia corrigida (herança paterna/materna)
- ✅ Canvas clearing

### 🔄 Quiz de 6 Perguntas (NOVO - integrar ao analise/index.html)
- ⏳ **P1:** Qual lado é mais alto? (resultado visual)
- ⏳ **P2:** Qual biotipo? (retângulo/pêra/triângulo/ampulheta/oval)
- ⏳ **P3:** Linhas do rosto? (retas/curvas/mistura)
- ⏳ **P4:** Linhas do corpo? (retas/curvas/mistura)
- ⏳ **P5:** Tom de pele? (quente/fria)
- ⏳ **P6:** Comprimento/franja? (opcional)

### ❌ Protocolo PDF (NOVA ABORDAGEM)
- ⏳ Criar novo system prompt para Claude Opus (MagicFace, não Dieta Visual)
- ⏳ Focar em: **recomendação de corte de cabelo + compensação visual**
- ⏳ Integração com jsPDF
- ⏳ Gerar PDF com meias faces + análise + recomendação de corte

## Análise Facial & Compensação Visual (Skill Core)

### Como Reconhecer Assimetria Facial
1. **Referência visual:** Traçar linha horizontal no ápice das sobrancelhas
   - Uma é sempre ligeiramente mais alta que a outra
2. **Processar a foto:**
   - Upload: cabelo preso para trás, rosto de frente, expressão neutra
   - Gerar 3 rostos: `meia-face-esquerda` + `original` + `meia-face-direita`
   - Cada meia-face duplicada e unida (ex: esquerda + esquerda = rosto só com lado esquerdo)
   - Armazenar imagem para compor protocolo

### Quiz Expandido (Propostas do skill.txt)

**Pergunta 1: Percepção de Rosto**
- "Para você, seu rosto está mais para..."
- Longo demais / Largo demais / Equilibrado
- "Isso te gera algum desconforto?" Sim / Não

**Pergunta 2: Uso de Franja**
- Sim, porém meu rosto ficou mais largo
- Sim, meu rosto equilibra com franja reta
- Sim, porém meu nariz fica mais proeminente
- Não
- Gostaria de usar

**Pergunta 3: Linhas do Rosto (EXPANDIDA)**
- Retas/verticais
- Curvas/arredondadas
- Diagonais

### Lógica de Linhas (CORE DO MÉTODO)

**Classificação:**
- **Linhas quentes/emocionais** = curvineas e derivadas
- **Linhas frias/retas** = horizontais e verticais
- **Linhas dinâmicas/instáveis** = diagonais

**Princípio Principal:** Linhas potencializam linhas por volume de informação
- Se rosto tem excesso de linhas curvas → evitar curvas próximas, usar retas (frias) para atenuar
- Se rosto tem excesso de retas → usar curvas para quebrar monotonia
- Diagonais sempre geram disruptura/movimento (dinâmicas)

**Exemplo Prático Aplicado:**
Cliente chega com triângulo invertido (largo em cima), reclamando das maçãs do rosto.
Bruno nota decote V profundo → tapa com toalha → cliente muda percepção instantaneamente.
**Insight:** O inconsciente detecta erro nas linhas, mas sem linguagem visual culpa o cabelo.
**Solução:** Trabalhar as linhas ao redor do rosto (decote, gola, acessórios), não só o cabelo.

### Compensação Visual Prática

**Se rosto é LONGO (incomoda):**
- Jogar cabelo para lado mais alto
- Expor lado mais baixo/largo
- = Gera equilíbrio instantâneo

**Se rosto é LARGO (incomoda):**
- Jogar cabelo para lado mais baixo
- Expor lado mais alto
- = Gera projeção vertical (afina)

**Se rosto é EQUILIBRADO (não incomoda):**
- Mostrar as 3 meias-faces
- Ensinar como compensar conforme contexto (ciclo menstrual, inchaço, autoestima)
- Ferramenta: conhecer assimetria natural para adaptar dia a dia

**Se usa FRANJA RETA e rosto ficou LARGO:**
- Compensar com gola quadrada/retangular (fria)
- Medir tamanho da franja e compensar para baixo

**Se usa FRANJA RETA e rosto EQUILIBRA:**
- Atenção: verificar linhas do rosto
- Se rosto é curvilíneo + franja reta = equilíbrio, mas pode quebrar ao adicionar mais curvas
- Evitar: golas em U, brincos arredondados, óculos redondos

**Se usa FRANJA e nariz fica PROEMINENTE:**
- Problema: cabelo no meio antes da franja cria linha vertical
- Esta linha vertical espelha linha do nariz (também vertical) = ênfase
- Solução: jogar cabelo para o lado (quebra a percepção vertical)

### Compensação com Gola/Decote

**Conceito crucial:** O rosto não começa na linha de crescimento → vai até onde a usuária determina na gola

Quando coloca franja reta/côncava:
- Rosto passa a ser: final da franja (acima das sobrancelhas) até onde ela determina na gola
- Por isso a gola COMPENSAR as linhas da franja

**Tipos de gola:**
- **Gola em U** = linhas curvas/quentes (reforça)
- **Gola em V** = linhas diagonais/dinâmicas
- **Gola quadrada/retangular** = linhas frias (atenua)

## Próximos Passos (FASE 4 - Protocolo PDF)

### 🎯 OBJETIVO: Gerar PDF com recomendação de corte de cabelo

**TAREFAS PRINCIPAIS:**

1. **Novo System Prompt MagicFace** (Claude Opus)
   - Entrada: JSON com quiz + 3 imagens (meias-faces)
   - Saída: Recomendação de corte personalizada
   - Foco: Corte que trabalha com a assimetria + compensação visual
   - Inclui: Posicionamento de cabelo, linhas, técnicas específicas

2. **Integração jsPDF**
   - Gerar PDF com:
     - As 3 meias-faces no topo
     - Análise da assimetria
     - Recomendação de corte específica
     - Técnicas de compensação visual
     - Sugestões de estilos que funcionam

3. **Endpoint API** (Vercel serverless)
   - Receber POST com: `{ quiz: {...}, imagens: {...} }`
   - Chamar Claude Vision + Claude Opus
   - Gerar PDF
   - Retornar PDF para download

4. **Botão de Download** (Frontend)
   - Após resultado, botão "Baixar Protocolo em PDF"
   - Chama endpoint
   - Faz download do PDF

### 📋 CONTEÚDO DO PDF (Estrutura)

```
[HEADER]
MAGICFACE - SEU PROTOCOLO PERSONALIZADO
Data: YYYY-MM-DD

[SEÇÃO 1: ANÁLISE VISUAL]
- 3 meias-faces lado a lado
- Descrição: "Sua análise visual mostra..."

[SEÇÃO 2: ASSIMETRIA FACIAL]
- Qual lado é mais alto/baixo
- Como usar isso a favor

[SEÇÃO 3: RECOMENDAÇÃO DE CORTE]
- Corte ideal baseado em:
  - Assimetria facial
  - Biotipo
  - Linhas do rosto + corpo
- Técnicas específicas
- Posicionamento de cabelo

[SEÇÃO 4: DICAS PRÁTICAS]
- Como estilizar no dia a dia
- Compensação conforme contexto

[SEÇÃO 5: SUGESTÕES VISUAIS]
- Referências de cortes similares
- O que funciona + o que evitar
```

### 🛠️ ARQUIVOS A CRIAR/MODIFICAR

- **`/api/gerarProtocolo.js`** (novo) — Endpoint que gera o PDF
- **`/index.html`** — Adicionar botão de download no resultado
- **`/lib/systemPromptMagicFace.js`** (novo) — System prompt especializado

### ⚠️ DECISÕES PENDENTES

1. **Onde hospedar a geração?**
   - Vercel serverless (Node.js + jsPDF)
   - Ou API externa?

2. **Referências visuais no PDF?**
   - Buscar imagens de cortes (Google Images API?)
   - Ou apenas descrições?

3. **Assinatura no PDF?**
   - Assinatura digital de Bruno?
   - Ou apenas "Análise MagicFace"?

### 📅 PRÓXIMA SESSÃO

Começar com: **System Prompt MagicFace** (o raciocínio que vai transformar o quiz em recomendação)

## Stack Técnico
- **Frontend:** HTML/CSS/JS (chat quiz interface)
- **Backend:** Vercel serverless (Node.js)
- **IA:** Claude Vision (análise facial) + Claude Haiku/Sonnet (raciocínio sobre linhas/formas)
- **PDF:** jsPDF
- **Processamento de imagem:** Canvas/ImageMagick (teste de meias faces)

## Não Decidido Ainda
- **Nome do projeto:** Será definido depois
- **Onde hospedar:** Vercel (como Dieta Visual original) ou outra plataforma?

---

**Criado em:** 2026-05-07  
**Responsável:** Bruno Alves  
**Palavra-chave de referência:** DIETA-VISUAL-CAMERA-VISAGISMO
