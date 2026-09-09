window.EXERCISE_DEMOS = {
  push: {
    tip: "Mantenha o core ativado, desça controlado e empurre sem travar os cotovelos no topo.",
    svg: '<svg viewBox="0 0 100 140" class="demo-svg" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M50 28L50 80M50 80L38 130M50 80L62 130"/><g class="demo-anim demo-anim-push"><path d="M50 40L75 35M50 40L75 50"/></g></g><circle cx="50" cy="18" r="9" fill="currentColor"/></svg>'
  },
  pull: {
    tip: "Puxe levando os cotovelos para trás e aproxime as escápulas no final do movimento.",
    svg: '<svg viewBox="0 0 100 140" class="demo-svg" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M50 28L50 80M50 80L38 130M50 80L62 130"/><g class="demo-anim demo-anim-pull"><path d="M50 40L25 35M50 40L25 50"/></g></g><circle cx="50" cy="18" r="9" fill="currentColor"/></svg>'
  },
  squat: {
    tip: "Desça com o quadril para trás, joelhos alinhados com os pés, e mantenha a coluna neutra.",
    svg: '<svg viewBox="0 0 100 140" class="demo-svg" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><g class="demo-anim demo-anim-squat"><path d="M50 28L50 78M50 78L36 128M50 78L64 128M50 42L34 36M50 42L66 36"/></g></g><circle cx="50" cy="18" r="9" fill="currentColor"/></svg>'
  },
  lunge: {
    tip: "Desça na vertical, joelho da frente alinhado com o tornozelo, sem ultrapassar muito a ponta do pé.",
    svg: '<svg viewBox="0 0 100 140" class="demo-svg" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M50 28L50 78M50 78L34 96L28 128"/><g class="demo-anim demo-anim-lunge"><path d="M50 78L66 90L62 128"/></g></g><circle cx="50" cy="18" r="9" fill="currentColor"/></svg>'
  },
  hinge: {
    tip: "Dobre pelo quadril mantendo a coluna reta, sentindo alongar o posterior de coxa.",
    svg: '<svg viewBox="0 0 100 140" class="demo-svg" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M50 80L38 128M50 80L62 128"/></g><g class="demo-anim demo-anim-hinge" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M50 80L50 30"/><path d="M50 42L34 60"/><circle cx="50" cy="20" r="9" fill="currentColor"/></g></svg>'
  },
  curl: {
    tip: "Mantenha o cotovelo fixo ao lado do corpo e controle a descida.",
    svg: '<svg viewBox="0 0 100 140" class="demo-svg" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M50 28L50 80M50 80L38 130M50 80L62 130M50 40L68 46"/><path d="M50 40L32 55"/><g class="demo-anim demo-anim-curl"><path d="M32 55L26 70"/></g></g><circle cx="50" cy="18" r="9" fill="currentColor"/></svg>'
  },
  extension: {
    tip: "Mantenha o cotovelo estável e estenda completamente sem travar a articulação com força.",
    svg: '<svg viewBox="0 0 100 140" class="demo-svg" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M50 28L50 80M50 80L38 130M50 80L62 130M50 38L38 20"/><path d="M38 20L68 20"/><g class="demo-anim demo-anim-extension"><path d="M68 20L74 34"/></g></g><circle cx="50" cy="18" r="9" fill="currentColor"/></svg>'
  },
  core: {
    tip: "Mantenha a coluna neutra e o abdômen contraído durante todo o tempo do exercício.",
    svg: '<svg viewBox="0 0 140 100" class="demo-svg" aria-hidden="true"><g class="demo-anim demo-anim-core" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 60L100 60M20 60L20 85M100 60L125 78"/><circle cx="14" cy="60" r="9" fill="currentColor"/></g></svg>'
  },
  raise: {
    tip: "Suba até a altura dos ombros com leve flexão no cotovelo, sem usar embalo.",
    svg: '<svg viewBox="0 0 100 140" class="demo-svg" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M50 28L50 80M50 80L38 130M50 80L62 130"/><g class="demo-anim demo-anim-raise"><path d="M50 40L20 34M50 40L80 34"/></g></g><circle cx="50" cy="18" r="9" fill="currentColor"/></svg>'
  },
  cardio: {
    tip: "Mantenha um ritmo constante e respire de forma controlada durante todo o exercício.",
    svg: '<svg viewBox="0 0 100 140" class="demo-svg" aria-hidden="true"><g class="demo-anim demo-anim-cardio" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M50 28L46 78M46 78L30 90L24 120M46 78L64 88L70 118M50 40L68 30M50 40L34 48"/><circle cx="50" cy="18" r="9" fill="currentColor"/></g></svg>'
  }
};

(function () {
  var panel = null;

  function ensurePanel() {
    if (panel) return panel;
    panel = document.createElement("div");
    panel.className = "demo-panel";
    panel.id = "exerciseDemoPanel";
    panel.hidden = true;
    panel.innerHTML =
      '<div class="demo-panel-inner">' +
        '<button type="button" class="demo-close" aria-label="Fechar">✕</button>' +
        '<div class="demo-media"></div>' +
        '<h3 class="demo-title"></h3>' +
        '<p class="demo-tip"></p>' +
      "</div>";
    document.body.appendChild(panel);
    panel.querySelector(".demo-close").addEventListener("click", closeDemo);
    panel.addEventListener("click", function (e) { if (e.target === panel) closeDemo(); });
    return panel;
  }

  function closeDemo() {
    if (!panel) return;
    panel.classList.remove("open");
    setTimeout(function () { panel.hidden = true; }, 250);
  }

  window.openExerciseDemo = function (name, pattern) {
    var demo = window.EXERCISE_DEMOS[pattern];
    if (!demo) return;
    var p = ensurePanel();
    p.querySelector(".demo-media").innerHTML = demo.svg;
    p.querySelector(".demo-title").textContent = name;
    p.querySelector(".demo-tip").textContent = demo.tip;
    p.hidden = false;
    requestAnimationFrame(function () { p.classList.add("open"); });
  };

  document.addEventListener("click", function (e) {
    var icon = e.target.closest ? e.target.closest(".ex-icon") : null;
    if (!icon) return;
    var container = icon.closest("[data-pattern]");
    if (!container) return;
    e.stopPropagation();
    e.preventDefault();
    var nameEl = container.querySelector(".ex-name");
    var name = nameEl ? nameEl.textContent.trim() : "Exercício";
    window.openExerciseDemo(name, container.getAttribute("data-pattern"));
  }, true);
})();
