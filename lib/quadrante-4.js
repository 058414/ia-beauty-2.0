/**
 * QUADRANTE 4: PROTOCOLO PERSONALIZADO — Consolidação Integrada & PDF Premium
 * Fluxo: Consolidação Visual → Chamar Claude → Exibir Recomendação → PDF Profissional
 */

let q4State = {
  etapa: "consolidacao", // "consolidacao" | "gerando" | "exibindo"
  recomendacao: null,
  gerando: false,
};

function abrirQuadrante4() {
  q4State.etapa = "consolidacao";
  const conteudo = document.getElementById("conteudo-q4");
  const nome = usuariaData.nome || 'você';

  // Verificar se Q1, Q2, Q3 estão completos
  // Usar verificações simples e seguras
  try {
    const q1Completo = !!(usuariaData.q1FotoCaptured && usuariaData.versaoEscolhida);
    const q2Completo = !!(usuariaData.q2Completo || state?.gola?.explorada);
    const q3Completo = !!(usuariaData.corpo?.biotipo);

    console.log('Q4 Validation:', { q1Completo, q2Completo, q3Completo });

    if (!q1Completo || !q2Completo || !q3Completo) {
    conteudo.innerHTML = `
      <div style="max-width: 800px; margin: 40px auto; text-align: center;">
        <h2 style="color: #E85D9F; font-size: 1.5rem; margin-bottom: 20px;">⚠️ Quadrante Incompleto</h2>
        <p style="color: #ccc; line-height: 1.8; margin-bottom: 30px;">
          Para gerar sua síntese final, ${nome}, você precisa completar os 3 quadrantes anteriores:
        </p>
        <div style="background: rgba(196, 151, 58, 0.1); border-left: 4px solid #C4973A; padding: 25px; border-radius: 12px; text-align: left;">
          <p style="color: #ddd; margin-bottom: 12px;"><strong>✓ Q1 (Rosto):</strong> <span style="color: ${
            q1Completo ? "#4CAF50" : "#888"
          };">${q1Completo ? "Completo" : "Incompleto"}</span></p>
          <p style="color: #ddd; margin-bottom: 12px;"><strong>✓ Q2 (Gola + Adereços):</strong> <span style="color: ${
            q2Completo ? "#4CAF50" : "#888"
          };">${q2Completo ? "Completo" : "Incompleto"}</span></p>
          <p style="color: #ddd;"><strong>✓ Q3 (Corpo):</strong> <span style="color: ${
            q3Completo ? "#4CAF50" : "#888"
          };">${q3Completo ? "Completo" : "Incompleto"}</span></p>
        </div>
        <button class="quadrante-btn" onclick="fecharPainel(4)" style="margin-top: 30px;">← Voltar</button>
      </div>
    `;
      return;
    }

    // VISUAL CONSOLIDATION
    mostrarConsolidacaoVisual();
  } catch (err) {
    console.error('Erro em abrirQuadrante4:', err);
    conteudo.innerHTML = `
      <div style="max-width: 800px; margin: 40px auto; text-align: center; color: #ff6b6b;">
        <h2>⚠️ Erro ao carregar Q4</h2>
        <p>${err.message}</p>
        <button class="quadrante-btn" onclick="fecharPainel(4)">← Voltar</button>
      </div>
    `;
  }
}

