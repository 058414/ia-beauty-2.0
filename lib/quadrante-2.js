/**
 * QUADRANTE 2: GOLA + ADEREÇOS — Educação sobre Efeitos Visuais
 * Fluxo: Explorar tipos de gola → Ver efeitos → Explorar adereços → Entender compensações
 */

let q2State = {
  etapa: 'intro',
  golaEscolhida: null,
  aderecoEscolhido: null,
  notasUsuaria: ''
};

function abrirQuadrante2() {
  q2State.etapa = 'intro';
  const conteudo = document.getElementById('conteudo-q2');
  const nome = usuariaData.nome || 'você';
  conteudo.innerHTML = `
    <div style="max-width: 800px; margin: 40px auto;">
      <h2 style="color: #6DD5ED; font-size: 1.5rem; margin-bottom: 20px; text-align: center;">
        👚 ${nome}, Agora Vamos Explorar Gola + Adereços
      </h2>

      <p style="color: #ccc; font-size: 1.1rem; line-height: 1.8; margin-bottom: 30px; text-align: center;">
        A gola e os adereços não são apenas acessórios — são ferramentas visuais poderosas que trabalham em conjunto com seu rosto e corpo.
      </p>

      <div style="background: rgba(109, 213, 237, 0.1); border-left: 4px solid #6DD5ED; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
        <h3 style="color: #6DD5ED; margin-bottom: 15px;">💡 Por Que Gola Importa?</h3>
        <p style="color: #ddd; line-height: 1.8;">
          Seu rosto não "termina" onde o cabelo acaba. A gola (decote, gargantilha, camiseta) continua definindo linhas e formas.
          Uma gola bem escolhida pode:
        </p>
        <ul style="color: #ccc; line-height: 2; margin-left: 20px; margin-top: 12px;">
          <li>✨ Alongar um rosto que parece largo</li>
          <li>✨ Alargar um rosto que parece fino</li>
          <li>✨ Equilibrar proporções</li>
          <li>✨ Reforçar sua essência visual</li>
        </ul>
      </div>

      <div style="text-align: center; margin-top: 40px;">
        <button class="quadrante-btn" onclick="explorarGolas()" style="font-size: 1rem; padding: 15px 30px; margin-bottom: 15px; width: 100%; max-width: 400px;">
          Explorar Tipos de Gola →
        </button>
        <button class="quadrante-btn" onclick="explorarFranja()" style="font-size: 1rem; padding: 15px 30px; margin-bottom: 15px; width: 100%; max-width: 400px;">
          Explorar Franja →
        </button>
        <button class="quadrante-btn" onclick="explorarAderecos()" style="font-size: 1rem; padding: 15px 30px; width: 100%; max-width: 400px;">
          Explorar Adereços →
        </button>
      </div>
    </div>
  `;
}

