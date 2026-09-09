function ex(name, sets, reps, rest) {
  return { name, sets, reps, rest };
}

const STRENGTH = { sets: 3, reps: "8-12", rest: "60s" };
const ISOLATION = { sets: 3, reps: "10-15", rest: "45s" };
const CORE = { sets: 3, reps: "12-20", rest: "30s" };
const CARDIO = { sets: 1, reps: "15-25 min", rest: "-" };

function build(defaults, names) {
  return names.map(name => ex(name, defaults.sets, defaults.reps, defaults.rest));
}

const academia = {
  key: "academia",
  label: "Treino em academia",
  description: "Exercícios com barras, halteres, máquinas e cabos.",
  tip: "Na academia você pode progredir aumentando a carga aos poucos, mantendo a técnica. Comece pelos exercícios multiarticulares (agachamento, supino, remada) e deixe os de isolamento para o final da sessão.",
  categories: [
    { key: "peito", label: "Peito", exercises: build(STRENGTH, ["Supino reto com barra", "Supino inclinado com halteres", "Supino declinado", "Crucifixo com halteres", "Crucifixo na máquina (peck deck)", "Cross over no cabo", "Supino na máquina"]) },
    { key: "costas", label: "Costas", exercises: build(STRENGTH, ["Puxada frontal aberta", "Puxada frontal fechada", "Remada baixa no cabo", "Remada curvada com barra", "Remada unilateral com halter", "Remada cavalinho", "Pull-over com halter", "Barra fixa"]) },
    { key: "pernas", label: "Pernas", exercises: build(STRENGTH, ["Agachamento livre com barra", "Agachamento no smith", "Leg press 45°", "Cadeira extensora", "Mesa flexora", "Stiff com barra", "Afundo com halteres", "Cadeira adutora", "Cadeira abdutora", "Panturrilha em pé", "Panturrilha sentado"]) },
    { key: "ombros", label: "Ombros", exercises: build(STRENGTH, ["Desenvolvimento com halteres", "Desenvolvimento na máquina", "Desenvolvimento militar com barra", "Elevação lateral com halteres", "Elevação frontal com halteres", "Crucifixo inverso", "Remada alta com barra", "Encolhimento de trapézio"]) },
    { key: "biceps", label: "Bíceps", exercises: build(ISOLATION, ["Rosca direta com barra", "Rosca alternada com halteres", "Rosca martelo", "Rosca scott", "Rosca concentrada", "Rosca no cabo"]) },
    { key: "triceps", label: "Tríceps", exercises: build(ISOLATION, ["Tríceps pulley (corda)", "Tríceps francês com halter", "Tríceps testa com barra", "Mergulho no banco (dips)", "Tríceps coice com halter", "Supino fechado"]) },
    { key: "abdomen", label: "Abdômen", exercises: build(CORE, ["Abdominal supra no solo", "Abdominal na máquina", "Elevação de pernas na barra", "Prancha isométrica", "Abdominal infra no banco", "Rotação de tronco no cabo"]) },
    { key: "cardio", label: "Cardio", exercises: build(CARDIO, ["Esteira (corrida ou caminhada)", "Bicicleta ergométrica", "Elíptico", "Escada (stairmaster)", "Remo ergômetro", "HIIT na bike"]) }
  ]
};

const casa = {
  key: "casa",
  label: "Treino em casa (calistenia)",
  description: "Exercícios com o peso do corpo, sem equipamento de academia.",
  tip: "Sem carga externa ajustável, priorize aumentar repetições, tempo sob tensão ou variações mais difíceis do mesmo exercício (ex: flexão inclinada → tradicional → declinada) para continuar progredindo.",
  categories: [
    { key: "peito", label: "Peito", exercises: build(ISOLATION, ["Flexão de braço tradicional", "Flexão diamante", "Flexão inclinada (pés elevados)", "Flexão declinada (mãos elevadas)", "Flexão archer", "Flexão com palmas"]) },
    { key: "costas", label: "Costas", exercises: build(ISOLATION, ["Remada com mochila ou peso", "Remada invertida (barra ou mesa baixa)", "Superman", "Barra fixa", "Pull-over com objeto em casa", "Good morning com peso corporal"]) },
    { key: "pernas", label: "Pernas", exercises: build(ISOLATION, ["Agachamento livre", "Agachamento sumô", "Afundo (passada)", "Agachamento búlgaro", "Agachamento pistol", "Elevação de panturrilha", "Ponte de glúteo (elevação pélvica)", "Cadeira na parede (wall sit)"]) },
    { key: "ombros", label: "Ombros", exercises: build(ISOLATION, ["Flexão pike", "Flexão pike elevada", "Elevação lateral com garrafas de água", "Circular de braços"]) },
    { key: "core", label: "Abdômen / Core", exercises: build(CORE, ["Prancha frontal", "Prancha lateral", "Abdominal bicicleta", "Elevação de pernas deitado", "Dead bug", "Abdominal remador (V-up)"]) },
    { key: "cardio", label: "Cardio", exercises: [
      ex("Polichinelo (jumping jack)", 3, "30-45s", "20s"),
      ex("Burpee", 3, "10-15", "45s"),
      ex("Corrida estacionária (joelho alto)", 3, "30-45s", "20s"),
      ex("Pular corda", 3, "1-2 min", "45s"),
      ex("Mountain climber", 3, "30-45s", "20s"),
      ex("Agachamento com salto (jump squat)", 3, "12-15", "45s")
    ] }
  ]
};

exports.getLibrary = () => ({ academia, casa });
