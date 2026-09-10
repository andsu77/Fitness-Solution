const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "..", "data", "users");
const MAX_WORKOUTS_PER_USER = 100;

function ensureDir() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
function safeSub(sub) {
  if (typeof sub !== "string" || !/^[a-zA-Z0-9_-]{1,128}$/.test(sub)) {
    throw new Error("ID de usuário inválido.");
  }
  return sub;
}
function filePath(sub) {
  return path.join(DATA_DIR, safeSub(sub) + ".json");
}
function readUser(sub) {
  ensureDir();
  const file = filePath(sub);
  if (!fs.existsSync(file)) return null;
  try { return JSON.parse(fs.readFileSync(file, "utf8")); }
  catch (e) { return null; }
}
function writeUser(sub, data) {
  ensureDir();
  fs.writeFileSync(filePath(sub), JSON.stringify(data, null, 2));
}

exports.upsertProfile = (profile) => {
  const existing = readUser(profile.sub) || { profile, workouts: [] };
  existing.profile = profile;
  writeUser(profile.sub, existing);
  return existing;
};

exports.getWorkouts = (sub) => {
  const user = readUser(sub);
  return user ? user.workouts : [];
};

exports.saveWorkout = (sub, workout) => {
  const user = readUser(sub) || { profile: null, workouts: [] };
  user.workouts.push(workout);
  if (user.workouts.length > MAX_WORKOUTS_PER_USER) {
    user.workouts = user.workouts.slice(-MAX_WORKOUTS_PER_USER);
  }
  writeUser(sub, user);
  return user.workouts;
};

exports.deleteWorkout = (sub, id) => {
  const user = readUser(sub);
  if (!user) return [];
  user.workouts = user.workouts.filter(w => w.id !== id);
  writeUser(sub, user);
  return user.workouts;
};
