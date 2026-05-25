/**
 * CAMERA.JS — Câmera com Máscara Facial (MagicFace v2)
 */

const FACE_OVAL = [10,338,297,332,284,251,389,356,454,323,361,288,397,365,379,378,400,377,152,148,176,149,150,136,172,58,132,93,234,127,162,21,54,103,67,109];
const LEFT_EYE = [33,7,163,144,145,153,154,155,133,173,157,158,159,160,161,246];
const RIGHT_EYE = [362,382,381,380,374,373,390,249,263,466,388,387,386,385,384,398];
const LEFT_BROW = [276,283,282,295,285,336,296,334,293,300];
const RIGHT_BROW = [46,53,52,65,55,107,66,105,63,70];
const NOSE_BRIDGE = [168,6,197,195,5,4,1,19,94];
const NOSE_BASE = [218,115,220,45,4,275,220,343,218];
const LIPS_OUTER = [61,185,40,39,37,0,267,269,270,409,291,375,321,405,314,17,84,181,91,146];
const LIPS_INNER = [78,191,80,81,82,13,312,311,310,415,308,324,318,402,317,14,87,178,88,95];

let faceLandmarker = null;
let rafId = null;
let cameraState = { stream: null, landmarks: null, encaixado: false, okFrames: 0 };

async function carregarMediaPipe() {
  try {
    console.log('Carregando MediaPipe via import dinâmico...');

    console.log('1. Importando vision_bundle.mjs...');
    const visionModule = await import('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/vision_bundle.mjs');
    console.log('1. ✓ Módulo importado, chaves:', Object.keys(visionModule).slice(0, 5));

    const { FaceLandmarker, FilesetResolver } = visionModule;
    console.log('2. ✓ FaceLandmarker e FilesetResolver extraídos');

    if (!FaceLandmarker || !FilesetResolver) {
      console.log('Chaves disponíveis no módulo:', Object.keys(visionModule));
      throw new Error('FaceLandmarker ou FilesetResolver não encontrados');
    }

    console.log('3. Criando vision resolver...');
    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
    );
    console.log('3. ✓ Vision resolver criado');

    console.log('4. Criando FaceLandmarker...');
    faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
        delegate: 'CPU'
      },
      runningMode: 'VIDEO',
      numFaces: 1
    });
    console.log('4. ✓ FaceLandmarker criado com sucesso');
  } catch (err) {
    console.error('❌ Erro ao carregar MediaPipe:', err.message, err);
    throw err;
  }
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Falha ao carregar ${src}`));
    document.head.appendChild(script);
  });
}

async function iniciarCameraQ1() {
  const conteudo = document.getElementById('conteudo-q1');

  conteudo.innerHTML = `
    <div style="position: relative; width: 100%; aspect-ratio: 4/3; background: #000; border-radius: 16px; overflow: hidden; margin-bottom: 20px;">
      <video id="video-q1" style="width: 100%; height: 100%; object-fit: cover; transform: scaleX(-1); display: block;"></video>
      <canvas id="mask-canvas-q1" style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;"></canvas>
      <div id="mp-loading-q1" style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.8); color: #aaa; border-radius: 14px;">
        Carregando câmera...
      </div>
    </div>
    <div id="status-camera-q1" style="text-align: center; color: #888; margin: 20px 0; font-size: 0.9rem;">Centralize seu rosto</div>
    <button class="quadrante-btn" id="btn-capturar-q1" disabled>📷 Capturar Foto</button>
    <button class="quadrante-btn" onclick="fecharCameraQ1()" style="background: rgba(200,100,100,0.5); margin-left: 10px;">✕ Cancelar</button>
  `;

  const video = document.getElementById('video-q1');
  const maskCanvas = document.getElementById('mask-canvas-q1');
  const statusText = document.getElementById('status-camera-q1');
  const mpLoading = document.getElementById('mp-loading-q1');
  const btnCapturar = document.getElementById('btn-capturar-q1');

  try {
    console.log('Iniciando câmera...');
    cameraState.stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 960 } },
      audio: false
    });

    console.log('Stream obtido');
    video.srcObject = cameraState.stream;
    await video.play();
    console.log('Vídeo em reprodução');

    console.log('Aguardando vídeo ficar pronto...');
    // Esperar o vídeo ficar pronto (canplay event ou timeout)
    await Promise.race([
      new Promise(r => {
        if (video.readyState >= 2) {
          r(); // Já está pronto
        } else {
          video.addEventListener('canplay', r, { once: true });
        }
      }),
      new Promise((_, rej) => setTimeout(() => rej(new Error('Timeout esperando vídeo')), 5000))
    ]);
    console.log('Vídeo pronto, dimensões:', video.videoWidth, 'x', video.videoHeight);

    console.log('Aguardando 1s para estabilizar...');
    await new Promise(r => setTimeout(r, 1000));
    console.log('Pronto para MediaPipe');

    maskCanvas.width = maskCanvas.offsetWidth || 600;
    maskCanvas.height = maskCanvas.offsetHeight || 450;
    console.log('Canvas dimensões:', maskCanvas.width, 'x', maskCanvas.height);

    console.log('Iniciando carregamento do MediaPipe...');
    try {
      await carregarMediaPipe();
      console.log('MediaPipe pronto, iniciando detecção...');
      mpLoading.style.display = 'none';
    } catch (mpErr) {
      console.error('Erro MediaPipe:', mpErr);
      mpLoading.innerHTML = `<p style="color: #ff6b6b;">✗ MediaPipe: ${mpErr.message}</p>`;
      return;
    }

    // Adicionar listener para o botão capturar
    btnCapturar.onclick = () => capturarFotoQ1(video);

    loopDeteccao(video, maskCanvas, statusText, btnCapturar);

  } catch (err) {
    console.error('Erro na câmera:', err);
    mpLoading.innerHTML = `<p style="color: #ff6b6b;">✗ ${err.message}</p>`;
  }
}

let lastTs = 0;
let frameCount = 0;
function loopDeteccao(video, maskCanvas, statusText, btnCapturar) {
  rafId = requestAnimationFrame(ts => {
    if (!cameraState.stream) return;

    if (faceLandmarker && ts - lastTs > 80) {
      lastTs = ts;
      frameCount++;
      try {
        const res = faceLandmarker.detectForVideo(video, ts);
        if (res.faceLandmarks && res.faceLandmarks.length > 0) {
          cameraState.landmarks = res.faceLandmarks[0];
          processarRosto(cameraState.landmarks, maskCanvas, statusText, btnCapturar);
        } else {
          semRosto(maskCanvas, statusText, btnCapturar);
          if (frameCount % 10 === 0) console.log('Nenhum rosto detectado - frame', frameCount);
        }
      } catch (err) {
        console.error('Erro na detecção:', err);
        semRosto(maskCanvas, statusText, btnCapturar);
      }
    }

    loopDeteccao(video, maskCanvas, statusText, btnCapturar);
  });
}

function processarRosto(landmarks, maskCanvas, statusText, btnCapturar) {
  const dw = maskCanvas.width, dh = maskCanvas.height;

  let sumX = 0, sumY = 0;
  for (const lm of landmarks) {
    sumX += lm.x;
    sumY += lm.y;
  }
  const cx = 1 - (sumX / landmarks.length);
  const cy = sumY / landmarks.length;

  let minX = 1, maxX = 0;
  for (const lm of landmarks) {
    minX = Math.min(minX, lm.x);
    maxX = Math.max(maxX, lm.x);
  }
  const largura = (maxX - minX) * dw;

  const centralH = Math.abs(cx - 0.5) < 0.07;
  const centralV = Math.abs(cy - 0.44) < 0.07;
  const tamanho = largura > dw * 0.32 && largura < dw * 0.95;

  if (centralH && centralV && tamanho) {
    cameraState.okFrames++;
    cameraState.encaixado = true;
    statusText.textContent = '✓ Perfeito! Segure firme...';
    statusText.style.color = '#C4973A';
    if (cameraState.okFrames >= 5) {
      btnCapturar.disabled = false;
    }
  } else {
    cameraState.okFrames = 0;
    cameraState.encaixado = false;
    btnCapturar.disabled = true;

    const offH = cx - 0.5;
    const offV = cy - 0.44;

    if (largura < dw * 0.3) {
      statusText.textContent = 'Aproxime-se da câmera';
    } else if (largura > dw * 0.82) {
      statusText.textContent = 'Afaste-se um pouco';
    } else if (!centralH && !centralV) {
      statusText.textContent = Math.abs(offH) >= Math.abs(offV)
        ? (offH > 0 ? '← Mova para a esquerda' : '→ Mova para a direita')
        : (offV > 0 ? '↑ Mova para cima' : '↓ Mova para baixo');
    } else if (!centralH) {
      statusText.textContent = offH > 0 ? '← Mova para a esquerda' : '→ Mova para a direita';
    } else if (!centralV) {
      statusText.textContent = offV > 0 ? '↑ Mova para cima' : '↓ Mova para baixo';
    }
    statusText.style.color = '#888';
  }

  desenharMascara(landmarks, maskCanvas, cameraState.encaixado);
}

function semRosto(maskCanvas, statusText, btnCapturar) {
  const ctx = maskCanvas.getContext('2d');
  ctx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);
  statusText.textContent = 'Nenhum rosto detectado';
  statusText.style.color = '#888';
  cameraState.encaixado = false;
  cameraState.okFrames = 0;
  btnCapturar.disabled = true;
}

function desenharMascara(landmarks, maskCanvas, encaixado) {
  const ctx = maskCanvas.getContext('2d');
  const dw = maskCanvas.width, dh = maskCanvas.height;
  ctx.clearRect(0, 0, dw, dh);

  const cor = encaixado ? '#C4973A' : 'rgba(255,255,255,0.7)';
  const corFraca = encaixado ? 'rgba(196, 151, 58, 0.3)' : 'rgba(255,255,255,0.35)';

  if (encaixado) {
    ctx.shadowColor = '#C4973A';
    ctx.shadowBlur = 7;
  } else {
    ctx.shadowBlur = 0;
  }

  function p(idx) {
    const lm = landmarks[idx];
    if (!lm) return null;
    return { x: (1 - lm.x) * dw, y: lm.y * dh };
  }

  // Calcular centro do rosto a partir do FACE_OVAL
  const ovalPts = FACE_OVAL.map(i => p(i)).filter(Boolean);
  let cx = 0, cy = 0;
  ovalPts.forEach(pt => { cx += pt.x; cy += pt.y; });
  cx /= ovalPts.length;
  cy /= ovalPts.length;

  // Escalas de expansão (10cm altura, proporção 2.4:1)
  const escalaX = 0.875;
  const escalaY = 2.1;
  function expandirPontos(indices) {
    return indices.map(i => p(i)).filter(Boolean).map(pt => ({
      x: cx + (pt.x - cx) * escalaX,
      y: cy + (pt.y - cy) * escalaY
    }));
  }

  function pathExpandido(indices, fechar = false) {
    const pts = expandirPontos(indices);
    if (pts.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
    if (fechar) ctx.closePath();
    ctx.stroke();
  }

  // Contorno do rosto (EXPANDIDO)
  ctx.strokeStyle = cor;
  ctx.lineWidth = 2.5;
  if (ovalPts.length > 2) {
    const ptsExpandidos = ovalPts.map(pt => ({
      x: cx + (pt.x - cx) * escalaX,
      y: cy + (pt.y - cy) * escalaY
    }));
    ctx.beginPath();
    ctx.moveTo(ptsExpandidos[0].x, ptsExpandidos[0].y);
    for (let i = 1; i < ptsExpandidos.length; i++) {
      ctx.lineTo(ptsExpandidos[i].x, ptsExpandidos[i].y);
    }
    ctx.closePath();
    ctx.stroke();
  }

  // Sobrancelhas (SINCRONIZADAS)
  ctx.lineWidth = 1.5;
  pathExpandido(LEFT_BROW, false);
  pathExpandido(RIGHT_BROW, false);

  // Olhos (SINCRONIZADOS)
  pathExpandido(LEFT_EYE, true);
  pathExpandido(RIGHT_EYE, true);

  // Nariz (SINCRONIZADO)
  ctx.strokeStyle = corFraca;
  ctx.lineWidth = 1.2;
  pathExpandido(NOSE_BRIDGE, false);
  pathExpandido(NOSE_BASE, false);

  // Boca (SINCRONIZADA)
  ctx.strokeStyle = cor;
  ctx.lineWidth = 1.5;
  pathExpandido(LIPS_OUTER, true);
  pathExpandido(LIPS_INNER, true);

  ctx.shadowBlur = 0;
}

function pararCamera() {
  if (rafId) cancelAnimationFrame(rafId);
  if (cameraState.stream) {
    cameraState.stream.getTracks().forEach(t => t.stop());
    cameraState.stream = null;
  }
}

function capturarFotoQ1(video) {
  console.log('Capturando foto...');
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');

  // Desenhar o vídeo no canvas (com espelhamento para corrigir a câmera frontal)
  ctx.scale(-1, 1);
  ctx.drawImage(video, -canvas.width, 0);

  const fotoOriginal = canvas.toDataURL('image/jpeg', 0.95);

  // Gerar meias-faces
  const meiaEsquerda = gerarMeiaFace(canvas, 'esquerda');
  const meiaDireita = gerarMeiaFace(canvas, 'direita');

  console.log('Foto capturada, parando câmera...');
  pararCamera();

  exibirResultadosQ1(fotoOriginal, meiaEsquerda, meiaDireita);
}

function gerarMeiaFace(canvas, lado) {
  const novoCanvas = document.createElement('canvas');
  novoCanvas.width = canvas.width;
  novoCanvas.height = canvas.height;
  const ctx = novoCanvas.getContext('2d');

  const meio = canvas.width / 2;

  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, novoCanvas.width, novoCanvas.height);

  if (lado === 'esquerda') {
    // Lado esquerdo do rosto (0 até meio)
    // Coloca na esquerda (0 até meio)
    ctx.drawImage(canvas, 0, 0, meio, canvas.height, 0, 0, meio, canvas.height);

    // Espelha o lado esquerdo para a direita (meio até fim)
    ctx.save();
    ctx.translate(novoCanvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(canvas, 0, 0, meio, canvas.height, 0, 0, meio, canvas.height);
    ctx.restore();
  } else if (lado === 'direita') {
    // Lado direito do rosto (meio até fim)
    // Coloca na direita (meio até fim)
    ctx.drawImage(canvas, meio, 0, meio, canvas.height, meio, 0, meio, canvas.height);

    // Espelha o lado direito para a esquerda (0 até meio)
    ctx.save();
    ctx.translate(0, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(canvas, meio, 0, meio, canvas.height, -meio, 0, meio, canvas.height);
    ctx.restore();
  }

  return novoCanvas.toDataURL('image/jpeg', 0.95);
}

function exibirResultadosQ1(original, meiaEsq, meiaDir) {
  // Delegar para o orquestrador do Quadrante 1 (quadrante-1.js)
  exibirMeiasFaces(original, meiaEsq, meiaDir);
}

function fecharCameraQ1() {
  pararCamera();
  fecharPainel(1);
}
