---
layout: slide
title: "Entrenador Dual N-Back"
---

<section class="nback-app">
  <div class="nback-hero">
    <div>
      <p class="eyebrow">Memoria de trabajo</p>
      <h1>Dual N-Back</h1>
      <p>Incluye tutorial, modo de práctica y juego completo con variantes solo visual, solo auditiva y dual.</p>
    </div>
    <div class="progress-card">
      <p class="eyebrow">Progreso guardado</p>
      <p><strong>Sesiones:</strong> <span id="progressSessions">0</span></p>
      <p><strong>Mejor exactitud:</strong> <span id="progressBestAccuracy">0%</span></p>
      <p><strong>Mayor n superado:</strong> <span id="progressBestN">1</span></p>
      <p><strong>Promedio de respuesta:</strong> <span id="progressAvgRt">-</span> ms</p>
    </div>
  </div>

  <div class="layout-grid">
    <div class="panel">
      <h2>Tutorial exprés</h2>
      <ol class="tutorial-list">
        <li>Elige <strong>n</strong>: cuántos pasos atrás compararás (por defecto 2-back).</li>
        <li>En <strong>modo visual</strong> solo marcas coincidencias de cuadro; en <strong>modo auditivo</strong>, de sonido; en <strong>modo dual</strong>, ambas.</li>
        <li>Cada estímulo dura el tiempo de <em>velocidad</em>. Si coincide con el de n pasos atrás, pulsa el botón de coincidencia correspondiente.</li>
        <li>El modo <strong>práctica</strong> usa sesiones cortas para probar los tres modos antes del juego completo.</li>
        <li>Al finalizar, verás exactitud, velocidad de respuesta y mejoras sugeridas; el progreso se guarda en tu navegador.</li>
      </ol>
    </div>

    <div class="panel">
      <h2>Configuración</h2>
      <div class="control-row">
        <label for="nLevel">Nivel n-back</label>
        <input id="nLevel" type="number" min="1" max="4" value="2">
      </div>
      <div class="control-row">
        <label for="sequenceLength">Duración de la sesión (pasos)</label>
        <input id="sequenceLength" type="number" min="8" max="60" value="20">
      </div>
      <div class="control-row">
        <label for="stepSpeed">Velocidad (ms por estímulo)</label>
        <input id="stepSpeed" type="number" min="1200" max="5000" step="100" value="2200">
      </div>
      <fieldset class="control-row">
        <legend>Modo</legend>
        <label><input type="radio" name="mode" value="visual" checked> Solo visual</label>
        <label><input type="radio" name="mode" value="auditory"> Solo auditivo</label>
        <label><input type="radio" name="mode" value="dual"> Dual</label>
      </fieldset>
      <div class="control-row split">
        <button id="startPractice">Iniciar práctica</button>
        <button id="startSession" class="primary">Iniciar juego</button>
      </div>
      <div class="control-row split">
        <button id="pauseSession">Pausar</button>
        <button id="resetSession" class="ghost">Reiniciar</button>
      </div>
      <p class="hint">Consejo: prueba primero los tres modos en práctica para familiarizarte.</p>
    </div>

    <div class="panel play-area">
      <div class="status-bar">
        <div>
          <p class="eyebrow">Sesión</p>
          <p id="sessionLabel">Lista para comenzar</p>
        </div>
        <div>
          <p class="eyebrow">Paso</p>
          <p><span id="stepNow">0</span>/<span id="stepTotal">0</span></p>
        </div>
      </div>
      <div class="nback-grid" aria-live="polite">
        <div class="cell" data-index="0"></div>
        <div class="cell" data-index="1"></div>
        <div class="cell" data-index="2"></div>
        <div class="cell" data-index="3"></div>
        <div class="cell" data-index="4"></div>
        <div class="cell" data-index="5"></div>
        <div class="cell" data-index="6"></div>
        <div class="cell" data-index="7"></div>
        <div class="cell" data-index="8"></div>
      </div>
      <div class="stimulus-callout">
        <p class="eyebrow">Estímulo auditivo</p>
        <p id="soundCue">—</p>
      </div>
      <div class="response-row">
        <button id="matchPosition" class="primary">Coincidencia de posición</button>
        <button id="matchSound" class="secondary">Coincidencia de sonido</button>
      </div>
      <p id="feedback" class="feedback">Pulsa un modo para comenzar</p>
    </div>

    <div class="panel stats">
      <h2>Estadísticas en vivo</h2>
      <dl>
        <div>
          <dt>Exactitud global</dt>
          <dd id="accuracy">0%</dd>
        </div>
        <div>
          <dt>Coincidencias visuales</dt>
          <dd id="visualStats">0/0</dd>
        </div>
        <div>
          <dt>Coincidencias auditivas</dt>
          <dd id="audioStats">0/0</dd>
        </div>
        <div>
          <dt>Velocidad media de respuesta</dt>
          <dd id="rtAverage">—</dd>
        </div>
        <div>
          <dt>Mejor reacción</dt>
          <dd id="rtBest">—</dd>
        </div>
        <div>
          <dt>Racha actual</dt>
          <dd id="streak">0</dd>
        </div>
      </dl>
    </div>
  </div>

  <div class="panel insights">
    <h2>Mejoras recomendadas</h2>
    <ul>
      <li>Usa auriculares para el modo auditivo; así evitas ruido externo.</li>
      <li>Sube gradualmente a n-back mayores solo tras mantener ≥80% de exactitud en dos sesiones.</li>
      <li>Alterna práctica visual y auditiva para reducir la fatiga y mejorar la consolidación.</li>
      <li>Revisa tus promedios de respuesta: si superan 1.5 s, baja la velocidad hasta recuperar precisión.</li>
    </ul>
  </div>
