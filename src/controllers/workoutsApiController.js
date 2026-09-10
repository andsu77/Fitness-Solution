const userStore = require("../services/userStore");

const MAX_DAYS = 14;
const MAX_EXERCISES_PER_DAY = 30;
const MAX_TEXT = 200;

function clampText(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function sanitizeWorkout(input) {
  if (!input || typeof input !== "object") return null;
  const name = clampText(input.name, 60);
  if (!name) return null;
  if (!Array.isArray(input.days) || input.days.length === 0 || input.days.length > MAX_DAYS) return null;

  const days = input.days.slice(0, MAX_DAYS).map(day => {
    const exercises = Array.isArray(day && day.exercises)
      ? day.exercises.slice(0, MAX_EXERCISES_PER_DAY).map(ex => ({
          name: clampText(ex && ex.name, MAX_TEXT),
          sets: clampText(ex && ex.sets, 20),
          reps: clampText(ex && ex.reps, 20),
          rest: clampText(ex && ex.rest, 20),
          pattern: clampText(ex && ex.pattern, 30)
        })).filter(ex => ex.name)
      : [];
    return { name: clampText(day && day.name, MAX_TEXT) || "Dia", exercises };
  }).filter(day => day.exercises.length > 0);

  if (days.length === 0) return null;

  return {
    id: clampText(input.id, 60) || ("w" + Date.now()),
    name,
    type: input.type === "casa" ? "casa" : "academia",
    objective: clampText(input.objective, 40) || "Hipertrofia",
    notes: clampText(input.notes, 500),
    createdAt: typeof input.createdAt === "string" ? input.createdAt : new Date().toISOString(),
    days
  };
}

exports.list = (req, res) => {
  res.json({ workouts: userStore.getWorkouts(req.session.user.sub) });
};

exports.create = (req, res) => {
  const workout = sanitizeWorkout(req.body);
  if (!workout) {
    return res.status(400).json({ error: "Dados de treino inválidos." });
  }
  const workouts = userStore.saveWorkout(req.session.user.sub, workout);
  res.json({ workouts });
};

exports.remove = (req, res) => {
  const workouts = userStore.deleteWorkout(req.session.user.sub, req.params.id);
  res.json({ workouts });
};
