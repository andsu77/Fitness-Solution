const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "..", "data", "users");

function ensureDir() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
function filePath(sub) {
  return path.join(DATA_DIR, sub + ".json");
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
