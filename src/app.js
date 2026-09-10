const express = require("express");
const session = require("express-session");
const helmet = require("helmet");
const path = require("path");
const routes = require("./routes");

const app = express();

app.set("trust proxy", 1);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

if (!process.env.SESSION_SECRET) {
  console.warn("AVISO: SESSION_SECRET não definido no .env — usando um valor de desenvolvimento. Configure um valor forte em produção.");
}

app.use(helmet({
  // Google Fonts, AdSense, cdnjs (html2canvas/jsPDF) e o botao "Entrar com o Google"
  // sao servicos de terceiros legitimos usados pelo site - a politica abaixo os
  // permite explicitamente em vez de deixar tudo aberto. Comeca em modo
  // "report-only": nada e bloqueado ainda, so registrado no console do navegador,
  // para confirmar que nao quebra nada antes de aplicar de verdade.
  contentSecurityPolicy: {
    reportOnly: true,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://cdnjs.cloudflare.com",
        "https://pagead2.googlesyndication.com",
        "https://accounts.google.com",
        "https://www.google.com",
        "https://www.gstatic.com",
        "https://apis.google.com"
      ],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://accounts.google.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://accounts.google.com", "https://*.googlesyndication.com", "https://*.doubleclick.net", "https://*.google.com"],
      frameSrc: ["'self'", "https://accounts.google.com", "https://*.googlesyndication.com", "https://*.doubleclick.net"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      frameAncestors: ["'self'"]
    }
  },
  // Bloquearia recursos de terceiros sem cabecalhos CORS proprios (fontes, ads,
  // scripts do cdnjs) - manter desligado para nao quebrar essas integracoes.
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" }
}));

app.use(express.urlencoded({ extended: true, limit: "100kb" }));
app.use(express.json({ limit: "100kb" }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: process.env.SESSION_SECRET || "fitness-solution-dev-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
  }
}));

app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});

app.use("/", routes);

app.use((req, res) => res.status(404).render("404", { title: "Página não encontrada" }));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render("404", { title: "Algo deu errado" });
});

module.exports = app;
