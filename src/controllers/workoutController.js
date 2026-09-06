const workouts = require("../models/workoutModel");
exports.index = (req, res) => res.render("workouts", { title: "Treinos", workouts: workouts.getAll() });
exports.show = (req, res) => {
  const workout = workouts.find(req.params.slug);
  if (!workout) return res.status(404).render("404", { title: "Treino não encontrado" });
  res.render("workout", { title: workout.title, workout });
};