const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const siteController = require("../controllers/siteController");
const workoutController = require("../controllers/workoutController");
const authController = require("../controllers/authController");
const workoutsApiController = require("../controllers/workoutsApiController");

function requireAuth(req, res, next) {
  if (!req.session.user) return res.status(401).json({ error: "Não autenticado." });
  next();
}

// Bloqueia POST/DELETE vindos de outro site (defesa extra contra CSRF, alem do
// cookie de sessao ja usar SameSite=Lax). So verifica quando o navegador manda
// o header Origin - requisicoes same-origin sem esse header nao sao bloqueadas.
function sameOriginOnly(req, res, next) {
  const origin = req.get("origin");
  if (origin && origin !== `${req.protocol}://${req.get("host")}`) {
    return res.status(403).json({ error: "Origem não permitida." });
  }
  next();
}

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Muitas tentativas de login. Tente novamente em alguns minutos." }
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Muitas requisições. Tente novamente em alguns minutos." }
});

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
router.post("/auth/google", authLimiter, sameOriginOnly, authController.googleCallback);
router.post("/auth/google/callback", authLimiter, authController.googleRedirectCallback);
router.get("/auth/logout", authController.logout);

router.get("/api/meus-treinos", requireAuth, apiLimiter, workoutsApiController.list);
router.post("/api/meus-treinos", requireAuth, apiLimiter, sameOriginOnly, workoutsApiController.create);
router.delete("/api/meus-treinos/:id", requireAuth, apiLimiter, sameOriginOnly, workoutsApiController.remove);

module.exports = router;
