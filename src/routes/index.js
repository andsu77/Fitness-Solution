const express = require("express");
const router = express.Router();
const siteController = require("../controllers/siteController");
const workoutController = require("../controllers/workoutController");
const authController = require("../controllers/authController");
const workoutsApiController = require("../controllers/workoutsApiController");

function requireAuth(req, res, next) {
  if (!req.session.user) return res.status(401).json({ error: "Não autenticado." });
  next();
}

router.get("/", siteController.home);
router.get("/treinos", workoutController.index);
router.get("/treinos/:slug", workoutController.show);
router.get("/objetivos", siteController.goals);
router.get("/exercicios", siteController.exercises);
router.get("/artigos", siteController.articles);
router.get("/ferramentas", siteController.tools);
router.get("/ferramentas/imc", siteController.imc);
router.get("/ferramentas/proteina", siteController.protein);
router.get("/ferramentas/calorias", siteController.calories);
router.get("/gerador-de-treino", siteController.generator);
router.post("/gerador-de-treino", siteController.generateWorkout);
router.get("/montar-treino", siteController.builder);
router.get("/meus-treinos", siteController.savedWorkouts);
router.get("/sobre", siteController.about);
router.get("/contato", siteController.contact);
router.get("/politica-de-privacidade", siteController.privacy);
router.get("/termos-de-uso", siteController.terms);
router.get("/politica-de-cookies", siteController.cookies);

router.get("/entrar", authController.loginPage);
router.post("/auth/google", authController.googleCallback);
router.post("/auth/google/callback", authController.googleRedirectCallback);
router.get("/auth/logout", authController.logout);

router.get("/api/meus-treinos", requireAuth, workoutsApiController.list);
router.post("/api/meus-treinos", requireAuth, workoutsApiController.create);
router.delete("/api/meus-treinos/:id", requireAuth, workoutsApiController.remove);

module.exports = router;