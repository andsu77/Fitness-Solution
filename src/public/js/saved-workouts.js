(function(){
  var grid = document.getElementById("savedGrid");
  var emptyState = document.getElementById("emptyState");
  var modal = document.getElementById("detailModal");
  var detailContent = document.getElementById("detailContent");
  var closeModal = document.getElementById("closeModal");
  if (!grid) return;

  var STORAGE_KEY = "meusTreinosCustom";

  function loadWorkouts(){
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch (e) { return []; }
  }
  function saveWorkouts(list){
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch (e) {}
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
    var workouts = loadWorkouts();
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
        var updated = loadWorkouts().filter(function(w){ return w.id !== workout.id; });
        saveWorkouts(updated);
        render();
      });

      actions.appendChild(viewBtn);
      actions.appendChild(deleteBtn);

      card.appendChild(badges);
      card.appendChild(title);
      card.appendChild(meta);
      card.appendChild(actions);
      grid.appendChild(card);
    });
  }

  function openDetail(workout){
    var html = "<p class=\"eyebrow\">" + escapeHtml(workout.objective) + " · " + escapeHtml(typeLabel(workout.type)) + "</p>";
    html += "<h2>" + escapeHtml(workout.name) + "</h2>";
    if (workout.notes) html += "<p class=\"lead\">" + escapeHtml(workout.notes) + "</p>";

    workout.days.forEach(function(day, index){
      html += "<div class=\"day-block\"><div class=\"day-title\"><span>0" + (index + 1) + "</span><div><h2>" + escapeHtml(day.name) + "</h2><p>" + day.exercises.length + " exercícios</p></div></div>";
      html += "<div class=\"exercise-table\"><div class=\"exercise-row exercise-head\"><span>#</span><span>Exercício</span><span>Séries × repetições</span><span>Descanso</span></div>";
      day.exercises.forEach(function(ex, i){
        html += "<div class=\"exercise-row\"><span>" + (i + 1) + "</span><strong>" + escapeHtml(ex.name) + "</strong><span>" + escapeHtml(ex.sets) + "x" + escapeHtml(ex.reps) + "</span><span>" + escapeHtml(ex.rest) + "</span></div>";
      });
      html += "</div></div>";
    });

    detailContent.innerHTML = html;
    modal.hidden = false;
  }

  closeModal.addEventListener("click", function(){ modal.hidden = true; });
  modal.addEventListener("click", function(e){ if (e.target === modal) modal.hidden = true; });

  render();
})();
