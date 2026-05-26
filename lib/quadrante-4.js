/**
 * QUADRANTE 4: SÍNTESE FINAL — Consolidação Integrada
 * Fluxo: Revisar dados → Chamar Claude → Exibir recomendação → Gerar PDF
 */

let q4State = {
  etapa: "intro",
  recomendacao: null,
  gerando: false,
};

function abrirQuadrante4() {
  q4State.etapa = "intro";
  const conteudo = document.getElementById("conteudo-q4");

  // Verificar se Q1, Q2, Q3 estão completos
  if (!estaCompletoQ1() || !estaCompletoQ2() || !estaCompletoQ3()) {
    conteudo.innerHTML = `
      <div style="max-width: 800px; margin: 40px auto; text-align: center;">
        <h2 style="color: #E85D9F; font-size: 1.5rem; margin-bottom: 20px;">⚠️ Quadrante Incompleto</h2>
        <p style="color: #ccc; line-height: 1.8; margin-bottom: 30px;">
          Para gerar sua síntese final, você precisa completar os 3 quadrantes anteriores:
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

  conteudo.innerHTML = `
    <div style="max-width: 900px; margin: 40px auto;">
      <h2 style="color: #E85D9F; font-size: 1.5rem; margin-bottom: 20px; text-align: center;">
        🎯 Sua Síntese Final
      </h2>

      <p style="color: #ccc; font-size: 1rem; line-height: 1.8; margin-bottom: 30px; text-align: center;">
        Você completou a exploração de si mesma através dos 3 quadrantes. Agora vamos consolidar TUDO em uma recomendação integrada de corte de cabelo.
      </p>

      <div style="background: rgba(109, 213, 237, 0.12); border-left: 4px solid #6DD5ED; padding: 28px; border-radius: 12px; margin-bottom: 30px;">
        <h3 style="color: #6DD5ED; margin-bottom: 18px; font-size: 1.15rem;">📊 Seu Perfil Consolidado</h3>

        <div style="background: rgba(0,0,0,0.2); padding: 20px; border-radius: 8px; margin-bottom: 15px;">
          <p style="color: #ccc; margin-bottom: 12px;"><strong>Nome:</strong> ${usuariaData.nome}</p>
          <p style="color: #ccc; margin-bottom: 12px;"><strong>Q1 (Rosto):</strong> Assimetria ${
            state.rosto.assimetria || "explorada"
          } | Essência: ${state.rosto.essencia || "explorada"} | Contexto: ${
            state.rosto.contexto || "explorado"
          }</p>
          <p style="color: #ccc; margin-bottom: 12px;"><strong>Q2 (Gola + Adereços):</strong> Exploração completa de compensação visual</p>
          <p style="color: #ccc;"><strong>Q3 (Corpo):</strong> Biotipo ${
            state.corpo.biotipo
          } | Linhas ${state.corpo.linhasCorpo} | Comprimento ${state.corpo.comprimentoPreferido}</p>
        </div>

        <p style="color: #aaa; line-height: 1.8; font-style: italic;">
          Claude vai analisar tudo isso e gerar uma recomendação integrada que funciona em SINERGIA com seu rosto, seu corpo, sua essência e seu contexto.
        </p>
      </div>

      <button class="quadrante-btn" onclick="gerarSinteseFinal()" style="width: 100%; padding: 15px; font-size: 1rem; ${
        q4State.gerando ? "opacity: 0.5; cursor: not-allowed;" : ""
      }">
        ${q4State.gerando ? "⏳ Gerando sua síntese..." : "✨ Gerar Recomendação Integrada"}
      </button>
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

  const conteudo = document.getElementById("conteudo-q4");
  conteudo.innerHTML = `
    <div style="max-width: 900px; margin: 40px auto; text-align: center;">
      <h2 style="color: #6DD5ED; margin-bottom: 30px;">⏳ Gerando sua síntese...</h2>
      <p style="color: #aaa; margin-bottom: 20px;">Claude está analisando seu perfil integrado e gerando uma recomendação personalizada.</p>
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

  conteudo.innerHTML = `
    <div style="max-width: 900px; margin: 40px auto;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
        <h2 style="color: #E85D9F; font-size: 1.5rem; margin: 0;">✨ Sua Recomendação Integrada</h2>
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
    // Simular download como texto por enquanto
    const conteudo = `IA BEAUTY 2.0 - PROTOCOLO PERSONALIZADO\n\n${q4State.recomendacao}`;
    const blob = new Blob([conteudo], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `protocolo-ia-beauty-${usuariaData.nome}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  } catch (erro) {
    console.error("Erro ao gerar PDF:", erro);
    alert("Erro ao gerar PDF. Tente novamente.");
  }
}
