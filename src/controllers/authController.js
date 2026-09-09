const { OAuth2Client } = require("google-auth-library");
const userStore = require("../services/userStore");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.loginPage = (req, res) => {
  if (req.session.user) return res.redirect("/meus-treinos");
  res.render("login", { title: "Entrar", clientId: process.env.GOOGLE_CLIENT_ID || "" });
};

exports.googleCallback = async (req, res) => {
  const { credential } = req.body || {};

  if (!process.env.GOOGLE_CLIENT_ID) {
    return res.status(500).json({ error: "Login com Google ainda não foi configurado neste site." });
  }
  if (!credential || typeof credential !== "string") {
    return res.status(400).json({ error: "Credencial ausente." });
  }

  try {
    const ticket = await client.verifyIdToken({ idToken: credential, audience: process.env.GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();
    const profile = { sub: payload.sub, email: payload.email, name: payload.name, picture: payload.picture };
    userStore.upsertProfile(profile);
    req.session.user = profile;
    res.json({ ok: true });
  } catch (err) {
    console.error("Erro ao validar login do Google:", err);
    res.status(401).json({ error: "Não foi possível validar o login do Google." });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect("/"));
};
