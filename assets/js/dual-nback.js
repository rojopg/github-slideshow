(function () {
  const app = document.getElementById('dual-nback-app');
  if (!app) return;

  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const defaultConfig = {
    n: 2,
    pace: 2400,
    visibleFor: 950
  };

  const state = {
    sequence: [],
    stats: {
      rounds: 0,
      visual: { correct: 0, attempts: 0 },
      audio: { correct: 0, attempts: 0 },
      streak: 0,
      bestStreak: 0
    },
    config: { ...defaultConfig },
    timer: null,
    running: false,
    lastAnswered: { visual: -1, audio: -1 },
    demo: false
  };

  const elements = {
    grid: app.querySelector('.dual-nback-grid'),
    start: app.querySelector('[data-action="start"]'),
    reset: app.querySelector('[data-action="reset"]'),
    demo: app.querySelector('[data-action="demo"]'),
    pace: app.querySelector('[data-control="pace"]'),
    level: app.querySelector('[data-control="level"]'),
    visualButton: app.querySelector('[data-action="visual"]'),
    audioButton: app.querySelector('[data-action="audio"]'),
    status: app.querySelector('[data-status]'),
    ai: app.querySelector('[data-ai]'),
    timeline: app.querySelector('[data-timeline]'),
    metrics: {
      rounds: app.querySelector('[data-metric="rounds"]'),
      visual: app.querySelector('[data-metric="visual"]'),
      audio: app.querySelector('[data-metric="audio"]'),
      streak: app.querySelector('[data-metric="streak"]'),
      nBack: app.querySelector('[data-metric="nback"]')
    },
    progressBars: {
      visual: app.querySelector('[data-progress="visual"]'),
      audio: app.querySelector('[data-progress="audio"]'),
      streak: app.querySelector('[data-progress="streak"]')
    }
  };

  function randomLetter() {
    return letters[Math.floor(Math.random() * letters.length)];
  }

  function randomPosition() {
    return Math.floor(Math.random() * 9);
  }

  function speak(letter) {
    if (!('speechSynthesis' in window)) return;
    const utterance = new SpeechSynthesisUtterance(letter);
    utterance.pitch = 0.9;
    utterance.rate = 0.95;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }

  function highlightCell(pos) {
    const cells = elements.grid.querySelectorAll('.nback-cell');
    cells.forEach(cell => cell.classList.remove('active'));
    const cell = cells[pos];
    if (!cell) return;
    cell.classList.add('active');
    const pulse = document.createElement('span');
    pulse.className = 'pulse';
    cell.appendChild(pulse);
    setTimeout(() => pulse.remove(), 650);
    setTimeout(() => cell.classList.remove('active'), state.config.visibleFor);
  }

  function generateStimulus() {
    const stimulus = { pos: randomPosition(), letter: randomLetter(), time: Date.now() };
    state.sequence.push(stimulus);
    state.stats.rounds += 1;
    state.lastAnswered = { visual: -1, audio: -1 };
    updateNumbers();
    highlightCell(stimulus.pos);
    speak(stimulus.letter);
    pushTimeline();
    updateAI();
    if (state.demo) {
      setTimeout(autoRespond, state.config.visibleFor + 120);
    }
  }

  function accuracy(metric) {
    const { correct, attempts } = metric;
    if (attempts === 0) return 0;
    return Math.round((correct / attempts) * 100);
  }

  function toggleDemoButton(active) {
    if (!elements.demo) return;
    elements.demo.classList.toggle('active', active);
    elements.demo.textContent = active ? 'Demo en marcha' : 'Modo demo';
  }

  function updateNumbers() {
    elements.metrics.rounds.textContent = state.stats.rounds;
    elements.metrics.visual.textContent = `${state.stats.visual.correct}/${state.stats.visual.attempts} (${accuracy(state.stats.visual)}%)`;
    elements.metrics.audio.textContent = `${state.stats.audio.correct}/${state.stats.audio.attempts} (${accuracy(state.stats.audio)}%)`;
    elements.metrics.streak.textContent = `${state.stats.streak} (mejor ${state.stats.bestStreak})`;
    elements.metrics.nBack.textContent = `${state.config.n}-back`;

    const visAcc = accuracy(state.stats.visual);
    const audAcc = accuracy(state.stats.audio);

    elements.progressBars.visual.style.width = `${visAcc}%`;
    elements.progressBars.audio.style.width = `${audAcc}%`;
    const streakRatio = Math.min(state.stats.streak / Math.max(5, state.stats.bestStreak || 5), 1);
    elements.progressBars.streak.style.width = `${Math.round(streakRatio * 100)}%`;
  }

  function pushTimeline() {
    const last = state.sequence.slice(-6).reverse();
    elements.timeline.innerHTML = last
      .map((item, idx) => {
        const label = state.sequence.length - idx;
        return `<div class="nback-tile"><label>Turno ${label}</label><strong>${item.letter}</strong><div class="nback-badge">Pos ${item.pos + 1}</div></div>`;
      })
      .join('');
  }

  function updateStatus(message, critical = false) {
    elements.status.textContent = message;
    elements.status.parentElement.classList.toggle('critical', critical);
  }

  function evaluate(type) {
    if (!state.running) return;
    const currentIndex = state.sequence.length - 1;
    if (currentIndex <= state.config.n - 1) {
      updateStatus('Aún no hay suficientes rondas para evaluar.');
      return;
    }

    if (state.lastAnswered[type] === currentIndex) {
      updateStatus('Ya registraste tu respuesta en este turno.');
      return;
    }

    const current = state.sequence[currentIndex];
    const comparison = state.sequence[currentIndex - state.config.n];
    const isMatch = type === 'visual'
      ? current.pos === comparison.pos
      : current.letter === comparison.letter;

    state.stats[type].attempts += 1;
    if (isMatch) {
      state.stats[type].correct += 1;
      state.stats.streak += 1;
      state.stats.bestStreak = Math.max(state.stats.streak, state.stats.bestStreak);
      updateStatus('¡Acierto! Sigue así.');
    } else {
      state.stats.streak = 0;
      updateStatus('No coincide con el estímulo n-back.', true);
    }

    state.lastAnswered[type] = currentIndex;
    updateNumbers();
    updateAI();
  }

  function autoRespond() {
    if (!state.demo || !state.running) return;
    const currentIndex = state.sequence.length - 1;
    if (currentIndex <= state.config.n - 1) return;

    ['visual', 'audio'].forEach((type) => {
      if (Math.random() < 0.15) return; // ocasionalmente omitir para parecer humano
      evaluate(type);
    });
  }

  function updateAI() {
    const visualAcc = accuracy(state.stats.visual);
    const audioAcc = accuracy(state.stats.audio);
    const balance = Math.abs(visualAcc - audioAcc);
    const rounds = state.stats.rounds;
    const globalAcc = Math.round((visualAcc + audioAcc) / 2);

    let insight = 'Análisis IA: Usa V y A para marcar coincidencias visuales y auditivas. Mantén un ritmo constante.';
    if (rounds > 6) {
      const focus = balance > 20 ? 'equilibrar ambos canales sensoriales' : 'mantener la precisión en los dos canales';
      if (globalAcc >= 80) {
        insight = `IA Coach: alto desempeño (${globalAcc}%). Considera subir a ${Math.min(4, state.config.n + 1)}-back y prueba un ritmo más rápido.`;
      } else if (globalAcc >= 55) {
        insight = `IA Coach: buen progreso (${globalAcc}%). Intenta ${focus} y estabiliza la respiración antes de responder.`;
      } else {
        insight = `IA Coach: precisión moderada (${globalAcc}%). Reduce la velocidad o baja a ${(state.config.n > 1 ? state.config.n - 1 : 1)}-back para consolidar memoria.`;
      }
    }

    if (state.stats.streak >= 6) {
      insight += ' 🔥 Racha sólida, tu memoria de trabajo está respondiendo al desafío.';
    }

    elements.ai.textContent = insight;
  }

  function toggleRun() {
    state.running = !state.running;
    elements.start.textContent = state.running ? 'Pausar' : 'Iniciar';

    if (state.running) {
      loop();
    } else if (state.timer) {
      clearTimeout(state.timer);
    }
  }

  function loop() {
    if (!state.running) return;
    generateStimulus();
    state.timer = setTimeout(loop, state.config.pace);
  }

  function resetGame() {
    state.sequence = [];
    state.stats = {
      rounds: 0,
      visual: { correct: 0, attempts: 0 },
      audio: { correct: 0, attempts: 0 },
      streak: 0,
      bestStreak: 0
    };
    state.lastAnswered = { visual: -1, audio: -1 };
    state.running = false;
    state.demo = false;
    clearTimeout(state.timer);
    elements.start.textContent = 'Iniciar';
    toggleDemoButton(false);
    elements.timeline.innerHTML = '';
    updateNumbers();
    updateStatus('Listo para empezar. Selecciona el nivel y pulsa iniciar.');
    updateAI();
  }

  function startDemo() {
    resetGame();
    state.config.n = Number(elements.level.value) || defaultConfig.n;
    state.config.pace = Number(elements.pace.value) || defaultConfig.pace;
    state.demo = true;
    updateStatus('Modo demo en marcha. Observa cómo se ejecuta automáticamente.');
    toggleDemoButton(true);
    if (!state.running) {
      toggleRun();
    }
  }

  function stopDemo() {
    state.demo = false;
    toggleDemoButton(false);
    updateStatus('Demo detenida. Puedes continuar manualmente.');
  }

  function bindControls() {
    elements.visualButton.addEventListener('click', () => evaluate('visual'));
    elements.audioButton.addEventListener('click', () => evaluate('audio'));
    elements.start.addEventListener('click', toggleRun);
    elements.reset.addEventListener('click', resetGame);
    elements.demo?.addEventListener('click', () => {
      if (state.demo) {
        stopDemo();
      } else {
        startDemo();
      }
    });

    elements.level.addEventListener('change', (event) => {
      state.config.n = Number(event.target.value);
      state.stats.streak = 0;
      updateNumbers();
      updateAI();
    });

    elements.pace.addEventListener('input', (event) => {
      const pace = Number(event.target.value);
      state.config.pace = pace;
      elements.pace.nextElementSibling.textContent = `${(pace / 1000).toFixed(1)}s`;
    });

    document.addEventListener('keydown', (event) => {
      if (event.key.toLowerCase() === 'v') evaluate('visual');
      if (event.key.toLowerCase() === 'a') evaluate('audio');
      if (event.code === 'Space') {
        event.preventDefault();
        toggleRun();
      }
      if (event.key.toLowerCase() === 'r') resetGame();
    });
  }

  bindControls();
  updateNumbers();
  updateAI();
  updateStatus('Listo para empezar. Selecciona el nivel y pulsa iniciar.');
})();