function explorarGolas() {
  q2State.etapa = 'golas';
  const conteudo = document.getElementById('conteudo-q2');
  const nome = usuariaData.nome || 'você';
  conteudo.innerHTML = `
    <div style="max-width: 900px; margin: 40px auto;">
      <h2 style="color: #6DD5ED; font-size: 1.4rem; margin-bottom: 20px; text-align: center;">
        👚 ${nome}, Golas — Como Você Continua a Conversa do Rosto
      </h2>

      <p style="color: #ccc; font-size: 1rem; line-height: 1.8; margin-bottom: 30px; text-align: center;">
        A gola é a primeira coisa que uma pessoa vê depois do seu rosto. Ela define como o rosto "termina" visualmente e muda completamente o diálogo visual do seu corpo.
      </p>

      <div style="background: rgba(109, 213, 237, 0.12); border-left: 4px solid #6DD5ED; padding: 28px; border-radius: 12px; margin-bottom: 30px;">
        <h3 style="color: #6DD5ED; margin-bottom: 18px; font-size: 1.15rem;">🧠 O Conceito: Gola como Continuação</h3>
        <p style="color: #ddd; line-height: 1.9; margin-bottom: 15px;">
          Seu rosto tem linhas (curvas, retas, diagonais). A gola que você escolhe pode:
        </p>
        <ul style="color: #ccc; line-height: 2; margin-left: 20px; margin-bottom: 15px;">
          <li><strong>Reforçar</strong> essas linhas — amplificar o padrão que já existe</li>
          <li><strong>Compensar</strong> essas linhas — criar contraste</li>
          <li><strong>Complexificar</strong> — adicionar densidade de informação</li>
          <li><strong>Simplificar</strong> — criar clareza</li>
        </ul>
        <p style="color: #aaa; line-height: 1.9; font-style: italic;">
          A questão não é "qual gola é certa para meu rosto?". A questão é: "Que tipo de conversa visual eu quero criar com meu rosto?"
        </p>
      </div>

      <!-- GOLA EM U -->
      <div style="background: rgba(109, 213, 237, 0.08); border: 1px solid rgba(109, 213, 237, 0.3); padding: 25px; border-radius: 12px; margin-bottom: 25px;">
        <h3 style="color: #6DD5ED; margin-bottom: 15px; font-size: 1.2rem;">🔵 Gola em U (Curvas Suaves)</h3>
        <p style="color: #ddd; line-height: 1.8; margin-bottom: 15px;">
          <strong>O que você vê:</strong> Decote arredondado, gargantilha, linhas circulares fluidas.
        </p>

        <p style="color: #ccc; line-height: 1.8; margin-bottom: 15px;">
          <strong>Volume de informação:</strong> Gola em U REFORÇA energia curva. Se seu rosto já tem linhas curvas, você está dizendo "vou amplificar isso". Não é equilíbrio — é aliança.
        </p>

        <p style="color: #ddd; line-height: 1.8; margin-bottom: 15px;">
          A gola em U deixa muito do pescoço/decolte EXPOSTO — isso cria uma sensação de abertura, fluidez. A conversa continua curva do rosto até a garganta.
        </p>

        <p style="color: #aaa; line-height: 1.8; font-style: italic;">
          <strong>Reflexão:</strong> Se seu rosto tem curvas naturais, uma gola em U vai fazer você parecer mais fluida? Você sente conforto ou sente que "falta algo"? Às vezes a gola curva soa bem. Às vezes precisa de uma reta para "respirar".
        </p>
      </div>

      <!-- GOLA EM V -->
      <div style="background: rgba(232, 93, 159, 0.08); border: 1px solid rgba(232, 93, 159, 0.3); padding: 25px; border-radius: 12px; margin-bottom: 25px;">
        <h3 style="color: #E85D9F; margin-bottom: 15px; font-size: 1.2rem;">△ Gola em V (Dinâmica, Diagonal)</h3>
        <p style="color: #ddd; line-height: 1.8; margin-bottom: 15px;">
          <strong>O que você vê:</strong> Decote profundo, linhas diagonais apontando para baixo, movimento visual constante.
        </p>

        <p style="color: #ccc; line-height: 1.8; margin-bottom: 15px;">
          <strong>Volume de informação:</strong> Gola em V cria MOVIMENTO e ALONGAMENTO. Ela "puxa" o olhar para baixo, alongando visualmente seu rosto e corpo. É a gola que trabalha CONTRA rostos largos — ela traz altura.
        </p>

        <p style="color: #ddd; line-height: 1.8; margin-bottom: 15px;">
          A profundidade do V importa: um V raso continua a conversa suavemente. Um V profundo é AGRESSIVAMENTE alongador — muda a proporção visual significativamente.
        </p>

        <p style="color: #aaa; line-height: 1.8; font-style: italic;">
          <strong>Reflexão:</strong> Quando você coloca um V profundo, você vira sua silhueta em uma seta apontando para baixo. Você quer "descer" visualmente ou quer "subir" (que seria o oposto — gola redonda que leva olhar para cima)?
        </p>
      </div>

      <!-- GOLA QUADRADA/RETA -->
      <div style="background: rgba(196, 151, 58, 0.08); border: 1px solid rgba(196, 151, 58, 0.3); padding: 25px; border-radius: 12px; margin-bottom: 30px;">
        <h3 style="color: #C4973A; margin-bottom: 15px; font-size: 1.2rem;">⬜ Gola Quadrada/Reta (Estrutura Clara)</h3>
        <p style="color: #ddd; line-height: 1.8; margin-bottom: 15px;">
          <strong>O que você vê:</strong> Decote quadrado, linhas horizontais e verticais bem definidas, ombro a ombro.
        </p>

        <p style="color: #ccc; line-height: 1.8; margin-bottom: 15px;">
          <strong>Volume de informação:</strong> Gola quadrada ESTRUTURA. Se seu rosto tem muitas curvas (está "derretendo" visualmente), uma gola quadrada cria um "moldura" — força uma organização.
        </p>

        <p style="color: #ddd; line-height: 1.8; margin-bottom: 15px;">
          A densidade dessa gola importa: uma gola quadrada FINA (leve, em tecido fino) é elegante e equilibradora. Uma gola quadrada DENSA (rígida, estruturada) é IMPOSITIVA — ela diz "olhem para minha definição".
        </p>

        <p style="color: #aaa; line-height: 1.8; font-style: italic;">
          <strong>Reflexão:</strong> Se você tem rosto redondo, uma gola quadrada vai parecer uma compensação elegante? Ou vai parecer "forçada"? Às vezes o contraste ajuda. Às vezes cria conflito visual que você sente mas não nomeia.
        </p>
      </div>

      <div style="text-align: center; margin-top: 40px;">
        <button class="quadrante-btn" onclick="explorarFranja()" style="font-size: 1rem; padding: 15px 30px; margin-bottom: 15px; width: 100%; max-width: 400px;">
          Próximo: Explorar Franja →
        </button>
      </div>
    </div>
  `;
}