function mostrarConsolidacaoVisual() {
  const conteudo = document.getElementById("conteudo-q4");
  const nome = usuariaData.nome || 'você';

  const meiaEsquerda = state.rosto.imagens.meiaEsquerda || '';
  const original = state.rosto.imagens.original || '';
  const meiaDireita = state.rosto.imagens.meiaDireita || '';

  conteudo.innerHTML = `
    <div style="max-width: 1000px; margin: 40px auto;">
      <h2 style="color: #E85D9F; font-size: 1.5rem; margin-bottom: 10px; text-align: center;">
        🎯 ${nome}, Sua Consolidação Visual
      </h2>
      <p style="color: #aaa; text-align: center; margin-bottom: 40px; font-size: 0.9rem;">
        Tudo que você explorou nos 3 quadrantes, consolidado aqui antes da recomendação final
      </p>

      <!-- SEÇÃO 1: MEIAS-FACES DO Q1 -->
      <div style="background: rgba(232, 93, 159, 0.08); border: 1px solid rgba(232, 93, 159, 0.3); padding: 30px; border-radius: 12px; margin-bottom: 30px;">
        <h3 style="color: #E85D9F; margin-bottom: 20px; font-size: 1.1rem;">📸 Q1 - Seu Rosto (3 Meias-Faces)</h3>

        <div style="display: flex; gap: 15px; justify-content: center; margin-bottom: 20px; flex-wrap: wrap;">
          ${meiaEsquerda ? `
            <div style="text-align: center;">
              <img src="${meiaEsquerda}" style="width: 150px; height: 150px; border-radius: 8px; border: 2px solid #6DD5ED; object-fit: cover;">
              <p style="color: #aaa; font-size: 0.85rem; margin-top: 8px;">Lado Esquerdo</p>
            </div>
          ` : ''}
          ${original ? `
            <div style="text-align: center;">
              <img src="${original}" style="width: 150px; height: 150px; border-radius: 8px; border: 2px solid #C4973A; object-fit: cover;">
              <p style="color: #aaa; font-size: 0.85rem; margin-top: 8px;">Original</p>
            </div>
          ` : ''}
          ${meiaDireita ? `
            <div style="text-align: center;">
              <img src="${meiaDireita}" style="width: 150px; height: 150px; border-radius: 8px; border: 2px solid #4CAF50; object-fit: cover;">
              <p style="color: #aaa; font-size: 0.85rem; margin-top: 8px;">Lado Direito</p>
            </div>
          ` : ''}
        </div>

        <div style="background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px;">
          <p style="color: #ddd; margin-bottom: 8px;"><strong>Assimetria Detectada:</strong> <span style="color: #E85D9F;">${
            state.rosto.assimetria ? state.rosto.assimetria.replace(/_/g, ' ').toUpperCase() : 'Equilibrada'
          }</span></p>
          <p style="color: #ddd; margin-bottom: 8px;"><strong>Sua Essência:</strong> <span style="color: #6DD5ED;">${
            state.rosto.essencia ? state.rosto.essencia.charAt(0).toUpperCase() + state.rosto.essencia.slice(1) : 'Explorada'
          }</span></p>
          <p style="color: #ddd;"><strong>Seu Contexto:</strong> <span style="color: #C4973A;">${
            state.rosto.contexto ? state.rosto.contexto.charAt(0).toUpperCase() + state.rosto.contexto.slice(1) : 'Explorado'
          }</span></p>
        </div>
      </div>

      <!-- SEÇÃO 2: Q2 RESUMO -->
      <div style="background: rgba(109, 213, 237, 0.08); border: 1px solid rgba(109, 213, 237, 0.3); padding: 30px; border-radius: 12px; margin-bottom: 30px;">
        <h3 style="color: #6DD5ED; margin-bottom: 20px; font-size: 1.1rem;">👚 Q2 - Gola + Adereços (Exploração Completa)</h3>
        <div style="background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px;">
          <p style="color: #ddd; line-height: 1.8;">
            ✓ Explorou os 3 tipos de gola (U curva, V diagonal, Quadrada estruturada)<br>
            ✓ Aprendeu sobre volume de informação (formato + densidade)<br>
            ✓ Entendeu compensação visual entre franja e gola<br>
            ✓ Explorou adereços (brincos, óculos, colares) e suas consequências visuais
          </p>
        </div>
      </div>

      <!-- SEÇÃO 3: Q3 RESUMO -->
      <div style="background: rgba(196, 151, 58, 0.08); border: 1px solid rgba(196, 151, 58, 0.3); padding: 30px; border-radius: 12px; margin-bottom: 30px;">
        <h3 style="color: #C4973A; margin-bottom: 20px; font-size: 1.1rem;">💃 Q3 - Seu Corpo (Análise Completa)</h3>
        <div style="background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px;">
          <p style="color: #ddd; margin-bottom: 8px;"><strong>Seu Biotipo:</strong> <span style="color: #C4973A;">${
            (state.corpo.biotipo || 'não definido').charAt(0).toUpperCase() + (state.corpo.biotipo || 'não definido').slice(1)
          }</span></p>
          <p style="color: #ddd; margin-bottom: 8px;"><strong>Linhas do Seu Corpo:</strong> <span style="color: #C4973A;">${
            (state.corpo.linhasCorpo || 'não definidas').charAt(0).toUpperCase() + (state.corpo.linhasCorpo || 'não definidas').slice(1)
          }</span></p>
          <p style="color: #ddd;"><strong>Comprimento Preferido:</strong> <span style="color: #C4973A;">${
            (state.corpo.comprimentoPreferido || 'não definido').charAt(0).toUpperCase() + (state.corpo.comprimentoPreferido || 'não definido').slice(1)
          }</span></p>
        </div>
      </div>

      <!-- CALL TO ACTION -->
      <div style="text-align: center; margin-top: 40px;">
        <p style="color: #aaa; margin-bottom: 20px; font-size: 0.95rem;">
          Agora IA BEAUTY vai analisar TUDO isso e consolidar em um PROTOCOLO COMPLETO com tudo que você aprendeu em cada quadrante. Você vai receber uma análise profunda, conversacional e empoderada. Você vai ENTENDER sua imagem, não apenas copiar.
        </p>
        <button class="quadrante-btn" onclick="gerarSinteseFinal()" style="width: 100%; padding: 15px; font-size: 1rem; ${
          q4State.gerando ? "opacity: 0.5; cursor: not-allowed;" : ""
        }">
          ${q4State.gerando ? "⏳ Gerando seu protocolo..." : "✨ Gerar Seu Guia Visual"}
        </button>
      </div>
    </div>
  `;
}

