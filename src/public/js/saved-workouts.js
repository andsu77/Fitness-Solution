(function(){
  var grid = document.getElementById("savedGrid");
  var emptyState = document.getElementById("emptyState");
  var loadingState = document.getElementById("loadingState");
  var modal = document.getElementById("detailModal");
  var detailContent = document.getElementById("detailContent");
  var closeModal = document.getElementById("closeModal");
  if (!grid) return;

  var STORAGE_KEY = "meusTreinosCustom";
  var isLoggedIn = !!window.CURRENT_USER;

  function loadLocal(){
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch (e) { return []; }
  }
  function saveLocal(list){
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch (e) {}
  }
  function getWorkouts(){
    if (isLoggedIn){
      return fetch("/api/meus-treinos")
        .then(function(r){ return r.json(); })
        .then(function(data){ return data.workouts || []; })
        .catch(function(){ return []; });
    }
    return Promise.resolve(loadLocal());
  }
  function removeWorkout(id){
    if (isLoggedIn){
      return fetch("/api/meus-treinos/" + encodeURIComponent(id), { method: "DELETE" }).then(function(r){ return r.json(); });
    }
    saveLocal(loadLocal().filter(function(w){ return w.id !== id; }));
    return Promise.resolve();
  }
  function formatDate(iso){
    try { return new Date(iso).toLocaleDateString("pt-BR"); } catch (e) { return ""; }
  }
  function typeLabel(type){
    return type === "casa" ? "Casa / Calistenia" : "Academia";
  }
  function countExercises(workout){
    return workout.days.reduce(function(sum, d){ return sum + d.exercises.length; }, 0);
  }
  function escapeHtml(str){
    var div = document.createElement("div");
    div.textContent = String(str == null ? "" : str);
    return div.innerHTML;
  }

  function render(){
    if (loadingState) loadingState.hidden = false;
    getWorkouts().then(function(workouts){
    if (loadingState) loadingState.hidden = true;
    grid.innerHTML = "";

    if (workouts.length === 0){
      emptyState.hidden = false;
      return;
    }
    emptyState.hidden = true;

    workouts.slice().reverse().forEach(function(workout){
      var card = document.createElement("div");
      card.className = "card saved-card";

      var badges = document.createElement("div");
      badges.innerHTML = "<span class=\"badge\">" + escapeHtml(typeLabel(workout.type)) + "</span><span class=\"badge\">" + escapeHtml(workout.objective) + "</span>";

      var title = document.createElement("h3");
      title.textContent = workout.name;

      var meta = document.createElement("p");
      meta.textContent = workout.days.length + " dia(s) · " + countExercises(workout) + " exercícios · salvo em " + formatDate(workout.createdAt);

      var actions = document.createElement("div");
      actions.className = "saved-card-actions";

      var viewBtn = document.createElement("button");
      viewBtn.type = "button";
      viewBtn.className = "btn-secondary btn-small";
      viewBtn.textContent = "VER TREINO";
      viewBtn.addEventListener("click", function(){ openDetail(workout); });

      var deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "saved-delete-btn";
      deleteBtn.textContent = "Excluir";
      deleteBtn.addEventListener("click", function(){
        if (!confirm("Excluir o treino \"" + workout.name + "\"? Essa ação não pode ser desfeita.")) return;
        removeWorkout(workout.id).then(render);
      });

      actions.appendChild(viewBtn);
      actions.appendChild(deleteBtn);

      card.appendChild(badges);
      card.appendChild(title);
      card.appendChild(meta);
      card.appendChild(actions);
      grid.appendChild(card);
    });
    });
  }

  function buildExportDoc(workout){
    var html = "<div class=\"export-block export-header\"><div class=\"export-brand\"><svg class=\"export-halter\" viewBox=\"0 0 100 40\" aria-hidden=\"true\"><rect x=\"2\" y=\"10\" width=\"10\" height=\"20\" rx=\"3\"></rect><rect x=\"14\" y=\"14\" width=\"6\" height=\"12\" rx=\"2\"></rect><rect x=\"22\" y=\"17\" width=\"56\" height=\"6\" rx=\"3\"></rect><rect x=\"80\" y=\"14\" width=\"6\" height=\"12\" rx=\"2\"></rect><rect x=\"88\" y=\"10\" width=\"10\" height=\"20\" rx=\"3\"></rect></svg><span>FITNESS <b>SOLUTION</b></span></div>";
    html += "<h1>" + escapeHtml(workout.name) + "</h1>";
    html += "<div class=\"export-meta\"><span>" + escapeHtml(workout.objective) + "</span><span>" + escapeHtml(typeLabel(workout.type)) + "</span></div></div>";

    workout.days.forEach(function(day, index){
      html += "<div class=\"export-block export-day\"><div class=\"export-day-title\"><span class=\"export-badge\">0" + (index + 1) + "</span><div><h2>" + escapeHtml(day.name) + "</h2><p>" + day.exercises.length + " exercícios</p></div></div>";
      html += "<table class=\"export-table\"><thead><tr><th>#</th><th>Exercício</th><th>Séries × Repetições</th><th>Descanso</th></tr></thead><tbody>";
      day.exercises.forEach(function(ex, i){
        html += "<tr><td>" + (i + 1) + "</td><td>" + escapeHtml(ex.name) + "</td><td>" + escapeHtml(ex.sets) + "x" + escapeHtml(ex.reps) + "</td><td>" + escapeHtml(ex.rest) + "</td></tr>";
      });
      html += "</tbody></table></div>";
    });

    html += "<div class=\"export-block export-footer\"><p>Treino personalizado criado em Fitness Solution — não substitui orientação de um profissional de educação física.</p><p class=\"export-date\">" + new Date().toLocaleDateString("pt-BR") + "</p></div>";
    return html;
  }

  function openDetail(workout){
    var html = "<div class=\"export-buttons\"><button type=\"button\" class=\"btn detail-export-pdf\">BAIXAR EM PDF</button><button type=\"button\" class=\"btn-secondary detail-export-img\">SALVAR COMO IMAGEM</button></div>";
    html += "<p class=\"eyebrow\">" + escapeHtml(workout.objective) + " · " + escapeHtml(typeLabel(workout.type)) + "</p>";
    html += "<h2>" + escapeHtml(workout.name) + "</h2>";
    if (workout.notes) html += "<p class=\"lead\">" + escapeHtml(workout.notes) + "</p>";

    workout.days.forEach(function(day, index){
      html += "<div class=\"day-block\"><div class=\"day-title\"><span>0" + (index + 1) + "</span><div><h2>" + escapeHtml(day.name) + "</h2><p>" + day.exercises.length + " exercícios</p></div></div>";
      html += "<div class=\"exercise-table\"><div class=\"exercise-row exercise-head\"><span>#</span><span>Exercício</span><span>Séries × repetições</span><span>Descanso</span><span>Peso</span><span>✓</span></div>";
      day.exercises.forEach(function(ex, i){
        html += "<div class=\"exercise-row\" data-pattern=\"" + escapeHtml(ex.pattern || "") + "\" data-sets=\"" + escapeHtml(ex.sets) + "\" data-reps=\"" + escapeHtml(ex.reps) + "\" data-rest=\"" + escapeHtml(ex.rest) + "\">";
        html += "<span>" + (i + 1) + "</span><strong><span class=\"ex-name\">" + escapeHtml(ex.name) + "</span></strong><span>" + escapeHtml(ex.sets) + "x" + escapeHtml(ex.reps) + "</span><span>" + escapeHtml(ex.rest) + "</span>";
        html += "<input type=\"number\" class=\"ex-weight\" placeholder=\"kg\" step=\"0.5\" min=\"0\">";
        html += "<input type=\"checkbox\" class=\"ex-done\">";
        html += "</div>";
      });
      html += "</div>";
      html += "<div class=\"day-session-actions\"><label class=\"session-weight-label\">Seu peso (kg) <input type=\"number\" class=\"session-bodyweight\" value=\"70\" min=\"30\" max=\"250\"></label><span class=\"session-timer\" aria-live=\"polite\">00:00</span><button type=\"button\" class=\"btn-secondary btn-small start-workout-btn\">INICIAR TREINO</button><button type=\"button\" class=\"btn-secondary btn-small finish-workout-btn\">FINALIZAR TREINO</button></div>";
      html += "<div class=\"session-summary\" hidden></div>";
      html += "</div>";
    });

    detailContent.innerHTML = html;
    modal.hidden = false;
    detailContent.querySelectorAll(".day-block").forEach(function(dayBlock){
      if (window.initWorkoutDay) window.initWorkoutDay(dayBlock);
    });

    var oldExportDoc = document.getElementById("customExportDoc");
    if (oldExportDoc) oldExportDoc.remove();
    var exportDoc = document.createElement("div");
    exportDoc.id = "customExportDoc";
    exportDoc.className = "export-doc";
    exportDoc.innerHTML = buildExportDoc(workout);
    document.body.appendChild(exportDoc);

    var slug = "treino-" + workout.id;
    var pdfBtn = detailContent.querySelector(".detail-export-pdf");
    var imgBtn = detailContent.querySelector(".detail-export-img");

    if (pdfBtn) pdfBtn.addEventListener("click", function(){
      if (!window.WorkoutExport) return;
      var original = pdfBtn.textContent;
      pdfBtn.disabled = true; pdfBtn.textContent = "Gerando PDF...";
      window.WorkoutExport.toPdf(exportDoc, slug)
        .catch(function(){ alert("Não foi possível gerar o PDF agora. Tente novamente."); })
        .finally(function(){ pdfBtn.disabled = false; pdfBtn.textContent = original; });
    });

    if (imgBtn) imgBtn.addEventListener("click", function(){
      if (!window.WorkoutExport) return;
      var original = imgBtn.textContent;
      imgBtn.disabled = true; imgBtn.textContent = "Gerando imagem...";
      window.WorkoutExport.toImage(exportDoc, slug)
        .catch(function(){ alert("Não foi possível gerar a imagem agora. Tente novamente."); })
        .finally(function(){ imgBtn.disabled = false; imgBtn.textContent = original; });
    });
  }

  closeModal.addEventListener("click", function(){ modal.hidden = true; });
  modal.addEventListener("click", function(e){ if (e.target === modal) modal.hidden = true; });

  render();
})();