</section>

<style>
.nback-app {font-family: "Inter", system-ui, -apple-system, sans-serif; color: #e8edf3; background: linear-gradient(135deg, #0d1b2a, #1b263b); padding: 1rem 1.5rem 2rem; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.4);}
.nback-hero {display: grid; grid-template-columns: 2fr 1fr; gap: 1rem; align-items: center; margin-bottom: 1rem;}
.eyebrow {text-transform: uppercase; letter-spacing: 0.08em; font-size: 0.75rem; color: #8fb3ff; margin: 0 0 0.25rem;}
.nback-hero h1 {margin: 0 0 0.25rem; font-size: 2rem;}
.nback-hero p {margin: 0; color: #dbe7ff;}
.progress-card {background: rgba(255,255,255,0.05); padding: 0.75rem 1rem; border-radius: 10px; border: 1px solid rgba(255,255,255,0.08);}
.layout-grid {display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;}
.panel {background: rgba(10,18,35,0.7); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 1rem; box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);}
.panel h2 {margin-top: 0; margin-bottom: 0.5rem;}
.tutorial-list {margin: 0; padding-left: 1.25rem; color: #d9e2ec; display: grid; gap: 0.35rem;}
.control-row {display: grid; gap: 0.4rem; margin-bottom: 0.75rem;}
.control-row.split {grid-template-columns: repeat(auto-fit,minmax(140px,1fr)); gap: 0.5rem; align-items: center;}
.control-row input[type="number"] {padding: 0.35rem 0.5rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.05); color: #fff;}
fieldset {border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; padding: 0.6rem 0.8rem;}
legend {color: #9fb7ff; padding: 0 0.25rem;}
button {padding: 0.55rem 0.65rem; border-radius: 10px; border: 1px solid transparent; background: #243b6b; color: #fff; cursor: pointer; transition: transform 0.1s ease, box-shadow 0.2s ease; font-weight: 600;}
button.primary {background: linear-gradient(135deg,#5b8bff,#3a64ff);}
button.secondary {background: linear-gradient(135deg,#00b4d8,#0096c7);}
button.ghost {background: transparent; border: 1px solid rgba(255,255,255,0.2);}
button:hover {transform: translateY(-1px); box-shadow: 0 6px 16px rgba(0,0,0,0.35);}
.hint {margin: 0; font-size: 0.85rem; color: #9fb7ff;}
.play-area {grid-column: span 2;}
.status-bar {display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; padding: 0.5rem 0.75rem; background: rgba(255,255,255,0.04); border-radius: 10px; border: 1px solid rgba(255,255,255,0.08);} 
.nback-grid {display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; max-width: 360px; margin: 0 auto;}
.cell {aspect-ratio: 1; border-radius: 10px; border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.03); box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);} 
.cell.active {background: radial-gradient(circle at 40% 30%, rgba(255,255,255,0.4), rgba(59,130,246,0.9)); box-shadow: 0 10px 30px rgba(59,130,246,0.45);} 
.stimulus-callout {text-align: center; margin: 0.75rem 0; color: #dbe7ff;}
.stimulus-callout p {margin: 0;}
.response-row {display: grid; grid-template-columns: repeat(auto-fit,minmax(180px,1fr)); gap: 0.5rem; margin-bottom: 0.35rem;}
.feedback {text-align: center; margin: 0.35rem 0 0; color: #9ce3ff; font-weight: 600;}
.stats dl {margin: 0; display: grid; grid-template-columns: repeat(auto-fit,minmax(160px,1fr)); gap: 0.5rem 1rem;}
.stats dt {font-weight: 600; color: #9fb7ff;}
.stats dd {margin: 0; font-size: 1.2rem;}
.insights ul {margin: 0; padding-left: 1.2rem; color: #d9e2ec; display: grid; gap: 0.25rem;}
@media (max-width: 800px) { .nback-hero {grid-template-columns: 1fr;} .play-area {grid-column: span 1;} }
</style>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const cells = Array.from(document.querySelectorAll('.cell'));
  const modeInputs = Array.from(document.querySelectorAll('input[name="mode"]'));
  const ui = {
    nLevel: document.getElementById('nLevel'),
    sequenceLength: document.getElementById('sequenceLength'),
    stepSpeed: document.getElementById('stepSpeed'),
    startPractice: document.getElementById('startPractice'),
    startSession: document.getElementById('startSession'),
    pause: document.getElementById('pauseSession'),
    reset: document.getElementById('resetSession'),
    matchPosition: document.getElementById('matchPosition'),
    matchSound: document.getElementById('matchSound'),
    sessionLabel: document.getElementById('sessionLabel'),
    stepNow: document.getElementById('stepNow'),
    stepTotal: document.getElementById('stepTotal'),
    soundCue: document.getElementById('soundCue'),
    feedback: document.getElementById('feedback'),
    accuracy: document.getElementById('accuracy'),
    visualStats: document.getElementById('visualStats'),
    audioStats: document.getElementById('audioStats'),
    rtAverage: document.getElementById('rtAverage'),
    rtBest: document.getElementById('rtBest'),
    streak: document.getElementById('streak'),
    progressSessions: document.getElementById('progressSessions'),
    progressBestAccuracy: document.getElementById('progressBestAccuracy'),
    progressBestN: document.getElementById('progressBestN'),
    progressAvgRt: document.getElementById('progressAvgRt'),
  };

  const letters = ['A', 'E', 'I', 'O', 'U', 'M', 'S', 'T', 'R'];
  let timer = null;
  let state = {
    mode: 'visual',
    n: 2,
    length: 20,
    speed: 2200,
    isPractice: false,
    sequence: [],
    sounds: [],
    index: -1,
    running: false,
    lastShown: 0,
    answered: { position: false, sound: false },
    stats: { visual: { correct: 0, attempts: 0 }, audio: { correct: 0, attempts: 0 }, totalResponses: 0, correctResponses: 0, reactionTimes: [], bestRt: null, streak: 0 },
  };

  function loadProgress() {
    const stored = localStorage.getItem('nBackProgress');
    if (!stored) return;
    const data = JSON.parse(stored);
    ui.progressSessions.textContent = data.sessions || 0;
    ui.progressBestAccuracy.textContent = `${(data.bestAccuracy || 0).toFixed(0)}%`;
    ui.progressBestN.textContent = data.bestN || 1;
    ui.progressAvgRt.textContent = data.avgReaction ? Math.round(data.avgReaction) : '-';
  }

  function saveProgress(sessionAccuracy, avgRt) {
    const stored = JSON.parse(localStorage.getItem('nBackProgress') || '{}');
    const sessions = (stored.sessions || 0) + 1;
    const bestAccuracy = Math.max(stored.bestAccuracy || 0, sessionAccuracy);
    const bestN = Math.max(stored.bestN || 0, state.n);
    const avgReaction = stored.avgReaction ? (stored.avgReaction * (sessions - 1) + avgRt) / sessions : avgRt;
    const payload = { sessions, bestAccuracy, bestN, avgReaction };
    localStorage.setItem('nBackProgress', JSON.stringify(payload));
    ui.progressSessions.textContent = sessions;
    ui.progressBestAccuracy.textContent = `${bestAccuracy.toFixed(0)}%`;
    ui.progressBestN.textContent = bestN;
    ui.progressAvgRt.textContent = Math.round(avgReaction);
  }

  function setMode(value) { state.mode = value; ui.sessionLabel.textContent = `Modo ${value}${state.isPractice ? ' (práctica)' : ''}`; }
  modeInputs.forEach((input) => input.addEventListener('change', (e) => setMode(e.target.value)));

  function updateConfig() {
    state.n = parseInt(ui.nLevel.value, 10);
    state.length = parseInt(ui.sequenceLength.value, 10);
    state.speed = parseInt(ui.stepSpeed.value, 10);
    ui.stepTotal.textContent = state.length;
  }

  function resetGrid() { cells.forEach((cell) => cell.classList.remove('active')); }

  function speak(letter) {
    if (typeof speechSynthesis === 'undefined') return;
    const utterance = new SpeechSynthesisUtterance(letter);
    utterance.rate = 1.05;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }

  function generateSequence() {
    state.sequence = Array.from({ length: state.length }, () => Math.floor(Math.random() * 9));
    state.sounds = Array.from({ length: state.length }, () => letters[Math.floor(Math.random() * letters.length)]);
  }

  function formatMs(value) {
    return Number.isFinite(value) ? `${Math.round(value)} ms` : '—';
  }

  function updateStatsDisplay() {
    const { visual, audio, reactionTimes, bestRt, streak } = state.stats;
    const totalAttempts = visual.attempts + audio.attempts || 1;
    const correct = visual.correct + audio.correct;
    const accuracy = (correct / totalAttempts) * 100;
    ui.accuracy.textContent = `${accuracy.toFixed(0)}%`;
    ui.visualStats.textContent = `${visual.correct}/${visual.attempts}`;
    ui.audioStats.textContent = `${audio.correct}/${audio.attempts}`;
    const avg = reactionTimes.length ? reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length : null;
    ui.rtAverage.textContent = formatMs(avg);
    ui.rtBest.textContent = formatMs(bestRt);
    ui.streak.textContent = streak;
    return { accuracy, avgRt: avg };
  }

  function endSession() {
    clearInterval(timer);
    state.running = false;
    ui.feedback.textContent = 'Sesión terminada';
    const { accuracy, avgRt } = updateStatsDisplay();
    if (Number.isFinite(accuracy) && Number.isFinite(avgRt || undefined)) {
      saveProgress(accuracy, avgRt || state.speed);
    }
  }

  function showStimulus() {
    state.index += 1;
    if (state.index >= state.sequence.length) {
      endSession();
      return;
    }
    resetGrid();
    const currentCell = cells[state.sequence[state.index]];
    currentCell.classList.add('active');
    ui.stepNow.textContent = state.index + 1;
    ui.soundCue.textContent = state.mode !== 'visual' ? state.sounds[state.index] : '—';
    state.lastShown = performance.now();
    state.answered = { position: false, sound: false };
    if (state.mode !== 'visual') speak(state.sounds[state.index]);
    setTimeout(() => currentCell.classList.remove('active'), Math.max(450, state.speed - 400));
  }

  function startTicking() {
    clearInterval(timer);
    timer = setInterval(showStimulus, state.speed);
    showStimulus();
  }

  function startSession(isPractice) {
    updateConfig();
    state.isPractice = isPractice;
    state.index = -1;
    state.running = true;
    state.stats = { visual: { correct: 0, attempts: 0 }, audio: { correct: 0, attempts: 0 }, totalResponses: 0, correctResponses: 0, reactionTimes: [], bestRt: null, streak: 0 };
    ui.feedback.textContent = isPractice ? 'Práctica en marcha' : 'Juego en marcha';
    ui.sessionLabel.textContent = `${isPractice ? 'Práctica' : 'Juego'} | n=${state.n} | modo ${state.mode}`;
    generateSequence();
    startTicking();
  }

  function pauseSession() {
    if (!state.running) return;
    clearInterval(timer);
    state.running = false;
    ui.feedback.textContent = 'Pausado';
  }

  function resetSession() {
    clearInterval(timer);
    state.running = false;
    state.index = -1;
    ui.stepNow.textContent = 0;
    ui.stepTotal.textContent = state.length;
    ui.soundCue.textContent = '—';
    ui.sessionLabel.textContent = 'Lista para comenzar';
    ui.feedback.textContent = 'Sesión reiniciada';
    state.stats = { visual: { correct: 0, attempts: 0 }, audio: { correct: 0, attempts: 0 }, totalResponses: 0, correctResponses: 0, reactionTimes: [], bestRt: null, streak: 0 };
    updateStatsDisplay();
    resetGrid();
  }

  function registerResponse(type) {
    if (!state.running) return;
    const now = performance.now();
    const rt = now - state.lastShown;
    const targetIndex = state.index - state.n;
    if (targetIndex < 0) return;
    const isMatch = type === 'position'
      ? state.sequence[state.index] === state.sequence[targetIndex]
      : state.sounds[state.index] === state.sounds[targetIndex];

    if (!state.answered[type]) {
      state.stats.reactionTimes.push(rt);
      state.stats.bestRt = state.stats.bestRt ? Math.min(state.stats.bestRt, rt) : rt;
      state.answered[type] = true;
    }

    const channel = type === 'position' ? state.stats.visual : state.stats.audio;
    channel.attempts += 1;
    if (isMatch) {
      channel.correct += 1;
      state.stats.correctResponses += 1;
      state.stats.streak += 1;
      ui.feedback.textContent = '✔️ ¡Acertaste!';
    } else {
      state.stats.streak = 0;
      ui.feedback.textContent = '✖️ No coincide';
    }
    state.stats.totalResponses += 1;
    updateStatsDisplay();
  }

  ui.startPractice.addEventListener('click', () => startSession(true));
  ui.startSession.addEventListener('click', () => startSession(false));
  ui.pause.addEventListener('click', pauseSession);
  ui.reset.addEventListener('click', resetSession);
  ui.matchPosition.addEventListener('click', () => registerResponse('position'));
  ui.matchSound.addEventListener('click', () => registerResponse('sound'));

  updateConfig();
  loadProgress();
  updateStatsDisplay();
});
</script>
