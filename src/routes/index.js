const express = require("express");
const router = express.Router();
const siteController = require("../controllers/siteController");
const workoutController = require("../controllers/workoutController");

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
router.get("/sobre", siteController.about);
router.get("/contato", siteController.contact);
router.get("/politica-de-privacidade", siteController.privacy);
router.get("/termos-de-uso", siteController.terms);
router.get("/politica-de-cookies", siteController.cookies);

module.exports = router;