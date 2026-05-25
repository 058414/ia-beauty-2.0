/**
 * EDUCAÇÃO Q1 — Conteúdo Educativo Personalizado
 * Fluxo: Meias-faces + Ancestralidade → Análise → Pergunta Formato → Pergunta Desconforto → Educação
 */

/**
 * TELA 1: Meias-faces + Explicação de Ancestralidade
 * (SEM o texto de comparação, só visual + educação)
 */
function gerarTelaMeiasFacesComAncestralidade(meiaEsquerda, fotoOriginal, meiaDireita) {
  return `
    <div style="max-width: 900px; margin: 0 auto;">
      <!-- MEIAS-FACES: 3 COLUNAS -->
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 40px;">
        <div style="text-align: center;">
          <img src="${meiaEsquerda}" style="width: 100%; border-radius: 12px; border: 2px solid rgba(196, 151, 58, 0.4); margin-bottom: 15px;">
          <div style="padding: 15px; background: rgba(196, 151, 58, 0.1); border-radius: 8px; border-left: 3px solid #C4973A;">
            <p style="color: #C4973A; font-weight: 600; margin-bottom: 5px;">Lado Esquerdo</p>
            <p style="color: #888; font-size: 0.85rem;">Linhagem Paterna</p>
          </div>
        </div>

        <div style="text-align: center;">
          <img src="${fotoOriginal}" style="width: 100%; border-radius: 12px; border: 2px solid rgba(232, 93, 159, 0.4); margin-bottom: 15px;">
          <div style="padding: 15px; background: rgba(232, 93, 159, 0.1); border-radius: 8px; border-left: 3px solid #E85D9F;">
            <p style="color: #E85D9F; font-weight: 600; margin-bottom: 5px;">Você</p>
            <p style="color: #888; font-size: 0.85rem;">Rosto Original</p>
          </div>
        </div>

        <div style="text-align: center;">
          <img src="${meiaDireita}" style="width: 100%; border-radius: 12px; border: 2px solid rgba(109, 213, 237, 0.4); margin-bottom: 15px;">
          <div style="padding: 15px; background: rgba(109, 213, 237, 0.1); border-radius: 8px; border-left: 3px solid #6DD5ED;">
            <p style="color: #6DD5ED; font-weight: 600; margin-bottom: 5px;">Lado Direito</p>
            <p style="color: #888; font-size: 0.85rem;">Linhagem Materna</p>
          </div>
        </div>
      </div>

      <hr style="border: none; border-top: 1px solid #333; margin: 40px 0;">

      <!-- ANCESTRALIDADE -->
      <div style="max-width: 700px; margin: 0 auto; padding: 30px 0;">
        <h3 style="color: #C4973A; font-size: 1.3rem; margin-bottom: 20px; text-align: center;">
          🌳 Ancestralidade: A História do Seu Rosto
        </h3>

        <p style="color: #ddd; line-height: 1.8; margin-bottom: 20px;">
          Seu rosto é um mapa de <strong>suas gerações passadas</strong>.
        </p>

        <div style="background: rgba(196, 151, 58, 0.1); border-left: 3px solid #C4973A; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h4 style="color: #C4973A; margin-bottom: 10px;">Lado Esquerdo — Linhagem Paterna</h4>
          <p style="color: #aaa; line-height: 1.8;">
            Representa as características que você herdou da família do seu pai, avó paterna, bisavós... Consegue reconhecer alguém?
          </p>
        </div>

        <div style="background: rgba(109, 213, 237, 0.1); border-left: 3px solid #6DD5ED; padding: 15px; border-radius: 8px;">
          <h4 style="color: #6DD5ED; margin-bottom: 10px;">Lado Direito — Linhagem Materna</h4>
          <p style="color: #aaa; line-height: 1.8;">
            Representa as características que você herdou da família da sua mãe, avó materna, bisavós... Você se parece com alguém desse lado?
          </p>
        </div>

        <p style="color: #888; font-size: 0.9rem; margin-top: 20px; text-align: center;">
          Essa interpretação é <strong>só sua</strong>. Você conhece sua família.
        </p>
      </div>

      <div style="text-align: center; margin-top: 40px;">
        <button class="quadrante-btn" onclick="irParaAnaliseAssimetria()" style="font-size: 1rem; padding: 15px 30px;">
          Continuar →
        </button>
      </div>
    </div>
  `;
}

/**
 * TELA 2: Análise de Assimetria (após usuária confirmar que viu as meias-faces)
 */
