---
layout: slide
title: "Dual N-Back interactivo"
classes: [dual-nback-slide]
---

<link rel="stylesheet" href="{{site.baseurl}}/assets/css/dual-nback.css">

<div id="dual-nback-app" class="dual-nback-wrapper">
  <div class="dual-nback-top">
    <div>
      <p class="nback-title">Entrena tu memoria de trabajo con Dual N-Back</p>
      <p class="nback-subtitle">Observa la cuadrícula y escucha las letras. Presiona coincidencias visuales (<strong>V</strong>) y auditivas (<strong>A</strong>) que se repitan a n pasos atrás. El panel de IA adapta recomendaciones según tu rendimiento.</p>
      <div class="nback-controls">
        <div class="nback-chip">Nivel n-back:
          <select data-control="level">
            <option value="1">1-back</option>
            <option value="2" selected>2-back</option>
            <option value="3">3-back</option>
            <option value="4">4-back</option>
          </select>
        </div>
        <div class="nback-chip">Ritmo:
          <input type="range" min="1400" max="3200" step="100" value="2400" data-control="pace">
          <span>2.4s</span>
        </div>
        <div class="nback-chip">Visible: <strong>0.95s</strong></div>
      </div>
      <div class="nback-cta">
        <button class="nback-button" data-action="start">Iniciar</button>
        <button class="nback-button secondary" data-action="reset">Reiniciar</button>
        <button class="nback-button ghost" data-action="demo">Modo demo</button>
        <div class="nback-keys">
          <span class="nback-key">V</span>
          <span class="nback-key">A</span>
          <span class="nback-key">Espacio</span>
          <span class="nback-key">R</span>
        </div>
      </div>
    </div>
    <div class="nback-panel">
      <h3>Resumen activo</h3>
      <div class="nback-stats">
        <div class="nback-stat"><label>Rondas</label><strong data-metric="rounds">0</strong></div>
        <div class="nback-stat"><label>Precisión visual</label><strong data-metric="visual">0/0 (0%)</strong><div class="nback-progress"><span data-progress="visual"></span></div></div>
        <div class="nback-stat"><label>Precisión auditiva</label><strong data-metric="audio">0/0 (0%)</strong><div class="nback-progress"><span data-progress="audio"></span></div></div>
        <div class="nback-stat"><label>Racha</label><strong data-metric="streak">0</strong><div class="nback-progress"><span data-progress="streak"></span></div></div>
      </div>
      <div class="nback-alert"><strong>Nivel activo:</strong> <span data-metric="nback">2-back</span></div>
    </div>
  </div>

  <div class="nback-layout">
    <div class="nback-panel">
      <div class="dual-nback-grid">
        {% for i in (1..9) %}
        <div class="nback-cell" aria-label="Celda {{i}}"></div>
        {% endfor %}
      </div>
      <div class="nback-actions">
        <button class="nback-action-button" data-action="visual">Coincide posición (V)</button>
        <button class="nback-action-button" data-action="audio">Coincide letra (A)</button>
      </div>
      <div class="nback-alert" data-status>Listo para empezar. Selecciona el nivel y pulsa iniciar.</div>
    </div>
    <div class="nback-panel">
      <h3>Análisis asistido por IA</h3>
      <p class="nback-subtitle" data-ai>La IA observará tu precisión y rachas para sugerir ajustes de nivel, ritmo y enfoque.</p>
      <div class="nback-status">
        <div class="nback-status-card"><strong>Consejo rápido</strong> Usa respiración 4-2-4 antes de responder para estabilizar la atención.</div>
        <div class="nback-status-card"><strong>Recuerda</strong> Solo cuenta como coincidencia si posición o letra aparece exactamente n rondas atrás.</div>
      </div>
      <div class="nback-alert critical">Tip de seguridad cognitiva: si la precisión cae, baja la velocidad o reduce el n-back para evitar fatiga.</div>
    </div>
  </div>

  <div class="nback-panel">
    <h3>Historial inmediato</h3>
    <div class="nback-timeline" data-timeline></div>
  </div>
</div>

<script src="{{site.baseurl}}/assets/js/dual-nback.js"></script>
