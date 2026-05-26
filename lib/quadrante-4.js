/**
 * QUADRANTE 4: SÍNTESE FINAL — Consolidação Integrada & PDF
 * Fluxo: Consolidação Visual → Chamar Claude → Exibir Recomendação → PDF Real
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
  if (!estaCompletoQ1() || !estaCompletoQ2() || !estaCompletoQ3()) {
    conteudo.innerHTML = `
      <div style="max-width: 800px; margin: 40px auto; text-align: center;">
        <h2 style="color: #E85D9F; font-size: 1.5rem; margin-bottom: 20px;">⚠️ Quadrante Incompleto</h2>
        <p style="color: #ccc; line-height: 1.8; margin-bottom: 30px;">
          Para gerar sua síntese final, ${nome}, você precisa completar os 3 quadrantes anteriores:
        </p>
        <div style="background: rgba(196, 151, 58, 0.1); border-left: 4px solid #C4973A; padding: 25px; border-radius: 12px; text-align: left;">
          <p style="color: #ddd; margin-bottom: 12px;"><strong>✓ Q1 (Rosto):</strong> <span style="color: ${
            estaCompletoQ1() ? "#4CAF50" : "#888"
          };">${estaCompletoQ1() ? "Completo" : "Incompleto"}</span></p>
          <p style="color: #ddd; margin-bottom: 12px;"><strong>✓ Q2 (Gola + Adereços):</strong> <span style="color: ${
            estaCompletoQ2() ? "#4CAF50" : "#888"
          };">${estaCompletoQ2() ? "Completo" : "Incompleto"}</span></p>
          <p style="color: #ddd;"><strong>✓ Q3 (Corpo):</strong> <span style="color: ${
            estaCompletoQ3() ? "#4CAF50" : "#888"
          };">${estaCompletoQ3() ? "Completo" : "Incompleto"}</span></p>
        </div>
        <button class="quadrante-btn" onclick="fecharPainel(4)" style="margin-top: 30px;">← Voltar</button>
      </div>
    `;
    return;
  }

  // VISUAL CONSOLIDATION
  mostrarConsolidacaoVisual();
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
          Agora Claude vai analisar TUDO isso e gerar uma recomendação integrada de corte de cabelo que funciona em sinergia com seu rosto, corpo, essência e contexto.
        </p>
        <button class="quadrante-btn" onclick="gerarSinteseFinal()" style="width: 100%; padding: 15px; font-size: 1rem; ${
          q4State.gerando ? "opacity: 0.5; cursor: not-allowed;" : ""
        }">
          ${q4State.gerando ? "⏳ Gerando sua síntese..." : "✨ Gerar Recomendação Integrada"}
        </button>
      </div>
    </div>
  `;
}

function estaCompletoQ3() {
  return (
    state.corpo.biotipo !== null &&
    state.corpo.linhasCorpo !== null &&
    state.corpo.comprimentoPreferido !== null
  );
}

async function gerarSinteseFinal() {
  q4State.gerando = true;
  q4State.etapa = "gerando";

  const conteudo = document.getElementById("conteudo-q4");
  const nome = usuariaData.nome || 'você';

  conteudo.innerHTML = `
    <div style="max-width: 900px; margin: 40px auto; text-align: center;">
      <h2 style="color: #6DD5ED; margin-bottom: 30px;">⏳ Gerando sua síntese, ${nome}...</h2>
      <p style="color: #aaa; margin-bottom: 20px;">Claude está analisando seu perfil integrado e gerando uma recomendação personalizada especialmente para você.</p>
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
        <h2 style="color: #E85D9F; margin-bottom: 20px;">❌ Erro ao Gerar Síntese</h2>
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
        <h2 style="color: #E85D9F; font-size: 1.5rem; margin: 0;">✨ Sua Recomendação Integrada, ${nome}</h2>
        <button class="quadrante-btn" onclick="gerarPDF()" style="width: auto; padding: 10px 20px;">📄 Baixar PDF</button>
      </div>

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

      <div style="text-align: center; margin-top: 30px;">
        <button class="quadrante-btn" onclick="fecharPainel(4)" style="width: 100%; padding: 12px;">← Voltar ao Menu</button>
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
    let yPosition = 20;
    const margin = 15;
    const contentWidth = pageWidth - (margin * 2);

    // Helper function to add text with wrapping
    const addWrappedText = (text, x, y, maxWidth, fontSize, color = [50, 50, 50]) => {
      doc.setFontSize(fontSize);
      doc.setTextColor(...color);
      const splitText = doc.splitTextToSize(text, maxWidth);
      doc.text(splitText, x, y);
      return y + (splitText.length * (fontSize / 3));
    };

    // ===== HEADER =====
    doc.setFontSize(24);
    doc.setTextColor(232, 93, 159);
    doc.text("IA BEAUTY 2.0", margin, yPosition);
    yPosition += 12;

    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text("Protocolo Personalizado de Análise Facial & Corte de Cabelo", margin, yPosition);
    yPosition += 10;

    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')} | Análise de: ${nome}`, margin, yPosition);
    yPosition += 15;

    // ===== DIVIDER =====
    doc.setDrawColor(232, 93, 159);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // ===== SEÇÃO 1: PERFIL FACIAL =====
    doc.setFontSize(14);
    doc.setTextColor(232, 93, 159);
    doc.text("1. ANÁLISE FACIAL (Q1)", margin, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);

    const rostoInfoText = `
Assimetria Detectada: ${state.rosto.assimetria ? state.rosto.assimetria.replace(/_/g, ' ').toUpperCase() : 'Equilibrada'}

Sua Essência Visual (SER): ${state.rosto.essencia ? state.rosto.essencia.charAt(0).toUpperCase() + state.rosto.essencia.slice(1) : 'Explorada'}

Seu Contexto Emocional (ESTAR): ${state.rosto.contexto ? state.rosto.contexto.charAt(0).toUpperCase() + state.rosto.contexto.slice(1) : 'Explorado'}

As meias-faces foram analisadas para entender como sua assimetria natural pode ser usada estrategicamente no posicionamento do cabelo.
    `.trim();

    yPosition = addWrappedText(rostoInfoText, margin, yPosition, contentWidth, 10);
    yPosition += 10;

    // ===== SEÇÃO 2: GOLA + ADEREÇOS =====
    doc.setFontSize(14);
    doc.setTextColor(109, 213, 237);
    doc.text("2. EXPLORAÇÃO - GOLA + ADEREÇOS (Q2)", margin, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);

    const q2Text = `Você explorou como gola e adereços trabalham como ferramentas visuais:

• Três tipos de gola (U/curva, V/diagonal, Quadrada/estrutura)
• Volume de informação (formato + densidade) e suas consequências visuais
• Sistema de compensação entre franja e gola
• Impacto de brincos, óculos e colares no seu rosto

Essas escolhas são estratégicas para equilibrar sua assimetria facial e linhas do corpo.`;

    yPosition = addWrappedText(q2Text, margin, yPosition, contentWidth, 10);
    yPosition += 10;

    // ===== SEÇÃO 3: CORPO =====
    doc.setFontSize(14);
    doc.setTextColor(196, 151, 58);
    doc.text("3. ANÁLISE DO CORPO (Q3)", margin, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);

    const corpoText = `
Biotipo: ${(state.corpo.biotipo || 'não definido').charAt(0).toUpperCase() + (state.corpo.biotipo || 'não definido').slice(1)}

Linhas do Corpo: ${(state.corpo.linhasCorpo || 'não definidas').charAt(0).toUpperCase() + (state.corpo.linhasCorpo || 'não definidas').slice(1)}

Comprimento Preferido: ${(state.corpo.comprimentoPreferido || 'não definido').charAt(0).toUpperCase() + (state.corpo.comprimentoPreferido || 'não definido').slice(1)}

O cabelo funciona em sinergia com a forma do seu corpo. A posição e o comprimento importam para equilibrar proporções.
    `.trim();

    yPosition = addWrappedText(corpoText, margin, yPosition, contentWidth, 10);
    yPosition += 15;

    // ===== SEÇÃO 4: RECOMENDAÇÃO =====
    doc.setFontSize(14);
    doc.setTextColor(232, 93, 159);
    doc.text("4. RECOMENDAÇÃO INTEGRADA", margin, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);

    // Limpar markdown do texto da recomendação para PDF
    const recTextoLimpo = q4State.recomendacao
      .replace(/^#+\s/gm, "") // Remove markdown headers
      .replace(/^-\s/gm, "• "); // Convert bullet points

    yPosition = addWrappedText(recTextoLimpo, margin, yPosition, contentWidth, 10);

    // Check if we need a new page
    if (yPosition > pageHeight - 20) {
      doc.addPage();
      yPosition = 20;
    }

    // ===== FOOTER =====
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("IA BEAUTY 2.0 — Inteligência Visual da Sua Imagem", margin, pageHeight - 10);
    doc.text(`Protocolo gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`, margin, pageHeight - 5);

    // Save PDF
    doc.save(`protocolo-ia-beauty-${nome}.pdf`);
  } catch (erro) {
    console.error("Erro ao gerar PDF:", erro);
    alert("Erro ao gerar PDF. Por favor, tente novamente. " + erro.message);
  }
}
