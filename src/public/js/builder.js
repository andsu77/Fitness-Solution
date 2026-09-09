(function(){
  var library = window.EXERCISE_LIBRARY;
  var typeStep = document.getElementById("typeStep");
  var builderStep = document.getElementById("builderStep");
  if (!library || !typeStep || !builderStep) return;

  var STORAGE_KEY = "meusTreinosCustom";

  var state = {
    type: null,
    activeCategory: null,
    activeDayIndex: 0,
    days: [{ name: "Dia 1", exercises: [] }]
  };

  var builderTip = document.getElementById("builderTip");
  var daysList = document.getElementById("daysList");
  var addDayBtn = document.getElementById("addDayBtn");
  var currentDayTitle = document.getElementById("currentDayTitle");
  var currentDayExercises = document.getElementById("currentDayExercises");
  var categoryTabs = document.getElementById("categoryTabs");
  var exerciseGrid = document.getElementById("exerciseGrid");
  var workoutName = document.getElementById("workoutName");
  var workoutObjective = document.getElementById("workoutObjective");
  var workoutNotes = document.getElementById("workoutNotes");
  var saveBtn = document.getElementById("saveWorkoutBtn");
  var saveMsg = document.getElementById("saveMsg");

  function currentPool(){ return library[state.type]; }

  function selectType(type){
    state.type = type;
    state.activeCategory = currentPool().categories[0].key;
    typeStep.querySelectorAll(".type-card").forEach(function(card){
      card.classList.toggle("active", card.getAttribute("data-type") === type);
    });
    builderTip.textContent = currentPool().tip;
    builderStep.hidden = false;
    renderCategoryTabs();
    renderExerciseGrid();
    renderDays();
    renderCurrentDay();
  }

  typeStep.querySelectorAll(".type-card").forEach(function(card){
    card.addEventListener("click", function(){ selectType(card.getAttribute("data-type")); });
  });

  function renderCategoryTabs(){
    categoryTabs.innerHTML = "";
    currentPool().categories.forEach(function(cat){
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "category-tab" + (cat.key === state.activeCategory ? " active" : "");
      btn.textContent = cat.label;
      btn.addEventListener("click", function(){
        state.activeCategory = cat.key;
        renderCategoryTabs();
        renderExerciseGrid();
      });
      categoryTabs.appendChild(btn);
    });
  }

  function renderExerciseGrid(){
    exerciseGrid.innerHTML = "";
    var category = currentPool().categories.find(function(c){ return c.key === state.activeCategory; });
    if (!category) return;
    var icons = window.EXERCISE_ICONS || {};
    category.exercises.forEach(function(exDef){
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "exercise-chip";
      chip.innerHTML = (icons[exDef.pattern] || "") + "<span>" + exDef.name + "</span>";
      chip.addEventListener("click", function(){
        addExerciseToActiveDay(exDef);
      });
      exerciseGrid.appendChild(chip);
    });
  }

  function addExerciseToActiveDay(exDef){
    var day = state.days[state.activeDayIndex];
    day.exercises.push({ name: exDef.name, sets: exDef.sets, reps: exDef.reps, rest: exDef.rest, pattern: exDef.pattern });
    renderCurrentDay();
  }

  function removeExercise(exIndex){
    state.days[state.activeDayIndex].exercises.splice(exIndex, 1);
    renderCurrentDay();
  }

  function updateExerciseField(exIndex, field, value){
    state.days[state.activeDayIndex].exercises[exIndex][field] = value;
  }

  function renderDays(){
    daysList.innerHTML = "";
    state.days.forEach(function(day, index){
      var pill = document.createElement("button");
      pill.type = "button";
      pill.className = "day-pill" + (index === state.activeDayIndex ? " active" : "");
      pill.textContent = day.name;
      pill.addEventListener("click", function(){
        state.activeDayIndex = index;
        renderDays();
        renderCurrentDay();
      });
      if (state.days.length > 1){
        var remove = document.createElement("span");
        remove.textContent = "✕";
        remove.addEventListener("click", function(e){
          e.stopPropagation();
          state.days.splice(index, 1);
          if (state.activeDayIndex >= state.days.length) state.activeDayIndex = state.days.length - 1;
          renderDays();
          renderCurrentDay();
        });
        pill.appendChild(remove);
      }
      daysList.appendChild(pill);
    });
  }

  addDayBtn.addEventListener("click", function(){
    state.days.push({ name: "Dia " + (state.days.length + 1), exercises: [] });
    state.activeDayIndex = state.days.length - 1;
    renderDays();
    renderCurrentDay();
  });

  function renderCurrentDay(){
    var day = state.days[state.activeDayIndex];
    currentDayTitle.textContent = day.name;
    currentDayExercises.innerHTML = "";

    if (day.exercises.length === 0){
      var empty = document.createElement("p");
      empty.className = "builder-empty-day";
      empty.textContent = "Nenhum exercício ainda. Clique em um exercício abaixo para adicionar a este dia.";
      currentDayExercises.appendChild(empty);
      return;
    }

    var header = document.createElement("div");
    header.className = "builder-exercise-row builder-exercise-head";
    header.innerHTML = "<span>#</span><span>Exercício</span><span>Séries</span><span>Repetições</span><span>Descanso</span><span></span>";
    currentDayExercises.appendChild(header);

    day.exercises.forEach(function(exItem, index){
      var row = document.createElement("div");
      row.className = "builder-exercise-row";

      var num = document.createElement("span");
      num.textContent = index + 1;

      var name = document.createElement("strong");
      var icons = window.EXERCISE_ICONS || {};
      name.innerHTML = (icons[exItem.pattern] || "") + "<span>" + exItem.name + "</span>";

      var setsInput = document.createElement("input");
      setsInput.type = "text";
      setsInput.value = exItem.sets;
      setsInput.addEventListener("input", function(){ updateExerciseField(index, "sets", setsInput.value); });

      var repsInput = document.createElement("input");
      repsInput.type = "text";
      repsInput.value = exItem.reps;
      repsInput.addEventListener("input", function(){ updateExerciseField(index, "reps", repsInput.value); });

      var restInput = document.createElement("input");
      restInput.type = "text";
      restInput.value = exItem.rest;
      restInput.addEventListener("input", function(){ updateExerciseField(index, "rest", restInput.value); });

      var removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "builder-remove-btn";
      removeBtn.textContent = "✕";
      removeBtn.addEventListener("click", function(){ removeExercise(index); });

      row.appendChild(num);
      row.appendChild(name);
      row.appendChild(setsInput);
      row.appendChild(repsInput);
      row.appendChild(restInput);
      row.appendChild(removeBtn);
      currentDayExercises.appendChild(row);
    });
  }

  saveBtn.addEventListener("click", function(){
    var name = workoutName.value.trim();
    var totalExercises = state.days.reduce(function(sum, d){ return sum + d.exercises.length; }, 0);

    if (!name){
      saveMsg.textContent = "Dê um nome para o seu treino antes de salvar.";
      saveMsg.className = "builder-save-msg error";
      workoutName.focus();
      return;
    }
    if (totalExercises === 0){
      saveMsg.textContent = "Adicione pelo menos um exercício antes de salvar.";
      saveMsg.className = "builder-save-msg error";
      return;
    }

    var workout = {
      id: "w" + Date.now(),
      name: name,
      type: state.type,
      objective: workoutObjective.value,
      notes: workoutNotes.value.trim(),
      createdAt: new Date().toISOString(),
      days: state.days.filter(function(d){ return d.exercises.length > 0; })
    };

    var saved = [];
    try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch (e) { saved = []; }
    saved.push(workout);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(saved)); } catch (e) {}

    saveMsg.textContent = "Treino salvo! Redirecionando para Meus Treinos...";
    saveMsg.className = "builder-save-msg success";
    setTimeout(function(){ window.location.href = "/meus-treinos"; }, 900);
  });
})();