function explorarAderecos() {
  q2State.etapa = 'aderecos';
  const conteudo = document.getElementById('conteudo-q2');
  const nome = usuariaData.nome || 'você';
  conteudo.innerHTML = `
    <div style="max-width: 900px; margin: 0 auto;">
      <h2 style="color: #6DD5ED; font-size: 1.4rem; margin-bottom: 30px; text-align: center;">
        ✨ ${nome}, Adereços — Brincos, Óculos, Colares e Mais
      </h2>

      <!-- CONCEITO: VOLUME DE INFORMAÇÃO -->
      <div style="background: rgba(109, 213, 237, 0.12); border-left: 4px solid #6DD5ED; padding: 28px; border-radius: 12px; margin-bottom: 30px;">
        <h3 style="color: #6DD5ED; margin-bottom: 18px; font-size: 1.15rem;">🧠 O Conceito Fundamental: Volume de Informação</h3>
        <p style="color: #ddd; line-height: 1.9; margin-bottom: 15px;">
          Adereços não são apenas sobre <strong>formato</strong> (circular, reto, angular). São também sobre <strong>densidade</strong> (fino, médio, robusto). Essas duas dimensões — formato + densidade — criam o que chamamos de <strong>"volume de informação"</strong>.
        </p>
        <p style="color: #ddd; line-height: 1.9; margin-bottom: 15px;">
          <strong>Por que isso importa?</strong> Sua expressão facial não é apenas o formato das suas linhas. É também a <strong>robustez</strong> delas. Uma pessoa com rosto redondo (linhas curvas) e traços FINOS comunica delicadeza. Uma pessoa com rosto redondo (linhas curvas) e traços DENSOS comunica força emocional. Não é fragilidade vs robustez — é densidades diferentes.
        </p>
        <p style="color: #ccc; line-height: 1.9; margin-bottom: 15px;">
          <strong>O mesmo vale para adereços:</strong> Um óculos não é só "reto" ou "curvo". Um óculos reto FINO cria uma coisa. Um óculos reto GROSSO cria outra completamente diferente. Se seu rosto tem linhas delicadas e curvas, um óculos reto FINO pode equilibrar elegantemente. Um óculos reto GROSSO vai criar conflito — a densidade dele vai dominar e mudar sua expressão de equilíbrio para força.
        </p>
        <p style="color: #aaa; font-style: italic; line-height: 1.9;">
          A verdadeira liberdade de escolha vem quando você entende que <strong>não existem "regras",</strong> existem <strong>consequências visuais</strong>. Você escolhe sabendo o que vai acontecer.
        </p>
      </div>

      <!-- BRINCOS -->
      <div style="background: rgba(109, 213, 237, 0.08); border: 1px solid rgba(109, 213, 237, 0.3); padding: 25px; border-radius: 12px; margin-bottom: 25px;">
        <h3 style="color: #6DD5ED; margin-bottom: 12px; font-size: 1.2rem;">💎 Brincos — Formato + Densidade</h3>
        <p style="color: #ddd; line-height: 1.8; margin-bottom: 15px;">
          <strong>Brincos Arredondados FINOS (botões delicados, argolas suaves):</strong><br>
          <span style="color: #ccc;">Reforçam linhas curvas do rosto mantendo delicadeza. Amplificam energia curva sem conflito. Funcionam bem com rostos que têm curvas e traços finos.</span>
        </p>
        <p style="color: #ddd; line-height: 1.8; margin-bottom: 15px;">
          <strong>Brincos Arredondados DENSOS (argolas grossas, bolinhas grandes):</strong><br>
          <span style="color: #ccc;">Reforçam força emocional. Se seu rosto é redondo com linhas robustas, amplificam poder. Se seu rosto é redondo com linhas delicadas, podem criar conflito de densidades.</span>
        </p>
        <p style="color: #ddd; line-height: 1.8; margin-bottom: 15px;">
          <strong>Brincos Alongados FINOS (varetas finas, cascatas leves):</strong><br>
          <span style="color: #ccc;">Alongam sem dominar. Criam compensação vertical com elegância. Funcionam bem quando você quer equilíbrio sem imposição visual.</span>
        </p>
        <p style="color: #ddd; line-height: 1.8; margin-bottom: 15px;">
          <strong>Brincos Alongados DENSOS (cascatas pesadas, geométricos robustos):</strong><br>
          <span style="color: #ccc;">Alongam E transmitem força. Criam mudança de polaridade visual. Cuidado: se suas linhas naturais são delicadas, a densidade pode dominar a expressão.</span>
        </p>
        <p style="color: #ddd; line-height: 1.8; margin-bottom: 15px;">
          <strong>Brincos Estruturados (quadrados, ângulos):</strong><br>
          <span style="color: #ccc;">Criam contraste com rosto curvo. A DENSIDADE desses brincos importa: um óculos reto fino pode equilibrar delicadamente; um reto grosso pode impor força.</span>
        </p>
        <p style="color: #aaa; line-height: 1.8; font-style: italic;">
          <strong>Liberação consciente:</strong> Escolha brincos sabendo que formato + densidade criam conversas diferentes com seu rosto. Nenhuma é "errada" — todas têm consequências visuais que você pode decidir sustentar.
        </p>
      </div>

      <!-- ÓCULOS -->
      <div style="background: rgba(232, 93, 159, 0.08); border: 1px solid rgba(232, 93, 159, 0.3); padding: 25px; border-radius: 12px; margin-bottom: 25px;">
        <h3 style="color: #E85D9F; margin-bottom: 12px; font-size: 1.2rem;">👓 Óculos — A Moldura Mais Impactante (Formato + Densidade)</h3>
        <p style="color: #ddd; line-height: 1.8; margin-bottom: 15px;">
          <strong>Óculos Redondos/Ovais FINOS:</strong><br>
          <span style="color: #ccc;">Suavizam rosto quadrado com elegância. Reforçam delicadeza sem domínio. Se seu rosto é redondo com linhas delicadas, amplificam a energia curva naturalmente.</span>
        </p>
        <p style="color: #ddd; line-height: 1.8; margin-bottom: 15px;">
          <strong>Óculos Redondos/Ovais DENSOS (armação grossa):</strong><br>
          <span style="color: #ccc;">Mudam polaridade. Podem transformar suavidade em force. Cuidado: se seu rosto tem traços delicados, a densidade do óculos pode dominar e criar conflito.</span>
        </p>
        <p style="color: #ddd; line-height: 1.8; margin-bottom: 15px;">
          <strong>Óculos Quadrados/Retangulares FINOS:</strong><br>
          <span style="color: #ccc;">Equilibram rosto curvo com elegância. Adicionam estrutura sem imposição. Se você tem rosto redondo com linhas delicadas, isso cria contraste harmônico.</span>
        </p>
        <p style="color: #ddd; line-height: 1.8; margin-bottom: 15px;">
          <strong>Óculos Quadrados/Retangulares DENSOS (armação grossa):</strong><br>
          <span style="color: #ccc;">Transmitem força e autoridade. Se seu rosto é curvo e delicado, a densidade desse óculos vai criar mudança significativa de expressão — não é equilíbrio, é transformação. Use conscientemente.</span>
        </p>
        <p style="color: #ddd; line-height: 1.8; margin-bottom: 15px;">
          <strong>Óculos Cat-Eye (canto levantado):</strong><br>
          <span style="color: #ccc;">Criam diagonais dinâmicas. FINO = movimento delicado. DENSO = movimento impactante. A densidade muda completamente a mensagem visual.</span>
        </p>
        <p style="color: #aaa; line-height: 1.8; font-style: italic;">
          <strong>Conscientização:</strong> O óculos é a moldura mais visível. Formato + densidade dele vai influenciar fortemente como as pessoas leem sua expressão. Escolha sabendo o impacto que está gerando.
        </p>
      </div>

      <!-- COLARES E CORRENTES -->
      <div style="background: rgba(196, 151, 58, 0.08); border: 1px solid rgba(196, 151, 58, 0.3); padding: 25px; border-radius: 12px; margin-bottom: 25px;">
        <h3 style="color: #C4973A; margin-bottom: 12px; font-size: 1.2rem;">⛓️ Colares e Correntes — Linhas + Peso Visual</h3>
        <p style="color: #ddd; line-height: 1.8; margin-bottom: 15px;">
          <strong>Colares Curtos FINOS (gargantilha delicada):</strong><br>
          <span style="color: #ccc;">Destacam o rosto mantendo leveza. Criam proximidade visual sem pesar. Funcionam bem com rostos que têm traços finos.</span>
        </p>
        <p style="color: #ddd; line-height: 1.8; margin-bottom: 15px;">
          <strong>Colares Curtos DENSOS (gargantilha robusta, ouro maciço):</strong><br>
          <span style="color: #ccc;">Destacam o rosto E transmitem força. A densidade cria peso visual que pode dominar traços delicados. Use quando quer projetar autoridade.</span>
        </p>
        <p style="color: #ddd; line-height: 1.8; margin-bottom: 15px;">
          <strong>Colares Longos FINOS (correntes finas, 60cm+):</strong><br>
          <span style="color: #ccc;">Alongam visualmente com elegância. Se seu rosto é largo, criam compensação vertical sem imposição. Mantêm delicadeza.</span>
        </p>
        <p style="color: #ddd; line-height: 1.8; margin-bottom: 15px;">
          <strong>Colares Longos DENSOS (correntes pesadas, ouro espesso):</strong><br>
          <span style="color: #ccc;">Alongam E impõem presença. A densidade cria "peso" visual que pode equilibrar rosto largo, mas cuidado: em rosto delicado, pode ser conflitante.</span>
        </p>
        <p style="color: #ddd; line-height: 1.8; margin-bottom: 15px;">
          <strong>Colares com Pendentes SIMPLES:</strong><br>
          <span style="color: #ccc;">Adicionam interesse visual mantendo equilíbrio. O pendente continua a linha do seu decote — cria unidade se a densidade for proporcional ao seu rosto.</span>
        </p>
        <p style="color: #ddd; line-height: 1.8; margin-bottom: 15px;">
          <strong>Colares com Pendentes COMPLEXOS (estruturados, múltiplos):</strong><br>
          <span style="color: #ccc;">Adicionam MUITA informação visual. Funcionam melhor com rostos que têm linhas robustas ou quando você quer criar presença amplificada.</span>
        </p>
        <p style="color: #aaa; line-height: 1.8; font-style: italic;">
          <strong>Conscientização:</strong> Colares funcionam em duas dimensões — alongam/encurtam (compensação) E adicionam peso visual (densidade). Combine ambas sabendo o efeito que vai criar.
        </p>
      </div>

      <div style="background: rgba(109, 213, 237, 0.1); border: 1px dashed rgba(109, 213, 237, 0.4); padding: 20px; border-radius: 12px; margin-bottom: 30px; margin-top: 30px;">
        <h4 style="color: #6DD5ED; margin-bottom: 12px;">🎯 Princípio Integrador — Volume de Informação</h4>
        <p style="color: #ccc; line-height: 1.8; margin-bottom: 12px;">
          Gola + Adereços + Seu Rosto = Uma conversa visual onde cada elemento tem duas "vozes": <strong>formato</strong> (reto, curvo, angular) E <strong>densidade</strong> (fino, médio, robusto).
        </p>
        <p style="color: #ccc; line-height: 1.8; margin-bottom: 12px;">
          <strong>Harmonia visual acontece quando:</strong> O formato E a densidade do que você escolhe dialogam com o formato E densidade do seu rosto. Um óculos reto fino equilibra rosto curvo delicado. Um óculos reto grosso cria conflito com rosto curvo delicado.
        </p>
        <p style="color: #ccc; line-height: 1.8;">
          <strong>A verdadeira liberdade:</strong> Você não precisa seguir "regras". Precisa <strong>entender as consequências visuais</strong> de cada escolha. Quer transmitir força? Escolha densidade maior. Quer manter delicadeza? Escolha densidade equilibrada. Quer provocar mudança? Escolha densidade oposta. Tudo é válido quando você escolhe conscientemente.
        </p>
      </div>

      <!-- BRIDGE: SOBRANCELHAS — A REGIÃO MENTAL DO ROSTO -->
      <div style="background: rgba(156, 39, 176, 0.12); border-left: 4px solid #9C27B0; padding: 28px; border-radius: 12px; margin-bottom: 30px; margin-top: 30px;">
        <h3 style="color: #9C27B0; margin-bottom: 18px; font-size: 1.15rem;">👁️ Bridge: Sobrancelhas — A Comunicadora da Razão</h3>

        <p style="color: #ddd; line-height: 1.9; margin-bottom: 15px;">
          Você acabou de explorar gola e adereços — elementos que escolhe. Agora vamos entender uma parte do seu rosto que você <strong>JÁ TEM</strong>, mas que comunica algo profundo: as sobrancelhas.
        </p>

        <p style="color: #ddd; line-height: 1.9; margin-bottom: 15px;">
          <strong>O rosto tem 3 regiões:</strong>
        </p>
        <ul style="color: #ccc; line-height: 2; margin-left: 20px; margin-bottom: 15px;">
          <li>🧠 <strong>TESTA/SOBRANCELHAS</strong> = Mental/Racional (Como você PENSA)</li>
          <li>❤️ <strong>MEIO ROSTO</strong> (Olhos, maçãs) = Emocional (Como você SENTE)</li>
          <li>⚡ <strong>QUEIXO/MANDÍBULA</strong> = Intuitivo (Como você DECIDE)</li>
        </ul>

        <p style="color: #ddd; line-height: 1.9; margin-bottom: 15px;">
          <strong>As sobrancelhas reforçam, equilibram ou atenuam sua RAZÃO.</strong> Elas revelam seu estado mental — quem você é racionalmente (essência) e como você está pensando agora (contexto).
        </p>

        <div style="background: rgba(156, 39, 176, 0.15); padding: 15px; border-radius: 8px; margin: 15px 0;">
          <p style="color: #ddd; line-height: 1.8; font-size: 0.95rem;">
            <strong>RETAS + GROSSAS:</strong> Força Mental (pensamento estruturado, determinado)<br>
            <strong>RETAS + FINAS:</strong> Delicadeza Mental (lógica suave, receptiva)<br>
            <strong>CURVAS + GROSSAS:</strong> Força Emocional sobre a Mente (intuição prevalece)<br>
            <strong>CURVAS + FINAS:</strong> Delicadeza (vulnerabilidade, às vezes abalo emocional)<br>
            <strong>DIAGONAIS:</strong> Instabilidade Racional (movimentação mental, até para força ou delicadeza)
          </p>
        </div>

        <p style="color: #aaa; line-height: 1.8; font-size: 0.95rem; font-style: italic;">
          <strong>O aspecto temporal:</strong> Sobrancelhas naturais = quem você É (essência). Sobrancelhas alteradas (maquiagem, design) = como você QUER comunicar agora. Tudo conectado com seu SER vs ESTAR.
        </p>
      </div>

      <div style="text-align: center; margin-top: 40px;">
        <button class="quadrante-btn" onclick="finalizarQ2()" style="font-size: 1rem; padding: 15px 30px; width: 100%; max-width: 400px;">
          ✓ Entendi — Próximo Quadrante →
        </button>
      </div>
    </div>
  `;
}

