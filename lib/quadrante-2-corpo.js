/**
 * QUADRANTE 2: CORPO — Biotipo & Linhas do Corpo
 * Formulário com 4 perguntas principais
 */

function abrirQuizQ2() {
  const conteudo = document.getElementById('conteudo-q2');

  conteudo.innerHTML = `
    <form id="quiz-corpo" style="max-width: 500px; margin: 0 auto;">
      <div style="margin-bottom: 30px;">
        <h3 style="color: #E85D9F; margin-bottom: 20px; font-size: 1.1rem;">Pergunta 1: Qual seu Biotipo?</h3>
        <p style="color: #aaa; margin-bottom: 15px; font-size: 0.9rem;">Escolha a opção que mais se aproxima do formato do seu corpo:</p>

        <div class="quiz-option">
          <input type="radio" name="biotipo" value="retangulo" id="opt-retangulo">
          <label for="opt-retangulo" style="color: #ccc; cursor: pointer;">
            <strong>Retângulo</strong> — Ombros e quadril na mesma largura, cintura pouco definida
          </label>
        </div>

        <div class="quiz-option">
          <input type="radio" name="biotipo" value="pera" id="opt-pera">
          <label for="opt-pera" style="color: #ccc; cursor: pointer;">
            <strong>Pêra</strong> — Ombros estreitos, quadril largo, cintura marcada
          </label>
        </div>

        <div class="quiz-option">
          <input type="radio" name="biotipo" value="triangulo_inv" id="opt-triangulo">
          <label for="opt-triangulo" style="color: #ccc; cursor: pointer;">
            <strong>Triângulo Invertido</strong> — Ombros largos, quadril estreito, seios proeminentes
          </label>
        </div>

        <div class="quiz-option">
          <input type="radio" name="biotipo" value="ampulheta" id="opt-ampulheta">
          <label for="opt-ampulheta" style="color: #ccc; cursor: pointer;">
            <strong>Ampulheta</strong> — Ombros e quadril proporcionais, cintura muito marcada, curvas simétricas
          </label>
        </div>

        <div class="quiz-option">
          <input type="radio" name="biotipo" value="oval" id="opt-oval">
          <label for="opt-oval" style="color: #ccc; cursor: pointer;">
            <strong>Oval</strong> — Formas mais arredondadas, distribuição equilibrada no corpo inteiro
          </label>
        </div>
      </div>

      <div style="margin-bottom: 30px; padding-top: 20px; border-top: 1px solid #333;">
        <h3 style="color: #E85D9F; margin-bottom: 20px; font-size: 1.1rem;">Pergunta 2: Linhas do Seu Corpo?</h3>
        <p style="color: #aaa; margin-bottom: 15px; font-size: 0.9rem;">Qual tipo de linhas predomina no seu corpo?</p>

        <div class="quiz-option">
          <input type="radio" name="linhasCorpo" value="retas" id="opt-retas-corpo">
          <label for="opt-retas-corpo" style="color: #ccc; cursor: pointer;">
            <strong>Retas</strong> — Linhas bem definidas, marcadas, estruturadas
          </label>
        </div>

        <div class="quiz-option">
          <input type="radio" name="linhasCorpo" value="curvas" id="opt-curvas-corpo">
          <label for="opt-curvas-corpo" style="color: #ccc; cursor: pointer;">
            <strong>Curvas</strong> — Formas suaves, arredondadas, com movimento
          </label>
        </div>

        <div class="quiz-option">
          <input type="radio" name="linhasCorpo" value="mistura" id="opt-mistura-corpo">
          <label for="opt-mistura-corpo" style="color: #ccc; cursor: pointer;">
            <strong>Mistura</strong> — Combinação de retas e curvas em diferentes regiões
          </label>
        </div>
      </div>

      <div style="margin-bottom: 30px; padding-top: 20px; border-top: 1px solid #333;">
        <h3 style="color: #E85D9F; margin-bottom: 20px; font-size: 1.1rem;">Pergunta 3: Comprimento Preferido?</h3>
        <p style="color: #aaa; margin-bottom: 15px; font-size: 0.9rem;">Qual comprimento de cabelo você prefere ou se sente melhor?</p>

        <div class="quiz-option">
          <input type="radio" name="comprimento" value="curto" id="opt-curto">
          <label for="opt-curto" style="color: #ccc; cursor: pointer;">
            <strong>Curto</strong> — Acima ou no ombro
          </label>
        </div>

        <div class="quiz-option">
          <input type="radio" name="comprimento" value="medio" id="opt-medio">
          <label for="opt-medio" style="color: #ccc; cursor: pointer;">
            <strong>Médio</strong> — Ombro até clavícula
          </label>
        </div>

        <div class="quiz-option">
          <input type="radio" name="comprimento" value="longo" id="opt-longo">
          <label for="opt-longo" style="color: #ccc; cursor: pointer;">
            <strong>Longo</strong> — Cintura ou mais
          </label>
        </div>
      </div>

      <div style="margin-bottom: 30px; padding-top: 20px; border-top: 1px solid #333;">
        <h3 style="color: #E85D9F; margin-bottom: 20px; font-size: 1.1rem;">Pergunta 4: Franja?</h3>
        <p style="color: #aaa; margin-bottom: 15px; font-size: 0.9rem;">Qual sua relação com franja?</p>

        <div class="quiz-option">
          <input type="radio" name="franja" value="sim" id="opt-franja-sim">
          <label for="opt-franja-sim" style="color: #ccc; cursor: pointer;">
            <strong>Sim</strong> — Uso ou gosto de franja
          </label>
        </div>

        <div class="quiz-option">
          <input type="radio" name="franja" value="nao" id="opt-franja-nao">
          <label for="opt-franja-nao" style="color: #ccc; cursor: pointer;">
            <strong>Não</strong> — Não uso, não curto
          </label>
        </div>

        <div class="quiz-option">
          <input type="radio" name="franja" value="gostaria" id="opt-franja-gostaria">
          <label for="opt-franja-gostaria" style="color: #ccc; cursor: pointer;">
            <strong>Gostaria</strong> — Nunca usei mas tenho interesse
          </label>
        </div>
      </div>

      <button type="button" class="quadrante-btn" onclick="finalizarQ2()" style="width: 100%; padding: 15px;">
        ✓ Finalizar Questionário
      </button>
    </form>

    <style>
      .quiz-option {
        margin-bottom: 12px;
        padding: 12px;
        background: rgba(232, 93, 159, 0.05);
        border: 1px solid rgba(232, 93, 159, 0.2);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .quiz-option:hover {
        background: rgba(232, 93, 159, 0.1);
        border-color: rgba(232, 93, 159, 0.4);
      }

      .quiz-option input[type="radio"]:checked + label {
        color: #E85D9F;
        font-weight: 600;
      }

      .quiz-option input[type="radio"] {
        margin-right: 10px;
        cursor: pointer;
      }
    </style>
  `;
}

