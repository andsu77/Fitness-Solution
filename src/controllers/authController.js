const { OAuth2Client } = require("google-auth-library");
const userStore = require("../services/userStore");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verifyAndLogin(req, credential) {
  const ticket = await client.verifyIdToken({ idToken: credential, audience: process.env.GOOGLE_CLIENT_ID });
  const payload = ticket.getPayload();
  const profile = { sub: payload.sub, email: payload.email, name: payload.name, picture: payload.picture };
  userStore.upsertProfile(profile);
  req.session.user = profile;
}

exports.loginPage = (req, res) => {
  if (req.session.user) return res.redirect("/meus-treinos");
  res.render("login", {
    title: "Entrar",
    clientId: process.env.GOOGLE_CLIENT_ID || "",
    error: req.query.erro === "1"
  });
};

// Recebido via fetch/JSON (mantido para compatibilidade com o modo popup).
exports.googleCallback = async (req, res) => {
  const { credential } = req.body || {};

  if (!process.env.GOOGLE_CLIENT_ID) {
    return res.status(500).json({ error: "Login com Google ainda não foi configurado neste site." });
  }
  if (!credential || typeof credential !== "string") {
    return res.status(400).json({ error: "Credencial ausente." });
  }

  try {
    await verifyAndLogin(req, credential);
    res.json({ ok: true });
  } catch (err) {
    console.error("Erro ao validar login do Google:", err);
    res.status(401).json({ error: "Não foi possível validar o login do Google." });
  }
};

// Recebido via POST de formulario (modo redirect do Google) - funciona melhor no celular,
// onde popups sao frequentemente bloqueados ou instaveis.
exports.googleRedirectCallback = async (req, res) => {
  const { credential } = req.body || {};

  if (!process.env.GOOGLE_CLIENT_ID || !credential || typeof credential !== "string") {
    return res.redirect("/entrar?erro=1");
  }

  try {
    await verifyAndLogin(req, credential);
    res.redirect("/meus-treinos");
  } catch (err) {
    console.error("Erro ao validar login do Google (redirect):", err);
    res.redirect("/entrar?erro=1");
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect("/"));
};
