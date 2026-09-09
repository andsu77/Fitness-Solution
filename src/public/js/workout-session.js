window.initWorkoutDay = function (dayBlock) {
  if (!dayBlock || dayBlock.__sessionInit) return;
  dayBlock.__sessionInit = true;

  var icons = window.EXERCISE_ICONS || {};
  dayBlock.querySelectorAll(".exercise-row[data-pattern]").forEach(function (row) {
    var icon = icons[row.getAttribute("data-pattern")];
    var nameEl = row.querySelector("strong");
    if (icon && nameEl && !nameEl.querySelector("svg")) {
      nameEl.insertAdjacentHTML("afterbegin", icon);
    }
  });

  var finishBtn = dayBlock.querySelector(".finish-workout-btn");
  var summaryEl = dayBlock.querySelector(".session-summary");
  var bodyweightInput = dayBlock.querySelector(".session-bodyweight");
  if (!finishBtn || !summaryEl) return;

  function normalizeDashes(s) { return String(s || "").replace(/[–—]/g, "-"); }
  function avgNums(str) {
    var nums = (normalizeDashes(str).match(/\d+(\.\d+)?/g) || []).map(Number);
    if (!nums.length) return 0;
    return nums.reduce(function (a, b) { return a + b; }, 0) / nums.length;
  }

  finishBtn.addEventListener("click", function () {
    var rows = dayBlock.querySelectorAll(".exercise-row[data-pattern]");
    var doneCount = 0, totalCount = rows.length, totalVolume = 0, totalSeconds = 0;
    var bars = [];

    rows.forEach(function (row) {
      var checkbox = row.querySelector(".ex-done");
      if (!checkbox || !checkbox.checked) return;
      doneCount++;

      var sets = parseInt(row.getAttribute("data-sets"), 10) || 1;
      var repsText = row.getAttribute("data-reps") || "";
      var restText = row.getAttribute("data-rest") || "";
      var weightInput = row.querySelector(".ex-weight");
      var weight = parseFloat(weightInput && weightInput.value) || 0;
      var nameEl = row.querySelector("strong");
      var name = nameEl ? nameEl.textContent.trim() : "Exercício";

      var strippedReps = normalizeDashes(repsText).replace(/[\d.\-\s/cada]/g, "");
      var isTime = /min|s/i.test(strippedReps);
      var restSeconds = avgNums(restText) * (/min/i.test(restText) ? 60 : 1) || 45;
      var repValue = avgNums(repsText) || (isTime ? 30 : 10);

      var perSetSeconds, reps;
      if (isTime) {
        perSetSeconds = /min/i.test(repsText) ? repValue * 60 : repValue;
        reps = 1;
      } else {
        perSetSeconds = 35;
        reps = repValue;
      }

      var volume = weight * reps * sets;
      totalVolume += volume;
      totalSeconds += sets * (perSetSeconds + restSeconds);
      bars.push({ name: name, volume: volume });
    });

    if (doneCount === 0) {
      summaryEl.hidden = false;
      summaryEl.innerHTML = '<p class="notice">Marque ao menos um exercício como concluído para ver seu resumo.</p>';
      return;
    }

    var bodyweight = parseFloat(bodyweightInput && bodyweightInput.value) || 70;
    var minutes = totalSeconds / 60;
    var MET = 6;
    var calories = Math.round((MET * 3.5 * bodyweight / 200) * minutes);
    var maxVolume = Math.max.apply(null, bars.map(function (b) { return b.volume; }).concat([1]));

    var barsHtml = bars
      .filter(function (b) { return b.volume > 0; })
      .sort(function (a, b) { return b.volume - a.volume; })
      .map(function (b) {
        var pct = Math.round((b.volume / maxVolume) * 100);
        return '<div class="session-bar-row"><span class="session-bar-label">' + b.name + '</span><div class="session-bar-track"><div class="session-bar-fill" style="width:' + pct + '%"></div></div><span class="session-bar-value">' + Math.round(b.volume) + ' kg</span></div>';
      }).join("");

    summaryEl.hidden = false;
    summaryEl.innerHTML =
      "<h3>Resumo do treino</h3>" +
      '<div class="session-stats">' +
        '<div class="session-stat"><b>' + doneCount + "/" + totalCount + '</b><span>Exercícios feitos</span></div>' +
        '<div class="session-stat"><b>' + Math.round(totalVolume) + ' kg</b><span>Peso total levantado</span></div>' +
        '<div class="session-stat"><b>~' + Math.round(minutes) + ' min</b><span>Duração estimada</span></div>' +
        '<div class="session-stat"><b>~' + calories + ' kcal</b><span>Calorias estimadas</span></div>' +
      "</div>" +
      (barsHtml ? '<div class="session-bars">' + barsHtml + "</div>" : "") +
      '<p class="session-disclaimer">Estimativa baseada no peso informado, séries, repetições e descanso — não substitui um monitor cardíaco ou avaliação profissional.</p>';
  });
};
