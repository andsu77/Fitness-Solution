function ex(name, sets, reps, rest, pattern) {
  return { name, sets, reps, rest, pattern };
}

const STRENGTH = { sets: 3, reps: "8-12", rest: "60s" };
const ISOLATION = { sets: 3, reps: "10-15", rest: "45s" };
const CORE = { sets: 3, reps: "12-20", rest: "30s" };
const CARDIO = { sets: 1, reps: "15-25 min", rest: "-" };

function build(defaults, items) {
  return items.map(([name, pattern]) => ex(name, defaults.sets, defaults.reps, defaults.rest, pattern));
}

const academia = {
  key: "academia",
  label: "Treino em academia",
  description: "Exercícios com barras, halteres, máquinas e cabos.",
  tip: "Na academia você pode progredir aumentando a carga aos poucos, mantendo a técnica. Comece pelos exercícios multiarticulares (agachamento, supino, remada) e deixe os de isolamento para o final da sessão.",
  categories: [
    { key: "peito", label: "Peito", exercises: build(STRENGTH, [
      ["Supino reto com barra", "push"], ["Supino inclinado com halteres", "push"], ["Supino declinado", "push"],
      ["Crucifixo com halteres", "raise"], ["Crucifixo na máquina (peck deck)", "raise"], ["Cross over no cabo", "raise"],
      ["Supino na máquina", "push"]
    ]) },
    { key: "costas", label: "Costas", exercises: build(STRENGTH, [
      ["Puxada frontal aberta", "pull"], ["Puxada frontal fechada", "pull"], ["Remada baixa no cabo", "pull"],
      ["Remada curvada com barra", "pull"], ["Remada unilateral com halter", "pull"], ["Remada cavalinho", "pull"],
      ["Pull-over com halter", "pull"], ["Barra fixa", "pull"]
    ]) },
    { key: "pernas", label: "Pernas", exercises: build(STRENGTH, [
      ["Agachamento livre com barra", "squat"], ["Agachamento no smith", "squat"], ["Leg press 45°", "squat"],
      ["Cadeira extensora", "squat"], ["Mesa flexora", "hinge"], ["Stiff com barra", "hinge"],
      ["Afundo com halteres", "lunge"], ["Cadeira adutora", "squat"], ["Cadeira abdutora", "squat"],
      ["Panturrilha em pé", "raise"], ["Panturrilha sentado", "raise"]
    ]) },
    { key: "ombros", label: "Ombros", exercises: build(STRENGTH, [
      ["Desenvolvimento com halteres", "push"], ["Desenvolvimento na máquina", "push"], ["Desenvolvimento militar com barra", "push"],
      ["Elevação lateral com halteres", "raise"], ["Elevação frontal com halteres", "raise"], ["Crucifixo inverso", "raise"],
      ["Remada alta com barra", "pull"], ["Encolhimento de trapézio", "raise"]
    ]) },
    { key: "biceps", label: "Bíceps", exercises: build(ISOLATION, [
      ["Rosca direta com barra", "curl"], ["Rosca alternada com halteres", "curl"], ["Rosca martelo", "curl"],
      ["Rosca scott", "curl"], ["Rosca concentrada", "curl"], ["Rosca no cabo", "curl"]
    ]) },
    { key: "triceps", label: "Tríceps", exercises: build(ISOLATION, [
      ["Tríceps pulley (corda)", "extension"], ["Tríceps francês com halter", "extension"], ["Tríceps testa com barra", "extension"],
      ["Mergulho no banco (dips)", "push"], ["Tríceps coice com halter", "extension"], ["Supino fechado", "push"]
    ]) },
    { key: "abdomen", label: "Abdômen", exercises: build(CORE, [
      ["Abdominal supra no solo", "core"], ["Abdominal na máquina", "core"], ["Elevação de pernas na barra", "core"],
      ["Prancha isométrica", "core"], ["Abdominal infra no banco", "core"], ["Rotação de tronco no cabo", "core"]
    ]) },
    { key: "cardio", label: "Cardio", exercises: build(CARDIO, [
      ["Esteira (corrida ou caminhada)", "cardio"], ["Bicicleta ergométrica", "cardio"], ["Elíptico", "cardio"],
      ["Escada (stairmaster)", "cardio"], ["Remo ergômetro", "cardio"], ["HIIT na bike", "cardio"]
    ]) }
  ]
};

const casa = {
  key: "casa",
  label: "Treino em casa (calistenia)",
  description: "Exercícios com o peso do corpo, sem equipamento de academia.",
  tip: "Sem carga externa ajustável, priorize aumentar repetições, tempo sob tensão ou variações mais difíceis do mesmo exercício (ex: flexão inclinada → tradicional → declinada) para continuar progredindo.",
  categories: [
    { key: "peito", label: "Peito", exercises: build(ISOLATION, [
      ["Flexão de braço tradicional", "push"], ["Flexão diamante", "push"], ["Flexão inclinada (pés elevados)", "push"],
      ["Flexão declinada (mãos elevadas)", "push"], ["Flexão archer", "push"], ["Flexão com palmas", "push"]
    ]) },
    { key: "costas", label: "Costas", exercises: build(ISOLATION, [
      ["Remada com mochila ou peso", "pull"], ["Remada invertida (barra ou mesa baixa)", "pull"], ["Superman", "core"],
      ["Barra fixa", "pull"], ["Pull-over com objeto em casa", "pull"], ["Good morning com peso corporal", "hinge"]
    ]) },
    { key: "pernas", label: "Pernas", exercises: build(ISOLATION, [
      ["Agachamento livre", "squat"], ["Agachamento sumô", "squat"], ["Afundo (passada)", "lunge"],
      ["Agachamento búlgaro", "lunge"], ["Agachamento pistol", "lunge"], ["Elevação de panturrilha", "raise"],
      ["Ponte de glúteo (elevação pélvica)", "hinge"], ["Cadeira na parede (wall sit)", "squat"]
    ]) },
    { key: "ombros", label: "Ombros", exercises: build(ISOLATION, [
      ["Flexão pike", "push"], ["Flexão pike elevada", "push"], ["Elevação lateral com garrafas de água", "raise"],
      ["Circular de braços", "raise"]
    ]) },
    { key: "core", label: "Abdômen / Core", exercises: build(CORE, [
      ["Prancha frontal", "core"], ["Prancha lateral", "core"], ["Abdominal bicicleta", "core"],
      ["Elevação de pernas deitado", "core"], ["Dead bug", "core"], ["Abdominal remador (V-up)", "core"]
    ]) },
    { key: "cardio", label: "Cardio", exercises: [
      ex("Polichinelo (jumping jack)", 3, "30-45s", "20s", "cardio"),
      ex("Burpee", 3, "10-15", "45s", "cardio"),
      ex("Corrida estacionária (joelho alto)", 3, "30-45s", "20s", "cardio"),
      ex("Pular corda", 3, "1-2 min", "45s", "cardio"),
      ex("Mountain climber", 3, "30-45s", "20s", "cardio"),
      ex("Agachamento com salto (jump squat)", 3, "12-15", "45s", "squat")
    ] }
  ]
};

exports.getLibrary = () => ({ academia, casa });