function finalizarQ2() {
  const form = document.getElementById('quiz-corpo');

  const biotipo = form.querySelector('input[name="biotipo"]:checked')?.value;
  const linhasCorpo = form.querySelector('input[name="linhasCorpo"]:checked')?.value;
  const comprimento = form.querySelector('input[name="comprimento"]:checked')?.value;
  const franja = form.querySelector('input[name="franja"]:checked')?.value;

  if (!biotipo || !linhasCorpo || !comprimento || !franja) {
    alert('⚠️ Responda todas as perguntas para continuar');
    return;
  }

  // Atualizar state
  atualizarCorpo({
    biotipo: biotipo,
    linhasCorpo: linhasCorpo,
    comprimentoPreferido: comprimento,
    franja: franja
  });

  // Exibir confirmação
  const conteudo = document.getElementById('conteudo-q2');
  conteudo.innerHTML = `
    <div style="text-align: center; padding: 40px;">
      <h3 style="color: #4CAF50; margin-bottom: 20px;">✓ Dados Registrados!</h3>
      <p style="color: #aaa; line-height: 1.8; margin-bottom: 30px;">
        <strong>Biotipo:</strong> ${biotipo.toUpperCase()}<br>
        <strong>Linhas do Corpo:</strong> ${linhasCorpo.toUpperCase()}<br>
        <strong>Comprimento Preferido:</strong> ${comprimento.toUpperCase()}<br>
        <strong>Franja:</strong> ${franja.toUpperCase()}
      </p>
      <button class="quadrante-btn" onclick="fecharPainel(2)">← Voltar</button>
    </div>
  `;

  // Habilitar Q3 se ambas Q1 e Q2 estiverem completas
  setTimeout(() => {
    if (podeAbrirQ3()) {
      atualizarStatusBadge(3);
    }
  }, 500);
}
