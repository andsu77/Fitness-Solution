const userStore = require("../services/userStore");

exports.list = (req, res) => {
  res.json({ workouts: userStore.getWorkouts(req.session.user.sub) });
};

exports.create = (req, res) => {
  const workout = req.body;
  if (!workout || typeof workout.name !== "string" || !workout.name.trim() || !Array.isArray(workout.days)) {
    return res.status(400).json({ error: "Dados de treino inválidos." });
  }
  workout.id = workout.id || ("w" + Date.now());
  workout.createdAt = workout.createdAt || new Date().toISOString();
  const workouts = userStore.saveWorkout(req.session.user.sub, workout);
  res.json({ workouts });
};

exports.remove = (req, res) => {
  const workouts = userStore.deleteWorkout(req.session.user.sub, req.params.id);
  res.json({ workouts });
};