function explorarFranja() {
  q2State.etapa = 'franja';
  const conteudo = document.getElementById('conteudo-q2');
  const nome = usuariaData.nome || 'você';
  conteudo.innerHTML = `
    <div style="max-width: 900px; margin: 40px auto;">
      <h2 style="color: #E85D9F; font-size: 1.4rem; margin-bottom: 20px; text-align: center;">
        ✨ ${nome}, Franja — O Sistema de Compensação com a Gola
      </h2>

      <p style="color: #ccc; font-size: 1rem; line-height: 1.8; margin-bottom: 30px; text-align: center;">
        Franja não é uma decisão isolada. Ela trabalha em COMPENSAÇÃO com a gola. O que uma estrutura cobre ou destaca, a outra precisa equilibrar.
      </p>

      <div style="background: rgba(196, 151, 58, 0.1); border-left: 4px solid #C4973A; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
        <h3 style="color: #C4973A; margin-bottom: 15px;">💡 O Sistema de Tradeoff</h3>
        <p style="color: #ddd; line-height: 1.8;">
          <strong>Franja cobre a testa.</strong> A gola continua a conversa visual abaixo.
        </p>
        <p style="color: #ccc; line-height: 1.8; margin-top: 12px;">
          Quando você coloca uma franja, você está:
        </p>
        <ul style="color: #ccc; line-height: 2; margin-left: 20px; margin-top: 12px;">
          <li>📍 <strong>Encurtando visualmente a testa</strong> (franja reta) ou <strong>alongando-a</strong> (sem franja)</li>
          <li>📍 <strong>Criando uma linha horizontal ou diagonal</strong> que precisa ser compensada abaixo</li>
          <li>📍 <strong>Concentrando ou distribuindo volume</strong> na região do rosto/pescoço</li>
          <li>📍 <strong>Alterando quanto da testa fica visível</strong> — o que muda como a gola é percebida</li>
        </ul>
      </div>

      <div style="background: rgba(109, 213, 237, 0.08); border: 1px solid rgba(109, 213, 237, 0.3); padding: 25px; border-radius: 12px; margin-bottom: 25px;">
        <h3 style="color: #6DD5ED; margin-bottom: 15px; font-size: 1.2rem;">🔵 Franja Reta (Volume de Informação CONCENTRADO)</h3>
        <p style="color: #ddd; line-height: 1.8; margin-bottom: 15px;">
          <strong>O que você vê:</strong> Linha horizontal forte acima dos olhos. Testa reduzida. Foco concentrado na região dos olhos/maçãs.
        </p>

        <p style="color: #ccc; line-height: 1.8; margin-bottom: 15px;">
          <strong>Volume de informação:</strong> Você está ADICIONANDO densidade visual no topo (franja densa = muita informação ali). Isso significa que abaixo, na região da gola, há menos "espaço respirável".
        </p>

        <p style="color: #ddd; line-height: 1.8; margin-bottom: 15px;">
          Pense: Se a franja é DENSA (muita informação em cima), a gola precisa ser mais ABERTA/LIMPA (menos densidade abaixo). Se você colocar uma gola com muitos detalhes (U cheia, colares, volume) DEPOIS de uma franja reta, está acumulando informação no mesmo espaço.
        </p>

        <p style="color: #aaa; line-height: 1.8; font-style: italic;">
          <strong>Reflexão:</strong> Olhe no espelho com franja reta. Quanto de sua testa desaparece? A gola que você escolher precisa "devolver" essa altura de alguma forma — ou através de alongamento visual (gola V) ou através de clareza (gola bem limpa).
        </p>
      </div>

      <div style="background: rgba(232, 93, 159, 0.08); border: 1px solid rgba(232, 93, 159, 0.3); padding: 25px; border-radius: 12px; margin-bottom: 25px;">
        <h3 style="color: #E85D9F; margin-bottom: 15px; font-size: 1.2rem;">△ Franja Diagonal (Volume de Informação ASSIMÉTRICO)</h3>
        <p style="color: #ddd; line-height: 1.8; margin-bottom: 15px;">
          <strong>O que você vê:</strong> Linha diagonal criada pelo desnível. Um lado da testa exposto, outro coberto. Movimento visual constante.
        </p>

        <p style="color: #ccc; line-height: 1.8; margin-bottom: 15px;">
          <strong>Volume de informação:</strong> Você está criando ASSIMETRIA NO TOPO. Isso significa que a compensação precisa acontecer na gola — ou você reforça a assimetria (gola diagonal também) ou você a neutraliza (gola equilibrada).
        </p>

        <p style="color: #ddd; line-height: 1.8; margin-bottom: 15px;">
          Uma franja diagonal JÁ está fazendo seu rosto "se mover". A pergunta é: você quer que a gola também se mova (V profundo, assimétrica) ou quer que ela pouse (quadrada, simples)?
        </p>

        <p style="color: #aaa; line-height: 1.8; font-style: italic;">
          <strong>Reflexão:</strong> Sente-se diante do espelho. Uma franja diagonal cria tensão/movimento. Essa tensão precisa ir em algum lugar — ela "desce" para a gola. Você quer que ela continue descendo (movimento contínuo) ou quer "frear" em algum ponto?
        </p>
      </div>

      <div style="background: rgba(109, 213, 237, 0.08); border: 1px solid rgba(109, 213, 237, 0.3); padding: 25px; border-radius: 12px; margin-bottom: 25px;">
        <h3 style="color: #6DD5ED; margin-bottom: 15px; font-size: 1.2rem;">🔵 Franja Côncava/Aberta (Volume de Informação DISTRIBUÍDO)</h3>
        <p style="color: #ddd; line-height: 1.8; margin-bottom: 15px;">
          <strong>O que você vê:</strong> Linha arqueada, suave. Testa parcialmente visível nos lados. Softness visual.
        </p>

        <p style="color: #ccc; line-height: 1.8; margin-bottom: 15px;">
          <strong>Volume de informação:</strong> Você está distribuindo a densidade — nem encobrir totalmente (reta) nem expor totalmente (sem franja). Isso cria um "meio termo visual" que deixa espaço para a gola trabalhar naturalmente.
        </p>

        <p style="color: #ddd; line-height: 1.8; margin-bottom: 15px;">
          Com franja côncava, sua testa ainda é VISÍVEL parcialmente. Isso significa que a gola tem mais "liberdade" — ela não precisa compensar tanto. Pode ser suave (gola U) e sentir-se natural.
        </p>

        <p style="color: #aaa; line-height: 1.8; font-style: italic;">
          <strong>Reflexão:</strong> Franja côncava é a mais "conversável" — ela fala sozinha, sem exigir que a gola seja uma heroína compensatória. Você sente mais flexibilidade ao escolher o que usar embaixo?
        </p>
      </div>

      <div style="background: rgba(196, 151, 58, 0.08); border: 1px solid rgba(196, 151, 58, 0.3); padding: 25px; border-radius: 12px; margin-bottom: 30px;">
        <h3 style="color: #C4973A; margin-bottom: 15px; font-size: 1.2rem;">⬜ SEM Franja (Testa EXPOSTA — Volume de Informação MÁXIMO NA TESTA)</h3>
        <p style="color: #ddd; line-height: 1.8; margin-bottom: 15px;">
          <strong>O que você vê:</strong> Testa completamente visível. Nenhuma linha horizontal criada por franja. Clareza máxima.
        </p>

        <p style="color: #ccc; line-height: 1.8; margin-bottom: 15px;">
          <strong>Volume de informação:</strong> TODA a informação da testa está sendo processada — sua forma, largura, altura, simetria. Isso significa que a gola não precisa "compensar" altura (você JÁ está alongado pela testa exposta). A gola agora trabalha para reforçar ou controlar outras proporções.
        </p>

        <p style="color: #ddd; line-height: 1.8; margin-bottom: 15px;">
          Sem franja, você está convidando a atenção para CIMA. A gola, portanto, pode ser mais simples/leve porque não precisa brigar por atenção.
        </p>

        <p style="color: #aaa; line-height: 1.8; font-style: italic;">
          <strong>Reflexão:</strong> Você gosta de mostrar sua testa? Quando você a vê exposta, sente-se taller, mais elegante, mais aberta? Ou prefere "guardar" essa informação sob uma franja e deixar a gola ser o protagonista?
        </p>
      </div>

      <div style="text-align: center;">
        <button class="quadrante-btn" onclick="finalizarQ2()" style="font-size: 1rem; padding: 15px 30px; width: 100%; max-width: 400px;">
          ✓ Pensado — Próximo Quadrante →
        </button>
      </div>
    </div>
  `;
}

function finalizarQ2() {
  usuariaData.q2Completo = true;
  fecharPainel(2);
  atualizarStatusBadge(2);
  alert(`✓ Exploração de Gola + Adereços concluída, ${usuariaData.nome}!`);
}

function atualizarStatusBadge(num) {
  const badge = document.getElementById(`status-q${num}`);
  if (badge) {
    badge.textContent = '✓ Completo';
    badge.classList.remove('em-progresso');
    badge.classList.add('completo');
  }
}
