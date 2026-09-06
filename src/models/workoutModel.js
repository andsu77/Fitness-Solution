const plans = [
  {
    slug:"hipertrofia-30-minutos",
    title:"Hipertrofia em 30 minutos",
    time:"30 min", level:"Intermediário", objective:"Hipertrofia",
    days:[
      {name:"Dia 1 — Peito + Tríceps", exercises:[
        ["Supino reto","3x6–10","60–90s"],["Supino inclinado com halteres","3x8–12","60–90s"],["Crucifixo na máquina","2x10–15","45–60s"],["Tríceps francês","3x8–12","60s"],["Tríceps pulley","2x10–15","45–60s"]
      ]},
      {name:"Dia 2 — Costas + Bíceps", exercises:[
        ["Puxada frontal","3x8–12","60–90s"],["Remada baixa","3x8–12","60–90s"],["Remada unilateral","2x10–12","60s"],["Rosca direta","3x8–12","60s"],["Rosca martelo","2x10–12","45–60s"]
      ]},
      {name:"Dia 3 — Pernas", exercises:[
        ["Agachamento","3x6–10","90s"],["Leg press","3x8–12","90s"],["Mesa flexora","2x10–15","60s"],["Cadeira extensora","2x10–15","60s"],["Panturrilha em pé","2x12–20","45–60s"]
      ]},
      {name:"Dia 4 — Ombros + Braços", exercises:[
        ["Desenvolvimento com halteres","3x8–12","60–90s"],["Elevação lateral","3x10–15","45–60s"],["Crucifixo inverso","2x10–15","45–60s"],["Rosca direta","2x8–12","60s"],["Tríceps francês","2x8–12","60s"]
      ]}
    ]
  },
  {
    slug:"treino-40-minutos",
    title:"Treino eficiente de 40 minutos",
    time:"40 min", level:"Iniciante", objective:"Condicionamento",
    days:[
      {name:"Dia 1 — Peito + Tríceps", exercises:[["Supino máquina","3x8–12","60–90s"],["Supino inclinado","3x8–12","60–90s"],["Tríceps francês","3x10–12","60s"],["Tríceps pulley","2x10–15","45–60s"]]},
      {name:"Dia 2 — Costas + Bíceps", exercises:[["Puxada frontal","3x8–12","60–90s"],["Remada máquina","3x8–12","60–90s"],["Rosca direta","3x10–12","60s"],["Rosca martelo","2x10–12","45–60s"]]},
      {name:"Dia 3 — Pernas", exercises:[["Leg press","3x8–12","90s"],["Cadeira extensora","3x10–15","60s"],["Mesa flexora","3x10–15","60s"],["Panturrilha","3x12–20","45–60s"]]},
      {name:"Dia 4 — Ombros + Abdômen", exercises:[["Desenvolvimento","3x8–12","60–90s"],["Elevação lateral","3x10–15","45–60s"],["Crucifixo inverso","2x10–15","45–60s"],["Prancha","3x30–60s","45s"]]}
    ]
  },
  {
    slug:"treino-3x-semana",
    title:"Treino 3x por semana",
    time:"45 min", level:"Iniciante", objective:"Hipertrofia",
    days:[
      {name:"Dia 1 — Full Body A", exercises:[["Agachamento","3x6–10","90s"],["Supino reto","3x8–12","60–90s"],["Puxada frontal","3x8–12","60–90s"],["Elevação lateral","2x10–15","45–60s"]]},
      {name:"Dia 2 — Full Body B", exercises:[["Leg press","3x8–12","90s"],["Supino inclinado","3x8–12","60–90s"],["Remada baixa","3x8–12","60–90s"],["Rosca direta","2x10–12","60s"]]},
      {name:"Dia 3 — Full Body C", exercises:[["Agachamento","3x8–12","90s"],["Desenvolvimento","3x8–12","60–90s"],["Puxada frontal","3x8–12","60–90s"],["Tríceps pulley","2x10–15","45–60s"]]}
    ]
  },
  {
    slug:"treino-60-minutos",
    title:"Treino completo de 60 minutos",
    time:"60 min", level:"Intermediário", objective:"Força",
    days:[
      {name:"Dia 1 — Peito + Tríceps", exercises:[["Supino reto","4x5–8","90–120s"],["Supino inclinado","3x6–10","90s"],["Crucifixo","3x10–15","60s"],["Tríceps francês","3x8–12","60–90s"],["Tríceps pulley","3x10–15","60s"]]},
      {name:"Dia 2 — Costas + Bíceps", exercises:[["Barra fixa ou puxada","4x5–8","90–120s"],["Remada curvada","4x6–10","90–120s"],["Remada baixa","3x8–12","90s"],["Rosca direta","3x8–12","60–90s"],["Rosca martelo","2x10–12","60s"]]},
      {name:"Dia 3 — Pernas", exercises:[["Agachamento","4x5–8","120s"],["Leg press","3x8–12","90s"],["Stiff","3x8–12","90s"],["Mesa flexora","3x10–15","60s"],["Panturrilha","3x12–20","60s"]]},
      {name:"Dia 4 — Ombros + Braços", exercises:[["Desenvolvimento","4x6–10","90s"],["Elevação lateral","3x10–15","60s"],["Crucifixo inverso","3x10–15","60s"],["Rosca direta","3x8–12","60s"],["Tríceps francês","3x8–12","60s"]]}
    ]
  },
  {
    slug:"treino-em-casa",
    title:"Treino em casa",
    time:"30 min", level:"Iniciante", objective:"Condicionamento",
    days:[
      {name:"Dia 1 — Peito + Tríceps", exercises:[["Flexão de braço","4x8–15","60s"],["Flexão inclinada","3x10–15","60s"],["Tríceps banco","3x10–15","60s"]]},
      {name:"Dia 2 — Pernas", exercises:[["Agachamento livre","4x12–20","60s"],["Afundo","3x10–15/cada","60s"],["Elevação pélvica","3x12–20","60s"],["Panturrilha","3x15–25","45s"]]},
      {name:"Dia 3 — Costas + Core", exercises:[["Remada com mochila","4x10–15","60s"],["Pullover com mochila","3x10–15","60s"],["Prancha","3x30–60s","45s"],["Dead bug","3x8–12/cada","45s"]]}
    ]
  }
];

exports.getAll = () => plans;
exports.find = slug => plans.find(p => p.slug === slug);