async function gerarSinteseFinal() {
  q4State.gerando = true;
  q4State.etapa = "gerando";

  const conteudo = document.getElementById("conteudo-q4");
  const nome = usuariaData.nome || 'você';

  conteudo.innerHTML = `
    <div style="max-width: 900px; margin: 40px auto; text-align: center;">
      <h2 style="color: #6DD5ED; margin-bottom: 30px;">⏳ IA BEAUTY ESTÁ GERANDO SEU PROTOCOLO PERSONALIZADO, ${nome}...</h2>
      <p style="color: #aaa; margin-bottom: 20px;">Consolidando tudo que você aprendeu nos 4 quadrantes e gerando sua análise visual completa...</p>
      <div style="display: flex; justify-content: center; gap: 6px;">
        <div style="width: 12px; height: 12px; background: #E85D9F; border-radius: 50%; animation: pulse 1.5s infinite;"></div>
        <div style="width: 12px; height: 12px; background: #6DD5ED; border-radius: 50%; animation: pulse 1.5s infinite 0.2s;"></div>
        <div style="width: 12px; height: 12px; background: #C4973A; border-radius: 50%; animation: pulse 1.5s infinite 0.4s;"></div>
      </div>
      <style>
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      </style>
    </div>
  `;

  try {
    // Consolidar dados
    const dadosConsolidados = {
      nome: usuariaData.nome || "Usuária",
      rosto: {
        assimetria: state.rosto.assimetria,
        essencia: state.rosto.essencia,
        contexto: state.rosto.contexto,
        possuiImagens: !!state.rosto.imagens.original,
      },
      corpo: {
        biotipo: state.corpo.biotipo,
        linhasCorpo: state.corpo.linhasCorpo,
        comprimentoPreferido: state.corpo.comprimentoPreferido,
      },
    };

    // Chamar endpoint API
    const response = await fetch("/api/gerar-sintese", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...dadosConsolidados,
        meiaFacesDescricao: `3 meias-faces capturadas para análise de assimetria facial`,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const resultado = await response.json();

    if (!resultado.success) {
      throw new Error(resultado.error || "Unknown error");
    }

    q4State.recomendacao = resultado.recomendacao;
    q4State.etapa = "exibindo";
    exibirRecomendacao();
  } catch (erro) {
    console.error("Erro ao gerar síntese:", erro);
    conteudo.innerHTML = `
      <div style="max-width: 800px; margin: 40px auto; text-align: center;">
        <h2 style="color: #E85D9F; margin-bottom: 20px;">❌ Erro ao Gerar Protocolo</h2>
        <p style="color: #ccc; margin-bottom: 20px;">${erro.message}</p>
        <button class="quadrante-btn" onclick="abrirQuadrante4()">← Tentar Novamente</button>
      </div>
    `;
  } finally {
    q4State.gerando = false;
  }
}

function exibirRecomendacao() {
  const conteudo = document.getElementById("conteudo-q4");
  const nome = usuariaData.nome || 'você';

  conteudo.innerHTML = `
    <div style="max-width: 900px; margin: 40px auto;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
        <h2 style="color: #E85D9F; font-size: 1.5rem; margin: 0;">✨ Seu Guia Visual Personalizado, ${nome}</h2>
        <button class="quadrante-btn" onclick="gerarPDF()" style="width: auto; padding: 10px 20px;">📄 Baixar Protocolo</button>
      </div>
      <p style="color: #6DD5ED; font-size: 0.95rem; margin-bottom: 20px; font-style: italic;">
        Este guia apresenta ELEMENTOS estruturais (linhas, comprimento, técnicas, luz/sombra) que você pode trabalhar com seu cabeleireiro. O objetivo é você ENTENDER sua imagem e fazer escolhas conscientes — não copiar um resultado específico.
      </p>

      <div style="background: linear-gradient(135deg, rgba(50, 50, 70, 0.2), rgba(232, 93, 159, 0.05)); border: 1px solid rgba(232, 93, 159, 0.2); border-radius: 16px; padding: 30px;">
        <div style="color: #f0f0f0; line-height: 1.9; font-size: 1rem;">
          ${q4State.recomendacao
            .split("\n")
            .map((line) => {
              if (line.startsWith("#")) {
                const level = line.match(/^#+/)[0].length;
                const text = line.replace(/^#+\s/, "");
                return `<h${level + 1} style="color: #E85D9F; margin-top: 25px; margin-bottom: 15px;">${text}</h${
                  level + 1
                }>`;
              } else if (line.startsWith("-")) {
                return `<li style="color: #ccc; margin-left: 20px; margin-bottom: 8px;">${line.replace(
                  /^-\s/,
                  ""
                )}</li>`;
              } else if (line.trim() === "") {
                return "<br>";
              } else {
                return `<p style="color: #ccc; margin-bottom: 12px;">${line}</p>`;
              }
            })
            .join("")}
        </div>
      </div>

      <div style="text-align: center; margin-top: 40px; display: flex; gap: 15px; flex-wrap: wrap;">
        <button class="quadrante-btn" onclick="gerarPDF()" style="flex: 1; padding: 12px; min-width: 200px; background: linear-gradient(135deg, #E85D9F, #d63d83);">📥 Baixar Protocolo em PDF</button>
        <button class="quadrante-btn" onclick="fecharPainel(4)" style="flex: 1; padding: 12px; min-width: 200px;">← Voltar ao Menu</button>
      </div>
    </div>
  `;
}

function gerarPDF() {
  if (!q4State.recomendacao) {
    alert("Recomendação não disponível");
    return;
  }

  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    const nome = usuariaData.nome || 'Usuária';
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 15;
    const margin = 12;
    const contentWidth = pageWidth - (margin * 2);

    // ===== CAPA / HEADER PREMIUM =====
    doc.setFillColor(232, 93, 159);
    doc.rect(0, 0, pageWidth, 55, 'F');

    doc.setFontSize(28);
    doc.setTextColor(255, 255, 255);
    doc.text("IA BEAUTY 2.0", margin, 20);

    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text("Inteligência Visual da Sua Imagem", margin, 32);

    doc.setFontSize(10);
    doc.setTextColor(220, 220, 220);
    doc.text("Protocolo Personalizado de Análise Visual & Guia de Elementos Estruturais", margin, 42);

    yPosition = 65;

    // ===== GREETING PESSOAL =====
    doc.setFontSize(16);
    doc.setTextColor(232, 93, 159);
    doc.text(`Olá, ${nome}!`, margin, yPosition);
    yPosition += 10;

    doc.setFontSize(9.5);
    doc.setTextColor(60, 60, 60);
    const saudacao = `Este é seu protocolo personalizado. Você explorou sua imagem em 4 dimensões e descobriu sua própria INTELIGÊNCIA VISUAL. Este documento consolida tudo e oferece um GUIA DE ELEMENTOS ESTRUTURAIS (linhas, comprimento, técnicas, luz/sombra) que funcionam em sinergia com seu rosto, corpo, essência e contexto. O objetivo é você ENTENDER sua imagem — não copiar um resultado, mas fazer escolhas conscientes e informadas.`;
    const saudacaoSplit = doc.splitTextToSize(saudacao, contentWidth);
    doc.text(saudacaoSplit, margin, yPosition);
    yPosition += (saudacaoSplit.length * 4) + 8;

    // ===== DIVIDER =====
    doc.setDrawColor(232, 93, 159);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // ===== SEÇÃO 1: Q1 - ROSTO =====
    doc.setFontSize(14);
    doc.setTextColor(232, 93, 159);
    doc.text("1️⃣  ANÁLISE FACIAL — Seu Rosto", margin, yPosition);
    yPosition += 9;

    doc.setFontSize(11);
    doc.setTextColor(232, 93, 159);
    doc.text("Sua Assimetria Facial", margin, yPosition);
    yPosition += 6;

    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    const assimetriaText = `${state.rosto.assimetria ? state.rosto.assimetria.replace(/_/g, ' ').toUpperCase() : 'EQUILIBRADA'}
Esta é seu "superpoder visual". Pode ser usada estrategicamente no posicionamento do cabelo para criar compensação e equilíbrio.`;
    const assimetriaSplit = doc.splitTextToSize(assimetriaText, contentWidth);
    doc.text(assimetriaSplit, margin, yPosition);
    yPosition += (assimetriaSplit.length * 3.5) + 5;

    doc.setFontSize(11);
    doc.setTextColor(232, 93, 159);
    doc.text("Sua Essência (SER)", margin, yPosition);
    yPosition += 6;

    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    const essenciaText = `${state.rosto.essencia ? state.rosto.essencia.charAt(0).toUpperCase() + state.rosto.essencia.slice(1) : 'EXPLORADA'}
Quem você É naturalmente. Sua autoexpressão autêntica.`;
    const essenciaSplit = doc.splitTextToSize(essenciaText, contentWidth);
    doc.text(essenciaSplit, margin, yPosition);
    yPosition += (essenciaSplit.length * 3.5) + 5;

    doc.setFontSize(11);
    doc.setTextColor(232, 93, 159);
    doc.text("Seu Contexto (ESTAR)", margin, yPosition);
    yPosition += 6;

    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    const contextoText = `${state.rosto.contexto ? state.rosto.contexto.charAt(0).toUpperCase() + state.rosto.contexto.slice(1) : 'EXPLORADO'}
Como você ESTÁ agora. Seu estado emocional. O cabelo pode expressar isso ou equilibrá-lo.`;
    const contextoSplit = doc.splitTextToSize(contextoText, contentWidth);
    doc.text(contextoSplit, margin, yPosition);
    yPosition += (contextoSplit.length * 3.5) + 10;

    // Check page break
    if (yPosition > pageHeight - 45) {
      doc.addPage();
      yPosition = 15;
    }

    // ===== SEÇÃO 2: Q2 - GOLA + ADEREÇOS =====
    doc.setFontSize(14);
    doc.setTextColor(109, 213, 237);
    doc.text("2️⃣  COMPENSAÇÃO VISUAL — Gola + Adereços + Franja", margin, yPosition);
    yPosition += 9;

    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    const q2Text = `Você explorou como cada elemento visual trabalha em SISTEMA INTEGRADO:

GOLA: A conversa continua abaixo do rosto. Escolher bem significa usar compensação visual.

FRANJA: O que cobre na testa, a gola compensa abaixo. Funcionam juntas.

ADEREÇOS: Brincos, óculos, colares mudam como as pessoas leem sua expressão. Formato + Densidade = Volume de Informação.

O entendimento disso te dá LIBERDADE CONSCIENTE de escolha.`;
    const q2Split = doc.splitTextToSize(q2Text, contentWidth);
    doc.text(q2Split, margin, yPosition);
    yPosition += (q2Split.length * 3.5) + 8;

    // ===== SEÇÃO 3: Q3 - CORPO =====
    doc.setFontSize(14);
    doc.setTextColor(196, 151, 58);
    doc.text("3️⃣  ANÁLISE DO CORPO — Biotipo + Linhas", margin, yPosition);
    yPosition += 9;

    doc.setFontSize(11);
    doc.setTextColor(196, 151, 58);
    doc.text("Seu Biotipo", margin, yPosition);
    yPosition += 6;

    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    const biotipoText = `${(state.corpo.biotipo || 'NÃO DEFINIDO').toUpperCase()}
A forma do seu corpo determina como o cabelo precisa trabalhar para equilibrar proporções.`;
    const biotipSplit = doc.splitTextToSize(biotipoText, contentWidth);
    doc.text(biotipSplit, margin, yPosition);
    yPosition += (biotipSplit.length * 3.5) + 5;

    doc.setFontSize(11);
    doc.setTextColor(196, 151, 58);
    doc.text("Linhas do Seu Corpo", margin, yPosition);
    yPosition += 6;

    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    const linhasText = `${(state.corpo.linhasCorpo || 'NÃO DEFINIDAS').toUpperCase()}
Se curvas predominam, adicione retas. Se retas predominam, adicione curvas. Isso cria compensação visual.`;
    const linhasSplit = doc.splitTextToSize(linhasText, contentWidth);
    doc.text(linhasSplit, margin, yPosition);
    yPosition += (linhasSplit.length * 3.5) + 5;

    doc.setFontSize(11);
    doc.setTextColor(196, 151, 58);
    doc.text("Comprimento Preferido", margin, yPosition);
    yPosition += 6;

    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    const compText = `${(state.corpo.comprimentoPreferido || 'NÃO DEFINIDO').toUpperCase()}
A posição onde o cabelo termina interfere nas proporções. Importa MUITO.`;
    const compSplit = doc.splitTextToSize(compText, contentWidth);
    doc.text(compSplit, margin, yPosition);
    yPosition += (compSplit.length * 3.5) + 10;

    // Check page break
    if (yPosition > pageHeight - 45) {
      doc.addPage();
      yPosition = 15;
    }

    // ===== SEÇÃO 4: RECOMENDAÇÃO =====
    doc.setFontSize(14);
    doc.setTextColor(232, 93, 159);
    doc.text("4️⃣  RECOMENDAÇÃO INTEGRADA — Seu Corte", margin, yPosition);
    yPosition += 9;

    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);

    const recLines = q4State.recomendacao.split('\n');
    for (const line of recLines) {
      // Check page break
      if (yPosition > pageHeight - 25) {
        doc.addPage();
        yPosition = 15;
      }

      if (line.startsWith('###')) {
        const title = line.replace(/^#+\s/, '').trim();
        doc.setFontSize(10);
        doc.setTextColor(232, 93, 159);
        doc.text(title, margin, yPosition);
        yPosition += 7;
      } else if (line.startsWith('##')) {
        const title = line.replace(/^#+\s/, '').trim();
        doc.setFontSize(10);
        doc.setTextColor(109, 213, 237);
        doc.text(title, margin, yPosition);
        yPosition += 7;
      } else if (line.startsWith('#')) {
        const title = line.replace(/^#+\s/, '').trim();
        doc.setFontSize(11);
        doc.setTextColor(232, 93, 159);
        doc.text(title, margin, yPosition);
        yPosition += 8;
      } else if (line.startsWith('-')) {
        const text = line.replace(/^-\s/, '').trim();
        const split = doc.splitTextToSize(`• ${text}`, contentWidth);
        doc.setFontSize(9);
        doc.setTextColor(60, 60, 60);
        doc.text(split, margin, yPosition);
        yPosition += (split.length * 3.8);
      } else if (line.trim() !== '') {
        const split = doc.splitTextToSize(line.trim(), contentWidth);
        doc.setFontSize(9);
        doc.setTextColor(60, 60, 60);
        doc.text(split, margin, yPosition);
        yPosition += (split.length * 3.8);
      } else {
        yPosition += 2;
      }
    }

    yPosition += 8;

    // Check page break para DICAS
    if (yPosition > pageHeight - 50) {
      doc.addPage();
      yPosition = 15;
    }

    // ===== SEÇÃO 5: DICAS PRÁTICAS =====
    doc.setFontSize(13);
    doc.setTextColor(232, 93, 159);
    doc.text("💡 COMO USAR ESTE PROTOCOLO", margin, yPosition);
    yPosition += 9;

    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    const dicasText = `1. LEVE AO CABELEIREIRO
Imprima ou mostre este PDF. A recomendação foi gerada especificamente para VOCÊ.

2. CONVERSE SOBRE INTELIGÊNCIA VISUAL
Fale sobre assimetria, linhas, biotipo. Seu cabeleireiro entenderá melhor sua necessidade.

3. TESTE POR 2-3 SEMANAS
Deixe o corte se assentar. Ajuste a estilização conforme necessário.

4. LEMBRE-SE
Você agora conhece sua própria inteligência visual. Use esse conhecimento em todas as escolhas de imagem.

5. EVOLUA
Seu corpo e essência podem mudar. Este protocolo é sua base para evolução consciente.`;
    const dicasSplit = doc.splitTextToSize(dicasText, contentWidth);
    doc.text(dicasSplit, margin, yPosition);
    yPosition += (dicasSplit.length * 3.8);

    // ===== FOOTER PREMIUM =====
    doc.setFillColor(232, 93, 159);
    doc.rect(0, pageHeight - 28, pageWidth, 28, 'F');

    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text("IA BEAUTY 2.0 — Inteligência Visual da Sua Imagem", margin, pageHeight - 18);

    doc.setFontSize(8);
    doc.setTextColor(220, 220, 220);
    doc.text(`Protocolo de ${nome} | Gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`, margin, pageHeight - 12);

    doc.setFontSize(7.5);
    doc.setTextColor(200, 200, 200);
    const footerText = "Este é um documento personalizado baseado em análise integrada de rosto, corpo, essência e contexto.";
    doc.text(doc.splitTextToSize(footerText, contentWidth), margin, pageHeight - 7);

    // Salvar PDF
    doc.save(`protocolo-ia-beauty-${nome}.pdf`);
    console.log(`✓ PDF gerado com sucesso para ${nome}`);
  } catch (erro) {
    console.error("Erro ao gerar PDF:", erro);
    alert("Erro ao gerar PDF. Por favor, tente novamente.\n\nErro: " + erro.message);
  }
}
