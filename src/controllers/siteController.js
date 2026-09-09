const workouts = require("../models/workoutModel");

exports.home = (req, res) => res.render("home", { title: "Fitness Solution | Treine menos. Evolua mais.", workouts: workouts.getAll() });
exports.goals = (req, res) => res.render("page", { title: "Objetivos", heading: "Escolha seu objetivo", intro: "Conteúdos e treinos organizados para diferentes objetivos.", cards: [
  ["Hipertrofia", "Treinos focados em ganho de massa muscular.", "/treinos/hipertrofia-30-minutos"],
  ["Emagrecimento", "Estratégias de treino para uma rotina corrida.", "/treinos/treino-40-minutos"],
  ["Força", "Treine os principais movimentos com eficiência.", "/treinos/treino-60-minutos"],
  ["Condicionamento", "Sessões práticas para melhorar sua capacidade física.", "/treinos/treino-em-casa"]
] });
exports.exercises = (req, res) => res.render("page", { title: "Exercícios", heading: "Exercícios", intro: "Aprenda a organizar e executar exercícios com segurança.", cards: [["Supino reto","Peito, tríceps e deltoide anterior.","#"],["Agachamento","Quadríceps, glúteos e posteriores.","#"],["Puxada frontal","Costas e bíceps.","#"],["Desenvolvimento","Ombros e tríceps.","#"]] });
exports.articles = (req, res) => res.render("page", { title: "Artigos", heading: "Conteúdo Fitness", intro: "Guias práticos para quem quer treinar melhor mesmo com pouco tempo.", cards: [["Treino de 30 minutos para hipertrofia","Como organizar uma sessão curta e objetiva.","/treinos/hipertrofia-30-minutos"],["Como treinar 3 vezes por semana","Uma estrutura simples para uma rotina corrida.","/treinos/treino-3x-semana"],["Quanto descansar entre séries?","Entenda por que o descanso importa.","/ferramentas"]] });
exports.tools = (req, res) => res.render("tools", { title: "Ferramentas Fitness" });
exports.imc = (req, res) => res.render("calculator", { title: "Calculadora de IMC", type: "imc" });
exports.protein = (req, res) => res.render("calculator", { title: "Calculadora de Proteína", type: "protein" });
exports.calories = (req, res) => res.render("calculator", { title: "Calculadora de Calorias", type: "calories" });
exports.generator = (req, res) => res.render("generator", { title: "Gerador de Treino", result: null });
exports.generateWorkout = (req, res) => {
  const { objective, days, time, level } = req.body;
  const split = days === "3" ? ["Full Body", "Full Body", "Full Body"] : days === "4" ? ["Peito + Tríceps", "Costas + Bíceps", "Pernas", "Ombros + Braços"] : ["Peito + Tríceps", "Costas + Bíceps", "Pernas", "Ombros", "Full Body"];
  const matched = workouts.match({ objective, days, time, level });
  res.render("generator", { title: "Gerador de Treino", result: { objective, days, time, level, split, matchedSlug: matched ? matched.slug : null, matchedTitle: matched ? matched.title : null } });
};
exports.about = (req, res) => res.render("text", { title: "Sobre o Fitness Solution", heading: "Sobre o Fitness Solution", paragraphs: ["O Fitness Solution nasceu para ajudar pessoas com rotinas corridas a encontrar formas práticas de organizar seus treinos.", "O conteúdo é educacional e não substitui avaliação individual de profissionais de educação física, médicos ou nutricionistas."] });
exports.contact = (req, res) => res.render("text", { title: "Contato", heading: "Contato", paragraphs: ["Entre em contato com a equipe do Fitness Solution para dúvidas, sugestões ou correções de conteúdo."] });
exports.privacy = (req, res) => res.render("text", { title: "Política de Privacidade", heading: "Política de Privacidade", paragraphs: ["Esta página deverá ser revisada e complementada antes da publicação comercial, especialmente para explicar cookies, analytics, anúncios e tratamento de dados."] });
exports.terms = (req, res) => res.render("text", { title: "Termos de Uso", heading: "Termos de Uso", paragraphs: ["O conteúdo do Fitness Solution é informativo. O usuário é responsável por avaliar sua condição individual e procurar profissionais qualificados quando necessário."] });
exports.cookies = (req, res) => res.render("text", { title: "Política de Cookies", heading: "Política de Cookies", paragraphs: ["Esta política deverá ser atualizada quando ferramentas de analytics, publicidade e cookies forem adicionadas ao site."] });