function gerarTelaAnaliseAssimetria(assimetria) {
  const ladoAltoPort = assimetria.lado_alto === 'esquerdo' ? 'esquerdo' : 'direito';
  const ladoBaixoPort = assimetria.lado_baixo === 'esquerdo' ? 'esquerdo' : 'direito';

  return `
    <div style="max-width: 700px; margin: 0 auto;">
      <div style="text-align: center; padding: 30px 0;">
        <h3 style="color: #E85D9F; font-size: 1.3rem; margin-bottom: 20px;">
          📊 Sua Análise Facial
        </h3>
        <p style="color: #ddd; font-size: 1.1rem; line-height: 1.8;">
          Percebemos que seu lado <strong>${ladoAltoPort}</strong> é mais alto e seu lado <strong>${ladoBaixoPort}</strong> é mais baixo.
        </p>
      </div>

      <div style="text-align: center; margin-top: 40px;">
        <button class="quadrante-btn" onclick="irParaEducacaoFinal()" style="font-size: 1rem; padding: 15px 30px;">
          Continuar →
        </button>
      </div>
    </div>
  `;
}

/*
 * REMOVIDO: gerarTelaPerguntaFormato() e gerarTelaPerguntaDesconforto()
 * Essas perguntas foram movidas para ANTES da câmera no novo fluxo
 * Ver: abrirQuadrante1NovoFluxo() em index.html
 */

/**
 * TELA 5: Educação Completa (Compensação + Gola + Adereços)
 * Essa função será expandida com as informações que o usuário vai passar depois
 */
function gerarTelaEducacaoCompleta(assimetria, formato, desconforto) {
  const ladoAltoPort = assimetria.lado_alto === 'esquerdo' ? 'esquerdo' : 'direito';
  const ladoBaixoPort = assimetria.lado_baixo === 'esquerdo' ? 'esquerdo' : 'direito';

  return `
    <div style="max-width: 700px; margin: 0 auto;">
      <h3 style="color: #E85D9F; font-size: 1.3rem; margin-bottom: 30px; text-align: center;">
        📖 Seu Protocolo de Compensação Visual
      </h3>

      <!-- RESUMO DO PERFIL -->
      <div style="background: rgba(232, 93, 159, 0.1); border-left: 3px solid #E85D9F; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
        <h4 style="color: #E85D9F; margin-bottom: 15px;">Seu Perfil</h4>
        <ul style="color: #aaa; line-height: 2; margin-left: 20px;">
          <li><strong>Assimetria:</strong> Lado ${ladoAltoPort} mais alto, lado ${ladoBaixoPort} mais baixo</li>
          <li><strong>Formato:</strong> ${formato === 'redondo' ? 'Redondo/Oval (curvas)' : formato === 'retangular' ? 'Retangular/Quadrado (retas)' : 'Triangular (diagonais)'}</li>
          <li><strong>Conforto:</strong> ${desconforto === 'sim' ? 'Causa desconforto' : desconforto === 'nao' ? 'Agrada como é' : 'Indiferente'}</li>
        </ul>
      </div>

      <!-- COMPENSAÇÃO VISUAL -->
      <div style="padding: 20px 0; border-bottom: 1px solid #333; margin-bottom: 30px;">
        <h4 style="color: #C4973A; margin-bottom: 15px;">⚖️ Compensação Visual</h4>
        <p style="color: #aaa; line-height: 1.8;">
          Baseado em sua assimetria, você pode jogar cabelo para cima do lado ${ladoAltoPort} para equilibrar, ou expor o lado ${ladoAltoPort} para reforçar a verticalidade. A escolha é sua conforme seu objetivo do dia.
        </p>
      </div>

      <!-- GOLA + ADEREÇOS — BRIDGE PARA Q2 -->
      <div style="background: rgba(109, 213, 237, 0.1); border: 1px solid rgba(109, 213, 237, 0.3); padding: 25px; border-radius: 12px; margin-bottom: 30px;">
        <h4 style="color: #6DD5ED; margin-bottom: 15px;">👔 Gola + Adereços — Próxima Exploração</h4>
        <p style="color: #ccc; line-height: 1.8; margin-bottom: 15px;">
          Você acaba de entender sua assimetria facial e compensação visual. Agora vem a segunda camada: como <strong>gola, adereços e acessórios</strong> funcionam com seu rosto específico.
        </p>
        <p style="color: #aaa; line-height: 1.8;">
          Existem diferentes tipos de gola (em U, em V, quadrada) e adereços (brincos, óculos, colares) que dialogam visualmente com seu rosto. No próximo quadrante, você vai explorar em profundidade como cada um desses elementos transforma sua imagem — e aprender a fazer escolhas conscientes baseado em efeito visual, não em "regra".
        </p>
      </div>

      <div style="text-align: center; margin-top: 40px;">
        <button class="quadrante-btn" onclick="finalizarQ1()" style="font-size: 1rem; padding: 15px 30px;">
          ✓ Entendi — Próximo Quadrante
        </button>
      </div>
    </div>
  `;
}
