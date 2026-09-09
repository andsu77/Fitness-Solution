const plans = [
  {
    slug:"hipertrofia-30-minutos",
    title:"Hipertrofia em 30 minutos",
    time:"30 min", level:"Intermediário", objective:"Hipertrofia", location:"academia",
    days:[
      {name:"Dia 1 — Peito + Tríceps", exercises:[
        ["Supino reto","3x6–10","60–90s","push"],["Supino inclinado com halteres","3x8–12","60–90s","push"],["Crucifixo na máquina","2x10–15","45–60s","raise"],["Tríceps francês","3x8–12","60s","extension"],["Tríceps pulley","2x10–15","45–60s","extension"]
      ]},
      {name:"Dia 2 — Costas + Bíceps", exercises:[
        ["Puxada frontal","3x8–12","60–90s","pull"],["Remada baixa","3x8–12","60–90s","pull"],["Remada unilateral","2x10–12","60s","pull"],["Rosca direta","3x8–12","60s","curl"],["Rosca martelo","2x10–12","45–60s","curl"]
      ]},
      {name:"Dia 3 — Pernas", exercises:[
        ["Agachamento","3x6–10","90s","squat"],["Leg press","3x8–12","90s","squat"],["Mesa flexora","2x10–15","60s","hinge"],["Cadeira extensora","2x10–15","60s","squat"],["Panturrilha em pé","2x12–20","45–60s","raise"]
      ]},
      {name:"Dia 4 — Ombros + Braços", exercises:[
        ["Desenvolvimento com halteres","3x8–12","60–90s","push"],["Elevação lateral","3x10–15","45–60s","raise"],["Crucifixo inverso","2x10–15","45–60s","raise"],["Rosca direta","2x8–12","60s","curl"],["Tríceps francês","2x8–12","60s","extension"]
      ]}
    ]
  },
  {
    slug:"treino-40-minutos",
    title:"Treino eficiente de 40 minutos",
    time:"40 min", level:"Iniciante", objective:"Condicionamento", location:"academia",
    days:[
      {name:"Dia 1 — Peito + Tríceps", exercises:[["Supino máquina","3x8–12","60–90s","push"],["Supino inclinado","3x8–12","60–90s","push"],["Tríceps francês","3x10–12","60s","extension"],["Tríceps pulley","2x10–15","45–60s","extension"]]},
      {name:"Dia 2 — Costas + Bíceps", exercises:[["Puxada frontal","3x8–12","60–90s","pull"],["Remada máquina","3x8–12","60–90s","pull"],["Rosca direta","3x10–12","60s","curl"],["Rosca martelo","2x10–12","45–60s","curl"]]},
      {name:"Dia 3 — Pernas", exercises:[["Leg press","3x8–12","90s","squat"],["Cadeira extensora","3x10–15","60s","squat"],["Mesa flexora","3x10–15","60s","hinge"],["Panturrilha","3x12–20","45–60s","raise"]]},
      {name:"Dia 4 — Ombros + Abdômen", exercises:[["Desenvolvimento","3x8–12","60–90s","push"],["Elevação lateral","3x10–15","45–60s","raise"],["Crucifixo inverso","2x10–15","45–60s","raise"],["Prancha","3x30–60s","45s","core"]]}
    ]
  },
  {
    slug:"treino-3x-semana",
    title:"Treino 3x por semana",
    time:"45 min", level:"Iniciante", objective:"Hipertrofia", location:"academia",
    days:[
      {name:"Dia 1 — Full Body A", exercises:[["Agachamento","3x6–10","90s","squat"],["Supino reto","3x8–12","60–90s","push"],["Puxada frontal","3x8–12","60–90s","pull"],["Elevação lateral","2x10–15","45–60s","raise"]]},
      {name:"Dia 2 — Full Body B", exercises:[["Leg press","3x8–12","90s","squat"],["Supino inclinado","3x8–12","60–90s","push"],["Remada baixa","3x8–12","60–90s","pull"],["Rosca direta","2x10–12","60s","curl"]]},
      {name:"Dia 3 — Full Body C", exercises:[["Agachamento","3x8–12","90s","squat"],["Desenvolvimento","3x8–12","60–90s","push"],["Puxada frontal","3x8–12","60–90s","pull"],["Tríceps pulley","2x10–15","45–60s","extension"]]}
    ]
  },
  {
    slug:"treino-60-minutos",
    title:"Treino completo de 60 minutos",
    time:"60 min", level:"Intermediário", objective:"Força", location:"academia",
    days:[
      {name:"Dia 1 — Peito + Tríceps", exercises:[["Supino reto","4x5–8","90–120s","push"],["Supino inclinado","3x6–10","90s","push"],["Crucifixo","3x10–15","60s","raise"],["Tríceps francês","3x8–12","60–90s","extension"],["Tríceps pulley","3x10–15","60s","extension"]]},
      {name:"Dia 2 — Costas + Bíceps", exercises:[["Barra fixa ou puxada","4x5–8","90–120s","pull"],["Remada curvada","4x6–10","90–120s","pull"],["Remada baixa","3x8–12","90s","pull"],["Rosca direta","3x8–12","60–90s","curl"],["Rosca martelo","2x10–12","60s","curl"]]},
      {name:"Dia 3 — Pernas", exercises:[["Agachamento","4x5–8","120s","squat"],["Leg press","3x8–12","90s","squat"],["Stiff","3x8–12","90s","hinge"],["Mesa flexora","3x10–15","60s","hinge"],["Panturrilha","3x12–20","60s","raise"]]},
      {name:"Dia 4 — Ombros + Braços", exercises:[["Desenvolvimento","4x6–10","90s","push"],["Elevação lateral","3x10–15","60s","raise"],["Crucifixo inverso","3x10–15","60s","raise"],["Rosca direta","3x8–12","60s","curl"],["Tríceps francês","3x8–12","60s","extension"]]}
    ]
  },
  {
    slug:"treino-em-casa",
    title:"Treino em casa",
    time:"30 min", level:"Iniciante", objective:"Condicionamento", location:"casa",
    days:[
      {name:"Dia 1 — Peito + Tríceps", exercises:[["Flexão de braço","4x8–15","60s","push"],["Flexão inclinada","3x10–15","60s","push"],["Tríceps banco","3x10–15","60s","extension"]]},
      {name:"Dia 2 — Pernas", exercises:[["Agachamento livre","4x12–20","60s","squat"],["Afundo","3x10–15/cada","60s","lunge"],["Elevação pélvica","3x12–20","60s","hinge"],["Panturrilha","3x15–25","45s","raise"]]},
      {name:"Dia 3 — Costas + Core", exercises:[["Remada com mochila","4x10–15","60s","pull"],["Pullover com mochila","3x10–15","60s","pull"],["Prancha","3x30–60s","45s","core"],["Dead bug","3x8–12/cada","45s","core"]]}
    ]
  }
];

exports.getAll = () => plans;
exports.find = slug => plans.find(p => p.slug === slug);

const objectiveAliases = { "Emagrecimento": "Condicionamento" };

exports.match = ({ objective, days, time, level, location }) => {
  const wantedDays = parseInt(days, 10);
  const wantedMinutes = parseInt(time, 10);
  let best = null, bestScore = -1;
  plans.forEach(plan => {
    let score = 0;
    if (location && plan.location === location) score += 4;
    if (plan.objective === objective || plan.objective === objectiveAliases[objective]) score += 3;
    if (parseInt(plan.time, 10) === wantedMinutes) score += 2;
    if (plan.days.length === wantedDays) score += 2;
    if (plan.level === level) score += 1;
    if (score > bestScore) { bestScore = score; best = plan; }
  });
  return best;
};
